---
id: PlatON_wallet_plugin_sdk
title: PlatON-Wallet-Plugin-SDK - Access Manual
sidebar_label: PlatON wallet plugin SDK
---

# INTEGRATE PlatON Wallet Plugin SDK

## Install PlatON Wallet Plugin SDK

> Integrate our SDK to your dApp/Wallet/swap UI.

The PlatON Wallet Plugin SDK provides users with quick asset management functions. Using this plugin library, users can view the 
balance of assets on the PlatON network and purchase assets on the PlatON network by cross-chain bridge or fiat currency.


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
    env: 'PROD' // 'TEST' or 'PROD'
};
```

The `env` defines which environment should be access, and can be selected as `TEST` or `PROD`. This requires that 
the corresponding environment be determined at initialization time.

- `TEST` Corresponding test environment, which corresponds to PlatON's development network;
- `PROD` Corresponds to the production environment, which corresponds to the main network of PlatON;


## Example usage

When the project is rendered for the client, use the following import methods:

```js
import PlatOWallet from '@platonnetwork/platon-wallet-sdk';

// Definition PlatONWallet SDK
const walletSDK = new PlatONWallet({
    env: 'PROD' // 'TEST' or 'PROD'
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

When the project is rendered for the server (e.g. using next.js, etc.), use the following import method:

```next.js
let walletSDK = null

import('@platonnetwork/platon-wallet-sdk').then(module => {
  walletSDK = new module.default({ env: 'PROD' })
})
```




