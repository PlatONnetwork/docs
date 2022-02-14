---
id: MetaMask
title: MetaMask Configure PlatON/Alaya Network
sidebar_label: MetaMask
---

## What is MetaMask 

MetaMask is a wallet extension application embedded in the browser, which helps you interact with decentralized applications (dApps). 

MetaMask allows you to easily access the Ethereum network and add other public chains compatible with the EVM. 



## Why PlatON|Alaya uses MetaMask 

MetaMask, the most widely used browser plug-in wallet on the market, is well-received in the community. 

To lower the threshold for community users, PlatON | Alaya is compatible with the core tools of the Ethereum ecosystem, including MetaMask, after its upgrade to the Ethereum-compatible version. 

MetaMask makes operations such as transfer, signing, and contract interaction more convenient. 





### Notices

1. The address generated via MetaMask starts with 0x, that is, one in the Ethereum format. To view the address in the PlatON|Alaya format, please check in PlatON|Alaya. 

   > PlatON MainNet：https://scan.platon.network/  
   >
   > PlatON DevNet: https://devnetscan.platon.network/
   >
   > Alaya MainNet：https://scan.alaya.network/ 
   >
   > Alaya DevNet: https://devnetscan.alaya.network/

2. Mnemonics of ATON and those of MetaMask are incompatible with each other as they are generated through different paths. Private keys are compatible. 

3. MetaMask cannot be called by WASM contracts, but EVM contracts only. 

4. **Since the ChainID (100) of the current PlatON MainNet is the same as the xDai MainNet, before configuring the PlatON MainNet on MetaMask, please delete the xDai MainNet in MetaMask, or configure the PlatON MainNet by "manually adding" (Ignore the hint of ChainID conflict).** 



This document will guide you through PlatON | Alaya network configuration using MetaMask. 



## MetaMask installation and use 

There are many detailed introductions about the installation and use of MetaMask on the Internet, hence no need of further elaboration. 

You may refer to:

