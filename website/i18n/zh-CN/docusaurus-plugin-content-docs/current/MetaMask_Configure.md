---
id: MetaMask
title: MetaMask 配置PlatON/Alaya 主网/开发网络
sidebar_label: MetaMask
---

## MetaMask 是什么

MetaMask是一款嵌入在浏览器里的钱包扩展应用。它可以帮助您与去中心化应用程序（dApps）进行交互。

使用MetaMask可以非常方便的接入以太坊网络，并支持添加其他兼容以太坊EVM的公链。



## 为什么PlatON|Alaya要使用MetaMask

MetaMask作为目前市面上用户量最多，应用最广泛的浏览器插件钱包，广受社区好评。

为减低社区用户使用门槛，PlatON | Alaya在完成以太坊兼容版本升级后，实现了对以太坊核心生态工具的兼容支持，其中包含MetaMask。

通过MetaMask您可以更方便的进行转账、签名、合约交互等操作。



### 注意事项

1. 使用MetaMask钱包生成的，展示的是0x开头的地址，也就是以太坊格式地址。如需查看PlatON| Alaya格式地址，请在PlatON| Alaya中进行查看。

   > PlatON MainNet：https://scan.platon.network/
   >
   > PlatON DevNet: https://devnetscan.platon.network/
   >
   > Alaya MainNet：https://scan.alaya.network/
   >
   > Alaya DevNet: https://devnetscan.alaya.network/

2. ATON钱包助记词与MetaMask助记词由于生成路径不一致，无法相互不兼容。私钥兼容。

3. MetaMask面向目前暂时不支持WASM合约调用，仅支持EVM合约。



本文档将指导您使用MetaMask完成PlatON | Alaya 网络配置。

## MetaMask安装和使用

关于MetaMask安装和使用，互联网上已有很多详细的介绍说明，这里就不再赘述。

可参考：

