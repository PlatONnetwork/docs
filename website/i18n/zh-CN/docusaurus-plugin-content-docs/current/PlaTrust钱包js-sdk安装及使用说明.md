---
id: PlaTrust-wallet-js-sdk
title: PlaTrust Wallet js-sdk安装及使用说明
sidebar_label: PlaTrust Wallet js-sdk安装及使用说明
---



# js-sdk安装及使用说明


## 安装 js-sdk

1. 使用 npm 安装
```
npm install platrust-wallet-js-sdk
```

## 在代码中使用

1. 导入 js-sdk

```js
const platrust = require("platrust-wallet-js-sdk")
```

2. 例子:

```js
// import { ethers } from "ethers";
// import { Accounts } from "web3-eth-accounts";
// import { UserOpReceipt, BaseWalletLib, UserOperation, packSignatureHash, signMessage, encodeSignature } from 'bonus-wallet-js-sdk';
const platrust = require("platrust-wallet-js-sdk")
const ethers = require("ethers")

async function main() {
    const pks = ['0xa5748918ff73de2e3f6cde786a1567640349eefff2503de82b0bfa4d41d55101']
    let owners = ['0x2E64cAbc8586CE95B5744DDE91Bc92182CbbD813']

    const walletLib = new platrust.WalletLib();
    const walletLogic = '0x2e234DAe75C793f67A35089C9d99245E1C58470b'
    const walletFactory = '0xF62849F9A0B5Bf2913b396098F7c7019b51A820a' // wallet proxy factory contract address
    const relayerManagerAddr = '0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f'
    // const salt = ethers.utils.formatBytes32String("abc")
    const salt = '0x4aa639acfa86f7d60530bf462efdfdd9f4c4a6526226f5284c0af71240d47f25'
    const initializer = await walletLib.getSetupCode(
        relayerManagerAddr,   // <address> EntryPoint Contract Address
        owners, // <[address]> owner Address List
        1,       // <number> threshold
        AddressZero,  // <address> to Address
        '0x',  // <string> wallet init execute data
        AddressZero,  // <string> fallbackHandler
        86400,      // <number> lockPerid
    )
    const walletAddress = await walletLib.calculateWalletAddress(
        walletLogic,  // <address> BonusWalletLogic Contract Address
        initializer,  // <string> initializer
        salt,     // <string> salt (Hex string)
        walletFactory  // <address> wallet Factory Address
    );
    const initcode = walletLib.getInitCode(walletFactory, walletLogic, initializer, salt)
    const activateOp = walletLib.activateWalletOp(
        walletLogic,  // <address> BonusWallet Logic Contract Address
        initializer,  // <string> initializer
        undefined,   // <bytes> paymasterAndData
        salt,     // <string> salt (Hex string)
        walletFactory,  // <address> Wallet factory Contract Address
        100,      // <number> maxFeePerGas 100Gwei
        1000,     // <number> maxPriorityFeePerGas 10Gwei
        5000000,
        500000,
        50000
    );
    const userOpHash = await activateOp.getUserOpHashFromContract(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( "https://devnet2openapi.platon.network/rpc"),  // ethers.providers
    );
    const signedHash = platrust.packSignatureHash(userOpHash, SignatureMode.owner, 0, 0);
    const sig = platrust.signMessage(signedHash, pks[0])
    const pk = platrust.recoverAddress(signedHash, sig)

    activateOp.signature = platrust.encodeSignature(SignatureMode.owner, sig, 0, 0);
    console.log("signature: ", activateOp.signature);
    
    const bundler = new walletLib.Bundler(
        '0x0',  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( "https://devnet2openapi.platon.network/rpc"),  // ethers.providers
    );

    const validation = await bundler.simulateValidation(activateOp);
    if (validation.status !== 0) {
        throw new Error(`error code:${validation.status}`);
    }

    const bundlerEvent = bundler.sendUserOperation(activateOp);
    bundlerEvent.on('error', (err: any) => {
        console.log(err);
    });
    bundlerEvent.on('send', (userOpHash: string) => {
        console.log('send: ' + userOpHash);
    });
    bundlerEvent.on('receipt', (receipt: IUserOpReceipt) => {
        console.log('receipt: ' + JSON.stringify(receipt));
    });
    bundlerEvent.on('timeout', () => {
        console.log('timeout');
    });
}

main();
```

## 开发测试网配置

```javascript
测试链URL: 'https://devnet2openapi2.platon.network/rpc'
bundleURL: 'https://testbundler.platon.network'

walletLogic: '0x3b682b956E65b5F5b8150f75F2235f156A8F4b7B'
walletFactory: '0x97429FFFdE9223C92Cb00F66D8352B0642f70FA4' // wallet proxy factory contract address
relayerManagerAddr: '0xD7998fC16185cC619b0918028D9BBc77A844a880'
```

