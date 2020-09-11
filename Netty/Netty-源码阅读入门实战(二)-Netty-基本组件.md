# 1 传统的无 Netty  代码
![](https://img-blog.csdnimg.cn/20200507020656835.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNjc4MjMxMS1hYjY3ZDYwNWFhOTRlYjVhLnBuZw?x-oss-process=image/format,png)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNjc4MjMxMS1mYTA4NTNjNmVmNDFmOTdlLnBuZw?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNjc4MjMxMS1mNjM4NmMwNGI0OTA2MWQ4LnBuZw?x-oss-process=image/format,png)


## 1.1 传统的HTTP服务器的原理
1. 创建一个ServerSocket
2. 监听并绑定一个端口一系列客户端来请求这个端口服务器使用Accept，获得一个来自客户端的Socket连接对象
3. 启动一个新线程处理连接读Socket， 
    -  得到字节流解码协议
    -  得到Http请求对象处理Http请求
    -  得到一个结果
    -  封装成一个HttpResponse对象编码协议
    -  将结果序列化字节流写Socket，
    -  将字节流发给客户端
- 继续循环步骤3

- 流程
  - 服务端监听端口
  - 客户端会连接服务端
  - 客户端每次都会写数据,间歇5s
  - 服务端收到并写回客户端
![启动服务端](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTdlNjkzOWU3NmM1NDU5OTAucG5n?x-oss-process=image/format,png)
![启动客户端](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTk3MjMyMDY5ZTNiZWUwNzEucG5n?x-oss-process=image/format,png)

![流程图示](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTNiMTNlYjlkZGFhNzFkNTgucG5n?x-oss-process=image/format,png)

# Netty 对 socket的抽象
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTIyODEyODY4N2JhZjE3ZDAucG5n?x-oss-process=image/format,png)

# 3 Netty组件
## 3.1 NioEventLoop
- Netty的发动机
![](https://img-blog.csdnimg.cn/20200806005304407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)


- Server端
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTI3MDg2OTI0YjRkZjI5ZGUucG5n?x-oss-process=image/format,png)
- Client端![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWI0OTYyMjE5ZjNhZWFmOTkucG5n?x-oss-process=image/format,png)

>  `while(true)`就对应一个 run 方法

- NioEventLoop#run
![](https://img-blog.csdnimg.cn/20200806010144389.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200806010449923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)

netty有不同的io编程模型实现。
- 以NIO为例，对IO事件的处理是在NioEventLoop里做的，事件的注册在下面的方法
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTI4YTk2ZWVhZmQ3M2I2NWUucG5n?x-oss-process=image/format,png)
![](https://img-blog.csdnimg.cn/20200806010950284.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)

不同事件调用unsafe的不同方法，netty对底层socket的操作都是通过unsafe来做的
unsafe主要由两种不同的实现：
1. NioMessageUnsafe
`NioServerSocketChannel`使用的是NioMessageUnsafe来做socket操作
2. NioByteUnsafe
`NioSocketChannel`使用NioByteUnsafe来做socket操作


- 处理每一个连接![](https://img-blog.csdnimg.cn/20200806012815139.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200806013038646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200806013158967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70)


## 3.2 Channel
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTEwNjdhMmI3YTVlODZiYWMucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWQzYzE5NzRhZWI3ZDU3YjkucG5n?x-oss-process=image/format,png)
- 以服务端的NioMessageUnsafe为例来看下read()方法的实现,对应是否有新连接进来的情况
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWVjMmY5MTE4NjU2MTgzNjUucG5n?x-oss-process=image/format,png)
![AbstractNioMessageChannel#doReadMessages](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWUxMWNhMjliOTQ1OTEwMDgucG5n?x-oss-process=image/format,png)
![NioServerSocketChannel#doReadMessages](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTU4ZGRmNTgxMGZlMmIxZmQucG5n?x-oss-process=image/format,png)
直接把底层的 channel 封装成 NioSocketChannel
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTVkZDMyYTA2YzBmZWExMWIucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTFiN2M5ZjVmZDQ0YjhkMzIucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTIyNmIwNDk0YmMzOTNkYmIucG5n?x-oss-process=image/format,png)
## 3.3 ByteBuf 
[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-daTSBWg3-1588703214425)(https://upload-images.jianshu.io/upload_images/4685968-e48d7b9e97d233cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)]
## 3.4 Pipeline
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTY5MzhkNDI2OTYyNGZkMWEucG5n?x-oss-process=image/format,png)
![小样例中对应内容,实际非常复杂](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTViNzgxYTJhM2Q1ZTc3ZWEucG5n?x-oss-process=image/format,png)
netty 将其抽象成逻辑链,看看 netty 是怎么把每个 pipeline 加入到客户端连接的
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWNiNjc0YzllMDMyNDYzNDAucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWZhZTBjYzNjNDQzNjc1NTEucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTkwMGMzZTQyN2U0Mzc2ZTkucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTkxMmUxMWUyYTVkN2YzMjMucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LWY5YzFjOTk5ZTJlYTk0ODEucG5n?x-oss-process=image/format,png)
## 3.5 ChannelHandler
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTRmNzUyNWM1OTE5ZTZmNWQucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTc4ZDFkNmVjYjQwOWE5ZTcucG5n?x-oss-process=image/format,png)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80Njg1OTY4LTc1OTA2ZWQ2YjY4N2MzMDMucG5n?x-oss-process=image/format,png)

todo:重写