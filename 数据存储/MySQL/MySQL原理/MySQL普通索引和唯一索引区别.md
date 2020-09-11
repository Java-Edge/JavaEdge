# 1 概念区分
- 普通索引和唯一索引
普通索引可重复，唯一索引和主键一样不能重复。
唯一索引可作为数据的一个合法验证手段，例如学生表的身份证号码字段，我们人为规定该字段不得重复，那么就使用唯一索引。（一般设置学号字段为主键）
- 主键和唯一索引
主键保证数据库里面的每一行都是唯一的，比如身份证，学号等，在表中要求唯一，不重复。唯一索引的作用跟主键的作用一样。
不同的是，在一张表里面只能有一个主键，主键不能为空，唯一索引可以有多个，唯一索引可以有一条记录为空，即保证跟别人不一样就行。
比如学生表，在学校里面一般用学号做主键，身份证则弄成唯一索引；而到了教育局，他们就把身份证号弄成主键，学号换成了唯一索引。
选谁做表的主键，要看实际应用，主键不能为空。
# 2 案例引入
某居民系统，每人有唯一身份证号。如果系统需要按身份证号查姓名，就会执行类似如下SQL：
```sql
select name from CUser where id_card = 'ooxx';
```

然后你肯定会在`id_card`字段建索引。但`id_card`字段较大，不推荐将其做主键。于是现有俩选择：
1. 给`id_card`字段创建唯一索引
2. 创建一个普通索引

假定业务代码已保证不会写入重复的身份证号，这两个选择逻辑上都正确。但从性能角度考虑，唯一索引还是普通索引呢？

