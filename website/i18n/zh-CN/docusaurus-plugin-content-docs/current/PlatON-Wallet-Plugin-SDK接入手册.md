---
id: PlatON_Wallet_Plugin_Sdk
title: PlatON-Wallet-Plugin-SDK接入手册
sidebar_label: PlatON-Wallet-Plugin-SDK接入
---

# 集成 PlatON Wallet Plugin SDK

## 安装 PlatON Wallet Plugin SDK

> 集成 `SDK` 到您的 `dApp/Wallet/swap` 页面中.

PlatON Wallet Plugin SDK 提供用户快速资产管理功能，使用该插件库，可以查看用户在 PlatON 网络上的资产余额，通过跨链桥或者法币的方式
购买 PlatON 网络上的资产。


## 安装

我们推荐使用 `npm/yarn/pnpm` 等方式安装 SDK。

```
npm install '@platonnetwork/wallet-plugin-sdk'
```

or 

```
yarn add '@platonnetwork/wallet-plugin-sdk'
```

or 

```
pnpm add '@platonnetwork/wallet-plugin-sdk'
```


## 配置 SDK

> 安装完 SDK 后，需要进行一些设置。

开始使用前，您必须初始化并配置 SDK：

```
import PlatOWallet from '@platonnetwork/wallet-plugin-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet(config);

```

可选配置参数可传入用户自定义配置项：

```
type ConfigUpdate = {
    env: 'PROD' // 'TEST' or 'PROD'
};
```

`env` 参数定义了当前选用的环境信息，参数包含 `TEST` 和 `PROD`，该参数是必须的，在初始化的时候确定，后续不可动态更改。

- `TEST` 对应测试环境，该环境对应 PlatON 的开发网络；
- `PROD` 对应生产环境，该环境对应 PlatON 的主网；


## 使用案例

```js
import PlatOWallet from '@platonnetwork/wallet-plugin-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet({
    env: 'TEST' // 'TEST' or 'PROD'
});

// 初始化 PlatONWallet SDK
walletSDK.init();

// 隐藏钱包
walletSDK.hide();

// 显示钱包
walletSDK.show();

// 销毁钱包
walletSDK.destroy();
```





