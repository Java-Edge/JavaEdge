# 0 联系我
![](http://upload-images.jianshu.io/upload_images/4685968-6a8b28d2fd95e8b7?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "图片标题") 
1.[Java开发技术交流Q群](https://jq.qq.com/?_wv=1027&k=5UB4P1T)

2.[完整博客链接](http://www.shishusheng.com)

3.[个人知乎](http://www.zhihu.com/people/shi-shu-sheng-)

4.[gayhub](https://github.com/Wasabi1234)

![](https://upload-images.jianshu.io/upload_images/4685968-e1bf164d6a6e6dcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e4d3e9e1050c8f65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-7ee31a7012547b5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e5d33dcac68ca253.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-69a28ea04d6187ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-26837d77c182cf0f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a52817ff469267a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a35a38bd86916d64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
HDFS 环境搭建
![](https://upload-images.jianshu.io/upload_images/4685968-ef939135a1264a2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
HDFS 伪分布式环境搭建
![CentOS 环境安装步骤](https://upload-images.jianshu.io/upload_images/4685968-927332d15a02dcda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
MacOS安装环境
![安装jdk](https://upload-images.jianshu.io/upload_images/4685968-bcb2025026a057d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![jdk安装路径](https://upload-images.jianshu.io/upload_images/4685968-a6dae1598afd3fa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![/usr/libexec/java_home -V:列出所有版本的JAVA_HOME](https://upload-images.jianshu.io/upload_images/4685968-3644ada3cb314a27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
设置 JAVA_HOME
- 添加java_home到.bash_profile文件中
```
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH
export CLASS_PATH=$JAVA_HOME/lib 
```
![ Mac OS X ssh设置](https://upload-images.jianshu.io/upload_images/4685968-f9a0dca736dc38f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
输入命令ssh localhost，可能遇到如下问题
![](https://upload-images.jianshu.io/upload_images/4685968-719bd1f54316543b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
原因是没打开远程登录，进入系统设置->共享->远程登录打开就好
![](https://upload-images.jianshu.io/upload_images/4685968-0778f7731dbce1d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这时你再ssh localhost一下
![](https://upload-images.jianshu.io/upload_images/4685968-439071b38da8c827.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 下载 Hadoop
![](https://upload-images.jianshu.io/upload_images/4685968-fe99cc99f88c3ab3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 解压到soft目录
![](https://upload-images.jianshu.io/upload_images/4685968-b5756dd9443f908d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![官方指南](https://upload-images.jianshu.io/upload_images/4685968-17d4b56c74fdc223.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 编辑 hadoop-env.sh 文件
![](https://upload-images.jianshu.io/upload_images/4685968-9ff40fd27f420431.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-7a445dc8610f23f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-bd90afe253dc3ec9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8e6b7df0f043a451.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Hadoop也可以在伪分布模式下的单节点上运行，其中每个Hadoop守护进程都在单独的Java进程中运行
![](https://upload-images.jianshu.io/upload_images/4685968-5763a971f530572e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![具体更改](https://upload-images.jianshu.io/upload_images/4685968-1a60c8b79d6136ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![新建一个临时文件目录](https://upload-images.jianshu.io/upload_images/4685968-5f9832f6411c156d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![编辑 hdfs/core-site.xml 文件](https://upload-images.jianshu.io/upload_images/4685968-92b1f78915e9ddde.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2d98dc11a3a3f6eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-08a85f925f7215ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![配置 datanode 节点数](https://upload-images.jianshu.io/upload_images/4685968-6d06260d15d72d03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
启动 hdfs
![](https://upload-images.jianshu.io/upload_images/4685968-b35883c4c0731a1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-017a30ffaf3d7f9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-27dc510c78b21126.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](https://upload-images.jianshu.io/upload_images/4685968-8b3fed7800ca033a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-23b6bc027f57cdf0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
查看进程
![](https://upload-images.jianshu.io/upload_images/4685968-2448e81f881b979f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
访问http://localhost:50070/
![](https://upload-images.jianshu.io/upload_images/4685968-10ce7937cc11c580.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
表示HDFS已经安装成功
![存活节点](https://upload-images.jianshu.io/upload_images/4685968-eccd2a73be179c31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
步骤小结
![](https://upload-images.jianshu.io/upload_images/4685968-e82ecf69d4f93354.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
关闭
![](https://upload-images.jianshu.io/upload_images/4685968-706daaaa9dfab81c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# HDFS Shell 操作
![](https://upload-images.jianshu.io/upload_images/4685968-b34f39ea1d975010.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
官网指南
![](https://upload-images.jianshu.io/upload_images/4685968-cbc2a3f6aa35274d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
先启动 HDFS

![配置 hadoop 环境变量](https://upload-images.jianshu.io/upload_images/4685968-9bb6d7865a91b9b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![成功](https://upload-images.jianshu.io/upload_images/4685968-7770ead8128c2c0c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![指令集](https://upload-images.jianshu.io/upload_images/4685968-5bca91ff8de554d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![dfs fs 无差异](https://upload-images.jianshu.io/upload_images/4685968-39d7c9829ffced30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![上传一个 txt 文件](https://upload-images.jianshu.io/upload_images/4685968-a8dd55e6f99ea125.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/4685968-e32707d1a30bd060.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
创建文件夹
![](https://upload-images.jianshu.io/upload_images/4685968-6dfd7ff16dc65852.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
多层次文件夹
![](https://upload-images.jianshu.io/upload_images/4685968-f64d72bef63d318f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
遍历所有文件夹
![](https://upload-images.jianshu.io/upload_images/4685968-5b5355ca953d307f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-367aa58d6b31ed14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-7ad7c5c59cc978d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-83bf628859b34b9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
删除文件/文件夹
![](https://upload-images.jianshu.io/upload_images/4685968-68c39b6fddbfa75c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b13c9bc8a8d03485.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![所上传的文件](https://upload-images.jianshu.io/upload_images/4685968-40055ec3d4a0da44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# Java 操作 HDFS 开发环境搭建
![](https://upload-images.jianshu.io/upload_images/4685968-381ac0adfb2f3c6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c5d5adb7825168c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0a9065275919bb12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-5ae5c80b4caabdad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2688c0fb206867cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![pom 文件](https://upload-images.jianshu.io/upload_images/4685968-61d08444a162e330.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# JavaAPI 操作 HDFS文件系统
![](https://upload-images.jianshu.io/upload_images/4685968-dfc91ea23d77fc40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试通过](https://upload-images.jianshu.io/upload_images/4685968-aa1edb1c01f82dd9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-94a0553c6decebc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 测试创建文件方法
![](https://upload-images.jianshu.io/upload_images/4685968-773bcd368fec91cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-61992182acb1e985.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 查看 HDFS 文件的内容
![](https://upload-images.jianshu.io/upload_images/4685968-d88cab0836f7a519.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8fcf854dab30dbd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 上传文件到 HDFS
![](https://upload-images.jianshu.io/upload_images/4685968-c0c215082e54ed20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 上传文件到 HDFS(带进度条)
![](https://upload-images.jianshu.io/upload_images/4685968-63ba46e79fa25c36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试通过](https://upload-images.jianshu.io/upload_images/4685968-93590fe5360afe43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-eda4bb3c70eed096.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 下载文件到本地
![](https://upload-images.jianshu.io/upload_images/4685968-316e43d4be856a95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试通过](https://upload-images.jianshu.io/upload_images/4685968-532c3463f7eb8f92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-db7104ed5716bbfe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 查看某个目录下的所有文件
![](https://upload-images.jianshu.io/upload_images/4685968-2a781cd5918278c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![测试通过](https://upload-images.jianshu.io/upload_images/4685968-4d7c9515a28eb7b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b724751d6431c43a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 删除文件/文件夹
![](https://upload-images.jianshu.io/upload_images/4685968-bdc70c79da5a2397.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c379433d0c8253d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-49f8890bacd084e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
