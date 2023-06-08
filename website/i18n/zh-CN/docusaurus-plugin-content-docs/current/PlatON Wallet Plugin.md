---
id: PlatON_Wallet_Operation_Manual
title: PlatON-Wallet - 操作手册
sidebar_label: PlatON钱包插件
---

# PlatON Wallet 操作手册

## 概述
  PlatON 钱包插件集成了钱包基础功能、跨链、法币通道、Swap 等多种功能。未来还将实现跨币种的兑换、基于密态支付的交易鉴权、预付费卡销售、虚拟 VISA 卡等更多功能。

  PlatON 钱包插件兼容多种去中心化钱包，应用方通过集成 PlatON 钱包插件后，可以使得其用户方便的进行跨链充值、法币购买等操作。

  为了满足项目方的各种集成需求，我们将为一系列语言和框架提供 SDK，使应用开发人员可以根据不同的业务场景快速完成集成。

## 集成方式

  - [PlatON钱包插件SDK](/docs/zh-CN/PlatON_Wallet_Plugin_Sdk)：提供完整的钱包功能和页面，通过简单的单点集成，可快速使用钱包内所有的功能。

   我们也即将提供更多种集成方式，以满足应用不同场景的集成需求。

## 使用教程 
> **注意：**由于 PlatON 钱包插件本身不生成账户地址，依赖于其他有账户第三方的钱包，如Metamask等。因此所有的交易将通过第三方钱包来完成。

**1、连接钱包**
 当应用集成 PlatON 钱包插件之后，通过应用连接Metamask之后，PlatON钱包也会同步连接上Metamask。连接 Metamask 之后，PlatON 钱包插件将展示该账户在 PlatON 网络上资产情况。

<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/connect.jpg" alt="connect"/>

**2、发送与接收**
 钱包插件支持发送和接收 PlatON 网络上的 Token。

<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/send-receive.jpg" alt="send-receive"/>

**3、充值**
  目前提供两种方式来进行 PlatON 网络资产的充值：

-  方式一：通过跨链桥的方式从其他网络跨入资产到 PlatON 网络
-  方式二：通过集成 Alchemy Pay，支持以法币支付的方式购买 PlatON 网络上的资产
  未来我们还将支持更多种便捷的充值方式。
   
<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/deposit.jpg" alt="deposit"/>

**4、提取**
  目前我们有两种方式可将 PlatON 上的资产提取出去：

-  方式一：通过跨链桥的方式将 PlatON 网络资产提取到其他网络。
- 方式二 ：通过 [txnhub.io](https://txnhub.io) 购买购物卡。
    
<img src="/docs/img/zh-CN/PlatON-Wallet-imgs/withdraw.jpg" alt="withdraw"/>

**5、更多功能**
我们后续将支持更多网络，更多币种的跨链，不同币种之间的Swap，以及基于密态支付的交易鉴权、虚拟 VISA 卡等等更多功能。
