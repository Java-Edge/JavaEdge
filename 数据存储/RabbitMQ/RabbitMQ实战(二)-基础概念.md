# 1 为什么是你? RabbitMQ
**RabbitMQ**是一个开源的消息代理和队列服务器,通过普通协议在完全不同的应用之间共享数据,使用Erlang语言编写,并且基于AMQP协议.

## 1.1 大厂们共同的抉择
- 滴滴、美团、头条、去哪儿、艺龙...
## 1.2 得天独厚的强势
- 开源,性能优秀,稳定性有保障
- 提供可靠性消息投递模式(confirm), 返回模式 ( return )
- 与Spring AMQP完美整合,API丰富
- 集群模式丰富，表达式配置，HA模式，镜像队列模型
- 保证数据不丢失的前提做到高可靠性、可用性

# 2 高性能之源
- Erlang语言 最初在于交换机领域的架构模式，这样使得RabbitMQ在Broker之间进行数据交互的性能是非常优秀的
- Erlang的优点: Erlang有着和原生Socket一样的延迟

# 3 AMQP协议
- AMQP全称: Advanced Message Queuing Protocol 高级消息队列协议
- AMQP定义
是具有现代特征的二进制协议。 是一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计

# 4 协议模型
![协议模型](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851026824_4685968-3fa11821afb7a76c.png)
# 5 AMQP核心概念
- Server: 又称Broker, 接受客户端的连接，实现AMQP实体服务
- Connection: 连接,应用程序与Broker的网络连接
- Channel:网络信道，几乎所有的操作都在Channel中进行，Channel是进行消息读写的通道。客户端可建立多个Channel,每个Channel代表一个会话任务
- Message:消息，服务器和应用程序之间传送的数据，由Properties和Body组成。Properties可以对消息进行修饰， 比如消息的优先级、延迟等高级特性; Body则就是消息体内容
- Virtual host:虚拟地址，用于进行逻辑隔离，最上层的消息路由.一个Virtual Host里面可以有若干个Exchange和Queue,同一个Virtual Host里面不能有相同名称的Exchange或Queue
- Exchange:交换机，接收消息，根据路由键转发消息到绑定的队列
- Binding: Exchange和Queue之间的虚拟连接，binding中可以包含routing key
- Routing key:一个路由规则，虚拟机可用它来确定如何路由一个特定消息
- Queue:也称为Message Queue,消息队列，保存消息并将它们转发给消费者
# 6 RabbitMQ整体架构与消息流转
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025088_4685968-ce290c3733324027.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025342_4685968-32a396a94a2ae823.png)

# 7 安装
##  7.1 本节食用指南
 - 官网地址: http://www.rabbitmq.com/
 - 预先准备:安装Linux必要依赖包
 - 下载RabbitMQ必须安装包
 - 配置文件修改
 
## 7.2 下载及安装
### 7.2.1 Ubuntu环境
![Linux环境参数](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025126_4685968-79d3f715df51a85e.png)

![下载页](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025144_4685968-d765a6a2e3c3a764.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851026272_4685968-0a59b59a7d8ae104.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025658_4685968-0ccc5dd0c60e2188.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851024994_4685968-84a27cb2b8dd4048.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025046_4685968-49685aaf0cebc790.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025347_4685968-e3363ae97e1e3aa7.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025185_4685968-a3b6dace04131f41.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025121_4685968-4486e98ee89a2302.png)
![ps -ef|grep rabbit 查看rabbitmq的启动情况](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025118_4685968-fecde47b89d333b8.png)

### 7.2.2 CentOS7.3
对于初学者,推荐使用一键式的RPM安装方式

- 注意与 erlang 版本的对应关系!
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939031_4685968-4eb4d12f7ef26555.png)

由于笔者使用3.6.5 版本.查看对应 erlang  
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938964_4685968-0f82ac96805dfb5d.png)
- [下载 erlang 环境](https://github.com/rabbitmq/erlang-rpm/releases/tag/v18.3.4.7)
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939035_4685968-c1f016f21f7f3e67.png)
- 下载完毕
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939063_4685968-d94bc52c251f13ae.png)
- rpm时报错,缺少依赖
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939013_4685968-aed71bbce9ddf545.png)
- 解决问题
![yum -y install openssl openssl-devel](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939294_4685968-5466ebb77c9de551.png)
- 再次 rpm
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938985_4685968-ad9aa195ee23f1c8.png)
- 下载 rabbitmq rpm 文件
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939232_4685968-25be26dac206f319.png)
- 下载完毕
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939207_4685968-dc8ddf03d806c44d.png)
- 安装报错
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938991_4685968-afbda6f09cac6eed.png)
- [下载 socat](http://repo.iotti.biz/CentOS/7/x86_64/socat-1.7.3.2-5.el7.lux.x86_64.rpm)
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938988_4685968-cb3bab5fc961ebc1.png)
- 安装 socat
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938985_4685968-27e779e2ef79f78a.png)
- 再次安装 rebbitmq 即可.
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939206_4685968-1f98705f1e335ef2.png)

