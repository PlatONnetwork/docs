---
id: OffLine_MTool_Manual
title: 离线PlatON MTool教程
sidebar_label: 离线PlatON MTool教程
---

## 简介

为了便于节点进行转账，质押，委托以及治理等相关的操作，PlatON提供了MTool来辅助用户：

- PlatON MTool可支持Ubuntu 18.04和Windows 10，本文档分别描述Windows和Ubuntu环境下的安装和使用，用户可根据自己的资源进行选择。
- PlatON MTool对质押等交易提供两种签名方式：在线签名和离线签名。此文档描述离线签名操作，在线签名操作请参考[在线PlatON MTool教程](/docs/zh-CN/OnLine_MTool_Manual)。
- PlatON MTool离线签名方式主要流程为：在在线机器上生成待签名文件，然后在离线机器上签名交易，最后在在线机器上发送签名交易。

## 安装PlatON MTool

另外，本文档分别介绍Windows和Ubuntu环境下PlatON MTool的操作，用户可根据自己的资源进行选择；以下安装方式为在线机器上的安装，如果在离线机器上安装，可使用移动U盘或者移动硬盘进行拷贝安装包到离线机器上，安装方法和在线安装方法一样。

### Windows下安装PlatON MTool

#### 安装前准备

执行命令：

```
platon_mtool --version
```

如果执行结果显示`无法将“platon_mtool”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次`，表示没有安装旧版本不需要执行下面操作。

如果执行结果显示版本号，时间戳等信息表示已安装PlatON MTool，如果PlatON MTool是旧版本，此时需要备份重要信息，然后再手工卸载旧版本，操作步骤：

**step1. 备份目录**

将 `C:\platon_mtool\mtool\current\keystore` 下的所有文件到 D 盘或其他非 `C:\platon_mtool` 的目录下。安装完新版本之后需要将备份文件拷贝回 `C:\platon_mtool\mtool\current\keystore` 目录下。

**step2. 卸载旧版本**

双击 `C:\platon_mtool\unins000.exe` 卸载所有旧版本的 PlatON MTool 及其他业务工具。

#### 开始安装

**step1. 下载PlatON MTool安装包**

在在线机器上，复制链接<https://download.platon.network/platon/mtool/windows/1.0.0/platon_mtool.exe> 到浏览器下载PlatON MTool安装包。

**step2. 安装PlatON MTool**

双击platon_mtool.exe进行安装。默认安装目录为 C:\platon_mtool，建议不要更改此安装目录。弹出界面显示**Completing the mtool Setup Wizard**信息表示安装成功，点击**Finish**即可。

**step3. 重启终端**

安装完成之后，需要<font color=red>重启终端（非重启服务器，关闭Cmd窗口或PowerShell窗口重新打开窗口即可）</font>，让新添加的环境变量生效。

### Ubuntu下安装PlatON MTool

步骤如下：

**step1. 下载PlatON MTool工具包**

``` bash
wget https://download.platon.network/platon/mtool/linux/1.0.0/platon_mtool.zip
```

**step2. 解压PlatON MTool工具包**

``` bash
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip platon_mtool.zip && cd platon_mtool
```

**step3. 下载脚本**

>脚本下载到<font color=red>platon_mtool</font> 目录下，否则脚本无法找到新版本mtool的路径。

``` bash
wget https://download.platon.network/platon/scripts/mtool_install.sh
```

**step4. 执行命令**

```
chmod +x mtool_install.sh && ./mtool_install.sh
```

> - 提示 <font color=red>Install platon mtool succeed.</font> 时，表示 PlatON MTool 安装成功，未安装成功时，请通过我们的官方客服联系方式反馈具体问题。

**step5. 重新启动会话窗口**

安装完成之后，需要<font color=red>重新启动会话窗口（非重启服务器，关闭会话窗口或ssh工具重新打开窗口即可）</font>，让新添加的环境变量生效。

## PlatON MTool环境变量说明

