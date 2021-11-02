---
id: WASM_Contract_3
title: PlatON WASM合约开发（三）—— 事件机制
sidebar_label: WASM事件机制
---

## 概述
智能合约是部署在区块链上 DApp 生态应用的“后台”，DApp 客户端程序在与合约协同工作时，必然会涉及到消息的交互，这些消息可能是所请求的数据、处理结果、控制指令等。交互方式包括同步调用（CONST）类型的接口，这类接口不能改变链上的状态，可直接获取到处理返回值；异步调用（ACTION）类型的接口，这些接口需要通过发送交易完成调用，可以改变链上的状态。事件机制一般在ACTION类型的接口中使用（CONST类型接口中也可使用事件机制），调用返回值可通过事件的emit发送出来，使用者可通过异步调用获取到处理结果。
区块链是去中心化的系统，智能合约也是链上状态的一种，每个节点都保存了链上的状态。本质上，CONST类型的接口，其执行实际是在client注册的节点上直接进行完成的（因为不会修改链上状态）；而ACTION类型的接口，由于会修改链上状态，因此需要通过发起交易，由链上打包该交易的共识节点来执行。

## 合约代码
```
#include <platon/platon.hpp>
#include <string>
#include <vector>
using namespace std;

class inputParams
{
public:
    inputParams(){}
    inputParams(std::vector<int> vParams)
    {
        myParams = vParams;
    }

public:
    std::vector<int> myParams;
    PLATON_SERIALIZE(inputParams, (myParams))
};

CONTRACT simpleOps: public platon::Contract{
public:
    //PLATON事件机制，这里采用EVENT1，需要在事件名称后面，包含一个std::string类型的topic_type
    PLATON_EVENT1(Add, std::string, uint32_t)
    PLATON_EVENT1(call2, std::string, int)
    PLATON_EVENT1(put, std::string, int)
    PLATON_EVENT1(clear, std::string, uint32_t)

    ACTION void init(const inputParams& ipa){
        iParams.self() = ipa;
    }

    CONST std::vector<int> getParams(){
        return iParams.self().myParams;
    }

    CONST int makeCall(){
        std::vector<int> params = iParams.self().myParams;
        int rst = 0;
        for (auto itr = params.begin(); itr != params.end(); ++itr)
        {
            rst += *itr;
        }
        return rst;
    }

    ACTION void putElement(int ele){
        iParams.self().myParams.push_back(ele);
        //emit事件，在sdk中可以捕捉该事件，一般可将需要传递的信息作为第三个参数
        PLATON_EMIT_EVENT1(put, "putElement" , ele);
    }

    ACTION void clearElement(){
        if (!iParams.self().myParams.empty())
        {
            iParams.self().myParams.clear();
        }
        uint32_t returnValue = 73;
        PLATON_EMIT_EVENT1(clear, "clearElement" , returnValue);
    }

    ACTION int AddCalc(){
        int rst = 0;
        for (auto itr = iParams.self().myParams.begin(); itr != iParams.self().myParams.end(); ++itr)
        {
            rst += *itr;
        }

        PLATON_EMIT_EVENT1(Add, "AddCalc", rst);
        return rst;
    }

    CONST int makeCall2(int a, int b){
        int c = a + b;
        PLATON_EMIT_EVENT1(call2, "makeCall2", c);
        return c;
    }

private:
    platon::StorageType<"Params"_n, inputParams> iParams;
};
//platon wasm合约的外部入口
PLATON_DISPATCH(simpleOps, (init)(getParams)(makeCall)(putElement)(clearElement)(AddCalc)(makeCall2))

```
说明：
1. 合约源文件名为main.cpp；
2. PlatON提供了四种合约事件：PLATON_EVENT0、PLATON_EVENT1、PLATON_EVENT2、PLATON_EVENT3，其区别在于需要输入的topic_type的数量，本文中的合约采用了PLATON_EVENT1，仅需要1个std::string类型的topic_type；
3. 上面的WASM合约非常简单，具有一定的代表性，可保存多个int型的元素，提供对这些元素求和的接口。

## 在platon-truffle进行合约部署与调用
### 合约部署：

![](/img/zh-CN/WasmTutorials.assets/3-1.png)

说明：
1. 合约需要编译和部署后才能使用，编译和部署方式详见https://mp.weixin.qq.com/s/66mdamOzGBYGrNy09m_GHg，这里需要注意的是，init方法需要传入inputParams类型，而inputParams的构造函数需要传入std::vector vParams作为参数，因此在部署合约时，需要以'[[[73, 8]]]'做为初始化参数；
2. 部署成功的信息如上图中所示。

### 创建合约对象实例：

![](/img/zh-CN/WasmTutorials.assets/3-2.png)

说明：
1. 创建合约对象实例需要abi、合约地址、合约类型作为参数，{vmType:1}表示所创建的是wasm合约；
2. 创建成功后，在console中调用getParams接口，可以看到当前存在的元素为部署合约是传入的初始化元素集合。

### 调用接口（向合约中插入元素）：

![](/img/zh-CN/WasmTutorials.assets/3-3.png)

说明：
1. 调用putElement，插入元素；
2. 当交易尚未完成时，虽然插入操作已经返回，但链上状态尚未改变；

