Lombok对于Java开发者来说应该是比较中意的，Lombok框架提供了很多编码遍历，但是也降低了代码的阅读力。下面我们看看在Idea开发工具中该怎么使用Lombok？
首先需要添加maven坐标
```xml
<!--lombok依赖-->
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<version>1.16.21</version>
	<scope>provided</scope>
</dependency>
```
lombok的依赖仅仅只有一个，lombok基于配置在编译class文件时会自动将指定模板的内容写入。
# 创建实体
为了方便演示lombok的神奇之处，我们简单创建一个用户实体，基于该实体进行配置lombok注解，实体代码如下所示：
![实体类](http://upload-images.jianshu.io/upload_images/4685968-31946bbc0508af96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果想让lombok生效我们还需要针对idea工具进行插件的安装，下面我们按照顺序打开Idea配置File > Settings > Plugins > Browse repositories... > 输入lombok，插件就会被自动检索出来,安装之!

@Data注解
我们使用@Data注解就可以涵盖@ToString、@Getter、@Setter方法，当然我们使用构造函数时还是需要单独添加注解，下面我们修改实体类添加@Data注解代码如下所示：
@Setter：注解在属性上；为属性提供 setting 方法
@Getter：注解在属性上；为属性提供 getting 方法
@Log4j ：注解在类上；为类提供一个 属性名为log 的 log4j 日志对象
@NoArgsConstructor：注解在类上；为类提供一个无参的构造方法
@AllArgsConstructor：注解在类上；为类提供一个全参的构造方法

<div class="post-body han-init-context" itemprop="articleBody" style="opacity: 1; display: block; transform: translateY(0px);">

## [](#Lombok简介 "Lombok简介")Lombok简介

`Lombok`是一款好用顺手的工具，就像`Google Guava`一样，在此予以强烈推荐，每一个Java工程师都应该使用它。Lombok是一种Java™实用工具，可用来帮助开发人员消除Java的冗长代码，尤其是对于简单的Java对象（POJO）。它通过注释实现这一目的。通过在开发环境中实现Lombok，开发人员可以节省构建诸如`hashCode()`和`equals()`这样的方法以及以往用来分类各种`accessor`和`mutator`的大量时间。

Lombok官网地址：[https://projectlombok.org/](https://projectlombok.org/) 里面还提供了一个简短的学习视频。

## [](#安装Lombok "安装Lombok")安装Lombok

### [](#Eclipse安装Lombok "Eclipse安装Lombok")Eclipse安装Lombok

#### [](#双击Jar安装 "双击Jar安装")双击Jar安装

首先下载Jar包，下载地址：[http://projectlombok.org/download.html](http://projectlombok.org/download.html)
[[图片上传失败...(image-fe9a6e-1517647959931)]](http://7xig3q.com1.z0.glb.clouddn.com/eclipse-lombok.png)
注意如果eclipse没有安装到默认目录，那么需要点击Specify选择eclipse.exe所在的路径，然后Install即可完成安装。

在新建项目之后，使用Lombok如果程序还报错，那么点击eclipse菜单的Project选项的clean，清理一下即可。

#### [](#Eclipse手动安装Lombok步骤 "Eclipse手动安装Lombok步骤")Eclipse手动安装Lombok步骤

*   将**lombok.jar**复制到**myeclipse.ini/eclipse.ini**所在的文件夹目录下
*   打开**eclipse.ini/myeclipse.ini**，在最后面插入以下两行并保存：
**-Xbootclasspath/a:lombok.jar**
**-javaagent:lombok.jar**
*   重启**eclipse/myeclipse**

最后需要注意的是，在使用`lombok`注解的时候记得要导入`lombok.jar`包到工程，如果使用的是`Maven Project`，要在`pom.xml`中添加依赖，并设置`Maven`为自动导入，参见IntelliJ部分。

### [](#IntelliJ安装Lombok "IntelliJ安装Lombok")IntelliJ安装Lombok

#### [](#通过IntelliJ的插件中心安装 "通过IntelliJ的插件中心安装")通过IntelliJ的插件中心安装

[[图片上传失败...(image-d1ddda-1517647959931)]](http://7xig3q.com1.z0.glb.clouddn.com/IntelliJ-plugin-lombok.png)
[[图片上传失败...(image-cece37-1517647959931)]](http://7xig3q.com1.z0.glb.clouddn.com/IntelliJ-lombok.png)
注意一点，在IntelliJ中如果创建的是Maven项目，那么在pom.xml文件中添加依赖后，需要设置Maven为自动导入。
[[图片上传失败...(image-810c2e-1517647959931)]](http://7xig3q.com1.z0.glb.clouddn.com/IntelliJ-maven-auto-import.png)

#### [](#IntelliJ手动安装Lombok "IntelliJ手动安装Lombok")IntelliJ手动安装Lombok

如果不想通过IntelliJ的插件中心安装的话，也可以手动安装，详细步骤参见Github上的说明：[https://github.com/mplushnikov/lombok-intellij-plugin](https://github.com/mplushnikov/lombok-intellij-plugin)

简单点说手动安装步骤如下：
Download the [latest release](https://github.com/mplushnikov/lombok-intellij-plugin/releases/tag/releasebuild_0.11) and install it manually using Preferences &gt; Plugins &gt; Install plugin from disk…

## [](#Lombok用法 "Lombok用法")Lombok用法

### [](#Lombok注解说明 "Lombok注解说明")Lombok注解说明

*   `val`：用在局部变量前面，相当于将变量声明为final
*   `@NonNull`：给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出NPE（NullPointerException）
*   `@Cleanup`：自动管理资源，用在局部变量之前，在当前变量范围内即将执行完毕退出之前会自动清理资源，自动生成try-finally这样的代码来关闭流
*   `@Getter/@Setter`：用在属性上，再也不用自己手写setter和getter方法了，还可以指定访问范围
*   `@ToString`：用在类上，可以自动覆写toString方法，当然还可以加其他参数，例如@ToString(exclude=”id”)排除id属性，或者@ToString(callSuper=true, includeFieldNames=true)调用父类的toString方法，包含所有属性
*   `@EqualsAndHashCode`：用在类上，自动生成equals方法和hashCode方法
*   `@NoArgsConstructor, @RequiredArgsConstructor and @AllArgsConstructor`：用在类上，自动生成无参构造和使用所有参数的构造函数以及把所有@NonNull属性作为参数的构造函数，如果指定staticName = “of”参数，同时还会生成一个返回类对象的静态工厂方法，比使用构造函数方便很多
*   `@Data`：注解在类上，相当于同时使用了`@ToString`、`@EqualsAndHashCode`、`@Getter`、`@Setter`和`@RequiredArgsConstrutor`这些注解，对于`POJO类`十分有用
*   `@Value`：用在类上，是@Data的不可变形式，相当于为属性添加final声明，只提供getter方法，而不提供setter方法
*   `@Builder`：用在类、构造器、方法上，为你提供复杂的builder APIs，让你可以像如下方式一样调用`Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build();`更多说明参考[Builder](https://projectlombok.org/features/Builder.html)
*   `@SneakyThrows`：自动抛受检异常，而无需显式在方法上使用throws语句
*   `@Synchronized`：用在方法上，将方法声明为同步的，并自动加锁，而锁对象是一个私有的属性`$lock`或`$LOCK`，而java中的synchronized关键字锁对象是this，锁在this或者自己的类对象上存在副作用，就是你不能阻止非受控代码去锁this或者类对象，这可能会导致竞争条件或者其它线程错误
*   `@Getter(lazy=true)`：可以替代经典的Double Check Lock样板代码
*   `@Log`：根据不同的注解生成不同类型的log对象，但是实例名称都是log，有六种可选实现类

        *   `@CommonsLog` Creates log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);
    *   `@Log` Creates log = java.util.logging.Logger.getLogger(LogExample.class.getName());
    *   `@Log4j` Creates log = org.apache.log4j.Logger.getLogger(LogExample.class);
    *   `@Log4j2` Creates log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
    *   `@Slf4j` Creates log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
    *   `@XSlf4j` Creates log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class);
