- 订单服务源码
https://github.com/Wasabi1234/SpringCloud_OrderDemo
- 商品服务源码
https://github.com/Wasabi1234/SpringCloud_ProductDemo
# 1 HTTP vs RPC
![](https://upload-images.jianshu.io/upload_images/4685968-f041c5fb7bb431c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1f7cf6a5bc0efb56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5-2 RestTemplate的三种使用方式
![](https://upload-images.jianshu.io/upload_images/4685968-2454cfac6b656fe4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-80de5fd2bf2a7166.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-387c752a42b2db6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 3 负载均衡器：Ribbion
![](https://upload-images.jianshu.io/upload_images/4685968-d4c0cf6674cd5a04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-5267af879928b290.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 4 追踪源码自定义负载均衡策略
![command+option+B进入其实现类](https://upload-images.jianshu.io/upload_images/4685968-0c7b91594a7383ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![再跟进到 LoadBalancerClient 中](https://upload-images.jianshu.io/upload_images/4685968-870d3db62839a7a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e4477b1162f7d7f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-654c94abab50d9e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![RibbonLoadBalancerClient#choose()](https://upload-images.jianshu.io/upload_images/4685968-a20e091263dba95e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![RibbonLoadBalancerClient#getServer(ILoadBalancer loadBalancer)](https://upload-images.jianshu.io/upload_images/4685968-8bcf075c2c226403.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f018654a5a56246d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![ILoadBalancer](https://upload-images.jianshu.io/upload_images/4685968-a2896dbd8e20e6fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![RibbonLoadBalancerClient#getServer(ILoadBalancer loadBalancer)](https://upload-images.jianshu.io/upload_images/4685968-1de6f76250e72499.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d2580bd69fa7b00a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![ILoadBalancer#getAllServers(),并进入](https://upload-images.jianshu.io/upload_images/4685968-07ad60b91490b439.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

启动两个 Product 服务
![product#1](https://upload-images.jianshu.io/upload_images/4685968-74bf49fdb4693bbb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![product#2](https://upload-images.jianshu.io/upload_images/4685968-678f5d8efc9874ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
再 debug 启动 Order 服务
![](https://upload-images.jianshu.io/upload_images/4685968-5459f6624b6c2c4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![三个服务成功注册](https://upload-images.jianshu.io/upload_images/4685968-56c6d90f591876b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![在此打断点,并 debug 运行](https://upload-images.jianshu.io/upload_images/4685968-216c048fcb2d81b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8b1780f03e9c1d6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![获取服务列表](https://upload-images.jianshu.io/upload_images/4685968-88b93436f679df8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 再看看其负载均衡策略
![](https://upload-images.jianshu.io/upload_images/4685968-fea74ceedececba0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![可见默认即轮询](https://upload-images.jianshu.io/upload_images/4685968-adbc26297c4c1a6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
负载均衡请求
![请求到2](https://upload-images.jianshu.io/upload_images/4685968-762b78394d1a24cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![请求到1](https://upload-images.jianshu.io/upload_images/4685968-e915ca7152c126dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
的确是轮询请求
![](https://upload-images.jianshu.io/upload_images/4685968-1f5e567540866890.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![通过启动日志也可看出具体使用的策略](https://upload-images.jianshu.io/upload_images/4685968-4fc12abc189880b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
为了检验是否为轮询,在此打断点
![](https://upload-images.jianshu.io/upload_images/4685968-ade609cb0e9a3d48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![符合预期,确实为轮询](https://upload-images.jianshu.io/upload_images/4685968-1cbe89440a665a66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果希望使用其他负载均衡规则该咋办呢,看官网文档
![](https://upload-images.jianshu.io/upload_images/4685968-8e0cc0c6f35ceb67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![如希望用随机规则替代默认的轮询规则](https://upload-images.jianshu.io/upload_images/4685968-0d853157c3fb4865.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![配置全路径名](https://upload-images.jianshu.io/upload_images/4685968-03079aa3a5629dba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![成功替换默认规则](https://upload-images.jianshu.io/upload_images/4685968-16ae303c572d5cea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5-5 Feign的使用
[Feign](https://github.com/Netflix/feign)是一个声明式的Web服务客户端。这使得Web服务客户端的写入更加方便 要使用Feign创建一个界面并对其进行注释。它具有可插入注释支持，包括Feign注释和JAX-RS注释。Feign还支持可插拔编码器和解码器。Spring Cloud增加了对Spring MVC注释的支持，并使用Spring Web中默认使用的`HttpMessageConverters`。Spring Cloud集成Ribbon和Eureka以在使用Feign时提供负载均衡的http客户端。

![](https://upload-images.jianshu.io/upload_images/4685968-5972f706ce3ac05e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###如何加入Feign
1. 要在您的项目中包含Feign，请使用组`org.springframework.cloud`和工件ID `spring-cloud-starter-openfeign`的启动器
![](https://upload-images.jianshu.io/upload_images/4685968-31f11ff571872fdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 在启动类添加注解@EnableFeignClients
可以在@EnableFeignClients属性defaultConfiguration中以与上述相似的方式指定默认配置
不同之处在于，此配置将适用于所有feigh客户端
![](https://upload-images.jianshu.io/upload_images/4685968-13a5b3af37953d80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
调用商品服务的目标接口
![](https://upload-images.jianshu.io/upload_images/4685968-c8e1dffd0622f73d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 声明调用的服务接口方法
- @FeignClient 
name属性为某所需调用的某个服务的接口
在`@FeignClient`注释中，String值（以上“存储”）是一个任意的客户端名称，用于创建Ribbon负载平衡器,还可以使用url属性（绝对值或只是主机名）指定URL。应用程序上下文中的bean的名称是该接口的完全限定名称。要指定自己的别名值，可以使用`@FeignClient`注释的`qualifier`值。
![添加@FeignClient注解](https://upload-images.jianshu.io/upload_images/4685968-87af778e8ecf80fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Feign](https://upload-images.jianshu.io/upload_images/4685968-782c6736bf4a724f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 6 获取商品列表(Feign)
![接口信息](https://upload-images.jianshu.io/upload_images/4685968-1d9f623ae63f90d2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![dao层测试接口正常](https://upload-images.jianshu.io/upload_images/4685968-b96e3f45ad719073.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![service 层单测正常](https://upload-images.jianshu.io/upload_images/4685968-ba80ef635837598a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![准备提供该接口](https://upload-images.jianshu.io/upload_images/4685968-5b2177d4cee4cfc7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Order 服务中访问接口](https://upload-images.jianshu.io/upload_images/4685968-e42e576475bf954d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![报错](https://upload-images.jianshu.io/upload_images/4685968-df7b94f7291e8eb7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为参数使用了 RequestBody 注解,所以需 POST 请求
![](https://upload-images.jianshu.io/upload_images/4685968-12a0419f6b989f60.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ae2951c5618e9362.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-244b9e33063a24b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d1c5a6066514eeb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c42d5fdafe68d842.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 7 扣库存(Feign)
![调用接口](https://upload-images.jianshu.io/upload_images/4685968-b089834ead048668.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![发现报错](https://upload-images.jianshu.io/upload_images/4685968-dafe45dc7b1ae52d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![控制台](https://upload-images.jianshu.io/upload_images/4685968-d7a687e66f1f2522.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于缺失无参构造器
![](https://upload-images.jianshu.io/upload_images/4685968-58c102ea03028e19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 8 整合接口打通下单流程(Feign)
bug!!!!!!!!!!!!
# 9 项目改造成多模块
![多模块](https://upload-images.jianshu.io/upload_images/4685968-6ab2b2b5dd4eb96e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![依赖关系](https://upload-images.jianshu.io/upload_images/4685968-9762834167c8bcf8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 10 同步or异步
# 11 RabbitMQ的安装
# 12 微服务，Docker和DevOps
![微服务和容器天生一对](https://upload-images.jianshu.io/upload_images/4685968-ef990e0667ccb065.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-fa496c6e06907caa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