> [MetaMask的安装、配置和使用](https://chainlink-chinese.readme.io/docs/metamask的安装-配置和使用)
>
> // 英文 https://archive.docs.chain.link/docs/install-metamask#config
>
> [How To Use MetaMask: Ethereum Wallet in your Browser](https://www.youtube.com/watch?v=ZIGUC9JAAw8)



在使用MetaMask 创建钱包后，建议您备份钱包私钥，方便后续导入ATON使用。

备份操作流程：

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183347293.png" alt="image-20220112183347293" style="zoom: 80%;" />

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183413762.png" alt="image-20220112183413762" style="zoom:80%;" />

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183659326.png" alt="image-20220112183659326" style="zoom:80%;" />





## 手动添加 PlatON 网络

### PlatON主网

首先你需要在Chrome浏览器上安装一个MetaMask插件。

然后注册钱包，保存好你的助记词和私钥。

接着点击右上角的网络下拉菜单选项。

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183808168.png" alt="image-20220112183808168" style="zoom:80%;" />



然后滚动到末尾，单击“添加网络”

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183837332.png" alt="image-20220112183837332" style="zoom:80%;" />

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183901268.png" alt="image-20220112183901268" style="zoom: 50%;" />



依次填写上述信息，配置内容如下：

```
Network Name: PlatON MainNetwork
New RPC URL: https://openapi.platon.network/rpc
Chain ID：100
Currency Symbol：LAT
Block Explorer URL: https://scan.platon.network/
```

接着点击保存，等待完成即可。

现在，PlatON主网已经被成功添加到MetaMask中

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184025579.png" alt="image-20220112184025579" style="zoom:80%;" />

并且也可以进行正常的转账交易

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184503864.png" alt="image-20220112184503864" style="zoom:50%;" />

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184532084.png" alt="image-20220112184532084" style="zoom:50%;" />

转账成功！值得一提的是，目前在主网络仅支持Hex地址，也就是打开你的ATON钱包里有一个LAT Address和Hex Address，选择0x开头的就是你的Hex地址啦！



### PlatON 开发网络

同理PlatON开发网络，按照下述信息添加配置网络连接信息：

```
Network Name: PlatON Dev Network
New RPC URL: https://devnetopenapi.platon.network/rpc
Chain ID：210309
Currency Symbol：LAT
Block Explorer URL: https://devnetscan.platon.network/
```


其他可用PlatON开放网络RPC节点：

```
http://34.93.120.9:6789 （ws://34.93.120.9:6790）
http://34.85.65.222:6789 （ws://34.85.65.222:6790）
```

保存之后会自动跳转到PlatON DevNet，出现以下内容：

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184723277.png" alt="image-20220112184723277" style="zoom:50%;" />



接着，我们可以在PlatON开发网水龙头（https://faucet.platon.network/faucet/）上申请测试代币，测试一下转账操作。

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184859903.png" alt="image-20220112184859903" style="zoom:50%;" />

首先创建一个二号测试钱包：

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185037936.png" alt="image-20220112185037936" style="zoom: 67%;" />



保存后出现：

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185056331.png" alt="image-20220112185056331" style="zoom: 50%;" />

接着使用一号测试钱包向二号钱包转账50LAT：

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185347872.png" alt="image-20220112185347872" style="zoom:50%;" />

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185403356.png" alt="image-20220112185403356" style="zoom:50%;" />

单击“确认”

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185439816.png" alt="image-20220112185439816" style="zoom:50%;" />

等待处理ing…

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185459908.png" alt="image-20220112185459908" style="zoom:50%;" />

OK，处理成功！测试网络成功转账测试LAT 50枚，同时我们还看到底下有一个合约交互，这是跟showme应用的交互。



### Alaya主网

依样画葫芦，让我们把下列信息填入MetaMask的网络添加信息中。

```
Network Name: Alaya MainNetwork
New RPC URL: https://openapi.alaya.network/rpc
Chain ID：201018 
Currency Symbol：ATP
Block Explorer URL: https://scan.alaya.network/
```

添加成功：

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112190053868.png" alt="image-20220112190053868" style="zoom:50%;" />

同样测试转账成功。



### Alaya开发网络

将以下信息按顺序填入表单中：

```
Network Name: Alaya Dev Network
New RPC URL: https://devnetopenapi.alaya.network/rpc
Chain ID：201030
Currency Symbol：ATP
Block Explorer URL: https://devnetscan.alaya.network/
```

其他可用Alaya开放网络RPC节点：

```
http://47.245.14.190:6789 (ws://47.245.14.190:6790)
http://8.220.31.172:6789 (ws://8.220.31.172:6790)
```

添加完成后，创建个新Alaya测试钱包，然后我们可以在Alaya开发网水龙头（https://faucet.alaya.network/faucet/）上申请测试代币，测试一下转账操作。

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112191841275.png" alt="image-20220112191841275" style="zoom:50%;" />

水龙头的测试ATP领取成功后，我们进行转账测试：

开始转帐

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192819523.png" alt="image-20220112192819523" style="zoom:50%;" />

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192843056.png" alt="image-20220112192843056" style="zoom:50%;" />

等待处理...

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192856706.png" alt="image-20220112192856706" style="zoom:50%;" />

处理成功，可以看到Alaya测试网络-2获得了5ATP

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192930266.png" alt="image-20220112192930266" style="zoom:50%;" />



## 使用ChainList添加网络

首先打开 [ChainList](https://chainlist.org/) 网站，点击“Connect Wallet”授权连接MetaMask钱包。

<img src="/docs/img/en/MetaMask_Configure.assets/e27a930f30709e719b147ac64dcaaacaf904b93a_2_690x3386.png" alt="e27a930f30709e719b147ac64dcaaacaf904b93a_2_690x338" style="zoom:100%;" />



然后，在输入框内输入 **PlatON** 搜索，

得到：

<img src="/docs/img/en/MetaMask_Configure.assets/9800bbe80cff52b23b102f36b0eae9e0c05a7bbd_2_690x338.png" alt="9800bbe80cff52b23b102f36b0eae9e0c05a7bbd_2_690x338" style="zoom:100%;" />

接着，点击“Add tTo MetaMask” 进行网络添加。

<img src="/docs/img/en/MetaMask_Configure.assets/0acc9a52bb0d63ed11f2fb9063a12e059c754298_2_690x338.png" alt="0acc9a52bb0d63ed11f2fb9063a12e059c754298_2_690x338" style="zoom:100%;" />

然后点击 **switch network** 就可以跳转到PlatON Dev网络啦！

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112193135951.png" alt="image-20220112193135951" style="zoom: 80%;" />

让我们来如法炮制一下Alaya的网络环境添加

<img src="/docs/img/en/MetaMask_Configure.assets/e67da043d7028ad99c9f1048a37b65d13a1f8ad9_2_690x338" alt="e67da043d7028ad99c9f1048a37b65d13a1f8ad9_2_690x338" style="zoom:100%;" />



同样是**Approve**，再**switch network**，即可完成Alaya测试网络的添加。



本教程贡献者 @[LeQianQian](https://github.com/LeQianQian)   @[Dengxin46](https://github.com/Dengxin46)

