# 0 [相关源码](https://github.com/Wasabi1234/RabbitMQ_Tutorial)

# 1 你将学到

- 如何保证消息百分百投递成功
- 幂等性
- 如何避免海量订单生成时消息的重复消费
- Confirm确认消息、Return返回消息
- 自定义消费者
- 消息的ACK与重回队列
- 限流
- TTL
- 死信队列

# 2 保证消息的百分百投递成功

## 2.1 Producer 的可靠性投递

### 2.1.1  要求

- 保证消息的成功发出
- 保证MQ节点的成功接收
- 发送端收到MQ节点(Broker) 确认应答
- 完善的消息补偿机制

在实际生产中，很难保障前三点的完全可靠，比如在极端的环境中，生产者发送消息失败了，发送端在接受确认应答时突然发生网络闪断等等情况，很难保障可靠性投递，所以就需要有第四点完善的消息补偿机制。

### 2.1.2  解决方案

#### 2.1.2.1 方案一:消息信息落库,对消息状态进行打标(常见方案)

将消息持久化到DB并设置状态值,收到Consumer的应答就改变当前记录的状态.

再轮询重新发送没接收到应答的消息,注意这里要设置重试次数.

##### 方案流程图![](https://ask.qcloudimg.com/http-save/1752328/xokgtzgaoe.png)

##### 方案实现流程

比如我下单成功

step1 - 对订单数据入BIZ DB订单库,并对因此生成的业务消息入MSG DB消息库

此处由于采用了两个数据库,需要两次持久化操作,为了保证数据的一致性,有人可能就想着采用分布式事务,但在大厂实践中,基本都是采用补偿机制!

> 这里一定要保证step1 中消息都存储成功了，没有出现任何异常情况，然后生产端再进行消息发送。如果失败了就进行快速失败机制

对业务数据和消息入库完毕就进入 

setp2 - 发送消息到 MQ 服务上，如果一切正常无误消费者监听到该消息，进入

step3 - 生产端有一个`Confirm Listener`,异步监听Broker回送的响应,从而判断消息是否投递成功

- step4 - 如果成功,去数据库查询该消息,并将消息状态更新为1
- step5  - 如果出现意外情况，消费者未接收到或者 Listener 接收确认时发生网络闪断，导致生产端的Listener就永远收不到这条消息的confirm应答了，也就是说这条消息的状态就一直为0了，这时候就需要用到我们的分布式定时任务来从 MSG 数据库抓取那些超时了还未被消费的消息，重新发送一遍 
此时我们需要设置一个规则，比如说消息在入库时候设置一个临界值timeout，5分钟之后如果还是0的状态那就需要把消息抽取出来。这里我们使用的是分布式定时任务，去定时抓取DB中距离消息创建时间超过5分钟的且状态为0的消息。

step6 - 把抓取出来的消息进行重新投递(Retry Send)，也就是从第二步开始继续往下走

step7 - 当然有些消息可能就是由于一些实际的问题无法路由到Broker，比如routingKey设置不对，对应的队列被误删除了，那么这种消息即使重试多次也仍然无法投递成功，所以需要对重试次数做限制，比如限制3次，如果投递次数大于三次，那么就将消息状态更新为2，表示这个消息最终投递失败,然后通过补偿机制，人工去处理。实际生产中，这种情况还是比较少的，但是你不能没有这个补偿机制，要不然就做不到可靠性了。

#### 思考:该方案在高并发的场景下是否合适

对于第一种方案，我们需要做两次数据库的持久化操作，在高并发场景下显然数据库存在着性能瓶颈.

其实在我们的核心链路中只需要对业务进行入库就可以了，消息就没必要先入库了，我们可以做消息的延迟投递，做二次确认，回调检查。下面然我们看方案二

#### 2.1.2.2 消息延迟投递,两次确认,回调检查(大规模海量数据方案)

大厂经典实现方案

当然这种方案不一定能保障百分百投递成功，但是基本上可以保障大概99.9%的消息是OK的，有些特别极端的情况只能是人工去做补偿了，或者使用定时任务.

