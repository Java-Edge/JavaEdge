就像很多标准的架构模式都被各种专用框架所支持一样，常见的数据处理模式往往也是目标实现的很好的候选对象，它可以节省开发人员大量的时间和精力。
当然这也适应于本文的主题:编码和解码，或者数据从一种特定协议的格式到另一种格式的转 换。这些任务将由通常称为`编解码器`的组件来处理
Netty 提供了多种组件，简化了为了支持广泛 的协议而创建自定义的编解码器的过程
例如，如果你正在构建一个基于 Netty 的邮件服务器，那 么你将会发现 Netty 对于编解码器的支持对于实现 POP3、IMAP 和 SMTP 协议来说是多么的宝贵
# 0 什么是编解码器
每个网络应用程序都必须定义
- 如何解析在两个节点之间来回传输的原始字节
- 如何将其和目标应用程序的数据格式做相互转换

这种转换逻辑由编解码器处理，编解码器由编码器和解码器组成，它们每种都可以将字节流从一种格式转换为另一种格式

那么它们的区别是什么呢?
如果将消息看作是对于特定的应用程序具有具体含义的结构化的字节序列— 它的数据。那 么编码器是将消息转换为适合于传输的格式(最有可能的就是字节流);而对应的解码器则是将 网络字节流转换回应用程序的消息格式。因此，编码器操作出站数据，而解码器处理入站数据。
记住这些背景信息，接下来让我们研究一下 Netty 所提供的用于实现这两种组件的类。
# 1 Netty解码概述
![](https://upload-images.jianshu.io/upload_images/4685968-c8629f5cd19e290c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 1.1 两个问题
![](https://upload-images.jianshu.io/upload_images/4685968-59603df43bb3134b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在这一节中，我们将研究 Netty 所提供的解码器类,这些类覆盖了两个不同的用例
- 将字节解码为消息——ByteToMessageDecoder 和 ReplayingDecoder
- 将一种消息类型解码为另一种——MessageToMessageDecoder

因为解码器是负责`将入站数据从一种格式转换到另一种格式`，所以知道 Netty 的解码器实
现了 `ChannelInboundHandler` 也不会让你感到意外
 什么时候会用到解码器呢?很简单:每当需要为 `ChannelPipeline` 中的下一个 `Channel-
InboundHandler` 转换入站数据时会用到
此外，得益于` ChannelPipeline` 的设计，可以将多个解码器连接在一起，以实现任意复杂的转换逻辑，这也是 Netty 是如何支持代码的模块化以及复用的一个很好的例子
![](https://upload-images.jianshu.io/upload_images/4685968-caee77009e0984f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d0b3bcbdddb4181e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-eca80e6a1e9a48f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 2 抽象解码器ByteToMessageDecoder
## 2.1 示例
将字节解码为消息(或者另一个字节序列)是一项如此常见的任务，以至于 Netty 特地为它提供了一个抽象的基类:ByteToMessageDecoder
由于`你不可能知道远程节点是否会一次性地发送一个完整的消息`，所以这个类会`对入站数据进行缓冲`，直到它准备好处理
![ByteToMessageDecoderAPI](https://upload-images.jianshu.io/upload_images/4685968-be69f871109e3cef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
假设你接收了一个包含简单 int 的字节流，每个 int 都需要被单独处理
在这种情况下，你需要从入站` ByteBuf `中读取每个 int，并将它传递给` ChannelPipeline` 中的下一个 `ChannelInboundHandler`
为了解码这个字节流，你要扩展 `ByteToMessageDecoder `类(原子类型的 int 在被添加到 List 中时，会被自动装箱为 Integer)
![ToIntegerDecoder](https://upload-images.jianshu.io/upload_images/4685968-10e13ad70d360168.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
每次从入站 ByteBuf 中读取 4 字节，将其解码为一个 int，然后将它添加到一个 List 中
 当没有更多的元素可以被添加到该 List 中时，它的内容将会被发送给下一个 Channel- InboundHandler
![ToIntegerDecoder类扩展了ByteToMessageDecoder](https://upload-images.jianshu.io/upload_images/4685968-c11db53f5a77c865.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
虽然` ByteToMessageDecoder `可以很简单地实现这种模式，但是你可能会发现，在调用 `readInt()`前不得不验证所输入的 ByteBuf 是否具有足够的数据有点繁琐
在下一节中， 我们将讨论 ReplayingDecoder，它是一个特殊的解码器，以少量的开销消除了这个步骤
## 2.2 源码解析
![](https://upload-images.jianshu.io/upload_images/4685968-c7f7b417328c3210.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![解码步骤](https://upload-images.jianshu.io/upload_images/4685968-5e1a05a6a0207f47.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 2.2.1 累加字节流
```
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        //基于 ByteBuf 进行解码的,如果不是直接将当前对象向下传播
        if (msg instanceof ByteBuf) {
            CodecOutputList out = CodecOutputList.newInstance();
            try {
                ByteBuf data = (ByteBuf) msg;
                //若当前累加器为空,说明是第一次从 IO 流中读取数据
                first = cumulation == null;
                if (first) {
                    //第一次会将累加器赋值为刚读进来的 ByteBuf 对象数据
                    cumulation = data;
                } else {
                    //非第一次,则将当前累加器中的数据和读取进来的数据进行累加
                    cumulation = cumulator.cumulate(ctx.alloc(), cumulation, data);
                }
                //调用子类的解码方法去解析
                callDecode(ctx, cumulation, out);
            } catch (DecoderException e) {
                throw e;
            } catch (Throwable t) {
                throw new DecoderException(t);
            } finally {
                if (cumulation != null && !cumulation.isReadable()) {
                    numReads = 0;
                    cumulation.release();
                    cumulation = null;
                } else if (++ numReads >= discardAfterReads) {
                    // We did enough reads already try to discard some bytes so we not risk to see a OOME.
                    // See https://github.com/netty/netty/issues/4275
                    numReads = 0;
                    discardSomeReadBytes();
                }

                int size = out.size();
                decodeWasNull = !out.insertSinceRecycled();
                fireChannelRead(ctx, out, size);
                out.recycle();
            }
        } else {
            ctx.fireChannelRead(msg);
        }
    }
```
其中的` cumulator` 为
![](https://upload-images.jianshu.io/upload_images/4685968-b0527e1200c5fd3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
看一下这个`MERGE_CUMULATOR`
```
    public static final Cumulator MERGE_CUMULATOR = new Cumulator() {
        @Override
        public ByteBuf cumulate(ByteBufAllocator alloc, ByteBuf cumulation, ByteBuf in) {
            ByteBuf buffer;
            //当前的写指针后移一定字节,若超过最大容量,则进行扩容
            if (cumulation.writerIndex() > cumulation.maxCapacity() - in.readableBytes()
                    || cumulation.refCnt() > 1) {
                // Expand cumulation (by replace it) when either there is not more room in the buffer
                // or if the refCnt is greater then 1 which may happen when the user use slice().retain() or
                // duplicate().retain().
                //
                // See:
                // - https://github.com/netty/netty/issues/2327
                // - https://github.com/netty/netty/issues/1764
                buffer = expandCumulation(alloc, cumulation, in.readableBytes());
            } else {
                buffer = cumulation;
            }
            //将当前数据写到累加器中
            buffer.writeBytes(in);
            //将读进的数据对象释放
            in.release();
            return buffer;
        }
    };
```
 ### 2.2.2 调用子类的 decode方法进行解析
![进入该方法查看源码](https://upload-images.jianshu.io/upload_images/4685968-cba067a914d072c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
    protected void callDecode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) {
        try {
            // 只要累加器有数据,循环就会继续执行下去
            while (in.isReadable()) {
                int outSize = out.size();
                // 判断当前list 里是否已经有对象(首次执行时,肯定是不会运行此段代码的)
                if (outSize > 0) {
                    // 有,则通过事件传播机制向下传播
                    fireChannelRead(ctx, out, outSize);
                    out.clear();

                    // Check if this handler was removed before continuing with decoding.
                    // If it was removed, it is not safe to continue to operate on the buffer.
                    //
                    // See:
                    // - https://github.com/netty/netty/issues/4635
                    if (ctx.isRemoved()) {
                        break;
                    }
                    outSize = 0;
                }
                // 记录当前可读数据长度
                int oldInputLength = in.readableBytes();
                decode(ctx, in, out);

                // Check if this handler was removed before continuing the loop.
                // If it was removed, it is not safe to continue to operate on the buffer.
                //
                // See https://github.com/netty/netty/issues/1664
                if (ctx.isRemoved()) {
                    break;
                }

                //说明什么对象都没解析出来
                if (outSize == out.size()) {
                    if (oldInputLength == in.readableBytes()) {
                        break;
                    } else {
                        continue;
                    }
                }

                //说明没有从当前累加器中读取数据
                if (oldInputLength == in.readableBytes()) {
                    throw new DecoderException(
                            StringUtil.simpleClassName(getClass()) +
                            ".decode() did not read anything but decoded a message.");
                }

                if (isSingleDecode()) {
                    break;
                }
            }
        } catch (DecoderException e) {
            throw e;
        } catch (Throwable cause) {
            throw new DecoderException(cause);
        }
    }
```
 ### 2.2.2 将解析到的 ByteBuf 向下传播
```
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof ByteBuf) {
            CodecOutputList out = CodecOutputList.newInstance();
            try {
                ByteBuf data = (ByteBuf) msg;
                first = cumulation == null;
                if (first) {
                    cumulation = data;
                } else {
                    cumulation = cumulator.cumulate(ctx.alloc(), cumulation, data);
                }
                callDecode(ctx, cumulation, out);
            } catch (DecoderException e) {
                throw e;
            } catch (Throwable t) {
                throw new DecoderException(t);
            } finally {
                if (cumulation != null && !cumulation.isReadable()) {
                    numReads = 0;
                    cumulation.release();
                    cumulation = null;
                } else if (++ numReads >= discardAfterReads) {
                    // We did enough reads already try to discard some bytes so we not risk to see a OOME.
                    // See https://github.com/netty/netty/issues/4275
                    numReads = 0;
                    discardSomeReadBytes();
                }
                // 记录当前 list 的长度
                int size = out.size();
                // 将解析到的一个对象向下进行传播
                decodeWasNull = !out.insertSinceRecycled();
                fireChannelRead(ctx, out, size);
                out.recycle();
            }
        } else {
            ctx.fireChannelRead(msg);
        }
    }
```
![](https://upload-images.jianshu.io/upload_images/4685968-03a53afaaa8ff8f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-60b8a88e32b017cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 编解码器中的引用计数
对于编码器和解码器来说:一旦消息被编码或者解码，它就会被 `ReferenceCountUtil.release(message)`调用自动释放
如果你需要保留引用以便稍后使用，那么你可以调用 `ReferenceCountUtil.retain(message) `这将会增加该引用计数，从而防止该消息被释放
# 3 基于固定长度解码器分析
```
/**
 * A decoder that splits the received {@link ByteBuf}s by the fixed number
 * of bytes. For example, if you received the following four fragmented packets:
 * <pre>
 * +---+----+------+----+
 * | A | BC | DEFG | HI |
 * +---+----+------+----+
 * </pre>
 * A {@link FixedLengthFrameDecoder}{@code (3)} will decode them into the
 * following three packets with the fixed length:
 * <pre>
 * +-----+-----+-----+
 * | ABC | DEF | GHI |
 * +-----+-----+-----+
 * </pre>
 */
public class FixedLengthFrameDecoder extends ByteToMessageDecoder {

    private final int frameLength;

    /**
     * Creates a new instance.
     *
     * @param frameLength the length of the frame
     */
    public FixedLengthFrameDecoder(int frameLength) {
        if (frameLength <= 0) {
            throw new IllegalArgumentException(
                    "frameLength must be a positive integer: " + frameLength);
        }
        this.frameLength = frameLength;
    }

    @Override
    protected final void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        Object decoded = decode(ctx, in);
        if (decoded != null) {
            out.add(decoded);
        }
    }

    /**
     * Create a frame out of the {@link ByteBuf} and return it.
     *
     * @param   ctx             the {@link ChannelHandlerContext} which this {@link ByteToMessageDecoder} belongs to
     * @param   in              the {@link ByteBuf} from which to read data
     * @return  frame           the {@link ByteBuf} which represent the frame or {@code null} if no frame could
     *                          be created.
     */
    protected Object decode(
            @SuppressWarnings("UnusedParameters") ChannelHandlerContext ctx, ByteBuf in) throws Exception {
        //判断当前累加器里的字节是否小于frameLength
        if (in.readableBytes() < frameLength) {
            return null;
        } else {
            return in.readRetainedSlice(frameLength);
        }
    }
}
```
# 4 行解码器分析
![非丢弃模式处理](https://upload-images.jianshu.io/upload_images/4685968-4ae546f44b32b265.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.1 定位行尾
![](https://upload-images.jianshu.io/upload_images/4685968-9330c7d40b73a2ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-5843506d6bcd6e08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-ba79b670ff2f39d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 4.2 非丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-97115ee1794badef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-d86734fae8ee50e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 4.2.1 找到换行符情况下
![](https://upload-images.jianshu.io/upload_images/4685968-26e054d60cd2789d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 4.2.2 找不到换行符情况下
![](https://upload-images.jianshu.io/upload_images/4685968-9a269851cd27970f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-8b693709c896cc46.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
解析出长度超过最大可解析长度
直接进入丢弃模式,读指针移到写指针位(即丢弃)
并传播异常
## 4.3  丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-fd674afb61d92095.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 找到换行符
![](https://upload-images.jianshu.io/upload_images/4685968-f04a2b5313c86ebb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
记录当前丢弃了多少字节(已丢弃 + 本次将丢弃的)
锁定换行符类型
将读指针直接移到换行符后
丢弃字节置零
重置为非丢弃状态
所有字节丢弃后才触发快速失败机制
### 找不到换行符
![](https://upload-images.jianshu.io/upload_images/4685968-7bd463bf9e67ebad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
直接记录当前丢弃字节(已丢弃 + 当前可读字节数)
将读指针直接移到写指针
# 5 基于分隔符解码器分析
![](https://upload-images.jianshu.io/upload_images/4685968-b4bd8569d6fbb586.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 构造器
传入一系列分隔符,通过解码器将二进制流分成完整数据包
![](https://upload-images.jianshu.io/upload_images/4685968-4b6819b808bd654f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- decode 方法
![](https://upload-images.jianshu.io/upload_images/4685968-cfb9b3b341d2de07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 5.1 分析解码步骤
### 5.1.1 行处理器
- 行处理器决断
![](https://upload-images.jianshu.io/upload_images/4685968-8c7653fc845524a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 定义位置
![](https://upload-images.jianshu.io/upload_images/4685968-661c76d74191b7c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 初始化位置
![](https://upload-images.jianshu.io/upload_images/4685968-05689a117d03eb06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 判断分隔符
![](https://upload-images.jianshu.io/upload_images/4685968-1ea73c2c483938cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 5.1.2  找到最小分隔符
![](https://upload-images.jianshu.io/upload_images/4685968-01d4f3fab412a2fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-0d29d49e256cc07f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
遍历所有分隔符,计算以每一个分隔符分割的数据包的长度
### 5.1.3  解码
####  5.1.3.1 找到分隔符
![](https://upload-images.jianshu.io/upload_images/4685968-44b7bf918413739b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
非空,说明已经找到分隔符
和之前一样,在此先判断当前是否处于丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-4411034bb92dd3a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 非丢弃模式
显然第一次时为 false, 因此非丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-5f154361a7c6f3cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当前数据包大于允许解析最大数据长度时,直接将该段数据包连同最小分隔符跳过(丢弃)
![](https://upload-images.jianshu.io/upload_images/4685968-45f12a6839a0e606.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
没有超过的就是正常合理逻辑的数据包的长度,判断解析出的数据包是否包含分隔符
![](https://upload-images.jianshu.io/upload_images/4685968-984cf95ae4a45132.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-05241e40e8bf175d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-3a629f4f2adaac75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####  5.1.3.2  未找到分隔符
![](https://upload-images.jianshu.io/upload_images/4685968-956342ffb83a49e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-13272c108c848546.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#####  5.1.3.2.1 非丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-61e06940b8f98c3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当前可读字节长大于允许解析最大数据长度时,记录该丢弃字节数
#####  5.1.3.2.2 丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-49bf6368a8f8005d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 6 基于长度域解码器参数分析
![](https://upload-images.jianshu.io/upload_images/4685968-be8018f0fb7f9111.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 重要参数
![](https://upload-images.jianshu.io/upload_images/4685968-c8832b38acc57078.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- maxFrameLength (包的最大长度)
![](https://upload-images.jianshu.io/upload_images/4685968-a4a4285de6fdec2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
防止太大导致内存溢出,超出包的最大长度 Netty 将会做一些特殊处理

- lengthFieldOffset (消息体长度)
![](https://upload-images.jianshu.io/upload_images/4685968-7b1246cc323a9044.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
长度域的偏移量lengthFieldOffset，0表示无偏移
`ByteBuf`的什么位置开始就是`length`字段
- lengthFieldLength 
![](https://upload-images.jianshu.io/upload_images/4685968-febef68a89f207ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
长度域`length`字段的长度
- lengthAdjustment 
![](https://upload-images.jianshu.io/upload_images/4685968-d02788404ceebb2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
有些情况可能会把header也包含到length长度中，或者length字段后面还有一些不包括在length长度内的，可以通过lengthAdjustment调节
- initialBytesToStrip 
![](https://upload-images.jianshu.io/upload_images/4685968-f2e2b1301c122b6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
起始截掉的部分，如果传递给后面的Handler的数据不需要消息头了，可以通过这个设置
可以通过消息中的一个表示消息长度的字段值动态分割收到的ByteBuf
## 6.1 基于长度
![](https://upload-images.jianshu.io/upload_images/4685968-6b741a733b1d8a79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这类数据包协议比较常见，前几个字节表示数据包长度（不包括长度域），后面为具体数据
拆完后数据包是一个完整的带有长度域的数据包（之后即可传递到应用层解码器进行解码），
创建一个如下方式的`LengthFieldBasedFrameDecoder`即可实现这类协议
![](https://upload-images.jianshu.io/upload_images/4685968-94ff7e6653e8646f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 6.2 基于长度截断
若应用层解码器不需用到长度字段，那么我们希望 Netty 拆包后，如此
![](https://upload-images.jianshu.io/upload_images/4685968-6d0c18a86f16e4cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
长度域被截掉，我们只需指定另一个参数 `initialBytesToStrip` 即可实现
表 Netty 拿到一个完整数据包后向业务解码器传递之前，应该跳过多少字节
![](https://upload-images.jianshu.io/upload_images/4685968-e4b91355c245aa7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
`initialBytesToStrip` 为4，表获取一个完整数据包后，忽略前面4个字节，应用解码器拿到的就是`不带长度域`的数据包
## 6.3 基于偏移长度
![](https://upload-images.jianshu.io/upload_images/4685968-94685e61a12eaa1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
此方式二进制协议更为普遍，前几个固定字节表示协议头，通常包含一些`magicNumber`，`protocol version` 之类的`meta`信息，紧跟着后面的是一个长度域，表示包体有多少字节的数据
只需要基于第一种情况，调整第二个参数既可以实现
![](https://upload-images.jianshu.io/upload_images/4685968-d32923c848e6b038.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
`lengthFieldOffset `为4，表示跳过4个字节才是长度域
## 6.4 基于可调整长度的拆包
有些时候，二进制协议可能会设计成如下方式
![](https://upload-images.jianshu.io/upload_images/4685968-4ba02d968fb7a6cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
长度域在前，`header`在后
- 长度域在数据包最前面表示无偏移，`lengthFieldOffset `为 0
- 长度域的长度为3，即`lengthFieldLength`为3
- 长度域表示的包体的长度略过了header，这里有另外一个参数` lengthAdjustment`，包体长度调整的大小，长度域的数值表示的长度加上这个修正值表示的就是带header的包，这里是 `12+2`，header和包体一共占14字节
![](https://upload-images.jianshu.io/upload_images/4685968-dacf71b5ca93f40b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 6.5 基于偏移可调整长度的截断
二进制协议带有两个header
![](https://upload-images.jianshu.io/upload_images/4685968-353e97958cd0c3ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
拆完后，`HDR1` 丢弃，长度域丢弃，只剩下第二个`header`和有效包体
这种协议中，一般`HDR1`可以表示`magicNumber`，表示应用只接受以该`magicNumber`开头的二进制数据，RPC 里面用的较多
### 参数设置
- 长度域偏移为1，即` lengthFieldOffset`为1
- 长度域长度为2，即 `lengthFieldLength`为2
- 长度域表示的包体的长度略过`HDR2`，但拆包时`HDR2`也被 Netty 当作包体的一部分来拆，`HDR2`的长度为1，即 `lengthAdjustment` 为1
- 拆完后，截掉前面三个字节，即`initialBytesToStrip` 为 3
![](https://upload-images.jianshu.io/upload_images/4685968-1605c9a74246ba22.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 6.6 基于偏移可调整变异长度的截断
前面所有的长度域表示的都是不带`header`的包体的长度
如果让长度域表示的含义包含整个数据包的长度，如下
![](https://upload-images.jianshu.io/upload_images/4685968-8afa48095d84971e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
长度域字段值为16， 其字段长度为2，`HDR1`的长度为1，`HDR2`的长度为1，包体的长度为12，`1+1+2+12=16`
### 参数设置
除长度域表示的含义和上一种情况不一样外，其他都相同，因为 Netty 不了解业务情况，需告诉 Netty ，长度域后再跟多少字节就可形成一个完整数据包，这里显然是13字节，长度域为16，因此减掉3才是真是的拆包所需要的长度，`lengthAdjustment`为-3

若你的协议基于长度，即可考虑不用字节来实现，而是直接拿来用，或者继承他，简单修改即可
## 构造方法
![](https://upload-images.jianshu.io/upload_images/4685968-d4d27482f18585f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
public LengthFieldBasedFrameDecoder(ByteOrder byteOrder, int maxFrameLength, int lengthFieldOffset, int lengthFieldLength, int lengthAdjustment, int initialBytesToStrip, boolean failFast) {
    // 省略参数校验
    this.byteOrder = byteOrder;
    this.maxFrameLength = maxFrameLength;
    this.lengthFieldOffset = lengthFieldOffset;
    this.lengthFieldLength = lengthFieldLength;
    this.lengthAdjustment = lengthAdjustment;
    lengthFieldEndOffset = lengthFieldOffset + lengthFieldLength;
    this.initialBytesToStrip = initialBytesToStrip;
    this.failFast = failFast;
}
```
把传参数保存在 field即可
- byteOrder 
字节流表示的数据是大端还是小端，用于长度域的读取
- lengthFieldEndOffset
紧跟长度域字段后面的第一个字节的在整个数据包中的偏移量
- failFast
    - 为true 表读取到长度域，TA的值的超过`maxFrameLength`，就抛 `TooLongFrameException`
    - 为`false` 表只有当真正读取完长度域的值表示的字节之后，才抛 `TooLongFrameException`，默认设为`true`，建议不要修改，否则可能会造成内存溢出
## 实现拆包抽象
具体的拆包协议只需要实现
```
void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) 
```
`in` 表目前为止还未拆的数据，拆完之后的包添加到 `out`这个list中即可实现包向下传递

- 第一层实现
![](https://upload-images.jianshu.io/upload_images/4685968-12ef893826527126.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

重载的`protected`方法`decode`实现真正的拆包,以下三步走
![](https://upload-images.jianshu.io/upload_images/4685968-4e337624b76686de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 1 计算需要抽取的数据包的长度
```
    protected Object decode(ChannelHandlerContext ctx, ByteBuf in) throws Exception {
        // 拿到实际的未调整过的包长度
        long frameLength = getUnadjustedFrameLength(in, actualLengthFieldOffset, lengthFieldLength, byteOrder);

        if (frameLength < lengthFieldEndOffset) {
            failOnFrameLengthLessThanLengthFieldEndOffset(in, frameLength, lengthFieldEndOffset);
        }

        if (frameLength > maxFrameLength) {
            exceededFrameLength(in, frameLength);
            return null;
        }
    }
```
- 拿到长度域的实际字节偏移 
![](https://upload-images.jianshu.io/upload_images/4685968-4bbd77a41a907dfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 调整包的长度
![](https://upload-images.jianshu.io/upload_images/4685968-55edc2e328231c78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 如果当前可读字节还未达到长度长度域的偏移，那说明肯定是读不到长度域的，直接不读
![](https://upload-images.jianshu.io/upload_images/4685968-0ea3551d3ae4c78a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上面有个`getUnadjustedFrameLength`，若你的长度域代表的值表达的含义不是基本的int,short等基本类型，可重写该方法
![](https://upload-images.jianshu.io/upload_images/4685968-68d4a19393ae7617.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
比如，有的奇葩的长度域里面虽然是4个字节，比如 0x1234，但是TA的含义是10进制，即长度就是十进制的1234，那么覆盖这个函数即可实现奇葩长度域拆包
2. 长度校验
- 整个数据包的长度还没有长度域长，直接抛异常
![](https://upload-images.jianshu.io/upload_images/4685968-72986682033c7894.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/4685968-f8174f71cede5d9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 数据包长度超出最大包长度，进入丢弃模式
![](https://upload-images.jianshu.io/upload_images/4685968-1a905cfe833adc3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    - 当前可读字节已达到`frameLength`，直接跳过`frameLength`个字节，丢弃之后，后面有可能就是一个合法的数据包 
    - 当前可读字节未达到`frameLength`，说明后面未读到的字节也需丢弃，进入丢弃模式，先把当前累积的字节全部丢弃

`bytesToDiscard` 表还需丢弃多少字节
![](https://upload-images.jianshu.io/upload_images/4685968-477bac770f1cddac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 最后，调用`failIfNecessary`判断是否需要抛出异常
    - 不需要再丢弃后面的未读字节(`bytesToDiscard == 0`)，重置丢弃状态
      - 如果没有设置快速失败(`!failFast`)，或者设置了快速失败并且是第一次检测到大包错误(`firstDetectionOfTooLongFrame`)，抛出异常，让handler处理
      - 如果设置了快速失败，并且是第一次检测到打包错误，抛出异常，让handler去处理
![](https://upload-images.jianshu.io/upload_images/4685968-9a97bd42cd122430.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

前面我们可以知道`failFast`默认为`true`，而这里`firstDetectionOfTooLongFrame`为`true`，所以，第一次检测到大包肯定会抛出异常
![](https://upload-images.jianshu.io/upload_images/4685968-0e8428febe7d3072.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 3 丢弃模式的处理
`LengthFieldBasedFrameDecoder.decoder `方法入口处还有一段代码
![](https://upload-images.jianshu.io/upload_images/4685968-39a2cba6a56fbe83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 若当前处在丢弃模式，先计算需要丢弃多少字节，取当前还需可丢弃字节和可读字节的最小值，丢弃后，进入 `failIfNecessary`，对照着这个函数看，默认情况下是不会继续抛出异常，而如果设置了 failFast为false，那么等丢弃完之后，才会抛出异常
![](https://upload-images.jianshu.io/upload_images/4685968-82def722d62f1e21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 2 跳过指定字节长度的逻辑处理
在丢弃模式的处理及长度校验都通过后
- 先验证当前是否已读到足够的字节，若读到了，在下一步抽取一个完整的数据包之前，需根据`initialBytesToStrip`的设置来跳过某些字节，当然，跳过的字节不能大于数据包的长度，否则抛 `CorruptedFrameException` 异常
![](https://upload-images.jianshu.io/upload_images/4685968-b5492cb63a51dd31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 抽取frame
- 拿到当前累积数据的读指针，然后拿到待抽取数据包的实际长度进行抽取，抽取之后，移动读指针
![](https://upload-images.jianshu.io/upload_images/4685968-6b69348f618b0015.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 抽取的过程即调用了一下 `ByteBuf` 的`retainedSlice` API，该API无内存copy的开销
![](https://upload-images.jianshu.io/upload_images/4685968-2b03d3d8a23765a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从真正抽取数据包来看看，传入的参数为 int 型，所以自定义协议中，如果你的长度域是8字节，那么前4字节基本没用
## 小结
- 如果你使用了Netty，并且二进制协议基于长度，考虑使用`LengthFieldBasedFrameDecoder`吧，通过调整各种参数，一定会满足你
- `LengthFieldBasedFrameDecoder`的拆包包括合法参数校验，异常包处理，以及最后调用 ByteBuf 的retainedSlice来实现无内存copy的拆包
# 7 基于长度域解码器分析
# 8 解码器总结
