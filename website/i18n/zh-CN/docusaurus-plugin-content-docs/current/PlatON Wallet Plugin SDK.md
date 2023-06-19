---
id: PlatON_wallet_plugin_sdk
title: PlatON-Wallet-Plugin-SDK接入手册
sidebar_label: PlatON钱包插件SDK
---
本文档将详细说明如何将钱包插件 SDK 接入到您的 `dApp/Wallet/Swap` 页面中。

## 集成SDK
### 安装

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

### 配置 SDK

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
    env: 'PROD', 	// 必填参数，取值为：'TEST' or 'PROD'
	walletType: ''  // 可选参数，钱包插件名称，取值为：`METAMASK` `''` 以及其它三方钱包插件名称，目前仅有效支持 `METAMASK`
};
```
配置参数说明：
- `env` 参数定义了当前选用的环境信息，参数包含 `TEST` 和 `PROD`，该参数是必须的，在初始化的时候确定，后续不可动态更改。
    - `TEST` 对应测试环境，该环境对应 PlatON 的开发网络；
    - `PROD` 对应生产环境，该环境对应 PlatON 的主网；
- `walletType` 为当前用户连接的钱包类型。该参数是非必须项，初始值可设置为空字符串，表示暂未连接钱包。
    参数值：   
    - `''`: 表示暂未连接任何钱包插件；
    - `'<钱包名称>'`: 为当前用户连接的钱包名称，如 'METAMASK' 等;

> 注意：在用户每次连接钱包及切换钱包后，需要通过以下方式对该参数进行设置：

```
walletSDK.setWalletType('钱包名称')
```

### 初始化及使用钱包

PlatON-Wallet 定义完成后，需要调用 `init()` 函数完成初始化：

```
// 初始化 PlatONWallet SDK
walletSDK.init();
```

初始化之后，需要调用 `setWalletType()` 函数设置当前连接的钱包类型：

```
// 设置钱包插件
walletSDK.setWalletType('METAMASK');
```

设置钱包类型后，调用 `show()` 展示PlatON-Wallet 页面：

```
// 显示钱包
walletSDK.show();
```


### 切换钱包

当从 metamask 钱包切换到连接其他钱包使调用:

```
walletSDK.setWalletType('<other wallet name>')
```

当从其他钱包切换回连接 metamask 钱包时调用:

```
// 注意：METAMASK 须为大写
walletSDK.setWalletType('METAMASK')
```

当不连接任何钱包或退出钱包时调用： 

```
walletSDK.setWalletType('')
// 或者 
walletSDK.destroy()
```


## 使用案例

项目为客户端渲染时，用如下导入方式：

```js
import PlatOWallet from '@platonnetwork/platon-wallet-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet({
    env: 'PROD', // 'TEST' or 'PROD'
	walletType: 'METAMASK'
});

// 初始化 PlatONWallet SDK
walletSDK.init();

// 设置钱包插件
walletSDK.setWalletType('METAMASK');

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
  walletSDK = new module.default({ env: 'PROD', walletType: 'METAMASK' })
})
```