主要就是为了减少DB操作

##### 方案流程图![](https://ask.qcloudimg.com/http-save/1752328/eif0edhc6x.png)

- Upstream Service
上游服务,即生产端
- Downstream service
下游服务,即消费端
- Callback service
回调服务方案实现流程
- step1 一定要先将业务消息入库,然后Pro再发出消息,顺序不能错!
- step2 在发送消息之后,紧接着Pro再发送一条消息(Second Send Delay Check),即延迟消息投递检查,这里需要设置一个延迟时间,比如5分钟之后进行投递.
- step3 Con监听指定的队列,处理收到的消息.
- step4 处理完成之后,发送一个confirm消息,也就是回送响应,但是其不是普通的ACK,而是重新生成一条消息,投递到MQ,表示处理成功.
- Callback service是一个单独的服务,它扮演MSG DB角色,它通过MQ监听下游服务发送的confirm消息,如果监听到confirm消息,那么就对其持久化到MSG DB.
- step6 5分钟之后延迟消息发送到MQ,然后Callback service还是去监听延迟消息所对应的队列，收到Check消息后去检查DB中是否存在消息，如果存在，则不需要做任何处理，如果不存在或者消费失败了，那么Callback service就需要主动发起RPC通信给上游服务，告诉它延迟检查的这条消息我没有找到，你需要重新发送，生产端收到信息后就会重新查询BIZ DB然后将消息发送出去.

##### 设计目的

少做一次DB的存储,在高并发场景下,最关心的不是消息百分百投递成功,而是一定要保证性能，保证能抗得住这么大的并发量。所以能节省数据库的操作就尽量节省，异步地进行补偿.

其实在主流程里面是没有Callback service的，它属于一个补偿的服务，整个核心链路就是生产端入库业务消息，发送消息到MQ，消费端监听队列，消费消息。其他的步骤都是一个补偿机制。

##### 小结

这两种方案都是可行的，需要根据实际业务来进行选择,方案二也是互联网大厂更为经典和主流的解决方案.但是若对性能要求不是那么高,方案一要更简单.

# 3 幂等性

## 3.1 什么是幂等性

### 用户对于同一操作发起的一次请求或者多次请求的结果是一致的

比如数据库的乐观锁,在执行更新操作前,先去数据库查询version,然后执行更新语句,以version作为条件,如果执行更新时有其他人先更新了这张表的数据,那么这个条件就不生效了,也就不会执行操作了,通过这种乐观锁的机制来保障幂等性.

## 3.2 Con - 幂等性

### 3.2.1 什么是Con - 幂等性

在业务高峰期最容易产生消息重复消费问题,当Con消费完消息时,在给Pro返回ack时由于网络中断,导致Pro未收到确认信息,该条消息就会重新发送并被Con消费,但实际上该消费者已成功消费了该条消息,这就造成了重复消费.

而Con - 幂等性,即消息不会被多次消费,即使我们收到了很多一样的消息.

### 3.2.2 主流幂等性实现方案

#### 3.2.2.1 唯一ID+指纹码

##### 核心:利用数据库主键去重

