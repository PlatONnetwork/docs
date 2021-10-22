---
id: Samurai_API
title: Samurai API
sidebar_label: Samurai API
---

## 指导

Samurai 是基于 PlatON web 钱包 Metamask 进行 fork 的，针对 PlatON/Alaya 网络进行适配性的修改, 以满足基于 PlatON/Alaya 网络的安全和可用性的需求。用户可以很方便的管理账户并连接到 PlatON/Alaya 网络。

### 介绍

- **为什么选择 Samurai**

  Samurai 是为了满足基于 PlatON/Alaya 网络的安全和可用网站的需求，特别是它处理账户管理并将用户连接到区块链网络。

- **账户管理**

  Samurai 允许用户以各种方式管理帐户及其密钥，同时将它们与站点上下文隔离。与将用户密钥存储在单个中央服务器甚至本地存储上相比，这是一个很大的安全性改进，它可以防止大量帐户被盗。

  此安全功能使开发者的更加方便：对于开发者来说，只需与全局可用的交 platon API，用于标识 WEB3 兼容的浏览器的用户（如 Samurai 用户），每当你请求一个交易签名（如 platon_sendTransaction，platon_signTypedData 或其他）， Samurai 将以一种易于理解的方式提示用户。这样可以使用户保持了解情况，并使攻击者可以尝试对单个用户进行网络钓鱼，而不是进行大规模的黑客攻击（尽管 DNS 黑客攻击仍然可以用于大规模网络钓鱼）

- **区块链连接**

  Samurai 预先加载了 PlatON/Alaya 区块链和多个测试网络的快速连接。这可以使您在不同步整个节点的情况下开始使用。

  同时，Samurai 可以与任何公开的 PlatON 兼容的 JSON RPC API 的区块链都兼容，包括自定义和私有的区块链。

### 入门

要利用 Samurai 进行开发，首先在你的开发机器上安装 samurai，具体安装见下文

```
快速说明...
本指南假定您具有HTML, CSS和JavaScript的中级知识
```

一旦安装并运行了 Samurai，您应该发现新的浏览器选项卡中有对象 window.platon 在开发人员控制台中可用。这就是您的网 Samurai 交互的方式。

- **基本注意事项**

  - **web3 检测**

    要验证浏览器是否正在运行 Samurai，请将下面的代码片段复制并粘贴到 Web 浏览器的开发者控制台中：

    ```
    if (typeof window.platon !== 'undefined') {
      console.log('Samurai is installed!');
    }
    ```

    您可以在 3 中查看该 window.platon 对象的完整 API

  - **重置本地随机数**

    如果您正在运行测试区块链并重新启动它，您可能会意外混淆 Samurai，因为它会根据网络状态和已知的已发送交易来计算下一个 nonce。

    要清除 Samurai 的交易队列并有效地重置其 nonce 计算，您可以使用 Reset Account 按钮在 Settings 中（位于右上角的三明治菜单中）

  - **用户状态**

    当前，与 API 交互时需要考虑一些有状态的事情：

    - 当前的网络是什么？
    - 当前的账户是哪个？

    这两个都可以通过 platon.networkVersion 和同步使用 platon.selectedAddress。您也可以使用事件来监听更改，请参阅后续的 API 章节

  - **连接到 Samurai**

    “连接”或“登录”到 Samurai 实际上意味着“访问用户的 PlatON/Alaya 帐户”。

    您仅应响应用户的直接操作（例如单击按钮）来发起连接请求。连接请求待处理时，您应始终禁用“连接”按钮。您永远不要在页面加载时启动连接请求。

    我们建议您提供一个按钮，以允许用户将 Samurai 连接到您的 dapp。单击此按钮应调用以下方法：

    ```
    platon.request({ method: 'platon_requestAccounts' });
    ```

- **选择便利的开发库**
  存在便利的开发库的原因多种多样

  其中一些简化了特定用户接口元素的创建，一些完全管理了用户帐户，另一些则为您提供了与智能合约进行交互的各种方法，以用于从 promise，callback 到强类型和各种 API 偏好，等等。

  提供者 API 本身非常简单，并且包装 PlatON JSON-RPC 格式化的消息，这就是为什么开发人员通常使用便捷库与提供者进行交互的原因，例如 platon-truffle 等。通过这些工具，您通常可以找到足够的文档来与提供程序进行交互，而无需阅读此较低级别的 API。