####    配置文件
- 默认端口号
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938970_4685968-49f47112bd9e2c31.png)
- 编辑用户访问权限.  
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767939026_4685968-ee89665074a78924.png)
- 修改如下,暂时本地可访问
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767938980_4685968-812b0bb7f663f9e2.png)
### 7.2.3 macOS
- 下载安装RabbitMQ
```
  // 更新brew资源
  brew update
  // 执行安装
  brew install rabbitmq
```
MQ的安装目录在 /usr/local/Cellar/rabbitmq
- 安装RabiitMQ的可视化监控插件
```
 // 切换到MQ目录,注意你的安装版本可能不是3.7.15
   cd /usr/local/Cellar/rabbitmq/3.7.15/
   // 启用rabbitmq management插件
   sudo sbin/rabbitmq-plugins enable rabbitmq_management
   ```
- 配置环境变量
```
 sudo vi /etc/profile
 //加入以下两行
 export RABBIT_HOME=/usr/local/Cellar/rabbitmq/3.7.4
 export PATH=$PATH:$RABBIT_HOME/sbin
 // 立即生效
 source /etc/profile
 ```
 - 后台启动rabbitMQ
```
  // 后台启动
  rabbitmq-server -detached  
  // 查看状态
  rabbitmqctl status 
  // 访问可视化监控插件的界面
  // 浏览器内输入 http://localhost:15672,默认的用户名密码都是guest,登录后可以在Admin那一列菜单内添加自己的用户
  rabbitmqctl stop 关闭
```
# 8 基本使用
## 8.1 常用命令
- 启动服务
```
rabbitmq-server start &
```
- 停止服务
```
rabbitmqctl stop_ app
```
- 管理插件
```
rabbitmq-plugins enable rabbitmq_ management
```
- 访问地址
http://192.168.11.76:15672/

## 8.2 重启操作
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025219_4685968-963a2894eb98c4cf.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851026019_4685968-74b64ac26d7c1ea0.png)
![](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025403_4685968-e47acee359e085d4.png)
![启动成功](https://uploadfiles.nowcoder.com/files/20190618/5088755_1560851025555_4685968-19f527873e5eeb96.png)
# 9 quickstart - 消息的生产与消费
## 9.1 基本构建缺一不可
- ConnectionFactory:获取连接工厂
- Connection:一个连接
- Channel:数据通信信道,可发送和接收消息
- Queue:具体的消息存储队列
- Producer & Consumer生产和消费者
## 9.2 实操演示
- Pro
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692962_20190628193652304.png)
- Con
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692859_20190628193915667.png)
由于是Con端才创建有对列,所以必须先启动Con端,再启动Pro端!
分别启动运行

# 10 命令行与管控台常规操作
## 10.1  常用命令行
- rabbitmqctl stop_ app: 关闭应用
- rabbitmqctl start app: 启动应用
- rabbitmqctl status: 节点状态
- rabbitmqctl add_ user username password:添加用户
- rabbitmqctl list users:列出所有用户
- rabbitmqctl delete_ user username:删除用户
- rabbitmqctl clear permissions -p vhostpath username:清除用户权限
- rabbitmqctl list user_ permissions username:列出用户权限
- rabbitmqctl change_ password username newpassword:修改密码
- rabbitmqctl set permissions -p vhostpath username
- ".*"".*"".*": 设置用户权限
- rabbitmqctl add vhost vhostpath:创建虚拟主机
- rabbitmqctl list vhosts: 列出所有虚拟主机
- rabbitmqctl list_ permissions -p vhostpath:列出虚拟主机上所有权限
- rabbitmqctl delete vhost vhostpath:删除虚拟主机
- rabbitmqctl list queues:查看所有队列信息
- rabbitmqctl -p vhostpath purge_ queue blue:清除队列里的消息
- rabbitmqctl reset:移除所有数据，要在rabbitmqctl stop_ app之后使用
- rabbitmqctl join_cluster < clusternode > [- -ram] :组成集群命令
- rabbitmqctl cluster status: 查看集群状态 
- rabbitmqctl change_ cluster_ node type disc | ram 修改集群节点的存储形式
- rabbitmqctl forget_ cluster_ node [--offline]忘记节点(摘除节点)
- rabbitmqctl rename_cluster_node oldnode1 newnode1 [oldnode2] [newnode2...]修改节点名称

