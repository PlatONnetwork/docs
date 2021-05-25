---
id: Wasm_Dev_Manual
title: 入门手册
sidebar_label: 入门手册
---

## 入门手册

### 概要

本教程主要是指导用户在PlatON上使用wasm语言创建简单的HelloWorld智能合约，通过platon-truffle编译，部署，调用此合约。


### platon-truffle开发工具介绍

platon-truffle是PlatON提供的一款能够在本地编译、部署、调用智能合约的工具，具体的安装及使用手册参见

- platon-truffle开发工具[安装参考](https://platon-truffle.readthedocs.io/en/v1.0.0/getting-started/installation.html)
- platon-truffle开发工具[使用手册](https://platon-truffle.readthedocs.io/en/v1.0.0/)


### 创建HelloWorld合约

```cpp
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class message {
   public:
      std::string head;
      PLATON_SERIALIZE(message, (head))
};

class my_message : public message {
   public:
      std::string body;
      std::string end;
      PLATON_SERIALIZE_DERIVED(my_message, message, (body)(end))
};

CONTRACT HelloWorld : public platon::Contract{
   public:
      ACTION void init(const my_message &one_message){
        info.self().push_back(one_message);
      }

      ACTION void add_message(const my_message &one_message){
          info.self().push_back(one_message);
      }

      CONST uint8_t get_message_size(){
          return info.self().size();
      }

      CONST std::string get_message_body(const uint8_t index){
          return info.self()[index].body;
      }

   private:
      platon::StorageType<"myvector"_n, std::vector<my_message>> info;
};

PLATON_DISPATCH(HelloWorld, (init)(add_message)(get_message_size)(get_message_body))

```

合约文件说明
- 每一个合约文件只有一个合约类，合约类用 CONTRACT 修饰, 必须公有继承 platon::Contract，必须要有 init 函数。

- ACTION 和 CONST 修饰的成员函数表示可调用函数，此类成员函数不可以重载。ACTION 函数会修改链上数据，CONST 函数只是查询属性不会修改链上数据。

- 可调用函数参数列表中的类型为自定义类型，此类型定义中需加上 PLATON_SERIALIZE 宏声明序列化函数，此类型继承自其他类型，需加上 PLATON_SERIALIZE_DERIVED 宏声明序列化函数。

- 可调用函数只有在PLATON_DISPATCH 宏定义统一入口函数，才能够被外部调用。

- 目前 platon 会将合约类的成员变量持久化存储，成员变量必须是 platon::StorageType 类型，platon::StorageType模板的第一个参数字符串后面加上_n，字符串必须为.12345abcdefghijklmnopqrstuvwxyz这32字符中的字符。第二个参数为实际存储的具体类型。成员函数修改成员变量需要通过 self() 函数获取具体类型的实例，然后执行相应的实例函数。

- platon::StorageType 模板的第二个参数类型为自定义类型，此类型定义中需加上 PLATON_SERIALIZE 宏声明序列化函数，此类型继承自其他类型，需加上 PLATON_SERIALIZE_DERIVED 宏声明序列化函数。

### 编译HelloWorld合约

**step1.** 为HelloWorld项目创建新目录

```
mkdir HelloWorld && cd HelloWorld
```
- 以下命令如果没有特殊说明都在HelloWorld目录下进行

**step2.** 使用platon-truffle初始化一个工程

```
platon-truffle init
```
在操作完成之后，就有如下项目结构：

- contracts/: wasm合约目录

- migrations/: 部署脚本文件目录

- test/: 测试脚本目录

- truffle-config.js: platon-truffle 配置文件

**step3.** 将之前编写好的HelloWorld合约放至HelloWorld/contracts/目录下

```
ls contracts/
```
- 将看到HelloWorld.cpp

**step4.** 修改platon-truffle 配置文件truffle-config.js，添加编译wasm合约版本号

```
vim truffle-config.js
```

truffle-config.js 修改部分内容如下：
```
compilers: {
     wasm: {
           version: "1.0.0"
     }
}
```

**step5.** 编译合约

```
platon-truffle compile
```
在操作完成之后，生成如下目录结构：

- `build/` wasm合约编译后的目录
- `build/contracts/HelloWorld.abi.json`  HelloWorld合约编译后的abi接口文件
- `build/contracts/HelloWorld.wasm`  HelloWorld合约编译后的二进制文件

### 部署HelloWorld合约

**step1.** 修改truffle-config.js中链的配置信息

```
vim truffle-config.js
```
将truffle-config.js中的区块链相关配置修改成您真实连接的链配置
```
networks: {
	development: {
       host: "10.1.1.6",     // 区块链所在服务器主机
       port: 8806,            // 链端口号
       network_id: "*",       // Any network (default: none)
       from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc",
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step2.**  解锁钱包账户

进入platon-truffle控制台
```
platon-truffle console
```

导入私钥（如果之前已导入可以跳过此步骤）
```
web3.platon.personal.importRawKey("您的钱包私钥","您的钱包密码");
```
导入成功将看到私钥对应的地址：
```
'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'
```

解锁钱包账户
```
 web3.platon.personal.unlockAccount('您的钱包地址','您的钱包密码',999999);
```
解锁成功将看到如下信息：
```
ture
```

**step3.** 部署HelloWorld合约

```
platon-truffle deploy --wasm --contract-name HelloWorld --params '[[["1"], "2", "3"]]'
```
- `HelloWorld` :要部署的合约
- `params` :合约init函数对应的参数

部署成功后，将看到类似如下信息：
```
receipt:  { blockHash:
   '0x266733b693ba650315a59c34e72804c06ca3e27fab145625797bd42259b572c5',
  blockNumber: 70441,
  contractAddress: 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn',
  cumulativeGasUsed: 291314,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 291314,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash:
   '0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d',
  transactionIndex: 0 }
  contract HelloWorld deployed successfully
======================

   > transactionHash:     0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d
   > contract address:    lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn
   > block number:        70441
   > block timestamp:     1583247148341
   > account:             lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc
   > balance:             3533694129556768659166595001485837031654967793751237866225582808584074296
   > gas limit:           100000000
   > gas used:            291314
   > gas price:           0.000000050000000004 LAT
   > total cost:          0.014565700001165256 LAT
```

### 调用HelloWorld合约

**step1.**  进入platon-truffle控制台

```
platon-truffle console
```
- 以下调用查询将在platon-truffle控制台中进行

**step2.**  构建合约对象

```json
var abi = [{"baseclass":[],"fields":[{"name":"head","type":"string"}],"name":"message","type":"struct"},{"baseclass":["message"],"fields":[{"name":"body","type":"string"},{"name":"end","type":"string"}],"name":"my_message","type":"struct"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];
var contractAddr = 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn';
 
var helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 }); 
```

说明：
- `abi` 是合约提供给外部调用时的接口，每个合约对应的abi在编译后的文件中，如：`HelloWorld/build/contracts/HelloWorld.json` 中可以找到
- `contractAddr` 在部署合约成功后有一个contract address
- `helloWorld` 就是构建出来与链上合约交互的合约对象抽象

**step3.**  调用合约

```javascript
helloworld.methods.add_message([["5"], "6", "7"]).send({
	from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',gas: 999999
}).on('receipt', function(receipt) {
	console.log(receipt);
}).on('error', console.error);
```

调用合约命令说明：
- `helloWorld` 是之前构建的合约对象
- `methods` 固定语法,后面紧跟合约的方法名
- `add_message` 是我们HelloWorld合约中的一个方法，有一个自定义my_message类型的入参
- `from` 调用者的钱包地址
- `gas` gas值
- `on` 是监听合约处理结果事件，此处如果成功将打印回执，失败输出错误日志

函数调用成功，将会看到如下信息：

```
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat1nk4errnjlulaz5y57xt4djkx3h4jjl7yy9dzqn',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
```

**step4.**  合约查询

```javascript
helloworld.methods.get_message_body(0).call()
```
查询合约命令说明：

- `helloWorld` 是之前构建的合约对象
- `methods` 指定将获取合约中的方法
- `get_message_body` 是我们HelloWorld合约中的一个方法，该方法有一个int类型的入参
- `call` 指明是查询方法

---

## FAQ

### 编译相关

1. 使用 `platon-cpp` 如何编译多个 `cpp` 文件?

    ```shell
    platon-cpp ./test.cpp ./test1.cpp
    ```

   只允许存在一个合约类。

2. 使用 `platon-cpp` 编译合约, 如何指定wasm输出目录及文件名?

   使用 `-o` 参数, 且指定目录时必须同时指定文件名:

    ```shell
    platon-cpp ./test.cpp -o ./out/test.wasm
    ```
3. platon-truffle执行truffle deploy部署合约失败？

确认truffle-config.js中连接的链的配置信息及用户的钱包地址是否正确,钱包是否解锁。

4. truffle 部署带参数的构造函数合约失败？


如果合约中的init函数带有参数，部署合约时需要指定params参数。

5. ABI 支持哪些数据类型?

   生成ABI支持的类型和转换规则如下：

| 类型                  | ABI                |
| --------------------- | ------------------ |
| bool                  | bool               |
| uint8_t               | uint8              |
| uint16_t              | uint16             |
| uint32_t              | uint32             |
| uint64_t              | uint64             |
| int8_t                | int8               |
| int16_t               | int16              |
| int32_t               | int32              |
| int64_t               | int64              |
| bytes                 | uint8\[\]          |
| std::string           | string             |
| std::vector&lt;T&gt;  | T\[\]              |
| std::array\[T, N\]    | T\[N\]             |
| std::pair&lt;T, U&gt; | pair&lt;T, U       |
| std::set&lt;T&gt;     | set&lt;T&gt;       |
| std::map&lt;T, V&gt;  | map&lt;T, V&gt;    |
| std::list&lt;T&gt;    | list&lt;T&gt;      |
| FixedHash&lt;N&gt;    | FixedHash&lt;N&gt; |
| u128                  | uint128            |
| bigint                | uint128            |


### 合约相关

1. 如何实现在 `platon` 进程输出合约 debug 日志？

- 合约代码首行加上 `#undef NDEBUG`, 必须在头文件 include 之前

 ```cpp
 #undef NDEBUG

 #include <platon/platon.hpp>

 //...
 ```

- `platon` 启动命令指定日志级别4, 打开 `debug` 标志

 ```shell
 ./platon --debug --verbosity 4 ...
 ```

2. 如何编写合约能有效减少 Gas 消耗？

    - 使用引用参数

   ```cpp
   void test(const std::string& str) {
       // ...
   }
   ```

    - 返回右值引用

   ```cpp
   std::vector<std::string>&& test() {
       std::vector<std::string> v;
       // ...
       return std::move(v);
   }
   ```

    - 尽量不要申请大块内存

3. 使用 `StorageType` 有哪些地方要注意的？

    - 应该在 `init()` 初始化

    ```cpp
    CONTRAT Hello : public Contract {
    public:
        ACTION void init() {
            s_.self() = "test";
        }
    private:
        StorageType<"test"_n, std::string> s_;
    };
    ```

    - 建议直接使用 `StorageType` 的特化类型

        + Uint8
        + Int8
        + Uint16
        + Int16
        + Uint
        + Int
        + Uint64
        + Int64
        + String
        + Vector
        + Set
        + Map
        + Array
        + Tuple

4. `StorageType` 与 `platon::db::Map`, `platon::db::Array` 有什么区别?

   从底层存储层面来说, `StorageType` 的实现是作为一个整体序列化, 然后存储到数据
   库. 而 `platon::db::Map` 和 `platon::db::Array` 则将容器的每一个元素序列化后, 作为
   K/V 存储到数据库. 对于大规模数据, `platon::db::Map` 和 `platon::db::Array` 性能
   更好.

   在实现合约时, 应根据数据规模, 选择合适的存储结构.

5. RLP 序列化/反序列化 支持哪些 C++ 标准库类型？

   支持以下 C++ 标准库类型:

    - std::string
    - std::vector
    - std::map
    - std::list
    - std::array
    - std::set
    - std::pair
    - std::tuple

6. 自定义类型如何支持 RLP 序列化/反序列化?

    - 普通类型使用宏 `PLATON_SERIALIZE`
   ```cpp
   struct Base {
       int a;
       std::string b;
   
       PLATON_SERIALIZE(Base, (a)(b));
   };
   ```
    - 派生类使用宏 `PLATON_SERIALIZE_DERIVED`, 同时基类也要使用宏 `PLATON_SERIALIZE`
   ```cpp
   struct Derived : public Base {
       int c;
       int d;
   
       PLATON_SERIALIZE_DERIVED(Derived, Base, (c)(d));
   };
   ```