> [Installation, configuration and use of MetaMask](https://archive.docs.chain.link/docs/install-metamask#config) 
>
> [How To Use MetaMask: Ethereum Wallet in your Browser](https://www.youtube.com/watch?v=ZIGUC9JAAw8)



After creating a wallet using MetaMask, you're advised to back up the private key of the wallet so that it can be imported into ATON for later use. 

Steps of backup:

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183347293.png" alt="image-20220112183347293"/>

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183413762.png" alt="image-20220112183413762"/>

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183659326.png" alt="image-20220112183659326"/>





## How to manually add PlatON network 

### PlatON MainNet

First, you need to install a MetaMask plugin on your Chrome browser. 

Then register the wallet and save your mnemonics and private key. 

Then click the drop-down menu in the upper right corner. 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183808168.png" alt="image-20220112183808168"/>



Then scroll to the end and click "Add Network" 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183837332.png" alt="image-20220112183837332"/>

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112183901268.png" alt="image-20220112183901268"/>



Fill in the above information one by one. The configuration content is as follows: 

```
Network Name: PlatON MainNetwork
New RPC URL: https://openapi.platon.network/rpc
Chain ID：100
Currency Symbol：LAT
Block Explorer URL: https://scan.platon.network/
```

Other available RPC nodes on the PlatON MainNet: 

> https://rpc.plateye.com (provided by itokenpool) 

Then click Save and wait for it to finish. 

Now, the PlatON MainNet has been successfully added to MetaMask.

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184025579.png" alt="image-20220112184025579"/>

You can also transfer assets as usual. 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184503864.png" alt="image-20220112184503864"/>

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184532084.png" alt="image-20220112184532084"/>

Done! It is worth mentioning that only Hex addresses are supported on the mainnet. In other words, you have a LAT Address and Hex Address in your ATON wallet, and the one that starts with 0x is your Hex address! 



### PlatON DevNet 

Similarly, you can add and configure the PlatON DevNet according to the following information: 

```
Network Name: PlatON Dev Network
New RPC URL: https://devnetopenapi.platon.network/rpc
Chain ID：210309
Currency Symbol：LAT
Block Explorer URL: https://devnetscan.platon.network/
```

Other available RPC nodes on the PlatON Open Network: 

```
http://34.93.120.9:6789 （ws://34.93.120.9:6790）
http://34.85.65.222:6789 （ws://34.85.65.222:6790）
```

After the settings are saved, it will automatically jump to PlatON DevNet, and the following will appear: 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184723277.png" alt="image-20220112184723277"/>



Next, we can apply for test tokens on the PlatON DevNet faucet (https://faucet.platon.network/faucet/) to test the transfer operation. 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112184859903.png" alt="image-20220112184859903"/>

First, we create the No.2 test wallet: 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185037936.png" alt="image-20220112185037936"/>



After it is saved, we will see:

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185056331.png" alt="image-20220112185056331"/>

Then we use the No. 1 test wallet to transfer 50 LAT to the No. 2 wallet: 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185347872.png" alt="image-20220112185347872"/>

Click "Confirm" 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185403356.png" alt="image-20220112185403356"/>

Transferring...

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185439816.png" alt="image-20220112185439816"/>

Done!  50 LATs have been transferred through the testnet. We can also see a contract interaction below, which is the interaction with the showme application. 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112185459908.png" alt="image-20220112185459908"/>





### Alaya MainNet

 By the same token, let's fill in the following information to add the network to MetaMask. 

```
Network Name: Alaya MainNetwork
New RPC URL: https://openapi.alaya.network/rpc
Chain ID：201018 
Currency Symbol：ATP
Block Explorer URL: https://scan.alaya.network/
```

Other available RPC nodes on the Alaya MainNet: 

>  https://rpc.alayascan.com (provided by itokenpool)



Successfully added:

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112190053868.png" alt="image-20220112190053868"/>

Transfer succeeds as well.



### Alaya DevNet

Fill out the form with the following information in order: 

```
Network Name: Alaya Dev Network
New RPC URL: https://devnetopenapi.alaya.network/rpc
Chain ID：201030
Currency Symbol：ATP
Block Explorer URL: https://devnetscan.alaya.network/
```

Other available RPC nodes on the Alaya DevNet:

```
http://47.245.14.190:6789 (ws://47.245.14.190:6790)
http://8.220.31.172:6789 (ws://8.220.31.172:6790)
```

After the information is added, create a new Alaya test wallet, and then apply for test tokens on the Alaya DevNet faucet (https://faucet.alaya.network/faucet/) to test the transfer operation. 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112191841275.png" alt="image-20220112191841275"/>



After receiving the test ATP from the faucet, we can start testing transfer: 

Start transferring

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192819523.png" alt="image-20220112192819523"/>

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192843056.png" alt="image-20220112192843056"/>

Transferring...

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192856706.png" alt="image-20220112192856706"/>

Done. Now we can see 5 ATP has been received by the Alaya DevNet-2.

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112192930266.png" alt="image-20220112192930266"/>



## Add a network using ChainList

First, open [ChainList](https://chainlist.org/) and click "Connect Wallet" to authorize the connection to MetaMask. 

<img src="/docs/img/en/MetaMask_Configure.assets/e27a930f30709e719b147ac64dcaaacaf904b93a_2_690x338.png" alt="e27a930f30709e719b147ac64dcaaacaf904b93a_2_690x338"/>



Then, enter **PlatON** in the input box to search, 

and we can see:

<img src="/docs/img/en/MetaMask_Configure.assets/9800bbe80cff52b23b102f36b0eae9e0c05a7bbd_2_690x338.png" alt="9800bbe80cff52b23b102f36b0eae9e0c05a7bbd_2_690x338"/>



Next, click "Add tTo MetaMask" to add the network. 

<img src="/docs/img/en/MetaMask_Configure.assets/0acc9a52bb0d63ed11f2fb9063a12e059c754298_2_690x338.png" alt="0acc9a52bb0d63ed11f2fb9063a12e059c754298_2_690x338" />



Then click **switch network** to jump to the PlatON DevNet! 

<img src="/docs/img/en/MetaMask_Configure.assets/image-20220112193135951.png" alt="image-20220112193135951"/>



Now let's add the Alaya Dev Testnet to MetaMask in the same way.

<img src="/docs/img/en/MetaMask_Configure.assets/e67da043d7028ad99c9f1048a37b65d13a1f8ad9_2_690x338.png" alt="e67da043d7028ad99c9f1048a37b65d13a1f8ad9_2_690x338"/>



Similarly, click **Approve** and then **switch network**. The Alaya Dev Testnet has been added.





## A quick way to add MetaMask to Blockchain Explorer



Enter the PlatON or Alaya blockchain explorer, find [MORE] in the navigation menu, click [Add to Extension], and select the network to be configured: 

>Blockchain explorer on the PlatON MainNet: https://scan.platon.network/add-to-extension 
>
>Blockchain explorer on the PlatON DevNet: https://devnetscan.platon.network/add-to-extension
>
>Blockchain explorer on the Alaya MainNet: https://scan.alaya.network/add-to-extension 
>
>Blockchain explorer on the Alaya DevNet: https://devnetscan.alaya.network/add-to-extension 

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.1].png" alt="[Figure-4.1.1]"/>



### Connect with MetaMask in the web browser 

1) After entering the Add to Extension page in the blockchain explorer, click [Connect MetaMask]. 

 [Prerequisite: MetaMask needs to be installed in the explorer in advance] 

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.2.1].png" alt="[Figure-4.1.2.1]"/>



2) Click [Next] in MetaMask, and then click [Connect] to establish communication with MetaMask. 

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.2.2].png" alt="[Figure-4.1.2.2]"/>

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.2.3].png" alt="[Figure-4.1.2.3]"/>



### Add network configuration to MetaMask 



1) After the connection is successful, [Connect MetaMask] turns into [Add to MetaMask]. Click [Add to MetaMask]. 

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.3.1].png" alt="[Figure-4.1.3.1]"/>

2) Click [Approve] to add the network configuration to MetaMask. 

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.3.2].png" alt="[Figure-4.1.3.2]"/>



3) The plug-in wallet will prompt you to switch to this network. Click [Switch Network] to switch the corresponding network for later use. 

<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.3.3].png" alt="[Figure-4.1.3.3]"/>



<img src="/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.4.1].png" alt="[Figure-4.1.4.1]"/>



*This tutorial is contributed by @[LeQianQian](https://github.com/LeQianQian) @[Dengxin46](https://github.com/Dengxin46)*  