### 基础知识

#### 专业术语

- **钱包(Wallet)**

  - 你用来管理你自己账户的 interface/client/wrapper/holder。

- **账户(Account)**
  - 一个公私钥对，可以持有您的资金。
  - 您的资金实际上存储在区块链上而不是在钱包或账户中。
  - 就像您的 Reddit 帐户具有用户名 (public)和密码 (private)一样，PlatON 帐户也是如此。为了提高安全性，您可以使用密码来加密您的私钥。请参阅本 Keystore File 节。
- **地址(Address)**
  - 您可以使用此发送资金到一个帐户。
  - 有时也称为“公钥”。
  - 由 lat/atp+39 个字符组成的字符串，bech32 类型地址。
  - 在 PlatON 中，地址以 lat 开头。
  - 例子：lat1kkydpwmnhqrp9cqtq47fcz0segsjzffqs6uha5
- **公钥(Public Key)**
  - 在密码学中，您有一个密钥对：公钥和私钥。
  - 您可以从私钥中派生公钥，但不能从公钥中派生私钥。
  - （高级）在 PlatON 中，地址像公钥一样“起作用”，但实际上不是公钥。
  - （高级）在 PlatON 中，公钥是从私钥派生的，并且是 128 个十六进制字符。然后，您将其"SHA3" (Keccak-256)哈希值（64 个字符），最后 40 个字符，并以 0x 作为前缀，给您 42 个字符的字符串。 然后将该字符串转换成 lat 开头的 bech32 地址。
- **私钥(Private Key)**
  - 您可以用它从一个帐户中转账。
  - 地址/公钥的秘密部分。
  - 一串 64 个十六进制字符组成的字符串。
  - （几乎）由 64 个十六进制字符组成的每个字符串都是一个私钥。
  - 如果您今天和昨天用手动方式键入不同的私钥，则将访问其他钱包。切勿手动输入私钥。
  - 这是您需要从帐户发送的字符串。没有它，您将无法使用您的资金。虽然，您无需以这种格式保存此原始的未加密的私钥。您可以保存它的优雅版本（例如，keystore 文件/助记词）。
  - 例子：
    ```
    afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890
    ```
- **Keystore 文件**
  - 以 JSON 格式保存的私钥加密版本(尽管没有 JSON 的扩展名)。
  - 您的私钥的优雅版本，受您选择的密码口令保护。
  - 与密码口令结合使用时，它具有私钥。
  - 比私钥安全，因为您需要密码口令。
  - 文件名通常采用 UTC + -- + DATE——CREATED + -- +格式没有 0x 开头的地址字符串
  - 文件名示例：UTC--2021-03-29T03-48-12.719637196Z--e25087902d0e6ede370d79a2674311b9f23d10fe
  - 内容示例：
    ```json
    {
      "address": "lat1ufgg0ypdpehdudcd0x3xwsc3h8er6y87jzjlcn",
      "crypto": {
        "cipher": "aes-128-ctr",
        "ciphertext": "2967a0ef519f86915292a61e9a6aed36edb9abbf069a7256f6e0434ab45e4f84",
        "cipherparams": { "iv": "ab2ec5b9be6c9d3c4681e106b6c930e7" },
        "kdf": "scrypt",
        "kdfparams": {
          "dklen": 32,
          "n": 262144,
          "p": 1,
          "r": 8,
          "salt": "0267ddb5deb6a39f21068e51e26cb24f8771c7764cce716a2f3da96f809c1a80"
        },
        "mac": "c00149c28b8d938e42c66835d06810a02d831a99829c72f637806f8e7e7bbaef"
      },
      "id": "292f227a-69ad-4148-914d-a6d22612931e",
      "version": 3
    }
    ```
