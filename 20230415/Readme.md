## 1.OSI 七层网络模型

OSI 是 Open System Interconnection 的缩写，意为开放式系统互联。国际标准化组织（ISO）制定了 OSI 模型，该模型定义了不同计算机互联的标准，是设计和描述计算机网络通信的基本框架。OSI 模型把网络通信的工作分为 7 层，分别是物理层、数据链路、网络层、传输层、会话层、表示层和应用层。首先来看看 OSI 的七层模型：

![](./osi7cen.png)

## 2.TCP/IP 参考模型

TCP/IP 是传输控制协议/网络互联协议的简称。早期的 TCP/IP 模型是一个四层结构，从下往上依次是网络接口层、互联网层、传输层和应用层。后来在使用过程中，借鉴 OSI 七层参考模型，将网络接口层划分为了物理层和数据链路层，形成五层结构。

![](./tcpip5.png)

## 3.传输层

传输层是面向连接的、可靠的进程到进程通信的协议。TCP 提供全双工服务，即数据可在同一时间双向传播。TCP 将若干个字节构成一个分组，此分组称为报文段（Segment）。提供了一种端到端的连接。传输层的协议主要是 TCP,TCP(Transimision Control Protocol)是一种可靠的、面向连接的协议，传输效率低。

## 4.TCP 格式

![](./tcpconstructor.webp)

- 源端口号和目标端口号，计算机通过端口号识别访问哪个服务，比如 http 服务或 ftp 服务，发送方端口号是进行随机端口，目标端口号决定了接收方哪个程序来接收

- 32 位序列号 TCP 用序列号对数据包进行标记，以便在到达目的地后重新重装，假设当前的序列号为 s，发送数据长度为 l, 则下次发送数据时的序列号为 s + l。在建立连接时通常由计算机生成一个随机数作为序列号的初始值

- 确认应答号 它等于下一次应该接收到的数据的序列号。假设发送端的序列号为 s, 发送数据的长度为 l, 那么接收端返回的确认应答号也是 s + l。发送端接收到这个确认应答后，可以认为这个位置以前的所有数据都已被正常接收。

- 首部长度：TCP 首部的长度，单位为 4 字节。如果没有可选字段，那么这里的值就是 5。表示 TCP 首部的长度为 20 字节。

- 控制位 TCP 的连接、传输和断开都受到这六个控制位的指挥
  - PSH (push 急迫位) 缓存区将满，立刻传输速度
  - RST (reset 重置位) 连接断了重新连接
  - URG (urgent 紧急位) 紧急信号
  - ACK (acknowledgement 确认)为 1 表示确认号
  - SYN (synchronous 建立联机) 同步序号位 TCP 建立连接时要将这个值设为 1
  - FIN 发送端完成位，提出断开连接的一方把 FIN 置为 1 表示要断开连接
- 窗口值 说明本地可接收数据段的数目，这个值的大小是可变的。当网络通畅时将这个窗口值变大加快传输速度，当网络不稳定时减少这个值可以保证网络数据的可靠传输。它是用来在 TCP 传输中进行流量控制的
- 窗口大小：用于表示从应答号开始能够接受多少个 8 位字节。如果窗口大小为 0， 表示发送端口探测。
- 校验和：用来做差错控制，TCP 校验和的计算包括 TCP 首部、数据和其它填充字节。在发送 TCP 数据段时，由发送端计算验和，当到达目的地时又进行一次检验和计算。如果两次校验和一致，说明数据是正确的，否则 将认为数据被破坏，接收端将丢弃该数据
- 紧急指针：仅在 URG (urgent 紧急) 控制位为 1 时有效。表示紧急数据的末尾在 TCP 数据部分中的位置。通常在暂时中断通信时使用 （比如输入 Ctrl + C）。

## 5. 三次握手