再看如下案例：假设字段 k 上的值都不重复。
- InnoDB的索引组织结构：
![](https://img-blog.csdnimg.cn/20200907125311641.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_16,color_FFFFFF,t_70#pic_center)

接下来分析性能。

#  3 查询性能
```sql
select id from T where k=4
```
通过B+树从树根开始层序遍历到叶节点，可认为数据页内部是通过二分法搜索。
- 普通索引，查找到满足条件的第一个记录(4,400)后，需查找下个记录，直到碰到第一个不满足k=4的记录
- 唯一索引，由于索引具备唯一性，查找到第一个满足条件的记录后，就会停止检索

看起来性能差距很微小。

InnoDB数据按数据页单位读写。即读一条记录时，并非将该一个记录从磁盘读出，而以页为单位，将其整体读入内存。

因此普通索引，要多做一次“查找和判断下一条记录”的操作，也就一次指针寻找和一次计算。
如果k=4记录恰为该数据页最后一个记录，那么要取下个记录，还得读取下个数据页，操作稍微复杂。
对整型字段，一个数据页可存近千key，因此这种情况概率其实也很低。因此计算平均性能差异时，可认为该操作成本对现在CPU开销忽略不计。

准备验证更新性能前，需要了解个InnoDB的小知识点哦~
# 4 change buffer
## 4.1 基本概念
change buffer是一种特殊的数据结构，当这些页面不在缓冲池中时，这些高速缓存会将更改缓存到辅助索引页面。可能由INSERT，UPDATE或DELETE操作（DML）导致的缓冲更改将在以后通过其他的**读取操作**将页加载到缓冲池中时合并。
![](https://img-blog.csdnimg.cn/20200907124820810.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_16,color_FFFFFF,t_70#pic_center)
> 如上图可见，change buffer用的是buffer pool里的内存，所以不能无限增长。change buffer大小可通过参数innodb_change_buffer_max_size动态设置。
> 比如设置为50：change buffer的大小最多只能占用buffer pool的50%。

需更新一个数据页时：
- 页在内存，直接更新
- 页不在内存，在不影响数据一致性下，InooDB会将这些更新操作缓存于change buffer，而无需从磁盘读入页

在下次查询访问该数据页时，才将数据页读入内存，然后执行change buffer中与这个页有关的操作。通过该方式就能保证该数据逻辑的正确性。

> change buffer 实际上也是可持久化的数据，即它不仅在内存中有拷贝，也会被写进磁盘。

## 4.2 merge
将change buffer中的操作应用到原数据页，得到最新结果的过程。

###  4.2.1 触发时机
1. 访问该数据页
2. 系统后台线程定期merge
3. 数据库正常关闭（shutdown）的过程

若能将更新操作先记录在change buffer，减少读盘，语句执行速度便会明显提升。且数据读入内存需要占用buffer pool，因此也能降低内存占用，提高内存利用率。

## 4.3 何时使用change buffer
- 对于唯一索引，更新操作都要先判断该操作是否违反唯一性约束：
比如，要插入(4,400)记录，要先判断表中是否已存k=4记录，就必须要将数据页读入内存来判断。若都已读入内存了，那直接更新内存自然很快，没必要使用change buffer。
因此，唯一索引的更新不能使用change buffer，**只有普通索引可使用**。

## 4.4 适用场景
难道普通索引的所有场景，使用change buffer都可加速吗？

注意merge才是真正进行数据更新时刻，change buffer主要是将记录的变更动作缓存。所以在一个数据页做merge前，change buffer记录变更越多（即该数据页上要更新的次数越多），收益越大。

- 写多读少业务，页面在写完后马上被访问到的概率较小，change buffer使用效果最好。常见为账单、日志类系统。
- 写后马上查询，将先新记录在change buffer，但之后由于立即访问该数据页，又很快触发merge，这样的话随机访问IO次数不会减少，反而增加change buffer维护代价，change buffer起了副作用。


# 5 更新性能
现在来看往表中插入一个新记录(4,400)，InnoDB会做什么？

需要区分该记录要更新的目标页是否在内存：
## 5.1 在内存
- 唯一索引
找到3和5之间位置，判断到没有冲突，插入值，语句执行结束。
- 普通索引
找到3和5之间位置，插入值，语句执行结束。

普通索引和唯一索引对更新语句性能影响的差别，只是一个判断，耗费微小CPU时间。

## 5.2 不在内存
- 唯一索引
需将数据页读入内存，判断到没有冲突，插入值，语句执行结束。

- 普通索引
将更新记录在change buffer，语句执行结束。

将数据从磁盘读入内存涉及随机IO访问，是数据库里面成本最高操作之一。而change buffer减少随机磁盘访问，所以更新性能提升明显。



# 6 实践中的索引选择
普通索引和唯一索引究竟如何抉择？这两类索引在查询性能上没差别，主要考虑对更新性能影响。所以，推荐尽量选择普通索引。

如果所有更新后面，都紧跟对该记录的查询，那么该关闭change buffer。
而在其他情况下，change buffer都能提升更新性能。
普通索引和change buffer的配合使用，对于数据量大的表的更新优化还是很明显的。

在使用机械硬盘时，change buffer机制的收效非常显著。
所以，当你有一个类似“历史数据”的库，并且出于成本考虑用机械硬盘时，应该关注这些表里的索引，尽量使用普通索引，把change buffer 开大，确保“历史数据”表的数据写速度。

# 6 change buffer 和 redo log
WAL 提升性能的核心机制，也是尽量减少随机读写，这两个概念易混淆。
所以，这里我把它们放到了同一个流程里来说明区分。


## 6.1 插入流程

```sql
insert into t(id,k) values(id1,k1),(id2,k2);
```

假设当前k索引树的状态，查找到位置后，k1所在数据页在内存(InnoDB buffer pool)，k2数据页不在内存。

- 带change buffer的更新流程图，图中两个箭头都是后台操作，不影响更新响应。

![](https://img-blog.csdnimg.cn/20200907161720661.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_16,color_FFFFFF,t_70#pic_center)

该更新做了如下操作：
1. Page1在内存，直接更新内存
2. Page2不在内存，就在change buffer区，缓存下“往Page2插一行记录”的信息
3. 将前两个动作记入redo log

之后事务完成。执行该更新语句成本很低，只写两处内存，然后写一处磁盘（前两次操作合在一起写了一次磁盘），还是顺序写。

## 6.2 怎么处理之后的读请求？
```sql
select * from t where k in (k1, k2);
```

读语句紧随更新语句，内存中的数据都还在，此时这俩读操作就与系统表空间和 redo log 无关。所以在图中就没画这俩。

- 带change buffer的读过程
![](https://img-blog.csdnimg.cn/20200907171043850.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNTg5NTEw,size_16,color_FFFFFF,t_70#pic_center)

读Page1时，直接从内存返回。
WAL之后如果读数据，是不是一定要读盘，是不是一定要从redo log里面把数据更新以后才可以返回？其实不用。
看上图状态，虽然磁盘上还是之前数据，但这里直接从内存返回结果，结果正确。

要读Page2时，需把Page2从磁盘读入内存，然后应用change buffer里面的操作日志，生成一个正确版本并返回结果。
可见直到需读Page2时，该数据页才被读入内存。

所以，要简单对比这俩机制对更新性能影响
- redo log 主要节省随机写磁盘的IO消耗（转成顺序写）
- change buffer主要节省随机读磁盘的IO消耗


# 6 总结
由于唯一索引用不了change buffer的优化机制，因此如果业务可以接受，从性能角度，推荐优先考虑非唯一索引。

## 6.1 关于到底是否使用唯一索引
主要纠结在“业务可能无法确保”。本文前提是“业务代码已经保证不会写入重复数据”下，讨论性能问题。
- 如果业务不能保证，或者业务就是要求数据库来做约束，那么没得选，必须创建唯一索引。这种情况下，本文意义在于，如果碰上大量插入数据慢、内存命中率低时，多提供一个排查思路。
- 然后，在一些“归档库”的场景，可考虑使用唯一索引的。比如，线上数据只需保留半年，然后历史数据保存在归档库。此时，归档数据已是确保没有唯一键冲突。要提高归档效率，可考虑把表的唯一索引改普通索引。

## 6.2 如果某次写入使用change buffer，之后主机异常重启，是否会丢失change buffer的数据？
不会丢失。
虽然是只更新内存，但在事务提交时，我们把change buffer的操作也记录到redo log，所以崩溃恢复时，change buffer也能找回。

## 6.3 merge的过程是否会把数据直接写回磁盘？
### merge执行流程
1. 从磁盘读入数据页到内存（老版本数据页）
2. 从change buffer找出该数据页的change buffer 记录(可能有多个），依次应用，得到新版数据页
3. 写redo log
该redo log包含数据的变更和change buffer的变更

至此merge过程结束。
这时，数据页和内存中change buffer对应磁盘位置都尚未修改，是脏页，之后各自刷回自己物理数据，就是另外一过程。

# 问题思考
在构造第一个例子的过程，通过session A的配合，让session B删除数据后又重新插入一遍数据，然后就发现explain结果中，rows字段从10001变成37000多。
而如果没有session A的配合，只是单独执行delete from t 、call idata()、explain这三句话，会看到rows字段其实还是10000左右。这是什么原因呢？

如果没有复现，检查
- 隔离级别是不是RR（Repeatable Read，可重复读）
- 创建的表t是不是InnoDB引擎


为什么经过这个操作序列，explain的结果就不对了？
delete 语句删掉了所有的数据，然后再通过call idata()插入了10万行数据，看上去是覆盖了原来10万行。
但是，session A开启了事务并没有提交，所以之前插入的10万行数据是不能删除的。这样，之前的数据每行数据都有两个版本，旧版本是delete之前数据，新版本是标记deleted的数据。
这样，索引a上的数据其实有两份。

然后你会说，不对啊，主键上的数据也不能删，那没有使用force index的语句，使用explain命令看到的扫描行数为什么还是100000左右？（潜台词，如果这个也翻倍，也许优化器还会认为选字段a作为索引更合适）
是的，不过这个是主键，主键是直接按照表的行数来估计的。而表的行数，优化器直接用的是`show table status`的值。
大家的机器如果IO能力比较差的话，做这个验证的时候，可以把`innodb_flush_log_at_trx_commit` 和 `sync_binlog` 都设置成0。

参考
- https://dev.mysql.com/doc/refman/8.0/en/innodb-change-buffer.html
- https://time.geekbang.org/column/article/70848