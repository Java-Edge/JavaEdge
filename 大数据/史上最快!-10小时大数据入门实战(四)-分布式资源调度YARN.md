![](https://upload-images.jianshu.io/upload_images/4685968-ad3da0e1b3998337.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 1 YARN 产生背景
![](https://upload-images.jianshu.io/upload_images/4685968-ab326d4d4546ba85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-80b693d93060c919.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-6da17094fd722615.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-469362479c6b7111.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0440f80c507a3627.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-181b8726f1e7077d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2  YARN 架构
![](https://upload-images.jianshu.io/upload_images/4685968-1a622f1c67c519f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-68df5cc682132881.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-7593e58f15f6aa15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 3 YARN 执行流程
![](https://upload-images.jianshu.io/upload_images/4685968-08114debcb605664.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f2ff770d798140ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1.client向yarn提交job，首先找ResourceManager分配资源，
2.ResourceManager开启一个Container,在Container中运行一个Application manager
3.Application manager找一台nodemanager启动Application master，计算任务所需的计算
4.Application master向Application manager（Yarn）申请运行任务所需的资源
5.Resource scheduler将资源封装发给Application master
6.Application master将获取到的资源分配给各个nodemanager
7.各个nodemanager得到任务和资源开始执行map task
8.map task执行结束后，开始执行reduce task
9.map task和 reduce task将执行结果反馈给Application master
10.Application master将任务执行的结果反馈pplication manager。
# 4 YARN 环境搭建
- 官方文档指南
http://archive.cloudera.com/cdh5/cdh/5/hadoop-2.6.0-cdh5.7.0/hadoop-project-dist/hadoop-common/SingleCluster.html
![](https://upload-images.jianshu.io/upload_images/4685968-3532f5121f985bf4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-cce5e97e7ff76ad7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![ ](https://upload-images.jianshu.io/upload_images/4685968-fa87a686910c464e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e020e994e959d42a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
验证
![](https://upload-images.jianshu.io/upload_images/4685968-c1cf51cb67920524.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-118a4274ac4f5e56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 5 提交 PI 的 MapReduce 作业到 TARN 上执行
![](https://upload-images.jianshu.io/upload_images/4685968-d0d02c11e566b552.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
