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
	// This parameter is optional. The value can be "METAMASK" "and other third-party wallet plug-in names. 
	// Currently, only "METAMASK" is supported
	walletType: ''	
};
```

The `env` defines which environment should be access, and can be selected as `TEST` or `PROD`. This requires that 
the corresponding environment be determined at initialization time.

- `TEST` Corresponding test environment, which corresponds to PlatON's development network;
- `PROD` Corresponds to the production environment, which corresponds to the main network of PlatON;


The 'walletType' is the wallet type connected to the current user. This parameter is optional. The initial 
value can be set to empty string(''), indicating that the wallet is not connected.

Parameter values:
- `''`: Indicates that the wallet is not connected;
- `'<Wallet Name>'`: The name of the wallet connected to the current user, such as 'METAMASK';

> Note: After the user connects the wallet and switches the wallet each time, the parameter needs to be set in the following ways:

```
walletSDK.setWalletType('Wallet Plugin Name')
```

### Initialize and use PlatON-Wallet

Once the PlatON-Wallet definition is complete, the 'init()' function needs to be called to complete the initialization:

```
// Initialize PlatONWallet SDK
walletSDK.init();
```

After initialization, need to call the 'setWalletType()' function to set the wallet type of the current connection:

```
// Setup wallet plugin
walletSDK.setWalletType('METAMASK');
```

After setting the wallet type, call 'show()' to display the PlatON-Wallet page:

```
// Show wallet
walletSDK.show();
```


### Switch wallets

Called when switching from metamask wallet to connect to another wallet：

```
walletSDK.setWalletType('other wallet name')
```

Called when switching back to the connected metamask wallet from another wallet:

```
walletSDK.setWalletType('METAMASK')
```

Called when not connecting to any wallet or exiting wallet: 

```
walletSDK.setWalletType('')
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
	walletType: 'METAMASK'
});

// Initialization PlatONWallet SDK
walletSDK.init();

// Set wallet type
walletSDK.setWalletType('METAMASK')

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
  walletSDK = new module.default({ env: 'PROD', walletType: 'METAMASK' })
})
```


