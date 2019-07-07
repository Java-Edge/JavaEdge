![大纲](https://upload-images.jianshu.io/upload_images/4685968-880b3c0ebb1788f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Redis 对外提供数据访问服务时，使用的是常驻内存的数据。为了在Redis Server重启之后数据还可以得到恢复，Redis具备将数据持久化到硬盘中的能力。


# 1 持久化的作用
![目录](https://upload-images.jianshu.io/upload_images/4685968-8e8ab486151a7871.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-3bf175f513d864b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![持久化方式](https://upload-images.jianshu.io/upload_images/4685968-dab80439ea57c3b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2 RDB
Redis Server在有多db 中存储的key-value可以理解为Redis的一个状态
当发生`写操作`时，Redis就会从一个状态切换到另外一个状态
基于全量的持久化就是在某个时刻，将Redis的所有数据持久化到硬盘中，形成一个快照。当Redis 重启时，通过加载最近一个快照数据，可以将Redis 恢复至最近一次持久化状态上。
![ 全量模式持久化](http://upload-images.jianshu.io/upload_images/4685968-b2a042d37b15f8d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-93ee280a312cfa28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2.1 全量写入流程
包含2种方式：save 和 bgsave
![](https://upload-images.jianshu.io/upload_images/4685968-8912f41e87ca8672.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
save 可以由客户端显示触发，也可以在redis shutdown 时触发
save本身是`单线程串行化`的方式执行的，因此当数据量大时，有肯能会发生Redis Server的长时间卡顿。但是其备份期间不会有其他命令执行，因此备份时期 ` 数据的状态始终是一致性 `的
![](https://upload-images.jianshu.io/upload_images/4685968-64a1d8f68c723113.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![save-1 ](https://upload-images.jianshu.io/upload_images/4685968-0649dd6afd53d22f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![save-2](https://upload-images.jianshu.io/upload_images/4685968-5986313dae5b37b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
bgsave 也可以由
- 客户端显示触发
- 通过配置定时任务触发
- 在master-slave的分布式结构下由slave节点触发

bgsave命令在执行的时候，会`fork`一个子进程。子进程提交完成之后，会立即给客户端返回响应，备份操作在后台异步执行，在此期间不会影响Redis的正常响应

对于bgsave来说，当父进程Fork完子进程之后，异步任务会将`当前的内存状态作为一个版本进行复制`
在复制过程中产生的变更，不会反映在这次备份当中

在Redis的默认配置当中，当满足下面任一条件时，会自动触发bgsave 的执行
|  配置  |  seconds  |  changes  |
| --- | --- | --- |
|  save  |  900  |  1 |
|  save  |  300  |  10  |
|  save  |  60  |  10000  |

​​​​​​bgsave相对于save来说，其优势是`异步执行`，不影响后续的命令执行。但是Fork子进程时，涉及父进程的内存复制，此时会增加服务器的内存开销。`当内存开销高到使用虚拟内存时，bgsave的Fork子进程会阻塞运行`，可能会造成秒级的不可用。因此使用bgsave需要保证服务器空闲内存足够。
![bgsave-1](https://upload-images.jianshu.io/upload_images/4685968-f20704e89de71d24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![bgsave-2](https://upload-images.jianshu.io/upload_images/4685968-f1c4ab42e57155a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![图示](http://upload-images.jianshu.io/upload_images/4685968-bf0e0937538ccdbd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
|  命令  |  save  |  bgsave  |
| --- | --- | --- |
|  IO类型  |  同步  |  异步  |
|  是否阻塞  |  阻塞  |  非阻塞（在fork是阻塞）  |
|  复杂度  |  O(n)  |  O(n)  |
|  优点  |  不会消耗额外内存  |  不阻塞客户端命令  |
|  缺点  |  阻塞客户端命令  |  需要Fork子进程，内存开销大  |

![不用命令,而使用配置](https://upload-images.jianshu.io/upload_images/4685968-231f292d7e6d658f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8cb12019c9cf832d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![右边为最佳配置](https://upload-images.jianshu.io/upload_images/4685968-1f07f54b0aab6278.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ea172ae1f0d6add3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-614a3eeab165e3aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0e759c4faccf3bf4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
导入大量数据
![](https://upload-images.jianshu.io/upload_images/4685968-aad7d6ac95e66405.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![执行save,查看生成的 RDB 文件](https://upload-images.jianshu.io/upload_images/4685968-f11c46806fa41929.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
save 命令是阻塞式执行的!!!!!, save时无法进行其他命令操作!!!
接着验证 bgsave
![](https://upload-images.jianshu.io/upload_images/4685968-3af3d9f25b956333.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
非阻塞式命令!!!
![使用子进程执行,结束时进程灭亡](https://upload-images.jianshu.io/upload_images/4685968-75adf958ed217f89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![生产临时文件并替换更新 RDB 文件](https://upload-images.jianshu.io/upload_images/4685968-ae45f55b9d7c28de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![总结](https://upload-images.jianshu.io/upload_images/4685968-56f64f179349e803.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2.2 恢复流程
当Redis重新启动时，会从本地磁盘加载之前持久化的文件。当恢复完成之后，再受理后续的请求操作。
# 3 增量模式的持久化（AOF）
![RDB 的缺点-1](https://upload-images.jianshu.io/upload_images/4685968-db9f253c1dbd7972.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![RDB 的缺点-2](https://upload-images.jianshu.io/upload_images/4685968-3d8483fcb243c977.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-1b21d24f96187c4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
RDB记录的是每个状态的全量数据，而AOF（append-only-file）记录的则是每条写命令的记录，通过所有写命令的执行，最后恢复出最终的数据状态。其文件的生成如下所示：
![](https://upload-images.jianshu.io/upload_images/4685968-9f4077f4a022944b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![创建](https://upload-images.jianshu.io/upload_images/4685968-6d6d2c485151315f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![恢复](https://upload-images.jianshu.io/upload_images/4685968-7eecd9cf7e5fff17.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3.1 写入流程
![](https://upload-images.jianshu.io/upload_images/4685968-c007390c9cb54329.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- always：每一次刷新缓冲区，都会同步触发同步操作。因为每次的写操作都会触发同步，所以该策略会降低Redis的吞吐量，但是这种模式会拥有最高的容错能力。
![always](https://upload-images.jianshu.io/upload_images/4685968-7c5c3a5667d54393.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- every second：每秒异步的触发同步操作，这种是Redis的默认配置。
![every second](https://upload-images.jianshu.io/upload_images/4685968-58607327abddc5d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- no：由操作系统决定何时同步，这种方式Redis无法决定何时落地，因此不可控。
![no](https://upload-images.jianshu.io/upload_images/4685968-a4d89ca8742ff714.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-5a1d17d95c7f7ade.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

|  命令  |  always  |  everysec  |  no  |
| --- | --- | --- | --- |
|  优点  |  不丢失数据  |  每秒1次fsync，丢1秒数据  |  无需设置  |
|  缺点  |  IO开销大，一般的STAT盘只有几百TPS  |  丢1秒数据 |  不可控  |

## 3.2 回放流程
AOF的回放时机也是在`机器启动时`，`一旦存在AOF，Redis会选择增量回放`
因为增量的持久化持续的写入磁盘，相比全量持久化，数据更加完整。回放的过程就是将AOF中存放的命令，重新执行一遍。完成之后再继续接受客户端的新命令。
### AOF模式的优化重写
随着Redis 持续的运行，会有大量的增量数据append 到AOF 文件中。为了减小硬盘存储和加快恢复速度，Redis 通过rewrite 机制合并历史AOF 记录。如下所示：
![](https://upload-images.jianshu.io/upload_images/4685968-4a87446cad26bb2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-6a4dd0b269cc950e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-82daa76dee02aac3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c8936ea9d3235510.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-5f8beab511cef6b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-37a476812f30e3e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b26aa52b86b210a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-53b688673dab37cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-356789cb067ad95a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8160b987ac03fc01.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-6cb8a42b3b4a0b14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-3769bb8acff2f54b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f754ac81433f585e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
整个流程描述如下：

历史AOF：以快照的方式保存。

快照写入期间的增量：待快照写入完成之后append 到快照文件中。

后续的增量：写入新的AOF。
# 3 最终抉择及最佳实践
![](https://upload-images.jianshu.io/upload_images/4685968-eaecfd3035d5ebde.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a494c9c5c917686f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-3b9c17df8e752cc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-bdccaa3509b74063.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d90affde84726664.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
