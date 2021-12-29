---
id: WASM_Contract_6
title: PlatON WASM contract (六) - 代理机制中访问合约事件
sidebar_label: WASM代理机制中访问合约事件
---

## 概述
在《[PlatON上的WASM智能合约开发（5）——进阶（代理机制）](https://forum.latticex.foundation/t/topic/5116)》中向大家讲解了智能合约的代理机制，代理机制的使用必然会涉及到智能合约之间的跨合约调用（详见《[PlatON上的WASM智能合约开发（2）——跨合约调用》](https://forum.latticex.foundation/t/topic/4850)）。而事件是DApp进行链上合约、链下client交互的一种常见机制，在代理机制的使用过程中，交易型（PlatON WASM合约中通过ACTION修饰的方法）合约请求通常会涉及到业务合约事件的捕获与解析。当调用请求通过代理合约完成时，事件一般由实际的业务合约抛出。本文将通过相关案例，展示在合约代理机制的使用中，对合约事件的捕获解析，以及跨合约调用中对自定义参数的传递。PlatON在相关client SDK中提供了事件的解析机制，有关简单合约事件机制的讲解详见《[PlatON上的WASM智能合约开发（3）——事件机制](https://forum.latticex.foundation/t/topic/4852)》。


## 合约文件
### dataStruct.h：
```
#pragma once
#include <platon/platon.hpp>
#include <string>

struct MyStruct{
    int i;
    std::string s;
    PLATON_SERIALIZE(MyStruct, (i)(s))

    MyStruct(){
        i = 0;
        s = "";
    }
};
```
说明：
1. platon wasm合约底层提供了序列化机制，通过PLATON_SERIALIZE修饰的自定义数据结构可以在跨合约调用时作为参数进行传递；

### eventCalled.cpp：
```
#include <platon/platon.hpp>
#include <string>
#include "dataStruct.h"

class eventCalled: public platon::Contract{
public:
    PLATON_EVENT1(outCaller, std::string, int)

    ACTION void init(){}

    ACTION int outCall(MyStruct& ms){
        PLATON_EMIT_EVENT1(outCaller, "outside", ms.i);
        return 99;
    }
};

PLATON_DISPATCH(eventCalled, (init)(outCall))
```
说明：
1. 实际完成业务操作的合约，outCall方法以自定义数据结构MyStruct作为参数；
2. 在ACTION方法outCall执行时，会通过“outCaller”事件向client传递执行结果；

### outCaller.cpp：
```
#include "dataStruct.h"
#include <platon/platon.hpp>
#include <string>

class outCaller : public platon::Contract{
public:
    ACTION void init(std::string& contractAddr){
        auto rst = platon::make_address(contractAddr);
        if (!rst.second){
            //when the contractAddr is illegal, the proxy can not be used
            platon::internal::platon_throw("deploy failed!");
        }
        else{
            _contractAddr.self() = rst;
        }
    }

    ACTION void setContract(std::string& contractAddr){
        auto rst = platon::make_address(contractAddr);
        if (!rst.second){
            //when the contractAddr is illegal, the proxy can not be used
            platon::internal::platon_throw("deploy failed!");
        }
        else{
            _contractAddr.self() = rst;
        }
    }

    CONST std::string getContract(){
        return _contractAddr.self().first.toString();
    }

    ACTION int Call(){
        if (!(_contractAddr.self().second))
        {
            platon::internal::platon_throw("this contract init failed!");
            return -1;
        }

        auto ms = MyStruct();
        auto result = platon::platon_call_with_return_value<int>(_contractAddr.self().first, (unsigned int)(0), (unsigned int)(0), "outCall", ms);
        return result.first;
    }

    platon::StorageType<"contract"_n, std::pair<platon::Address, bool>>            _contractAddr;
};

PLATON_DISPATCH(outCaller, (init)(setContract)(getContract)(Call))
```
说明：
1. 该合约具备代理合约的部分功能，client通过调用Call接口，实际访问到业务合约的eventCalled::outCall方法；
2. 合约调用时，将传递自定义数据结构MyStruct。

## 合约调用
合约调用基于client-sdk-python实现，若在案例测试使用过程中遇到任何问题，可联系cross团队。

```
true = True
false = False
#调用需要提供开发网账户
from_address = '...'

eventCalledAddr = 'lat1npffkce3elp0ug80r85rz36y9gjkgevnculnyn'
eventCalled_abi = [{"anonymous":false,"input":[{"name":"topic","type":"string"},{"name":"arg1","type":"int32"}],"name":"outCaller","topic":1,"type":"Event"},{"constant":false,"input":[],"name":"init","output":"void","type":"Action"},{"baseclass":[],"fields":[{"name":"i","type":"int32"},{"name":"s","type":"string"}],"name":"MyStruct","type":"struct"},{"constant":false,"input":[{"name":"ms","type":"MyStruct"}],"name":"outCall","output":"int32","type":"Action"}]

outCallerAddr = 'lat1wtmjnquh4y08mpvrn0zd4c7hhyy0g9qpz58q8a'
outCaller_abi = [{"constant":false,"input":[{"name":"contractAddr","type":"string"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[],"name":"Call","output":"int32","type":"Action"},{"constant":false,"input":[{"name":"contractAddr","type":"string"}],"name":"setContract","output":"void","type":"Action"},{"constant":true,"input":[],"name":"getContract","output":"string","type":"Action"}]

def testEventWasm():
    w3 = Web3(HTTPProvider("http://127.0.0.1:6789"))
    platon = PlatON(w3)

    eventCalled = platon.wasmcontract(address=eventCalledAddr, abi=eventCalled_abi,vmtype=1)

    outCaller = platon.wasmcontract(address=outCallerAddr, abi=outCaller_abi,vmtype=1)
    #调用outCaller::Call()
    tx_hash = outCaller.functions.Call().transact({'from':from_address,'gas':1500000})
    tx_events_receipt = platon.waitForTransactionReceipt(tx_hash)

    #这里需要使用实际emit事件的合约获取events
    topic_param = eventCalled.events.outCaller().processReceipt(tx_events_receipt)
    print(topic_param)
```
说明：
1. 调用需要使用outCaller、eventCalled两个合约的abi；
2. 首先通过outCaller的abi调用outCaller::Call()方法；
3. 然后等待捕获eventCalled的“outCaller”事件，通过eventCalled的abi解析事件内容；
4. 调用需要连接开发网节点。

结果：
![](/img/zh-CN/WasmTutorials.assets/6-1.png)
说明：
1. python SDK会将事件结果解析成一个AtrributeDict结构，其中'arg1': 0在本案例中作为用户关心的处理结果返回。

## 总结
跨合约调用的事件机制比较简单，唯一需要注意的是在对事件进行解析时，需要使用实际抛出事件的合约abi才能正常解析。PlatON WASM合约对于需要在合约间调用时传递的参数，底层提供了序列化支持。

*本教程贡献者 @[xiyu](https://github.com/xiyu1984)*
