---
id: DApp_integration_with_WalletConnect_for_ATON
title: DApp 通过 WalletConnect 接入 ATON
sidebar_label: WalletConnect集成教程
---


### 简介

ATON 1.1.0 版本已经支持了 WalletConnect 协议。用户可以在保持私钥不离开移动设备，不暴露给 DApp 的前提下，实现与 DApp 的连接和交易签名。

### 什么是 WalletConnect

[WalletConnect](https://docs.walletconnect.com/1.0/tech-spec) 是一种开放协议，用于在 DApps 和钱包之间进行安全通信。该协议在两个应用程序和/或设备之间建立远程配对，通过 Bridge server 来传递实际数据。两个对等方共享秘钥，对数据进行对称加密。配对由显示二维码或带有标准 WalletConnect URI 地址的一方发起，并在对方同意此配对请求时建立。

> 作为 DApp 开发者，您需要了解有关 WalletConnect 集成的基础知识。然后可以根据本教程，让用户在 DApp 生成待签名的交易请求，通过 WalletConnect 发送给 ATON 钱包后进行签名。

### 如何开发

首先需要在 DApp 里提供连接 WalletConnect 和 sendTransaction 两个按钮，用于建立连接和发送交易。

> 本教程的示例代码可参考 [PlatON WalletConnect Example](https://github.com/PlatONnetwork/WalletConnect-Example)

#### 1. DApp 集成 WalletConnect 协议

在 DApp 中，首先需要生成标准 WalletConnect URI 格式（[EIP-1328](https://eips.ethereum.org/EIPS/eip-1328)）的二维码，以便后续供 ATON 钱包扫码连接（相关的 UI 组件 WalletConnect 官方库已经提供）。

DApp 点击按钮会建立连接，执行 `walletConnectInit` 方法

**安装**

- yarn

```
yarn add @walletconnect/client @walletconnect/qrcode-modal
```

- npm

```
npm install @walletconnect/client @walletconnect/qrcode-modal
```

> 建议开发者关注 [walletconnect-monorepo](https://github.com/WalletConnect/walletconnect-monorepo/releases) 的官方更新，以便 DApp 可以具备最新的功能和性能提升。

**WalletConnect 按钮**

```jsx
<SButtonContainer>
  <SConnectButton left onClick={this.walletConnectInit} fetching={fetching}>
    {"Connect to WalletConnect"}
  </SConnectButton>
</SButtonContainer>
```

**建立 WalletConnect 连接**

```javascript
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

walletConnectInit = async () => {
  // bridge url
  const bridge = "https://bridge.walletconnect.org";

  // create new connector
  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

  await this.setState({ connector });

  // check if already connected
  if (!connector.connected) {
    // create new session
    await connector.createSession();
  }

  // subscribe to events
  this.subscribeToEvents();
};
```

`subscribeToEvents` 会对 `walletConnectInit` 定义好的 connector 进行相关的事件监听。[connector API](https://docs.walletconnect.com/1.0/client-api)

```javascript
subscribeToEvents = () => {
  const { connector } = this.state;

  if (!connector) {
    return;
  }

  // 当DApp连接上钱包后，若钱包的信息发生变化（大部分情况是 chainId 或者 address），会触发 session_update 的回调
  connector.on("session_update", async (error, payload) => {
    console.log(`connector.on("session_update")`, payload);

    if (error) {
      throw error;
    }

    const { chainId, accounts } = payload.params[0];

    // 通过 payload.params 拿到 accounts 和 chainId，对 DApp 的 state 进行更新
    this.onSessionUpdate(accounts, chainId);
  });

  connector.on("connect", (error, payload) => {
    console.log(`connector.on("connect")`, payload);

    if (error) {
      throw error;
    }

    this.onConnect(payload);
  });

  connector.on("disconnect", (error, payload) => {
    console.log(`connector.on("disconnect")`, payload);

    if (error) {
      throw error;
    }

    this.onDisconnect();
  });

  // 如果已经连接，则 walletConnectInit 执行后不会唤起二维码弹框，只需进行 DApp 的 state更新
  if (connector.connected) {
    const { chainId, accounts } = connector;
    const address = accounts[0];
    this.setState({
      connected: true,
      chainId,
      accounts,
      address,
    });
    this.onSessionUpdate(accounts, chainId);
  }

  this.setState({ connector });
};
```

> 注：示例没有使用 react hook，所以代码中的`await this.setState()` 如果要转换成 hook，需要开发者对于 DApp 的 state 和更新逻辑进行梳理。

#### 2. 和 ATON 建立连接

- 通过步骤 1，ATON 钱包已经可以扫描 WalletConnect URI 格式的二维码建立连接，读取 URI 后，将立即接收并解密连接的请求数据。然后，钱包将向用户显示 Dapp 提供的请求详细信息。如下：

![Initiate Connection](https://user-images.githubusercontent.com/15320265/147226794-df8a2ca7-aebb-41c6-afb4-ca0bd5c1384b.png)

- 用户将批准或拒绝连接。

如果被拒绝，ATON 发起拒绝请求，DApp 会进入 disconnect 事件，将立即与桥接服务器断开连接，可根据 payload 的 message 进行错误处理和提示

```javascript
payload: {
  event: "disconnect";
  params: [{ message: "Session update rejected" }];
}
```

如果获得批准，ATON 会展示连接成功的信息，DApp 会进入 connect 事件，将从钱包返回的 payload 收到提供的帐户和 ChainID。

![Approve Connection](https://user-images.githubusercontent.com/15320265/147227578-af61fe02-daa3-41d2-9328-9e2000a0d8ff.png)

```js
payload: {
  event: "connect"
  params: [
    accounts: ['0xdc8c0f103dc8523c82d38064f746dda9fa28bf7f']
    chainId: 210309
    peerId: "BC246E88-ACC0-4FD6-BF10-DEF314EF42BE"
    peerMeta: {description: "hello，i'm Platon.", icons: Array(0), name: 'ATON', url: 'https://safe.gnosis.io'}
  ]
}
```

#### 3. 交易签名

建立连接后，DApp 将能够发送任何由钱包处理的 JSON-RPC 调用请求，以从其节点读取数据或为交易或消息发出签名请求。

**发送按钮**

```jsx
<Button onClick={this.send}>Send</Button>
```

**生成交易签名请求**

```js
sendTransaction = async () => {
  const tx = {
    from,
    to,
    nonce,
    gasPrice,
    gasLimit,
    value,
    data,
  };

  // send transaction
  const result = await connector.sendTransaction(tx);

  console.log("connector.sendTransaction result txHash: ", result);
};
```

**交易结果展示**

获取到 txHash，可在 DApp 提供浏览器链接和交易详情展示

```js
// format displayed result
const formattedResult = {
  method: "eth_sendTransaction",
  txHash: result,
  from: address,
  to: address,
  value: "0 ETH",
};

// display result
this.setState({
  connector,
  result: formattedResult || null,
});
```

![Confirm Transaction](https://user-images.githubusercontent.com/15320265/147228148-0a6ddc59-fc36-451d-87cc-e39453311957.png)

![Transaction Success@3x](https://user-images.githubusercontent.com/15320265/147228172-b7765f6c-0e0a-47a5-b85f-80282a9b0741.png)

### 总结

按照这三个步骤，就可以在 DApp 里和 ATON 建立连接，并通过 WalletConnect 提供的 sendTransaction 发送交易签名请求。

### 视频 Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/MRyAcVnDjrY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
本教程贡献者 @[liuzhengbo](https://github.com/liuzhengbo)