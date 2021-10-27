---
id: Samurai_API
title: Samurai API
sidebar_label: Samurai API	
---

Samurai是面向PlatON/Alaya网络的开源web浏览器插件钱包，它基于以太坊web钱包[MetaMask](https://github.com/MetaMask/metamask-extension)开源代码修改适配而来。用户可以很方便的管理账户并连接到PlatON/Alaya网络。

## 介绍

+ __为什么选择Samurai__

  Samurai是为了满足基于PlatON/Alaya的网站安全和可用的需求而创建的，支持账户管理并将用户连接到区块链网络。

  

- __账户管理__

  Samurai允许用户以各种方式管理帐户及其密钥，同时将它们与站点上下文隔离。与将用户密钥存储在单个中央服务器甚至本地存储上相比，这是一个很大的安全性改进，它可以防止帐户被盗。

  此安全功能为开发者带来了便利：对于开发者来说，只需与全局可用的platon API交互，标识WEB3兼容浏览器的用户（如Samurai用户），每当你请求一个交易签名（如`platon_sendTransaction`，`platon_signTypedData`或其他）， Samurai将以一种易于理解的方式提示用户。这样可以使用户了解情况，并使攻击者只能尝试对单个用户进行网络钓鱼，而不能进行大规模的黑客攻击（尽管DNS黑客攻击仍然可以用于大规模网络钓鱼）。

  

- __区块链连接__

  Samurai预装了PlatON/Alaya区块链和多个测试网络的快速连接。这可以使您在无需同步一个全节点的情况下就可以开始使用。

  同时，Samurai可以与任何公开并适配PlatON/Alaya的JSON RPC API区块链兼容，包括自定义和私有区块链。



## 入门

要利用Samurai进行开发，首先在你的开发机器上安装Samurai，具体安装见下文

> 快速说明...
> 本指南假定您具有中等程度的HTML, CSS和JavaScript的知识

一旦安装并运行了Samurai，您可以发现，新的浏览器标签中的开发者控制台有一个`window.platon`可用。这就是你的网站将与MetaMask交互的方式。



### 基本注意事项

#### web3浏览器检测

要验证浏览器是否正在运行Samurai，请将下面的代码片段复制并粘贴到Web浏览器的开发者控制台中：

```
if (typeof window.platon !== 'undefined') {
      console.log('Samurai is installed!');
    }
```

您可以在[这里](#参考)查看该`window.platon`对象的完整API。



#### 重置本地Nonce计算

如果您正在运行测试区块链并重新启动它，您可能会意外混淆Samurai，因为它是根据网络状态和已知发送的交易来计算下一个nonce。

要清除Samurai的交易队列，并有效地重置其nonce计算，您可以使用在`Settings`中`Reset Account`按钮（位于右上角的三明治菜单中）



#### 用户状态

当前，与API交互时需要考虑一些有状态的东西：

  + 当前的网络是什么？
  + 当前的账户是哪个？

这两个都可以通过`platon.networkVersion`和`platon.selectedAddress`同步获取。您也可以使用事件来监听更改，见[API参考](#参考)。



#### 连接到Samurai

“连接”或“登录”到Samurai实际上意味着“访问用户的PlatON/Alaya帐户”。

您应该只在响应用户的直接操作（例如单击按钮）时才发起连接请求。连接请求待处理时，您应始终禁用“连接”按钮。您永远不要在页面加载时启动连接请求。

我们建议您提供一个按钮，以允许用户将Samurai连接到您的dapp。单击此按钮应调用以下方法：

```
platon.request({ method: 'platon_requestAccounts' });
```



#### 选择便利的开发库

存在便利的开发库的原因多种多样

其中一些简化了特定用户接口元素的创建，一些完全管理用户帐户，另一些则为您提供了与智能合约进行交互的各种方法，以用于从promise，callback到强类型和各种API偏好，等等。

Provider API本身非常简单，并且包装了PlatON/Alaya JSON-RPC格式化的消息，这就是为什么开发人员通常使用便捷库与provider进行交互的原因，例如platon-truffle等。通过这些工具，您通常可以找到足够的文档来与提供程序进行交互，而无需阅读此较低级别的API。



## 常用术语

以下是您使用Samurai界面可能会遇到的术语列表。

+ __钱包__

  + 用来管理你自己账户的interface/client/wrapper/holder。

+ __账户__

  + 一个公私钥对，可以持有您的资金。
  + 您的资金实际上存储在区块链上而不是在钱包或账户中。
  + 就像您的Reddit帐户具有`用户名 (public)`和`密码 (private)`一样，PlatON/Alaya帐户也是如此。为了提高安全性，您可以使用密码来加密您的私钥。请参阅本 `Keystore文件`节。

+ __地址__

  + 您可以用它来想向一个账户发送资金。

  + 有时也称为“公钥”。

  + 由`lat/atp`+`39个字符组成的字符串`，bech32类型地址。

  + 在PlatON中，地址以`lat`开头。在Alaya中，地址以`atp`开头

  + 例子：

    `lat1kkydpwmnhqrp9cqtq47fcz0segsjzffqs6uha5`  / `atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp`

+ __公钥__

  + 在密码学中，您有一个密钥对：公钥和私钥。
  + 您可以从私钥推导出公钥，但不能从公钥推导出私钥。
  + （高级）在PlatON/Alaya中，地址像公钥一样“起作用”，但实际上不是公钥。
  + （高级）在PlatON/Alaya中，公钥是从私钥派生出来的，是128个十六进制字符。然后，您将其进行`"SHA3" (Keccak-256)`哈希值（64个字符），取最后40个字符，并以`0x`作为前缀， 然后将该字符串转换成`lat`/`atp`开头的bech32地址，最后得到42位字符的地址。

+ __私钥__

  + 您可以用它从一个帐户中转账。
  + 地址/公钥的秘密部分。
  + 一串64个十六进制字符组成的字符串。
  + （几乎）由64个十六进制字符组成的每个字符串都是一个私钥。
  + 如果您今天和昨天手动方式键入的私钥不同 ，你将进入到一个不同的钱包。切勿手动输入私钥。
  + 这是您需要从您帐户发送的字符串。没有它，您将无法使用您的资金。虽然，您无需以这种格式保存此原始的未加密的私钥。您可以保存它的优雅版本（例如，keystore文件/助记词）。
  + 例子： `afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890`

+ __Keystore文件__

  + 以JSON格式保存的私钥加密版本(尽管没有JSON的扩展名)。

  + 您的私钥的优雅版本，受您选择的密码口令保护。

  + 与密码口令结合使用时，它就有了私钥。

  + 比私钥安全，因为您需要密码口令。

  + 文件名通常采用`UTC` + `--` + `DATE_CREATED` + `--` + 格式`atp`/`lat`开头的地址字符串

  + 文件名示例：`UTC--2021-03-29T03-48-12.719637196Z--lat1kkydpwmnhqrp9cqtq47fcz0segsjzffqs6uha5   /  atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp`

  + 内容示例：

    ```json
    {"address":"lat1ufgg0ypdpehdudcd0x3xwsc3h8er6y87jzjlcn","crypto":{"cipher":"aes-128-ctr","ciphertext":"2967a0ef519f86915292a61e9a6aed36edb9abbf069a7256f6e0434ab45e4f84","cipherparams":{"iv":"ab2ec5b9be6c9d3c4681e106b6c930e7"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"0267ddb5deb6a39f21068e51e26cb24f8771c7764cce716a2f3da96f809c1a80"},"mac":"c00149c28b8d938e42c66835d06810a02d831a99829c72f637806f8e7e7bbaef"},"id":"292f227a-69ad-4148-914d-a6d22612931e","version":3}
    ```

+ __助记词/种子短语/种子词__

  + 您的私钥的另一个高级版本，实际上用于派生多个私钥。
  + 一个（通常）12或24个单词的短语，使您可以访问无限数量的帐户。
  + 由ATON, Samurai等使用。
  + 源自[BIP 39 Spec](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
  + 您可以使用此短语访问的账户由“路径”决定的帐户。
  + 示例12个单词： `brain surround have swap horror body response double fire dumb bring hazard`
  + 示例24个单词： `card enrich gesture connect kick topple fan body blind engine lemon swarm venue praise addict agent unaware equal bean sing govern income link leg`

+ __身份识别符/地址识别符/地址图标__

  + 与您的地址相对应的彩色圆球。
  + 这是查看您的地址是否正确的简单方法。

+ __十六进制__

  + 在整个PlatON/Alaya中用于大部分的事物，十六进制字符串由数字`0 1 2 3 4 5 6 7 8 9`和`A B C D E F`组成。

+ __种子__

  + 为获得私钥而提供的输入。它应该始终以一种真正随机的方式生成，而不是由您可怜的人脑编出来的东西。
  + 如果您选择了种子，则称为 `brain wallet`

+ __脑钱包__

  + 根据您选择的种子或密码或密码生成的帐户。
  + 人类没有能力产生足够的熵，因此从这些短语中得出的钱包是不安全的。
  + 超快计算机可能会强行破解大脑钱包。
  + 脑钱包是不安全的。
  + 不要使用脑钱包。

+ __熵__

  + 也称为“随机性”。
  + 随机性越强的东西，熵越大，越安全。
  + 通常以“熵的位数”。
  + PlatON/Alaya的私钥是256位密钥
  + 24词助记词短语也是256位熵。字典中有2048个单词。11位熵（单词）。`11 * 24 = 264`。最后一个词是校验和。

+ __派生__

  + 派生是指从原始来源获得某样东西。
  + 例如，如果我们要从私钥和口令派生keystore，则意味着keystore是从这两个来源创建的。
  + keystore是两者的产物，因此它是从两者派生的。

+ __加密__

  + 加密是采取一串字母/数字（例如您的私钥），然后通过私有转换的方法将它们转换为另一串字母/数字的行为。
  + 有多种不同的加密方法。
  + 加密为那些试图窃取的您的信息提供了保护！

+ __智能合约__

  + 存储在区块链网络上的一段代码（或程序）。合约的条件由用户预先定义，如果满足所有条件，则合约（程序）将执行某些操作。

+ __区块链__

  + 去中心化的公共帐本。



## 初始化Dapps

一旦建立了基本的开发环境，您就可以开始与一些智能合约进行交互了。在与智能合约交互时，你都需要一些基本的东西：

### 合约网络

如果您未连接到正确的网络，则不会有任何交易发送到合约，因此请确保您连接正确的网络！

许多优秀的dapp都能识别用户的当前网络，并真正适配它！例如，如果您检测到测试网络，则可以连接到智能合约的测试网络版本，这使用户可以轻松地“试用”您的系统而无需花费真金白银！

### 合约地址

PlatON/Alaya中的每个账户都有一个地址，无论是外部密钥对账户还是智能合约。为了使任何智能合约库都能与您的合约进行通信，需要知道其确切地址。

### 合约ABI

在PlatON/Alaya中，ABI规范是一种以用户可以理解的方式对智能合约的接口进行编码的方法。它是一个描述方法的对象数组，当您将其和地址提供给合同抽象库时，它会ABI告诉这些库要提供的方法以及如何编写调用这些方法的事务。

### 合约bytecode

如果您的Web应用程序要发布一个预先编译好的新智能合约，它可能需要包含一些bytecode。在这种情况下，您不会提前知道合约地址，而是需要新发布，并观察交易的处理情况，然后从完成的交易中提取最终合约地址。

如果从bytecode发布合约，则您还需要ABI与之交互！字节码未描述如何与最终合约进行交互。

### 合约源代码

如果您的网站允许用户编辑智能合约源代码并进行编译，您可以导入整个编译器，在这种情况下，您将从该源代码派生您的bytecode和ABI，最终您将从发布该bytecode的已完成交易中获取合约的地址。



## 访问账户

在PlatON/Alaya中，用户账户被用于各种场景，包括用作身份标识符和签署交易。为了向用户请求签名或让用户批准交易，必须能够访问用户的帐户。在`wallet methods`下面涉及的签名或交易的批准，所有都需要发送帐户作为函数参数。

+ `platon_sendTransaction`
+ `platon_sign`(不安全且不建议使用)
+ `platon_personalSign`
+ `platon_signTypedData`

一旦您通过samurai连接到账户，可以随时通过检查`platon.selectedAddress`去检查当前账户。

如果您希望在地址变更时收到通知，我们可以订阅一个event：

```javascript
platon.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
});
```

如果返回数组中的第一个帐户不是您期望的帐户，则应通知用户！帐户数组包含多个帐户。但是，数组中的第一个帐户将继续被视为用户的“选定”帐户。



## 发送交易

交易是区块链中的常规操作。它们总是在Samurai中通过调用该`platon_sendTransaction`方法发起。它们可能涉及简单的`lat/atp`发送，可能是发送Tokens，创建新的智能合约或以各种方式更改区块链上的状态。它们始终由外部帐户的签名或简单的密钥对启动。

在Samurai中，直接使用`platon.request`方法，发送交易将涉及组成一个options对象，如：

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

### __交易参数__

Samurai为您处理了许多交易参数，但是最好知道所有参数的作用。

##### Nonce [ignored]


Samurai将忽略此字段。

在PlatON/Alaya中，每笔交易都有一个Nonce。这是为了让每个交易只能被区块链处理一次。此外，要成为有效交易，nonce必须为0，或者已经处理了具有先前编号的交易。

这意味着，对于一个给定的账户，交易总是按顺序处理的，因此增加nonce是一个非常敏感的问题，很容易出现问题，特别是当一个用户使用同一个账户与多个应用程序的待处理交易进行交互时（可能会在多个设备上进行）。

由于这些原因，Samurai当前没有为应用程序开发人员提供任何自定义其建议的交易nonce的方法，而是协助用户自己管理他们的交易队列。

##### Gas Price [optional]


可选参数-最好在私有区块链上使用。

在PlatON/Alaya中，pending交易池将其Gas price作为一种拍卖标的提供给验证者，以将该交易包含在一个区块中以换取交易费。这意味着高昂的Gas price可能意味着更快的处理速度，但也意味着交易成本更高。

Samurai帮助用户在PlatON/Alaya主网络和流行的测试网络上选择具有竞争力的Gas price。我们向网络发出API请求，并允许用户在其Gas price的“慢”，“中”和“快速”选项之间进行选择。

我们无法了解所有区块链上的Gas Price，因为它需要进行深入分析。因此，尽管您可以放心地在我们的主要托管网络上忽略此参数，但是在您的应用程序比我们更了解目标网络的情况下，您可能需要建议Gas price。

##### Gas Limit [optional]


可选参数。对Dapp开发人员而言很少用到。

Gas limit是一个高度可选的参数，我们会自动为它计算一个合理的价格。

##### To [semi-optional]


一个Bech32编码的PlatON/Alaya地址。与收件人进行交易时必需（除合约创建外的所有交易）。


当to字段的值为空但data字段值不为空时，便会创建合约。

##### Value [optional]


要发送的网络原生货币的十六进制编码值。在PlatON主网络上，这是`lat`，在Alaya主网络上，这是`atp`，以von表示，即`1e-18 lat/atp`。

请注意，PlatON/Alaya中经常使用的这些数字比原生的JavaScript数字具有更高的精度，并且如果无法预料，可能会导致不可预测的行为。因此，在处理用于区块链的Value时, 我们强烈建议使用BN.js。

##### Data [semi-optional]


创建智能合约需要。

此字段还用于指定合约方法及其参数。您可以了解有关如何在[Solidity ABI规范](https://solidity.readthedocs.io/en/develop/abi-spec.html)上对数据进行编码的更多信息。

##### Chain ID [currently ignored]

链ID目前由用户当前选择的网络在`platon.networkVersion` 上得出的。我们允许连接到多个网络，这时该参数将变得很重要，因此养成现在的习惯可能会很有用。



## 安装

+ 下载[Samurai插件包](https://github.com/AlayaNetwork/Samurai/releases)
+ 解压Samurai插件包
+ [通过chrome加载已解压的插件包](https://github.com/AlayaNetwork/Samurai/blob/feature/multi-networks/docs/add-to-chrome.md)



## 参考

### PlatON provider API

Samurai以`window.platon`将全局API注入其用户访问的网站(目前`window.alaya`也支持，和`window.platon`是一致的)。这个API允许网站请求用户的PlatON/Alaya帐户，从用户连接的区块链中读取数据，并建议用户签署消息和交易。



#### 基本用法

为了使任何重要的PlatON/Alaya Web应用程序（又名dapp，web3网站等）正常工作，您必须：

+ 检测PlatON/Alaya provider（`window.platon`）
+ 检测用户连接到哪个网络
+ 获取用户的PlatON/Alaya账户

您可以通过查看“使用provider”部分中的代码片段来学习如何完成另外两个步骤。

provider API提供创建完整功能的web3应用程序所需的全部接口。

也就是说，许多开发人员都使用便捷库，而不是直接使用provider。如果您需要比此API提供的抽象更高的抽象，我们建议您使用便捷库。



#### 链ID

这些是默认情况下Samurai支持的PlatON/Alaya的链ID。

| 十六进制 | 十进制 | 网络             |
| -------- | ------ | ---------------- |
| 0x64     | 100    | PlatON主网       |
| 0x33585  | 210309 | PlatON开发测试网 |
| 0x3113a  | 201018 | Alaya网络        |
| 0x31146  | 201030 | Alaya开发测试网  |



#### 方法(Methods)

##### platon.isConnected()

> Tip
> 请注意，此方法与用户帐户无关。
> 关于一个web3网站是否可以访问该用户的帐户，您可能经常遇到“已连接”一词。但是，在provider接口中，“已连接”和“已断开连接”是指provider是否可以向当前链发出RPC请求。

```javascript
platon.isConnected(): boolean;
```

如果provider成功连接到当前链，返回`true`，否则返回`false`。

如果provider未连接，则必须重新加载页面才能重新建立连接。请参阅`connect`和`disconnect`事件以获取更多信息

##### platon.request(args)

```javascript
    interface RequestArguments {
      method: string;
      params?: unknown[] | object;
    }

platon.request(args: RequestArguments): Promise<unknown>;
```

使用`request`通过Samurai向PlatON/Alaya网络提交RPC请求。它返回一个`Promise`以返回RPC方法调用的结果。

`params`和返回值根据RPC方法而异。在实践中，如果一个方法有任意数量的`params`，它们类型几乎总是`Array`。

如果请求由于任何原因而失败，则Promise将以RPC Error的形式reject。

Samurai支持大多数标准化的PlatON/Alaya RPC方法。有关详细信息，请参见[Samurai RPC API](#RPC API)文档。

**示例**：

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



#### 事件(Events)

Samurai provider实现了[Node.js EventEmitter](https://nodejs.org/api/events.html) API接口。本节详细介绍了通过该API发出的事件。在其他地方有很多EventEmitter相关的指南，但是您可以像如下这样监听事件：

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

当Samurai provider能够将RPC请求提交到链时，它将发出此事件。我们建议使用connect事件处理程序和`platon.isConnected()`方法来确定何时/是否连接了provider。



##### disconnect

```javascript
platon.on('disconnect', handler: (error: ProviderRpcError) => void);
```

如果Samurai provider无法将RPC请求提交到任何链，它将发出此事件。通常，这只会由于网络连接问题或某些无法预料的错误而发生。

一旦`disconnect`已经发出，provider将不会接受任何新的请求，直到该链的连接已经重新建立，这就需要重新加载页面。您还可以使用该`platon.isConnected()`方法来确定provider是否已断开连接。

##### accountChanged

```javascript
platon.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

每当`platon_accounts` RPC方法的返回值更改时，Samurai provider都会发出此事件。 `platon_accounts`返回一个为空或包含单个帐户地址的数组。返回的地址（如果有）是允许caller访问的最近使用的帐户的地址。caller通过其URL来源进行标识，这意味着所有具有相同来源的网站都共享相同的权限。

这意味着`accountsChanged`只要用户的公开帐户地址发生更改，就会发出该消息。

##### chainChanged

```
platon.on('chainChanged', handler: (chainId: string) => void);
```

当前连接的链发生更改时，Samurai provider将发出此事件。

所有RPC请求都将提交到当前连接的链。因此，通过侦听此事件来跟踪当前链ID是至关重要的。

除非您有充分的理由，否则我们强烈建议您重新加载页面以进行链ID更改。

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

当Samurai provider收到一些应通知消费者的消息时，它将发出此事件。消息的类型由`type`字符串标识。

RPC订阅更新是该`message`事件的常见用例。例如，如果您使用`platon_subscribe`创建一个订阅，每个订阅更新将被发出作为`type`的`platon_subscription` `message`事件。

#### 错误(Errors)

Samurai provider引发或返回的所有错误均遵循以下接口：

```
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

`platon.request(args)`方法会主动抛出错误。您通常可以使用`errorcode`属性来确定请求失败的原因。常用代码及其含义包括：

 + `4001`
   + 该请求被用户拒绝
 + `32602`
   + 参数无效
 + `32603`
   + 内部错误



#### 使用provider

此代码段说明了如何满足web3网站的三个最常见的要求：

  + 检测PlatON provider（window.platon）
  + 检测用户连接到哪个PlatON/Alaya网络
  + 获取用户的PlatON/Alaya账户

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



#### Legacy属性

+ `platon.chainId`

  代表当前链ID的十六进制字符串。

+ `platon.networkVersion`

  代表当前区块链网络ID的十进制字符串。

+ `platon.selectedAddress`

  返回代表用户“当前选定”地址的十六进制字符串。



### RPC API

Samurai使用该`platon.request(args)`方法包装RPC API。

该API基于所有PlatON/Alaya客户端公开的接口，以及越来越多的其他钱包可能支持或不支持的方法。

> Tips
> 所有RPC方法请求都可能返回错误。确保每次调用`platon.request(args)`都会处理异常。

#### PlatON JSON-RPC方法

有关PlatON JSON-RPC API的信息，请参阅[PlatON-DevDocs](https://devdocs.platon.network/docs/zh-CN/Json_Rpc/)。

比较重要的API方法如下：

  + `platon_accounts`
  + `platon_call`
  + `platon_getBalance`
  + `platon_sendTransaction`
  + `platon_sign`

权限：

+ `platon_requestAccount`
+ `wallet_getPermissions`
+ `wallet_requestPermissions`



#### 权限相关

+ ##### platon_requestAccounts

  **返回值**

  `string[]` -单个PlatON/Alaya地址字符串的数组。

  

  **描述**

  请求用户提供一个PlatON/Alaya地址以作为标识。返回一个Promise，该Promise解析为单个PlatON/Alaya地址字符串的数组。如果用户拒绝该请求，则Promise将拒绝并出现`4001`错误。

  该请求将导致出现一个Samurai弹出窗口。您只需响应用户的操作（例如单击按钮）来请求用户的帐户。在请求仍处于挂起状态时，应始终禁用导致调度请求的按钮。

  如果您无法获取用户的帐户，则应鼓励用户发起创建帐户请求。

  

  **例子**

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

  **参数**

  `Array`

    0. `RequestedPermissions` -请求的权限。

  ```javascript
  interface RequestedPermissions {
    [methodName: string]: {}; // an empty object, for future extensibility
  }
  ```

  

  **返回值**

  `Web3WalletPermission[]` -caller权限的数组。

  

  **描述**

  向用户请求给定的权限。返回一个Promise，该Promise解析为一个非空`Web3WalletPermission`对象数组，对应于调用者的当前权限。如果用户拒绝该请求，则Promise将拒绝并出现`4001`错误。

  该请求将会唤醒一个Samurai弹出窗口。您仅应请求权限来响应用户操作，例如单击按钮。

  

  **例子**
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

+ ##### wallet_getPermissions

  **返回值**

  `Web3WalletPermission[]` -caller权限的数组。

  

  **描述**

  获取caller的当前权限。返回解析为`Web3WalletPermission`对象数组的Promise 。如果调用者没有权限，则该数组将为空。

  

#### 其他RPC API

+ ##### wallet_watchAsset

  **参数**

  `WatchAssetParams` -要观察的资产元数据。

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

  

  **返回值**

  `boolean`-如果令牌已添加则返回`true`，否则返回`false`。

  

  **描述**

  在Samurai中用户跟踪token的请求。返回`boolean`表示token是否已成功添加。

  大多数PlatON/Alaya钱包都支持某些token集，通常是从中心化策划的token注册表中获取的。 `wallet_watchAsset`使web3应用程序开发人员可以在运行时要求其用户跟踪其钱包中的token。添加后，令牌就无法与通过传统方法（例如中心化注册）添加的令牌区分开。

  

  **例子**

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

下面的例子演示如何在web console端发起普通和合约交易操作，唤起Samurai进行交易处理。

在开启Samurai并已经导入账户后，打开一个新的页面。右击->检查->console进入调试模式(后面的命令行均在console中执行)。Samurai在打开页面会注入platon和web3a对象,因此在console中可以直接使用。

### 普通交易

+ 请求Samurai用户授权, 运行下面命令会唤起Samurai界面，选择对应的账户同意即可授权页面连接权限

```
> platon.request({ method: 'platon_requestAccounts' });
Promise {<pending>}
> platon.selectedAddress
"lat1mm09yjr8vwr2g78gselj03w2eks7atq2t4y83p"
```

+ 发起ATP转账交易, 运行下面的命令会唤起Samurai处理该交易，可以进行再编辑等操作。

```
> web3a.platon.sendTransaction({from: platon.selectedAddress,to: "lat1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gzndwuv", value: 1e16}, function(err, transactionHash) {if (err) { console.log(err); } else {console.log(transactionHash);}});
```

### Dapp开发集成

在开发Dapp页面，由于Samurai在打开页面会注入platon对象，因此在开发的时候可以通过javascript直接调用该对象完成对应的操作。需要web3a对象的引入及使用见[js-sdk文档](https://devdocs.platon.network/docs/zh-CN/JS_SDK/)

下面例子展示的是点击一个页面按钮发起转账操作，在其后调用对应的javascript脚本。
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
