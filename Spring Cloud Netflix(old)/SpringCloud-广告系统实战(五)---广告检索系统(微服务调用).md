# 0 联系我
![](http://upload-images.jianshu.io/upload_images/4685968-6a8b28d2fd95e8b7?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "图片标题") 
1.[Java开发技术交流Q群](https://jq.qq.com/?_wv=1027&k=5UB4P1T)

2.[完整博客链接](https://blog.csdn.net/qq_33589510)

3.[个人知乎](http://www.zhihu.com/people/shi-shu-sheng-)

4.[gayhub](https://github.com/Wasabi1234)

# [相关源码](https://github.com/Wasabi1234/JavaEdge-Ad-Spring-Cloud)

本文会介绍使用 Ribbon 与 Feign 组件实现微服务之间的调用。

# 1 创建广告检索系统子模块
- 新建搜索服务子模块
![](https://upload-images.jianshu.io/upload_images/4685968-40096bb89429cd02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 编辑 pom 文件
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 指定父pom, 注意它是 javaedge-ad-service 的子模块 -->
    <parent>
        <artifactId>javaedge-ad-service</artifactId>
        <groupId>com.sss.ad</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>

    <!-- 当前项目/模块的坐标, groupId从父模块中继承 -->
    <artifactId>ad-search</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Hystrix 监控 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        </dependency>
        <!-- 监控端点, 采集应用指标 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!-- 引入 Web 功能 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--
            Eureka 客户端, 客户端向 Eureka Server 注册的时候会提供一系列的元数据信息, 例如: 主机, 端口, 健康检查url等
            Eureka Server 接受每个客户端发送的心跳信息, 如果在某个配置的超时时间内未接收到心跳信息, 实例会被从注册列表中移除
        -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入 Feign, 可以以声明的方式调用微服务 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- 引入服务容错 Hystrix 的依赖 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <!-- 引入服务消费者 Ribbon 的依赖 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        </dependency>
        <!-- Java Persistence API, ORM 规范 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <!-- 数据库连接 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <!-- MySQL 驱动, 注意, 这个需要与 MySQL 版本对应 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.12</version>
            <scope>runtime</scope>
        </dependency>

        <!-- 通用模块 -->
        <dependency>
            <groupId>com.sss.ad</groupId>
            <artifactId>ad-common</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!-- apache 提供的一些工具类 -->
        <dependency>
            <groupId>commons-codec</groupId>
            <artifactId>commons-codec</artifactId>
            <version>1.9</version>
        </dependency>
        <!-- 集合类操作 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-collections4</artifactId>
            <version>4.0</version>
        </dependency>

        <!-- binlog 监听与解析: https://github.com/shyiko/mysql-binlog-connector-java -->
        <dependency>
            <groupId>com.github.shyiko</groupId>
            <artifactId>mysql-binlog-connector-java</artifactId>
            <version>0.13.0</version>
        </dependency>
        <!-- 解析配置文件中的配置 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
        </dependency>
        <!--kafka 依赖-->
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
            <version>2.1.5.RELEASE</version>
        </dependency>
    </dependencies>

    <!--
        SpringBoot的Maven插件, 能够以Maven的方式为应用提供SpringBoot的支持，可以将
        SpringBoot应用打包为可执行的jar或war文件, 然后以通常的方式运行SpringBoot应用
     -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

# 2 基于 Ribbon 实现微服务调用
## Client Side Load Balancer: Ribbon
Ribbon 是一个客户端负载均衡器,可很好地控制HTTP和TCP客户端的行为.
Feign已经使用Ribbon，所以若使用@FeignClient，则本节也适用也是必备知识点.

- Ribbon 中的中心概念是指定客户端的概念
每个负载平衡器是集合组件的一部分，它们一起工作以根据需要与远程服务器通信,并且集合具有你将其作为应用程序开发人员（例如使用@FeignClient注解）的名称.
Spring Cloud 使用 RibbonClientConfiguration 为每个命名的客户端根据需要创建一个新的集合作为ApplicationContext.这包含 ILoadBalancer，RestClient和ServerListFilter.

## 2.1 添加 Ribbon
要在项目中包含Ribbon,请使用
group`org.springframework.cloud`,artifact ID `spring-cloud-starter-ribbon`的starter.
![](https://upload-images.jianshu.io/upload_images/4685968-098c9e93809824fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](https://upload-images.jianshu.io/upload_images/4685968-2d29eb36cacb5587.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 定义 demo 演示类
![](https://upload-images.jianshu.io/upload_images/4685968-845fe608103d0ee6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-929434ee59761f78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c8dedc0f19ffc11e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 3 基于 Feign 实现微服务调用
[Feign](https://github.com/Netflix/feign) 是一个声明式的Web服务客户端.
这使得Web服务客户端的写入更加方便,要使用 Feign 创建一个接口，并对其添加注解。它提供了可插拔式的注解，包括Feign注解和JAX-RS注解。Feign还支持可插拔编码器和解码器.
Spring Cloud增加了对Spring MVC注解的支持，并使用Spring Web中默认使用的`HttpMessageConverters`.
Spring Cloud集成Ribbon和Eureka以在使用Feign时提供负载均衡的http客户端.

## 3.1 如何加入Feign
要在项目中包含Feign，请使用group`org.springframework.cloud`和artifact ID `spring-cloud-starter-feign`的启动器.

- Spring Boot应用
![](https://upload-images.jianshu.io/upload_images/4685968-7bb526fdf165b33c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 接口文件
![](https://upload-images.jianshu.io/upload_images/4685968-61e205c8529dfe8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在 `@FeignClient` 注解中,String 值（上面的`eureka-client-ad-sponsor`）是一个任意的客户端名称，用于创建Ribbon负载均衡器,还可以使用`url`属性（绝对值或只是主机名）指定URL.
应用程序上下文中的bean的名称是该接口的完全限定名,要指定自己的别名,可以使用`@FeignClient`注释的`qualifier`值.

## 3.2 Feign Hystrix回退
Hystrix支持回退的概念 : 当电路断开或出现错误时执行的默认代码路径.
要为给定的 `@FeignClient` 启用回退,请将 `fallback` 属性设置为实现回退的类名.
![](https://upload-images.jianshu.io/upload_images/4685968-a0e529ea777453b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
