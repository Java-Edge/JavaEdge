# 更改表名
## Table 从 db_a 要搬到 db_b
 ```
RENAME TABLE db_a.old_table TO db_b.new_table;
```
## MySQL Table 改名字(重新命名)
```
RENAME TABLE old_table TO new_table;
```
## MySQL 兩個 Table 要互換名字
```
RENAME TABLE old_table TO tmp_table,
new_table TO old_table,
tmp_table TO new_table;



#分页
- 方式1：
`select * from table order by id limit m, n; `
 该语句的意思为，查询m+n条记录，去掉前m条，返回后n条记录。无疑该查询能够实现分页功能
但是如果m的值越大，查询的性能会越低（越后面的页数，查询性能越低），因为MySQL同样需要扫描过m+n条记录。
- 方式2：
`select * from table where id > #max_id# order by id limit n;`
 该查询每次会返回n条记录，却无需像方式1扫描过m条记录，在大数据量的分页情况下，性能可以明显好于方式1
但该分页查询必须要每次查询时拿到上一次查询（上一页）的一个最值id。
该查询的问题就在于，我们有时无法拿到上一次查询（上一页）的最值id
比如当前在第3 页，需要查询第5页的数据，该方法便爱莫能助
- 方式3：
为了避免能够实现方式2不能实现的查询，就同样需要使用到`limit m, n`子句
为了性能，就需要将m的值尽力的小，比如当前在第3页，需要查询第5页，每页10条数据，当前第3页的最大id为#max_id#：
` select * from table where id > #max_id# order by id limit 20, 10;`
 其实该查询方式是部分解决了方式2的问题，但如果当前在第2页，需要查询第100页或1000页，性能仍然会较差。
- 方式4：
`select * from table as a inner join (select id from table order by id limit m, n) as b on a.id = b.id order by a.id;`
 该查询同方式1一样，m的值可能很大，但由于内部的子查询只扫描了字段id，而不是整张表，所以性能要强于方式1查询，并且该查询能够解决方式2和方式3不能解决的问题。
- 方式5：
`select * from table where id > (select id from table order by id limit m, 1) limit n;`
 该查询方式同方式4，同样通过子查询扫描字段id，效果同方式4。
