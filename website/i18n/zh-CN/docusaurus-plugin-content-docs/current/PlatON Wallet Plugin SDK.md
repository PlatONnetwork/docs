---
id: PlatON_wallet_plugin_sdk
title: PlatON-Wallet-Plugin-SDK接入手册
sidebar_label: PlatON-Wallet-Plugin-SDK接入手册
---

# PlatON-Wallet-Plugin-SDK接入手册

## 安装 PlatON Wallet Plugin SDK

> 集成 `SDK` 到您的 `dApp/Wallet/swap` 页面中.


## 安装

我们推荐使用 `npm/yarn/pnpm` 等方式安装 SDK。

```
npm install '@platonnetwork/platon-wallet-sdk'
```

or

```
yarn add '@platonnetwork/platon-wallet-sdk'
```

or 

```
pnpm add '@platonnetwork/platon-wallet-sdk'
```


## 配置 SDK

> 安装完 SDK 后，需要进行一些设置。

开始使用前，您必须初始化并配置 SDK：

```
import PlatOWallet from '@platonnetwork/platon-wallet-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet(config);
```

可选配置参数可传入用户自定义配置项：

```js
type ConfigUpdate = {
    env: 'PROD', 	 // 必填参数，取值为：'TEST' or 'PROD'
	theme: 'light'   // 可选参数, 'light' or 'dark', default to 'light'
};
```

`env` 参数定义了当前选用的环境信息，参数包含 `TEST` 和 `PROD`，该参数是必须的，在初始化的时候确定，后续不可动态更改。

- `TEST` 测试环境，该环境对应 PlatON 的开发网络；
- `PROD` 生产环境，该环境对应 PlatON 的主网；


> 注意：在用户每次连接钱包及切换钱包后，需要通过以下方式对该参数进行设置：

```
walletSDK.setWalletOption({
  walletType: '<钱包插件标识>',
  walletProvider: <EIP1193标准的Provider>
})
```

### 初始化及使用钱包

PlatON-Wallet 定义完成后，需要调用 `init()` 函数完成初始化：

> 示例为 MetaMask 钱包插件使用说明。

```
// 初始化 PlatONWallet SDK
walletSDK.init({
  walletType: 'METAMASK',           // 取值：'METAMASK', 'PARTICLE', 'WALLETCONNECT'
  walletProvider: window.ethereum 	// `window.ethereum` 为 MetaMask 对应的 eip1193 ethereum provider
})
```

参数值：

* `METAMASK`：MetaMask 钱包插件；
* `PARTICLE`：Particle 钱包；
* `WALLETCONNECT`：WalletConnect V2协议钱包；

注意：不同的插件对应的 `walletProvider` 不同，具体参考后续内容说明。


初始化之后，如果有需要可以调用 `setWalletOption()` 函数再次设置当前连接的钱包类型：

```
// 设置钱包插件
walletSDK.setWalletOption({
  walletType: 'METAMASK',
  walletProvider: window.ethereum,
})
```

设置钱包类型后，调用 `show()` 展示PlatON-Wallet 页面：

```
// 显示钱包
walletSDK.show();
```


### 切换 Particle 钱包

Particle 获取 EIP1193 标准的方法如下：

```
// particle example, @particle-network/connect-react-ui, @wagmi/core and @particle-network/connect 
// packages expose the provider in a different way, refer their docs for details
const pn = new ParticleNetwork({
  projectId: 'your project id',
  clientKey: 'your client key',
  appId: 'your app id',
  wallet: {
    displayWalletEntry: false,
  },
}) 

// import { ParticleNetwork } from '@particle-network/auth'
// import { ParticleProvider } from '@particle-network/provider'
const particleProvider = new ParticleProvider(pn.auth) 
```

为 PlatON-Wallet 设置为 Particle 钱包：

```
walletSDK.setWalletOption({
  walletType: 'PARTICLE',
  walletProvider: particleProvider,
})
```


### 切换 WalletConnect v2 协议

WalletConnect 获取 EIP1193 标准的方法如下：

```
// walletconnect example, @wagmi/core and @web3modal/ethereum packages expose the provider in a different way, refer their docs for details
const supportedRpcMap = await wallet.getSupportedChainsMap() // walletconnect required

const wcProvider = await EthereumProvider.init({
  // import { EthereumProvider } from '@walletconnect/ethereum-provider'
  projectId: 'your project id',
  chains: [
    ...Object.keys(supportedRpcMap).map((item) => +item),
    // your own chains
  ],
  rpcMap: {
    ...supportedRpcMap,
    // your own rpc map
  },
  showQrModal: true,
  qrModalOptions: {
    themeVariables: {
      '--wcm-z-index': '9999',
    },
  },
})
```

为 PlatON-Wallet 设置为 WalletConnect v2 钱包：

```
walletSDK.setWalletOption({
  walletType: 'WALLETCONNECT',
  walletProvider: wcProvider,
})
```


## 不连接任何钱包或退出钱包

当退出钱包链接或不链接任何钱包时，执行以下命令：

```
walletSDK.setWalletOption({
  walletType: '',
  walletProvider: null,
})
// 或者 
walletSDK.destroy()
```


## 使用案例

> 案例选用 MetaMask 钱包插件示例。

项目为客户端渲染时，用如下导入方式：

```js
import PlatOWallet from '@platonnetwork/platon-wallet-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet({
    env: 'PROD', // 'TEST' or 'PROD'
	theme: 'light'
});

// 初始化 PlatONWallet SDK
walletSDK.init({
	walletType: 'METAMASK', 
	walletProvider: window.ethereum
});

// 设置钱包插件
walletSDK.setWalletOption({
  walletType: 'METAMASK',
  walletProvider: window.ethereum
})

// 隐藏钱包
walletSDK.hide();

// 显示钱包
walletSDK.show();

// 销毁钱包
walletSDK.destroy();

```

项目为服务端（如使用 next.js 等）渲染时，用如下导入方式：

```js
let walletSDK = null

import('@platonnetwork/platon-wallet-sdk').then(module => {
  walletSDK = new module.default({ env: 'PROD' })
})
```

## 合约信息

### PlatON 测试网

| name |  symbol | address |
|:---|:---|:---|
| Tether USD | USDT | 0x1e6E4b48F6F57Aa7cefd8239e8515694D110386B |
| USD Coin | USDC | 0x229b68722bF16CCc7186Dc8760b3D8C5980fe609 |


### PlatON 主网

| name |  symbol | address |
|:---|:---|:---|
| Tether USD | USDT | 0xeac734fb7581D8eB2CE4949B0896FC4E76769509 |
| USD Coin | USDC | 0xdA396A3C7FC762643f658B47228CD51De6cE936d |

