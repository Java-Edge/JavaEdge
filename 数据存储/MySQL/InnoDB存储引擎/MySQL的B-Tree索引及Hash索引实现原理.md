> 全是干货的技术号：
> 本文已收录在github，欢迎 star/fork：
> https://github.com/Wasabi1234/Java-Interview-Tutorial

# 1 数据结构及算法基础
## 1.1 索引的本质
官方定义：索引（Index）是帮助MySQL高效获取数据的数据结构
本质：索引是数据结构

查询是数据库的最主要功能之一。我们都希望查询速度能尽可能快，因此数据库系统的设计者会从查询算法角度优化

最基本的查询算法当然是[顺序查找](http://en.wikipedia.org/wiki/Linear_search)（linear search），这种复杂度为O(n)的算法在数据量很大时显然是糟糕的
好在CS的发展提供了很多更优秀的查找算法，如[二分查找](http://en.wikipedia.org/wiki/Binary_search_algorithm)（binary search）、[二叉树查找](http://en.wikipedia.org/wiki/Binary_search_tree)（binary tree search）等
稍微分析一下会发现，每种查找算法都只能应用于特定数据结构，如二分查找要求被检索数据有序，而二叉树查找只能应用于[二叉查找树](http://en.wikipedia.org/wiki/Binary_search_tree)，但`数据本身的组织结构不可能完全满足各种数据结构`（例如，理论上不可能同时将两列都按顺序进行组织）
所以，在数据之外，数据库系统还维护着`满足特定查找算法的数据结构`，这些数据结构以某种方式引用（指向）数据，这样就可以`在这些数据结构上实现高级查找算法`
这种ADT，就是索引
![图1  一个例子](http://upload-images.jianshu.io/upload_images/4685968-c65be07333dbfb27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
图1展示了一种可能的索引方式
左边是数据表，两列14条记录，最左边是数据记录的物理地址（注意逻辑上相邻的记录在磁盘上并不一定物理相邻）
为加快`Col2`的查找，可维护一个右边所示二叉查找树，每个节点分别包含索引键值及一个指向对应数据记录物理地址的指针，这样就可以运用二叉查找在O(log2 N)内取到相应数据

虽然这是一个货真价实的索引，但实际数据库系统几乎没有使用二叉查找树或其进化品种[红黑树](http://en.wikipedia.org/wiki/Red-black_tree)（red-black tree）实现
## 1.2 经典常用索引类型:B Tree和B+Tree
目前大部分数据库系统及文件系统都采用B Tree或其变种B+Tree作为索引结构
### 1.2.1 B Tree
定义数据记录为一个二元组[key, data]
- key为记录的键值，对于不同数据记录，key互不相同
- data为数据记录除key外的数据

B Tree有如下特点:
- d为大于1的一个正整数，称为B-Tree的度
- h为一个正整数，称为B-Tree的高度
- 每个非叶节点由n-1个key和n个指针组成，其中d<=n<=2d
- 每个叶节点最少包含一个key和两个指针，最多包含2d-1个key和2d个指针，叶节点的指针均为null
- 所有叶节点具有相同的深度，等于树高h
- key和指针互相间隔，节点两端是指针
- 一个节点中的key从左到右非递减排列
- 所有节点组成树结构
- 每个指针要么为null，要么指向另外一个节点
- 如果某个指针在节点node最左边且不为null，则其指向节点的所有key小于>v(key1),v(key1)为node的第一个key的值
- 如果某个指针在节点node最右边且不为null，则其指向节点的所有key大于v(keym),v(keym)为node的最后一个key的值。
- 如果某个指针在节点node的左右相邻key分别是keyi,keyi+1且不为null，则其指向节点的所有key小于v(keyi+1)且大于v(keyi)
![图2 d=2的B-Tree示意图](http://upload-images.jianshu.io/upload_images/4685968-34e495925cfc43c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于B Tree的特性,按key检索数据的算法非常直观
- 首先从根节点二分查找
- 如果找到则返回对应节点的data
- 否则对相应区间的指针指向的节点递归进行查找
- 直到找到目标节点/null指针，查找成功/失败
```java
bTreeSearch(node, key) {
    if(node == null) return null;
    foreach(node.key) {
        if(node.key[i] == key) return node.data[i];
            if(node.key[i] > key) return bTreeSearch(point[i]->node);
    }
    return bTreeSearch(point[i+1]->node);
}
data = bTreeSearch(root, my_key);
```
关于B-Tree有一系列有趣的性质，例如一个度为d的B-Tree，设其索引N个key，则其树高h的上限为![](http://upload-images.jianshu.io/upload_images/4685968-34aa3d92c8cdc09c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
检索一个key，其查找节点个数的渐进时间复杂度为![](http://upload-images.jianshu.io/upload_images/4685968-701af563134cfe20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从这点可以看出，B Tree是一个非常有效率的索引数据结构
### 1.2.2 B+Tree
B-Tree有许多变种，其中最常见的是B+Tree，MySQL普遍用其实现索引
与B Tree相比，B+Tree有以下不同点
- 每个节点的指针上限为2d
- 内节点只存key
- 叶节点不存指针,叶节点指向被索引的数据而不是其他叶节点
    - innodb中,指向的是主键
    - myshaym中指向的是数据的物理地址
![图3 一个简单的B+Tree](http://upload-images.jianshu.io/upload_images/4685968-05ffda612519b2a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由于并不是所有节点都具有相同的域，因此B+Tree中叶节点和内节点一般大小不同
这点与B Tree不同，虽然B Tree中不同节点存放的key和指针可能数量不一致，但是每个节点的域和上限是一致的，所以在实现中B Tree往往对每个节点申请同等大小的空间

一般来说，B+Tree比B Tree更适合实现外存储索引结构
####1.2.2.1  带有顺序访问指针的B+Tree
在经典B+Tree的基础上进行了优化，增加了顺序访问指针
![图4](http://upload-images.jianshu.io/upload_images/4685968-dfd900ea7ac5deee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如图4所示，在B+Tree的每个叶节点增加一个指向相邻叶节点指针，形成带有顺序访问指针的B+Tree
此优化的目的是提高区间访问的性能，例如图4中如果要查询key为从18到49的所有数据记录，当找到18后，只需顺着节点和指针顺序遍历就可以一次性访问到所有数据节点，极大提高了区间查询效率
##1.3 为什么使用B Tree（B+Tree）
红黑树也可用来实现索引，但是文件系统及数据库系统普遍采用B/+Tree,何也?

一般来说，索引本身也很大，不可能全存内存，往往以索引文件的形式存在磁盘

索引查找过程中就要产生磁盘I/O消耗，相对于内存存取，I/O存取的消耗要高几个数量级，所以评价一个数据结构作为索引的优劣最重要的指标就是在查找过程中磁盘I/O操作次数的渐进复杂度。

B树在提高了IO性能的同时并没有解决元素遍历的我效率低下的问题,正是为了解决这个问题,B+树应用而生.B+树只需要去遍历叶子节点就可以实现整棵树的遍历.而且在数据库中基于范围的查询是非常频繁的，而B树不支持这样的操作（或者说效率太低）.　　

换句话说，索引的结构组织要尽量减少查找过程中磁盘I/O的存取次数
##1.4 主存存取原理
计算机使用的主存基本都是随机读写存储器（RAM），抽象出一个十分简单的存取模型来说明RAM的工作原理
![图5  4x4的主存模型
](http://upload-images.jianshu.io/upload_images/4685968-c01748789e4b937d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从抽象角度看，主存是一系列的存储单元组成的矩阵，每个存储单元存储固定大小的数据
每个存储单元有唯一的地址，现代主存的编址规则比较复杂，这里将其简化成一个二维地址：通过一个行地址和一个列地址可以唯一定位到一个存储单元
- 存取过程
当系统需要读取主存时，将地址信号通过地址总线传给主存，主存读到地址信号后，解析信号并定位到指定存储单元，然后将此存储单元数据放到数据总线，供其它部件读取

- 写主存
过程类似，系统将要写入单元地址和数据分别放在地址总线和数据总线上，主存读取两个总线的内容，做相应的写操作

这里可以看出，主存存取的时间仅与存取次数呈线性关系，因为不存在机械操作，两次存取的数据的“距离”不会对时间有任何影响，例如，先取A0再取A1和先取A0再取D3的时间消耗是一样的
## 1.5  磁盘存取原理
索引一般以文件形式存储在磁盘上，索引检索需要磁盘I/O
与主存不同，磁盘I/O存在机械消耗，因此磁盘I/O时间消耗巨大
![图6 磁盘的整体结构示意图](http://upload-images.jianshu.io/upload_images/4685968-7f653ab7b3304e21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
磁盘由大小相同且同轴的圆形盘片组成，磁盘可以转动（各磁盘必须同步转动）
在磁盘的一侧有磁头支架，磁头支架固定了一组磁头，每个磁头负责存取一个磁盘的内容。磁头不能转动，但是可以沿磁盘半径方向运动（实际是斜切向运动），每个磁头同一时刻也必须是同轴的，即从正上方向下看，所有磁头任何时候都是重叠的（不过目前已经有多磁头独立技术，可不受此限制）
![图7 磁盘结构的示意图](http://upload-images.jianshu.io/upload_images/4685968-33af042b686050a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
盘片被划分成一系列同心环，圆心是盘片中心，每个同心环叫做一个磁道，所有半径相同的磁道组成一个柱面。磁道被沿半径线划分成一个个小的段，每个段叫做一个扇区，每个扇区是磁盘的最小存储单元。为了简单起见，我们下面假设磁盘只有一个盘片和一个磁头。

当需要从磁盘读取数据时，系统会将数据逻辑地址传给磁盘，磁盘的控制电路按照寻址逻辑将逻辑地址翻译成物理地址，即确定要读的数据在哪个磁道，哪个扇区
为了读取这个扇区的数据，需要将磁头放到这个扇区上方，为了实现这一点，磁头需要移动对准相应磁道，这个过程叫做寻道，所耗费时间叫做寻道时间，然后磁盘旋转将目标扇区旋转到磁头下，这个过程耗费的时间叫做旋转时间
## 1.6  局部性原理与磁盘预读
由于存储介质特性，磁盘本身存取就比主存慢，再加上机械运动耗费，磁盘的存取速度往往是主存的几百万分之一，因此为了提高效率，要尽量减少磁盘I/O。
为了达到这个目的，磁盘往往不是严格按需读取，而是每次都会预读，即使只需要一个字节，磁盘也会从这个位置开始，顺序向后读取一定长度的数据放入内存。这样做的理论依据是计算机科学中著名的局部性原理：
`当一个数据被用到时，其附近的数据也通常会马上被使用`
`程序运行期间所需要的数据通常比较集中`
由于磁盘顺序读取的效率很高（不需要寻道时间，只需很少的旋转时间），因此对于具有局部性的程序来说，预读可以提高I/O效率

`预读的长度一般为页（page）的整数倍`
页是存储器的逻辑块，操作系统往往将主存和磁盘存储区分割为连续的大小相等的块，每个存储块称为一页（在许多操作系统中，页大小通常为4k），主存和磁盘以页为单位交换数据
当程序要读取的数据不在主存中时，会触发一个缺页异常，此时系统会向磁盘发出读盘信号，磁盘会找到数据的起始位置并向后连续读取一页或几页载入内存中，然后异常返回，程序继续运行
## 1.7  B/+Tree索引的性能分析
一般使用磁盘I/O次数评价索引结构的优劣

### B Tree分析
检索一次最多需要访问h个节点
数据库系统的设计者巧妙利用了磁盘预读原理，将一个节点的大小设为等于一个页，这样每个节点只需要一次I/O就可以完全载入
为了达到这个目的，在实际实现B-Tree还需要使用如下技巧：
-  每次新建节点时，直接申请一个页的空间，这样就保证一个节点物理上也存储在一个页里，加之计算机存储分配都是按页对齐的，就实现了一个node只需一次I/O
- B-Tree中一次检索最多需要h-1次I/O（根节点是常驻内存的），渐进复杂度为O(h)=O(logdN)。
一般实际应用中，出度d是非常大的数字，通常超过100，因此h非常小（通常不超过3）

综上所述，用B-Tree作为索引结构效率是非常高的

### 红黑树
h明显要深的多。由于逻辑上很近的节点（父子）物理上可能很远，无法利用局部性，所以红黑树的I/O渐进复杂度也为O(h)，效率明显比B-Tree差很多

B+Tree更适合外存索引，原因和内节点出度d有关
从上面分析可以看到，`d越大索引的性能越好`
`出度的上限取决于节点内key和data的大小`：
```
dmax=floor(pagesize/(keysize+datasize+pointsize))
```
floor表示向下取整。由于B+Tree内节点去掉了data域，因此可以拥有更大的出度，更好的性能
# 2. MySQL索引实现
索引属于存储引擎级别的概念，不同存储引擎对索引的实现方式是不同的，主要讨论MyISAM和InnoDB两个存储引擎的索引实现方式
##2.1 MyISAM索引实现
使用B+Tree作为索引结构，叶节点data域存放数据记录的地址
![图8 MyISAM索引的原理图](http://upload-images.jianshu.io/upload_images/4685968-3c528e050ba99593.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
设Col1为主键，则图8是一个MyISAM表的主索引（Primary key）示例
可以看出MyISAM的索引文件仅仅保存数据记录的地址

在MyISAM中，主/辅索引在结构上没有任何区别，只是主索引要求`key唯一`，而辅索引`key可重复`

如果我们在Col2上建立一个辅索引
![图9 Col2上建立的辅索引](http://upload-images.jianshu.io/upload_images/4685968-ca234341ecc259d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
同样也是一颗B+Tree，data域保存数据记录的地址。
因此，MyISAM中索引检索的算法为首先按照B+Tree搜索算法搜索索引，如果指定的Key存在，则取出其data域的值，然后以data域的值为地址，读取相应数据记录。

MyISAM的索引方式也叫做“非聚集”的，之所以这么称呼是为了与InnoDB的聚集索引区分
##2.2 InnoDB索引实现
虽然InnoDB也使用B+Tree作为索引结构，但具体实现方式却与MyISAM截然不同

第一个重大区别是
- `InnoDB的数据文件本身就是索引文件`
  - MyISAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址
  - 而在InnoDB中，表数据文件本身就是按B+Tree组织的一个索引结构，这棵树的叶节点data域保存了完整的数据记录。这个索引的key是数据表的主键，因此InnoDB表数据文件本身就是主索引
![图10 InnoDB主索引（同时也是数据文件）示意图](http://upload-images.jianshu.io/upload_images/4685968-36a10ea5ce6fdea4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到叶节点包含了完整的数据记录。这种索引叫做`聚集索引`
因为InnoDB的数据文件本身要按主键聚集，所以InnoDB要求表必须有主键（MyISAM可以没有），如果没有显式指定，则MySQL系统会自动选择一个可以唯一标识数据记录的列作为主键，如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整形

第二个与MyISAM索引的不同是
- InnoDB的辅索引data域存储相应记录主键的值而不是地址。换句话说，InnoDB的所有辅助索引都引用主键作为data域
![图11 定义在Col3上的一个辅索引](http://upload-images.jianshu.io/upload_images/4685968-9e8eb904029b3bce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这里以英文字符的ASCII码作为比较准则
聚集索引这种实现方式使得按主键的搜索十分高效，但是辅助索引搜索需要检索两遍索引：
  -   首先检索辅助索引获得主键
  - 然后用主键到主索引中检索获得记录

知道了InnoDB的索引实现后，就很容易明白为什么不建议使用过长的字段作为主键，因为所有辅索引都引用主索引，过长的主索引会令辅索引变得过大
再如，用非单调的字段作为主键在InnoDB中不是个好主意，因为InnoDB数据文件本身是一颗B+Tree，非单调的主键会造成在插入新记录时数据文件为了维持B+Tree的特性而频繁的分裂调整，十分低效，而使用自增字段作为主键则是一个很好的选择

##聚簇索引
聚簇索引并不是一种单独的索引类型，而是一种`数据存储方式`
具体的细节依赖于其实现方式，但innoddb 的聚簇索引实际上在同一个结构中`保存了B-Tree索引和数据行`
是对磁盘上实际数据重新组织以按指定的一个或多个列的值排序的算法。特点是存储数据的顺序和索引顺序一致。
一般情况下主键会默认创建聚簇索引，且`一张表只允许存在一个聚簇索引`

当表有聚簇索引时，它的数据实际上存放在索引的叶子页（leaf page）中
术语`‘聚簇’`表示数据行和相邻的键值进错的存储在一起
`因为无法同时把数据行存放在两个不同的地方，所以在一个表中只能有一个聚簇索引` （不过，覆盖索引可以模拟多个聚簇索引的情况）。

InnoDb将通过主键聚集数据。

如果没有定义主键，InnoDB 会选择一个唯一的非空索引代替
如果没有这样的索引，InnoDB 会隐式定义一个主键来作为聚簇索引
InnoDB值聚集在同一个页面中的记录,包含相邻键值的页面可能会相距很远

## InnoDB 和 MyISAM的数据分布对比
聚簇索引和非聚簇索引的数据分布有区别，以及对应的主键索引和二级索引的数据分布也有区别
来看看InnoDB和MyISAM是如何存储下面的这个表的
```
CREATE TABLE layout_test(

　　　　col1 int not null,

　　　　col2 int not null,

 　　　  primary key (col1),

　　　　key(col2)

　　);
```
假设该表的主键取值为1-1w，按照随机顺序插入，并使用`OPTIMIZE TABLE`命令优化
换句话说，数据在磁盘的存储方式已经最优，但进行的顺序是随机的
列col2的值时从1-100之间随机赋值，所以有很多重复的值

### MyISAM 的数据分布
MyIsam按照数据插入的顺序存储在磁盘上

实际上，MyISAM 中主键索引和其他索引在结构上没有什么不同
主键索引就是一个名为PRIMARY的唯一非空索引

### InnoDB 的数据分布
因为InnoDB支持聚簇索引，索引使用非常不同的方式存储同样的数据。在InnoDB中，聚簇索引“是”表，所以不像myISAM那样需要独立的行存储

### 聚簇索引的一些重要优点：
- 可以把相关的数据保存在一起
例如，实现电子邮箱时，可以根据用户id来聚集数据这样只需要从磁盘读取少数的数据页就能获取某个用户的全部邮件。如果没有使用聚簇索引，则每封邮件都可能导致一次I/O
- 数据访问更快
聚簇索引将索引和数据保存在同一个B-Tree中，因此从聚簇索引中获取数据通常比非聚簇索引中快
- 使用覆盖索引扫描的查询可以直接使用页节点中的主键值。

 

　　聚簇索引的缺点：

　　聚簇索引最大限度的提高了io密集型应用的性能，但如果数据全部存放在内存中，则访问的顺序就没那么重要了，聚簇索引也就没有什么优势了。

　　插入速度严重依赖插入顺序。按照主键的顺序插入是加载数据到innodb表中速度最快的方式。但如果不是按照主键顺序加载数据，那么加载完成后最好使用OPTIMIZE TABLE 命令来重新组织一下表。

　　更新聚簇索引的代价很高，因为会强制InooDB将每个更新的数据移动到新的位置。

　　基于聚簇索引的表在插入行，或者主键被更新导致需要移动行的时候，可能面临’页分裂（page split）‘的问题。当行的主键值要求必须将这一行插入到某个已满的页中时。存储引擎，存储引擎会将该页分裂成两个页面来容纳该行，这就是一次页分裂操作。页分裂会导致表占用更多的存储空间。

　　聚簇索引可能导致全表扫描变慢，尤其是行比较稀疏，或者由于页分裂导致数据存储不连续的时候。

　　二级索引（非聚簇索引）可能比想象的要更大，因为在二级索引的子节点包含了最优一个几点可能让人有些疑惑，为什么二级索引需要两次索引查找？答案在于二级索引中保存的“行指针”的实质。要记住，二级索引叶子节点保存的不是只想物理位置的指针，而是行的主键值。

　　这意味着通过二级索引进行查找行，存储引擎需要找到二级索引的子节点获得对应的主键值，然后根据这个值去聚簇索引总超找到对应的行。这里做了重复的工作：两次B-Tree查找，而不是一次。对于InnoDB，自适应哈希索引能够减少这样重复工作。

在《数据库原理》一书中是这么解释聚簇索引和非聚簇索引的区别的：
- 聚簇索引的叶子节点就是数据节点
- 非聚簇索引的叶子节点仍然是索引节点，只不过有指向对应数据块的指针。

因此，MYSQL中不同的数据存储引擎对聚簇索引的支持不同就很好解释了。
下面，我们可以看一下MYISAM和INNODB两种引擎的索引结构。

如原始数据为：
![](https://upload-images.jianshu.io/upload_images/4685968-ece2b523748fda67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
MyISAM引擎的数据存储方式,如图
![](https://upload-images.jianshu.io/upload_images/4685968-6ad71a2daeace2bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
MYISAM是按列值与行号来组织索引的
它的叶子节点中保存的实际上是指向存放数据的物理块的指针。
MYISAM引擎的索引文件（.MYI）和数据文件(.MYD)是相互独立的。

而InnoDB按聚簇索引的形式存储数据，所以它的数据布局有着很大的不同。它存储数据的结构大致如下：
![](https://upload-images.jianshu.io/upload_images/4685968-15f63d367a077aa4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


注：聚簇索引中的每个叶子节点包含主键值、事务ID、回滚指针(rollback pointer用于事务和MVCC）和余下的列(如col2)。

INNODB的二级索引与主键索引有很大的不同。InnoDB的二级索引的叶子包含主键值，而不是行指针(row pointers)，这减小了移动数据或者数据页面分裂时维护二级索引的开销，因为InnoDB不需要更新索引的行指针。其结构大致如下：
![](https://upload-images.jianshu.io/upload_images/4685968-1d56a6bc5696d4cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


INNODB和MYISAM的主键索引与二级索引的对比：
![](https://upload-images.jianshu.io/upload_images/4685968-d234ca8591982647.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

InnoDB的的二级索引的叶子节点存放的是KEY字段加主键值。因此，通过二级索引查询首先查到是主键值，然后InnoDB再根据查到的主键值通过主键索引找到相应的数据块。而MyISAM的二级索引叶子节点存放的还是列值与行号的组合，叶子节点中保存的是数据的物理地址。所以可以看出MYISAM的主键索引和二级索引没有任何区别，主键索引仅仅只是一个叫做PRIMARY的唯一、非空的索引，且MYISAM引擎中可以不设主键。












#3. 索引使用策略及优化
##3.1 索引的好处
![](http://upload-images.jianshu.io/upload_images/4685968-4fbbe23e0d1f669f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##3.2 什么情况下可以用到B树索引
(1) 定义有主键的列一定要建立索引 : 主键可以加速定位到表中的某行
(2) 定义有外键的列一定要建立索引 : 外键列通常用于表与表之间的连接，在其上创建索引可以加快表间的连接
(3) 对于经常查询的数据列最好建立索引
 ① 对于需要在指定范围内快速或频繁查询的数据列，因为索引已经排序，其指定的范围是连续的，查询可以利用索引的排序，加快查询的时间
② 经常用在 `where`子句中的数据列，将索引建立在`where`子句的集合过程中，对于需要加速或频繁检索的数据列，可以让这些经常参与查询的数据列按照索引的排序进行查询，加快查询的时间

## 3.3 索引优化
MySQL的优化主要分为
- 结构优化（Scheme optimization）
- 查询优化（Query optimization）

本章讨论的高性能索引策略主要属于结构优化范畴

为了讨论索引策略，需要一个数据量不算小的数据库作为示例
选用MySQL官方文档中提供的示例数据库之一：employees
这个数据库关系复杂度适中，且数据量较大。下图是这个数据库的E-R关系图（引用自MySQL官方手册）：

![图12 示例数据库](http://upload-images.jianshu.io/upload_images/4685968-9c25adaf9b182c1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 3.3.1  最左前缀原理与相关优化
高效使用索引的首要条件是知道什么样的查询会使用到索引，这个问题和B+Tree中的“最左前缀原理”有关，下面通过例子说明最左前缀原理
#### 联合索引
MySQL中的索引可以以一定顺序引用多列，这种索引叫做`联合索引`，一般的，一个联合索引是一个有序元组<a1, a2, …, an>，其中各个元素均为数据表的一列
![](http://upload-images.jianshu.io/upload_images/4685968-6f0c7e46da75dfef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 覆盖索引(Covering Indexes)
包含满足查询的所有列

只需要读索引而不用读数据,大大提高查询性能。有以下优点：
(1)索引项通常比记录要小，使得MySQL访问更少的数据
(2)索引都按值排序存储，相对于随机访问记录，需要更少的I/O
(3)大多数据引擎能更好的缓存索引。比如MyISAM只缓存索引
(4)覆盖索引对于InnoDB表尤其有用，因为InnoDB使用`聚集索引`组织数据，如果二级索引中包含查询所需的数据，就不再需要在聚集索引中查找了

覆盖索引只有B-TREE索引存储相应的值
并不是所有存储引擎都支持覆盖索引(Memory/Falcon)
![覆盖索引](http://upload-images.jianshu.io/upload_images/4685968-b5cb4126b27a6eab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

对于索引覆盖查询(index-covered query)，使用`EXPLAIN`时，可以在`Extra`列中看到`Using index`

在大多数引擎中，只有当查询语句所访问的列是索引的一部分时，索引才会覆盖
但是，`InnoDB`不限于此，`InnoDB`的二级索引在叶节点中存储了primary key的值
![](http://upload-images.jianshu.io/upload_images/4685968-36a01bdebf100c30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/4685968-f4adacc0f31bc190.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![使用覆盖索引查询数据](http://upload-images.jianshu.io/upload_images/4685968-48226fd0f82ae26b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![select *不能用覆盖索引](http://upload-images.jianshu.io/upload_images/4685968-77f918ea97f5a9fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/4685968-2a80738274715b50.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以employees.titles表为例，下面先查看其上都有哪些索引：
![](http://upload-images.jianshu.io/upload_images/4685968-466ec19b6bbfab92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从结果中可以看到titles表的主索引为<emp_no, title, from_date>，还有一个辅助索引<emp_no>
为了避免多个索引使事情变复杂（MySQL的SQL优化器在多索引时行为比较复杂），我们将辅助索引drop掉
```
ALTER TABLE employees.titles DROP INDEX emp_no;
```
这样就可以专心分析索引PRIMARY
#### 情况一：全值匹配
![](http://upload-images.jianshu.io/upload_images/4685968-fafff915fdd09f64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
很明显，当按照索引中所有列进行精确匹配（这里精确匹配指“=”或“IN”匹配）时，索引可以被用到。
这里有一点需要注意，理论上`索引对顺序敏感`，但是由于MySQL的查询优化器会自动调整where子句的条件顺序以使用适合的索引
例如我们将where中的条件顺序颠倒
![](http://upload-images.jianshu.io/upload_images/4685968-4cd33b4927926fe3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
效果是一样的
#### 情况二：最左前缀匹配
![](http://upload-images.jianshu.io/upload_images/4685968-d43e32f97faf4635.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当查询条件精确匹配索引的左边连续一个或几个列时，如<emp_no>或<emp_no, title>，所以可以被用到，但是只能用到一部分，即条件所组成的最左前缀
上面的查询从分析结果看用到了PRIMARY索引，但是key_len为4，说明只用到了索引的第一列前缀
#### 情况三：查询条件用到了索引中列的精确匹配，但是中间某个条件未提供
![](http://upload-images.jianshu.io/upload_images/4685968-c99735f259d0e4a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此时索引使用情况和情况二相同，因为title未提供，所以查询只用到了索引的第一列，而后面的`from_date`虽然也在索引中，但是由于`title`不存在而无法和左前缀连接，因此需要对结果进行过滤`from_date`（这里由于`emp_no`唯一，所以不存在扫描）
如果想让`from_date`也使用索引而不是where过滤，可以增加一个辅助索引`<emp_no, from_date>`，此时上面的查询会使用这个索引
除此之外，还可以使用一种称之为“隔离列”的优化方法，将`emp_no`与`from_date`之间的“坑”填上

首先我们看下title一共有几种不同的值
![](http://upload-images.jianshu.io/upload_images/4685968-965e8cb508997949.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
只有7种
在这种成为“坑”的列值比较少的情况下，可以考虑用“IN”来填补这个“坑”从而形成最左前缀
![](http://upload-images.jianshu.io/upload_images/4685968-0bac4e8213a39d52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这次key_len为59，说明索引被用全了，但是从type和rows看出IN实际上执行了一个range查询，这里检查了7个key。看下两种查询的性能比较：
![](http://upload-images.jianshu.io/upload_images/4685968-325c586685fd513b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
“填坑”后性能提升了一点。如果经过emp_no筛选后余下很多数据，则后者性能优势会更加明显。当然，如果title的值很多，用填坑就不合适了，必须建立辅助索引
### 情况四：查询条件没有指定索引第一列
![](http://upload-images.jianshu.io/upload_images/4685968-bf2e698b18e3af2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于不是最左前缀，这样的查询显然用不到索引
### 情况五：匹配某列的前缀字符串
![](http://upload-images.jianshu.io/upload_images/4685968-dd152f4fc8e3b12f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此时可以用到索引，通配符%不出现在开头，则可以用到索引，但根据具体情况不同可能只会用其中一个前缀
### 情况六：范围查询(由于B+树的顺序特点,尤其适合此类查询)
![](http://upload-images.jianshu.io/upload_images/4685968-af433101ab01bb45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 范围列可以用到索引（必须是最左前缀），但是范围列后面的列无法用到索引
- 索引最多用于一个范围列，因此如果查询条件中有两个范围列则无法全用到索引
![](http://upload-images.jianshu.io/upload_images/4685968-9854cc0aadb9101c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 可以看到索引对第二个范围索引无能为力。这里特别要说明MySQL一个有意思的地方，那就是仅用explain可能无法区分范围索引和多值匹配，因为在type中这两者都显示为range
- 用了“between”并不意味着就是范围查询，例如下面的查询：
![](http://upload-images.jianshu.io/upload_images/4685968-d1ce0df0ce856dd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

看起来是用了两个范围查询，但作用于emp_no上的“BETWEEN”实际上相当于“IN”，也就是说emp_no实际是多值精确匹配。可以看到这个查询用到了索引全部三个列。因此在MySQL中要谨慎地区分多值匹配和范围匹配，否则会对MySQL的行为产生困惑。
![](http://upload-images.jianshu.io/upload_images/4685968-a7220023f63b2ac1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 情况七：查询条件中含有函数或表达式
如果查询条件中含有函数或表达式，则MySQL不会为这列使用索引（虽然某些在数学意义上可以使用）
![](http://upload-images.jianshu.io/upload_images/4685968-61ab687e60a7ba4e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
虽然这个查询和情况五中功能相同，但是由于使用了函数left，则无法为title列应用索引，而情况五中用LIKE则可以。再如：
![](http://upload-images.jianshu.io/upload_images/4685968-3208e678374f432d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
显然这个查询等价于查询emp_no为10001的函数，但是由于查询条件是一个表达式，MySQL无法为其使用索引。看来MySQL还没有智能到自动优化常量表达式的程度，因此在写查询语句时尽量避免表达式出现在查询中，而是先手工私下代数运算，转换为无表达式的查询语句。
![](http://upload-images.jianshu.io/upload_images/4685968-a7b63bb9a857e296.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 3.4 Btree索引的使用限制
![](http://upload-images.jianshu.io/upload_images/4685968-7ee040434f7f206f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 3.4.1 以下情况下设置索引,但无法使用
① 以“%”开头的LIKE语句，模糊匹配
② OR语句前后没有同时使用索引
③ 数据类型出现隐式转化（如varchar不加单引号的话可能会自动转换为int型）
### 3.4.2 索引选择性与前缀索引
![](http://upload-images.jianshu.io/upload_images/4685968-ea19e7b00a27fc73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 既然索引可以加快查询速度，那么是不是只要是查询语句，就建上索引呢?
答案是否定的。因为索引虽然加快了查询速度，但索引也是有代价的：索引文件本身要消耗存储空间
- 索引会加重插入、删除和修改记录时的负担，增加写操作的成本
- 太多索引会增加查询优化器的分析选择时间
- MySQL在运行时也要消耗资源维护索引
##索引并不是越多越好。下列情况下不建议建索引
- 对于那些查询中很少涉及的列、重复值比较多的列不要建立索引
例如，在查询中很少使用的列，有索引并不能提高查询的速度，相反增加了系统维护时间和消耗了系统空间
又如，“性别”列只有列值“男”和“女”，增加索引并不能显著提高查询的速度
对于定义为text、image和bit数据类型的列不要建立索引。因为这些数据类型的数据列的数据量要么很大，要么很小，不利于使用索引
- 表记录比较少
例如一两千条甚至只有几百条记录的表，没必要建索引，让查询做全表扫描就好了
- 索引的选择性较低
所谓索引的选择性（Selectivity），是指不重复的索引值（也叫基数，Cardinality）与表记录数（#T）的比值
`Index Selectivity = Cardinality / #T`
显然选择性的取值范围为(0, 1]，选择性越高的索引价值越大，这是由B+Tree的性质决定的。
例如，上文用到的employees.titles表，如果title字段经常被单独查询，是否需要建索引，我们看一下它的选择性
![](http://upload-images.jianshu.io/upload_images/4685968-02c9d5760cca3413.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
title的选择性不足0.0001（精确值为0.00001579），所以实在没有什么必要为其单独建索引

有一种与索引选择性有关的索引优化策略叫做前缀索引，就是用列的前缀代替整个列作为索引key，当前缀长度合适时，可以做到既使得前缀索引的选择性接近全列索引，同时因为索引key变短而减少了索引文件的大小和维护开销。下面以employees.employees表为例介绍前缀索引的选择和使用。

从图12可以看到employees表只有一个索引`<emp_no>`，那么如果我们     想按名字搜索一个人，就只能全表扫描了：
![](http://upload-images.jianshu.io/upload_images/4685968-9dd6468c9e20c878.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如果频繁按名字搜索员工，这样显然效率很低，因此我们可以考虑建索引。有两种选择，建<first_name>或<first_name, last_name>，看下两个索引的选择性：
![](http://upload-images.jianshu.io/upload_images/4685968-01cb491575a09c70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



<first_name>显然选择性太低，<first_name, last_name>选择性很好，但是first_name和last_name加起来长度为30，有没有兼顾长度和选择性的办法？可以考虑用first_name和last_name的前几个字符建立索引，例如<first_name, left(last_name, 3)>，看看其选择性：

![](http://upload-images.jianshu.io/upload_images/4685968-7105b64bd966fa04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


选择性还不错，但离0.9313还是有点距离，那么把last_name前缀加到4：

![](http://upload-images.jianshu.io/upload_images/4685968-6faad98397d0ab81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这时选择性已经很理想了，而这个索引的长度只有18，比<first_name, last_name>短了接近一半，我们把这个前缀索引 建上：


1.  ALTER TABLE employees.employees
2.  ADD INDEX `first_name_last_name4`  (first_name, last_name(4));


此时再执行一遍按名字查询，比较分析一下与建索引前的结果：
![](http://upload-images.jianshu.io/upload_images/4685968-bba91b9bd60aba07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
性能的提升是显著的，查询速度提高了120多倍。

前缀索引兼顾索引大小和查询速度，但是其缺点是不能用于ORDER BY和GROUP BY操作，也不能用于Covering index（即当索引本身包含查询所需全部数据时，不再访问数据文件本身）。

## 3.5  InnoDB的主键选择与插入优化
在使用InnoDB存储引擎时，如果没有特别的需要，请永远使用一个与`业务无关的自增字段`作为主键

经常看到有帖子或博客讨论主键选择问题，有人建议使用业务无关的自增主键，有人觉得没有必要，完全可以使用如学号或身份证号这种唯一字段作为主键。不论支持哪种论点，大多数`论据都是业务层面`的。
如果从`数据库索引优化`角度看，使用InnoDB引擎而不使用自增主键绝对是一个糟糕的主意

上文讨论过InnoDB的索引实现，InnoDB使用聚集索引，数据记录本身被存于主索引（一颗B+Tree）的叶子节点上。这就要求同一个叶子节点内（大小为一个内存页或磁盘页）的各条数据记录按主键顺序存放，因此每当有一条新的记录插入时，MySQL会根据其主键将其插入适当的节点和位置，如果页面达到装载因子（InnoDB默认为15/16），则开辟一个新的页（节点）。

如果表使用自增主键，那么每次插入新的记录，记录就会顺序添加到当前索引节点的后续位置，当一页写满，就会自动开辟一个新的页。如下图所示：

![图13 ](http://upload-images.jianshu.io/upload_images/4685968-f2f97cf9e0ae2c83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这样就会形成一个紧凑的索引结构，近似顺序填满
由于每次插入时也不需要移动已有数据，因此效率很高，也不会增加很多开销在维护索引上。

如果使用非自增主键（如果身份证号或学号等），由于每次插入主键的值近似于随机，因此每次新纪录都要被插到现有索引页得中间某个位置：
![](http://upload-images.jianshu.io/upload_images/4685968-364154932c64dd23.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此时MySQL不得不为了将新记录插到合适位置而移动数据，甚至目标页面可能已经被回写到磁盘上而从缓存中清掉，此时又要从磁盘上读回来，这增加了很多开销，同时频繁的移动、分页操作造成了大量的碎片，得到了不够紧凑的索引结构，后续不得不通过OPTIMIZE TABLE来重建表并优化填充页面。

因此，只要可以，请尽量在InnoDB上采用自增字段做主键。

与排序（ORDER BY）相关的索引优化及覆盖索引（Covering index）的话题本文并未涉及，
全文索引等等本文也并未涉及

# 4 Hash索引
MySQL提供四种索引
*   B-Tree索引:最常见的的索引，大部分引擎支持B树索引
*   HASH索引:只有Memory引擎支持，使用场景简单
*   R-Tree索引:空间索引是MyISAM的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少
*   Full-text：全文索引也是MyISAM的一个特殊索引，主要用于全文索引，InnoDb从MySql5.6开始提供支持全文索引

MySql目前不支持函数索引，但是能对列的前面某一部分进行索引，例如标题title字段，可以只取title的前10个字符索引，这样的特性大大缩小了索引文件的大小，但前缀索引也有缺点，在排序order by和分组group by操作的时候无法使用

```
create index idx_title on film(title(10));
```

| 索引 | MyISAM引擎 | InnoDB引擎 | Memory引擎 |
| --- | --- | --- | --- |
| B-Tree索引 | 支持 | 支持 | 支持 |
| HASH索引 | 不支持 | 不支持 | 支持 |
| R-Tree索引 | 支持 | 不支持 | 不支持 |
| Full-text索引 | 支持 | 暂不支持 | 不支持 |

常用的索引就是B-tree索引和hash索引，资只有memory引擎支持HASH索引，hash索引适用于key-value查询，通过hash索引比B-tree索引查询更加迅速，但是hash索引不支持范围查找例如<><==,>==等操作，如果使用memory引擎并且where不使用=进行 索引列，就不会用的索引。**Memory只有在"="的条件下才会使用索引**
## 4.0 特点
![](http://upload-images.jianshu.io/upload_images/4685968-399537fefea38443.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.1 Hash索引的限制
![](http://upload-images.jianshu.io/upload_images/4685968-bce915b19b6890d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Btree模拟](http://upload-images.jianshu.io/upload_images/4685968-cabbd8a067c19921.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/4685968-9ca2abba012debda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
哈希索引只有`Memory`,` NDB`两种引擎支持，Memory引擎默认支持哈希索引，如果多个hash值相同，出现哈希碰撞，那么索引以链表方式存储

但是，Memory引擎表只对能够适合机器的内存切实有限的数据集。

要使InnoDB或MyISAM支持哈希索引，可以通过伪哈希索引来实现，叫自适应哈希索引。

主要通过增加一个字段，存储hash值，将hash值建立索引，在插入和更新的时候，建立触发器，自动添加计算后的hash到表里。

## [](http://homeway.me/2015/09/13/mysql-hash-index/#%E7%9B%B4%E6%8E%A5%E7%B4%A2%E5%BC%95 "直接索引")直接索引

假如有一个非常非常大的表，如下：

```
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(10) NOT NULL COMMENT '自增id',
  `name` varchar(128) NOT NULL DEFAULT '' COMMENT '用户名',
  `email` varchar(128) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `pass` varchar(64) NOT NULL DEFAULT '' COMMENT '用户密码',
  `last` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后登录时间',
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

```

这个时候，比如说，用户登陆，我需要通过email检索出用户，通过explain得到如下：

> mysql> explain SELECT `id` FROM `User` WHERE email = ‘ooxx@gmail.com’ LIMIT 1;

```
+----+-------------+-------+------+---------------+------+---------+------+--------+-------------+
| id | select_type | table | type | possible_keys | key  | key_len | ref  | rows   | Extra       |
+----+-------------+-------+------+---------------+------+---------+------+--------+-------------+
|  1 | SIMPLE      | User  | ALL  | NULL          | NULL | NULL    | NULL | 384742 | Using where |
+----+-------------+-------+------+---------------+------+---------+------+--------+-------------+

```

发现 `rows = 384742` 也就是要在384742里面进行比对email这个字段的字符串。

这条记录运行的时间是：Query took 0.1744 seconds，数据库的大小是40万。

从上面可以说明，如果直接在email上面建立索引，除了索引区间匹配，还要进行字符串匹配比对，email短还好，如果长的话这个查询代价就比较大。

如果这个时候，在email上建立哈希索引，查询以int查询，性能就比字符串比对查询快多了。

## [](http://homeway.me/2015/09/13/mysql-hash-index/#Hash-%E7%AE%97%E6%B3%95 "Hash 算法")Hash 算法

建立哈希索引，先选定哈希算法，这里选用CRC32。

《高性能MySQL》说到的方法CRC32算法，建立SHA或MD5算法是划算的，本身位数都有可能比email段长了。

## [](http://homeway.me/2015/09/13/mysql-hash-index/#INSERT-UPDATE-SELECT-%E6%93%8D%E4%BD%9C "INSERT UPDATE SELECT 操作")INSERT UPDATE SELECT 操作

在表中添加hash值的字段：

> mysql> ALTER TABLE `User` ADD COLUMN email_hash int unsigned NOT NULL DEFAULT 0;

接下来就是在UPDATE和INSERT的时候，自动更新 `email_hash` 字段，通过MySQL触发器实现：

```
DELIMITER |
CREATE TRIGGER user_hash_insert BEFORE INSERT ON `User` FOR EACH ROW BEGIN
SET NEW.email_hash=crc32(NEW.email);
END;
|
CREATE TRIGGER user_hash_update BEFORE UPDATE ON `User` FOR EACH ROW BEGIN
SET NEW.email_hash=crc32(NEW.email);
END;
|
DELIMITER ;

```

这样的话，我们的SELECT请求就会变成这样：

> mysql> SELECT `email`, `email_hash` FROM `User` WHERE email_hash = CRC32(“F2dgTSWRBXSZ1d3O@gmail.com”) AND `email`= “F2dgTSWRBXSZ1d3O@gmail.com”;

```
+----------------------------+------------+
| email                      | email_hash |
+----------------------------+------------+
| F2dgTSWRBXSZ1d3O@gmail.com | 2765311122 |
+----------------------------+------------+

```

在没建立hash索引时候，请求时间是 0.2374 seconds，建立完索引后，请求时间直接变成 0.0003 seconds。

`AND email = "F2dgTSWRBXSZ1d3O@gmail.com"` 是为了防止哈希碰撞导致数据不准确。

* * *

# [](http://homeway.me/2015/09/13/mysql-hash-index/#0x02-Hash-Index-%E7%BC%BA%E7%82%B9 "0x02.Hash Index 缺点")0x02.Hash Index 缺点

哈希索引也有几个缺点：

*   索引存放的是hash值,所以仅支持 < = > 以及 IN 操作
*   hash索引无法通过操作索引来排序，因为存放的时候经过hash计算，但是计算的hash值和存放的不一定相等，所以无法排序
*   不能避免全表扫描，只是由于在memory表里支持非唯一值hash索引，就是不同的索引键，可能存在相同的hash值
*   如果哈希碰撞很多的话，性能也会变得很差
*   哈希索引无法被用来避免数据的排序

