下载完成后，会有mysql-5.6.38-winx64.zip格式的压缩包，解压后把文件夹放在你喜欢的位置，然后将文件夹改名为mysql5.6，本教程的路径为D:\学习软件\mysql5.6，并复制你的mysql5.6里的bin路径，所以复制为D:\学习软件\mysql5.6\bin

2.首先配置环境变量，我的电脑右键，属性》点击高级系统设置![image](http://upload-images.jianshu.io/upload_images/4685968-0a968365c21cbfb3?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

高级选项里选择环境变量，双击path，点击新建，粘贴你的bin路径，然后一路确定。![image](http://upload-images.jianshu.io/upload_images/4685968-8bf0b5c55dbbab2f?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](http://upload-images.jianshu.io/upload_images/4685968-bec584427ff9c82d?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

接着进入mysql5.6文件夹，找到里面的my-default.ini，右键打开方式以记事本打开，然后另存为my.ini，**注意：不要将另存为的编码改为UTF-8，必须使用默认编码集ANSI**，然后保存。重新以记事本打开my.ini文件，找到这三行![image](http://upload-images.jianshu.io/upload_images/4685968-452ff009207872f1?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

将它们修改为

basedir = D:\学习软件\mysql5.6
datadir = D:\学习软件\mysql5.6\data
port = 3306

可以将其他的东西全部删掉，但必须保留[mysqld]，展示为下面这张图片，然后保存关闭。![image](http://upload-images.jianshu.io/upload_images/4685968-4dc7f6bc9fdf92e7?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

3.以管理员方式进入cmd，一定要以管理员方式进入，不然权限不够，首先输入d: 回车，然后输入cd ./学习软件/mysql5.6/bin 回车，这时便进入了bin目录下，![image](http://upload-images.jianshu.io/upload_images/4685968-89a15c9921cb3052?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 
[图片上传失败...(image-843e16-1517239871517)]

此时输入mysqld -install 回车，安装成功。  ![image](http://upload-images.jianshu.io/upload_images/4685968-109f6f45caca8782?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

ps：mysqld -remove 是卸载mysql。

然后启动服务，输入net start mysql，服务启动成功![image](http://upload-images.jianshu.io/upload_images/4685968-de40a6b06fe79ac1?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

ps:net stop mysql 是停止服务。

4.此时mysql已经成功运行了，现在可以登陆mysql了，输入**mysql -u root -p**（第一次登录没有密码，直接按回车过）,登录成功！

![image](http://upload-images.jianshu.io/upload_images/4685968-960c9a84e4c9d72c?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

5.密码如何设置？

首先输入exit退出mysql数据库，然后输入mysqladmin -u root -p password 回车后提示Enter password: 此时直接回车（因为最开始mysql没有设置密码），

然后提示New password: 输入你需要设置的密码并回车，

接着提示Confirm new password: 此时让你再输一次密码并回车，密码修改完毕！！

![image](http://upload-images.jianshu.io/upload_images/4685968-8794482fb36a15ea?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

最后输入mysql -u root -p重新登录即可。



