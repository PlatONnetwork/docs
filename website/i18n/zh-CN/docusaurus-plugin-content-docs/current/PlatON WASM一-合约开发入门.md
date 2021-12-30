---
id: WASM_Contract_1
title: PlatON WASM合约开发（一） - 合约开发入门
sidebar_label: WASM合约开发入门
---

PlatON隐私AI网络是面向未来的全球隐私计算网络，是全数字经济时代的公共基础设施。区块链生态的建设主要建立在智能合约之上，PlatON隐私计算基础设施，能够解决区块链生态发展的技术瓶颈，使链上匮乏的算力能够革命性的提升，使被传统互联网漠视的隐私保护能够得到有效的尊重，使不可信环境中的参与者能够可信的协同，真正成为数字经济的底层动能。

目前PlatON主网上线在即，后期除了项目的持续开发之外，还会有大量围绕PlatON的生态建设。考虑到生态建设离不开智能合约的开发，我们特此推出了智能合约开发相关系列教程，希望能够帮助大家更好地加入到PlatON生态，在PlatON上构建自己的应用。

## 概述
PlatON支持EVM和WASM两种智能合约，本教程主要介绍如何在PlatON上使用C++语言开发WASM智能合约。

## 环境

**系统：**ubuntu18.04

## 开发语言
PlatON隐私计算的基础设施与密码学结合的非常紧密，对计算效率要求非常高，因此现阶段底层主要以C++为主。C++是一款高效的语言。当然，很多语言都可以用于WASM合约开发，相信官方未来会逐步完善和推出其他语言的版本。

## 构建工具
platon-truffle，可以帮助开发人员完成编译、部署和调试合约。

## 安装方式

```plain
wget http://111.231.58.192/install-platon-truffle.sh && sudo bash install-platon-truffle.sh
```
**注意**
会输出错误信息，但是platon-truffle --version能够正常输出即可

## 使用手册

