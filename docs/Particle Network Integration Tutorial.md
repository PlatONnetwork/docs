---
id: Particle_Network_Integration_for_PlatON
title: Integrating Particle Network within dApps on PlatON
sidebar_label: Particle Network integration tutorial
---

# Particle Network Wallet-as-a-Service

[Particle Network](https://particle.network)'s Wallet Abstraction services enable universal, Web2-adjacent onboarding and interactions. Its core technology, [Smart Wallet-as-a-Service](https://blog.particle.network/announcing-our-smart-wallet-as-a-service-modular-stack-upgrading-waas-with-erc-4337) (WaaS) aims to onboard users into MPC-secured smart accounts supporting any chain. It also allows developers to offer an improved user experience through modular, fully customizable EOA/AA embedded wallets. Particle supports its Smart Wallet-as-a-Service through a Modular L1 powering chain abstraction, acting as a settlement layer across chains for a seamless multi-chain experience.

Particle Network's Wallet-as-a-Service supports PlatON Mainnet and Testnet through standard EOA-based social logins. Therefore, developers building on PlatON can natively leverage Particle Network for onboarding users into application-embedded wallets using social logins through various SDKs that are directly compatible with PlatON.

On this page, you'll find a high-level overview of the integration process, exploring the basics of leveraging Particle Network specifically on PlatON. A basic integration can be done in just a few lines of code; this document will go over such an example.

## Integrating Particle Network's Wallet-as-a-Service on PlatON

When it comes to implementing Particle Network's Wallet-as-a-Service within your application on PlatON, you have a few options. If you're building a mobile application, Particle Network has compatible Android, iOS, Flutter, Unity, React Native, and Cocos SDKs. Otherwise for Desktop (as is the focus in this example), Particle Network has a few primary libraries relevant to this example, they are as follows:

- `@particle-network/auth-core-modal`, the primary SDK enabling integration of Particle's Wallet-as-a-Service, called "Particle Auth Core."
- `@particle-network/chains`, an optional yet helpful library for specifically using PlatON within the former SDK.

To install these libraries, run one of the two following commands:

```shell
yarn add @particle-network/auth-core-modal @particle-network/chains

# OR

npm install @particle-network/auth-core-modal @particle-network/chains
```

Once you've installed these two libraries, you're ready to begin either integrating Particle Network within your existing application, or building a new application leveraging Particle Network. For this tutorial, we'll build a basic React application showcasing the social login functionality. To do this, we can start with the following:

1. Configure Particle Auth Core (`@particle-network/auth-core-modal`) within `index.ts` or an adjacent file.
To start building this example application, you'll need to configure Particle Auth Core (the primary library driving integration). This is done primarily through an object called `AuthCoreContextProvider` which should wrap your main `App` component (or it's equivalent in your project; where you intend on using Particle Auth Core). After importing `AuthCoreContextProvider` from `@particle-network/auth-core-modal` and opening the `options` parameter (as is shown below), you'll need to set the following parameter:
- `projectId`, `clientKey`, and `appId`. Each of these values are required for the initialization of Particle Auth Core as they fundamentally link your project with the [Particle dashboard](https://dashboard.particle.network). Thus, to retrieve these values, sign up and create a project on the aforementioned dashboard. Within this project, create a new application (A web app in this case), then copy the **Project ID**, **Client Key**, and **App ID** to be used within their associated parameters.

Beyond your `projectId`, `clientKey`, and `appId`, there are numerous optional parameters to further configure the modal.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { PlatON } from '@particle-network/chains';
import { AuthCoreContextProvider, PromptSettingType } from '@particle-network/auth-core-modal';
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthCoreContextProvider
      options={{
        projectId: process.env.REACT_APP_PROJECT_ID,
        clientKey: process.env.REACT_APP_CLIENT_KEY,
        appId: process.env.REACT_APP_APP_ID,
        themeType: 'dark', // Optional
        fiatCoin: 'USD', // Optional
        language: 'en', // Optional
        promptSettingConfig: { // Optional, determines the security settings that a user has to configure
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },
        wallet: { // Optional, streamlines the wallet modal popup
          visible: true, // Displays an embedded wallet popup on the bottom right of the screen after login
          customStyle: {
            supportChains: [PlatON],
          }
        },
      }}
    >
    <App />
      </AuthCoreContextProvider>
  </React.StrictMode>
)
```

2. Setup various hooks within your primary `App` component (or it's equivalent).
With Particle Auth Core configured (through your `index.ts` file), you're ready to begin using the SDK and facilitating social login within your main `App` component, or whichever file you intend on using Particle Auth within (which should be the same file specified within `index.ts`, in the example above it was `App`). Specifically for this example, you can import `useEthereum`, `useConnect`, and `useAuthCore` from `@particle-network/auth-core-modal`.

- `useConnect` will facilitate social login, providing functions such as `connect` and `disconnect`.
- `useEthereum` will enable address retrieval, EIP-1193 provider construction (for using Particle with Ethers, Web3.js, viem), etc.
- `useAuthCore` will allow you to retrieve account information from users after they've logged in with their social account (such as their linked email).
For a full list of hooks, take a look at the [Particle Auth Core documentation](https://docs.particle.network/developers/auth-service/core/web#auth-core-hooks).

An example of using each of these hooks in tandem with one another to facilitate social login and execute a sample transaction on PlatON has been included below.

```js
import React, { useState, useEffect } from 'react';

import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { PlatON } from '@particle-network/chains';

import { ethers } from 'ethers';
import { notification } from 'antd';

import './App.css';

const App = () => {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState(null);

  const customProvider = new ethers.providers.Web3Provider(provider, "any");

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo]);

  const fetchBalance = async () => {
    const balanceResponse = await customProvider.getBalance(await customProvider.getSigner().getAddress());

    setBalance(ethers.utils.formatEther(balanceResponse));
  }

  // Upon calling, the user will be prompted to login with their social account according to authType
  const handleLogin = async (authType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: PlatON,
      });
    }
  };

  // The user will be required to click on an application-embedded confirmation popup, after which this transaction will be sent.
  const executeTx = async () => {
    const signer = customProvider.getSigner();
    console.log(await signer.getAddress())


    const tx = {
      to: "0x00000000000000000000000000000000000dEAD0",
      value: ethers.utils.parseEther("0.001")
    };

    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();

    notification.success({
      message: txReceipt.transactionHash
    })
  };

  return (
    <div className="App">
      {!userInfo ? (
        <div className="login-section">
          <button className="sign-button" onClick={() => handleLogin('google')}>Sign in with Google</button>
          <button className="sign-button" onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
        </div>
      ) : (
        <div className="profile-card">
          <h2>{userInfo.name}</h2>
          <div className="balance-section">
            <small>{balance} LAT</small>
            <button className="sign-message-button" onClick={executeTx}>Execute Transaction</button>
            <button className="disconnect-button" onClick={() => disconnect()}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
```

Thus, Particle Network's Wallet-as-a-Service can be plugged in and used as you would any other standard wallet on PlatON, enabling social logins in just a few lines of code.

## Learn More

- [Particle Dashboard](https://dashboard.particle.network)
- [Particle Documentation](https://docs.particle.network)
- [PlatON Example Repository](https://github.com/TABASCOatw/particle-platon-demo)
