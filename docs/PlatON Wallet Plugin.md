---
id: PlatON_wallet_plugin
title: PlatON-Wallet - Operation_Manual
sidebar_label: PlatON wallet plugin 
---

# PlatON Wallet Plugin

## What is PlatON Wallet Plugin

The PlatON Wallet plugin integrates basic wallet functions, cross-chain, fiat channels, Swap and other functions. In the future, it will realize more functions such as cross-currency exchange, transaction authentication based on confidential payment, prepaid card sales, virtual VISA cards, etc. 

The PlatON Wallet plugin is compatible with various decentralized wallets. After integrating the PlatON Wallet plugin, the project party can enable its users to easily conduct cross-chain recharge, fiat purchase and other operations.

In order to meet the various integration needs of the project parties, we will provide SDKs for a series of languages and frameworks, so that application developers can quickly complete integration according to different business scenarios.

## How to integrate
- [PlatON wallet plugin SDK](/docs/en/PlatON_Wallet_Plugin_Sdk): Provides complete wallet functions and pages. Through simple one-point integration, you can quickly use all the functions in the wallet.

We will also provide more integration methods to meet the integration needs of applications in different scenarios. 

## How to use

> **Note:** Since the PlatON Wallet plugin itself does not generate account addresses and relies on third-party wallets with accounts, such as Metamask, etc., all transactions will be completed through third-party wallets. 

**1. Connect Wallet** 

After the application integrates the PlatON Wallet plugin, the PlatON wallet will also synchronize and connect to Metamask after the application connects to Metamask. After connecting to Metamask, the PlatON Wallet plugin will display the asset status of the account on the PlatON network.

<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/connect.jpg" alt="connect"/>

**2. Send and Receive** 

The wallet plugin supports sending and receiving Tokens on the PlatON network. 

<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/send-receive.jpg" alt="send-receive"/>

**3. Recharge** 

Currently there are two ways to recharge assets on the PlatON network: 

- Method 1: Transfer assets from other networks to the PlatON network through cross-chain bridges 
- Method 2: Purchase assets on the PlatON network by paying in fiat currency through integration with Alchemy Payand FaTPay.   We will support more convenient recharge methods in the future. 
- Method 3: Deposit through Interchain Transfer. After depositing assets to the specified address, the asset deposit on the PlatON network can be completed.

<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/deposit.jpg" alt="deposit"/>

**4. Withdraw** 

Currently we have two ways to withdraw assets from PlatON: 
- Method 1: Withdraw PlatON network assets to other networks through cross-chain bridges. 
- Method 2: Purchase shopping cards through [txnhub.io](https://txnhub.io) 

<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/withdraw.jpg" alt="withdraw"/>

**5. More Functions** 

We will subsequently support more networks, more cross-chain of currencies, Swap between different currencies, transaction authentication based on confidential payment, virtual VISA cards and more functions. 