[https://platon-truffle.readthedocs.io/en/v0.13.1/](https://platon-truffle.readthedocs.io/en/v0.13.1/)

## 合约开发
## 创建项目

### 1.创建新目录

```plain
mkdir HelloWorld && cd HelloWorld
```

### 2.初始化工程

```plain
platon-truffle init
```

## 编写合约

### 代码

删除contracts目录下的Migrations.sol文件。

**注意****：<platon/platon.hpp>是开发和使用隐私计算基础设施的关键。**

在contracts目录下新建文件HelloWorld.cpp，合约内容如下

```plain
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
### 代码说明

* 每一个合约文件只有一个合约类，合约类用 CONTRACT 修饰, 必须公有继承 platon::Contract，必须要有 init 函数。
* ACTION 和 CONST 修饰的成员函数表示可调用函数，此类成员函数不可以重载。ACTION 函数会修改链上数据，CONST 函数只是查询属性不会修改链上数据。
* 可调用函数参数列表中的类型为自定义类型，此类型定义中需加上 PLATON_SERIALIZE 宏声明序列化函数，此类型继承自其他类型，需加上 PLATON_SERIALIZE_DERIVED 宏声明序列化函数。
* 可调用函数只有在PLATON_DISPATCH 宏定义统一入口函数，才能够被外部调用。
* 目前 platon 会将合约类的成员变量持久化存储，成员变量必须是 platon::StorageType 类型，platon::StorageType模板的第一个参数字符串后面加上_n，字符串必须为.12345abcdefghijklmnopqrstuvwxyz这32字符中的字符。第二个参数为实际存储的具体类型。成员函数修改成员变量需要通过 self() 函数获取具体类型的实例，然后执行相应的实例函数。
* platon::StorageType 模板的第二个参数类型为自定义类型，此类型定义中需加上 PLATON_SERIALIZE 宏声明序列化函数，此类型继承自其他类型，需加上 PLATON_SERIALIZE_DERIVED 宏声明序列化函数。
# 编译

### 1.修改配置

修改配置文件truffle-config.js中wasm编译器版本

```plain
compilers: {
  wasm: {
    version: "v0.13.2", 
  }
}
```
**注意**
官方目前只发布了alaya版本的wasm编译器，在涉及到跨合约调用的时候，会出现地址编码问题，因此需要手动编译和安装platon版本的[wasm编译器](https://github.com/PlatONnetwork/PlatON-CDT/tree/feature/wasm)。

我们已经编译了最新版本的platon版本的wasm编译器，有需要的朋友可以[下载](http://111.231.58.192/platon-cdt.zip)并解压到~/.config/truffle/compilers目录下。

### 2.编译

```plain
platon-truffle compile
```

## 部署

### 1.修改配置

修改配置文件truffle-config.js，将连接配置修改成真实连接

```plain
networks: {
    development: {
       host: "127.0.0.1",     // 区块链所在服务器主机
       port: 6789,            // 链端口号
       network_id: "*",       // Any network (default: none)
       from: "lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n", //部署合约账号的钱包地址
       gas: 9000000,
       gasPrice: 50000000004,
    },
}
```

### 2.解锁钱包账户

进入platon-truffle控制台

```plain
platon-truffle console
```
导入私钥（如果之前已导入可以跳过此步骤）
```plain
web3.platon.personal.importRawKey("您的钱包私钥","您的钱包密码");
```
导入成功将看到私钥对应的地址：
```plain
'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n'
```
解锁钱包账户
```plain
web3.platon.personal.unlockAccount('您的钱包地址','您的钱包密码',999999);
```
解锁成功将看到如下信息
```plain
true
```
解锁
如果是使用mtool创建的keystore，使用以下命令获得私钥：

```plain
platonkey inspect --private PATH
```
如果是ATON钱包创建的账号，在钱包中导出私钥
### 3. 部署合约

```plain
platon-truffle deploy --wasm --contract-name HelloWorld --params '[[["1"], "2", "3"]]'
```
 部署成功后，将看到类似如下信息：
```plain
receipt:  { blockHash:
   '0x3dd0f13fbc1771c412ea91456fe084edc3ccc2331597782904d5008cb86c2424',
  blockNumber: 3950026,
  contractAddress: 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h',
  cumulativeGasUsed: 197615,
  from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',
  gasUsed: 197615,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash:
   '0xd276365d362a43c0caccc4ce74c72d2b2b27a751e22cbd8a5467ca365e638002',
  transactionIndex: 0 }
contract HelloWorld deployed successfully
======================

   > transactionHash:     0xd276365d362a43c0caccc4ce74c72d2b2b27a751e22cbd8a5467ca365e638002
   > contract address:    lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h
   > block number:        3950026
   > block timestamp:     1619596398292
   > account:             lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n
   > balance:             7199525199077690925044
   > gas limit:           9424776
   > gas used:            197615
   > gas price:           0.00000002 LAT
   > total cost:          0.0039523 LAT
```
 
## 测试

### 1. 进入platon-truffle控制台

```plain
platon-truffle console
```

*以下调用查询将在truffle控制台中进行

### 2. 构建合约对象

```plain
var abi = [{"baseclass":[],"fields":[{"name":"head","type":"string"}],"name":"message","type":"struct"},{"baseclass":["message"],"fields":[{"name":"body","type":"string"},{"name":"end","type":"string"}],"name":"my_message","type":"struct"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];

var contractAddr = 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h';
 
var helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 });
```
说明：
* `abi` 是合约提供给外部调用时的接口，每个合约对应的abi在编译后的文件中，如：`HelloWorld/build/contracts/HelloWorld.abi.json`中可以找到
* `contractAddr` 在部署合约成功后有一个contract address
* `helloWorld`就是构建出来与链上合约交互的合约对象抽象
### 3. 调用合约

```plain
helloworld.methods.add_message([["5"], "6", "7"]).send({
    from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',gas: 999999
}).on('receipt', function(receipt) {
    console.log(receipt);
}).on('error', console.error);
```
调用合约命令说明：
* `helloWorld`是之前构建的合约对象
* `methods`固定语法,后面紧跟合约的方法名
* `add_message`是我们HelloWorld合约中的一个方法，有一个自定义my_message类型的入参
* `from`调用者的钱包地址
* `gas`gas值
* `on`是监听合约处理结果事件，此处如果成功将打印回执，失败输出错误日志
函数调用成功，将会看到如下信息：

```plain
{ blockHash:
   '0x179193fcd13e44dd5d5e491ae6bc514052d3cf290e5e1f47fecf8aafc61d9da1',
  blockNumber: 3950299,
  contractAddress: null,
  cumulativeGasUsed: 68359,
  from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',
  gasUsed: 68359,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h',
  transactionHash:
   '0x31113fc77fb2f917891f24ac90f115262fd2d925268da2c4ee4d073e7c4dcd73',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x179193fcd13e44dd5d5e491ae6bc514052d3cf290e5e1f47fecf8aafc61d9da1',
  blockNumber: 3950299,
  contractAddress: null,
  cumulativeGasUsed: 68359,
  from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',
  gasUsed: 68359,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h',
  transactionHash:
   '0x31113fc77fb2f917891f24ac90f115262fd2d925268da2c4ee4d073e7c4dcd73',
  transactionIndex: 0,
  events: {} }
```

### 4. 查询合约

```plain
helloworld.methods.get_message_body(0).call() 
```
查询合约命令说明：
* `helloWorld`是之前构建的合约对象
* `methods`指定将获取合约中的方法
* `get_message_body`是我们HelloWorld合约中的一个方法，该方法有一个int类型的入参
* `call`指明是查询方法
### 5.其他

这个只是一个非常简单的合约，目的是让大家对PlatON的WASM合约有个基本的认识，后面将会为大家讲解如何进行跨合约调用，敬请期待。

想要获得更多关于合约开发的资料，请前往[官网文档](https://devdocs.platon.network/docs/zh-CN/WASM_Smart_Contract/)。

*本教程贡献者 @[xiyu](https://github.com/xiyu1984)*
