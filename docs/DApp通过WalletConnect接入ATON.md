---
id: DApp_integration_with_WalletConnect_for_ATON
title: DApp integration with WalletConnect for ATON
sidebar_label: WalletConnect integration Tutorial
---


### Overview

ATON version 1.1.0 already supports the WalletConnect protocol. You can connect with DApps and sign transactions without disclosing the private key to DApps as it will not leave your mobile device.

### What is WalletConnect

[WalletConnect](https://docs.walletconnect.com/1.0/tech-spec) is an open protocol designed to enable secure communications between wallets and Dapps. The protocol establishes a remote connection between two apps and/or devices, and the actual data (payloads) are transmitted through the bridge server. These payloads are symmetrically encrypted through a shared key between the two peers. The connection is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this connection request.

> As a DApp developer, you should first learn the basics of integrating WalletConnection in DApps. With the help of this tutorial, you can help users generate an unsigned transaction request in your DApp and have it sent to the ATON wallet through WalletConnect for signature authorization.

### Instructions for Developers

Firstly, you should provide two buttons (WalletConnect and sendTransaction) in your DApp for building connections and sending transactions.

> You can refer to the example codes in this tutorial [PlatON WalletConnect Example](https://github.com/PlatONnetwork/WalletConnect-Example).



#### 1. Integrating WalletConnection in DApp

To begin with, you’ll first have to generate a QR code in the standard WalletConnect URI format ([EIP-1328](https://eips.ethereum.org/EIPS/eip-1328)) for the subsequent connection with ATON (the relevant UI component is provided by the WalletConnect library).

In the DApp, one clicks the button to build connections and execute the  `walletConnectInit`  method

**Installation**

- yarn

```
yarn add @walletconnect/client @walletconnect/qrcode-modal
```

- npm

```
npm install @walletconnect/client @walletconnect/qrcode-modal
```

> Developers are advised to keep track of the official updates of [walletconnect-monorepo](https://github.com/WalletConnect/walletconnect-monorepo/releases) to ensure that DApps have access to the latest features and performance improvements.



**The WalletConnect button**

```jsx
<SButtonContainer>
  <SConnectButton left onClick={this.walletConnectInit} fetching={fetching}>
    {"Connect to WalletConnect"}
  </SConnectButton>
</SButtonContainer>
```



**Build WalletConnect connections**

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



`subscribeToEvents` will engage in the event listening of connectors defined by `walletConnectInit`. [connector API](https://docs.walletconnect.com/1.0/client-api)

```javascript
subscribeToEvents = () => {
  const { connector } = this.state;

  if (!connector) {
    return;
  }

  // When the DApp is connected to the wallet, if the wallet info changes (chainId or address in most cases), the session_update callback will be triggered
  connector.on("session_update", async (error, payload) => {
    console.log(`connector.on("session_update")`, payload);

    if (error) {
      throw error;
    }

    const { chainId, accounts } = payload.params[0];

    // Obtain accounts and chainId through payload.params and update the state of the DApp
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

  // If the connection already exists, the QR code popup will not be triggered after walletConnectInit is executed, and you’ll only have to update the state of the DApp
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



> Note: The example above does not use react hook. Therefore, if `await this.setState()` in the code should be converted into hook, the developer needs to comb through the state and the update logic of the DApp.



#### 2. Connecting to ATON



- Through Step 1, the ATON wallet will be able to scan the QR code in WalletConnect URI format to build a connection. After reading the URI, ATON will immediately receive and decrypt the request data of the connection. The wallet will then show users the details of the request provided by the Dapp. To be more specific:

![Initiate Connection](https://user-images.githubusercontent.com/15320265/147226794-df8a2ca7-aebb-41c6-afb4-ca0bd5c1384b.png)



- Users will approve or reject the connection.

Where the connection is rejected, ATON will initiate a rejection request, and the DApp will go through a “disconnect” event, immediately disconnecting itself from the bridge server. You can refer to the message of payload for error handling and prompts.

```javascript
payload: {
  event: "disconnect";
  params: [{ message: "Session update rejected" }];
}
```

If approved, ATON will show a successful connection, and the DApp will go through a “connect” event and receive the account and ChainID provided in the payload returned from the wallet.

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

#### 3. Transaction Signature

Once the connection is built, the DApp will be able to send any JSON-RPC call request processed by the wallet to read data from its nodes or issue signature requests for a transaction or message.

**The “Send” button**

```jsx
<Button onClick={this.send}>Send</Button>
```

**Generate the signature request**

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



**Display of transaction results**

Obtain txHash, which provides browser links and display of transaction details in the DApp

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



### Conclusion

After the three steps are completed, users of your DApp will be able to connect with ATON in the DApp and send signature requests through sendTransaction provided by WalletConnect.

### Video Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/MRyAcVnDjrY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

