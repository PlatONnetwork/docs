---
id: adapting_to_new_chainid
title: 适配新链ID教程
sidebar_label: 适配新链ID教程
---

## 新应用如何适配PlatON新链ID

PlatON主网关于支持新链ID的提案[PIP-7](https://github.com/PlatONnetwork/PIPs/blob/master/PIPs/PIP-7.md)已经获得通过，并且第一阶段已经在主网实施，这意味着PlatON主网的ChainId将会从100 逐步切换到新值210425，为了尽量减少应用在后续版本升级过程中的影响，新应用应尽量从一开始就支持新的ChainId。

但是现阶段PlatON EVM虚拟机返回给合约的ChainId还是100（之后会返回210425），所以在开发应用的过程中如果有与链ID有关的逻辑需要做特别的适配，下文的实例将从两个场景来介绍适配的地方，第一个是PRC20 代币permit方法，第二个治理代币的投票权委托。

### PRC20 代币permit方法

通常Swap在每次移除流动性的时候，需要先使用metamask的eth_signTypedData_v4接口在客户端签名（签名内容包含ChainId），然后使用签名作为参数调用router合约的removeLiquidityWithPermit，签名是用来做PRC20合约的permit（允许合约扣用户的PRC20资产）

适配代码如下所示：

constructor()函数增加DOMAIN_SEPARATOR_NEW，生成方法包含210425的ChainId

```
......
DOMAIN_SEPARATOR = keccak256(
    abi.encode(
        keccak256('EIP712Domain(string name,string version,uint256 ChainId,address verifyingContract)'),
        keccak256(bytes(name)),
        keccak256(bytes('1')),
        ChainId,
        address(this)
    )
);
DOMAIN_SEPARATOR_NEW = keccak256(
    abi.encode(
        keccak256('EIP712Domain(string name,string version,uint256 ChainId,address verifyingContract)'),
        keccak256(bytes(name)),
        keccak256(bytes('1')),
        210425,
        address(this)
    )
);
......
```


permit函数增加对于两个ChainId相关签名的验证
```
require(deadline >= block.timestamp, 'EXPIRED');
bytes32 digest = keccak256(
    abi.encodePacked(
        '\x19\x01',
        DOMAIN_SEPARATOR_NEW,
        keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner], deadline))
    )
);
address recoveredAddress = ecrecover(digest, v, r, s);
if (recoveredAddress == address(0) || recoveredAddress != owner) {
    digest = keccak256(
        abi.encodePacked(
            '\x19\x01',
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner], deadline))
        )
    );
    recoveredAddress = ecrecover(digest, v, r, s);
    require(recoveredAddress != address(0) && recoveredAddress == owner, 'INVALID_SIGNATURE');
}

nonces[owner] += 1;
......
```

### 治理代币投票权委托

治理代币投票权委托的时候也用到了类似的签名和验证逻辑。代码修改如下：

delegateBySig函数增加对于两个ChainId相关签名的验证
```
constructor(address account, address minter_) public {
        ......
        DOMAIN_SEPARATOR = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name)), getChainId(), address(this)));
        DOMAIN_SEPARATOR_NEW = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name)), 210425, address(this)));
}
    
......

function delegateBySig(address delegatee, uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) public {
    bytes32 structHash = keccak256(abi.encode(DELEGATION_TYPEHASH, delegatee, nonce, expiry));
    bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR_NEW, structHash));
    address signatory = ecrecover(digest, v, r, s);
    if (signatory == address(0) || nonce != nonces[signatory]) {
        digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, structHash));
        signatory = ecrecover(digest, v, r, s);
        require(signatory != address(0), "delegateBySig: invalid signature");
        require(nonce == nonces[signatory], "delegateBySig: invalid nonce");
    }
    nonces[signatory] += 1;
    require(now <= expiry, "delegateBySig: signature expired");
    return _delegate(signatory, delegatee);
}
```
