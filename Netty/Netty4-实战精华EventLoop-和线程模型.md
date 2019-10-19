![](https://upload-images.jianshu.io/upload_images/4685968-37d799a36a9fd3c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
简单地说，线程模型指定了操作系统、编程语言、框架或者应用程序的上下文中的线程管理的关键方面。
显而易见地，如何以及何时创建线程将对应用程序代码的执行产生显著的影响，因此开发人员需要理解与不同模型相关的权衡。

在本文中，我们将详细地探讨 Netty 的线程模型。它强大但又易用，并且和 Netty 的一贯宗旨一样，旨在简化你的应用程序代码，同时最大限度地提高性能和可维护性。我们还将讨论致使选择当前线程模型的经验。

如果你对 Java 的并发 API（java.util.concurrent）有比较好的理解，那么你应该会发
现在本章中的讨论都是直截了当的。如果这些概念对你来说还比较陌生，或者你需要更新自己的
相关知识，那么由 Brian Goetz 等编写的《Java 并发编程实战》 （Addison-Wesley Professional，
2006）这本书将是极好的资源。

# 1 线程模型概述
在早期的 Java 语言中，我们使用多线程处理的主要方式无非是按需创建和启动新的 Thread 来执行并发的任务单元——一种在高负载下工作得很差的原始方式。Java 5 随后引入了 Executor API，其线程池通过缓存和重用Thread 极大地提高了性能。
基本的线程池化模式可以描述为：
- 从池的空闲线程列表中选择一个 Thread，并且指派它去运行一个已提交的任务（一个
Runnable 的实现）
- 当任务完成时，将该 Thread 返回给该列表，使其可被重用
![Executor 的执行逻辑](https://upload-images.jianshu.io/upload_images/4685968-f1d3a115632d0f0f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
虽然池化和重用线程相对于简单地为每个任务都创建和销毁线程是一种进步，但是它并不能消除由上下文切换所带来的开销，其将随着线程数量的增加很快变得明显，并且在高负载下愈演愈烈。此外，仅仅由于应用程序的整体复杂性或者并发需求，在项目的生命周期内也可能会出现其他和线程相关的问题。
简而言之，多线程处理是很复杂的。在接下来的章节中，我们将会看到 Netty 是如何帮助简化它的。
# 2 EventLoop 接口
运行任务来处理在连接的生命周期内发生的事件是任何网络框架的基本功能。
与之相应的编程上的构造通常被称为事件循环—一个Netty 使用了 interface `io.netty.channel.EventLoop `来适配的术语。
![代码清单1-在事件循环中执行任务](https://upload-images.jianshu.io/upload_images/4685968-1cb85e6d30e1d7d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Netty 的 EventLoop 是协同设计的一部分，它采用了两个基本的 API：并发和网络编程。
- 首先，`io.netty.util.concurrent` 包构建在 JDK 的` java.util.concurrent` 包基础上，用
来提供线程执行器
- 其次，`io.netty.channel` 包中的类，为了与 Channel 的事件进行交互，扩展了这些接口/类
![EventLoop 的类层次结构](https://upload-images.jianshu.io/upload_images/4685968-159466297324ff79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在这个模型中，一个 `EventLoop` 将由一个永远都不会改变的 Thread 驱动，同时任务（Runnable 或者 Callable）可以直接提交给 `EventLoop` 实现，以立即执行或者调度执行。
根据配置和可用核心的不同，可能会创建多个 EventLoop 实例用以优化资源的使用，并且单个
EventLoop 可能会被指派用于服务多个 Channel。
需要注意的是，Netty的`EventLoop`在继承了`ScheduledExecutorService`的同时，只定义了一个方法，parent() (这个方法重写了 EventExecutor 的 EventExecutorGroup.parent()方法),这个方法，如下面的代码片断所示，用于返回到当前EventLoop实现的实例所属的EventLoopGroup的引用。
![](https://upload-images.jianshu.io/upload_images/4685968-d6d5b3be7cc8fff1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 事件/任务的执行顺序 
事件和任务是以先进先出（FIFO）的顺序执行的。这样可以通过保证字节内容总是按正确的顺序被处理，消除潜在的数据损坏的可能性。
## 2.1Netty 4 中的 I/O 和事件处理
由 I/O 操作触发的事件将流经安装了一个或者多个`ChannelHandler` 的 `ChannelPipeline`。
传播这些事件的方法调用可以随后被 ` ChannelHandler`所拦截，并且可以按需地处理事件。

事件的性质通常决定了它将被如何处理；它可能将数据从网络栈中传递到你的应用程序中，或者进行逆向操作，或者执行一些截然不同的操作。
但是事件的处理逻辑必须足够的通用和灵活，以处理所有可能的用例。因此，在Netty 4 中，所有的I/O操作和事件都由已经被分配给了EventLoop的那个Thread来处理(这里使用的是“来处理”而不是“来触发”，其中写操作是可以从外部的任意线程触发的)
## 2.2 Netty 3 中的 I/O 操作
在以前的版本中所使用的线程模型只保证了
- 入站（之前称为上游）事件会在所谓的 I/O 线程（对应于 Netty 4 中的 EventLoop）中执行
- 所有的出站（下游）事件都由调用线程处理，其可能是 I/O 线程也可能是别的线程

开始看起来这似乎是个好主意，但是已经被发现是有问题的，因为需要在` ChannelHandler `中对出站事件进行仔细的同步。简而言之，不可能保证多个线程不会在同一时刻尝试访问出站事件。例如，如果你通过在不同的线程中调用 `Channel.write()`方法，针对同一个 Channel 同时触发出站的事件，就会发生这种情况。
当出站事件触发了入站事件时，将会导致另一个负面影响。当 `Channel.write()`方法导致异常时，需要生成并触发一个 `exceptionCaught` 事件。但是在 Netty 3 的模型中，由于这是一个入站事件，需要在调用线程中执行代码，然后将事件移交给 I/O 线程去执行，然而这将带来额外的上下文切换。

Netty 4 中所采用的线程模型，通过在同一个线程中处理某个给定的 `EventLoop `中所产生的所有事件，解决了这个问题。这提供了一个更加简单的执行体系架构，并且消除了在多个`ChannelHandler `中进行同步的需要（除了任何可能需要在多个 Channel 中共享的）。

现在，已经理解了 EventLoop 的角色，让我们来看看任务是如何被调度执行的吧。
# 3 任务调度
偶尔，你将需要调度一个任务以便稍后（延迟）执行或者周期性地执行。
例如，你可能想要注册一个在客户端已经连接了 5 分钟之后触发的任务。一个常见的用例是，发送心跳消息到远程节点，以检查连接是否仍然还活着。如果没有响应，你便知道可以关闭该 Channel 了。

在接下来的几节中，我们将展示如何使用核心的 Java API 和 Netty 的` EventLoop `来调度任务。然后，我们将研究 Netty 的内部实现，并讨论它的优点和局限性。
## 3.1 JDK 的任务调度 API
在 Java 5 之前，任务调度是建立在 `java.util.Timer `类之上的，其使用了一个后台 Thread，并且具有与标准线程相同的限制。
随后，JDK 提供了` java.util.concurrent `包，它定义了`interface ScheduledExecutorService`
![](https://upload-images.jianshu.io/upload_images/4685968-8bf62a5c38b51bac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
虽然选择不是很多(由JDK提供的这个接口的唯一具体实现是`java.util.concurrent.ScheduledThreadPoolExecutor`),但是这些预置的实现已经足以应对大多数的用例
![代码清单2-使用 ScheduledExecutorService 调度任务](https://upload-images.jianshu.io/upload_images/4685968-a69a94e85819638d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
代码清单2显示了如何使用ScheduledExecutorService来在 60 秒的延迟之后执行一个任务。
虽然` ScheduledExecutorService `API 是直截了当的，但是在高负载下它将带来性能上的负担,下面看看 Netty 是如何以更高的效率提供相同的功能的。
## 3.2 使用 EventLoop 调度任务
`ScheduledExecutorService `的实现具有局限性，例如，事实上作为线程池管理的一部分，将会有额外的线程创建。如果有大量任务被紧凑地调度，那么这将成为一个瓶颈
Netty 通过 Channel 的 `EventLoop` 实现任务调度解决了这一问题,如代码清单3 所示
![代码清单3-使用 EventLoop 调度任务](https://upload-images.jianshu.io/upload_images/4685968-090fb9d80c64b188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
经过 60 秒之后，Runnable 实例将由分配给 Channel 的 EventLoop 执行。如果要调度任务以`每隔 60 秒执行一次`，请使用 scheduleAtFixedRate()方法，如代码清单4 所示
![代码清单4 使用 EventLoop 调度周期性的任务](https://upload-images.jianshu.io/upload_images/4685968-bb01d2f9d34faccd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如我们前面所提到的，Netty的`EventLoop`扩展了`ScheduledExecutorService`，所以它提供了使用JDK实现可用的所有方法，包括在前面的示例中使用到的`schedule()`和`scheduleAtFixedRate()`方法。所有操作的完整列表可以在`ScheduledExecutorService`的Javadoc(Java平台，标准版第8版API规范，java.util.concurrent，Interface ScheduledExecutorService：http://docs.oracle.
com/javase/8/docs/api/java/util/concurrent/ScheduledExecutorService.html。)中找到 
要想取消或者检查（被调度任务的）执行状态，可以使用每个异步操作所返回的 ScheduledFuture,代码清单5 展示了一个简单的取消操作。
![代码清单5 使用 ScheduledFuture 取消任务](https://upload-images.jianshu.io/upload_images/4685968-63fbf89b05f668e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 4 实现细节
这一节将更加详细地探讨 Netty 的线程模型和任务调度实现的主要内容。我们也将会提到需
要注意的局限性，以及正在不断发展中的领域。
## 4.1 线程管理
Netty线程模型的卓越性能取决于对于当前执行的Thread的身份的确定(通过调用` EventLoop` 的 `inEventLoop(Thread)`实现负责处理一个Channel的整个生命周期内的所有事件）

如果（当前）调用线程正是支撑 `EventLoop` 的线程，那么所提交的代码块将会被（直接）执行。
否则，`EventLoop` 将调度该任务以便稍后执行，并将它放入到内部队列中。当 `EventLoop`下次处理它的事件时，它会执行队列中的那些任务/事件。这也就解释了任何的 Thread 是如何与 Channel 直接交互而无需在 `ChannelHandler` 中进行额外同步的。
每个 `EventLoop` 都有它自已的任务队列，独立于任何其他的 `EventLoop`
图3展示了 `EventLoop` 用于调度任务的执行逻辑。这是 Netty 线程模型的关键组成部分
![图3-EventLoop 的执行逻辑](https://upload-images.jianshu.io/upload_images/4685968-99ada97143d73b35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
`永远不要将一个长时间运行的任务放入到执行队列中，因为它将阻塞需要在同一线程上执行的任何其他任务`
如果必须要进行阻塞调用或者执行长时间运行的任务，我们建议使用一个专门的`EventExecutor`(TODO:见 6.2.1 节的“ChannelHandler 的执行和阻塞”）
除了这种受限的场景，如同传输所采用的不同的事件处理实现一样，所使用的线程模型也可强烈影响到排队的任务对整体系统性能的影响（如同我们在第 4 章中所看到的，使用 Netty可以轻松地切换到不同的传输实现，而不需要修改你的代码库）
## 4.2 EventLoop/线程的分配
服务于 Channel 的 I/O 和事件的` EventLoop` 包含在 `EventLoopGroup `中。
根据不同的传输实现，`EventLoop `的创建和分配方式也不同。
- 异步传输
异步传输实现只使用了少量的 `EventLoop`（以及和它们相关联的 Thread），而且在当前的线程模型中，它们可能会被多个 Channel 所共享。这使得可以通过尽可能少量的 Thread 来支撑大量的 Channel，而不是每个 Channel 分配一个 Thread。
图4 显示了一个 `EventLoopGroup`，它具有 3 个固定大小的 `EventLoop`（每个 `EventLoop`都由一个 Thread 支撑）
在创建 `EventLoopGroup `时就直接分配了` EventLoop`（以及支撑它们的 Thread），以确保在需要时它们是可用的
![图4-用于非阻塞传输（如 NIO 和 AIO）的 EventLoop 分配方式](https://upload-images.jianshu.io/upload_images/4685968-41f3d9b1e127329b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
`EventLoopGroup` 负责为每个新创建的 Channel 分配一个 `EventLoop`
在当前实现中，使用顺序循环（round-robin）的方式进行分配以获取一个均衡的分布，并且相同的 `EventLoop`可能会被分配给多个 Channel。（这一点在将来的版本中可能会改变）
一旦一个 Channel 被分配给一个 `EventLoop`，它将在它的整个生命周期中都使用这个`EventLoop`（以及相关联的 Thread）。请牢记这一点，因为它可以使你从担忧你的`ChannelHandler`实现中的线程安全和同步问题中解脱出来。
另外，需要注意的是，`EventLoop` 的分配方式对 `ThreadLocal` 的使用的影响。因为一个`EventLoop` 通常会被用于支撑多个 Channel，所以对于所有相关联的 Channel 来说，`ThreadLocal `都将是一样的。这使得它对于实现状态追踪等功能来说是个糟糕的选择。然而，在一些无状态的上下文中，它仍然可以被用于在多个 Channel 之间共享一些重度的或者代价昂贵的对象，甚至是事件
- ．阻塞传输
用于像 OIO（旧的阻塞 I/O）这样的其他传输的设计略有不同，如图 5 所示。
这里每一个 Channel 都将被分配给一个 EventLoop（以及它的 Thread),如果你开发的
应用程序使用过 java.io 包中的阻塞 I/O 实现，你可能就遇到过这种模型

![图 5 阻塞传输（如 OIO）的 EventLoop 分配方式](https://upload-images.jianshu.io/upload_images/4685968-4f43820a50fdc775.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
但正如之前一样，得到的保证是每个 Channel 的 I/O 事件都将只会被一个 Thread（用于支撑该 Channel 的 `EventLoop` 的那个 Thread）处理。这也是另一个` Netty 设计一致性`的例子，它（这种设计上的一致性）对 Netty 的可靠性和易用性做出了巨大贡献
# 5 小结
- 在本文中，你了解了通常的线程模型，并且特别深入地学习了 Netty 所采用的线程模型，我
们详细探讨了其性能以及一致性。
- 你看到了如何在 EventLoop（I/O Thread）中执行自己的任务，就如同 Netty 框架自身一
样。你学习了如何调度任务以便推迟执行，并且我们还探讨了高负载下的伸缩性问题。你也看到
了如何验证一个任务是否已被执行以及如何取消它。
- 通过我们对 Netty 框架的实现细节的研究所获得的这些信息，将帮助你在简化你的应用程序
代码库的同时最大限度地提高它的性能。关于更多一般意义上的有关线程池和并发编程的详细信
息，我们建议阅读由 Brian Goetz 编写的《Java 并发编程实战》。他的书将会带你更加深入地理解
多线程处理甚至是最复杂的多线程处理用例。

# 参考
Netty实战
