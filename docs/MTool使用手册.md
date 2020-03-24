---
id: MTool_Manual
title: MTool使用手册
sidebar_label: MTool使用手册
---



## MTool环境变量说明

Windows和Ubuntu下MTool目录使用环境变量有所区别：

- MTool目录

  - Windows：`%MTOOLDIR%`

  - Ubuntu：`$MTOOLDIR`

>  说明：**`用户根据自己安装的系统进行选择环境变量。`**
>

##  MTool命令详解

### 创建钱包

- 执行命令

```shell
mtool-client account new staking
```

- 参数说明

>staking: 生成的钱包名称，创建成功后会在目录`$MTOOLDIR/keystore`下生成钱包文件`staking.json`。

### 普通转账操作

- 执行命令

```bash
mtool-client tx transfer --keystore $MTOOLDIR/keystore/staking.json --amount "1" --recipient $to_address --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

>keystore：发送转账交易的钱包路径
>
>amount：转账金额，单位：LAT
>
>recipient：接收地址

### 查看钱包列表

- 执行命令

```bash
mtool-client account list
```

### 根据钱包名称查询余额

- 执行命令

```bash
mtool-client account balance $keystorename --config $MTOOLDIR/validator/validator_config.json
```

- 变量说明

>$keystorename：钱包文件名称，如staking.json

### 根据地址查询余额

- 执行命令

```bash
mtool-client account balance -a $address --config $MTOOLDIR/validator/validator_config.json
```

- 参数

> a：钱包地址

### 发起质押操作

如果共识节点部署完成，并且已经同步区块成功，您就可以使用MTool进行质押操作。质押资金申请完成后，确保质押账户余额足够，根据用户情况替换质押金额，质押最低门槛为100万LAT。

注意：请保持质押账户里面有足够LAT，以备后续发起节点管理的交易有足够的交易手续费，比如升级提案的投票，解质押等交易。

- 执行命令

```bash
mtool-client staking --amount 1000000 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```
提示：**please input keystore password:** 输入质押钱包的密码，然后回车，如果显示如下信息则代表质押成功：

```bash
operation finished
transaction hash:
0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b
SUCCESS
```

- 参数说明

> amount: 质押数，不少于1000000lat-质押门槛，小数点不超过8位
>
> restrictedamount: 不少于1000000lat-质押门槛，小数点不超过8位（使用锁仓余额质押）

### 修改验证人信息操作

- 执行命令

```bash
mtool-client update_validator --name VerifierName --url "http://www.platon.com" --identity IdentifyID --delegated-reward-rate 100 --reward 0x33d253386582f38c66cb5819bfbdaad0910339b3 --introduction "Modify the verifier information operation" --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> name：验证人名称，不超过30字节，支持字母、数字、空格、上下划线及#，必须字母开头
>
> url：官网路径，不超过70字节，数字字母组成
>
> identity：身份认证ID，不超过140字节，对应validator_config.json配置文件中的`externalId`字段。
>
> delegated-reward-rate：委托奖励比例，单位：万分比，整数，范围0~10000，如输入5000，表示分红比例为50%
>
> reward：收益地址，42字符（字母数字）
>
> introduction：简介，验证人简要介绍说明，不超过280字节，建议英文
>
> a：执行命令时，用配置文件里面的值作参数去修改验证人信息

### 解质押操作

- 执行命令

```bash
mtool-client unstaking --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> 无

### 增加质押操作

- 执行命令

```bash
mtool-client increasestaking --amount 5000000 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> amount：用账户余额来增加质押量(LAT)，不少于10最小增加值，小数点不超过8位
>
> restrictedamount： 用账户锁仓余额来增加质押量，不少于10质押门槛，小数点不超过8位（使用锁仓余额质押）

### 提交文本提案操作

- 执行命令

```bash
mtool-client submit_textproposal --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> pid_id：GitHub ID

### 提交升级提案操作

- 执行命令

```bash
mtool-client submit_versionproposal --newversion 0.8.0 --end_voting_rounds 345 --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> newversion：目标升级版本，x.x.x，数字加标点
>
> end_voting_rounds：投票共识轮数，投票共识轮数N，必须满足0 < N <= 4838（约为2周）
>
> pid_id：GitHub ID

### 提交取消提案操作

- 执行命令

```bash
mtool-client submit_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --end_voting_rounds 12 --pid_id 100 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：需要被取消的提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> end_voting_rounds：投票共识轮数，投票共识轮数N，必须满足0 < N <= 4838（约为2周）
>
> pid_id：GitHub ID

### 文本提案投票操作

- 执行命令

```bash
mtool-client vote_textproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：文本提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> opinion：投票选项，yes、no、abstain-三选一

### 升级提案投票操作

- 执行命令

```bash
mtool-client vote_versionproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：升级提案ID，即发起提案交易的hash，66字符，字母数字组成

### 取消提案投票操作

- 执行命令

```bash
mtool-client vote_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：取消提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> opinion：投票选项，yes、no、abstain-三选一

### 提交参数提案操作

- 执行命令

```bash
mtool-client submit_paramproposal --pid_id 200 --module $module --paramname $paramname --paramvalue $paramvalue --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> module：治理模块参数
>
> paramname：治理模块参数名，注意字母大小写
>
> paramvalue：治理模块参数值
>
> pid_id：GitHub ID

###  参数提案投票操作

- 执行命令

``` bash
mtool-client  vote_paramproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> proposalid：取消提案ID，即发起提案交易的hash，66字符，字母数字组成
>
> opinion：投票选项，yes、no、abstain-三选一

### 版本声明操作

- 执行命令

```bash
mtool-client declare_version --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 参数说明

> 无

### 查看帮助

- 执行命令

```bash
mtool-client -h
```

- 参数说明

> 无
