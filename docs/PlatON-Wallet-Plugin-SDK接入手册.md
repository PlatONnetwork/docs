---
id: PlatON_Wallet_Plugin_Sdk
title: PlatON-Wallet-Plugin-SDK - Access Manual
sidebar_label: PlatON-Wallet-Plugin-SDK
---

# INTEGRATE PlatON Wallet Plugin SDK

## Install PlatON Wallet Plugin SDK

> Integrate our SDK to your dApp/Wallet/swap UI.

The PlatON Wallet Plugin SDK provides users with quick asset management functions. Using this plugin library, users can view the 
balance of assets on the PlatON network and purchase assets on the PlatON network by cross-chain bridge or fiat currency.


## Installation

We recommend installing the SDK via npm、yarn or pnpm.

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


## Set up the SDK

> After you have installed the SDK, you first need to set it up.

To get started, you have to instantiate and configure the Platon-Wallet SDK:

```
import PlatOWallet from '<package name>';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet(config);

```

The optional config parameter can be used to pass custom configuration to the SDK:

```
type ConfigUpdate = {
    env: 'TEST' // 'TEST' or 'PROD'
};
```

The `env` defines which environment should be access, and can be selected as `TEST` or `PROD`. This requires that 
the corresponding environment be determined at initialization time.

- `TEST` Corresponding test environment, which corresponds to PlatON's development network;
- `PROD` Corresponds to the production environment, which corresponds to the main network of PlatON;


## Example usage

```js
import PlatOWallet from '<package name>';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet({
    env: 'TEST' // 'TEST' or 'PROD'
});

// Initialization PlatONWallet SDK
walletSDK.init();

// Hide Platon-Wallet.
walletSDK.hide();

// Show Platon-Wallet.
walletSDK.show();

// Destroy Platon-Wallet
walletSDK.destroy();
```





