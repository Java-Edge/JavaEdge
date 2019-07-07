# 0 [相关源码](https://github.com/Wasabi1234/RabbitMQ_Tutorial)

# 1 你将学到

- RabbitMQ 整合 Spring AMQP实战
- RabbitMQ   整合 Spring Boot实战
- RabbitMQ 整合 Spring Cloud实战

# 2 SpringAMQP用户管理组件 - RabbitAdmin

RabbitAdmin 类可以很好的操作 rabbitMQ，在 Spring 中直接进行注入即可

**autoStartup** 必须设置为 true,否则 Spring 容器不会加载它.

## 2.1 源码分析

RabbitAdmin 的底层实现

- 从 Spring 容器中获取 Exchange、Bingding、Routingkey 以及Queue 的 @Bean 声明
- 然后使用 rabbitTemplate 的 execute 方法进行执行对应的声明、修改、删除等一系列 RabbitMQ 基础功能操作。例如添加交换机、删除一个绑定、清空一个队列里的消息等等
- 依赖结构
![](https://ask.qcloudimg.com/http-save/1752328/2awra8h4m4.png)
RabbitAdmin实现了4个Interface： AmqpAdmin, ApplicationContextAware, ApplicationEventPublisherAware,InitializingBean。

### AmqpAdmin

为AMQP指定一组基本的便携式AMQP管理操作

![](https://ask.qcloudimg.com/http-save/1752328/7987hyeq2d.png)

### ApplicationEventPublisherAware

实现该接口的类，通过函数setApplicationEventPublisher()获得它执行所在的ApplicationEventPublisher。

![在这里插入图片描述](https://ask.qcloudimg.com/http-save/1752328/xkj6my32p9.png)

### ApplicationContextAware

实现该接口的类，通过函数setApplicationContext()获得它执行所在的ApplicationContext。一般用来初始化object

![](https://ask.qcloudimg.com/http-save/1752328/3kycczdn7j.png)

### InitializingBean

![](https://ask.qcloudimg.com/http-save/1752328/ouiknr50gu.png)

若class中实现该接口，在Spring Container中的bean生成之后，自动调用函数afterPropertiesSet()。

因其实现了InitializingBean接口,其中只有一个方法,且在Bean加载后就执行

该功能可以被用来检查是否所有的mandatory properties都设置好

- 以上Interfaces的执行顺序
ApplicationEventPublisherAware -> ApplicationContextAware -> InitializingBean.

RabbitAdmin借助于 ApplicationContextAware 和 InitializingBean来获取我们在配置类中声明的exchange, queue, binding beans等信息并调用channel的相应方法来声明。

- 首先,RabbitAdmin借助于ApplicationContextAware来获取ApplicationContext applicationContext
- 然后，借助于InitializingBean以及上面的applicationContext来实现rabbitMQ entity的声明

下面是RabbitAdmin中afterPropertiesSet()函数的代码片段。这里在创建connection的时候调用函数initialize()。

于是以此为突破口进行源码分析

- RabbitAdmin#afterPropertiesSet
![](https://ask.qcloudimg.com/http-save/1752328/84nlh0mzlv.png)
这里

最后分别调用函数declareExchanges(),declareQueues(),declareBindings()来声明RabbitMQ Entity

- 先定义了三个集合,利用applicationContext.getBeansOfType来获得container中的Exchange，Queue,Binding声明放入集合中
![](https://ask.qcloudimg.com/http-save/1752328/chjy4demgr.png)
- 然后调用filterDeclarables()来过滤不能declareable的bean![](https://ask.qcloudimg.com/http-save/1752328/l2cg76iej9.png)
- 按照RabbitMQ的方式拼接
![](https://ask.qcloudimg.com/http-save/1752328/40l0wg2zro.png)
- 使用rabbitTemplate执行交互
![](https://ask.qcloudimg.com/http-save/1752328/ey8m3jqs6u.png)2.2 实操

回顾一下消费者配置

```
1. 设置交换机类型

2. 将队列绑定到交换机

交换机类型：

    FanoutExchange 类型: 将消息分发到所有的绑定队列，无 routingkey 的概念

    HeadersExchange 类型：通过添加属性 key-value 匹配

    DirectExchange :按照 routingkey 分发到指定队列

    TopicExchange : 多关键字匹配
```

![](https://ask.qcloudimg.com/http-save/1752328/40xy0pxup6.png)

- 测试代码![](https://ask.qcloudimg.com/http-save/1752328/241abybr0z.png)
- 查看管控台![](https://ask.qcloudimg.com/http-save/1752328/o9my25uar7.png)
![](https://ask.qcloudimg.com/http-save/1752328/oeo15kzdhv.png)3 SpringAMQP - RabbitMQ声明式配置使用SpringAMQP 声明即在 rabbit 基础 API 里面声明一个 exchange、Bingding、queue。使用SpringAMQP 去声明，就需要使用 @Bean 的声明方式
![](https://ask.qcloudimg.com/http-save/1752328/rrudv922oq.png)
- 查看管控台![](https://ask.qcloudimg.com/http-save/1752328/bmbhqjfvgz.png)
![](https://ask.qcloudimg.com/http-save/1752328/xqvvn6iovu.png)3 消息模板 - RabbitTemplate上节中最后提到,这是与与 SpringAMQP 整合发送消息的关键类,它提供了丰富的发送消息方法
包括可靠性投递消息方法、回调监听消息接口 `ConfirmCallback`、返回值确认接口 `ReturnCallback`等.
同样我们需要注入到 Spring 容器中，然后直接使用.
RabbitTemplate 在 Spring 整合时需要实例化，但是在 Springboot 整合时，在配置文件里添加配置即可
- 先声明bean
![](https://ask.qcloudimg.com/http-save/1752328/j0v766iwi6.png)
- 测试![](https://ask.qcloudimg.com/http-save/1752328/nl9po7frge.png)4 SpringAMQP消息容器-SimpleMessageListenerContainer这个类非常的强大，我们可以对他进行很多的设置，用对于消费者的配置项，这个类都可以满足。它有监听单个或多个队列、自动启动、自动声明功能。
- 设置事务特性、事务管理器、事务属性、事务并发、是否开启事务、回滚消息等。但是我们在实际生产中，很少使用事务，基本都是采用补偿机制
- 设置消费者数量、最小最大数量、批量消费
- 设置消息确认和自动确认模式、是否重回队列、异常捕获 Handler 函数
- 设置消费者标签生成策略、是否独占模式、消费者属性等
- 设置具体的监听器、消息转换器等等。

> SimpleMessageListenerContainer 可以进行动态设置，比如在运行中的应用可以动态的修改其消费者数量的大小、接收消息的模式等。很多基于 RabbitMQ 的自制定化后端管控台在进行设置的时候，也是根据这一去实现的
> ![](https://ask.qcloudimg.com/http-save/1752328/9nypyd84qq.png)
> ![](https://ask.qcloudimg.com/http-save/1752328/bybzz77hh0.png)
> ![](https://ask.qcloudimg.com/http-save/1752328/q601ygg6zf.png)
> ![](https://ask.qcloudimg.com/http-save/1752328/990mvk9fss.png)
> ![](https://ask.qcloudimg.com/http-save/1752328/tnkf7i5b3w.png)5 SpringAMQP消息适配器-MessageListenerAdapter消息监听适配器,通过反射将消息处理委托给目标监听器的处理方法,并进行灵活的消息类型转换.
> 允许监听器方法对消息内容类型进行操作,完全独立于RabbitMQ API

默认情况下，传入Rabbit消息的内容在被传递到目标监听器方法之前被提取，以使目标方法对消息内容类型进行操作以String或者byte类型进行操作，而不是原始Message类型。 （消息转换器）

消息类型转换委托给MessageConverter接口的实现类。 默认情况下，将使用SimpleMessageConverter。 （如果您不希望进行这样的自动消息转换，

那么请自己通过#setMessageConverter MessageConverter设置为null）

如果目标监听器方法返回一个非空对象（通常是消息内容类型，例如String或byte数组），它将被包装在一个Rabbit Message 中，并发送使用来自Rabbit ReplyTo属性或通过#setResponseRoutingKey(String)指定的routingKey的routingKey来传送消息。（使用rabbitmq 来实现异步rpc功能时候会使用到这个属性）。

注意：发送响应消息仅在使用ChannelAwareMessageListener入口点（通常通过Spring消息监听器容器）时可用。 用作MessageListener不支持生成响应消息。

## 源码分析

![](https://ask.qcloudimg.com/http-save/1752328/iwu46uim7y.png)

继承自`AbstractAdaptableMessageListener`类,实现了`MessageListener`和`ChannelAwareMessageListener`接口

而`MessageListener`和`ChannelAwareMessageListener`接口的`onMessage`方法就是具体容器监听队列处理队列消息的方法

![](https://ask.qcloudimg.com/http-save/1752328/h23mzyesnx.png)

## 实操

- 委托类MessageDelegate,类中定义的方法也就是目标监听器的处理方法
![](https://ask.qcloudimg.com/http-save/1752328/97mw4ydtyp.png)
- 配置类代码![](https://ask.qcloudimg.com/http-save/1752328/ld4c55n8pg.png)
- 运行测试代码
![](https://ask.qcloudimg.com/http-save/1752328/1x753326c7.png)
- 结果
![](https://ask.qcloudimg.com/http-save/1752328/nc35xsibsw.png)

从源码分析小节中的成员变量,我们可以看出使用MessageListenerAdapter处理器进行消息队列监听处理

- 如果容器没有设置setDefaultListenerMethod
则处理器中默认的处理方法名是`handleMessage`
- 如果设置了setDefaultListenerMethod
![](https://ask.qcloudimg.com/http-save/1752328/u7l19d36x7.png)
则处理器中处理消息的方法名就是setDefaultListenerMethod方法参数设置的值
![](https://ask.qcloudimg.com/http-save/1752328/a7l9kn8chq.png)

也可以通过setQueueOrTagToMethodName方法为不同的队列设置不同的消息处理方法。

`MessageListenerAdapter`的`onMessage`方法

- 如果将参数改为String运行会出错!应当是字节数组,这时就需要使用转换器才能保证正常运行
![](https://ask.qcloudimg.com/http-save/1752328/ae6pvmeybe.png)
- 使用转换器
![](https://ask.qcloudimg.com/http-save/1752328/v1v9pc3dlv.png)
![](https://ask.qcloudimg.com/http-save/1752328/b1h6q653vm.png)
![](https://ask.qcloudimg.com/http-save/1752328/mwqgccfg5n.png)
测试代码运行成功!
![](https://ask.qcloudimg.com/http-save/1752328/yyptcmjp3q.png)
![](https://ask.qcloudimg.com/http-save/1752328/yn60redc67.png)
![](https://ask.qcloudimg.com/http-save/1752328/7h0m423b23.png)6 消息转换器 - MessageConverter我们在进行发送消息的时候，正常情况下消息体为二进制的数据方式进行传输，如果希望内部帮我们进行转换，或者指定自定义的转换器，就需要用到 `MessageConverter`了
- 我们自定义常用转换器,都需要实现这个接口,然后重写其中的两个方法
![](https://ask.qcloudimg.com/http-save/1752328/k8r8bzqetf.png)常见的转换器
- Json 转换器 - jackson2JsonMessageConverter
Java 对象的转换功能
- DefaultJackson2JavaTypeMapper 映射器
Java对象的映射关系
- 自定义二进制转换器
比如图片类型、PDF、PPT、流媒体实操
- Order类
![](https://ask.qcloudimg.com/http-save/1752328/gj0n7wobqo.png)
![](https://ask.qcloudimg.com/http-save/1752328/4bgm5e2mes.png)
- 配置JSON转换器![](https://ask.qcloudimg.com/http-save/1752328/4nbr1p9ytq.png)
- 测试代码
![](https://ask.qcloudimg.com/http-save/1752328/6poqzsqa5y.png)
![](https://ask.qcloudimg.com/http-save/1752328/uhejxis0mf.png)
- 配置Java对象转换器
![](https://ask.qcloudimg.com/http-save/1752328/bzitgk82hz.png)
- 测试代码及结果
![](https://ask.qcloudimg.com/http-save/1752328/frhvebkb6q.png)
- 多个Java对象映射转换![](https://ask.qcloudimg.com/http-save/1752328/pqvss4kdac.png)
- 测试代码及结果
![](https://ask.qcloudimg.com/http-save/1752328/ulnwpd92jp.png)
![](https://ask.qcloudimg.com/http-save/1752328/8zjddshe8f.png)
- 全局转换器
![](https://ask.qcloudimg.com/http-save/1752328/u44g6prz4a.png)
- 图片转换器实现
![](https://ask.qcloudimg.com/http-save/1752328/q7bgyij5hz.png)
- PDF转换器实现
![](https://ask.qcloudimg.com/http-save/1752328/1zw51c4ptq.png)
![](https://ask.qcloudimg.com/http-save/1752328/kglxy65s78.png)
- 测试代码及结果
![](https://ask.qcloudimg.com/http-save/1752328/zit6dr52mt.png)![](https://ask.qcloudimg.com/http-save/1752328/sm7vfk7v18.png)7 RabbitMQ与SpringBoot2.x整合实战7.1 配置详解
- publisher-confirms 
实现一个监听器监听 broker  给我们返回的确认请求`RabbitTemplate.ConfirmCallback`
- publisher-returns
保证消息对 broker 可达,若出现路由键不可达情况,则使用监听器对不可达消息后续处理,保证消息路由成功 - `RabbitTemplate.ReturnCallback`在发送消息的时候对 template 进行配置 `mandatory = true` 保证监听有效

> 在生产端还可以配置其他属性，比如发送重试、超时时间、次数、间隔等Pro

- 配置文件
![](https://ask.qcloudimg.com/http-save/1752328/1i661jljr8.png)
- 主配置
![](https://ask.qcloudimg.com/http-save/1752328/e2vdkdw6kw.png)
- 添加一个自定义的交换机
![](https://ask.qcloudimg.com/http-save/1752328/a4ieeeghdj.png)
- 添加一个Q
![](https://ask.qcloudimg.com/http-save/1752328/bdheurjnrv.png)
- 建立绑定关系
![](https://ask.qcloudimg.com/http-save/1752328/5ywzyavo53.png)
![](https://ask.qcloudimg.com/http-save/1752328/qgnczgoc07.png)
![](https://ask.qcloudimg.com/http-save/1752328/sskxafusut.png)
- 测试及结果
![](https://ask.qcloudimg.com/http-save/1752328/gh1rhlcpbi.png)Con配置消费端的 RabbitListener 是一个组合注解，里面可以注解配置 。
@QueueBinding @Queue @Exchange 直接通过这个组合注解一次性搞定消费端交换机、队列、绑定、路由、并且配置监听功能等。
- 将Pro中的绑定全部删除,再启动Con的sb服务
![](https://ask.qcloudimg.com/http-save/1752328/ko5uodqd5o.png)
![](https://ask.qcloudimg.com/http-save/1752328/66c24mrh64.png)发送一个 Java 实体对象
- 在Con声明队列、交换机、routingKey基本配置
![](https://ask.qcloudimg.com/http-save/1752328/34wj58j9gk.png)
- Con
![](https://ask.qcloudimg.com/http-save/1752328/18zbqg10cs.png)Payload 注解中的路径要跟Pro的实体路径完全一致，要不然会找到不到该类,这里为了简便就不写一个 common.jar 了，在实际开发里面，这个 Java Bean 应该放在 common.jar中
- 注意实体要实现 Serializable 序列化接口，要不然发送消息会失败
![](https://ask.qcloudimg.com/http-save/1752328/gkg7nc2dje.png)
- Pro 照样跟着写一个发消息的方法
![](https://ask.qcloudimg.com/http-save/1752328/cos40ujgcr.png)
- 测试代码及结果
![](https://ask.qcloudimg.com/http-save/1752328/znrwgq8d3x.png)
![](https://ask.qcloudimg.com/http-save/1752328/3wjwi79m0w.png)8  RabbitMQ & Spring Cloud Stream整合实战Spring Cloud全家桶在整个中小型互联网公司异常的火爆,Spring Cloud Stream也就渐渐的被大家所熟知,本小节主要来绍RabbitMQ与Spring Cloud Stream如何集成8.1 编程模型要了解编程模型，您应该熟悉以下核心概念
- 目标绑定器
提供与外部消息传递系统集成的组件
- 目标绑定
外部消息传递系统和应用程序之间的桥接提供的生产者和消费者消息（由目标绑定器创建）
- 消息
生产者和消费者用于与目标绑定器（以及通过外部消息传递系统的其他应用程序）通信的规范数据结构
![](https://ask.qcloudimg.com/http-save/1752328/mv4obhhhye.png)8.2 应用模型Spring Cloud Stream应用程序由中间件中立核心组成。该应用程序通过Spring Cloud Stream注入其中的输入和输出通道与外界通信。通过中间件特定的Binder实现，通道连接到外部代理。
![](https://ask.qcloudimg.com/http-save/1752328/z230dqw46i.png)8.3 RabbitMQ绑定概述![](https://ask.qcloudimg.com/http-save/1752328/adrj0fm9xh.png)默认情况下，RabbitMQ Binder实现将每个目标映射到TopicExchange。对于每个使用者组，Queue绑定到该TopicExchange。每个使用者实例都为其组的Queue具有相应的RabbitMQ Consumer实例。对于分区生成器和使用者，队列以分区索引为后缀，并使用分区索引作为路由键。对于匿名使用者（没有组属性的用户），使用自动删除队列（具有随机的唯一名称）。

Barista接口: Barista接口是定义来作为后面类的参数，这一接口定义来通道类型和通道名称，通道名称是作为配置用，通道类型则决定了app会使用这一 通道进行发送消息还是从中接收消息

## 8.4 扩展 - 注解

- @Output:输出注解，用于定义发送消息接口
- @Input:输入注解，用于定义消息的消费者接口
- @StreamListener:用于定义监听方法的注解

使用Spring Cloud Stream非常简单，只需要使用好这3个注解即可，在实现高性能消息的生产和消费的场景非常适合，但是使用SpringCloudStream框架有一个非常大的问题就是不能实现可靠性的投递，也就是没法保证消息的100%可靠性，会存在少量消息丢失的问题

这个原因是因为SpringCloudStream框架为了和Kafka兼顾所以在实际工作中使用它的目的就是针对高性能的消息通信的!这点就是在当前版本Spring Cloud Stream的定位

## 8.5 实操

### Pro

- pom核心文件
![](https://ask.qcloudimg.com/http-save/1752328/249yybdtpv.png)
- Sender
![](https://ask.qcloudimg.com/http-save/1752328/eiuhyxfhic.png)
注解`@EnableBinding`声明了这个应用程序绑定了2个通道：INPUT和OUTPUT。这2个通道是在接口`Barista`中定义的（Spring Cloud Stream默认设置）。所有通道都是配置在一个具体的消息中间件或绑定器中
- Barista接口
![](https://ask.qcloudimg.com/http-save/1752328/t1v54e2ib8.png)
- @Input
声明了它是一个输入类型的通道，名字是Barista.INPUT\_CHANNEL，也就是position3的input\_channel。这一名字与上述配置app2的配置文件中position1应该一致，表明注入了一个名字叫做input\_channel的通道，它的类型是input，订阅的主题是position2处声明的mydest这个主题  
- @Output
声明了它是一个输出类型的通道，名字是output\_channel。这一名字与app1中通道名一致，表明注入了一个名字为output\_channel的通道，类型是output，发布的主题名为mydest。
 
- Bindings — 声明输入和输出通道的接口集合。
- Binder — 消息中间件的实现，如Kafka或RabbitMQ
- Channel — 表示消息中间件和应用程序之间的通信管道
- StreamListeners — bean中的消息处理方法，在中间件的MessageConverter特定事件中进行对象序列化/反序列化之后，将在信道上的消息上自动调用消息处理方法。
- Message Schemas — 用于消息的序列化和反序列化，这些模式可以静态读取或者动态加载，支持对象类型的演变。

将消息发布到指定目的地是由发布订阅消息模式传递。发布者将消息分类为主题，每个主题由名称标识。订阅方对一个或多个主题表示兴趣。中间件过滤消息，将感兴趣的主题传递给订阅服务器。订阅方可以分组，消费者组是由组ID标识的一组订户或消费者，其中从主题或主题的分区中的消息以负载均衡的方式递送。

### Con

- Pom核心文件
![](https://ask.qcloudimg.com/http-save/1752328/9e6uyr0c67.png)
- 应用启动类
![](https://ask.qcloudimg.com/http-save/1752328/4siablpy4g.png)
- Barista接口
![](https://ask.qcloudimg.com/http-save/1752328/zmyuolstwm.png)
- 配置文件
![](https://ask.qcloudimg.com/http-save/1752328/bajfl8zy3g.png)
- 接收
![](https://ask.qcloudimg.com/http-save/1752328/5qtth2tk4h.png)
- 启动Con服务,查看管控台
![](https://ask.qcloudimg.com/http-save/1752328/akc7jbuw0m.png)
![](https://ask.qcloudimg.com/http-save/1752328/3jdzcb4f2f.png)
![](https://ask.qcloudimg.com/http-save/1752328/93s34kdsvq.png)
- 运行Pro测试代码及结果
![](https://ask.qcloudimg.com/http-save/1752328/o2tjfrdquq.png)
![](https://ask.qcloudimg.com/http-save/1752328/pt78r9cg2t.png)
![](https://ask.qcloudimg.com/http-save/1752328/m8bgsiznna.png)

# 9 总结

本文我们学习了Spring AMQP的相关知识,通过实战对RabbitMQ集成Spring有了直观的认识，这样为

我们后续的学习、工作使用都打下了坚实的基础，最后我们整合了SpringBoot与Spring Cloud Stream,更方便更高效的集成到我们的应用服务中去!

# 参考

[SpringAMQP 用户管理组件 RabbitAdmin 以及声明式配置](https://juejin.im/post/5c541218e51d450134320378)

[Spring Boot - RabbitMQ源码分析](https://zhuanlan.zhihu.com/p/54450318)

[SpringAMQP 之 RabbitTemplate](https://juejin.im/post/5c5c29efe51d457fff4102f1)

[SpringAMQP 消息容器 - SimpleMessageListenerContainer](https://juejin.im/user/5c3dfed2e51d4552232fc9cd)

[MessageListenerAdapter详解](https://www.jianshu.com/p/d21bafe3b9fd)

[SpringAMQP 消息转换器 - MessageConverter](https://juejin.im/post/5c5d925de51d457fc75f7a0c)

[RabbitMQ 与 SpringBoot2.X 整合](https://juejin.im/post/5c64e3fd6fb9a049d132a557)

[Spring Cloud Stream](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/2.2.0.RELEASE/spring-cloud-stream.html#spring-cloud-stream-reference)

> 更多硬核干货请关注JavaEdge公众号