至于性能的话，方式5的性能会略好于方式4，因为方式5不需要在进行表的关联，而是一个简单的比较。
# where
如需有条件地从表中选取数据，可将 where 子句添加到select语句中。
`SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....`
- 查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用where设定查询条件
- 可以在 where 子句中指定任何条件
- 可以使用 and 或者 or 指定一个或多个条件
- where 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
- where 类似于 if 条件，根据 MySQL 表中的字段值来读取指定的数据
![操作符列表，可用于 WHERE 子句](https://upload-images.jianshu.io/upload_images/4685968-a3e6fec0d4325e79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
想读取指定的数据，WHERE是非常有用的。
使用主键来作为 WHERE 子句的条件查询是非常快速的
如果给定的条件在表中没有任何匹配的记录，那么查询不会返回任何数据
- MySQL 的 where字符串比较是不区分大小写的。 可以使用 BINARY 关键字来设定 where字符串比较区分大小写
![](https://upload-images.jianshu.io/upload_images/4685968-67c6516cac06d9d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#update
修改或更新 MySQL 中的数据
`UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]`

update 表 set 列=新值 where 更新条件;
- 可以同时更新若干个字段
- 可以在  `where` 子句中指定任何条件
当你需要更新数据表中指定行的数据时 WHERE 子句是非常有用的
- 可以在一个单独表中同时更新数据

UPDATE替换某个字段中的某个字符
`UPDATE table_name SET field=REPLACE(field, 'old-string', 'new-string') 
[WHERE Clause]`
#limit
实例：每行5页，返回第2页的数据
- 利用 limit 和 offset 。limit 后数代表返回几条记录，offset后数代表从第几条记录开始返回（第一条记录序号为0），即偏移记录条数
`SELECT * FROM employees LIMIT` `5` `OFFSET` `5`
- 在 limit x,y 
  - y:返回几条记录
  - x:从第几条记录开始返回（第一条记录序号为0）
`SELECT * FROM employees LIMIT 5,5`

`limit y,x == limit x offset y`
#字符串截取
MySQL 字符串截取函数   ：left(), right(), substring(), substring_index()。还有 mid(), substr()。其中，mid(), substr() 等价于 substring() 函数，substring() 的功能非常强大和灵活。
- left(str, length)
![](https://upload-images.jianshu.io/upload_images/4685968-0a6266a55bb742c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- right(str, length)
![](https://upload-images.jianshu.io/upload_images/4685968-d63e20bd7cd00282.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- substring(字符串，起始位置); substring(字符串，起始位置，长度)
![从字符串的第 4 个字符位置开始取，直到结束](https://upload-images.jianshu.io/upload_images/4685968-d9a30030b308a26a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![从字符串的第 4 个字符位置开始取，只取 2 个字符](https://upload-images.jianshu.io/upload_images/4685968-31a775468f264c1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![从字符串的第 4 个字符位置（倒数）开始取，直到结束](https://upload-images.jianshu.io/upload_images/4685968-48f70eda976a85b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![ 从字符串的第 4 个字符位置（倒数）开始取，只取 2 个字符](https://upload-images.jianshu.io/upload_images/4685968-cea26cade3b931cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#order by排序
设定你想按哪个字段哪种方式来进行排序，再返回搜索结果。
`SELECT field1, field2,...fieldN table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]`
- 可用任何字段作为排序条件
- 可设定任意个字段来排序
- 可用 `asc` 或 `desc` 设置查询结果按升/降序
默认升序排列
- 可添加 `where ... like` 设置条件
#ength和char_length
 - length
获取字符串长度的内置函数方法，utf8编码下一个汉字是算三个字符,一个数字或字母算一个字符
其他编码下,一个汉字算两个字符, 一个数字或字母算一个字符。
- char_length
在任何编码下，不管汉字还是数字或者是字母都算是一个字符
# replace函数
根据主键确定被替换的是哪一条记录
- replace(object,search,replace) 
把object中出现search的全部替换为replace ,返回替换后的字符串
`select replace('www.jb51.net','w','Ww')--->WwWwWw.jb51.net `
把表table中的name字段中的aa替换为bb 
`update table set name=replace(name,'aa','bb') `
- replace into 
`replace into table (id,name) values('1','aa'),('2','bb') `
向表中插入两条记录。如果主键id为1或2不存在 
就相当于 
`insert into table (id,name) values('1','aa'),('2','bb')` 
如果存在相同的值则不会插入数据 
# 1 键
##**主 键：**
数据库表中对储存数据对象予以唯一和完整标识的数据列或属性的组合。**一个数据列只能有一个主键**，且主键的取值不能缺失，即不能为空值（Null）。
###  联合主键
顾名思义就是多个主键联合形成一个主键组合(主键原则上是唯一的，别被唯一值所困扰。)  

联合主键的意义：用2个字段(或者多个字段)来确定一条记录
这2个字段都不是唯一的，2个字段可以分别重复
- 这么设置的好处
可以很直观的看到某个重复字段的记录条数

主键A跟主键B组成联合主键 
主键A跟主键B的数据可以完全相同，联合就在于主键A跟主键B形成的联合主键是唯一的
### 复合主键
表的主键含有一个以上的字段组成,不使用无业务含义的自增id作为主键 
将多个字段设置为主键，形成复合主键，这多个字段联合标识唯一性，其中，某几个主键字段值出现重复是没有问题的，只要不是有多条记录的所有主键值完全一样，就不算重复
##**超键：**
在关系中能唯一标识元组的属性集称为关系模式的超键。一个属性可以为作为一个超键，多个属性组合在一起也可以作为一个超键。**超键包含候选键和主键。**

##**候选键：**
是**最小超键**，即没有冗余元素的超键。

##**外键：**
在一个表中存在的**另一个表的主键**称此表的外键
# 2 CREATE DATABASE和CREATE SCHEMA
在MySQL中，官方的中文文档在 CREATE DATABASE 语法一节中写了一句：也可以使用CREATE SCHEMA。那么CREATE SCHEMA和CREATE DATABASE在MySQL难道是一样的吗？

MySQL 5.0官方的英文文档中有这么一句：


 这个说法译成中文应该是：[CREATE　DATABASE](http://blog.useasp.net/tags/CREATE%20DATABASE)根据给定的名称创建数据库，要用这个语法，你需要有数据库的CREATE权限，CREATE SCHEMA从MySQL5.0.2起，可作为CREATE DATABASE的一个代名词。

　　按照这个说法，CREATE SCHEMA是和CREATE DATABASE是一样的，为了验证这个说法，参阅了后继的官方文档，在MySQL5.5的英文文档中，官方如是说：



 中文：CREATE DATABASE根据给定的名称创建数据库，你需要拥有数据库的CREATE权限来使用这个语句。CREATE SCHEMA是CREATE DATABASE的一个代名词。

　　由此可见，在MySQL的语法操作中（MySQL5.0.2之后），可以使用CREATE DATABASE和CREATE SCHEMA来创建数据库，两者在功能上是一致的。在使用MySQL官方的MySQL管理工具MySQL Workbench 5.2.47创建数据库时，使用的是CREATE SCHEMA来创建数据库的。而这和MS SQL中的SCHEMA有很大差别。

# 3 视图
视图是虚拟的表，与包含数据的表不一样，视图只包含使用时动态检索数据的查询；不包含任何列或数据。
使用视图可以简化复杂的sql操作，隐藏具体的细节，保护数据；视图创建后，可以使用与表相同的方式利用它们。
视图不能被索引，也不能有关联的触发器或默认值，如果视图本身内有order by 则对视图再次order by将被覆盖。
创建视图：create view XXX as XXXXXXXXXXXXXX;
对于某些视图比如未使用联结子查询分组聚集函数Distinct Union等，是可以对其更新的，对视图的更新将对基表进行更新；但是视图主要用于简化检索，保护数据，并不用于更新，而且大部分视图都不可以更新。
# 4 删除
 - drop直接删掉表 
 - truncate删除表中数据，再插入时自增长id又从1开始 
 - delete删除表中数据，可以加where字句

（1） 

 - DELETE
每次从表中删除一行，并同时将该行的删除操作作为事务记录在日志中保存,以便回滚
 - TRUNCATE TABLE 
一次性地从表中删除所有的数据,并不把单独的删除操作记录记入日志保存，删除行是不能恢复的,在删除的过程中不会激活与表有关的删除触发器。执行速度快。

（2） ##表和索引所占空间。

- 表被TRUNCATE 后，这个表和索引所占用的空间会恢复到初始大小
- 而DELETE操作不会减少表或索引所占用的空间
- drop语句将表所占用的空间全释放掉

（3） 一般而言，drop > truncate > delete

（4） 应用范围

- TRUNCATE 只能对TABLE
- DELETE可以是table和view

（5） 

- TRUNCATE 和DELETE只删除数据
- 而DROP则删除整个表（结构和数据）

（6） 

- truncate与不带where的delete :只删除数据,而不删除表的结构（定义）
- drop语句将删除表的结构被依赖的约束（constrain),触发器（trigger)索引（index);依赖于该表的存储过程/函数将被保留，但其状态会变为：invalid。

（7） 

- delete语句为DML（data maintain Language),这个操作会被放到 rollback segment中,事务提交后才生效。如果有相应的 tigger,执行的时候将被触发
- truncate、drop是DLL（data define language),操作立即生效，原数据不放到 rollback segment中，不能回滚

（8） 

- 在没有备份情况下,谨慎使用 drop 与 truncate
- 要删除部分数据行采用delete且注意结合where来约束影响范围。回滚段要足够大。
- 要删除表用drop;
- 若想保留表而将表中数据删除
 - 如果与事务无关，用truncate即可实现。
 - 如果和事务有关，或老是想触发trigger,还是用delete

（9） Truncate table 表名 速度快,而且效率高,因为:
truncate table 在功能上与不带 WHERE 子句的 DELETE 语句相同：二者均删除表中的全部行。但 TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少。DELETE 语句每次删除一行，并在事务日志中为所删除的每行记录一项。TRUNCATE TABLE 通过释放存储表数据所用的数据页来删除数据，并且只在事务日志中记录页的释放。

（10） 

- TRUNCATE TABLE 删除表中的所有行，但表结构及其列、约束、索引等保持不变。新行标识所用的计数值重置为该列的种子。
- 如果想保留标识计数值，请改用 DELETE。
- 如果要删除表定义及其数据，请使用 DROP TABLE 语句。

（11） 对于由 FOREIGN KEY 约束引用的表，不能使用 TRUNCATE TABLE，而应使用不带 WHERE 子句的 DELETE 语句。由于 TRUNCATE TABLE 不记录在日志中，所以它不能激活触发器
# 连接
在真正的应用中经常需要从多个数据表中读取数据。
如何使用 MySQL 的 JOIN 在两个或多个表中查询数据呢
可以在 SELECT, UPDATE 和 DELETE 语句中使用 MySQL 的 JOIN 来联合多表查询。

JOIN 按照功能大致分为如下三类：

*   **INNER JOIN（内连接,或等值连接）**：获取两个表中字段匹配关系的记录。
*   **LEFT JOIN（左连接）：**获取左表所有记录，即使右表没有对应匹配的记录。
*   **RIGHT JOIN（右连接）：** 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
* * *
## 在命令提示符中使用 INNER JOIN
我们在RUNOOB数据库中有两张表 tcount_tbl 和 runoob_tbl。两张数据表数据如下：
### 实例
![tcount_tbl表](http://upload-images.jianshu.io/upload_images/4685968-c05a3974951d07b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![runoob_tbl表](http://upload-images.jianshu.io/upload_images/4685968-26e66bd42b9148e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用**INNER JOIN(也可以省略 INNER)**来连接以上两张表来读取runoob_tbl表中所有runoob_author字段在tcount_tbl表对应的runoob_count字段值：

## INNER JOIN
![](http://upload-images.jianshu.io/upload_images/4685968-3cada193b2708ad9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


以上 SQL 语句等价于：
![](http://upload-images.jianshu.io/upload_images/4685968-44966dc3c95f9ee7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## WHERE 子句
![](http://upload-images.jianshu.io/upload_images/4685968-d764dd72207e0837.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image](http://upload-images.jianshu.io/upload_images/4685968-7e7f5a4f93695063.gif?imageMogr2/auto-orient/strip)
* * *
## LEFT JOIN
left join 与 join 有所不同。 LEFT JOIN 会读取左边数据表的全部数据，即便右边表无对应数据。
### 实例
尝试以下实例，以 **runoob_tbl** 为左表，**tcount_tbl** 为右表，理解 MySQL LEFT JOIN 的应用：

## LEFT JOIN
![](http://upload-images.jianshu.io/upload_images/4685968-b1155b6368a35551.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
以上实例中使用了 LEFT JOIN，该语句会读取左边的数据表 runoob_tbl 的所有选取的字段数据，即便在右侧表 tcount_tbl中 没有对应的 runoob_author 字段值。
![](http://upload-images.jianshu.io/upload_images/4685968-3e73cb9cb6807574.gif?imageMogr2/auto-orient/strip)
* * *
## MySQL RIGHT JOIN
MySQL RIGHT JOIN 会读取右边数据表的全部数据，即便左边边表无对应数据。
### 实例
尝试以下实例，以 **runoob_tbl** 为左表，**tcount_tbl** 为右表，理解MySQL RIGHT JOIN的应用：

## RIGHT JOIN

mysql> SELECT  a.runoob_id, a.runoob_author, b.runoob_count  FROM  runoob_tbl  a  RIGHT  JOIN  tcount_tbl  b  ON  a.runoob_author = b.runoob_author; +-------------+-----------------+----------------+ | a.runoob_id | a.runoob_author | b.runoob_count | +-------------+-----------------+----------------+ | 1 | 菜鸟教程 | 10 | | 2 | 菜鸟教程 | 10 | | 3 | RUNOOB.COM | 20 | | 4 | RUNOOB.COM | 20 | | NULL | NULL | 22 | +-------------+-----------------+----------------+ 5  rows  in  set  (0.01  sec)

以上实例中使用了 RIGHT JOIN，该语句会读取右边的数据表 tcount_tbl 的所有选取的字段数据，即便在左侧表 runoob_tbl 中没有对应的runoob_author 字段值。

![image](http://upload-images.jianshu.io/upload_images/4685968-2d990cabe05dd5e7.gif?imageMogr2/auto-orient/strip)


