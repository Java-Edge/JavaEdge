原因：java9模块化的概念使得JAXB默认没有加载；

jaxb-api是存在jdk中的，只是默认没有加载而已，手动引入即可。

推荐方式：（作者采用的此方式）
```
<!-- jaxb模块引用 - start -->  
<dependency>  
   <groupId>javax.xml.bind</groupId>  
    <artifactId>jaxb-api</artifactId>  
</dependency>  
<dependency>  
    <groupId>com.sun.xml.bind</groupId>  
    <artifactId>jaxb-impl</artifactId>  
    <version>2.3.0</version>  
</dependency>  
<dependency>  
    <groupId>org.glassfish.jaxb</groupId>  
    <artifactId>jaxb-runtime</artifactId>  
    <version>2.3.0</version>  
</dependency>  
<dependency>  
    <groupId>javax.activation</groupId>  
    <artifactId>activation</artifactId>  
    <version>1.1.1</version>  
</dependency>  
<!-- jaxb模块引用 - end --> 
```
java9模块命令方式：

--add-modles java.xml.bind

java9默认未加载模块：

javax.activation 
 javax.corba 
 javax.transaction 
 javax.xml.bind 
 javax.xml.ws 
 javax.xml.ws.annotation
