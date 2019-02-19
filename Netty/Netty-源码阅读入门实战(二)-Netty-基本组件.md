# 1 一个简单的socket例子
- 无 netty 前编写的代码
![](https://upload-images.jianshu.io/upload_images/4685968-49011e362a31c08b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-96e7bbd3dfaa7b04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8f10981312ab41e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ba0969c33489a19d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
传统的HTTP服务器的原理创建一个ServerSocket
- 监听并绑定一个端口一系列客户端来请求这个端口服务器使用Accept，获得一个来自客户端的Socket连接对象
- 启动一个新线程处理连接读Socket， 
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
![启动服务端](https://upload-images.jianshu.io/upload_images/4685968-7e6939e76c545990.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![启动客户端](https://upload-images.jianshu.io/upload_images/4685968-97232069e3bee071.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![流程图示](https://upload-images.jianshu.io/upload_images/4685968-3b13eb9ddaa71d58.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2 Netty对于socket的抽象
![](https://upload-images.jianshu.io/upload_images/4685968-228128687baf17d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 3 Netty组件简单介绍
## 3.1 NioEventLoop
netty的发动机
![](https://upload-images.jianshu.io/upload_images/4685968-b28a952c6ee94bad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Server 端的](https://upload-images.jianshu.io/upload_images/4685968-27086924b4df29de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![ Client 端的](https://upload-images.jianshu.io/upload_images/4685968-b4962219f3aeaf99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这些 `while(true)`就对应一个 run 方法
![NioEventLoop#run](https://upload-images.jianshu.io/upload_images/4685968-b8ec7273d501215c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0ee6aa13fdf0ba03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
netty里有不同的io编程模型实现，以Nio为例，对io事件的处理是在NioEventLoop里做的，事件的注册，是下面的这个方法
![](https://upload-images.jianshu.io/upload_images/4685968-28a96eeafd73b65e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-3d13611d5e291bb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
不同的事件调用unsafe的不同方法，netty对底层socket的操作都是通过unsafe来做的
unsafe主要由两种不同的实现
- NioMessageUnsafe
- NioByteUnsafe

`NioServerSocketChannel`使用的是NioMessageUnsafe来做socket操作
`NioSocketChannel`使用NioByteUnsafe来做socket操作




![处理每一个连接](https://upload-images.jianshu.io/upload_images/4685968-6f078d9cb066e364.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f6def49f0c4f6952.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-14e833d301f43792.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3.2 Channel
![](https://upload-images.jianshu.io/upload_images/4685968-1067a2b7a5e86bac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d3c1974aeb7d57b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 以服务端的NioMessageUnsafe为例来看下read()方法的实现,对应是否有新连接进来的情况
![](https://upload-images.jianshu.io/upload_images/4685968-ec2f911865618365.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![AbstractNioMessageChannel#doReadMessages](https://upload-images.jianshu.io/upload_images/4685968-e11ca29b94591008.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![NioServerSocketChannel#doReadMessages](https://upload-images.jianshu.io/upload_images/4685968-58ddf5810fe2b1fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
直接把底层的 channel 封装成 NioSocketChannel
![](https://upload-images.jianshu.io/upload_images/4685968-5dd32a06c0fea11b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1b7c9f5fd44b8d32.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-226b0494bc393dbb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3.3 ByteBuf 
![](https://upload-images.jianshu.io/upload_images/4685968-e48d7b9e97d233cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3.4 Pipeline
![](https://upload-images.jianshu.io/upload_images/4685968-6938d4269624fd1a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![小样例中对应内容,实际非常复杂](https://upload-images.jianshu.io/upload_images/4685968-5b781a2a3d5e77ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
netty 将其抽象成逻辑链,看看 netty 是怎么把每个 pipeline 加入到客户端连接的
![](https://upload-images.jianshu.io/upload_images/4685968-cb674c9e03246340.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-fae0cc3c44367551.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-900c3e427e4376e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-912e11e2a5d7f323.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f9c1c999e2ea9481.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3.5 ChannelHandler
![](https://upload-images.jianshu.io/upload_images/4685968-4f7525c5919e6f5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-78d1d6ecb409a9e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-75906ed6b687c303.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
