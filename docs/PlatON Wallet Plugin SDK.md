---
id: PlatON_wallet_plugin_sdk
title: PlatON-Wallet-Plugin-SDK - Access Manual
sidebar_label: PlatON wallet plugin SDK
---

# INTEGRATE PlatON Wallet Plugin SDK

## Install PlatON Wallet Plugin SDK

> Integrate our SDK to your dApp/Wallet/swap UI.

## Installation

We recommend installing the SDK via npm、yarn or pnpm.

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


## Set up the SDK

> After you have installed the SDK, you first need to set it up.

To get started, you have to instantiate and configure the Platon-Wallet SDK:

```
import PlatOWallet from '@platonnetwork/platon-wallet-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet(config);
```

The optional config parameter can be used to pass custom configuration to the SDK:

```
type ConfigUpdate = {
    env: 'PROD', // 'TEST' or 'PROD'
	// This parameter is optional. 'light' or 'dark', default to 'light'
	theme: 'light'	
};
```

The `env` defines which environment should be access, and can be selected as `TEST` or `PROD`. This requires that 
the corresponding environment be determined at initialization time.

- `TEST` Corresponding test environment, which corresponds to PlatON's development network;
- `PROD` Corresponds to the production environment, which corresponds to the main network of PlatON;

> Note: After the user connects the wallet and switches the wallet each time, the parameter needs to be set in the following ways:

```
walletSDK.setWalletOption({
  walletType: '<Wallet plugin identification>',
  walletProvider: <EIP1193 standard Provider>
})
```

### Initialize and use PlatON-Wallet

Once the PlatON-Wallet definition is complete, the 'init()' function needs to be called to complete the initialization:

> Example is the MetaMask wallet plug-in usage.

```
// Initialize PlatONWallet SDK
walletSDK.init({
  walletType: 'METAMASK',           // eg：'METAMASK', 'PARTICLE', 'WALLETCONNECT'
  walletProvider: window.ethereum 	// `window.ethereum` 为 MetaMask is eip1193 ethereum provider
})
```

walletType value：

* `METAMASK`：MetaMask wallet plugin；
* `PARTICLE`：Particle wallet；
* `WALLETCONNECT`：WalletConnect V2；

After initialization, need to call the 'setWalletOption()' function to set the wallet type of the current connection:

```
// Setup wallet plugin
walletSDK.setWalletOption({
  walletType: 'METAMASK',
  walletProvider: window.ethereum,
})
```

After setting the wallet type, call 'show()' to display the PlatON-Wallet page:

```
// Show wallet
walletSDK.show();
```


### Switch To Particle Wallet

Method of obtaining EIP1193 standard provider in Particle:

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

Setting wallet to Particle in PlatON-Wallet：

```
walletSDK.setWalletOption({
  walletType: 'PARTICLE',
  walletProvider: particleProvider,
})
```


### Switch To WalletConnect v2

Method of obtaining EIP1193 standard provider in WalletConnect v2:

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

Setting wallet to WalletConnect v2 in PlatON-Wallet：

```
walletSDK.setWalletOption({
  walletType: 'WALLETCONNECT',
  walletProvider: wcProvider,
})
```

## Disconnect or Exit


```
walletSDK.setWalletOption({
  walletType: '',
  walletProvider: null,
})
```

or 

```
walletSDK.destroy()
```


## Example usage

When the project is rendered for the client, use the following import methods:

```js
import PlatOWallet from '@platonnetwork/platon-wallet-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet({
    env: 'PROD', // 'TEST' or 'PROD'
	theme: 'light'
});

// Initialization PlatONWallet SDK
walletSDK.init({
	walletType: 'METAMASK', 
	walletProvider: window.ethereum
});

// Set wallet type
walletSDK.setWalletOption({
  walletType: 'METAMASK',
  walletProvider: window.ethereum
})

// Hide Platon-Wallet.
walletSDK.hide();

// Show Platon-Wallet.
walletSDK.show();

// Destroy Platon-Wallet
walletSDK.destroy();
```

When the project is rendered for the server (e.g. using next.js, etc.), use the following import method:

```next.js
let walletSDK = null

import('@platonnetwork/platon-wallet-sdk').then(module => {
  walletSDK = new module.default({ env: 'PROD' })
})
```

## Token Contract

### PlatON Testnet

| name |  symbol | address |
|:---|:---|:---|
| Tether USD | USDT | 0x1e6E4b48F6F57Aa7cefd8239e8515694D110386B |
| USD Coin | USDC | 0x229b68722bF16CCc7186Dc8760b3D8C5980fe609 |


### PlatON Mainnet

| name |  symbol | address |
|:---|:---|:---|
| Tether USD | USDT | 0xeac734fb7581D8eB2CE4949B0896FC4E76769509 |
| USD Coin | USDC | 0xdA396A3C7FC762643f658B47228CD51De6cE936d |
