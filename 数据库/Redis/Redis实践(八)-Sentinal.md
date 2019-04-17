# 1
![目录](https://upload-images.jianshu.io/upload_images/4685968-05b82cafebdaae3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2 主从复制高可用?
![](https://upload-images.jianshu.io/upload_images/4685968-7a641574ce6f2f61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![故障出现主节点挂掉](https://upload-images.jianshu.io/upload_images/4685968-a04dbe1017cd96e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![主从复制-mster宕掉故障处理](https://upload-images.jianshu.io/upload_images/4685968-0561b0fe8f877b64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 3  Redis Sentinel 架构
![](https://upload-images.jianshu.io/upload_images/4685968-306c1e7c4eeed31b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0cd2a496cdd99352.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![可监控多套](https://upload-images.jianshu.io/upload_images/4685968-f6d61d450da430ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 4 安装与配置
![安装与配置](https://upload-images.jianshu.io/upload_images/4685968-30cba67a1b8d5c30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-679080c6d277fded.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Redis 主节点](https://upload-images.jianshu.io/upload_images/4685968-cc2e84ad0489ff40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Redis 从节点](https://upload-images.jianshu.io/upload_images/4685968-cb4024c528ac91b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Sentinel 主要配置](https://upload-images.jianshu.io/upload_images/4685968-67d1ff48c0d1116f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 5 安装与演示
![](https://upload-images.jianshu.io/upload_images/4685968-6c474596767eb330.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![主节点配置](https://upload-images.jianshu.io/upload_images/4685968-3bb0bb58a8b8552d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![快速生成从节点配置文件](https://upload-images.jianshu.io/upload_images/4685968-e2cb1c981b223ad4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![重定向](https://upload-images.jianshu.io/upload_images/4685968-f245c1dbe952cf23.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![打印检查配置文件](https://upload-images.jianshu.io/upload_images/4685968-ffa5966fd4bacfd9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![启动](https://upload-images.jianshu.io/upload_images/4685968-0da7504105611cb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 6 客户端
![客户端](https://upload-images.jianshu.io/upload_images/4685968-72fcffa91846101a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![直连?](https://upload-images.jianshu.io/upload_images/4685968-dfab1f76a34c1408.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![客户端实现基本原理-1](https://upload-images.jianshu.io/upload_images/4685968-56a3787002418c40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![客户端实现基本原理-2](https://upload-images.jianshu.io/upload_images/4685968-9a7b2e13f35c1c1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![客户端实现基本原理-3 验证](https://upload-images.jianshu.io/upload_images/4685968-c9349701a2409121.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![客户端实现基本原理-4 通知(发布订阅))](https://upload-images.jianshu.io/upload_images/4685968-0810ddda40bc175e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-5f960a003f8013b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![客户端接入流程](https://upload-images.jianshu.io/upload_images/4685968-0e917792d9448f91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![Jedis](https://upload-images.jianshu.io/upload_images/4685968-af0c7e10a81236a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 11 三个定时任务
![三个定时任务](https://upload-images.jianshu.io/upload_images/4685968-ceef848c86fa60c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![每 10s info](https://upload-images.jianshu.io/upload_images/4685968-52d8c597d3388cfb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![第2个监控任务,每 2s 发布订阅](https://upload-images.jianshu.io/upload_images/4685968-07da0066a14c7321.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![第3个监控任务,每 1s PING](https://upload-images.jianshu.io/upload_images/4685968-31ac7fb5a75dfbcb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 12 主观下线和客观下线
![主观下线和客观下线](https://upload-images.jianshu.io/upload_images/4685968-2c99a25f9b733d81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 13 领导者选举
![领导者选举](https://upload-images.jianshu.io/upload_images/4685968-81f1730acc8450e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![选举实例](https://upload-images.jianshu.io/upload_images/4685968-b250ba6d57c35be6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 14 故障转移
![领导者节点完成](https://upload-images.jianshu.io/upload_images/4685968-fed799d9f4f7ef2b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![选择合适的slave节点](https://upload-images.jianshu.io/upload_images/4685968-b9a0c4a3f46bb978.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 15 常见开发运维问题-目录
![](https://upload-images.jianshu.io/upload_images/4685968-0db1b616051726c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 16 节点运维
![](https://upload-images.jianshu.io/upload_images/4685968-1b3c8d1446ff02cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![主节点](https://upload-images.jianshu.io/upload_images/4685968-f777adc65f8c89d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![节点下线](https://upload-images.jianshu.io/upload_images/4685968-9fbb841ea1620ede.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![节点上线](https://upload-images.jianshu.io/upload_images/4685968-e7906ab64ff26b60.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 17 高可用的读写分离
看一下`JedisSentinelPool`的实现
![](https://upload-images.jianshu.io/upload_images/4685968-b19873f0f2a44fc1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-6a170ac4761d7e8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-02ae32cdf67b7f4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-a2a7b679d8f0a85c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
private HostAndPort initSentinels(Set<String> sentinels, final String masterName) {

    HostAndPort master = null;
    boolean sentinelAvailable = false;

    log.info("Trying to find master from available Sentinels...");
    // 遍历所有 Sentinel 节点
    for (String sentinel : sentinels) {
      final HostAndPort hap = toHostAndPort(Arrays.asList(sentinel.split(":")));

      log.fine("Connecting to Sentinel " + hap);

      Jedis jedis = null;
      try {
        // 找到一个可运行的,并用jedis连接上去
        jedis = new Jedis(hap.getHost(), hap.getPort());

        // 通过 mastername 区分 sentinel 节点,得到其地址
        List<String> masterAddr = jedis.sentinelGetMasterAddrByName(masterName);

        // connected to sentinel...
        sentinelAvailable = true;
        //节点不可用继续遍历
        if (masterAddr == null || masterAddr.size() != 2) {
          log.warning("Can not get master addr, master name: " + masterName + ". Sentinel: " + hap
              + ".");
          continue;
        }

        master = toHostAndPort(masterAddr);
        log.fine("Found Redis master at " + master);
        // 找到可用节点,结束遍历,跳出循环
        break;
      } catch (JedisException e) {
        // resolves #1036, it should handle JedisException there's another chance
        // of raising JedisDataException
        log.warning("Cannot get master address from sentinel running @ " + hap + ". Reason: " + e
            + ". Trying next one.");
      } finally {
        if (jedis != null) {
          jedis.close();
        }
      }
    }
    //无可用节点,抛异常
    if (master == null) {
      if (sentinelAvailable) {
        // can connect to sentinel, but master name seems to not
        // monitored
        throw new JedisException("Can connect to sentinel, but " + masterName
            + " seems to be not monitored...");
      } else {
        throw new JedisConnectionException("All sentinels down, cannot determine where is "
            + masterName + " master is running...");
      }
    }

    log.info("Redis master running at " + master + ", starting Sentinel listeners...");
    //当拿到master节点后,所要做的就是订阅那个消息,客户端只需订阅该频道即可
    for (String sentinel : sentinels) {
      final HostAndPort hap = toHostAndPort(Arrays.asList(sentinel.split(":")));
      MasterListener masterListener = new MasterListener(masterName, hap.getHost(), hap.getPort());
      // whether MasterListener threads are alive or not, process can be stopped
      masterListener.setDaemon(true);
      masterListeners.add(masterListener);
      masterListener.start();
    }
```
以下为监听线程类
```
protected class MasterListener extends Thread {

    protected String masterName;
    protected String host;
    protected int port;
    protected long subscribeRetryWaitTimeMillis = 5000;
    protected volatile Jedis j;
    protected AtomicBoolean running = new AtomicBoolean(false);

    protected MasterListener() {
    }

    public MasterListener(String masterName, String host, int port) {
      super(String.format("MasterListener-%s-[%s:%d]", masterName, host, port));
      this.masterName = masterName;
      this.host = host;
      this.port = port;
    }

    public MasterListener(String masterName, String host, int port,
        long subscribeRetryWaitTimeMillis) {
      this(masterName, host, port);
      this.subscribeRetryWaitTimeMillis = subscribeRetryWaitTimeMillis;
    }

    @Override
    public void run() {

      running.set(true);

      while (running.get()) {

        j = new Jedis(host, port);

        try {
          // double check that it is not being shutdown
          if (!running.get()) {
            break;
          }

          j.subscribe(new JedisPubSub() {
            @Override
            public void onMessage(String channel, String message) {
              log.fine("Sentinel " + host + ":" + port + " published: " + message + ".");

              String[] switchMasterMsg = message.split(" ");

              if (switchMasterMsg.length > 3) {

                if (masterName.equals(switchMasterMsg[0])) {
                  initPool(toHostAndPort(Arrays.asList(switchMasterMsg[3], switchMasterMsg[4])));
                } else {
                  log.fine("Ignoring message on +switch-master for master name "
                      + switchMasterMsg[0] + ", our master name is " + masterName);
                }

              } else {
                log.severe("Invalid message received on Sentinel " + host + ":" + port
                    + " on channel +switch-master: " + message);
              }
            }
          }, "+switch-master");

        } catch (JedisConnectionException e) {

          if (running.get()) {
            log.log(Level.SEVERE, "Lost connection to Sentinel at " + host + ":" + port
                + ". Sleeping 5000ms and retrying.", e);
            try {
              Thread.sleep(subscribeRetryWaitTimeMillis);
            } catch (InterruptedException e1) {
              log.log(Level.SEVERE, "Sleep interrupted: ", e1);
            }
          } else {
            log.fine("Unsubscribing from Sentinel at " + host + ":" + port);
          }
        } finally {
          j.close();
        }
      }
    }

    public void shutdown() {
      try {
        log.fine("Shutting down listener on " + host + ":" + port);
        running.set(false);
        // This isn't good, the Jedis object is not thread safe
        if (j != null) {
          j.disconnect();
        }
      } catch (Exception e) {
        log.log(Level.SEVERE, "Caught exception while shutting down: ", e);
      }
    }
  }
```
![感知到主从切换时,接收消息并重新初始化连接池](https://upload-images.jianshu.io/upload_images/4685968-98c3f46eb28f4406.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-b981be9b41f08a89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![从节点的作用](https://upload-images.jianshu.io/upload_images/4685968-f78f3e235b94bbf3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于Redis Sentinel只会对主节点进行故障转移,对从节点采取主观的下线,所以需要自定义一个客户端来监控对应的事件
![三个消息](https://upload-images.jianshu.io/upload_images/4685968-20b7bcc64af21ae1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![高可用读写分离](https://upload-images.jianshu.io/upload_images/4685968-9b7794ca52e412e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 18 总结
![](https://upload-images.jianshu.io/upload_images/4685968-60883ba8eeacbbc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-28d299b6356fd144.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-c11a03ead788b0d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
