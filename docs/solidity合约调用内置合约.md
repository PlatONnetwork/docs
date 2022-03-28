---
id: Solidity_Inner_Contract
title: Call Inner Contract
sidebar_label: Call Inner Contract
---

### Introduction
Platon has a built-in [system contract](/docs/PlatON_system_contract),Support for SOLIDITY cross-contract calls, can be called by the following method:

``<address>.call(...) returns (bool)``:
    Low-level functions `` Call``, return `` false``, send all available GAS, adjustable.

``<address>.callcode(...) returns (bool)``：
   Low-level functions `` Callcode``, return `` false``, send all available GAS, adjustable.

``<address>.delegatecall(...) returns (bool)``:
   Emit a low-level function `` delegateCall``, return `` false``, send all available GAS, adjustable.

Or call the Call operating code by inline assembly.

### Code example
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

Note: The RLP codes are required for the parameters of the system contract, so it is recommended to complete it under the chain.