- **助记词/种子短语/种子词(Mnemonic Phrase/Seed Phrase/Seed Words)**
  - 您的私钥的另一个高级版本，实际上用于派生多个私钥。
  - 一个（通常）12 或 24 个单词的短语，使您可以访问无限数量的帐户。
  - 由 ATON, Samurai 等使用。
  - 源自[BIP 39 Spec](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
  - 您可以使用此短语访问的由“路径”决定的帐户。
  - 示例 12 个单词： brain surround have swap horror body response double fire dumb bring hazard
  - 示例 24 个单词： card enrich gesture connect kick topple fan body blind engine lemon swarm venue praise addict agent unaware equal bean sing govern income link leg
- **识别码/地址识别码/地址图标(Identicon / AddressIdenticon / AddressIcon)**
  - 与您的地址相对应的彩色斑点。
  - 这是查看您的地址是否正确的简单方法。
  - 注意：以上地址是单个字符，但图标和颜色明显不同。
- **十六进制(Hexadecimal)**

  - 在整个 PlatON 中用于大部分的事物，十六进制字符串由数字 0 1 2 3 4 5 6 7 8 9 和 A B C D E F 组成。

- **种子(Seed)**
  - 为获得私钥而提供的输入。这应该始终以一种真正随机的方式生成，而不是由您可怜的人脑组成的东西。
  - 如果您选择了种子，则称为 brain wallet
- **脑钱包(Brain Wallet)**
  - 根据您选择的种子或密码或密码生成的帐户。
  - 人类没有能力产生足够的熵，因此从这些短语中得出的钱包是不安全的。
  - 超快计算机可能会强行破解大脑钱包。
  - 脑钱包是不安全的。
  - 不要使用脑钱包。
- **熵(Entropy)**
  - 也称为“随机性”。
  - 事物越随机，它的熵就越大，它的安全性就越高。
  - 通常以“熵的位数”或强行获得具有这么大熵的\ _ \ _ \ _ \ _（例如私钥）所需的年数来定义。
  - PlatON 的私钥是 256 位密钥
  - 24 词助记词短语也是 256 位熵。字典中有 2048 个单词。11 位熵（单词）。11 \* 24 = 264。最后一个字是校验和。
- **派生(Derive/Derivation)**
  - 派生某物就是从原始来源获得它。
  - 例如，如果我们要从私钥和口令派生 keystore，则意味着 keystore 是从这两个来源创建的。
  - keystore 是两者的乘积，因此它是从两者派生的。
- **加密(Encryption)**
  - 加密是采取一串字母/数字（例如您的私钥），然后通过私有转换的方法将它们转换为另一串字母/数字的行为。
  - 有多种不同的加密方法。
  - 加密为那些试图窃取的您的信息提供了保护！
- **加密密钥和未加密密钥(Encrypted vs Unencrypted Keys)**
  - 未加密的私钥长度为 64 个字符，用于解锁或恢复钱包。
  - 加密密钥的长度也为 64 个字母，并且是经过上述加密过程的常规私钥。
  - 例如，如果单词“ Apple”是您的缩短的私钥，那么它被加密为字母下方的三个字母，则新的缩短的加密密钥为“ Dssoh”。由于您知道加密此密钥的方法，因此可以通过反转加密方法从中获得原始私钥。
  - 通常，加密的私钥保存在扩展程序或加密设备中，并且不会被用户看到。这旨在增加另一层安全性，以确保用户的钱包信息安全。
- **去中心化(Decentralize / Decentralization)**

  - 将单个实体（例如政府或大型公司）的权限转移到多个较小实体的过程。

- **不信任(Trustless)**

  - 区块链负责的分布式无信任共识。由于每个人都有曾经执行过的所有交易的分类帐的副本，因此不需要第三方。您可以自己验证交易，但是创建了 PlatON 区块链和比特币区块链以确保当满足所有条件时各方之间执行规则和协议。

- **智能合约(Smart Contracts)**

  - 存储在区块链网络上的一段代码（或程序）。合约的条件由用户预先定义，如果满足所有条件，则合约（程序）将执行某些操作。

- **区块链(Blockchain)**

  - 去中心化的公共帐本。

### 初始化 Dapps

- **合约网络**

  如果您未连接到正确的网络，则不会有任何将交易发送到合约，因此请确保您连接正确的网络！

  许多聪明的 dapp 都能识别用户的当前网络，并真正适应它！例如，如果您检测到测试网络，则可以故意连接到智能合约的测试网络版本，这使用户可以轻松地“试用”您的系统而无需花费真金白银！

- **合约地址**

  PlatON 中的每个账户都有一个地址，无论是外部密钥对账户还是智能合约。为了使任何智能合约库都能与您的合约进行通信，他们需要知道其确切地址。

- **合约 ABI**

  在 PlatON 中，ABI 规范是一种以用户界面可以理解的方式对智能合约的界面进行编码的方法。它是一个描述方法的对象数组，当您将其和地址提供给合同抽象库时，它会 ABI 告诉这些库要提供的方法以及如何编写调用这些方法的事务。

- **合约 bytecode**

  如果您的 Web 应用程序要发布预先编译的新智能合约，则可能需要包含一些 bytecode。在这种情况下，您将不会事先知道合同地址，而必须发布，监视要处理的交易，然后从完成的交易中提取最终合约地址。

  如果从 bytecode 发布合同，则您还需要 ABI 与之交互！字节码未描述如何与最终合同交互。

- **合约源代码**

  如果您的网站将允许用户编辑智能合约源代码并进行编译，您可以导入整个编译器，在这种情况下，您将从该源代码派生您的字节码和 ABI，最终您将从发布该字节码的已完成交易中获取合同的地址。

### 访问账户

用户账户在 PlatON 的各种环境中都可以使用，包括用作身份标识符和签署交易。为了请求用户签名或让用户批准交易，必须能够访问用户的帐户。在 wallet methods 下面涉及的签名或交易的批准，所有都需要发送帐户作为函数参数。

- platon_sendTransaction
- platon_sign(不安全且不建议使用)
- platon_personalSign
- platon_signTypedData

一旦你连接到用户，可以随时通过检查 platon.selectedAddress 去检查当前账户。

**Account changed to**:

如果您希望在地址更改时收到通知，我们可以订阅一个 event：

```javascript
platon.on("accountsChanged", function (accounts) {
  // Time to reload your interface with accounts[0]!
});
```

如果返回数组中的第一个帐户不是您期望的帐户，则应通知用户！将来，帐户数组可能包含多个帐户。但是，数组中的第一个帐户将继续被视为用户的“选定”帐户。

### 发送交易

交易是区块链中的常规操作。它们总是在 Samurai 中通过调用该 platon_sendTransaction 方法去调用。它们可能涉及简单的 lat/atp 发送，可能是发送 tokens，创建新的智能合约或以多种方式更改区块链上的状态。它们始终由外部帐户的签名或简单的密钥对启动。

在 Samurai 中，platon.request 直接使用该方法，发送交易将涉及到组成这样的 options 对象：

```javascript
const transactionParameters = {
  nonce: "0x0", // ignored by Samurai
  gasPrice: "0x09184e72a000", // customizable by user during Samurai confirmation.
  gas: "0x2710", // customizable by user during Samurai confirmation.
  to: "lat1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gzndwuv", // Required except during contract publications.
  from: platon.selectedAddress, // must match user's active address.
  value: "0x0", // Only required to send lat to the recipient from the initiating external account.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
  chainId: "0x64", // Used to prevent transaction reuse across blockchains. Auto-filled by Samurai.
};

// txHash is a hex string
// As with any RPC call, it may throw an error
const txHash = await platon.request({
  method: "platon_sendTransaction",
  params: [transactionParameters],
});
```

**交易参数**

Samurai 为您处理了许多交易参数，但是最好知道所有参数的作用。

- **Nonce [ignored]**

  Samurai 将忽略此字段。

  在 PlatON 中，每笔交易都有一个随机数。这样一来，每个交易只能由区块链处理一次。此外，要成为有效交易，随机数必须为 0，或者必须已经处理了具有先前编号的交易。

  这意味着始终按给定帐户的顺序处理交易，因此增加随机数是一个非常敏感的问题，很容易搞砸，尤其是当用户与多个应用程序通过同一帐户使用待处理交易进行交互时（可能跨多个帐户）设备。

  由于这些原因，Samurai 当前无法为应用程序开发人员提供任何自定义其建议的事务随机数的方法，而是帮助用户自己管理其事务队列。

- **Gas Price [optional]**

  可选参数-最好在私有区块链上使用。

  在 PlatON 中，未决交易池将其 Gas price 作为一种拍卖竞标价格提供给验证者，以将该交易包含在一个区块中以换取交易费。这意味着高昂的 Gas price 可能意味着更快的处理速度，但也意味着交易成本更高。

  Samurai 帮助用户在 PlatON 主网络和流行的测试网络上选择具有竞争力的 Gas price。我们向网络发出 API 请求，并允许用户在其 Gas price 的“慢”，“中”和“快速”选项之间进行选择。

  我们无法了解所有区块链上的 Gas Price，因为它需要进行深入分析。因此，尽管您可以放心地在我们的主要托管网络上忽略此参数，但是在您的应用程序比我们更了解目标网络的情况下，您可能需要建议 Gas price。

- **Gas Limit [optional]**

  可选参数。对 Dapp 开发人员而言很少用到。

  Gas limit 是一个高度可选的参数，我们会自动为它计算一个合理的价格。您可能会知道，由于某种原因，您的智能合约会从自定义 Gas limit 中受益。

- **To [semi-optional]**

  Bech32 编码的 PlatON 地址。与收件人进行交易时必需（所有交易（合同创建除外））。

  当 to 字段的值为空但 data 字段值不为空时，便会创建合约。

- **Value [optional]**

  要发送的网络本地货币的十六进制编码值。在 PlatON 主网络上，这是 lat 币，以 von 表示，即 1e-18 lat。

  请注意，PlatON 中经常使用的这些数字比本地 JavaScript 数字具有更高的精度，并且如果无法预料，可能会导致不可预测的行为。因此，在处理打算用于区块链的值时, 我们强烈建议使用 BN.js。

- **Data [semi-optional]**

  创建智能合约所需。

  此字段还用于指定合同方法及其参数。您可以了解有关如何在 Solidity ABI 规范上对数据进行编码的更多信息。

- **Chain ID [currently ignored]**

链 ID 当前由用户当前选择的网络（位于）得出。将来，我们可能会允许一种同时连接到多个网络的方法，这时该参数将变得很重要，因此养成现在的习惯可能会很有用。

## 安装

- 下载[Samurai 插件包](https://github.com/AlayaNetwork/Samurai/releases)
- 解压 Samurai 插件包
- [通过 chrome 加载已解压的插件包](https://github.com/AlayaNetwork/Samurai/blob/feature/multi-networks/docs/add-to-chrome.md)

## 参考

### PlatON provider API

Samurai 以 window.platon 将全局 API 注入其用户访问的网站。该 API 允许网站请求用户的 PlatON 帐户，从用户连接的区块链中读取数据，并建议用户签署消息和交易。

- **基本用法**

  为了使任何重要的 PlatON Web 应用程序（又名 dapp，web3 网站等）正常工作，您必须：

  - 检测 PlatON provider（window.platon）
  - 检测用户连接到哪个网络
  - 获取用户的 PlatON 账户

  您可以通过查看“使用 provider”部分中的代码片段来学习如何完成另外两个步骤。

  provider API 提供创建完整功能的 web3 应用程序所需的全部接口。

  也就是说，许多开发人员都使用便利库，而不是直接使用 provider。如果您需要比此 API 提供的抽象更高的抽象，我们建议您使用便捷库。

- **链 ID(Chain ID)**

  这些是默认情况下 Samurai 支持的 PlatON 的链 ID。

| 十六进制 | 十进制 | 网络              |
| -------- | ------ | ----------------- |
| 0x64     | 100    | PlatON 主网       |
| 0x33585  | 210309 | PlatON 开发测试网 |
| 0x3113a  | 201018 | Alaya 网络        |
| 0x31146  | 201030 | Alaya 开发测试网  |

- **方法(Methods)**

  - platon.isConnected()

    ```
    Tip
    请注意，此方法与用户帐户无关。

    关于一个web3网站是否可以访问该用户的帐户，您可能经常遇到“已连接”一词。但是，在provider接口中，“已连接”和“已断开连接”是指provider是否可以向当前链发出RPC请求。
    ```

    ```javascript
    platon.isConnected(): boolean;
    ```

    如果 provider 连接到当前链，返回 true，否则返回 false。

    如果 provider 未连接，则必须重新加载页面才能重新建立连接。请参阅 connect 和 disconnect 事件以获取更多信息

  - platon.request(args)

    ```javascript
    interface RequestArguments {
      method: string;
      params?: unknown[] | object;
    }

    platon.request(args: RequestArguments): Promise<unknown>;
    ```

    用于 request 通过 Samurai 将 RPC 请求提交给 PlatON 网络。它返回一个 Promise 以返回 RPC 方法调用的结果。

    params 和返回值根据 RPC 方法而变化。实际上，如果一个方法有任意数量的 params，它们类型几乎总是 Array&lt;any&gt;。

    如果请求由于任何原因而失败，则 Promise 将以 RPC Error 的形式 reject。

    除了许多其他钱包可能不支持的方法外，Samurai 还支持大多数标准化的 PlatON RPC 方法。有关详细信息，请参见 Samurai RPC API 文档。

    Example

    ```javascript
    params: [
      {
        from: "lat1gyxmu70ppgmr37rme7a8segs0s3hgpwwxfa6vq",
        to: "lat1fpjc7rz5z38kkyxupkhu9ez5nm0d3xwgrqjtcf",
        gas: "0x76c0", // 30400
        gasPrice: "0x9184e72a000", // 10000000000000
        value: "0x9184e72a", // 2441406250
        data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
      },
    ];

    platon
      .request({
        method: "platon_sendTransaction",
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

- **事件(Events)**

  Samurai 提供程序实现 Node.js EventEmitter API。本节详细介绍了通过该 API 发出的事件。在 EventEmitter 其他地方有无数的指南，但是您可以听这样的事件：

  ```javascript
  platon.on("accountsChanged", (accounts) => {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
  });

  platon.on("chainChanged", (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });
  ```

  - **connect**

  ```javascript
  interface ConnectInfo {
    chainId: string;
  }

  platon.on('connect', handler: (connectInfo: ConnectInfo) => void);
  ```

  当 Samurai provider 能够将 RPC 请求提交到链时，它将发出此事件。我们建议使用 connect 事件处理程序和 platon.isConnected()方法来确定何时/是否连接了 provider。

  - **disconnect**

  ```javascript
  platon.on('disconnect', handler: (error: ProviderRpcError) => void);
  ```

  如果 Samurai provider 无法将 RPC 请求提交到任何链，它将发出此事件。通常，这只会由于网络连接问题或某些无法预料的错误而发生。

  一旦 disconnect 已经发出，provider 将不会接受任何新的请求，直到该链的连接已经重新建立，这就需要重新加载页面。您还可以使用该 platon.isConnected()方法来确定 provider 是否已断开连接。

  - **accountChanged**

  ```javascript
  platon.on('accountsChanged', handler: (accounts: Array<string>) => void);
  ```

  每当 platon_accounts RPC 方法的返回值更改时，Samurai provider 都会发出此事件。 platon_accounts 返回一个为空或包含单个帐户地址的数组。返回的地址（如果有）是允许 caller 访问的最近使用的帐户的地址。caller 通过其 URL 来源进行标识，这意味着所有具有相同来源的网站都共享相同的权限。

  这意味着 accountsChanged 只要用户的公开帐户地址发生更改，就会发出该消息。

  - **chainChanged**

  ```
  platon.on('chainChanged', handler: (chainId: string) => void);
  ```

  当前连接的链发生更改时，Samurai provider 将发出此事件。

  所有 RPC 请求都将提交到当前连接的链。因此，通过侦听此事件来跟踪当前链 ID 是至关重要的。

  除非您有充分的理由，否则我们强烈建议您重新加载页面以进行链 ID 更改。

  ```
  platon.on('chainChanged', (_chainId) => window.location.reload());
  ```

  - **message**

  ```
  interface ProviderMessage {
    type: string;
    data: unknown;
  }

  platon.on('message', handler: (message: ProviderMessage) => void);
  ```

  当 Samurai provider 收到一些应通知消费者的消息时，它将发出此事件。消息的类型由 type 字符串标识。

  RPC 订阅更新是该 message 事件的常见用例。例如，如果您使用 platon_subscribe 创建一个订阅，每个订阅更新将被发出作为 type 的 platon_subscription message 事件。

- **错误(Errors)**
  Samurai provider 引发或返回的所有错误均遵循以下接口：

  ```
  interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
  }
  ```

  platon.request(args)方法急于引发错误。您通常可以使用 errorcode 属性来确定请求失败的原因。常用代码及其含义包括：

  - 4001
    - 该请求被用户拒绝
  - 32602
    - 参数无效
  - 32603
    - 内部错误

- **使用 provider(Using the Provider)**

  此代码段说明了如何满足 web3 网站的三个最常见的要求：

  - 检测 PlatON provider（window.platon）
  - 检测用户连接到哪个 PlatON 网络
  - 获取用户的 PlatON 账户

  ```javascript
  /*****************************************/
  /* Detect the Samurai PlatON provider */
  /*****************************************/

  import detectPlatONProvider from "@metamask/detect-provider";

  // this returns the provider, or null if it wasn't detected
  const provider = await detectPlatONProvider();

  if (provider) {
    startApp(provider); // Initialize your app
  } else {
    console.log("Please install Samurai!");
  }

  function startApp(provider) {
    // If the provider returned by detectPlatONProvider is not the same as
    // window.platon, something is overwriting it, perhaps another wallet.
    if (provider !== window.platon) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
  }

  /**********************************************************/
  /* Handle chain (network) and chainChanged                */
  /**********************************************************/

  platon.on("chainChanged", handleChainChanged);

  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  /***********************************************************/
  /* Handle user accounts and accountsChanged                */
  /***********************************************************/

  let currentAccount = null;
  platon
    .request({ method: "platon_accounts" })
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
  platon.on("accountsChanged", handleAccountsChanged);

  // For now, 'platon_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // Samurai is locked or the user has not connected any accounts
      console.log("Please connect to Samurai.");
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
  document.getElementById("connectButton", connect);

  // While you are awaiting the call to platon_requestAccounts, you should disable
  // any buttons the user can click to initiate the request.
  // Samurai will reject any additional requests while the first is still
  // pending.
  function connect() {
    platon
      .request({ method: "platon_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // If this happens, the user rejected the connection request.
          console.log("Please connect to Samurai.");
        } else {
          console.error(err);
        }
      });
  }
  ```

- **实验性 API(Experimental API)**
  我们在此 platon.\_samurai 属性下公开了一些实验性的 Samurai 专用方法。
- **实验性方法(Experimental Methods)**
  ```javascript
  platon._samurai.isUnlocked(): Promise<boolean>;
  ```
  此方法返回 Promise，解析为一个 boolean 值，指示用户是否已解锁 Samurai。必须解锁 Samurai 才能执行涉及用户帐户的任何操作。请注意，此方法不表示用户是否向 caller 公开了任何帐户。
- **遗留属性(Legacy Properties)**

  - platon.chainId

    代表当前链 ID 的十六进制字符串。

  - platon.networkVersion

    代表当前区块链网络 ID 的十进制字符串。

  - platon.selectedAddress

    返回代表用户“当前选定”地址的十六进制字符串。

### RPC API

Samurai 使用该 platon.request(args)方法包装 RPC API。

该 API 基于所有 PlatON 客户端公开的接口，以及越来越多的其他钱包可能支持或可能不支持的方法。

```
Tips
所有RPC方法请求都可能返回错误。确保每次调用platon.request(args)都会处理异常。
```

- **PlatON JSON-RPC 方法**

  有关 PlatON JSON-RPC API 的信息，请参阅[PlatON-DevDocs](https://devdocs.platon.network/docs/zh-CN/Json_Rpc/)

  比较重要的 API 方法如下：

  - platon_accounts
  - platon_call
  - platon_getBalance
  - platon_sendTransaction
  - platon_sign

- **权限**
  - **platon_requestAccount**
  - **wallet_getPermissions**
  - **wallet_requestPermissions**
- **其他 RPC 方法**

#### 权限相关

- platon_requestAccounts

  - **返回值**

    string[] -单个 PlatON 地址字符串的数组。

  - **描述**

    请求用户提供一个 PlatON 地址以作为标识。返回一个 Promise，该 Promise 解析为单个 PlatON 地址字符串的数组。如果用户拒绝该请求，则 Promise 将拒绝并出现 4001 错误。

    该请求将导致出现一个 Samurai 弹出窗口。您只需响应用户的操作（例如单击按钮）来请求用户的帐户。在请求仍处于挂起状态时，应始终禁用导致调度请求的按钮。

    如果您无法获取用户的帐户，则应鼓励用户发起创建帐户请求。

    例子：

    ```javascript
    document.getElementById("connectButton", connect);

    function connect() {
      platon
        .request({ method: "platon_requestAccounts" })
        .then(handleAccountsChanged)
        .catch((error) => {
          if (error.code === 4001) {
            console.log("Please connect to Samurai.");
          } else {
            console.error(error);
          }
        });
    }
    ```

- wallet_requestPermissions

  - **参数**

    Array

    0. RequestedPermissions -请求的权限。

    ```javascript
    interface RequestedPermissions {
      [methodName: string]: {}; // an empty object, for future extensibility
    }
    ```

  - **返回值**

    Web3WalletPermission[] -caller 权限的数组。

  - **描述**

    向用户请求给定的权限。返回一个 Promise，该 Promise 解析为一个非空 Web3WalletPermission 对象数组，对应于调用者的当前权限。如果用户拒绝该请求，则 Promise 将拒绝并出现 4001 错误。

    该请求将会唤醒一个 Samurai 弹出窗口。您仅应请求权限来响应用户操作，例如单击按钮。

  - **例子**

    ```javascript
    document.getElementById("requestPermissionsButton", requestPermissions);

    function requestPermissions() {
      platon
        .request({
          method: "wallet_requestPermissions",
          params: [{ platon_accounts: {} }],
        })
        .then((permissions) => {
          const accountsPermission = permissions.find(
            (permission) => permission.parentCapability === "platon_accounts"
          );
          if (accountsPermission) {
            console.log("platon_accounts permission successfully requested!");
          }
        })
        .catch((error) => {
          if (error.code === 4001) {
            console.log("Permissions needed to continue.");
          } else {
            console.error(error);
          }
        });
    }
    ```

- wallet_getPermissions

  - **返回值**

    Web3WalletPermission[] -caller 权限的数组。

  - **描述**

    获取 caller 的当前权限。返回解析为 Web3WalletPermission 对象数组的 Promise 。如果调用者没有权限，则该数组将为空。

#### 其他 RPC API

- wallet_watchAsset

  - **参数**

    - WatchAssetParams -要观察的资产的元数据。

    ```javascript
    interface WatchAssetParams {
      type: "ERC20"; // In the future, other standards will be supported
      options: {
        address: string, // The address of the token contract
        symbol: string, // A ticker symbol or shorthand, up to 5 characters
        decimals: number, // The number of token decimals
        image: string, // A string url of the token logo
      };
    }
    ```

  - **返回值**

    - boolean-如果令牌已添加则返回 true，否则返回 false。

  - **描述**

    在 Samurai 中用户跟踪 token 的请求。返回 boolean 表示 token 是否已成功添加。

    大多数 PlatON 钱包都支持某些 token 集，通常是从中心化策划的 token 注册表中获取的。 wallet_watchAsset 使 web3 应用程序开发人员可以在运行时要求其用户跟踪其钱包中的 token。添加后，令牌就无法与通过传统方法（例如中心化注册）添加的令牌区分开。

  - **例子**

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

下面的例子演示如何在 web console 端发起普通和合约交易操作，唤起 Samurai 进行交易处理。

在开启 Samurai 并已经导入账户后，打开一个新的页面。右击->检查->console 进入调试模式(后面的命令行均在 console 中执行)。Samurai 在打开页面会注入 platon 和 web3a 对象,因此在 console 中可以直接使用。

### 普通交易

- 请求 Samurai 用户授权, 运行下面命令会唤起 Samurai 界面，选择对应的账户同意即可授权页面连接权限

```
> platon.request({ method: 'platon_requestAccounts' });
Promise {<pending>}
> platon.selectedAddress
"lat1mm09yjr8vwr2g78gselj03w2eks7atq2t4y83p"
```

- 发起 ATP 转账交易, 运行下面的命令会唤起 Samurai 处理该交易，可以进行再编辑等操作

```
> web3a.platon.sendTransaction({from: platon.selectedAddress,to: "lat1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gzndwuv", value: 1e16}, function(err, transactionHash) {if (err) { console.log(err); } else {console.log(transactionHash);}});
```

### Dapp 开发集成

在开发 Dapp 页面，由于 Samurai 在打开页面会注入 platon 对象，因此在开发的时候可以通过 javascript 直接调用该对象完成对应的操作。需要 web3a 对象的引入及使用见[js-sdk 文档](https://devdocs.platon.network/docs/zh-CN/JS_SDK/)

下面例子展示的是比如点击一个页面按钮发起转账操作，在其后调用的对应的 javascript 脚本

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
