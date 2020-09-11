
# 大纲

## 第一章 开篇词与大纲

|节数  | 标题 |
|--|--|
|1.1 |开篇词 - 为什么要研读Spring？|

## 第二章 环境基础

|  节数| 标题 |
|--|--|
|1.1|Spring源码的下载和编译|
| 1.2  |  Spring Framework 框架设计概述|

## 第三章 IoC容器

| 节数 | 标题 |内容 |
|--|--|--|
| 2.1  | IoC 容器和 Bean  简介   |配置元数据、实例化容器、使用容器 |
| 2.2  | Bean的概述   | bean 的命名、实例化 bean |
| 2.3  | 依赖  |依赖注入的方式、避坑指南、depends-on和lazy-init属性、Autowire、方法注入|
||@Autowired注解源码|
| 2.4  | Beas 的作用域 |singleton、prototype、request、session、application、websocket等作用域讲解
| 2.5  | Beas 的生命周期（上） |
| 2.6  | Beas 的生命周期（下） |
| 2.7  | 基于注解的容器配置 |@Required、@Autowired、@Qualifier、@Resource、@Value、@PostConstruct、@PreDestroy
|2.8|BeanFactory|BeanFactory or ApplicationContext?


## 第三章Resource和验证、数据绑定、类型转换
| 节数| 标题 |
|--|--|
| 3.1 |  ResourceLoader|
|3.2 |参数校验之validator|
|3.3|bean 校验
| 3.4 |  Spring 数据绑定|
| 3.5 |  类型转换|
| 3.6 |  格式化|

## 第四章 spring AOP的原理
|  节数| 标题 |内容
|--|--|--|
| 4.1| Aop概念  |PointCut切入点、Advisor切面、Advice通知、JoinPoint连接点
| 4.2  |aop的设计与实现    | JDK的动态代理、AOP的设计分析、AOP的应用场景
|4.3 |AOP 代理对象|设计原理、、proxyfactorybean源码、jdk/cglib生成aopproxy代理对象
|4.4 |AOP拦截器调用源码实现|设计原理、jdkdynamicaopproxy的invoke拦截、cglib2aopproxy的intercept拦截、目标对象方法的调用、aop拦截器链的调用、配置通知器、advice通知的实现、proxyfactory实现

## 第五章 SpringMVC
|  节数| 标题 |内容
|--|--|--|
| 5.1| MVC概述  |基本概念、应用场景、设计概览
| 5.2  |在web容器下的上下文  | ioc容器启动过程、web容器的上下文设计、contextloader设计与实现
|5.3 |AOP 代理对象|设计原理、proxyfactorybean源码、jdk/cglib生成aopproxy代理对象
|5.4 |AOP拦截器调用源码实现（上）|设计原理、jdkdynamicaopproxy的invoke拦截、cglib2aopproxy的intercept拦截、目标对象方法的调用
|5.4 |AOP拦截器调用源码实现（下）|aop拦截器链的调用、配置通知器、advice通知的实现、proxyfactory实现

