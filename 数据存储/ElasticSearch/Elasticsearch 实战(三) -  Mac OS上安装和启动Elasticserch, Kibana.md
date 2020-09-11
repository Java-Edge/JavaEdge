# 1 安装JDK
至少1.8.0_73以上版本
```bash
java -version
```
# 2 下载
```
brew install elasticsearch
```
# 启动Elasticsearch
es本身特点之一就是开箱即用，如果是中小型应用，数据量少，操作不是很复杂，直接启动就可以用了
```
elasticsearch
```
![](https://img-blog.csdnimg.cn/2019111722255236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_1,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/2019111722264818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_1,color_FFFFFF,t_70)
# 4 检查ES是否启动成功：http://localhost:9200/?pretty

name: node名称
cluster_name: 集群名称（默认的集群名称就是elasticsearch）
version.number: 5.2.0，es版本号
![](https://img-blog.csdnimg.cn/20191117222753528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_1,color_FFFFFF,t_70)
# 5 修改集群名称：elasticsearch.yml
# 6 安装Kibana
使用里面的开发界面，去操作elasticsearch，作为我们学习es知识点的一个主要的界面入口

Kibana是ES的一个配套工具，让用户在网页中可以直接与ES进行交互。
安装命令：
```bash
brew install kibana
```
安装完成后直接执行kibana命令启动Kibana启动Kibana

![](https://img-blog.csdnimg.cn/20191117223056264.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_1,color_FFFFFF,t_70)
# 7 进入Kibana界面
- http://localhost:5601
![](https://img-blog.csdnimg.cn/20191117223248477.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9qYXZhZWRnZS5ibG9nLmNzZG4ubmV0,size_1,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20200815233520523.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_1,color_FFFFFF,t_70#pic_center)
