---
id: Samurai_API
title: Samurai API
sidebar_label: Samurai API	
---

Samurai is an open source web browser plugin wallet for the PlatON/Alaya network, adapted from the open source code of the Ethernet web wallet [MetaMask](https://github.com/MetaMask/metamask-extension). Users can easily manage accounts and connect to the PlatON/Alaya network.



## Introduction

+ **Why Samurai**

  Samurai was created to meet the needs of secure and usable PlatON/Alaya-based web sites, , supporting account management and connecting users to the blockchain network.

  

+ **Account management**

  Samurai allows users to manage accounts and their keys in various ways while isolating them from the site context. This is a great security improvement over storing the user keys on a single central server, or even in local storage, which can allow for mass account thefts. 

  This security feature also comes with developer convenience: Developers only need to interact with the globally available platon API that identifies users of WEB3-compatible browsers (such as Samurai users). Whenever you request a transaction signature (such as `platon_sendTransaction` and `platon_signTypedData`), Samurai will prompt the user in as comprehensible a way as possible. This keeps users informed, and leaves attackers left trying to phish individual users rather than performing mass hacks (although DNS hacks can still be used for phishing en masse).

  

+ __Blockchain connection__

  Samurai comes pre-loaded with fast connections to the PlatON/Alaya blockchain and several testnets. This allows you to get started without synchronizing a full node.

  At the same time, Samurai is compatible with any blockchain that exposes an  PlatON/Alaya-compatible JSON RPC API, including custom and private blockchains. 



## Getting Started

To use Samurai for development, first install Samurai on your development machine. See below for specific installation.

> Quick note...
> This guide assumes that you have intermediate knowledge of HTML, CSS and JavaScript

Once Samurai is installed and running, you will find that new browser tabs have a `window.platon` object available in the developer console. This is how your website will interact with Samurai.



### Basic considerations

#### **Web3 browser detection**

To verify whether the browser is running Samurai, copy and paste the following code snippet into the developer console of the web browser:

```
if (typeof window.platon !== 'undefined') {
      console.log('Samurai is installed!');
    }
```

You can review the full API for the `window.platon` object [ here ](References)



#### Resetting your local nonce calculation 

If you are running a test blockchain and restart it, you may accidentally confuse Samurai because it calculates the next nonce based on both the network state and the sent transactions already known.

To clear Samurai's transaction queue and effectively reset its nonce calculation, you can use the Reset Account button in Settings (available in the sandwich menu in the upper right corner).



#### User state

Currently, there are something stateful to consider in the interaction with the API:

  + What is the current network?
  + What is the current account? 

Both of these are available synchronously as `platon.networkVersion` and `platon.selectedAddress`. You can also use events to listen for changes. See the [ API-reference ](References).



#### Connecting to Samurai

"Connecting" or "logging in" to Samurai effectively means "accessing the user's PlatON/Alaya account(s)".

You should only initiate a connection request in response to direct user action (such as clicking a button). You should always disable the "Connect" button while the connection request is pending. You should never initiate a connection request when the page loads.

We recommend that you provide a button to allow users to connect Samurai to your dapp. Clicking this button,  you will call the following method:

```
platon.request({ method: 'platon_requestAccounts' });
```



#### Choose a convenience library

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the user account onboarding, and others provide you with various ways to interact with smart contracts for a variety of API preferences, from promises through callbacks to strong types.

The provider API itself is very simple and wraps PlatON/Alaya JSON-RPC formatted messages. This is why developers usually use convenience libraries to interact with providers, such as platon-truffle. With these tools, you can usually find enough documentation to interact with the provider without having to read this lower-level API.



## Common Terms

This is a list of terms you might encounter when using the Samurai interface.

+ __Wallet__
  + The interface/client/wrapper/holder you use to manage your account(s).

+ __Account__
  + A public and private key pair that can hold your funds.
  + Your funds are actually stored on the blockchain, not in a wallet or account.
  + Just like your Reddit account has a `username (public)` and a `password (private)`, so does your PlatON/Alaya account. For the sake of security, you can use a password to encrypt your private key. Please refer to the `Keystore File` section in this guide.

+  __Address__
  + You can transfer funds to an account through an address.
  + Sometimes referred to as the "public key".
  + A string made up of `lat/atp` + `39 characters`, in bech32 type.

  + In PlatON, an address starts with `lat`. In Alaya, an address starts with `atp`.  
  + Example: `lat1kkydpwmnhqrp9cqtq47fcz0segsjzffqs6uha5` / `atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp`

+ __Public key__
  + In cryptography, you have a key pair: the public key and private key.
  + You can derive a public key from a private key, but you cannot derive a private key from a public key.
  + (Advanced) In PlatON/Alaya, the address "acts" like the public key, but it is not actually the public key.
  + (Advanced) In PlatON/Alaya, the public key is derived from the private key and contains 128 hexadecimal characters. Then you take the `"SHA3" (Keccak-256)` hash of this (64 characters), take the last 40 characters, and prefix with `0x`,  then convert the string to a bech32 address starting with `lat`/`atp` to give you a 42 character address.

+ __Private key__

  + You can use the private key to transfer funds from an account.

  + The secret part of your address/public key.

  + A string of 64 hexadecimal characters.

  + (Almost) Each string of 64 hexadecimal characters is a private key.

  + If you hand-type a private key today yet a different private key the next day, you will access a different wallet. So never hand-type your private key.

  + This is the string you need to send from your account. Without it, you cannot access your funds. Although you don't need to save this raw, unencrypted private key in this format, you can save the fancy version of it (for example, the keystore file/mnemonic phrase).

  + Example: `afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890`

+  __Keystore file__

  + Encrypted version of your private key saved in JSON format (although without a JSON extension).

  + A fancy version of your private key that is protected by a password you have chosen.

  + When combined with a password, it has the private key.

  + Safer than a private key, because you need the password.

  + The file name is usually an address string without starting with `0x` in the format of `UTC` + `--` + `DATE_CREATED` + `--` + `YOUR_ADDRESS_WITH_THE_atp/lat` .

  + File name example: `UTC--2021-03-29T03-48-12.719637196Z--lat1kkydpwmnhqrp9cqtq47fcz0segsjzffqs6uha5   /  atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp`

  + Content example:

    ```json
    {"address":"lat1ufgg0ypdpehdudcd0x3xwsc3h8er6y87jzjlcn","crypto":{"cipher":"aes-128-ctr","ciphertext":"2967a0ef519f86915292a61e9a6aed36edb9abbf069a7256f6e0434ab45e4f84","cipherparams":{"iv":"ab2ec5b9be6c9d3c4681e106b6c930e7"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"0267ddb5deb6a39f21068e51e26cb24f8771c7764cce716a2f3da96f809c1a80"},"mac":"c00149c28b8d938e42c66835d06810a02d831a99829c72f637806f8e7e7bbaef"},"id":"292f227a-69ad-4148-914d-a6d22612931e","version":3}
    ```

+ __Mnemonic phrase/seed phrase/seed words__

  + Another fancy version of your private key that is actually used to derive multiple private keys.
  + (Typically) a phrase of 12 or 24 words that allows you to access an unlimited number of accounts.
  + Used by ATON, Samurai, etc.
  + Derived from [BIP 39 Spec](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) 
  + The accounts you can access with this phrase are determined by the "path".
  + Example of a 12-word phrase: `brain surround have swap horror body response double fire dumb bring hazard`
  + Example of a 24-word phrase: `card enrich gesture connect kick topple fan body blind engine lemon swarm venue praise addict agent unaware equal bean sing govern income link leg`

+ __Identicon / AddressIdenticon / AddressIcon__

  + The colorful blob that corresponds to your address.
  + An easy way to check the correctness of your address.

+ __Hexadecimal__

  + Used for most things throughout PlatON/Alaya. A hexadecimal string consists of the numbers `0, 1, 2, 3, 4, 5, 6, 7, 8，9`, and letters `A, B, C, D, E, F`.

+ __Seed__

  + The input given to derive a private key. This should always be generated in a truly random way, not something you make up with your measly human brain.
  + The seed you chose is known as a brain wallet

+ __Brain wallet__

  + An account generated from a seed or password or password you choose.
  + Humans are not capable of generating enough entropy, so the wallets derived from these phrases are insecure.
  + Brain wallets can be brute-forced by super fast computers.
  + Brain wallets are insecure.
  + Don't use brain wallets.

+ __Entropy__

  + Also called "randomness".
  + The more random something is, the more entropy it has and the more secure it is. 
  + Usually defined in "bits of entropy" 
  + PlatON/Alaya's private key is a 256-bit key
  + The 24-word mnemonic phrase also represents 256 bits of entropy. There are 2,048 words in the dictionary. 11 bits of entropy (the words). `11 * 24 = 264`. The last word is a checksum.

+  __Derive/Derivation__

  + To derive something is to obtain it from an original source.
  + For example, if we want to derive a keystore from a private key and password, it means that the keystore was made from these two sources.
  + The keystore is the product of the two, so it is derived from them.

+ __Encryption__

  + Encryption is the act of converting a string of letters/numbers (such as your private key) into another string of letters/numbers through private translation.
  + There are many different ways of encryption.
  + Encryption protects your information from those who try to steal it!

+ __Smart contracts__

  + A piece of code (or program) stored on the blockchain network. Conditions of the contract are pre-defined by the user. If all the conditions are met, the contract (program) will execute certain actions.

+ __Blockchain__

  + A decentralized publicly owned ledger.



## Initializing DApps

Once you have your basic dev environment set up, you are ready to start interacting with some smart contracts. There are some basic things you'll need when communicating with a smart contract:

### Contract network

If you are not connected to the right network, you aren't going to have any luck sending transactions to your contract. So make sure you have this right!

Many clever dapps can recognize the user's current network and get adapted to it! For example, you could deliberately connect to the testnet (if you detect one) of your smart contract, which allows users to easily "try out" your system without any costs!

### Contract address

Every account in PlatON/Alaya has an address, be it an external key-pair account or a smart contract. To communicate with your contract, smart contract libraries need to know its exact address.

### Contract ABI

In PlatON/Alaya, the ABI specification is a way to encode the interface of a smart contract in a way that the user interface can make sense of. It is an array of objects describing methods. When you feed this and the addresses into a contract-abstraction library, this ABI will tell the library about what methods to provide and how to compose transactions to call these methods.

### Contract bytecode

If your web application is to publish a new pre-compiled smart contract, some bytecode may be required. In this case, you will not know the contract address in advance, but will have to publish and monitor the transaction to be processed, and then extract the final contract's address from the completed transaction.

To publish a contract from bytecode, you also need an ABI to interact with it! The bytecode does not describe how to interact with the final contract.

### Contract Source Code

If your website allows users to edit the smart contract source code and compile it, you can import a whole compiler. In this case, you will derive your bytecode and ABI from the source code, and eventually you will derive the contract's address from the completed transaction publishing that bytecode.



## Accessing Accounts

User accounts can be used in a variety of contexts in PlatON, including as identifiers and for signing transactions. To request a signature from the user or allow the user to approve a transaction, it is necessary to access the user's account. All signatures or transaction approvals involved in wallet methods below require the sending account as a function parameter.

+ `platon_sendTransaction`
+ `platon_sign`( insecure and unadvised to use)
+ `platon_sign (unsafe and not recommended)`
+ `platon_personalSign`
+ `platon_signTypedData`

Once connected to a user, you can check the current account at any time by checking `platon.selectedAddress`.

#### __Account changed to__:

If you want to be notified when your address changes, you can subscribe to an event:

```javascript
platon.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
});
```



If the first account in the returned array is not the account you expected, you should notify the user! In the future, the account array may contain more than one account. However, the first account in the array will continue to be considered the user's "selected" account.



## Sending Transactions

Transactions are a formal action on a blockchain. They are always initiated in Samurai with a call to the `platon_sendTransaction` method. They can involve a simple sending of lat/atp, may result in sending tokens, creating a new smart contract, or changing the state on the blockchain in a variety of ways. They are always initiated by a signature from an external account or a simple key pair.

In Samurai, using the platon.request method directly and sending a transaction will involve composing an options object like this:

```javascript
const transactionParameters = {
  nonce: '0x0', // ignored by Samurai
  gasPrice: '0x09184e72a000', // customizable by user during Samurai confirmation.
  gas: '0x2710', // customizable by user during Samurai confirmation.
  to: 'lat1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gzndwuv', // Required except during contract publications.
  from: platon.selectedAddress, // must match user's active address.
  value: '0x0', // Only required to send lat to the recipient from the initiating external account.
  data:
    '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  chainId: '0x64', // Used to prevent transaction reuse across blockchains. Auto-filled by Samurai.
};

// txHash is a hex string
// As with any RPC call, it may throw an error
const txHash = await platon.request({
  method: 'platon_sendTransaction',
  params: [transactionParameters],
});
```

#### Transaction parameters

Samurai handles many transaction parameters for you, but you'd better know what all the parameters do.

##### Nonce [ignored]

This field will be ignored in Samurai.

In PlatON, every transaction has a nonce. In this way, each transaction can only be processed once by the blockchain. In addition, to make a transaction valid, either the nonce must be 0, or a transaction with the previous number must have been processed.

This means that transactions are always processed in the order of a given account, so incrementing nonces is a very sensitive issue and can easily be messed up, especially when a user is interacting with multiple applications with pending transactions using the same account (potentially across multiple devices).

Due to these reasons, Samurai does not provide application developers with any way to customize the nonce of transactions it suggests, and instead assists users in managing their transaction queues themselves.

##### Gas Price [optional]

Optional parameters-better used on private blockchains.

In PlatON, the pool of pending transactions provides its gas price as a sort of auction bid to the validators to include the transaction in a block in exchange for transaction fees. In this sense, a high gas price can mean faster processing yet higher transaction costs.

Samurai helps users select a competitive gas price on the PlatON mainnet and popular testnets. We make requests to an API and allow users to choose between "slow", "medium" and "fast" options for their gas price.

We cannot know about the gas price on all blockchains because it requires in-depth analysis. Therefore, although you can safely ignore this parameter on our main hosted networks, you may still need to suggest a gas fee if your application knows the target network better than we do.

##### Gas Limit [optional]

Optional parameter. Rarely useful to Dapp developers.

Gas limit is a highly optional parameter. We will automatically calculate a reasonable price for it. 

##### To [semi-optional]

A PlatON address encoded by Bech32, required for transactions with a recipient (all transactions except for contract creation).

A contract will be created when the value of the to field is empty but the value of the data field is not empty.

##### Value [optional]

Hex-encoded value of the network's native currency to be sent. On the PlatON mainnet, this is `lat`. On the Alaya mainnet, this is `atp`, which is denominated in `von`, which is `1e-18 lat`.

Please note that these numbers often used in PlatON/Alaya have higher precision than native JavaScript numbers, and can lead to unpredictable behavior if not anticipated. Therefore, when manipulating values intended for the blockchain, we strongly recommend you use BN.js.

##### Data [semi-optional]

Required to create smart contracts.

This field is also used to specify the contract method and its parameters. You can learn more about how to encode data on the [Solidity ABI specification](https://solidity.readthedocs.io/en/develop/abi-spec.html).

##### Chain ID [currently ignored]

Chain ID is currently derived from the network at `platon.networkVersion` currently selected by the user. In the future, we may allow a way to connect to multiple networks at the same time. In that case, this parameter will become very important, so it may be useful to be in the habit of including now.





## Installation

+ Download [Samurai plugin package](https://github.com/AlayaNetwork/Samurai/releases)
+ Unzip the Samurai plugin package
+ [Load the decompressed plugin package via chrome](https://github.com/AlayaNetwork/Samurai/blob/feature/multi-networks/docs/add-to-chrome.md)



## References

### PlatON provider API

Samurai injects a global API into websites visited by its users at `window.platon`(currently `window.alaya` is also supported, in line with `window.platon`). This API allows websites to request the user's PlatON/Alaya accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.



#### Basic usage

For the normal operation of all important PlatON/Alaya web applications (aka dapp, web3 website, etc.), you must:


+ Detect the PlatON provider（`window.platon`）
+ Detect which network the user is connected to
+ Access the user's PlatON/Alaya account(s)

You can learn how to accomplish the other two in the code snippets in the "Using the Provider" section.

The provider API is all you need to create a full-featured web3 application.

In other words, many developers use a convenience library instead of directly using providers. If you need a higher abstraction than the one provided by this API, we recommend that you use a convenience library.



#### Chain ID

These are the IDs of the PlatON/Alaya chain supported by Samurai by default.

| Hexadecimal | Decimal | Network        |
| ----------- | ------- | -------------- |
| 0x64        | 100     | PlatON mainnet |
| 0x33585     | 210309  | PlatON testnet |
| 0x3113a     | 201018  | Alaya network  |
| 0x31146     | 201030  | Alaya testnet  |



#### Methods 

##### platon.isConnected()

> Tip
> Please note that this method has nothing to do with user accounts.
> In reference to whether a web3 website can access the user's account, you may have often encountered the word "connected". However, in the provider interface, "connected" and "disconnected" refer to whether the provider can issue RPC requests to the current chain.

```javascript
platon.isConnected(): boolean;
```

If the provider is connected to the current chain, it returns `true`; otherwise it returns `false`.

If the provider is not connected, the page will have to be reloaded to re-establish the connection. See `connect` and `disconnect` events for more information.



##### platon.request(args)

```javascript
    interface RequestArguments {
      method: string;
      params?: unknown[] | object;
    }

platon.request(args: RequestArguments): Promise<unknown>;
```

Used for `request` to submit RPC request to PlatON/Alaya network through Samurai. It returns a `Promise` to return the result of the RPC method call.

The `params` and return value will vary by the RPC method. In practice, if a method has any `params`, they are almost always of type `Array`.

If the request fails for any reason, the Promise will reject with an RPC Error.

Samurai supports most of the standardized PlatON/Alaya RPC methods. For details, see the [Samurai RPC API](#RPC API) documentation.



**Example**

```javascript
    params: [
      {
        from: 'lat1gyxmu70ppgmr37rme7a8segs0s3hgpwwxfa6vq',
        to: 'lat1fpjc7rz5z38kkyxupkhu9ez5nm0d3xwgrqjtcf',
        gas: '0x76c0', // 30400
        gasPrice: '0x9184e72a000', // 10000000000000
        value: '0x9184e72a', // 2441406250
        data:
        '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
      },
    ];

    platon
      .request({
        method: 'platon_sendTransaction',
        params,
      })
      .then((result) => {
        // The result varies by by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error) => {
        // If the request fails, the Promise will reject with an error.
      });
```



#### Events

The Samurai provider implements the [Node.js EventEmitter](https://nodejs.org/api/events.html) API. This section details the events emitted via this API. There are countless EventEmitter guides elsewhere, but you may listen for events like this:

  ```javascript
  platon.on('accountsChanged', (accounts) => {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
  });

  platon.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });
  ```

##### connect

```javascript
  interface ConnectInfo {
    chainId: string;
  }

  platon.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

When the Samurai provider is able to submit the RPC request to a chain, it will emit this event. We recommend you use a connect event handler and the `platon.isConnected()` method to determine when/whether the provider is connected.

##### disconnect

```javascript
platon.on('disconnect', handler: (error: ProviderRpcError) => void);
```

If the Samurai provider cannot submit the RPC request to any chain, it will emit this event. In general, this will only happen due to network connection problems or some unforeseen errors.

Once the `disconnect` has been emitted, the provider will not accept any new requests until the chain connection has been re-established, which requires the page to be reloaded. You can also use the `platon.isConnected()` method to determine if the provider is disconnected.

##### accountChanged

```javascript
platon.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The Samurai provider emits this event whenever the return value of the `platon_accounts` RPC method changes. `platon_accounts` returns an array that is either empty or contains a single account address. The returned address (if any) is the address of the most recently used account that the caller is allowed to access. The caller is identified by its URL origin, which means that all websites with the same origin share the same permissions.

This means that `accountsChanged` will send out this message whenever the user's exposed account address changes.

##### chainChanged

```
platon.on('chainChanged', handler: (chainId: string) => void);
```

When the currently connected chain changes, the Samurai provider will emit this event.

All RPC requests will be submitted to the currently connected chain. Therefore, it is crucial to track the current chain ID by listening for this event.

We strongly recommend reloading the page on chain ID changes, unless you have good reason not to.

```
platon.on('chainChanged', (_chainId) => window.location.reload());
```

##### message

```
interface ProviderMessage {
  type: string;
  data: unknown;
}

platon.on('message', handler: (message: ProviderMessage) => void);
```

When the Samurai provider receives some messages that the consumer should be notified of, it will emit this event. Such messages are identified by the `type` string.

RPC subscription update is a common use case for this message event. For example, if you use `platon_subscribe` to create a subscription, each subscription update will be emitted as a `message` event with a `type` of `platon_subscription`.



#### Errors

All errors thrown or returned by the Samurai provider follow this interface:

```
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

The `platon.request(args)` method throws errors eagerly. You can often use the errorcode property to determine why the request failed. Common codes and their meanings include:

 + `4001`

   + The request was rejected by the user

 + `32602`

   + The parameter is invalid

 + `32603`

   + Internal error

   

#### Using the provider

This snippet explains how to accomplish the three most common requirements for web3 sites:

  + Check PlatON provider (window.platon)
  + Detect which PlatON/Alaya network the user is connected to
  + Access the user's PlatON/Alaya account

```javascript
  /*****************************************/
  /* Detect the Samurai PlatON provider */
  /*****************************************/

  import detectPlatONProvider from '@metamask/detect-provider';

  // this returns the provider, or null if it wasn't detected
  const provider = await detectPlatONProvider();

  if (provider) {
    startApp(provider); // Initialize your app
  } else {
    console.log('Please install Samurai!');
  }

  function startApp(provider) {
    // If the provider returned by detectPlatONProvider is not the same as
    // window.platon, something is overwriting it, perhaps another wallet.
    if (provider !== window.platon) {
      console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
  }

  /**********************************************************/
  /* Handle chain (network) and chainChanged                */
  /**********************************************************/

  platon.on('chainChanged', handleChainChanged);

  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  /***********************************************************/
  /* Handle user accounts and accountsChanged                */
  /***********************************************************/

  let currentAccount = null;
  platon
    .request({ method: 'platon_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  platon.on('accountsChanged', handleAccountsChanged);

  // For now, 'platon_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // Samurai is locked or the user has not connected any accounts
      console.log('Please connect to Samurai.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
    }
  }

  /*********************************************/
  /* Access the user's accounts                */
  /*********************************************/

  // You should only attempt to request the user's accounts in response to user
  // interaction, such as a button click.
  // Otherwise, you popup-spam the user like it's 1999.
  // If you fail to retrieve the user's account(s), you should encourage the user
  // to initiate the attempt.
  document.getElementById('connectButton', connect);

  // While you are awaiting the call to platon_requestAccounts, you should disable
  // any buttons the user can click to initiate the request.
  // Samurai will reject any additional requests while the first is still
  // pending.
  function connect() {
    platon
      .request({ method: 'platon_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // If this happens, the user rejected the connection request.
          console.log('Please connect to Samurai.');
        } else {
          console.error(err);
        }
      });
  }
  ```



#### Legacy properties

+ `platon.chainId`

  A hexadecimal string representing the current chain ID.

+ `platon.networkVersion`

  The decimal string representing the current blockchain network ID.

+ `platon.selectedAddress`

  To return a hexadecimal string representing the user's "currently selected" address.

  

### RPC API

Samurai uses the `platon.request(args)` method to encapsulate the RPC API.

The API is based on the interfaces exposed by all PlatON/Alaya clients, as well as more and more methods that may or may not be supported by other wallets.

> Tips
> All RPC method requests may return errors. Make sure the abnormality is handled every time you call `platon.request(args)`.

#### ** PlatON JSON-RPC method**

For information about PlatON JSON-RPC API, please refer to [PlatON-DevDocs](https://devdocs.platon.network/docs/zh-CN/JS_SDK/).

Important API methods are as follows:

  + `platon_accounts`
  + `platon_call`
  + `platon_getBalance`
  + `platon_sendTransaction`
  + `platon_sign`

Permissions：

+ `platon_requestAccount`
+ `wallet_getPermissions`
+ `wallet_requestPermissions`



#### Permission related

+ ##### platon_requestAccounts

  **Return value**

  `string[]` - An array of single PlatON/Alaya address strings.

  

  **Description**

  Ask the user to provide a PlatON/Alaya address as an identification. Return a Promise that resolves to an array of strings of individual PlatON/Alaya addresses. If the user rejects the request, the Promise will reject it with a `4001` error.

  This request will result in a Samurai pop-up window. You only need to respond to user actions (such as clicking a button) to request the user's account. While the request is still pending, the button that caused the dispatch request should always be disabled.

  If you are unable to obtain a user’s account, you should encourage the user to initiate an account creation request.

  

  **Example**

  ```javascript
    document.getElementById('connectButton', connect);

    function connect() {
      platon
        .request({ method: 'platon_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((error) => {
          if (error.code === 4001) {
            console.log('Please connect to Samurai.');
          } else {
            console.error(error);
          }
      });
    }
    ```

+ ##### wallet_requestPermissions

  **Parameter**

  `Array`

    0. `RequestedPermissions` - Requested permissions.

  ```javascript
  interface RequestedPermissions {
    [methodName: string]: {}; // an empty object, for future extensibility
  }
  ```

  **Return value**

  `Web3WalletPermission[]` - An array of caller permissions.

  

  **Description**

  Ask the user for the given permission. Return a Promise, which resolves to an array of non-empty `Web3WalletPermission` objects, corresponding to the current permissions of the caller. If the user rejects the request, the Promise will reject it with a `4001` error.

  This request will wake up a Samurai pop-up window. You should only request permission to respond to user actions, such as clicking a button.

  

  **Example**

  ```javascript
    document.getElementById('requestPermissionsButton', requestPermissions);

    function requestPermissions() {
    platon
      .request({
        method: 'wallet_requestPermissions',
        params: [{ platon_accounts: {} }],
      })
      .then((permissions) => {
        const accountsPermission = permissions.find(
          (permission) => permission.parentCapability === 'platon_accounts'
        );
        if (accountsPermission) {
          console.log('platon_accounts permission successfully requested!');
        }
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log('Permissions needed to continue.');
        } else {
          console.error(error);
        }
      });
    }
    ```

+ #### wallet_getPermissions

  **Return value**

  `Web3WalletPermission[]` - An array of caller permissions.

  

  **Description**

  Get the current permissions of the caller. The Promise parsed as an array of Web3WalletPermission objects will be returned. If the caller does not have permission, the array will be empty.

  

#### Other RPC API

+ ##### wallet_watchAsset

  **Parameter**

  `WatchAssetParams` - The metadata of the asset to be observed.

  ```javascript
  interface WatchAssetParams {
      type: 'ERC20'; // In the future, other standards will be supported
      options: {
        address: string; // The address of the token contract
        'symbol': string; // A ticker symbol or shorthand, up to 5 characters
        decimals: number; // The number of token decimals
        image: string; // A string url of the token logo
      };
    }
  ```

  **Return value**

  boolean - If the token has been added, it returns `true`; otherwise it returns `false`.

  

  **Description**

  In Samurai, users track token requests. Boolean indicates whether the token has been successfully added.

  Most PlatON/Alaya wallets support certain token sets, usually obtained from a centrally planned token registry. `wallet_watchAsset` enables web3 application developers to require their users to track the tokens in their wallets at runtime. Once added, the token cannot be distinguished from the tokens added through traditional methods (such as centralized registration).

  

  **Example**

  ```javascript
  platon.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'PRC20',
      options: {
        address: 'lat1alad2dlvkxvcyz02ag5vtxs9c678mvc5adr3vm',
        symbol: 'FOO',
        decimals: 18,
        image: 'https://foo.io/token-image.svg',
      },
    },
    });
  .then((success) => {
    if (success) {
      console.log('FOO successfully added to wallet!')
    } else {
      throw new Error('Something went wrong.')
    }
  })
  .catch(console.error)
  ```



## Example

The following example demonstrates how to initiate common and contract transaction operations on the web console to evoke Samurai for transaction processing.

After opening Samurai and importing the account, open a new page. Right-click -> check -> console to enter the debug mode (the following command lines are executed in the console). Samurai will inject platon and web3a objects when opening the page, so they can be used directly in the console.



### Ordinary Transaction

+ Request the authorization of the Samurai user, run the following command to evoke the Samurai interface, and select the corresponding account to agree to authorize the page connection permissions

```
> platon.request({ method: 'platon_requestAccounts' });
Promise {<pending>}
> platon.selectedAddress
"lat1mm09yjr8vwr2g78gselj03w2eks7atq2t4y83p"
```

+ To initiate an ATP transfer transaction, running the following command will evoke Samurai to process the transaction, and you can perform operations such as re-edit.

```
> web3a.platon.sendTransaction({from: platon.selectedAddress,to: "lat1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gzndwuv", value: 1e16}, function(err, transactionHash) {if (err) { console.log(err); } else {console.log(transactionHash);}});
```

### DApp Development Integration

On the DApp development page, since Samurai will inject a platon object when opening the page, the object can be directly called through javascript to complete the corresponding operation during development. For the introduction and use of web3a objects, see [js-sdk document](https://devdocs.platon.network/docs/zh-CN/JS_SDK/).

The following example shows the corresponding `javascript` script that is called after clicking a page button to initiate a transfer.
```
var Web3A = require('web3');
var web3platon = new Web3A(platon)
contract = new web3platon.platon.Contract(abi, address);
toAccount = "lat1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gzndwuv";
transferBalance = 1000000000000000;
contract.methods.transfer(toAccount,transferBalance)
  .send({from:platon.selectedAddress, gas:4712388})
  .then (function(receipt){
    console.log("receipt: ", receipt);
  }).catch(function(err) {
    console.log('err: ', err);
  })
```
