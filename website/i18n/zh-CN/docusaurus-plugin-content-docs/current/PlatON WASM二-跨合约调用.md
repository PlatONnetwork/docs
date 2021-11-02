---
id: WASM_Contract_2
title: PlatON WASM合约开发（二）—— 跨合约调用
sidebar_label: WASM跨合约调用
---


## 概述
基于PlatON进行生态开发，智能合约是关键。这篇文章将会为大家介绍PlatON WASM智能合约的跨合约调用。本教程将用到我们在入门篇中（做成超链接）教程内容，如果还没有安装开发环境，或者还未进行合约部署，可以参见入门篇。

![](/img/zh-CN/WasmTutorials.assets/wasm-ferris.png)

## 合约开发
### 编写合约
#### 代码
在contracts目录下新建文件Cross.cpp，合约内容如下：

```
#undef NDEBUG
#include <platon/platon.hpp>
#include <string>
using namespace platon;

CONTRACT Cross : public platon::Contract
{
public:
	ACTION void init(){}

	ACTION void add_message(std::string a, std::string b, std::string c)
	{
		auto address_pair = make_address("lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h");
		char param[50];
		sprintf(param, "[[[\"&s\"], \"&s\", \"&s\"]]", a.c_str(), b.c_str(), c.c_str());
		auto result = platon_call(address_pair.first, uint32_t(0), uint32_t(0), "add_message", std::string(param));
		if (!result)
		{
			internal::platon_throw("add_message fail");
		}
	}

	CONST uint8_t get_message_size()
	{
		auto address_pair = make_address("lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h");
		if (address_pair.second)
		{
			DEBUG("address", address_pair.first.toString())
		}
		else
		{
			DEBUG("address error")
		}
		auto result = platon_call_with_return_value<uint8_t>(address_pair.first,
												uint32_t(0), uint32_t(0), "get_message_size");
		if (!result.second)
		{
			internal::platon_throw("cross call fail");
		}
		return result.first;
	}

	CONST std::string get_message_body(const uint8_t index)
	{
		auto address_pair = make_address("lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h");
		auto result = platon_call_with_return_value<std::string>(address_pair.first, uint32_t(0), uint32_t(0), "get_message_body", index);
		if (!result.second)
		{
			internal::platon_throw("cross call fail");
		}
		return result.first;
	}
};

PLATON_DISPATCH(Cross, (init)(add_message)(get_message_size)(get_message_body))
```
#### 代码说明
- 代码中我们用到了platon_call和platon_call_with_return_value方法，分别表示无返回调用和有返回合约调用。
- 更多的接口可以在~/.config/truffle/compilers/platon-cdt/platon.cdt/include/platon目录中找到，如合约调用文件为cross_call.hpp。
- make_address填入的地址是HelloWorld教程中部署的合约地址。
- make_address函数返回的是一个pair，需要根据second值判断地址是否获取成功。
- DEBUG可以用于调试输出，可以在节点日志中看到输出信息。
需要修改"lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h"为之前部署的HelloWorld合约地址

#### 编译
##### 注意
官方目前只发布了alaya版本的wasm编译器，在涉及到跨合约调用的时候，会出现地址编码问题，因此需要手动编译和安装platon版本的wasm编译器。
我们已经编译了最新版本的platon版本的wasm编译器，有需要的朋友可以下载并解压到~/.config/truffle/compilers目录下。

##### 执行编译命令
```
platon-truffle compile
```

### 部署
```
platon-truffle deploy --wasm --contract-name Cross
```

署成功后，将看到类似如下信息：
```
receipt:  { blockHash:
   '0x8602678fc1f9e1934e9505fc291e3021e5eff70513d37156bc9b9b87273cfb69',
  blockNumber: 3957166,
  contractAddress: 'lat1ypc40ulq7vqk2kle0wcr7gf2udlgkwpsta5e0d',
  cumulativeGasUsed: 322472,
  from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',
  gasUsed: 322472,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash:
   '0xf0a04748ca277ec7ceecc2910753bec270f802632d2743843b43cc8030a73bd8',
  transactionIndex: 0 }
contract Cross deployed successfully
======================

   > transactionHash:     0xf0a04748ca277ec7ceecc2910753bec270f802632d2743843b43cc8030a73bd8
   > contract address:    lat1ypc40ulq7vqk2kle0wcr7gf2udlgkwpsta5e0d
   > block number:        3957166
   > block timestamp:     1619603861743
   > account:             lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n
   > balance:             7199474719087690925044
   > gas limit:           9424776
   > gas used:            322472
   > gas price:           0.00000002 LAT
   > total cost:          0.00644944 LAT
```

### 测试
#### 1. 进入platon-truffle控制台
```
platon-truffle console
```

*以下调用查询将在truffle控制台中进行

#### 2. 构建合约对象
```
var abi = [{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":false,"input":[],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"a","type":"string"},{"name":"b","type":"string"},{"name":"c","type":"string"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];

var contractAddr = 'lat1ypc40ulq7vqk2kle0wcr7gf2udlgkwpsta5e0d';
 
var cross = new web3.platon.Contract(abi,contractAddr,{vmType: 1 });
```
##### 说明：
- abi是合约提供给外部调用时的接口，每个合约对应的abi在编译后的文件中，如：HelloWorld/build/contracts/Cross.abi.json中可以找到
- contractAddr在部署合约成功后有一个contract address
- cross就是构建出来与链上合约交互的合约对象抽象

#### 3. 调用合约
```
cross.methods.add_message("10", "11", "12").send({
    from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',gas: 999999
}).on('receipt', function(receipt) {
    console.log(receipt);
}).on('error', console.error);
```
##### 调用合约命令说明：
- cross是之前构建的合约对象
- methods固定语法,后面紧跟合约的方法名
- add_message是我们Cross合约中的一个方法，有3个std::string类型的入参
- from调用者的钱包地址
- gasgas值
- on是监听合约处理结果事件，此处如果成功将打印回执，失败输出错误日志
函数调用成功，将会看到如下信息：
```
{ blockHash:
   '0x50fac24f50f871260663997d66f99e7d4e66bd09edc3002cc00d2be8c0021bdc',
  blockNumber: 3957919,
  contractAddress: null,
  cumulativeGasUsed: 137365,
  from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',
  gasUsed: 137365,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat1ypc40ulq7vqk2kle0wcr7gf2udlgkwpsta5e0d',
  transactionHash:
   '0x8196f89cca8161b940b649008211c1cccea40edf0581d5088961c344382d3f31',
  transactionIndex: 0,
  events: {} }
```

#### 4. 查询合约
##### get_message_body
```
cross.methods.get_message_body(0).call() 
```
##### 查询合约命令说明：
- cross是之前构建的合约对象
- methods指定将获取合约中的方法
- get_message_body是我们HelloWorld合约中的一个方法，该方法有一个int类型的入参
call指明是查询方法

##### get_message_size
```
cross.methods.get_message_size().call() 
```
##### 查询合约命令说明：
- cross是之前构建的合约对象
- methods指定将获取合约中的方法
- get_message_size是我们HelloWorld合约中的一个方法，该方法没有参数
call指明是查询方法

想要获得更多关于合约开发的资料，请[前往官网文档](https://devdocs.platon.network/docs/zh-CN/WASM_Smart_Contract/)。

*本教程贡献者 @[xiyu](https://github.com/xiyu1984)*