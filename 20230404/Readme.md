## 1.什么是 Buffer

- 缓冲区 Buffer 是暂时存放输入输出数据的一段内存。
- JS 语言没有二进制数据类型，而在处理 TCP 和文件流的时候，必须要处理二进制数据。
- NodeJS 提供了一个 Buffer 对象来提供对二进制数据的操作
- 是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定
- Buffer 好比由一个 8 位字节元素组成的数组，可以有效的在 JavaScript 中表示二进制数据

## 2.什么是字节

- 字节（Byte）是计算机存储时的一种计量单位，一个字节等于 8 位二进制数
- 一个位就代表一个 0 或 1，每 8 个位(bit)组成一个字节（Byte）
- 字节是通过网络传输信息的基本单位
- 一个字节最大值十进制数是 255(2^8-1)

## 3.进制

- 0b 2 进制
- 0x 16 进制
- 0o 8 进制

### 3.1 转为十进制

- 将任意进制字符转换为十进制

```js
parseInt("11", 2); // 3 2进制转10进制
parseInt("77", 8); // 63 8进制转10进制
parseInt("e7", 16); // 231 16进制转10进制
```

### 3.2 转其他进制

- 将 10 进制转换为其他进制字符串

```js
(3)
  .toString(2)(
    // "11" 十进制转2进制
    17
  )
  .toString(16)(
    // "11" 十进制转16进制
    33
  )
  .toString(32); // "11" 十进制转32进制
```

## 4.定义 buffer 的三种方式

### 4.1 通过长度定义 buffer

```js
// 创建一个长度为10、且用0填充的 Buffer。
const buf1 = Buffer.alloc(10);
// 创建一个长度为10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);
// 创建一个长度为10、且未初始化的 Buffer。
const buf3 = Buffer.allocUnsafe(10);
```

### 4.2 通过数组定义 buffer

```js
// 创建一个包含[0x1, 0x2, 0x3]的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
```

> 正常情况下为 0-255 之间；

### 4.3 字符串创建

```js
const buf5 = Buffer.from("珠峰培训");
```

## 5. buffer 常用方法

### 5.1 fill

`buf.fill(value[, offset[, end]][, encoding])`

```js
buffer.fill(0);
```

### 5.2 write 方法

`buf.write(string[, offset[, length]][, encoding])`

```js
const buffer = Buffer.allocUnsafe(6);
buffer.write("珠", 0, 3, "utf8");
buffer.write("峰", 3, 3, "utf8"); // 珠峰
```

### 5.3 writeInt8

- 通过指定的 `offset` 将 `value`写入到当前 Buffer 中。
- 这个 value 应当是一个有效的有符号的 8 位整数

`buf.writeInt8(value, offset[, noAssert])`

```js
const buf = Buffer.alloc(4);
buf.writeInt8(8);
buf.writeInt8(0, 0);
buf.writeInt8(16, 1);
buf.writeInt8(32, 2);
buf.writeInt8(48, 3);

console.log(buf); // <Buffer 00 10 20 30>
console.log(buf.readInt8(0)); // 0
console.log(buf.readInt8(1)); // 16
console.log(buf.readInt8(2)); // 32
console.log(buf.readInt8(3)); // 48
```

#### 5.3.1 Little-Endian&Big-Endian

不同的 CPU 有不同的字节序类型，这些字节是指整数在内存中保存的顺序。

- Big-endian: 将高序字节存储在起始地址(高位编址)
- Little-endian: 将低序字节存储在起始地址（低位编址）

```js
const buffer = Buffer.alloc(4);
buffer.writeInt16BE(2 ** 8, 0); // 256
console.log(buffer); // <Buffer 01 00 00 00>
console.log(buffer.readInt16BE(0)); // 256

buffer.writeInt16LE(2 ** 8, 2); // 256
console.log(buffer); // <Buffer 01 00 00 01>
console.log(buffer.readInt16LE(2)); // 256
```

### 5.3 toString 方法

`buf.toString([encoding[, start[, end]]])`

```js
const buffer = Buffer.from("珠峰架构");
console.log(buffer.toString("utf8", 3, 6)); // 峰
```

### 5.4 slice 方法

`buf.slice([start[, end]])`

```js
const buffer = Buffer.from("珠峰架构");
const subBuffer = buffer.slice(0, 6);
console.log(subBuffer.toString()); // 珠峰
```

#### 5.4.1 截取乱码问题

```js
const { StringDecoder } = require("string_decoder");
const sd = new StringDecoder();
const buffer = Buffer.from("珠峰");
console.log(sd.write(buffer.slice(0, 4)));
console.log(sd.write(buffer.slice(4)));
```

### 5.5 copy 方法

- 复制 Buffer 把多个 buffer 拷贝到一个大 buffer 上

`buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`

```js
const buffer = Buffer.from("珠峰架构");
const subBuffer = Buffer.alloc(6);
buffer.copy(subBuffer, 0, 0, 4); // 珠
buffer.copy(subBuffer, 3, 3, 6); // 峰
console.log(subBuffer.toString()); // 珠峰
```

```js
Buffer.prototype.copy = function (
  targetBuffer,
  targetStart,
  sourceStart,
  sourceEnd
) {
  for (let i = sourceStart; i < sourceEnd; i++) {
    targetBuffer[targetStart++] = this[i];
  }
};
const buffer = Buffer.from("珠峰");
const subBuffer = Buffer.alloc(6);
buffer.copy(subBuffer, 0, 0, 4); // 珠
buffer.copy(subBuffer, 3, 3, 6); // 峰
console.log(subBuffer.toString()); // 珠峰
```

### 5.6 concat 方法

`Buffer.concat(list[, totalLength])`

```js
const buffer1 = Buffer.from("珠");
const buffer2 = Buffer.from("峰");
const buffer = Buffer.concat([buffer1, buffer2]);
console.log(buffer.toString());
```

```js
Buffer.concat = function (list) {
  const totalLength = list.reduce((len, item) => len + item.length, 0);
  if (list.length == 0) {
    return list[0];
  }
  let newBuffer = Buffer.alloc(totalLength);
  let pos = 0;
  for (let buffer of list) {
    for (let byte of buffer) {
      newBuffer[pos++] = byte;
    }
  }
  return newBuffer;
};
const buffer1 = Buffer.from("珠");
const buffer2 = Buffer.from("峰");
const buffer = Buffer.concat([buffer1, buffer2]);
console.log(buffer.toString());
```

### 5.7 isBuffer

- 判断是否是 buffer

```js
Buffer.isBuffer();
```

### 5.8 length

- 获取字节长度（显示是字符串所代表 buffer 的长度）

```js
const str = "珠峰";
console.log(str.length); // 2
const buffer = Buffer.from(str);
console.log(Buffer.byteLength(buffer)); // 6
```

## 6. base64

- Base64 是网络上最常见的用于传输 8Bit 字节码的编码方式之一
- Base64 就是一种基于 64 个可打印字符来表示二进制数据的方法
- Base64 要求把每三个 8Bit 的字节转换为四个 6Bit 的字节（38=46=24），然后把 6Bit 再填两位高位 0，组成四个 8Bit 的字节

```js
const CHARTS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function transfer(str) {
  const buf = Buffer.from(str);
  let result = "";
  for (let b of buf) {
    result += b.toString(2);
  }
  return result
    .match(/(\d{6})/g)
    .map((val) => parseInt(val, 2))
    .map((val) => CHARTS[val])
    .join("");
}
const r = transfer("珠");
console.log(r); //54+g
```