Windows和Ubuntu下PlatON MTool目录使用环境变量有所区别：

- PlatON MTool目录

  - Windows：`%PLATON_MTOOLDIR%`

  - Ubuntu：`$PLATON_MTOOLDIR`

>  说明：**`用户根据自己安装的系统进行选择环境变量。`**
>

##  PlatON MTool钱包命令详解

> **注意：**
>
> - 后续命令是Ubuntu下的命令格式，Windows下需要把`$PLATON_MTOOLDIR`修改成`%PLATON_MTOOLDIR%`；
> - 如果连接的是开发网，需要修改PlatON MTool安装目录下的config.properties配置文件的chainid为201030。

### 创建冷钱包

- 执行命令

```shell
platon_mtool account new staking
```

- 参数说明

>staking: 生成的钱包名称，输入两次相同密码之后，创建成功后会在目录`$PLATON_MTOOLDIR/keystore`下生成钱包文件`staking.json`，并打印如下信息：
>
>```shell
>-name: staking
>-type: NORMAL
>-address:
> lat124xmsmd0uf5cvk7v3s36eytqezqsjfcxfw2lmr
> -public key: 0x9521cd81ba28d5d1c23bb7ddb7042d146375203d35000c0289178027abd4dc09bca30257739df166201e73497485242f41d5f50d46bc3c7e4385f81bde560db0
>
>Important write this Private Key in a safe place.
>It is the important way to recover your account if you ever forget your password.
>4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
>
>Important write this mnemonic phrase in a safe place.
>It is the important way to recover your account if you ever forget your password.
>worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
>```
>
>钱包地址格式调整为Bech32，其中：
>
>`lat124xmsmd0uf5cvk7v3s36eytqezqsjfcxfw2lmr`：钱包地址；
>
>`4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07` 为钱包私钥；
>
>`worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney` 为助记词。
>
>出于安全考虑，用户需对钱包私钥或助记词进行备份（可都进行备份，也可备份其中一个），钱包丢失时，可用于恢复。建议用户将助记词或者私钥备份到安全的存储介质上，如离线机器等。

### 恢复钱包

如果钱包文件丢失了，可以通过上述备份的私钥或助记词进行恢复，操作如下：

- 执行命令

  通过私钥恢复：

  ```shell
  platon_mtool account recover -k staking
  ```

  > 提示输入新的钱包密码和备份的私钥，如下：
  >
  > ```shell
  > Enter a passphrase to encrypt your key to disk:
  > Repeat the passphrase:
  > Enter your 64bit Private Key:
  > 4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
  > ```

  或

  通过助记词恢复：

  ```shell
  platon_mtool account recover -m staking
  ```

  >提示输入新的钱包密码和备份的助记词，如下：
  >
  >```shell
  >Enter a passphrase to encrypt your key to disk:
  >Repeat the passphrase:
  >Enter your bip39 mnemonic:
  >worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
  >```

- 参数说明

  staking：钱包名称。

  恢复成功后会在目录`$PLATON_MTOOLDIR/keystore`下生成钱包文件`staking.json`。



### 创建观察钱包

执行命令生成观察钱包：

```shell
platon_mtool create_observewallet --keystore $PLATON_MTOOLDIR/keystore/staking.json
```

- 参数说明

  keystore：表示冷钱包路径。

> 如下提示表示创建观察钱包成功：
>
> please input keystore password:
> SUCCESS
> wallet created at: $PLATON_MTOOLDIR/keystore/staking_observed.json

### 查看钱包列表

- 执行命令

```bash
platon_mtool account list
```

### 根据钱包名称查询余额

- 执行命令

```bash
platon_mtool account balance $keystorename --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 变量说明

>$keystorename：钱包文件名称，如staking.json
>
>config：验证节点信息文件路径

### 根据地址查询余额

- 执行命令

```bash
platon_mtool account balance -a $address --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数

> a：钱包地址
>
> config：验证节点信息文件路径



## 离线PlatON MTool交易流程

