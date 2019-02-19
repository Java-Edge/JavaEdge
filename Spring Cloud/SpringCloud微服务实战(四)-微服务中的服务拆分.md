- 订单服务源码
https://github.com/Wasabi1234/SpringCloud_OrderDemo
- 商品服务源码
https://github.com/Wasabi1234/SpringCloud_ProductDemo
- 商品服务模块全部源码
https://github.com/Wasabi1234/productdemo
## 4.1  微服务拆分的起点
![](https://upload-images.jianshu.io/upload_images/4685968-042925eaab82e84a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ee59d11b5c06ba9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-7755a50293d64677.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e1b4504fce5b99d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.2 康威定律和微服务
![](https://upload-images.jianshu.io/upload_images/4685968-4977f90ef22568ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![沟通的问题会影响系统的设计](https://upload-images.jianshu.io/upload_images/4685968-611b2b3a9be72a8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ca9e7694aa5668c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.3 点餐业务服务拆分分析
![](https://upload-images.jianshu.io/upload_images/4685968-2ed4805c9a22c35f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-dbd9517212234eed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b3bd5fc2abab46c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-268b330ce9941318.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-3c84846025265eab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-92f834b0a81bc5cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.4 商品服务API和SQL介绍
![](https://upload-images.jianshu.io/upload_images/4685968-af53eac30a627264.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.5 商品服务编码实战(上)
在 IDEA 中新建项目
![](https://upload-images.jianshu.io/upload_images/4685968-1ba94b0fc18b4e83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![项目初始化 pom 文件](https://upload-images.jianshu.io/upload_images/4685968-efb57c6681d98c53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- web 和 webflux
旧版只有web一种模式，默认使用web。新版需指定，新增依赖
`org.springframework.boot.spring-boot-starter-web`
![为启动类添加该注解](https://upload-images.jianshu.io/upload_images/4685968-36f40111d07834da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![基本配置信息](https://upload-images.jianshu.io/upload_images/4685968-7bb4f8757e15f554.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
启动该类,将此服务注册到 eureka 上去
![](https://upload-images.jianshu.io/upload_images/4685968-4684dc0feba86fd1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![添加所需依赖](https://upload-images.jianshu.io/upload_images/4685968-b6019061b87c1a0d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![业务需求](https://upload-images.jianshu.io/upload_images/4685968-ea2fe3d00fbc3789.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![配置数据库相关信息](https://upload-images.jianshu.io/upload_images/4685968-bca5fdd15a0de806.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![添加 lombok 依赖](https://upload-images.jianshu.io/upload_images/4685968-600733e1222d69df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![编写dto类](https://upload-images.jianshu.io/upload_images/4685968-c5055963719ceb46.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
开始单元测试
![编写测试类](https://upload-images.jianshu.io/upload_images/4685968-7fead72de82acae6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2f2cbfb1b431666e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![必须要有此二注解,否则空指针异常](https://upload-images.jianshu.io/upload_images/4685968-9574d3e17fcc40ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试通过](https://upload-images.jianshu.io/upload_images/4685968-bdb429749dd14cbd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
开始编码第二个功能
![](https://upload-images.jianshu.io/upload_images/4685968-cdb5d879d524cf2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c75b5f17c12858e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试通过](https://upload-images.jianshu.io/upload_images/4685968-744d6d64bf2f4c74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.6 商品服务编码实战(中)
![编写service 层](https://upload-images.jianshu.io/upload_images/4685968-618732d8f313184e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
编码技巧,测试类可以直接继承启动类的测试类,减少注解个数,做到了最大可能的解耦
![](https://upload-images.jianshu.io/upload_images/4685968-4a779983daf3a290.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-422d8b5809ead622.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d2d5eef590dddd0c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
编写 vo 包下的类
![](https://upload-images.jianshu.io/upload_images/4685968-8d204aab16a0b1ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-008ea5c882904275.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d936ba762101c693.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.7 商品服务编码实战(下)
完成 controller 类
![](https://upload-images.jianshu.io/upload_images/4685968-08f7050bcbe1c156.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
启动程序
![](https://upload-images.jianshu.io/upload_images/4685968-22fc27466c21bfa8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![优化返回值](https://upload-images.jianshu.io/upload_images/4685968-0678768ce9bd50ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.8 订单服务API和sql介绍
![](https://upload-images.jianshu.io/upload_images/4685968-2c29041de939222f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c5571c7e6de78f4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![业务需求](https://upload-images.jianshu.io/upload_images/4685968-c1a272c93df12340.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.9 订单服务dao
![](https://upload-images.jianshu.io/upload_images/4685968-fb687616f460a5bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f2344ed092db163c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/4685968-dbdead19800e1e4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
启动
![](https://upload-images.jianshu.io/upload_images/4685968-571197a3e1205212.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-401d9ffad64e74c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![配置数据库信息并正常启动](https://upload-images.jianshu.io/upload_images/4685968-8e70bf3a79d10ad9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f16ed29a3f925786.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![save数据成功](https://upload-images.jianshu.io/upload_images/4685968-df4f3b15853cb2ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8d13f2046978010a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ec8fc1251bf7bd76.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.10 订单服务service
![](https://upload-images.jianshu.io/upload_images/4685968-ff62c86da0d988ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.11 订单服务controller
![](https://upload-images.jianshu.io/upload_images/4685968-d26cb5b5951655c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![自定义异常](https://upload-images.jianshu.io/upload_images/4685968-cd39d18f248fcef1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a3997dfdac5fd451.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-37a30452b7c48f43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![sb 引用了 gson, 所以不需要指定版本](https://upload-images.jianshu.io/upload_images/4685968-582538d15a29edff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试接口](https://upload-images.jianshu.io/upload_images/4685968-dce317cdd1542039.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 4.12 再看拆数据
![](https://upload-images.jianshu.io/upload_images/4685968-1e57f113611b8686.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-7d2ae008cd9d0665.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
