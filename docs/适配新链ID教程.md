---
id: adapting_to_new_chainid
title: Adapting to new chainid
sidebar_label: Adapting to new chainid
---

## How new DApp can be adapted to PlatON's new ChainId

The PlatON mainnet proposal to support the new ChainId [PIP-7](https://github.com/PlatONnetwork/PIPs/blob/master/PIPs/PIP-7.md)has been adopted and the first phase has been implemented in the mainnet, which means that the ChainId of the PlatON mainnet will be gradually switched from 100 to the new value 210425. In order to minimise the impact on applications during subsequent version upgrades, new applications should try to support the new ChainId from the beginning ChainId.

However, at this stage the ChainId returned to the contract by the PlatON EVM virtual machine is still 100 (after which it will return 210425), so in the process of developing the application if there is logic related to the ChainId special adaptations need to be made. The following examples will introduce the adaptations from two scenarios, the first is the PRC20 token permit method and the second governance token voting rights proxy.

### PRC20 permit func

Usually Swap needs to use metamask's eth_signTypedData_v4 interface to sign the client first each time it removes liquidity (the signature contains the ChainId), and then use the signature as an argument to call the router contract's removeLiquidityWithPermit, which is used to do PRC20 contract's permit (allowing the contract to deduct the user's PRC20 assets)

The adaptation code is shown below.

constructor() function adds DOMAIN_SEPARATOR_NEW, generating method containing the ChainId of 210425

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


permit function adds verification of two ChainId related signatures

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

### Governance Token Voting Proxy

Similar signature and verification logic is used when governing the token voting rights proxy. The code is modified as follows.

The delegateBySig function adds validation for the signatures associated with the two ChainId

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
