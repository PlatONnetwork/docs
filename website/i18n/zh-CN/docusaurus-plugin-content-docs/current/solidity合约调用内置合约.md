---
id: Solidity_Inner_Contract
title: 调用内置合约
sidebar_label: 调用内置合约
---

### 简介
PlatON内置了一些[系统合约](/docs/zh-CN/PlatON_system_contract),支持solidity跨合约调用,可通过如下方法调用:

``<address>.call(...) returns (bool)``:
    发出低级函数 ``CALL``，失败时返回 ``false``，发送所有可用 gas，可调节。

``<address>.callcode(...) returns (bool)``：
    发出低级函数 ``CALLCODE``，失败时返回 ``false``，发送所有可用 gas，可调节。

``<address>.delegatecall(...) returns (bool)``:
    发出低级函数 ``DELEGATECALL``，失败时返回 ``false``，发送所有可用 gas，可调节。

或者通过内联汇编的call操作码调用.

### 代码示例
```
pragma solidity ^0.5.13;

contract PlatonInner {

    bytes returnValue;

    function assemblyCallppos(bytes memory data,address addr) public {
        uint256 len = data.length;
        uint retsize;
        bytes memory resval;
        assembly {
            if iszero(call(gas, addr, 0,  add(data, 0x20), len, 0, 0)) {
                invalid()
            }
            retsize := returndatasize()
        }
        resval = new bytes(retsize);
        assembly {
            returndatacopy(add(resval, 0x20), 0, returndatasize())
        }
        returnValue = resval;
    }

    function getReturnValue() public view returns(bytes memory ){
        return returnValue;
    }

}
```

注: 由于系统合约的参数需要rlp编解码,因此建议在链下完成.
