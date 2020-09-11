# 1 lucene VS elasticsearch
lucene，最先进、功能最强大的Java搜索类库。直接基于lucene开发，非常复杂，api复杂（实现简单功能，写大量java代码），需要深入理解原理（各种索引结构）。

elasticsearch，基于lucene，隐藏复杂性，提供简单易用的restful api接口、java api接口（还有其他语言的api接口）
（1）分布式的文档存储引擎
（2）分布式的搜索引擎和分析引擎
（3）分布式，支持PB级数据

开箱即用，优秀的默认参数，不需要任何额外设置，完全开源。

# 2 核心概念
## Near Realtime（NRT）：近实时
	- 从写入数据到数据可以被搜索到有一个小延迟（大概1秒）
	- 基于es执行搜索和分析可以达到秒级

![](https://img-blog.csdnimg.cn/2019111722204995.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_16,color_FFFFFF,t_70)
## Cluster：集群
包含多个节点，每个节点属于哪个集群是通过一个配置（集群名称，默认是elasticsearch）来决定的，对于中小型应用来说，刚开始一个集群就一个节点很正常

## Node：节点
集群中的一个节点，节点也有一个名称（默认是随机分配的），节点名称很重要（在执行运维管理操作的时候），默认节点会去加入一个名称为“elasticsearch”的集群，如果直接启动一堆节点，那么它们会自动组成一个elasticsearch集群，当然一个节点也可以组成一个elasticsearch集群

## 索引 Index（表）
包含一堆相似结构的文档数据。
比如可以有一个客户索引，商品分类索引，订单索引。索引有一个名称
一个index包含很多document，一个index就代表了一类类似或相同的document。

比如建立一个product index 商品索引，里面可能就存放了所有的商品数据（商品document）。

## 类型 Type（表逻辑类型）ES7.x中删除
每个索引都可有一或多个type，type是index的一个逻辑数据分类。
一个type下的document，都有相同field。
比如博客系统，有一个索引，可定义用户数据type，博客数据type，评论数据type。

商品index，里面存放了所有的商品数据，商品document
但是商品分很多种类，每个种类的document的field可能不太一样
比如说电器商品，可能还包含一些诸如售后时间范围这样的特殊field；生鲜商品，还包含一些诸如生鲜保质期之类的特殊field

type，日化商品type，电器商品type，生鲜商品type
```sql
日化商品type：product_id，product_name，product_desc，category_id，category_name
电器商品type：product_id，product_name，product_desc，category_id，category_name，service_period
生鲜商品type：product_id，product_name，product_desc，category_id，category_name，eat_period
```

每个type里，包含一堆document
```json
{
  "product_id": "2",
  "product_name": "长虹电视机",
  "product_desc": "4k高清",
  "category_id": "3",
  "category_name": "电器",
  "service_period": "1年"
}
{
  "product_id": "3",
  "product_name": "基围虾",
  "product_desc": "纯天然，冰岛产",
  "category_id": "4",
  "category_name": "生鲜",
  "eat_period": "7天"
}
```
## Document & field（行 & 列）
一个document可以是一条客户数据，一条商品分类数据，一条订单数据，通常用JSON数据结构表示。

每个index下的type，都可以存储多个document。一个document里面有多个field，每个field就是一个数据字段列。
```json
product document
{
  "product_id": "1",
  "product_name": "JavaEdge 公众号",
  "product_desc": "全是技术干货",
  "category_id": "2",
  "category_name": "技术追求"
}
```

## shard
单台机器无法存储大量数据，es可以将一个索引中的数据切分为多个shard，分布在多台服务器上存储（类似分库分表）。

有了shard就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能
每个shard都是一个lucene index。

## replica
任何一个服务器随时可能故障或宕机，此时shard可能就会丢失，因此可以为每个shard创建多个replica副本。
replica可以在shard故障时提供备用服务，保证数据不丢失，多个replica还可以提升搜索操作的吞吐量和性能。primary shard（建立索引时一次设置，不能修改，默认5个），replica shard（随时修改数量，默认1个），默认每个索引10个shard，5个primary shard，5个replica shard，最小的高可用配置，是2台服务器。

- shard和replica的解释
![](https://img-blog.csdnimg.cn/20191117222016634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_16,color_FFFFFF,t_70)

- 参考
[Elasticsearch顶尖高手]


![](https://img-blog.csdnimg.cn/20200815233520523.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70#pic_center)