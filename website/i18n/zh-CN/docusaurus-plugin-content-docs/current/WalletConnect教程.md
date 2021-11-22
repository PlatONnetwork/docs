---
id: walletconnect_tutorial
title: WalletConnect 简单示例
sidebar_label: WalletConnect
---

## 什么是 WalletConnect 协议

[WalletConnect](https://walletconnect.org/) 是一种开放协议，用于在 Dapp 和钱包之间进行安全通信。该协议在两个应用程序和/或设备之间建立远程配对，使用中继服务器来中继有效载荷。这些有效载荷通过两个对等方之间的共享密钥进行对称加密。配对由显示的二维码或带有标准WalletConnect URI 地址的一方发起，并在对方同意此配对请求时建立。

> - ATON1.1.0版本开始支持 WalletConnect 协议，用户可以在保持私钥不离开移动设备，不暴露给连接的DApp的前提下，实现与DApp的连接和交易签名。
> - 作为 DApp 开发人员，您需要了解有关 Walletconnect 集成的基础知识，让您的用户能够在 ATON 钱包中本地签署由您的 DApp 生成的交易。

## 核心架构

该架构主要由使用客户端的两个对等方（Dapp 和钱包）之间的 websocket 服务器（桥接器）组成。

![arch](/img/walletconnect-header.png)

### 请求连接

发起者，是第一个请求连接的节点（Dapp ）。Dapp 使用标准WalletConnect URI格式（[EIP-1328](https://eips.ethereum.org/EIPS/eip-1328)）地址，向桥接服务器发送连接请求。

```text
wc:{topic...}@{version...}?bridge={url...}&key={key...}
// Example URL
wc:8a5e5bdc-a0e4-4702-ba63-8f1a5655744f@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a
```



| 字段    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| wc      | 协议前缀 [EIP-1328](https://eips.ethereum.org/EIPS/eip-1328) |
| topic   | 主题（仅用于握手）                                           |
| version | 版本                                                         |
| bridge  | 桥接服务器地址                                               |
| key     | 对称密钥                                                     |



### 建立连接

![establishing connection](/img/establishing-connection.png)

第二个节点( Wallet )将使用二维码或深层链接读取 URI。读取 URI 后，对等方将立即接收并解密连接的请求数据。

然后，钱包将向用户显示 Dapp 提供的请求详细信息。然后用户将批准或拒绝连接。如果被拒绝，Dapp 将立即与桥接服务器断开连接，并在钱包提供的情况下抛出错误消息。如果获得批准，Dapp 将从钱包收到提供的帐户和 ChainID。

建立连接后，Dapp 将能够发送任何由钱包处理的 JSON-RPC 调用请求，以从其节点读取数据或为交易或消息发出签名请求。



## 简单示例

[详细源码](https://github.com/PlatONnetwork/WalletConnect-Example)， [JSON-RPC 说明](https://docs.walletconnect.com/1.0/client-api) 。

```typescript
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// 创建连接
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});

// 检查连接是否已经建立
if (!connector.connected) {
  // 创建会话
  connector.createSession();
}

// 订阅连接事件
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }
 	// 连接成功后会返回钱包帐号和链ID
  const { accounts, chainId } = payload.params[0];
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }
  const { accounts, chainId } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }
});

// 调用方法， 详细介绍请访问https://docs.walletconnect.com/1.0/client-api
// 发送交易方法示例
connector.sendTransaction({
  data: "0x",
  from: "0xc115ceadf9e5923330e5f42903fe7f926dda65d2",
  gasLimit: "0x5208",
  gasPrice: "0x746a528800",
  nonce: "0x12",
  to: "0xc115ceadf9e5923330e5f42903fe7f926dda65d2",
  value: "0x00"
}).then(txHash => {
  // 发送交易成功， 钱包会返回交易hash
  console.log('txHash: ', txHash)
})

```