---
id: Join_PlatON_NetWork
title: 加入 PlatON 网络
sidebar_label: 加入 PlatON 网络
---

## 简介

PlatON主网上线时间待定，ChainID待定。另外一个用来对开发者开放的PlatON开发网络于北京时间2021年3月10日上线，ChainID：210309。



## 准备

在加入PlatON公有网络前请确保服务器本地具备以下条件：

- 已经按照[安装一个节点](/docs/zh-CN/Install_Node)指引安装好PlatON节点并创建好节点密钥。

本章节假设服务器为 Ubuntu18.04，可执行文件所在工作目录为 `~/platon-node`，注意后续所有命令行操作均在工作目录下进行。

```bash
cd ~/platon-node
```




## 加入PlatON主网

任何人、任何组织都可以加入 PlatON 主网络。

### 启动验证节点

执行以下命令即可启动验证节点加入PlatON主网络（请等待主网上线后接入）

```bash
nohup platon --identity platon --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**提示：**

| **选项**      | **描述**                                                     |
| ------------- | ------------------------------------------------------------ |
| --identity    | 指定网络名称                                                 |
| --datadir     | 指定 data 目录路径                                           |
| --port        | p2p端口号                                                    |
| --rpcaddr     | 指定 rpc 服务器地址                                          |
| --rpcport     | 指定 rpc 协议通信端口                                        |
| --rpcapi      | 指定节点开放的 rpcapi 名称                                   |
| --rpc         | 指定 http-rpc 通讯方式                                       |
| --nodekey     | 指定节点私钥文件                                             |
| --cbft.blskey | 指定节点 bls 私钥文件                                        |
| --verbosity   | 日志级别，0: CRIT;  1: ERROR； 2: WARN;  3: INFO;  4: DEBUG； 5: TRACE |
| --syncmode    | fast：快速同步模式，full：全同步模式                         |
| –db.nogc      | 开启归档模式                                                 |

更多参数意义通过`platon --help`命令查看。



## 加入PlatON开发网络

开发网为开发者或节点提供开发测试环境。可能出现不稳定，网络重置的情况。开发网络目前版本为1.0.0。

### 开发网络相关资源

>- platon：https://download.platon.network/platon/platon/1.0.0/platon
>- platonkey：https://download.platon.network/platon/platon/1.0.0/platonkey
>- mtool windows：https://download.platon.network/platon/mtool/windows/1.0.0/platon_mtool.exe
>- mtool linux：https://download.platon.network/platon/mtool/linux/1.0.0/platon_mtool.zip
>
>> 需要修改配置文件config.properties中的链ID为开发网络链ID：210309
>
>- samurai：
> - 开放RPC URL：http://47.241.98.219:6789 以及 ws://47.241.98.219:6790
>- scan浏览器地址：https://devnetscan.platon.network



### 初始化创世区块

- 保存创世区块文件

  下载创世区块文件genesis.json：

  ```bash
  cd ~/platon-node && wget https://download.platon.network/platon/platon/1.0.0/genesis.json
  ```

  

- 初始化创世区块文件

  执行命令：

  ```bash
  cd ~/platon-node && platon --datadir ./data init genesis.json
  ```

  > 说明：
  >
  > 出现`Successfully wrote genesis state`相关提示说明初始化创世信息完成。

  

### 启动验证节点

请参考[安装一个节点](/docs/zh-CN/Install_Node)章节先创建节点密钥：nodekey、blskey，然后执行以下命令即可启动验证节点加入PlatON开发网络；如果需要成为验证节点，请通过后续说明方式申请大额测试LAT（开发网将根据测试需要不定期重置，开发网LAT无任何实际价值）。

```shell
cd ~/platon-node/ && nohup platon --identity platon-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://c72a4d2cb8228ca6f9072daa66566bcafa17bec6a9e53765c85c389434488c393357c5c7c5d18cf9b26ceda46aca4da20755cd01bcc1478fff891a201042ba84@devnetnode1.platon.network:16789 --syncmode "fast" > ./data/platon.log 2>&1 &
```



### 其他

如果您有领取大额测试LAT的需求，请您按照格式要求发送邮件至：support@latticex.foundation，邮件要求：

```toml
 标题：PlatON开发网Token申请
 姓名：
 联系方式：
 微信号（或其他即时通讯软件）：
 申请金额：
 用途：
 收款账户：
 备注：
```



## 查看节点状态

当 PlatON启动成功后，正常情况下会通过节点发现协议自动和距离自己最近的节点建立连接，连接成功后会启动区块同步，所以判断加入网络是否成功可以通过查看节点的 peers 同时确认当前节点块高是否增长来判断。

如果没有预先生成密钥，节点在启动时自动在节点的data目录下生成。如果采用自动生成的形式，将只会生成节点私钥与 BLS 私钥，相关公钥不会自动生成。



### 进入`PlatON`控制台

```bash
platon attach http://localhost:6789
```

> 打印`Welcome to the PlatON JavaScript console!`相关信息，表示成功进入控制台，否则视为进入控制台失败，如有问题可联系官方客服人员。

### 查看节点的  peers

通过在`PlatON`控制台中执行以下命令查看连接节点的信息。

```bash
admin.peers
```

> 如打印相关peers信息，表示连接节点成功，如下：
>
> [{
>     caps: ["cbft/1", "platon/63"],
>     id: "c72a4d2cb8228ca6f9072daa66566bcafa17bec6a9e53765c85c389434488c393357c5c7c5d18cf9b26ceda46aca4da20755cd01bcc1478fff891a201042ba84",
>     name: "PlatONnetwork/alaya-47.241.93.189/v1.0.0-unstable-62b9a900/linux-amd64/go1.13.4",
>     network: {
>       consensus: false,
>       inbound: false,
>       localAddress: "192.168.2.128:55572",
>       remoteAddress: "47.241.93.189:16789",
>       static: false,
>       trusted: false
>     },
>     protocols: {
>       cbft: {
>         commitBn: 1404934,
>         highestQCBn: 1407304,
>         lockedBn: 1404935,
>         protocolVersion: 1
>       },
>       platon: {
>         head: "0xf31395262f876935c94e33b1d9f3314b2cb6effc33fcffa3b17b725678fd525f",
>         number: 1407295,
>         version: 63
>       }
>     }
> }
>
> ...]
>
> 如果打印信息为空，表示连接节点失败，如有问题可联系官方客服人员。

### 查看当前块高

通过在`PlatON`控制台中执行以下命令查看当前节点的块高。

```bash
platon.blockNumber
```

> - 执行此命令数次，如块高数值在不断增长，则表示连接成功；
>
> - 如果是新节点，块高一直为0时，则表示节点在同步区块，可能会存在延迟，可通过命令：
>
>   ```
>   platon.syncing
>   ```
>
>   > - 如果打印`false`，表示节点未处于同步区块状态；
>   >
>   > - 如果打印如下信息，表示节点正处于同步区块状态；
>   >
>   >   ```json
>   >   {
>   >     currentBlock: 1412416,
>   >     highestBlock: 1416699,
>   >     knownStates: 522,
>   >     pulledStates: 522,
>   >     startingBlock: 1408247
>   >   }
>   >   ```



### 退出控制台

输入exit即可退出控制台。