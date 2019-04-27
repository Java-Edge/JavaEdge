#~代表你的/home/用户目录

假设你的用户名是xxx，那么~/ = /home/xxx/

#.是代表此目录本身，但是一般可以不写

所以cd ~/.  = cd ~  = cd ~/

但是.后面有东西又是另外一个问题，点在文件名头部，代表一个[隐藏文件]

~/.local是你的主目录下一个.local的文件夹的路径，

并且从.可以看出，这是一个饮藏文件，

如果不用ls -a的话，一般ls是无法看到的

#/ 是目录层的分隔、表示符。只有一个 / 表明是 root， /etc/ 表明是根目录下面的 etc 目录（当然目录最后不需要 / ，但有 / 直接表明他是目录，没有末尾的 / ，那么 /etc 需要检测一下确定是目录还是文件，虽然习惯上 /etc 绝对是目录）

~ 是一个代位符，表明的是个人目录的地址，因为每个用户都有自己的个人目录地址，所以用 ~ 作为统一替代这个根据用户不同而不同但有规可循的地址，来保证某些情况下的兼容问题。
/ 是根节点， ~ 是 home
如果以root账号登陆 
~ 是 /root/
/ 是 /

如果以 name 登陆
~ 是 /home/name/
/ 是 /

# X 联系我
![](http://upload-images.jianshu.io/upload_images/4685968-6a8b28d2fd95e8b7?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "图片标题") 
## [Java交流群](https://jq.qq.com/?_wv=1027&k=5UB4P1T)

## [博客](http://www.shishusheng.com)

## [知乎](http://www.zhihu.com/people/shi-shu-sheng-)

## [Github](https://github.com/Wasabi1234)


