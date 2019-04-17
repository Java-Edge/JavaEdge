# 0 概述
![](https://upload-images.jianshu.io/upload_images/4685968-7d87744123548fa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-6c7197c632954fed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 1 通用命令
![](https://upload-images.jianshu.io/upload_images/4685968-2c19fc55456c7cc4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d10cc867eea04ed9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/4685968-4d94d1e0d22a82bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-884253a2fb0dfbd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e109078e67a41988.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-091efe8ba19672a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1f38d3c4440f010d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a8eb2adc97a8a3c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2a64c3f93f0d5c1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-749b8962445c9eee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-227ab0984c911619.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-275c45e44cd781ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d7125cc297249033.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2  数据结构和内部编码
![](https://upload-images.jianshu.io/upload_images/4685968-a2c2931fc9d0d58a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2.1 Redis 没有传统关系型数据库的Table 模型
schema 所对应的db仅以编号区分。同一个db 内，key 作为顶层模型，它的值是扁平化的。也就是说db 就是key的命名空间
key的定义通常以“:” 分隔，如：Article:Count:1
我们常用的Redis数据类型有：string、list、set、map、sorted-set

![](https://upload-images.jianshu.io/upload_images/4685968-a070dea113eaf8d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2.2 redisObject通用结构
Redis中的所有value 都是以object 的形式存在的，其通用结构如下
```
typedef struct redisObject {
    unsigned [type] 4;
    unsigned [encoding] 4;
    unsigned [lru] REDIS_LRU_BITS;
    int refcount;
    void *ptr;
} robj;
```
- type 指的是前面提到的 string、list 等类型
- encoding 指的是这些结构化类型具体的实现方式，同一个类型可以有多种实现
e.g. string 可以用int 来实现，也可以使用char[] 来实现；list 可以用ziplist 或者链表来实现
- lru 表示本对象的空转时长，用于有限内存下长时间不访问的对象清理
- refcount 对象引用计数，用于GC
- ptr 指向以encoding 方式实现这个对象实际实现者的地址
如：string 对象对应的SDS地址（string的数据结构/简单动态字符串）

![](https://upload-images.jianshu.io/upload_images/4685968-ded4822f6e1bfa8c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 3 单线程
![](https://upload-images.jianshu.io/upload_images/4685968-80521ee615ed004d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-cf08f05a0c58aa3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f9221ce00991a50f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 4 string-字符串
Redis中的string 可以表示很多语义
- 字节串（bits）
- 整数
- 浮点数

这三种类型，redis会根据具体的场景完成自动转换，并且根据需要选取底层的承载方式
例如整数可以由32-bit/64-bit、有符号/无符号承载，以适应不同场景对值域的要求
![也能是 json 串或者 xml 结构](https://upload-images.jianshu.io/upload_images/4685968-4ac94f39a64cc783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.1 内存结构
在Redis内部，string的内部以 int、SDS（简单动态字符串 simple dynamic string）作为存储结构
- int 用来存放整型
- SDS 用来存放字节/字符和浮点型SDS结构
###（1）SDS
```
typedef struct sdshdr {
    // buf中已经占用的字符长度
    unsigned int len;
    // buf中剩余可用的字符长度
    unsigned int free;
    // 数据空间
    char buf[];
}
```
![结构图](https://upload-images.jianshu.io/upload_images/4685968-d79fe0aac6fbe44d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上面存储的内容为“Redis”，Redis采用类似C语言的存储方法，使用'\0'结尾（仅仅是定界符）
上面SDS的free 空间大小为0，当free > 0时，buf中的free 区域的引入提升了SDS对字符串的处理性能，可以减少处理过程中的内存申请和释放次数
### (2) buf 的扩容与缩容
当对SDS 进行操作时，如果超出了容量。SDS会对其进行扩容，触发条件如下：
- 字节串初始化时，buf的大小 = len + 1，即加上定界符'\0'刚好用完所有空间
- 当对串的操作后小于1M时，扩容后的buf 大小 = 业务串预期长度 * 2 + 1，也就是扩大2倍。
- 对于大小 > 1M的长串，buf总是留出 1M的 free空间，即2倍扩容，但是free最大为 1M。
### (3)字节串与字符串
SDS中存储的内容可以是ASCII 字符串，也可以是字节串
由于SDS通过len 字段来确定业务串的长度，因此业务串可以存储非文本内容
对于字符串的场景，buf[len] 作为业务串结尾的'\0' 又可以复用C的已有字符串函数
### (4)SDS编码的优化
value 在内存中有2个部分：redisObject和ptr 指向的字节串部分。在创建时，通常要分别为2个部分申请内存，但是对于小字节串，可以一次性申请。
![](https://upload-images.jianshu.io/upload_images/4685968-bb1ba64ed952e4ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ae5b1b9d6ec52aa5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f0a273ce72e663bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-cad51b4680611856.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-9a6d193a30453c9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d626d8f4e21adcb5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-be5cd4e7f6c6cf6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e027f9e0bf85d638.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8abe819596d715ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d2c63198d33ee6cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-6e0361b64da82533.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-21eecd907262bc7d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-61a50ab7cd37aab9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-4a9886b8da24fed2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-bb85600b3b528888.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2760394d5993ad88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d076c9c5dd0f5073.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c083ec39344fa23a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d1c4fdce7d7d06a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2e7db8cb556387ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0a831fa86406bc29.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![String类型的value基本操作](https://upload-images.jianshu.io/upload_images/4685968-7cddee374e83b7d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
除此之外，string 类型的value还有一些CAS的原子操作，如：get、set、set value nx（如果不存在就设置）、set value xx（如果存在就设置）。

String 类型是二进制安全的，也就是说在Redis中String类型可以包含各种数据，比如一张JPEG图片或者是一个序列化的Ruby对象。一个String类型的值最大长度可以是512M。

在Redis中String有很多有趣的用法
*   把String当做原子计数器，这可以使用INCR家族中的命令来实现：[INCR](https://github.com/antirez/redis-doc/blob/master/commands/incr), [DECR](https://github.com/antirez/redis-doc/blob/master/commands/decr), [INCRBY](https://github.com/antirez/redis-doc/blob/master/commands/incrby)。
*   使用[APPEND](https://github.com/antirez/redis-doc/blob/master/commands/append)命令来给一个String追加内容。
*   把String当做一个随机访问的向量（Vector），这可以使用[GETRANGE](https://github.com/antirez/redis-doc/blob/master/commands/getrange)和 [SETRANGE](https://github.com/antirez/redis-doc/blob/master/commands/setrange)命令来实现
*   使用[GETBIT](https://github.com/antirez/redis-doc/blob/master/commands/getbit) 和[SETBIT](https://github.com/antirez/redis-doc/blob/master/commands/setbit)方法，在一个很小的空间中编码大量的数据，或者创建一个基于Redis的Bloom Filter 算法。
# 5 List
Redis的列表类型中存储一系列String值，这些String按照插入的顺序排序
Redis的List可以从头部（左侧）加入元素，也可以从尾部（右侧）加入元素

## 5.1 内存数据结构
List 类型的 value对象，由 linkedlist 或者 ziplist 实现
当 List `元素个数少并且元素内容长度不大`采用ziplist 实现，否则使用linkedlist

### 5.1.1 linkedlist实现
链表的代码结构
```
typedef struct list {
  // 头结点
  listNode *head;
  // 尾节点
  listNode *tail;
  // 节点值复制函数
  void *(*dup)(void * ptr);
  // 节点值释放函数
  void *(*free)(void *ptr);
  // 节点值对比函数
  int (*match)(void *ptr, void *key);
  // 链表长度
  unsigned long len;  
} list;

// Node节点结构
typedef struct listNode {
	struct listNode *prev;
	struct listNode *next;
	void *value;
} listNode;
```
![linkedlist 结构图](https://upload-images.jianshu.io/upload_images/4685968-85702d86761d1bf3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 5.1.2 ziplist实现
ziplist 存储在连续内存
![组成结构图](https://upload-images.jianshu.io/upload_images/4685968-35a910b4ae334f8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- zlbytes：表示ziplist 的总长度
- zltail：指向最末元素。
- zllen：表示元素的个数。
- entry：为元素内容。
- zlend：恒为0xFF，作为ziplist的定界符

从上面的结构可以看出，对于linkedlist和 ziplist，它们的rpush、rpop、llen的时间复杂度都是O(1)
但是对于ziplist，lpush、lpop都会牵扯到所有数据的移动，时间复杂度为O(N)
但是由于List的元素少，体积小，这种情况还是可控的

对于ziplist 的每个Entry 其结构如下
![](https://upload-images.jianshu.io/upload_images/4685968-2d5d5ab74dabfa99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
记录前一个相邻的Entry的长度，作用是方便进行双向遍历，类似于linkedlist 的prev 指针
ziplist是连续存储，指针由偏移量来承载
Redis中实现了2种方式的实现
  - 当前邻 Entry的长度小于254 时，使用1字节来实现
  - 否则使用5个字节

这里面会有个问题，就是当前一个Entry的长度变化时，这时候有可能会造成后续的所有空间移动。当然这种情况发生的可能性比较小。

Entry内容本身是自描述的，意味着第二部分（Entry内容）包含了几个信息：Entry内容类型、长度和内容本身。而内容本身包含：类型长度部分和内容本身部分。类型和长度同样采用变长编码：
- 00xxxxxx ：string类型；长度小于64，0~63可由6位bit 表示，即xxxxxx表示长度
- 01xxxxxx|yyyyyyyy ： string类型；长度范围是[64, 16383]，可由14位 bit 表示，即xxxxxxyyyyyyyy这14位表示长度。
- 10xxxxxx|yy..y(32个y) : string类型，长度大于16383.
- 1111xxxx ：integer类型，integer本身内容存储在xxxx 中，只能是1~13之间取值。也就是说内容类型已经包含了内容本身。
- 11xxxxxx ：其余的情况，Redis用1个字节的类型长度表示了integer的其他几种情况，如：int_32、int_24等。
由此可见，ziplist 的元素结构采用的是可变长的压缩方法，针对于较小的整数/字符串的压缩效果较好

[LPUSH](https://github.com/antirez/redis-doc/blob/master/commands/lpush) 命令是在头部加入一个新元素，[RPUSH](https://github.com/antirez/redis-doc/blob/master/commands/rpush) 命令是在尾部加入一个新元素。当在一个空的键值（key）上执行这些操作时会创建一个新的列表。类似的，当一个操作清空了一个list时，这个list对应的key会被删除。这非常好理解，因为从命令的名字就可以看出这个命令是做什么操作的。如果使用一个不存在的key调用的话就会使用一个空的list。

一些例子：
```
LPUSH mylist a&nbsp;&nbsp; # 现在list是 "a"
LPUSH mylist b&nbsp;&nbsp; # 现在list是"b","a"
RPUSH mylist c&nbsp;&nbsp; # 现在list是 "b","a","c" (注意这次使用的是 RPUSH)
```
list的最大长度是2^32 – 1个元素（4294967295，一个list中可以有多达40多亿个元素）

从时间复杂度的角度来看，Redis list类型的最大特性是：即使是在list的头端或者尾端做百万次的插入和删除操作，也能保持稳定的很少的时间消耗。在list的两端访问元素是非常快的，但是如果要访问一个很大的list中的中间部分的元素就会比较慢了，时间复杂度是O(N)

Redis的List类型有很多有趣的用法
*   在社交网络中使用List进行时间表建模，使用[LPUSH](https://github.com/antirez/redis-doc/blob/master/commands/lpush)命令在用户时间线中加入新的元素，然后使用[LRANGE](https://github.com/antirez/redis-doc/blob/master/commands/lrange) 命令来获得最近加入的元素。
*   可以把[LPUSH](https://github.com/antirez/redis-doc/blob/master/commands/lpush) 和[LTRIM](https://github.com/antirez/redis-doc/blob/master/commands/ltrim) 命令结合使用来实现定长的列表，列表中只保存最近的N个元素
*   在创建后台运行的工作时，Lists可以作为消息传递原语，例如著名的Ruby库 [Resque](https://github.com/defunkt/resque)
*   还有很多可以使用lists来做的事，这种数据类型支持很多命令，包括像[BLPOP](https://github.com/antirez/redis-doc/blob/master/commands/blpop)这样的阻塞命令
# 6 Sets
Set类似List，但是它是一个无序集合，包含的元素不重复
向集合中添加多次相同的元素，集合中只存在一个该元素。在实际应用中，这意味着在添加一个元素前不需要先检查元素是否存在。

支持多个服务器端命令来从现有集合开始计算集合，所以执行集合的交集，并集，差集都可以很快

set的最大长度是2^32 – 1个元素（4294967295，一个set中可以有多达40多亿个元素）
## 6.1 内存数据结构
Set在Redis中以intset 或 hashtable来存储。Hashtable前面已经介绍过了，对于Set，HashTable的value永远为NULL
当Set中只包含整型数据时，采用intset作为实现
###  6.1 .1 intset
intset的核心元素是一个字节数组，其中从小到大有序的存放着set的元素
```
typedef struct intset {
    // 编码方式
  uint32_t enconding;
  // 集合包含的元素数量
  uint32_t length;
  // 保存元素的数组    
  int8_t contents[];
} intset;
```
![结构图](https://upload-images.jianshu.io/upload_images/4685968-737c3ccbd01371f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为元素有序排列，所以SET的获取操作采用二分查找的方式，复杂度为O(log(N))

进行插入操作时，首先通过二分查找到要插入的位置，再对元素进行扩容
然后将插入位置之后的所有元素向后移动一个位置，最后插入元素。时间复杂度为O(N)。

为了使二分查找的速度足够快，存储在content 中的元素是定长的。
![](https://upload-images.jianshu.io/upload_images/4685968-9084670e79612e0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当插入2018 时，所有的元素向后移动，并且不会发生覆盖的情况
并且当Set 中存放的整型元素集中在小整数范围[-128, 127]内时，可以大大的节省内存空间。这里面需要注意的是：IntSet支持升级，但是不支持降级。

![Set 基本操作](https://upload-images.jianshu.io/upload_images/4685968-8dbcd12b04efbcfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
*   记录唯一的事物
比如，你想知道访问某个博客的IP地址，不要重复的IP，这种情况只需要在每次处理一个请求时简单的使用SADD命令就可以了，可以确信不会插入重复的IP

*   表示关系
你可以使用Redis创建一个标签系统，每个标签使用一个Set来表示。然后你可以使用SADD命令把具有特定标签的所有对象的所有ID放在表示这个标签的Set中
如果你想要知道同时拥有三个不同标签的对象，那么使用SINTER命令就好了

*   你可以使用[SPOP](https://github.com/antirez/redis-doc/blob/master/commands/spop) 或者 [SRANDMEMBER](https://github.com/antirez/redis-doc/blob/master/commands/srandmember) 命令从集合中随机的提取元素。
# 7 Hashes/  Maps
因为Redis本身是一个key - valueObject的结构，Hash类型的结构可以理解为subkey - subvalue
这里面的subkey - subvalue只能是
- 整型
- 浮点型
- 字符串

因为Map的value 可以表示整型和浮点型，因此Map也可以使用` hincrby` 对某个field的value值做自增操作
## 7.1 内存数据结构
Map可以由HashTable 和 ziplist 两种方式来承载。对于数据量较小的Map，使用ziplist 实现
### 7.1.1 HashTable 实现
HashTable在Redis 中分为3 层，自底向上分别是：
- dictEntry：管理一个field - value 对，保留同一桶中相邻元素的指针，以此维护Hash 桶中的内部链
- dictht：维护Hash表的所有桶链
- dict：当dictht需要扩容/缩容时，用户管理dictht的迁移

dict是Hash表存储的顶层结构
```
// 哈希表（字典）数据结构，Redis 的所有键值对都会存储在这里。其中包含两个哈希表。
typedef struct dict {
    // 哈希表的类型，包括哈希函数，比较函数，键值的内存释放函数
    dictType *type;
    // 存储一些额外的数据
    void *privdata;
    // 两个哈希表
    dictht ht[2];
    // 哈希表重置下标，指定的是哈希数组的数组下标
    int rehashidx; /* rehashing not in progress if rehashidx == -1 */
    // 绑定到哈希表的迭代器个数
    int iterators; /* number of iterators currently running */
} dict;
```
Hash表的核心结构是dictht，它的table 字段维护着 Hash 桶，桶（bucket）是一个数组，数组的元素指向桶中的第一个元素（dictEntry）。

```
typedef struct dictht { 
    //槽位数组
    dictEntry **table; 
    //槽位数组长度
    unsigned long size; 
    //用于计算索引的掩码 
    unsigned long sizemask;
    //真正存储的键值对数量
    unsigned long used; 
} dictht;
```
![结构图](https://upload-images.jianshu.io/upload_images/4685968-10c4a1ad0f701117.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从上图可以看出，Hash表使用的是 链地址法 解决Hash冲突
当一个bucket 中的Entry 很多时，Hash表的插入性能会下降，此时就需要增加bucket的个数来减少Hash 冲突
#### 7.1.1.1  Hash表扩容
和大多数Hash表实现一样，Redis引入负载因子判定是否需要增加bucket个数
`负载因子 = Hash表中已有元素 / bucket数量`
扩容之后bucket的数量是原先的2倍
目前有2 个阀值：
- 小于1 时一定不扩容
- 大于5 时一定扩容

- 在1 ~ 5 之间时，Redis 如果没有进行`bgsave/bdrewrite` 操作时则会扩容
- 当key - value 对减少时，低于0.1时会进行缩容。缩容之后，bucket的个数是原先的0.5倍
### 7.1.2 ziplist 实现
这里面的ziplist 和List的ziplist实现类似，都是通过Entry 存放element
和List不同的是，Map对应的ziplist 的Entry 个数总是2的整数倍，第奇数个Entry 存放key，下一个相邻的Entry存放value

ziplist承载时，Map的大多数操作不再是O(1)了，而是由Hash表遍历，变成了链表的遍历，复杂度变为O(N)
由于Map相对较小时采用ziplist，采用Hash表时计算hash值的开销较大，因此综合起来ziplist的性能相对好一些
![](https://upload-images.jianshu.io/upload_images/4685968-7513e457f2274718.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-15102eed83c308ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-4b640c516f68de90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d5002e03f0223435.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d9367b01ed90f35b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-fb64d5f0712585a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-bfc68277b2509898.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b8b8d673a97a035c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-e76342dd09d60076.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-773ac1b94ead0710.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1fd935621ccc8955.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2a89729ea04886bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-37cfb971cbe08b94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1f32f0bd29401afa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1794f294533f46dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ea15fd0d686b9d6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1f74a210919b2a7e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8a1a523a5a842b90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2598b55e7ae705dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![方便单条更新,但是信息非整体,不便管理](https://upload-images.jianshu.io/upload_images/4685968-8b802baa88270ee8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a6d6a8ff2efa386b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-20288283d15852ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b5a3fdd087c1233c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-2c77d5d3a7597973.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-444f35e733934c59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-099763c5c34b38c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Redis Hashes 保存String域和String值之间的映射，所以它们是用来表示对象的绝佳数据类型（比如一个有着用户名，密码等属性的User对象）
```
| `1` | `@cli` |

| `2` | `HMSET user:1000 username antirez password P1pp0 age 34` |

| `3` | `HGETALL user:1000` |

| `4` | `HSET user:1000 password 12345` |

| `5` | `HGETALL user:1000` |
```
一个有着少量数据域（这里的少量大概100上下）的hash，其存储方式占用很小的空间，所以在一个小的Redis实例中就可以存储上百万的这种对象

Hash的最大长度是2^32 – 1个域值对（4294967295，一个Hash中可以有多达40多亿个域值对）
# 8 **Sorted sets** **类型（有序集合类型）**
类似于Map的key-value对，但有序
- key ：key-value对中的键，在一个Sorted-Set中不重复
- value ： 浮点数，称为 score
- 有序 ：内部按照score 从小到大的顺序排列
## 8.1 基本操作
由于Sorted-Set 本身包含排序信息，在普通Set 的基础上，Sorted-Set 新增了一系列和排序相关的操作：
![Sorted-Set的基本操作](https://upload-images.jianshu.io/upload_images/4685968-2693ed514e467918.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 8.2 内部数据结构
Sorted-Set类型的valueObject 内部由
- ziplist
作为ziplist的实现方式和Map类似,由于Sorted-Set包含了Score的排序信息，ziplist内部的key-value元素对的排序方式也是按照Score递增排序的，意味着每次插入数据都要移动之后的数据
因此ziplist适用于元素个数不多，元素内容不大的场景。
- skiplist+hashtable
对于更通用的场景，Sorted-Set使用sliplist来实现。

### 8.2.1 skiplist
和通用的跳表不同的是，Redis为每个level 对象增加了span 字段，表示该level 指向的forward节点和当前节点的距离，使得getByRank类的操作效率提升
```
typedef struct zskiplist {
     //表头节点和表尾节点
     structz skiplistNode *header,*tail;
     //表中节点数量
     unsigned long length;
     //表中层数最大的节点的层数
     int level;
} zskiplist;
```
![](https://upload-images.jianshu.io/upload_images/4685968-998ba62ce45115a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从上图可以看出，每次向skiplist 中新增或者删除一个节点时，需要同时修改图标中红色的箭头，修改其forward和span的值
需要修改的箭头和对skip进行查找操作遍历并废弃过的路径是吻合的
对于span的修改仅仅是+1或者-1 。skiplist 的查找复杂度平均是 O(Log(N))，因此add / remove的复杂度也是O(Log(N))。因此Redis中新增的span 提升了获取rank（排序）操作的性能，仅需对遍历路径相加即可（矢量相加）

还有一点需要注意的是，每个skiplist的节点level 大小都是随机生成的（1-32之间）。
skiplistNode的代码结构
```
typedef struct zskiplistNode {
    // 层
    struct zskiplistLevel{
        struct zskiplistNode *forward; // 前进指针
        unsigned int span; // 跨度
    } level[];
    // 后退指针
    struct zskiplistNode *backward;
    // 分值
    double score;
    // 成员对象
    robj *obj;
}
```
### 8.2.2 hashtable
skiplist 是zset 实现顺序相关操作比较高效的数据结构，但是对于简单的zscore操作效率并不高。Redis在实现时，同时使用了Hashtable和skiplist，代码结构如下：
```
typedef struct zset {
    dict *dict;
    zskiplist *zsl;
} zset;
```

![](https://upload-images.jianshu.io/upload_images/4685968-b83dd2441d5cf966.gif?imageMogr2/auto-orient/strip)

Hash表的存在使得Sorted-Set中的Map相关操作复杂度由O(N)变为O(1)。

Redis有序集合类型与Redis的集合类型类似，是非重复的String元素的集合。不同之处在于，有序集合中的每个成员都关联一个Score，Score是在排序时候使用的，按照Score的值从小到大进行排序。集合中每个元素是唯一的，但Score有可能重复。

使用有序集合可以很高效的进行，添加，移除，更新元素的操作（时间消耗与元素个数的对数成比例）。由于元素在集合中的位置是有序的，使用get ranges by score或者by rank（位置）来顺序获取或者随机读取效率都很高。（本句不确定，未完全理解原文意思，是根据自己对Redis的浅显理解进行的翻译）访问有序集合中间部分的元素也非常快，所以可以把有序集合当做一个不允许重复元素的智能列表，你可以快速访问需要的一切：获取有序元素，快速存在测试，快速访问中间的元素等等。

简短来说，使用有序集合可以实现很多高性能的工作，这一点在其他数据库是很难实现的。

使用有序集合你可以：

*   在大型在线游戏中创建一个排行榜，每次有新的成绩提交，使用[ZADD](https://github.com/antirez/redis-doc/blob/master/commands/zadd)命令加入到有序集合中。可以使用[ZRANGE](https://github.com/antirez/redis-doc/blob/master/commands/zrange)命令轻松获得成绩名列前茅的玩家，你也可以使用[ZRANK](https://github.com/antirez/redis-doc/blob/master/commands/zrank)根据一个用户名获得该用户的分数排名。把ZRANK 和 ZRANGE结合使用你可以获得与某个指定用户分数接近的其他用户。这些操作都很高效。

*   有序集合经常被用来索引存储在Redis中的数据。比如，如果你有很多用户，用Hash来表示，可以使用有序集合来为这些用户创建索引，使用年龄作为Score，使用用户的ID作为Value，这样的话使用[ZRANGEBYSCORE](https://github.com/antirez/redis-doc/blob/master/commands/zrangebyscore) 命令可以轻松和快速的获得某一年龄段的用户。

有序集合可能是Redis中最高级的数据类型了，所以请花一些时间查看一下 [有序集合命令列表](https://github.com/antirez/redis-doc/blob/master/commands#sorted_set) 来获得更多信息，同时你可能也想阅读[Redis数据类型介绍](https://github.com/antirez/redis-doc/blob/master/topics/data-types-intro)

**Bitmaps and HyperLogLogs类型（位图类型和HyperLogLogs类型）**

Redis 也支持位图类型和HyperLogLogs 类型，他们是在String基本类型基础上建立的类型，但有自己的语义。