## 实操
- 查看端口占用
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692921_20190629071947772.png)
- ctl命令
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692960_20190629073308286.png)

![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767693422_20190629073427764.png)
## 10.2 管控台的管理
- 主界面
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692863_20190629073656555.png)
- 主界面-监测全部信息
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692950_20190629074300436.png)
- 主界面-当前节点的状态
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692572_20190629074412685.png)
- 主界面-当前节点一些存储路径
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767693040_20190629074634275.png)
- 主界面-端口号集锦
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692877_20190629074820528.png)
- 主界面-配置文件的导入导出 
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692918_20190629074919808.png)
- 管控台connection界面
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692602_20190628195233872.png)
- 管控台channel界面
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692965_20190628195326526.png)
- 管控台queues界面
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692958_20190628195409179.png)
- 管控台Exchanges界面![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692853_2019062907380147.png)
- 管理员界面-添加用户![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692906_20190629074008618.png)
- 管理员界面-添加虚拟主机
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692821_20190629074051979.png)
- 管理员界面-集群管理
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692896_20190629074142575.png)
# 13 Exchange交换机
Exchange:接收消息,并根据路由键转发消息所绑定的队列

![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516640_20190618190239461.png)
蓝色 - Send Message:把消息投递到交换机,由路由键路由到指定的队列
## 13.1 交换机属性

除交换机类型外，在声明交换机时还可以附带许多其他的属性，其中最重要的几个分别是：

- Name:交换机名称
- Type:交换机类型direct、topic、 fanout、 headers
- Durability：是否需要持久化。如果持久化，则RabbitMQ重启后，交换机还存在
- Auto-delete:当最后一个绑定到Exchange 上的队列删除后，自动删除该Exchange
- Internal:当前Exchange是否于RabbitMQ内部使用，默认为False

## 13.2 交换机类型
交换机主要包括如下4种类型：

Direct exchange（直连交换机）
Fanout exchange（扇型交换机）
Topic exchange（主题交换机）
Headers exchange（头交换机）
另外RabbitMQ默认定义一些交换机：

默认交换机
amq.* exchanges
还有一类特殊的交换机：Dead Letter Exchange（死信交换机）


### 13.2.1  Direct Exchange
所有发送到DE的消息被转发到RouteKey中指定的Queue

> 注意: Direct模式可以使用RabbitMQ自带的Exchange: default Exchange,所以不需要将Exchange进行任何绑定(binding)操作,消息传递时，RouteKey必须完全匹配才会被队列接收，否则该消息会被抛弃.

### 13.2.2  Direct Exchange原理示意图
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516429_20190619081555830.png)

### 13.2.3  Direct Exchange实操演示
- Pro
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516320_20190628022418734.png)

- Con
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516410_2019062802274235.png)

注意路由key保持一致!,分别启动
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516407_20190628022948117.png)

![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516635_20190628023039678.png)
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516358_20190628023113134.png)
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516333_20190628023150813.png)

### 13.2.2 Topic exchange
尽管使用直接交换改进了我们的系统，它仍然有局限性 - 不能做基于多个标准的路由.

在我们的日志系统中，我们可能不仅要根据严重性订阅日志，还要根据发出日志的源来订阅日志。你可能从syslog unix工具中了解这个概念，它根据严重性（info / warn / crit ...）和facility（auth / cron / kern ...）来路由日志。

这会给我们很多灵活性 - 我们可能想要监听来自'cron'的关键错误以及来自'kern'的所有日志。

为了在我们的日志记录系统中实现这一点，我们需要了解更复杂的主题交换机.

-  *可以匹配一个单词
- #可以匹配零个或多个单词。

- 所有发送到Topic Exchange的消息会被转发到所有关心RouteKey中指
定Topic的Queue上
- Exchange将RouteKey和某Topic进行模糊匹配，此时队列需要绑定一个Topic

#### 13.2.2.1 实例1
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516196_20190628051352790.png)
在这个例子中，我们将发送所有描述动物的消息。消息将与包含三个单词（两个点）的routing key一起发送.
routing key中的第一个单词描述速度，第二颜色，第三是物种：“<speed>。<color>。<species>”。

我们创建了三个绑定：Q1绑定了绑定键“* .orange.*”，Q2绑定了“*.*.rabbit”和“lazy.＃”