PlatON MTool离线签名方式主要流程为：在在线机器上生成待签名文件，然后在离线机器上签名交易，最后在在线机器上发送签名交易。以转账交易为例，步骤如下，其他交易生成待签名文件的操作参考[PlatON MTool交易命令详解](# PlatON MTool交易命令详解)章节。

### 生成交易待签名文件

在**在线机器**上执行：

```shell
platon_mtool tx transfer --address $PLATON_MTOOLDIR/keystore/staking_observed.json --amount "1" --recipient $to_address --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明:

> address：发送交易的观察钱包路径
>
> amount：转账金额，单位：LAT
>
> recipient：接收地址
>
> config：验证节点信息文件路径

打印如下信息，表示执行成功：

```shell
Transfer unsigned raw: H4sIAAAAAAAAAGWOPW/DIBRF/8ubPfDhGsdrp0oZMmSrMiCMDUGADTiGRPnvoVGHSn3T1ZHuPe8Ba/j0ozwH7iIXSXt31DHB8P0Abv3masTo3zUgFNfua4SBIIxoBVPwFgbgKeM9pLweppERJTrGXH+n1KY+5Wtujckfy247JqF2NvdWnssiYagjM49HbXWVEvzWVHAKWsg/XzTgvPshtIHkf5UlxKL2tBVkCJnZnNWtm/dyn/qbiIdrNHFlysDzUjvaypi4Xepmh2jbMor6luLnC0n7ZKsMAQAA
File generated on: $PLATON_MTOOLDIR/transaction_details/transaction_detail_20191108114241.csv
```

其中，`transaction_detail_20191108114241.csv`为转账交易待签名文件，需要拷贝到离线机器上，进行签名；

### 签名交易

在保管冷钱包的离线机器上执行：

```shell
platon_mtool offlinesign --filelocation $PLATON_MTOOLDIR/transaction_details/transaction_detail_20191108114241.csv
```

- 参数说明：

>offlinesign：离线签名标识
>
>filelocation：待签名交易文件路径

注：$PLATON_MTOOLDIR/transaction_details/transaction_detail_20191108114241.csv为上一步骤生成的待签名文件，修改为实际的待签名文件。

输入对应冷钱包密码并返回签完名的文件，文件内容如下：

```shell
 ┌────────┬────────┬────────┬────────┬────────┬────────┬────────┬───────┬───────┐
│Type    │From    │To      │Account │Amount  │Fee     │Nonce   │Create │Chain  │
│        │        │        │Type    │        │        │        │Time   │Id     │
├────────┼────────┼────────┼────────┼────────┼────────┼────────┼───────┼───────┤
│STAKING │0xa1548d│0x100000│FREE_AMO│5000000.│0.043210│0       │2019-10│100    │
│        │d61010a7│00000000│UNT_TYPE│00000000│00000000│        │-11T13:│       │
│        │42cd66fb│00000000│        │00000000│0000    │        │54:06.8│       │
│        │86324ab3│00000000│        │00      │        │        │97     │       │
│        │e2935586│00000000│        │        │        │        │       │       │
│        │4a      │02      │        │        │        │        │       │       │
└────────┴────────┴────────┴────────┴────────┴────────┴────────┴───────┴───────┘
Need load 1 wallets for address: [0xa1548dd61010a742cd66fb86324ab3e29355864a]

operation finished
SUCCESS
File generated on transaction_signature/transaction_signature_20191108114625.csv
total: 1, to be signed: 1
success: 1, failure: 0
```

注：其中transaction_signature/transaction_signature_20191108114625.csv为已签名交易文件，将交易签名文件拷贝到在线机器上；



### 发送签名交易

在**在线机器**发送交易：

```shell
platon_mtool send_signedtx --filelocation $PLATON_MTOOLDIR/transaction_signature/transaction_signature_20191108114625.csv --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明：

>send_signedtx：发送签名交易标识
>
>filelocation：已签名交易文件路径
>
>config：验证节点信息文件路径

注：其中transaction_signature_20191108114625.csv为上一步骤生成的交易签名文件，修改为实际的签名文件。

输入`yes`返回交易结果：

```bash
Send Transaction? (yes|no)
yes
transaction 1 success
transaction hash: 0xf14f74386e6ef9027c48582d7faed3b50ab1ffdd047d6ba3afcf27791afb4e9b
SUCCESS
total: 1
success: 1, failure: 0
```

注：提示success并返回transaction hash表示签名交易发送成功，否则发送签名交易失败。

## PlatON MTool交易命令详解

此章节主要描述在**在线机器**上生成csv格式的交易待签名文件的相关命令，生成的csv文件会保存在`$PLATON_MTOOLDIR/transaction_details`目录下。完整的发送离线签名交易流程参考[离线PlatON MTool交易流程](#离线PlatON MTool交易流程)章节。

### 普通转账操作

- 执行命令

```shell
platon_mtool tx transfer --address $PLATON_MTOOLDIR/keystore/staking_observed.json --amount "1" --recipient $to_address --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> address：发送交易的观察钱包路径
>
> amount：转账金额，单位：LAT
>
> recipient：接收地址
>
> config：验证节点信息文件路径

### 创建新的锁仓计划

节点可以使用自己钱包内的资金，创建新的锁仓计划。在创建新的锁仓计划前，先要创建一个格式为json的锁仓计划描述文件。

- 锁仓计划描述文件，retricting_plans.json

```json
{
  "account":"lat12jn6835z96ez93flwezrwu4xpv8e4zathsyxdn",
  "plans":[
    {"epoch": 5000,"amount": 100},
    {"epoch": 6000,"amount": 100},
    {"epoch": 7000,"amount": 100}
  ]
}
```

> account：指锁仓资金的释放目标地址
>
> epoch：释放等待的结算周期数量（大于等于1）
>
> amount：释放资金，单位:LAT

- 执行命令

```bash
platon_mtool create_restricting --config $PLATON_MTOOLDIR/validator/validator_config.json --address $PLATON_MTOOLDIR/keystore/staking_observed.json --file ./restricting_plans.json
```

- 参数说明，

> config：验证节点信息文件路径
>
> address: 质押观察钱包路径
>
> file: 锁仓计划描述文件

### 发起质押操作

如果共识节点部署完成，并且已经同步区块成功，您就可以使用PlatON MTool进行质押操作。质押资金申请完成后，确保质押账户余额足够，根据用户情况替换质押金额，质押最低门槛为10万LAT。

注意：请保持质押账户里面有足够LAT，以备后续发起节点管理的交易有足够的交易手续费，比如升级提案的投票，解质押等交易。

- 执行命令

```bash
platon_mtool staking --config $PLATON_MTOOLDIR/validator/validator_config.json --address $PLATON_MTOOLDIR/keystore/staking_observed.json --amount 100000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 5000 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
```

- 参数说明，

> config：验证节点信息文件路径
>
> address: 质押观察钱包路径
>
> amount: 质押数，不少于100000LAT-质押门槛，小数点不超过8位（使用自由金额质押）
>
> restrictedamount: 不少于100000LAT-质押门槛，小数点不超过8位（使用锁仓余额质押）
>
> autoamount：不少于100000LAT-优先使用锁仓余额质押，若锁仓余额不足质押金，再使用自由金额质押
>
> benefit_address：验证节点收益地址
>
> delegated_reward_rate：委托奖励比例，单位：万分比，整数，范围\[0,10000]，如输入5000，表示分红比例为50%
>
> node_name：验证人名称，不超过30字节，支持字母、数字、空格、上下划线及#，必须字母开头
>
> website：官网路径，不超过70字节，数字字母组成
>
> details：简介，验证人简要介绍说明，不超过280字节，建议英文
>
> external_id：节点头像icon在[keybase.io](https://keybase.io)的ID，或者外部系统身份认证ID


### 修改验证人信息操作

- 执行命令

```bash
platon_mtool update_validator --config $PLATON_MTOOLDIR/validator/validator_config.json --address $PLATON_MTOOLDIR/keystore/staking_observed.json --node_name myNode --website www.mywebsite.com --external_id 121412312 --delegated_reward_rate 6000 --benefit_address lax1x0f9xwr9steccekttqvml0d26zgsxwdnhq3fkv --details "Modify the verifier information operation"
```

- 参数说明

> config：验证节点信息文件路径
>
> address: 质押观察钱包路径
>
> node_name\[可选\]：验证人名称，不超过30字节，支持字母、数字、空格、上下划线及#，必须字母开头
>
> website\[可选\]：官网路径，不超过70字节，数字字母组成
>
> external_id\[可选\]：节点头像icon在[keybase.io](https://keybase.io)的ID，或者外部系统身份认证ID
>
> delegated_reward_rate\[可选\]：委托奖励比例，单位：万分比，整数，范围\[0,10000]，如输入5000，表示分红比例为50%
>
> benefit_address\[可选\]：验证节点收益地址，42字符（字母数字）
>
> details\[可选\]：简介，验证人简要介绍说明，不超过280字节，建议英文



### 解质押操作

<font color=red>**解质押需要168个结算周期才能退出完成，请谨慎操作！**</font>

- 执行命令

```bash
platon_mtool unstaking --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 增加质押操作

- 执行命令

```bash
platon_mtool increasestaking --amount 5000000 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> amount：用账户余额来增加质押量(LAT)，不少于10最小增加值，小数点不超过8位
>
> restrictedamount： 用账户锁仓余额来增加质押量，不少于10质押门槛，小数点不超过8位（使用锁仓余额质押）
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 提交文本提案操作

- 执行命令

```bash
platon_mtool submit_textproposal --pid_id 100 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> pid_id：GitHub ID
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 提交升级提案操作

- 执行命令

```bash
platon_mtool submit_versionproposal --newversion 0.15.1 --end_voting_rounds 345 --pid_id 100 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> newversion：目标升级版本，x.x.x，数字加标点
>
> end_voting_rounds：投票共识轮数，投票共识轮数N，必须满足0 < N <= 4838（约为2周）
>
> pid_id：GitHub ID
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 提交取消提案操作

- 执行命令

```bash
platon_mtool submit_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --end_voting_rounds 12 --pid_id 100 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：需要被取消的提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> end_voting_rounds：投票共识轮数，投票共识轮数N，必须满足0 < N <= 4838（约为2周）
>
> pid_id：GitHub ID
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 文本提案投票操作

- 执行命令

```bash
platon_mtool vote_textproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：文本提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> opinion：投票选项，yes、no、abstain-三选一
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 升级提案投票操作

- 执行命令

```bash
platon_mtool vote_versionproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：升级提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 取消提案投票操作

- 执行命令

```bash
platon_mtool vote_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：取消提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> opinion：投票选项，yes、no、abstain-三选一
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 提交参数提案操作

- 执行命令

```bash
platon_mtool submit_paramproposal --pid_id 200 --module $module --paramname $paramname --paramvalue $paramvalue --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> module：治理模块参数
>
> paramname：治理模块参数名，注意字母大小写
>
> paramvalue：治理模块参数值
>
> pid_id：GitHub ID
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

###  参数提案投票操作

- 执行命令

``` bash
platon_mtool  vote_paramproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：取消提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> opinion：投票选项，yes、no、abstain-三选一
>
> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 版本声明操作

- 执行命令

```bash
platon_mtool declare_version --address $PLATON_MTOOLDIR/keystore/staking_observed.json --config $PLATON_MTOOLDIR/validator/validator_config.json
```

- 参数说明

> address：发送交易的观察钱包路径
>
> config：验证节点信息文件路径

### 查看帮助

- 执行命令

```bash
platon_mtool -h
```

- 参数说明

> 无