### 执行加法操作（AddCalc、makeCall、makeCall2）：

![](/img/zh-CN/WasmTutorials.assets/3-4.png)

说明：
1. AddCalc属于ACTION接口（需要通过交易完成），执行了求元素和的操作，但其结果无法直接通过取返回值获得；
2. makeCall和makeCall2属于CONST接口，执行后可直接通过返回值获得结果。

在platon-truffle中能够进行基本的操作，但是对于通过交易调用的接口，很难获取到处理的结果，即捕捉到事件中真正想要的信息，这一点需要通过client-sdk实现。

注：node.js的SDK需要通过websocket来进行连接。

## 在 client-sdk 中进行合约调用，使用事件机制
注：本文的用例都基于 python 的 client-sdk 进行编写，关于 python SDK 的官方文档参见： https://devdocs.platon.network/docs/zh-CN/Python_SDK/

### 需要导入的模块如下：
```
from client_sdk_python import Web3, HTTPProvider, WebsocketProvider
from client_sdk_python.eth import PlatON
from hexbytes import HexBytes
```

### 执行 clear 操作，清空合约上的列表，并捕获 clear 事件：
```
def testClear():
    w3 = Web3(HTTPProvider("http://47.105.180.114:6789"))
    platon = PlatON(w3)
    hello = platon.wasmcontract(address=contractAddr, abi=cabi,vmtype=1)

    tx_hash = hello.functions.clearElement().transact({'from': from_address, 'gas': 999999})

    tx_receipt = platon.waitForTransactionReceipt(tx_hash)

    topic_param = hello.events.clear().processReceipt(tx_receipt)
    print(topic_param)
```
说明：
1. tx_hash为交易哈希值，通过它可以获取到tx_receipt交易收据，交易收据用于获取事件主题名称以及事件值；
2. topic_param的具体形式如下文输出所示；
3. 由于涉及到交易的合约调用，需要通过waitForTransactionReceipt来等待相关交易的完成；
4. clear()即为想要捕获的事件。

#### 输出：
```
(AttributeDict({'args': AttributeDict({'topic': 'clearElement', 'arg1': 73}), 'event': 'clear', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0x988c09572de8af93884daf2ed00a701835d3e9029fd780e3ed9ef5c5201b46dd'), 'address': 'lat1ktum8z9m9j4pz0l0gytqqrfgt8uv9sxnptxg9d', 'blockHash': HexBytes('0xa8595637bf8c5a12038a3c06cae28726f83f36201fec6270599a5a0d9ade432f'), 'blockNumber': 4689207}),)
```
说明：
1. ”'arg1': 73“即为捕获的clear事件中，传递出来的用户感兴趣的结果；
2. ”'topic': 'clearElement'“为返回的事件topic_type。

### 执行putElement向合约插入元素，通过事件返回所插入的值
```
def testOps():
    w3 = Web3(HTTPProvider("http://47.105.180.114:6789"))
    platon = PlatON(w3)
    hello = platon.wasmcontract(address=contractAddr, abi=cabi,vmtype=1)

    tx_hash = hello.functions.putElement(11).transact({'from': from_address, 'gas': 999999})

    tx_receipt = platon.waitForTransactionReceipt(tx_hash)

    topic_param = hello.events.put().processReceipt(tx_receipt)
    print(topic_param)
```
说明：
1. 通过捕获”put“事件，获取合约调用所传递出来的感兴趣的结果。

#### 输出：

![](/img/zh-CN/WasmTutorials.assets/3-5.png)

说明：
1. 在本用例中，三次调用了putElement操作，分别传入了数值13、12、11。

### 调用AddCalc操作，计算元素的和：
```
def testAdd():
    w3 = Web3(HTTPProvider("http://47.105.180.114:6789"))
    platon = PlatON(w3)
    hello = platon.wasmcontract(address=contractAddr, abi=cabi,vmtype=1)

    tx_hash = hello.functions.AddCalc().transact({'from': from_address, 'gas': 999999})

    tx_receipt = platon.waitForTransactionReceipt(tx_hash)

    topic_param = hello.events.Add().processReceipt(tx_receipt)
    print(topic_param)
```
说明：
1. 实际上，在执行完hello.functions.AddCalc().transact(...)后，可以根据自身业务需求，进行其他操作，并行等待waitForTransactionReceipt(...)的执行，成功后可通过事件”Add“获取执行结果。

#### 输出：
```
(AttributeDict({'args': AttributeDict({'topic': 'AddCalc', 'arg1': 36}), 'event': 'Add', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0x9a609d616de9d1243ca75fac8e41268e9b83744418460080fafb38bb1a63b0f9'), 'address': 'lat1ktum8z9m9j4pz0l0gytqqrfgt8uv9sxnptxg9d', 'blockHash': HexBytes('0x566e03fa9a8581945c53970ea18ba769502d29bfdecda5c50a5437b68f029463'), 'blockNumber': 4690710}),)
```
说明：
1. 事件中获取的”'arg1': 36“，为事件传递信息中用户感兴趣的结果，在本例中为元素的和。

**目前，PlatON官方正在对python的client sdk进行持续的优化，相信未来将能够更加高效的支撑多样化应用生态的开发！**

*本教程贡献者 @[xiyu](https://github.com/xiyu1984)*