- 唯一ID:业务表的主键
- 指纹码：为了区别每次正常操作的码，每次操作时生成指纹码；可以用时间戳+业务编号或者标志位（具体视业务场景而定）
![](https://ask.qcloudimg.com/http-save/1752328/9t7xtujghg.png)
- 优势
实现简单
- 弊端
高并发下有数据库写入的性能瓶颈
- 解决方案
根据ID进行分库分表算法路由

##### 小结

首先我们需要根据消息生成一个全局唯一ID，然后还需要加上一个指纹码。这个指纹码它并不一定是系统去生成的，而是一些外部的规则或者内部的业务规则去拼接，它的目的就是为了保障这次操作是绝对唯一的。

将ID + 指纹码拼接好的值作为数据库主键，就可以进行去重了。即在消费消息前呢，先去数据库查询这条消息的指纹码标识是否存在，没有就执行insert操作，如果有就代表已经被消费了，就不需要管了

#### 3.2.2.2 利用Redis原子性

这里我们使用Redis实现幂等,还需要考虑如下问题

- 我们是否要进行数据落库,如果落库,那么数据库和缓存如何做到原子性?
如果你想用事务,放弃吧,Redis缓存事务和MySQL事务根本不是同一个事务
- 如果不落库,那么都存储到缓存中,定时同步的策略如何设置为好?

这里只提用Redis的原子性去解决MQ幂等性重复消费的问题

> MQ的幂等性问题 根本在于的是生产端未正常接收ACK，可能是网络抖动、网络中断导致

##### 可能的方案

Con在消费开始时将 ID放入到Redis的BitMap中，Pro每次生产数据时，从Redis的BitMap对应位置若不能取出ID，则生产消息发送，否则不进行消息发送。

但是有人可能会说，万一Con，ProRedis命令执行失败了怎么办，虽然又出现重复消费又出现Redis非正常执行命令的可能性极低，但是万一呢？

OK，我们可以在Redis命令执行失败时，将消息落库，每日用定时器，对这种极特殊的消息进行处理。

# 4 Confirm机制

## 4.1 什么是Confirm机制

- 消息的确认
Pro投递消息后,如果Broker收到消息,则会给Pro一个应答
- Pro接收应答
用来确定这条消息是否正常地发送到Broker,该法也是消息可靠性投递的核心保障!4.2 Confirm机制流程图![](https://ask.qcloudimg.com/http-save/1752328/4sc137swk3.png)
Pro发送消息到Broker,Broker接收到消息后,产生回送响应
Pro中有一个Confirm Listener异步监听响应应答

## 4.2 实现Confirm机制

1. 在channel上开启确认模式：channel.confirmSelect()
2. 在channel上添加监听：addConfirmListener
监听成功和失败的返回结果，根据具体的结果对消息进行重新发送、或记录日志等后续处理

接下来就让我们根据原理进行实操吧!

- Con端
![](https://ask.qcloudimg.com/http-save/1752328/3id1lhant2.png)
- Pro端
![](https://ask.qcloudimg.com/http-save/1752328/4qlmewto15.png)
- 启动Con,检查管控台
![](https://ask.qcloudimg.com/http-save/1752328/szptaezhf8.png)
![](https://ask.qcloudimg.com/http-save/1752328/zpjythgu6h.png)
- 启动Pro
![](https://ask.qcloudimg.com/http-save/1752328/mult3z0cw2.png)
![](https://ask.qcloudimg.com/http-save/1752328/01dt77p2nn.png)5 Return机制5.1 什么是Return机制
- Return Listener 用于处理一些不可路由的消息
- Pro通过指定一个Exchange和Routingkey,把消息送到某一个队列中,然后Con监听队列,进行消费
- 但如果我们在发送消息时,当前Exchange不存在或者Routingkey路由不到,如果我们要监听这种不可达的消息,就要用到Return Listener5.2  Return机制示意图![](https://ask.qcloudimg.com/http-save/1752328/789w1wunn6.png)

## 5.3 实现Return机制

- 添加return监听：addReturnListener，生产端去监听这些不可达的消息，做一些后续处理，比如说，记录下消息日志，或者及时去跟踪记录，有可能重新设置一下就好了

在基础的API中的一个关键的配置项:Mandatory

- 如果为true，则\*\*\*会接收到路由不可达的消息,然后进行后续处理
- 如果为false,那么broker端自动删除该消息
- Con
![](https://ask.qcloudimg.com/http-save/1752328/vnk2dhkxxh.png)
- Pro
![](https://ask.qcloudimg.com/http-save/1752328/pk0nl6tdh9.png)
- 启动Con
![](https://ask.qcloudimg.com/http-save/1752328/zb08sbjzmr.png)
![](https://ask.qcloudimg.com/http-save/1752328/zc2mhz1t2l.png)
![](https://ask.qcloudimg.com/http-save/1752328/iojxalnydq.png)
- 启动Pro
由于Pro设置的是一个错误的路由key，所以消费端没有任何打印，而生产端打印了如下内容
![](https://ask.qcloudimg.com/http-save/1752328/gspyobhlsb.png)
- 如果我们将 Mandatory 属性设置为false，对于不可达的消息会被Broker直接删除，那么Pro就不会进行任何打印了。如果我们的路由key设置为正确的，那么Con能够正确消费，Pro也不会进行任何打印。6 Con - 自定义监听
- 之前我们都是在代码中编写while循环,通过`consumer.nextDelivery`方法获取下一条消息,然后进行消费处理
- 其实我们还有另一种选择,使用自定义的Consumer,它更方便,解耦性更强,也是在实际工作中最常用的使用方式

自定义Con实现只需要继承 DefaultConsumer 类，重写 handleDelivery 方法即可!

## 6.1 代码实现

- 自定义Con
![](https://ask.qcloudimg.com/http-save/1752328/d8hgnh4u4v.png)
- Con
![](https://ask.qcloudimg.com/http-save/1752328/nrneq6eau1.png)
- Pro
![](https://ask.qcloudimg.com/http-save/1752328/db45m17f5c.png)
- 启动Con后,查看管控台
![](https://ask.qcloudimg.com/http-save/1752328/8g16otgbvi.png)
![](https://ask.qcloudimg.com/http-save/1752328/nz9dabzo06.png)
- 启动Pro,Con接收消息
![](https://ask.qcloudimg.com/http-save/1752328/wagjfja8p4.png)7 Con - 限流7.1 什么是Con - 限流7.1.1 消息过载场景
- 假设我们有这样的场景
Rabbitmq服务器有上万条未处理的消息,我们随便打开一个Con - Client,会造成:巨量的消息瞬间全部推送过来,然而我们单个客户端无法同时处理这么多数据!此时很有可能导致服务器崩溃，严重的可能导致线上的故障。
- 还有一些其他的场景，比如说单个Pro一分钟产生了几百条数据,但是单个Con一分钟可能只能处理60条,这个时候Pro-Con肯定是不平衡的。通常Pro是没办法做限制的。所以Con肯定需要做一些限流措施，否则如果超出最大负载，可能导致Con性能下降，服务器卡顿甚至崩溃等一系列严重后果

因此,我们需要限流

### 7.1.2 Con - 限流机制

RabbitMQ提供了一种qos (服务质量保证)功能,即在非自动确认消息的前提下,如果一定数目的消息 (通过基于Con或者channel设置Qos的值) 未被确认前,不消费新的消息

> 不能设置自动签收功能(autoAck = false)
> 如果消息未被确认,就不会到达Con,目的就是给Pro减压

#### 限流设置API

void BasicQos(uint prefetchSize, ushort prefetchCount, bool global);

- prefetchSize: 单条消息的大小限制，Con通常设置为0，表示不做限制
- prefetchCount: 一次最多能处理多少条消息
- global: 是否将上面设置true应用于channel级别还是取false代表Con级别

> prefetchSize和global这两项,RabbitMQ没有实现,暂且不研究
> prefetchCount在 `autoAck=false` 的情况下生效,即在自动应答的情况下该值无效

手工ACK

void basicAck(Integer deliveryTag，boolean multiple)

调用这个方法就会主动回送给Broker一个应答，表示这条消息我处理完了，你可以给我下一条了。参数multiple表示是否批量签收，由于我们是一次处理一条消息，所以设置为false

## 7.2 实现Con - 限流

- 自定义Con
![](https://ask.qcloudimg.com/http-save/1752328/xe192hwqiv.png)
- Con
![](https://ask.qcloudimg.com/http-save/1752328/043xplio66.png)
- Pro
![](https://ask.qcloudimg.com/http-save/1752328/56fjijh5uu.png)
- 启动Con,查看管控台
![](https://ask.qcloudimg.com/http-save/1752328/91hnqgj2rs.png)![](https://ask.qcloudimg.com/http-save/1752328/xfy1oan8lb.png)
- 启动Pro,开始发送消息,Con接收消息
![](https://ask.qcloudimg.com/http-save/1752328/6bfuez1jqn.png)
- 实现限流,仅仅处理一条消息,其余的都在等待![](https://ask.qcloudimg.com/http-save/1752328/f5mwfk38ii.png)
- 现在,我们开启ACK应答处理
![](https://ask.qcloudimg.com/http-save/1752328/a7e3oakhio.png)
- 重新启动Con,发现剩余的2条消息也全都发送并接收了!
- 我们之前是注释掉手工ACK方法，然后启动消费端和生产端，当时Con只打印一条消息,这是因为我们设置了手工签收,并且设置了一次只处理一条消息,当我们没有回送ACK应答时，Broker端就认为Con还没有处理完这条消息,基于这种限流机制就不会给Con发送新的消息了,所以Con那时只打印了一条消息
![](https://ask.qcloudimg.com/http-save/1752328/yd9ezqmeum.png)
![](https://ask.qcloudimg.com/http-save/1752328/36b98mv01z.png)8 Con - ACK &  重回队列机制8.1 ACK & NACK当我们设置`autoACK=false` 时,就可以使用手工ACK方式了,其实手工方式包括了手工ACK与NACK

当我们手工 ACK 时,会发送给Broker一个应答,代表消息处理成功,Broker就可回送响应给Pro.

NACK 则表示消息处理失败,如果设置了重回队列,Broker端就会将没有成功处理的消息重新发送.

### 使用方式

- Con消费时,如果由于业务异常,我们可以手工 NACK 记录日志,然后进行补偿API：void basicNack(long deliveryTag, boolean multiple, boolean requeue)API：void basicAck(long deliveryTag, boolean multiple)
- 如果由于服务器宕机等严重问题,我们就需要手工 ACK 保障Con消费成功

## 8.2 重回队列

- 重回队列是为了对没有处理成功的消息,将消息重新投递给Broker
- 重回队列,会把消费失败的消息重新添加到队列的尾端,供Con继续消费
- 一般在实际应用中,都会关闭重回队列,即设置为false

## 8.3 实现机制

- Con,关闭自动签收功能
![](https://ask.qcloudimg.com/http-save/1752328/17u78gg4fd.png)
- 自定义Con,对第一条消息(序号0)进行NACK，并设置重回队列
![](https://ask.qcloudimg.com/http-save/1752328/p77g6c5pkl.png)
- Pro 对消息设置序号,以便区分
![](https://ask.qcloudimg.com/http-save/1752328/17h9dwopoo.png)
- 启动Con,查看管控台
![](https://ask.qcloudimg.com/http-save/1752328/oic6hpizle.png)
![](https://ask.qcloudimg.com/http-save/1752328/sg42dqsdqx.png)
- 启动Pro,这里第一条消息由于我们调用了NACK，并且设置了重回队列，所以会导致该条消息一直重复发送，消费端就会一直循环消费
![](https://ask.qcloudimg.com/http-save/1752328/bue9og945e.png)
![](https://ask.qcloudimg.com/http-save/1752328/5lxcw7i8i9.png)9 TTL机制9.1 什么是TTL
- TTL(Time To Live),即生存时间
- RabbitMQ支持消息的过期时间，在消息发送时可以进行指定
- RabbitMQ支持为每个队列设置消息的超时时间，从消息入队列开始计算，只要超过了队列的超时时间配置，那么消息会被自动清除

## 9.2 管控台演示

- 新增一个Q
![](https://ask.qcloudimg.com/http-save/1752328/ykk8l7wyyv.png)
![](https://ask.qcloudimg.com/http-save/1752328/uhuq375sno.png)
- 新增一个交换机
![](https://ask.qcloudimg.com/http-save/1752328/tsg3trv367.png)
![](https://ask.qcloudimg.com/http-save/1752328/ne2jh8g7uu.png)
- 绑定
![](https://ask.qcloudimg.com/http-save/1752328/4di5wda7od.png)
![](https://ask.qcloudimg.com/http-save/1752328/fgcb6e2luk.png)
- Q中也显示了相关的绑定信息
![](https://ask.qcloudimg.com/http-save/1752328/acm5kww83d.png)
- 发送消息
![](https://ask.qcloudimg.com/http-save/1752328/2jr6uou00v.png)
![](https://ask.qcloudimg.com/http-save/1752328/jnqisd5g5b.png)
- 10s后,消息被清除为0
![](https://ask.qcloudimg.com/http-save/1752328/1zda4z4516.png)10 死信队列机制10.1 什么是死信队列DLX - 死信队列(dead-letter-exchange)
利用DLX,当消息在一个队列中变成死信 (dead message) 之后,它能被重新publish到另一个Exchange中,这个Exchange就是DLX.10.2  死信队列的产生场景
- 消息被拒绝(basic.reject / basic.nack),并且requeue = false
- 消息因TTL过期
- 队列达到最大长度10.3 死信的处理过程
- DLX亦为一个普通的Exchange,它能在任何队列上被指定,实际上就是设置某个队列的属性
- 当某队列中有死信时,RabbitMQ会自动地将该消息重新发布到设置的Exchange,进而被路由到另一个队列
- 可以监听这个队列中的消息做相应的处理.该特性可以弥补RabbitMQ 3.0以前支持的`immediate`参数的功能 

## 10.4 死信队列的配置

- 设置死信队列的exchange和queue,然后进行绑定
		- Exchange:dlx.exchange
		- Queue: dlx.queue
		- RoutingKey:#
- 正常声明交换机、队列、绑定，只不过我们需要在队列加上一个参数即可arguments.put(" x-dead-letter-exchange"，"dlx.exchange");这样消息在过期、requeue、 队列在达到最大长度时，消息就可以直接路由到死信队列！10.5 实操演示
- 自定义Con
![](https://ask.qcloudimg.com/http-save/1752328/ikes4al6cj.png)
- Pro
![](https://ask.qcloudimg.com/http-save/1752328/55t99092nv.png)
- Con
![](https://ask.qcloudimg.com/http-save/1752328/zczny1zjgf.png)
- 启动Con,查看管控台
![](https://ask.qcloudimg.com/http-save/1752328/0wz335h3uf.png)
![](https://ask.qcloudimg.com/http-save/1752328/0t91tmlsx5.png)
![](https://ask.qcloudimg.com/http-save/1752328/5e72x77l7o.png)
![](https://ask.qcloudimg.com/http-save/1752328/bex79xfjcd.png)
- 现在,让我们停止Con,并启动Pro,由于没有Con,TTL为10s的消息将送往死信队列
![](https://ask.qcloudimg.com/http-save/1752328/9efmpvnlkt.png)
- 10s后
![](https://ask.qcloudimg.com/http-save/1752328/koz8g9y3sz.png)
- 实际环境我们还需要对死信队列进行一个监听和处理，当然具体的处理逻辑和业务相关，这里只是简单演示死信队列是否生效。

# 11 总结

本文专注RabbitMQ高级特性的学习

首先介绍了大厂在实际使用中是如何保障消息投递成功和幂等性的，以及对RabbitMQ的确认消息、返回消息、ACK与重回队列、消息的限流，以及对超时时间、死信队列的使用

最后,感谢您的阅读!

# 参考

[RabbitMQ 100% 投递成功方案详解](https://juejin.im/post/5c4942f36fb9a04a0e2d8b4e)

[RabbitMQ 从入门到精通（二）](https://www.cnblogs.com/dwlovelife/p/10991371.html)

[RabbitMQ 幂等性概念及业界主流解决方案](https://juejin.im/post/5c494488e51d45030822a4cf)

[RabbitMQ从入门到精通（三）](https://www.cnblogs.com/dwlovelife/p/11000307.html)

> 更多内容请关注JavaEdge公众号