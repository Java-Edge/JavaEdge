
# 1 面试题

如何保证消息的顺序性？

# 2 考点分析
其实这个也是用MQ的时候必问的话题，第一看看你了解不了解顺序这个事
第二看看你有没有办法保证消息是有顺序的,这个生产系统中常见的问题。

# 3 详解
举个例子，一个mysql binlog同步的系统，压力还是非常大的，日同步数据要达到上亿.
mysql -> mysql，常见的一点在于说大数据team，就需要同步一个mysql库过来，对公司的业务系统的数据做各种复杂的操作。

你在mysql里增删改一条数据，对应出来了增删改3条binlog，接着这三条binlog发送到MQ里面，到消费出来依次执行，起码得保证人家是按照顺序来的吧？
不然本来是：增加、修改、删除；
你楞是换了顺序给执行成删除、修改、增加
不全错了么!

本来这个数据同步过来，应该最后这个数据被删除了；结果你搞错了这个顺序，最后这个数据保留下来了，数据同步就出错了。

先看看顺序会错乱的俩场景
-  rabbitmq
一个queue，多个consumer，这不明显乱了
- kafka
一个topic，一个partition，一个consumer，内部多线程，这不也明显乱了

那如何保证消息的顺序性呢？简单简单

- rabbitmq
拆分多个queue，每个queue一个consumer，就是多一些queue而已，确实是麻烦点
或者就一个queue但是对应一个consumer，然后这个consumer内部用内存队列做排队，然后分发给底层不同的worker来处理

- kafka
一个topic，一个partition，一个consumer，内部单线程消费，写N个内存queue，然后N个线程分别消费一个内存queue即可

# X 交流学习
![](https://img-blog.csdnimg.cn/20190504005601174.jpg)
## [Java交流群](https://jq.qq.com/?_wv=1027&k=5UB4P1T)
![](https://img-blog.csdnimg.cn/20190502142519844.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_16,color_FFFFFF,t_70)

## [博客](http://www.shishusheng.com)

![](https://img-blog.csdnimg.cn/20190502142541289.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_16,color_FFFFFF,t_70)

## [Github](https://github.com/Wasabi1234)