## 1.1 zookeeper 简介
- 中间件,提供协调服务
- 作用于分布式系统,发挥其优势,可以为大数据服务
- 支持 Java, 提供 Java 和 C语言的客户端 API
## 1.2 什么是分布式系统
- 很多台计算机组成一个整体,一个整体一致对外并且处理同一请求
- 内部的每台计算机都可以相互通信(REST/RPC)
- 客户端到服务端的一次请求到响应结束会经历多台计算机
## 1.3 分布式系统的瓶颈
### 1.3.1 zookeeper 的特性
- 一致性
数据一致性,数据按照顺序分批入库
- 原子性
事务要么成功要么失败,不会局部化
- 单一视图
客户端连接集群中的任一 zk 节点,数据都是一致的
- 可靠性
每次对 zk的操作状态都会保存在服务端
- 实时性
客户端可以读取到 zk 服务端的最新数据
## 21
安装 JDK
## 2.2 zookeeper下载、安装以及配置环境变量
### 2.2.1 单机 zookeeper 安装
![](https://upload-images.jianshu.io/upload_images/4685968-6b631e38a62cc1da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-700753580ec852dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-261b82fe22647547.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![linux etc/profile](https://upload-images.jianshu.io/upload_images/4685968-deae751c55a32b7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