这些绑定可以总结为：
- Q1对所有橙色动物感兴趣
- Q2希望听到关于兔子的一切，以及关于懒惰动物的一切

routing key设置为“quick.orange.rabbit”的消息将传递到两个队列。消息“lazy.orange.elephant”也将同时发送给他们.
另一方面
- “quick.orange.fox”只会转到第一个队列
- 而“lazy.brown.fox”只会转到第二个队列
- “lazy.pink.rabbit”将仅传递到第二个队列一次，即使它匹配两个绑定
-  “quick.brown.fox”与任何绑定都不匹配，因此它将被丢弃。

如果我们违背我们的约定并发送带有一个或四个单词的消息，例如“orange” or “quick.orange.male.rabbit”，会发生什么?好吧,这些消息将不会匹配任何绑定,因此将丢失.

另一方面，“lazy.orange.male.rabbit”，虽然它有四个单词，也会匹配最后一个绑定，并将被传递到第二个队列。

#### 实例图
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516730_20190628052553900.png)

#### 实操演示
- Pro
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516444_20190628053322777.png)
- Con
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516575_20190628053433655.png)
- 启动消费者:
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516474_20190628053602232.png)
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516599_20190628053907220.png)

- 启动生产者:
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516693_20190628054158438.png)
消费端收到了消息

- 修改匹配格式,理论上只能接受前两个消息
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516252_20190628054346913.png)
- 注意在管控台,先将之前的匹配绑定取消!
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516339_20190628054522889.png)
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516582_20190628054740476.png)
- 显然仅能接受前两个消息
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516544_20190628054650595.png)
### 小结
主题交换机功能强大，可以像其他交换机一样运行。
当队列绑定“＃”（哈希）绑定key时 - 它将接收所有消息，而不管routing key - 就像在fanout交换机一样
当特殊字符“*”（星号）和“＃”（哈希）未在绑定中使用时，主题交换机的行为就像直接交换机一样。

### 13.2.3 Fanout Exchange
- 不处理路由键，只需要简单的将队列绑定到交换机上
- 发送到交换机的消息都会被转发到与该交换机绑定的所有队列上
- Fanout交换机转发消息是最快的
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516434_20190628055104655.png)
#### 实操演示
- Con
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516468_20190628055618209.png)
- Pro
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516487_2019062805565797.png)

- 启动消费端
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516548_20190628055850335.png)
- 不需要routing key
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516312_20190628055930417.png)
- 启动生产者后接收到的消息
![](https://uploadfiles.nowcoder.com/files/20190628/5088755_1561674516728_20190628060108305.png)

# 14 绑定(Binding)
- Exchange和Exchange、Queue之间的连接关系
- Binding中可以包含RoutingKey或者参数
# 15 Queue-消息队列
- 消息队列，实际存储消息数据
- Durability: 是否持久化，Durable: 是，Transient: 否
- Auto delete:如选yes,代表当最后一个监听被移除之后,该Queue会自动被删除.

# 16 Message-消息
- 服务器和应用程序之间传送的数据
- 本质上就是一段数据，由Properties和Payload ( Body )组成
## 16.1 常用属性
delivery mode、headers (自定义属性)
content_ type. content_ encoding. priority
correlation id. reply to
### expiration - 过期时间
这里就牵涉到RabbitMQ的TTL机制


message_ id
timestamp. type. user id. app_ id. cluster id

## 实操演示
- Con
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767693089_20190628185611250.png)
- 启动消费端
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692849_20190628185711229.png)
- Pro,注意TTL为10s
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692978_20190628185940760.png)
- 接着启动Pro,Con接收消息
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767692947_201906281908199.png)
- 现在5条消息,10s后为0消息全部已清除
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767693006_20190628190941412.png)
![](https://uploadfiles.nowcoder.com/files/20190629/5088755_1561767693233_20190628191050552.png)

# 17 总结
首先讲解互联网大厂为什么选择RabbitMQ? RabbitMQ的高性能之道是如何做到的？什么是AMPQ高级协议？AMPQ核心概念是什么？RabbitMQ整体架构模型是什么样子的？RabbitMQ消息是如何流转的？RabbitMQ安装与使用命令行与管控台，RabbitMQ消息生产与消费，RabbitMQ交换机详解，RabbitMQ队列、绑定、虚拟主机、消息等...
通过本文的学习，希望大家对RabbitMQ有一个整体的感知!
# 参考
[RabbitMQ官网](https://www.rabbitmq.com/tutorials/tutorial-five-java.html)
[mac + RabbitMQ 安装](https://www.jianshu.com/p/60c358235705)