TCP 是面向连接的，无论哪一方向另一方发送数据之前，都必须在双方之间建立一条连接。在 TCP/IP 协议中，TCP 协议提供可靠的连接服务，连接是通过三次握手进行初始化的。三次握手的目的是同步连接双方的序列号和确认号 并交换 TCP 窗口大小信息。

![](./shake8.webp)

为了方便描述我们将主动发起请求的 172.16.50.72:65076 主机称为客户端，将返回数据的主机 172.16.17.94:8080 称为服务器，以下也是。

- 第一次握手：建立连接。客户端发送连接请求，发送 SYN 报文，将 seq 设置为 0。然后，客户端进入 SYN_SEND 状态，等待服务器的确认。
- 第二次握手：服务器收到客户端的 SYN 报文段。需要对这个 SYN 报文段进行确认，发送 ACK 报文，将 acK 设置为 1。同时，自己还要发送 SYN 请求信息，将 seq 为 0。服务器端将上述所有信息一并发送给客户端，此时服务器进入 SYN_RECV 状态。
- 第三次握手：客户端收到服务器的 ACK 和 SYN 报文后，进行确认，然后将 ack 设置为 1，seq 设置为 1，向服务器发送 ACK 报文段，这个报文段发送完毕以后，客户端和服务器端都进入 ESTABLISHED 状态，完成 TCP 三次握手。

## 6.数据传输

![](./datatransfer8.webp)

- 客户端先向服务器发送数据，该数据报是长度为 159 的数据。
- 服务器收到报文后，也向客户端发送了一个数据进行确认（ACK）,并且返回客户端要请求的数据，数据的长度为 111，将 seq 设置为 1，ack 设置为 160（1+159）。
- 客户端收到服务器返回的数据后进行确认(ACK)，将 seq 设置为 160，ack 设置为 112（1+111）。

## 7.四次挥手

![](./goodbye8.webp)

- 第一次挥手：客户端向服务器发送一个 FIN 报文段，将设置 seq 为 160 和 ack 为 112；此时，客户端进入 FIN_WAIT_1 状态，这表示客户端没有数据要发送服务器了，请求关闭连接；
- 第二次挥手：服务器收到了客户端发送的 FIN 报文段，向客户端回一个 ACK 报文段，ack 设置为 1，seq 设置为 112；服务器进入了 CLOSE_WAIT 状态，客户端收到服务器返回的 ACK 报文后，进入 FIN_WAIT_2 状态；
- 第三次挥手：服务器会观察自己是否还有数据没有发送给客户端，如果有，先把数据发送给客户端，再发送 FIN 报文；如果没有，那么服务器直接发送 FIN 报文给客户端。请求关闭连接，同时服务器进入 LAST_ACK 状态；
- 第四次挥手：客户端收到服务器发送的 FIN 报文段，向服务器发送 ACK 报文段，将 seq 设置为 161，将 ack 设置为 113，然后客户端进入 TIME_WAIT 状态；服务器收到客户端的 ACK 报文段以后，就关闭连接；此时，客户端等待 2MSL 后依然没有收到回复，则证明 Server 端已正常关闭，客户端也可以关闭连接了。

> 注意：在握手和挥手时确认号应该是对方序列号加 1，传输数据时则是对方序列号加上对方携带应用层数据的长度。

## 8.问题

1. 为什么需要三次握手? 确保双方收发都是正常的
2. 为什么需要四次挥手？确保数据发送完毕，都认为可以断开
3. 为什么需要等待？ A 向 B 发的 `FIN` 可能丢失
4. 为什么握手是三次，但挥手却是四次？当 Server 端收到 FIN 报文时，很可能不会立即关闭 SOCKET

## 9.同学们的文章

- [高春阳](https://gcystar.github.io/2018/02/06/core/tcp%E7%9A%84%E8%AE%A4%E7%9F%A5%E5%92%8C%E5%BA%94%E7%94%A8/)
- [whynotgonow](https://juejin.im/post/5a7c4ebaf265da4e81239431)
- [李斌](https://juejin.im/post/5a7fea206fb9a06333151e99)