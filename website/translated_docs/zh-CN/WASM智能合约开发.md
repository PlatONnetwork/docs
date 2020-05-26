---
id: WASM_Smart_Contract
title: WASM智能合约
sidebar_label: WASM智能合约
---

PlatON区块链支持使用WebAssembly (WASM)来执行用户编写的智能合约，WASM是一种为栈式虚拟机设计的二进制指令集。WASM被设计为可供类似C/C++/Rust等高级语言的平台编译目标，最初设计目的是解决 JavaScript 的性能问题。WASM是由 W3C 牵头正在推进的 Web 标准，并得到了谷歌、微软和 Mozilla 等浏览器厂商的支持。

开发高性能和安全的智能合约，C++是最好的语言。PlatON WASM合约支持C++编写，同时在目前最为成熟的编译工具链clang/llvm的C/C++编译器基础上定制一个符合PlatON协议标准的编译器，本开发指南是从开发者角度介绍智能合约的开发流程和开发过程中需要注意的常见问题，引导开发者可以使用C++在PlatON网络快速开发出高质量的智能合约。

主要从以下几个方面进行讲解：

- [入门](#入门)
- [合约开发成本](#合约开发成本)
- [最佳实践](#最佳实践)
- [API](#api)
- [FAQ](#faq)

## 入门

### 概要

本教程主要是指导用户在PlatON上使用wasm语言创建简单的HelloWorld智能合约，通过platon-truffle编译，部署，调用此合约。


### platon-truffle开发工具介绍

platon-truffle是PlatON提供的一款能够在本地编译、部署、调用智能合约的工具，具体的安装及使用手册参见

- platon-truffle开发工具[安装参考](https://platon-truffle.readthedocs.io/en/v0.11.1/getting-started/installation.html#)
- platon-truffle开发工具[使用手册](https://platon-truffle.readthedocs.io/en/v0.11.1/)


### 创建HelloWorld合约

```c++
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
       from: "0x5b37dabedae06edb142257819fad207199986992",
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
导入成功将看到类似如下交易hash信息：
```
'0x79daa881cab1f73b3ceef5db1869231b416d6dd9'
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
  contractAddress: '0x0bf45390B486890486e6eB3F1D5C8e0840FD8B56',
  cumulativeGasUsed: 291314,
  from: '0x5b37dabedae06edb142257819fad207199986992',
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
   > contract address:    0x0bf45390B486890486e6eB3F1D5C8e0840FD8B56
   > block number:        70441
   > block timestamp:     1583247148341
   > account:             0x5b37dabedae06edb142257819fad207199986992
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
var contractAddr = '0x0bf45390B486890486e6eB3F1D5C8e0840FD8B56';
 
var helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 }); 
```

说明： 
- `abi` 是合约提供给外部调用时的接口，每个合约对应的abi在编译后的文件中，如：`HelloWorld/build/contracts/HelloWorld.json` 中可以找到
- `contractAddr` 在部署合约成功后有一个contract address
- `helloWorld` 就是构建出来与链上合约交互的合约对象抽象

**step3.**  调用合约

```javascript
helloworld.methods.add_message([["5"], "6", "7"]).send({
	from: '0x5b37dabedae06edb142257819fad207199986992',gas: 999999
}).on('receipt', function(receipt) {
	console.log(receipt);
}).on('error', console.error);
```

调用合约命令说明：
- `helloWorld` 是之前构建的合约对象
- `methods` 固定语法,指量后面紧跟合约的方法名
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
  from: '0x5b37dabedae06edb142257819fad207199986992',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0bf45390b486890486e6eb3f1d5c8e0840fd8b56',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: '0x5b37dabedae06edb142257819fad207199986992',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0bf45390b486890486e6eb3f1d5c8e0840fd8b56',
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

## 合约开发成本

### 概要


在区块链系统中，基于任何一条公链系统开发智能合约都涉及资源支出的开发成本。例如，在网络上部署/调用智能合约，进行能量转移，质押/委托等操作都需要花费一定的成本，不同的区块链网络开发成本不一样，在 `PlatON` 网络中运行着两种虚拟机EVM和WASM，在不同虚拟机上上开发智能合约的成本也是不一样的。本手册将重点介绍使用 `WASN` 虚拟机涉及到的成本使用，本文将用表格的形式对比小型合约、中型合约和大型合约的不同开发成本，同时将 `PlatON` 的 `EVM`/`WASM`虚拟机和以太坊虚拟机之间进行对比。在合约方面，使用一个简单的`SET/GET`功能的合约作为小型测试合约，中型合约示例将使用一个开源的[微博客](https://github.com/yep/eth-tweet)合约，而大型合约则是一个符合 `ERC20` 标准的智能合约。


#### 资源消耗

**简单set/get合约**

| 系统        | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗      | 备注              |
| :---------- | :------- | :------- | :------ | :------------------ | :------------ | :---------------- |
| PlatON-EVM  | 小型合约 | 0.3 kb   | 76953   | 5,000,000,000 `VON` | 384765 `gVON` | 0.000384765 `LAT` |
| Ethereum    | 小型合约 | 0.3 kb   | 127173  | 5,000,000,000 `wei` | 635865 `Gwei` | 0.000635865 `ETH` |
| PlatON-WASM | 小型合约 | 13.55 kb | 184043  | 5,000,000,000 `VON` | 920215 `gVON` | 0.000920215 `LAT` |


**微博客**

| 系统        | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗       | 备注              |
| :---------- | :------- | :------- | :------ | :------------------ | :------------- | :---------------- |
| PlatON-EVM  | 中型合约 | 2.08 kb  | 257065  | 5,000,000,000 `VON` | 1285325 `gVON` | 0.001285325 `LAT` |
| Ethereum    | 中型合约 | 2.08 kb  | 621385  | 5,000,000,000 `wei` | 3106925 `Gwei` | 0.003106925 `ETH` |
| PlatON-WASM | 中型合约 | 30.07 kb | 349713  | 5,000,000,000 `VON` | 1748565 `gVON` | 0.001748565 `LAT` |


**ERC20标准Token**

| 系统        | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗        | 备注              |
| :---------- | :------- | :------- | :------ | :------------------ | :-------------- | :---------------- |
| PlatON-EVM  | 大型合约 | 4.45 kb  | 552823  | 5,000,000,000 `VON` | 2764115  `gVON` | 0.002764115 `LAT` |
| Ethereum    | 大型合约 | 4.45 kb  | 1282171 | 5,000,000,000 `wei` | 6410855  `Gwei` | 0.006410855 `ETH` |
| PlatON-WASM | 大型合约 | 35.9 kb  | 486274  | 5,000,000,000 `VON` | 2431370  `gVON` | 0.00243137 `LAT`  |


### 小型合约示例

#### 简单set/get合约 

**EVM示例代码**

```
pragma solidity ^0.4.12;

contract SimpleTest {
    
	uint public age;
 
	function setAge(uint _input) public {
		age = _input;
	}
 
	function getAge() public constant returns (uint) {
		return age;
	}
}
```

字节码

```
608060405234801561001057600080fd5b50610117806100206000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063262a9dff146058578063967e6e65146080578063d5dcf1271460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e1565b005b60005481565b60008054905090565b80600081905550505600a165627a7a7230582079e51340567895e1097e1c9115e778c3d982b8e71b6997c57f1ba497c56c8b3b0029
```

字节大小：`311 byte => 0.3 kb`

-------------------

**WASM示例代码**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

CONTRACT SimpleStorage: public platon::Contract
{
	public:
		ACTION void init(){}
	
		ACTION void set(uint64_t input)
		{
			storedData.self() = input;		
		}
		
		CONST uint64_t get()
		{
			return storedData.self();
		}

	private:
		platon::StorageType<"sstored"_n, uint64_t> storedData;
};

PLATON_DISPATCH(SimpleStorage,(init)(set)(get))
```

字节码

[查看字节码](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/SimpleStorage_wasm.bin)

字节大小：`13882 byte => 13.55 kb`

-------------------

###### 创建&部署合约成本

PlatON-EVM

* Gas消耗: 76953
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  384765 `gVON`（0.000384765 `LAT`）

以太坊

* Gas消耗: 127173 
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  635865 `Gwei`（0.000635865 `ETH`）

PlatON-WASM

* Gas消耗: 184043
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  920215 `gVON`（0.000920215 `LAT`）

-----------------------------------

### 中型合约示例 

#### 微博客合约

**EVM示例代码**

[点击查看微博客账户合约](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/account.sol)


字节码

[查看字节码](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_wasm.bin)


字节大小： `2130.5 byte => 2.08 kb`

---------------

**WASM示例代码**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

// data structure of a single tweet.
struct Tweet{

	public:
		uint64_t timestamp;
		std::string tweetString;

	public:
		Tweet(){}
		Tweet(uint64_t &timestamp, const std::string &tweet):timestamp(timestamp), tweetString(tweet) {
		}

	public:
		PLATON_SERIALIZE(Tweet, (timestamp)(tweetString))
};

CONTRACT TweetAccount: public platon::Contract
{
	private:
		// "array" of all tweets of this account: maps the tweet id to the actual tweet.
		platon::StorageType<"smapping"_n, std::map<std::uint64_t, Tweet>> _tweets;
		// total number of tweets in the above _tweets mapping.
		platon::StorageType<"suint"_n, uint64_t> _numberOfTweets;
		// "owner" of this account: only admin is allowed to tweet.
		platon::StorageType<"saddress"_n, Address> _adminAddress;
	
	public:
		ACTION void init()
		{
			_numberOfTweets.self() = 0;
			_adminAddress.self() = platon::platon_caller();
		}
		
		// returns true if caller of function("sender") is admin.
		CONST bool isAdmin(){
			return platon::platon_caller() == _adminAddress.self();		
		}
	
		// create new tweet
		ACTION int64_t tweet(const std::string& tweetString) {
			int64_t result = 0;		
			if(!isAdmin()){
				// only owner is allowed to create tweets for this account.
				result = -1;
			} else if (tweetString.length() > 160) {
				// tweet contains more than 160 bytes.
				result = -2;
			} else {
				_tweets.self()[_numberOfTweets].timestamp = platon_timestamp();
				_tweets.self()[_numberOfTweets].tweetString = tweetString;
				_numberOfTweets.self() = _numberOfTweets.self() + 1;	
				result = 0; // success.		
			}
			return result;
		}

		CONST std::string getTweet(uint64_t tweetId){
			// returns two values 
			std::string tweetString = _tweets.self()[tweetId].tweetString;
			uint64_t timestamp = _tweets.self()[tweetId].timestamp;
			return tweetString;		
		}
	
		CONST std::string getLatestTweet() {
			// returns three values.
			std::string tweetString = _tweets.self()[_numberOfTweets.self() - 1].tweetString;
			uint64_t timestamp = _tweets.self()[_numberOfTweets.self() - 1].timestamp;
			uint64_t numberOfTweets = _numberOfTweets.self();
			return tweetString;		
		} 
		
		CONST Address getOwnerAddress() {
			return _adminAddress.self();		
		}

		CONST uint64_t getNumberOfTweets() {
			return _numberOfTweets.self();			
		}
		
		ACTION void adminRetrieveDonations(const Address& receiver) {
			if(isAdmin()){
				Address caddr = platon_address();
				Energon e = platon_balance(caddr);
				platon_transfer(receiver, e);
			}		
		}
		
		CONST Address caddr(){
			return platon_address();		
		}
	
		CONST std::string caddrBalance(Address receiver){
			//Address caddr = platon_address();
			Energon e = platon_balance(receiver);
			return std::to_string(e.Get());		
		}
			
		ACTION void adminDeleteAccount(){
			if(isAdmin()){
				// this is a predefined function, it deletes theh contract and returns all funds to the owner.	
				platon_destroy(_adminAddress.self());	
			}		
		}
};

PLATON_DISPATCH(TweetAccount,(init)(isAdmin)(tweet)(getTweet)(getLatestTweet)
(getOwnerAddress)(getNumberOfTweets)(adminRetrieveDonations)(adminDeleteAccount)
(caddr)(caddrBalance))
```

字节码

[查看字节码](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_wasm.bin)

字节大小： `30788` byte => 30.07 kb`

---------------

###### 创建&部署合约成本

PlatON-EVM

* Gas消耗: 257065
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  1285325 `gVON`（0.001285325 `LAT`）

以太坊

* Gas消耗: 621385 
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  3106925 `Gwei`（0.003106925 `ETH`）

PlatON-WASM

* Gas消耗: 349713
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  1748565 `gVON`（0.001748565 `LAT`）

------------------------

### 大型合约示例 

#### ERC20标准token合约

**EVM示例代码**

[点击查看ERC20标准的智能合约](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/token.sol)


字节码

[查看字节码](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_evm.bin)


字节大小： `4557.5 byte => 4.45 kb`

-----------------------------

**WASM示例代码**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class Token {
	public:
		// total amount of tokens
		platon::StorageType<"totalsupply"_n, uint64_t> totalSupply;
	
	public: // event
		// define: _from, _to, _value
		PLATON_EVENT2(Transfer, Address, Address, uint64_t);
		// define: _owner, _spender, _value
		PLATON_EVENT2(Approval, Address, Address, uint64_t);

	public:
		// @param _owner The address from which the balance will be retrieved
		// @return The balance.
		virtual uint64_t balanceOf(Address _owner) = 0;

		// @notice send '_value' token to `_to` from `msg.sender`
		// @param _to THe address of the recipient.
 		// @param _value The amount of token to be transferred.
		// @return Whether the transfer was successful or not.
		virtual bool transfer(Address _to, uint64_t _value) = 0;

		// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
		// @param _from The address of the sender.
		// @param _to The address of the recepient.
		// @param _value The amount of token to be transferred.
		// @return Whether the transfer was successful or not.
		virtual bool transferFrom(Address _from, Address _to, uint64_t _value) = 0;

		// @notice `msg.sender` approves `_spender` to spend `_value` tokens
		// @param _spender The address of the account able to transfer the tokens
		// @param _value The amount of tokens to be approved for transfer
		// @return Whether thee approval was successful or not.
		virtual bool approve(Address _spender, uint64_t _value) = 0;

		// @param _owner The address of the account owning tokens
		// @param _spender The address of the account able to transfer the tokens
		// @return Amount of remaining tokens allowed to spent.
		virtual uint64_t allowance(Address _owner, Address _spender) = 0;
};

// You should inherit from StandardTOken or, for a token like you would want
// to deploy in something like MIst, see HumanStandardToken.cpp.
// (This implements ONLY the standard functions and NOTHING else.
// If you deploy this, you won't have anthing useful.)
class StandardToken: public Token
{
	protected: 
		platon::StorageType<"balances"_n, std::map<Address, uint64_t>> balances;
		platon::StorageType<"allowed"_n, std::map<Address, std::map<Address, uint64_t>>> allowed;

	public:
		CONST uint64_t balanceOf(Address _owner) {
			return balances.self()[_owner];		
		}

		ACTION bool transfer(Address _to, uint64_t _value){
			// Default assumes totalSupply can't be over max(2^64 - 1)
			// If your token leaves out totalSupply and can issue more tokens as time goes on,
			// you need to check if it doesn't wrap.
			// Replace the if with this on instead.
			Address sender = platon_caller();
			if (balances.self()[sender] >= _value && _value > 0) {
				balances.self()[sender] -= _value;
				balances.self()[_to] += _value;
				PLATON_EMIT_EVENT2(Transfer, sender, _to, _value);
				return true;
			} else {
				return false;			
			}
		}

		ACTION bool transferFrom(Address _from, Address _to, uint64_t _value) {
			// same as above. Replace this line with the following if you want to protect against
			// wrapping uints.
			Address sender = platon_caller();
			if(balances.self()[_from] >= _value 
				&& allowed.self()[_from][sender] >= _value && _value > 0){
				balances.self()[_to] += _value;
				balances.self()[_from] -= _value;
				PLATON_EMIT_EVENT2(Transfer, _from, _to, _value);
				return true;
			} else {
				return false;			
			}
		}

		ACTION bool approve(Address _spender, uint64_t _value){
			Address sender = platon_caller();			
			allowed.self()[sender][_spender] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			return true;		
		}

		CONST uint64_t allowance(Address _owner, Address _spender){
			return allowed.self()[_owner][_spender];		
		}
};


CONTRACT LATToken: public platon::Contract, public StandardToken
{
	
	public:
		platon::StorageType<"name"_n, std::string> name;		// fancy name: eg PlatON Token
		platon::StorageType<"decimals"_n, uint8_t> decimals;	// HOw many decimals to show.
		platon::StorageType<"symbol"_n, std::string> symbol;	// An identifier: eg LTT
		platon::StorageType<"version"_n, std::string> version;	// 0.1 standard. Just an arbitrary versioning scheme.

	public:
		ACTION void init(uint64_t _initialAmount, const std::string& _tokenName,
			uint8_t _decimalUnits, const std::string& _tokenSymbol)
		{
			Address sender = platon_caller();
			balances.self()[sender] = _initialAmount;		// Give the creator all initial tokens.
			totalSupply.self() = _initialAmount;			// Update total supply.
			name.self() = _tokenName;						// Set the name for display purposes
			decimals.self() = _decimalUnits;				// Amount of decimals for display purposes
			symbol.self() = _tokenSymbol;					// Set the symbol for display purposes.
		}

		CONST std::string getName(){
			return name.self();		
		}

		CONST uint8_t getDecimals(){
			return decimals.self();		
		}

		CONST std::string getSymbol(){
			return symbol.self();		
		}

		CONST uint64_t getTotalSupply(){
			return totalSupply.self();		
		}
		
		// Approves and then calls the receiving contract.
		ACTION bool approveAndCall(Address _spender, uint64_t _value, const bytes& _extraData) {
			Address sender = platon_caller();
			allowed.self()[sender][_spender] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			// call the receiveApproval function on the contract you want to be notified. This 
			// crafts the function signature manually so one doesn't have to include a contract 
			// in here just for this.
			// define: receiveApproval(Address _from, uint64_t _value, Address _tokenContract, bytes& _extraDaa)
			// it is assumed that when does this that the call should succeed.
			return true;
		}
};

PLATON_DISPATCH(LATToken,(init)(balanceOf)(transfer)(transferFrom)(approve)(allowance)
(getName)(getDecimals)(getSymbol)(getTotalSupply)(approveAndCall))
```

字节码

[查看字节码](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_wasm.bin)


字节大小： `36764 byte => 35.9 kb`

-----------------------------

###### 创建&部署合约成本

PlatON-EVM

* Gas消耗: 552823
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  2764115 `gVON`（0.002764115 `LAT`）

以太坊

* Gas消耗: 1282171 
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  6410855 `Gwei`（0.006410855 `ETH`）

PlatON-WASM

* Gas消耗: 486274
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  2431370 `gVON`（0.00243137 `LAT`）

------------------------

## 最佳实践

### 介绍

本指南向用户介绍智能合约开发中需要关注的一些关键点,主要偏向于在实际开发中的实践.
用户可以通过本指南快速了解针对一笔交易如何合理的设置手续费, 如何避免被因交易失败
的同时损失手续费以及如何编码更加规范的智能合约.

### 费用合理设置

当需要在 `PlatON` 的主网上部署合约时, 需要设置一个合理的费用限制. 费用限制是指
`PlatON` 中智能合约部署/执行的能源消耗成本的上限. 该限制主要通过 `Gas` 完成,
`Gas` 是 `PlatON` 网络世界的燃料值, 它决定了 `PlatON` 网络生态系统的正常运行. 通
常使用 `Gas` 来衡量执行某些动作需要多少"工作量", 这些工作量就是为了执行该动作所
需要支付给 `PlatON` 网络的费用额度. 简单理解, `Gas` 是网络旷工的佣金, 并通过
`LAT` 的方式支付, 在网络上的任何交易, 合约执行, 数据存储, 都需要使用到 `Gas`.

PlatON 与以太坊区块链系统类似, 使用 `LAT` 进行支付和维护网络, 一枚 `LAT` 分为:
`mLAT/uLAT/gVON/mVON/kVON/VON`, 其中VON是最小单位.

`Gas` 主要由两个部分组成: GasLimit(限制)和GasPrice(单价). 其中 `GasLimit` 是用户
愿意为执行某个操作或确认交易支付的最大 `Gas` 消耗量(最少21,000). GasPrice是
`VON` 的数量, 用于愿意为每个 `Gas` 所支付的单价.

用户发送一笔交易时, 会设定 `GasLimit` 和 `GasPrice`, 二者的乘积(GasLimit *
GasPrice)是用户的交易成本, 同时该成本会作为佣金奖励给旷工.

交易设置的 `GasPrice` 越高, 则交易的执行优先级更高, 交易成本也会更大. 每笔交易在
完成后, 剩余未使用的Gas都会退回到发送者的地址账户中. 有一点要特别注意, 如果因为
`GasLimit` 设置过低导致交易执行失败, 此时的 `Gas` 不会被回退到用户地址, 用户依然
需要为这次失败的交易支付能量成本. 因此, 无论交易是否执行成功, 交易发送者都需要向旷工支付一定的计算费用.

在 `PlatON` 网络中, 默认最高 `Gas` 的限制为 `100,800,000`, 最低为 `22,000`, 过低或者过高都会导
致交易失败. 在部署大型合约或者运行复杂功能时, 可以将Gas的限制调高, 例如:
`1,000,000`. 如果是普通转账则设置为最低值即可. 具体的值需要根据合约的规模及复杂度
进行估算, 在合约发布前可以调用接口 `platon_estimateGas` 进行大概估算, 避免因不足而导致失败.

**LAT 单位转换**

| 单位     | VON值    | VON                                   |
| -------- | -------- | ------------------------------------- |
| VON      | 1        | 1                                     |
| kVON     | 1e3 VON  | 1,000                                 |
| mVON     | 1e6 VON  | 1,000,000                             |
| gVON     | 1e9 VON  | 1,000,000,000                         |
| microLAT | 1e12 VON | 1,000,000,000,000                     |
| milliLAT | 1e15 VON | 1,000,000,000,000,000                 |
| LAT      | 1e18 VON | 1,000,000,000,000,000,000             |
| kLAT     | 1e21 VON | 1,000,000,000,000,000,000,000         |
| mLAT     | 1e24 VON | 1,000,000,000,000,000,000,000,000     |
| gLAT     | 1e27 VON | 1,000,000,000,000,000,000,000,000,000 |


### 避免超时

在 `PlatON` 网络上发送交易, 没有超时的概念, 但是最终会根据所设置的 Gas 限制值停
止, 如果限制值低于合约部署所需要的消耗, 则交易发送失败, 同时会扣除对应的手续费.
手续费的设定不可能无限大, 因为在网络中, 区块本身有一个最大的 Gas 上限, 当交易的
`GasLimit` 超过该值时, 交易将无法被接收.

如果是针对已发布的合约执行 `call` 调用(call调用指合约逻辑内无状态变更操作), 存在
`5s` 超时的限制, 如果在 `5s` 内合约逻辑没有执行完成, 虚拟机会超时强制退出, 导致查询失败.

为避免部署合约交易失败, 请尝试将大型合约分成较小的块, 并根据需要相互引用. 为了避
免无限循环, 请注意常见的陷阱和递归调用.

### 非法操作处罚

如果智能合约不是通过标准有效的编译器编译合约或者随意的更改指令码, 都会导致操作码
无效. 此类合约不仅无法部署和执行成功, 而且还会产生 `GasLimit*GasPrice` 的全额惩
罚, 当次交易的手续费会全部被扣除, 这是一个力度很大的惩罚, 如果操作者没注意该点,
不断重试, 那么付出的成本会更高, 代价更重.

一般产生无效操作码有以下情况:

1. 对正常已编译出的合约手动更改了指令码
2. 合约编译器版本与网络锁支持的合约版本不一致
3. 使用浮点数运算

在 `PlatON` 网络中操作合约时, 请务必先确认当前网络所支持的智能合约版本, 然后选择对应版本对的编译器.

常规操作是使用 `PlatON` 官方提供的最新的Truffle/PlatON-CDT来编译/部署/执行合约,
同时在切换到主网操作前, 务必在测试网进行有效的验证.

### C/C++语言限制

**C/C++不支持的特性**

- 浮点数(float/double)
- typeid/dynamic_cast(-fno-rtti)
- try-catch(-fno-exeception)
- C++17之后的特性

**libc不支持的头文件**

- signal.h
- math.h
- locale.h
- errno.h
- uchar.h
- time.h

**libc++不支持的头文件**

- rand
- atomics
- thread
- random

### 编程规范

#### 命名规范

- 函数命名, 变量命名, 文件命名要有描述性
- 采用区块链行业内的术语
- 尽可能少的使用缩写, 如果一定使用, 则推荐使用公共缩写和习惯缩写等
- 文件名要全部小写, 可以包含下划线(`_`)或连字符(`-`)
- WASM智能合约, 文件名与合约名保持一致
- 类型名称的每个首字母均大写, 不包含下划线: `MyExcitingClass`, `MyExcitingEnum`
- 变量(包括函数参数)和数据成员一律小写, 单词之间用下划线连接. 类的成员变量以下划
  线结尾, 但结构体的就不用, 如: `a_local_variable`, `a_struct_data_member`,
  `a_class_data_memeber_`
- 声明为 `constexpr` 或 `const` 的常量, 或在合约执行过程中其值始终保持不变的, 命
  名时以 "k" 开头, 大小写混合. 例如:

  ```cpp
  const int kDaysInAWeek = 7;
  ```

- 常规函数使用大小写混合, 取值和设值函数则要求与变量名匹配:
  `MyExcitingFunctio()`, `MyExcitingMethod()`, `my_exciting_member_variable()`, `set_my_exciting_member_variable()`

- 枚举的命名应该和常量或宏一致: `kEnumName` 或 `ENUM_NAME`
- 如果你的命名实体与已有的C/C++实体相似, 可参考现有命名策略

#### 智能合约文件组织

文件组织规则:

- 一般超过1000行的程序代码就比较难以阅读, 尽量避免出现一个文件内代码行数过长的情
  况. 每个合约文件应只包含一个单一的合约类或合约接口.

文件组织顺序:

- 文件注释: 所有合约源文件在开头有一个注释, 其中列出文件的版权声明, 文件名, 功能
  描述及创建, 修改记录.
- 类或接口注释: 在类/接口定义之前应该进行注释, 包括类/接口的描述, 最新修改者, 版
  本号, 参考链接等.
- 类成员: 首先是公共级别的, 随后是保护级别的, 最后是私有级别.
- 成员函数：合约内的函数应该按功能分组, 而不应该按作用域或访问权限进行分组.

#### 特性使用建议

##### 结构体 vs. 类

仅当只有数据成员时使用 `struct`, 其他一概使用 `class`.

在 C++ 中 `struct` 和 `class` 关键字几乎含义一样. 我们为这两个关键字添加我们自
己的语义理解, 以便为定义的数据类型选择合适的关键字.

`struct` 用来定义包含数据的被动式对象, 也可以包含相关的常量, 但除了存取数据成员
之外, 没有别的函数功能. 并且存取功能是通过直接访问位域, 而非函数调用. 除了构造函
数, 析构函数, `Initialize()`, `Reset()`, `Validate()` 等类似的用于设定数据成员的
函数外, 不能提供其它功能的函数.

如果需要更多的函数功能, `class` 更适合. 如果拿不准, 就用 `class`.

##### 继承

使用组合常常比使用继承更合理. 如果使用继承的话, 定义为 `public` 继承.

所有继承必须是 `public` 的. 如果你想使用私有继承, 你应该替换成把基类的实例作为成员对象的方式.

不要过度使用实现继承. 组合常常更合适一些. 尽量做到只在 "is-a" 的情况下使用继承:
如果 Bar 的确 "是一种" Foo, Bar 才能继承 Foo.

##### 多重继承

多重继承尤其成问题，因为它通常会带来更高的性能开销 (实际上, 从单继承到多重继承的
性能下降通常可能大于从普通派发到虚拟调度的性能下降), 并且由于存在导致 "diamond" 的风
险”的继承模式，容易产生歧义，混淆和彻底的错误。

**强烈建议不要使用多重继承.**

##### move

C++11引入的 `std::move`, 能有效的把资源转移给其他对象. 在我们的实践中, 使用
`std::move` 能有效减少 `Gas` 的消耗, 特别是使用容器的时候. 在返回值时, 应当返回
右值引用并使用 `std::move` 将左值引用转换为右值引用, 以减少 `Gas` 消耗. 例如:

```cpp
std::vector<std::string>&& get_vec() {
    std::vector<std::string> v;
    // ignore
    return std::move(v); // very important
}
```

##### auto

`auto` 关键字能够通过初始化器自动推导其类型, 配合容器，迭代器使用能简化代码. 例如:

```cpp
std::map<std::string, std::string> my_map;
for (auto it = my_map.begin(); it != my_map.end(); it++) {
    // ignore
}
```

##### 引用参数

建议所有函数参数都使用引用参数. 引用参数可以减少不必要的复制, 减少不必要的内存分
配，对于我们的WASM虚拟机来说, 内存分配是一个昂贵的操作.

##### 容器

C++标准库提供了一些常用的容器(map, vector, list等等), 在使用时应当仔细阅读对应的接口文档. 特别需要注意的是 map 的 `operator[]` 操作符, 根据接口文档说明, `operator[]` 当 key 不存在时, 会执行插入动作. 对应合约开发来说, 使用 `StorageType` 存储 map 时, 不要通过 `operator[]` 判断 key 是否存在, 而应该通过 `find()`.

---

## API

### 区块Api

#### platon_block_hash()

```cpp
h256 platon::platon_block_hash(int64_t num)
```

根据区块高度获取区块哈希。

* **参数**
  * `num：`块的高度
* **返回值**
  * 哈希值

#### platon_block_number()

```cpp
uint64_t platon_block_number()
```

获取当前块的高度。

* **返回值**
  * 当前块的高度

#### platon_coinbase()

```cpp
Address platon::platon_coinbase()
```

获取矿工节点的哈希值。

* **返回值**
  * 矿工节点的哈希

#### platon_unix_timestamp()

```cpp
int64_t platon::platon_unix_timestamp()
```

获取当前块的Unix时间戳。

* **返回值**
  * 当前块的Unix时间戳（秒）

#### platon_gas_limit()

```cpp
uint64_t platon_gas_limit()
```

获取当前区块的 gas limit

* **返回值**
  * 当前区块的 gas limit

### 交易API

#### platon_gas_price()

```cpp
u128 platon::platon_gas_price()
```

获取交易的 gas price.

* **返回值**
  * 交易的 gas price

#### platon_gas()

```cpp
uint64_t platon_gas()
```

获取交易的 gas 值

* **返回值**
  * 交易的 gas 值

#### platon_caller_nonce

```cpp
uint64_t platon_caller_nonce()
```

获取交易的 nonce 值

* **返回值**
  * 交易的 nonce 值

#### platon_call_value()

```cpp
u128 platon::platon_call_value()
```

获取当前交易的 value 值。

* **返回值**
  * 当前交易的 value 值

#### platon_caller()

```cpp
Address platon::platon_caller()
```

获取交易的发起者

* **返回值**
  * 交易发起者地址

#### platon_origin()

```cpp
Address platon::platon_origin()
```

获取交易的原始发起者

* **返回值**
  * 交易原始发起者的地址

#### platon_address()

```cpp
Address platon::platon_address()
```

获取交易的合约地址

* **返回值**
  * 合约地址

### 帐户Api

#### make_address() 1/2

```cpp
template <size_t M> std::pair<Address, bool> make_address(const char (&str)[M])
```
CDT 默认识别的地址是主网地址也就是地址前缀为lat，如果要识别测试网地址前缀为lax，需要定义宏TESTNET，在合约第一行加上#define TESTNET即可。

将C风格字符串转换为地址对象。

* **参数**
  * `str：` C风格字符串
* **返回值**
  * 返回值为 pair，pair 的 second 表示成功或者失败，first 表示 Address 类型的地址。

#### make_address() 2/2

```cpp
std::pair<Address, bool> make_address(const std::string &str_address)
```
CDT 默认识别的地址是主网地址也就是地址前缀为lat，如果要识别测试网地址前缀为lax，需要定义宏TESTNET，在合约第一行加上#define TESTNET即可。

将字符串转换为地址对象。

* **参数**
  * `str：` 字符串
* **返回值**
  * 返回值为 pair，pair 的 second 表示成功或者失败，first 表示 Address 类型的地址

#### platon_balance()

```cpp
Energon platon::platon_balance(const Address & addr)
```

根据地址获取余额。

* **参数**
  * `addr：`地址
* **返回值**
  * 地址余额

#### platon_transfer()

```cpp
bool platon::platon_transfer(const Address &addr, const Energon &amount)
```

将Energon的金额转移到地址。

* **参数**
  * `addr：`帐户地址
  * `amount：`Energon的数量
* **返回值**
  * 如果传输成功则为true，否则为false

#### platon::Energon Class

Energo是货币相关操作类

* **公共成员函数**
  * `Energon (u128 n)`
      构造一个新的Energon。

  * `const u128 Get () const`
      获得一定量的Von。

  * `const bytes Bytes () const`
      获取值的字节，字节使用大端表示。

  * `Energon & Add (const u128 &v)`
      添加量的 Von。

  * `Energon & Add (const Energon &rhs)`
      两个 Energon 对象相加

  * `Energon & operator+= (const Energon &rhs)`
      实现运算符+ =

* **构造函数和析构函数**

  * `platon::Energon::Energon(u128 n)`
      构造一个新的Energon。
    * **参数**
      * `n：` Von 数量

* **成员函数功能**
  * `Energon& platon::Energon::Add(const Energon & rhs)`
       添加量的Von。

    * **参数**
      * `rhs：`Von的数量
    * **返回值**
      * Energon的引用

  * `Energon& platon::Energon::Add(const u128 & v)`
      添加量的Von。

    * **参数**
      * `v：`Von的数量
    * **返回值**
      * Energon的引用

  * `const bytes platon::Energon::Bytes() const`
        获取值的字节，字节使用大端表示。

    * **返回值**
      * 值的字节

  * `const u128 platon::Energon::Get() const`
        获得一定量的Von。

    * **返回值**
      * Von量

  * `Energon& platon::Energon::operator+= ( const Energon & rhs)`
        实现运算符+ =

    * **参数**
      * `rhs：`Energon对象
    * **返回值**
      * Energon的引用

#### platon::WhiteList< TableName > Class

```cpp
template<Name::Raw TableName>
class platon::WhiteList< TableName >
```

持久存储白名单工具。

* **模板参数**
  * `Name：`白名单名称，在同一合约中，该名称应唯一

* **构造函数和析构函数**

  * `template<Name::Raw TableName>
    platon::WhiteList< TableName >::WhiteList ()`

    构造一个新的清单。

* **公共成员函数**
  * `WhiteList ()`
        构造一个新的清单。

  * `void Add (const std::string &addr)`
      将地址添加到白名单。

  * `void Add (const Address &addr)`
      将地址添加到白名单。

  * `void Delete (const std::string &addr)`
      从白名单中删除地址。

  * `void Delete (const Address &addr)`
      从白名单中删除地址。

  * `bool Exists (const std::string &addr)`
      该地址是否存在于白名单中。

  * `bool Exists (const Address &addr)`
      该地址是否存在于白名单中。

* **成员函数功能**

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Add ( const Address & addr)`
        将地址添加到白名单。

    * **参数**
      * `addr：`帐户地址

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Add ( const std::string & addr)`
        将地址添加到白名单。

    * **参数**
      * `addr：`帐户地址

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Delete ( const Address & addr)`
      从白名单中删除地址。

    * **参数**
      * `addr：`帐户地址

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Delete ( const std::string & addr)`
      从白名单中删除地址。

    * **参数**
      * `addr：`帐户地址

  * `template<Name::Raw TableName>
    bool platon::WhiteList< TableName >::Exists ( const Address & addr)`
      该地址是否存在于白名单中。

    * **参数**
      * `addr：`帐户地址
    * **返回值**
      * 如果存在则为true，否则为false

  * `template<Name::Raw TableName>
    bool platon::WhiteList< TableName >::Exists ( const std::string & addr)`
      该地址是否存在于白名单中。

    * **参数**
      * `addr：`帐户地址
    * **返回值**
      * 如果存在则为true，否则为false

### 存储API

#### platon_set_state()

```cpp
void platon_set_state(const uint8_t *key, size_t klen, const uint8_t *value, size_t vlen)
```

设置状态对象

* **参数**
  * `key：`键
  * `Klen：`键的长度
  * `value：`值
  * `vlen：`值的长度

#### platon_get_state_length()

```cpp
size_t platon_get_state_length(const uint8_t *key, size_t klen)
```

获取键对应的值的长度

* **参数**
  * `key：`键
  * `Klen：`键的长度

* **返回值**
  * 键对应的值的长度

#### platon_get_state()

```cpp
size_t platon_get_state(const uint8_t *key, size_t klen, uint8_t *value, size_t vlen);
```

获取状态对象

* **参数**
  * `key：`键
  * `Klen：`密钥的长度
  * `value：`值
  * `vlen：`价值的长度

* **返回值**
  * 值的长度

#### platon::StorageType< StorageName, T > 模板类

```cpp
template<Name::Raw StorageName, typename T>
class platon::StorageType< StorageName, T >
```

* **模板参数**
  * `StorageName：`元素值名称，在同一合约中，该名称必须唯一
  * `T：`元素类型

* **公共成员功能**
  * `StorageType ()`
      构造一个新的存储类型对象

  * `StorageType (const T &d)`
      构造一个新的存储类型对象

  * `StorageType (const StorageType< StorageName, T > &)=delete`

  * `StorageType (const StorageType< StorageName, T > &&)=delete`

  * `~StorageType ()`
      销毁存储类型对象。刷新到区块链。

  * `T & operator= (const T &t)`

  * `template<typename P>
    bool operator== (const P &t) const`

  * `template<typename P>
    bool operator!= (const P &t) const`

  * `template<typename P>
    bool operator< (const P &t) const`

  * `template<typename P>
    bool operator>= (const P &t) const`

  * `template<typename P>
    bool operator<= (const P &t) const`

  * `template<typename P>
    bool operator> (const P &t) const

  * `template<typename P>
    T & operator^= (const P &t) const`

  * `template<typename P>
    T operator^ (const P &t) const`

  * `template<typename P>
    T & operator|= (const P &t) const`

  * `template<typename P>
    T operator| (const P &t) const`

  * `template<typename P>
    T & operator&= (const P &t) const`

  * `template<typename P>
    T operator& (const P &t) const`

  * `T operator~ () const`

  * `T & operator<< (int offset)`

  * `T & operator>> (int offset)`

  * `T & operator++ ()`

  * `T operator++ (int)`

  * `T & operator[] (int i)`

  * `template<typename P>
    T & operator+= (const P &p)`

  * `template<typename P>
    T & operator-= (const P &p)`

  * `T & operator* ()`

  * `T *  operator-> ()`

  * `operator bool () const`

  * `T get () const`

  * `T & self ()`

#### platon::db::Array< TableName, Key, N > 模板类

```cpp
template<Name::Raw TableName, typename Key, unsigned N>
class platon::db::Array< TableName, Key, N >
```

* **成员类**
  * `class const_iterator
    Constant iterator.`

  * `class const_reverse_iterator
    Constant reverse iterator.`

  * `class iterator
    Iterator.`

* **Public Types**
  * `typedef std::reverse_iterator< iterator >  reverse_iterator`

* **公共成员函数**
  * `Array ()`

  * `Array (const Array< TableName, Key, N > &)=delete`

  * `Array (const Array< TableName, Key, N > &&)=delete`

  * `Array< TableName, Key, N > & operator= (const Array< TableName, Key, N > &)=delete`

  * `~Array ()`

  * `iterator begin ()`
      迭代器开始位置

  * `iterator end ()`
      迭代器结束位置

  * `reverse_iterator rbegin ()`
      反向迭代器开始位置。

  * `reverse_iterator rend ()`
      反向迭代器结束位置。

  * `const_iterator cbegin ()`
      常量迭代器开始位置。

  * `const_iterator cend ()`
      常量迭代器最终位置。

  * `const_reverse_iterator crbegin ()`
      常数反向迭代器的起始位置。

  * `const_reverse_iterator crend ()`
      常数反向迭代器的最终位置。

  * `Key & at (size_t pos)`
      获取指定的position元素。

  * `Key & operator[] (size_t pos)`
      括号运算符。

  * `size_t  size ()`
      数组大小

  * `Key get_const (size_t pos)`
      获取Const对象。不要刷新以缓存。

  * `void  set_const (size_t pos, const Key &key)`
      设置Const对象，请勿刷新以缓存。

* **静态公共属性**
  * `static const std::string  kType = "__array__"`

#### platon::db::Map< TableName, Key, Value > 模板类

```cpp
template<Name::Raw TableName, typename Key, typename Value>
class platon::db::Map< TableName, Key, Value >
```

实现map操作，map模板。

* **模板参数**
  * `TableName:` map的名称，map的名称在每个合约中应该是唯一的。
  * `Key：`键类型
  * `Value：`值类型

  MapType::Traverse 默认值为Traverse，当Traverse需要额外的数据结构进行操作时，当不需要遍历操作时，将其设置为NoTraverse。

* **公共成员函数功能**
  * `Map ()`

  * `Map(const Map< TableName, Key, Value > &)=delete`

  * `Map(const Map< TableName, Key, Value > &&)=delete`

  * `Map< TableName, Key, Value > & operator= (const Map< TableName, Key, Value > &)=delete`

  * `~Map ()`
      销毁Map对象将数据刷新到区块链。

  * `bool insert (const Key &k, const Value &v)`
      插入新的键值对，更新为缓存。

  * `bool insert_const (const Key &k, const Value &v)`
      插入将不会更新到缓存的新键值对。适用于大量插入，插入后无需更新。

  * `Value  get_const (const Key &k)`
      获取Const对象，将不会加入缓存。

  * `Value & at (const Key &k)`
      获取值，将被添加到缓存中。

  * `void  erase (const Key &k)`
      删除键值对。

  * `Value & operator[] (const Key &k)`
      括号运算符。

  * `boolcontains (const Key &key)`
      检查容器中是否存在具有与key等效的键的元素。

  * `void  flush ()`
      将内存中的修改数据刷新到区块链。

* **静态公共属性**
  * `static const std::string  kType = "__map__"`

* **构造函数和析构函数**

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::Map ()`

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > & )`

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > && )`

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::~Map ()`

销毁Map对象将数据刷新到区块链。

* **成员函数功能**

  * `template<Name::Raw TableName, typename Key , typename Value >
    Value& platon::db::Map< TableName, Key, Value >::at ( const Key & k )`
      获取值，将被添加到缓存中。

    * **参数**
      
      * `k：`键
    * **返回值**
      
    * 值的引用
    * **示例：**
    
      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
    assert(map.at["hello"] == "world");
      ```
    
  * `template<Name::Raw TableName, typename Key , typename Value >
    bool platon::db::Map< TableName, Key, Value >::contains ( const Key & key )`
      检查容器中是否存在具有与key等效的键的元素。

    * **参数**
      
      * `k：`键
    * **返回值**
      
    * 如果存在这样的元素，则为true，否则为false。
    * **示例：**
    
      ```cpp
       typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
       MapStr map;
       map.["hello"] = "world";
     assert(map.contains("hello"));
      ```
    
  * `template<Name::Raw TableName, typename Key , typename Value >
    void platon::db::Map< TableName, Key, Value >::erase ( const Key & k )`
      删除键值对。

    * **参数**
      
      * `k：`键
  * **示例：**
    
      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
      map.erase("hello");
    ```
    
  * `template<Name::Raw TableName, typename Key , typename Value >
    void platon::db::Map< TableName, Key, Value >::flush ()`
    将内存中的修改数据刷新到区块链。

  * `template<Name::Raw TableName, typename Key , typename Value >
    Value platon::db::Map< TableName, Key, Value >::get_const ( const Key & k)`
    获取Const对象，将不会加入缓存。

    * **参数**
      
      * `k：`键
    * **返回值**
      
    * 价值
    * **示例：**
    
      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
    assert(map.get_const["hello"] == "world");
      ```
    
  * `template<Name::Raw TableName, typename Key , typename Value >
    bool platon::db::Map< TableName, Key, Value >::insert ( const Key & k,
    const Value & v)`
    插入新的键值对，更新为缓存。

    * **参数**
      * `k：`键
      * `v：`值
    * **返回值**
      
      * true插入成功，false插入失败
  * **示例：**
    
      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
      assert(map["hello"] == "world");
    ```
    
  * `template<Name::Raw TableName, typename Key , typename Value >
    bool platon::db::Map< TableName, Key, Value >::insert_const ( const Key & k,
    const Value & v)`
    插入将不会更新到缓存的新键值对。适用于大量插入，插入后无需更新。

    * **参数**
      * `k：`键
      * `v：`值
    * **返回值**
      
      * true插入成功，false插入失败
  * **示例：**
    
      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert_const("hello", "world");
      assert(map["hello"] == "world");
    ```
    
  * `template<Name::Raw TableName, typename Key , typename Value >
    Map<TableName, Key, Value>& platon::db::Map< TableName, Key, Value >::operator= ( const Map< TableName, Key, Value > & )`

  * `template<Name::Raw TableName, typename Key , typename Value >
    Value& platon::db::Map< TableName, Key, Value >::operator[] ( const Key & k)`
    括号运算符。

    * **参数**
      
      * `k：`键
    * **返回值**
      
    * 价值与获取价值
    * **示例：**
    
      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.["hello"] = "world";
      ```

* **成员变量**
  * `template<Name::Raw TableName, typename Key , typename Value >
    const std::string platon::db::Map< TableName, Key, Value >::kType = "__map__"`

#### template<Name::Raw TableName, typename T, typename... Indices> class platon::db::MultiIndex< TableName, T, Indices >

MultiIndex支持惟一索引和普通索引。惟一索引应该放在参数的第一个位置。结构需要提供与index字段对应的get函数。

* **成员函数功能**
  * `template<Name::Raw TableName, typename T , typename... Indices>const_iterator platon::db::MultiIndex< TableName, T, Indices >::cbegin()`
开始迭代器

    * **返回值**
      * const_iterator
    * **示例：**

    ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
    for (auto it = member_table.cbegin(); it != it_end; ++it){}
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices>
const_iterator platon::db::MultiIndex< TableName, T, Indices >::cend()`
结束迭代器

    * **返回值**
      * const_iterator
    * **示例：**

    ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
    for (auto it = member_table.cbegin(); it != it_end; ++it){}
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > size_t platon::db::MultiIndex< TableName, T, Indices >::count(const KEY &key)`

    * **返回值**
      * 获取与索引值对应的数据的数量
    * **示例：**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    auto count = member_table.count<"index2"_n>(uint8_t(10));
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda> std::pair<const_iterator, bool> platon::db::MultiIndex< TableName, T, Indices >::emplace(Lambda &constructor)`

    * **参数**
      * 数据项处理函数
    * **返回值**
      * 返回一个迭代器，该迭代器指示使用bool类型的插入是否成功。如果惟一索引冲突，则插入失败
    * **示例：**

    ```cpp
    struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
    member_table.emplace([&](auto &m) {
      m.age = 10;
      m.name = "hello";
      m.sex = 1;
    });
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> void platon::db::MultiIndex< TableName, T, Indices >::erase(const_iterator position)`
基于迭代器删除数据

    * **参数**
      * `position：`迭代器
    * **示例：**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
    IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                      IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                        IndexType::NormalIndex>>>
    member_table;
    auto vect_iter = member_table.find<"index2"_n>(uint8_t(10));
    member_table.erase(vect_iter[0]);
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > const_iterator platon::db::MultiIndex< TableName, T, Indices >::find(const KEY & key)`
找到数据，只有一个唯一的索引是可用的。

    * **参数**
      * `key：`索引值
    * **返回值**
      * 结果迭代器。如果没有找到值为cend()。
    * **示例：**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    auto vect_iter = member_table.find<"index2"_n>(uint8_t(10));
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName>auto platon::db::MultiIndex< TableName, T, Indices >::get_index()`
获取非唯一索引的索引对象。

    * **返回值**
      * 索引对象
    * **示例：**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    auto index = member_table.get_index<"index2"_n>();
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda >void platon::db::MultiIndex< TableName, T, Indices >::modify(const_iterator position,Lambda && constructor)`
基于迭代器修改数据，但不能修改所有与索引相关的字段。

    * **参数**
      * `position：`迭代器
      * `constructor：`更新目标对象的lambda函数
    * **示例：**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    member_table.modify(r.first, [&](auto &m) { m.sex = 15; });
    ```

### 合约API

#### platon_destroy()

```cpp
bool platon::platon_destroy (const Address & addr)
```

销毁合约。

* **参数**
  * `addr：`合约地址
* **返回值**
  * 如果销毁成功，则为true，否则为false

#### platon_migrate_contract()

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_migrate_contract ( Address & addr,
const bytes & init_args,
value_type  value,
gas_type  gas)
```

迁移合约。

* **参数**
  * `addr：`新合约的地址
  * `init_args：`输入参数
  * `value：`转账金额
  * `gas：`支付此交易的gas金额
* **返回值**
  * 如果迁移成功，则为true，否则为false

#### cross_call_args()

```cpp
template<typename... Args>
bytes platon::cross_call_args ( const std::string & method,
const Args &...  args)  
```

构造跨合约调用参数。

* **参数**
  * `method：`被调用合约的方法名称
  * `args：`对应于合约方法的参数
* **返回值**
  * 参数字节数组

#### platon_call() 1/2

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_call ( const Address & addr,
const bytes & paras,
const value_type & value,
const gas_type & gas)  
```

正常的跨合约调用。

* **参数**
  * `addr：`要调用的合约地址
  * `paras：`使用函数cross_call_args构造的合约参数
  * `gas：`对应的合约方法估计消耗的gas
  * `value：`转移到合约的金额
* **返回值**
  * 调用成功或失败

#### platon_call() 2/2

```cpp
template<typename return_type , typename value_type , typename gas_type , typename... Args>
decltype(auto) platon::platon_call ( const Address & addr,
const value_type & value,
const gas_type & gas,
const std::string & method,
const Args &...  args
)
```

正常的跨合约调用。

* **参数**
  * `addr：`要调用的合约地址
  * `value：`转移到合约的金额
  * `gas：`对应的合约方法估计消耗的gas
  * `method：`被调用合约的方法名称
  * `args：`对应于合约方法的参数
* **返回值**
  
  * 合约方法* **返回值**值以及执行是否成功
* **示例：**

   ```cpp
   auto result =
   platon_call<int>(Address("0xEC081ab45BE978A4A630eB8cbcBffA50E747971B"),
   uint32_t(100), uint32_t(100), "add", 1,2,3);
   if(!result.secod){
     platon_throw("cross call fail");
   }
   ```

#### platon_delegate_call() 1/2

```cpp
template<typename gas_type >
bool platon::platon_delegate_call ( const Address & addr,
const bytes & paras,
const gas_type & gas
)  
```

跨合约代理调用。

* **参数**
  * `addr：`要调用的合约地址
  * `paras：`使用函数cross_call_args构造的合约参数
  * `gas：`对应的合约方法估计消耗的gas
* **返回值**
  * 调用成功或失败

#### platon_delegate_call() 2/2

```cpp
template<typename return_type , typename gas_type , typename... Args>
decltype(auto) platon::platon_delegate_call ( const Address & addr,
const gas_type & gas,
const std::string & method,
const Args &...  args)  
```

跨合约代理调用。

* **参数**
  * `addr：`要调用的合约地址
  * `gas：`对应的合约方法估计消耗的gas
  * `method：`被调用合约的方法名称
  * `args：`对应于合约方法的参数
* **返回值**
  
  * 合约方法* **返回值**值以及执行是否成功
* **示例：**

  ```cpp
  auto result =
  platon_delegate_call<int>(Address("0xEC081ab45BE978A4A630eB8cbcBffA50E747971B"),
   uint32_t(100), "add", 1,2,3);
   if(!result.secod){
     platon_throw("cross call fail");
   }
  ```

#### get_call_output()

```cpp
template<typename T >
void platon::get_call_output ( T & t)
```

获取跨合约调用合约方法的返回值。

* **模板参数**
  * `T：`输出值类型
* **参数**
  * `t：`合约方法返回的值

#### platon_event

```cpp
void platon_event(const uint8_t *topic, size_t topic_len, const uint8_t *args,
                  size_t args_len);
```

发布事件

* **参数**
  * `topic：`事件的主题
  * `topic_len：`主题的长度
  * `args：`参数
  * `args_len：`参数的长度

### 异常API

#### platon_panic

```cpp
void platon_panic(void);
```

终止交易，扣除交易的所有gas

#### platon_revert

```cpp
void platon_revert(void);
```

终止交易并扣除消耗的gas

### 其他API

#### platon_sha3()

```cpp
h256 platon::platon_sha3 ( const bytes & data )
```

Sh3算法。

* **参数**
  * `data：`二进制数据
* **返回**
  * 数据哈希

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

| 类型               | ABI          |
| ------------------ | ------------ |
| bool               | bool         |
| uint8\_t           | uint8        |
| uint16\_t          | uint16       |
| uint32\_t          | uint32       |
| uint64\_t          | uint64       |
| int8\_t            | int8         |
| int16\_t           | int16        |
| int32\_t           | int32        |
| int64\_t           | int64        |
| bytes              | uint8\[\]    |
| std::string        | string       |
| std::vector<T>     | T\[\]        |
| std::array\[T, N\] | T\[N\]       |
| std::pair<T, U>    | pair<T, U    |
| std::set<T>        | set<T>       |
| std::map<T, V>     | map<T, V>    |
| std::list<T>       | list<T>      |
| FixedHash<N>       | FixedHash<N> |
| u128               | uint128      |
| bigint             | uint128      |


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








