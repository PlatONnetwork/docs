---
id: PlatON_system_contract_api
title: 系统合约接口说明
sidebar_label: 系统合约接口说明
---


### 交易接口定义

交易接口沿用以太坊消息结构，对于特定类型的交易(如举报)通过扩展tx.input 字段来实现与以太坊交易接口的兼容
以太坊交易结构如下：

| **字段名**  | **长度**  |  **说明**  |
| ------------ | ------------ | ------------ |
| nonce | 8bytes | 当前账户发送的第几笔交易 |
| gasPrice | 32bytes | 当前交易的gas价格 |
| gas | 8bytes | 当前交易允许消耗的最大gas |
| to | 20bytes | 交易的目标地址(为nil时表示创建合约) |
| value | 32bytes | 当前交易转账的金额 |
| input | bytes | 当前交易携带的扩展数据，前2个字节为funcTypeid，后面是参数列表 |
| v | 32bytes | 签名v值 |
| r | 32bytes | 签名r值 |
| s | 32bytes | 签名s值 |

### 接口的调用方式

例如:

```
platon.sendTransaction({from: "lat1nwc2am8ple8rpuqx3rsv6txljkuetsm6890u6d",to: "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzlh5ge3", value: 0, gas:52792, gasPrice:500000000000, data:"0xf856838203eab842b840acae6c5bd52f6807d67da902164c6d6e3e9b8f84a06b04500961d211d3793cabbf54b25a652463967fcccde1b615680edd21321736df34b29000a39f44f78b3081808b8a01e7e4171bf4d3a00000"})
```

> 经济模型和治理相关交易都引用 `sendTransaction` 其中将所有入参以 十六进制编码的rlp数组作为入参

### tx.input 扩展说明

- 字段说明

| **字段名**  | **位置**  |  **说明**  |
| ------------ | ------------ | ------------ |
| funcType | tx.input前2个字节 | 命令码 |

- funcType取值

>各个接口的命令码和对应的接口如下所示，例如： `1000`表示`发起质押`，`1001`表示`修改质押信息`等等

### staking接口

1000: [发起质押](#staking_contract_1)

1001: [修改质押信息](#staking_contract_2)

1002: [增持质押](#staking_contract_3)

1003: [撤销质押](#staking_contract_4)

1004: [发起委托](#staking_contract_5)

1005: [减持/撤销委托](#staking_contract_6)

1100: [查询当前结算周期的验证人队列](#staking_contract_7)

1101: [查询当前共识周期的验证人列表](#staking_contract_8)

1102: [查询所有实时的候选人列表](#staking_contract_9)

1103: [查询当前账户地址所委托的节点的NodeID和质押Id](#staking_contract_10)

1104: [查询当前单个节点的委托信息](#staking_contract_11)

1105: [查询当前节点的质押信息](#staking_contract_12)

1200: [查询当前结算周期的区块奖励](#staking_contract_13)

1201: [查询当前结算周期的质押奖励](#staking_contract_14)

1202: [查询打包区块的平均时间](#staking_contract_15)


### 治理接口

2000: [提交文本提案](#submitText)

2001: [提交升级提案](#submitVersion)

2002: [提交参数提案](#submitParam)

2005: [提交取消提案](#submitCancel)

2003: [给提案投票](#vote)

2004: [版本声明](#declareVersion)

2100: [查询提案](#getProposal)

2101: [查询提案结果](#getTallyResult)

2102: [查询提案列表](#listProposal)

2103: [查询生效版本](#getActiveVersion)

2104: [查询当前块高的治理参数值](#getGovernParamValue)

2105: [查询提案累积的可投票人数](#getAccuVerifiersCount)

2106: [查询治理参数列表](#listGovernParam)



### 举报惩罚接口

3000: [举报多签](#ReportDuplicateSign)

3001: [查询节点是否有多签过](#CheckDuplicateSign)

3002:[查询零出块节点的列表](#ZeroProduceNodeList)

### 锁仓计划接口

4000: [创建锁仓计划](#CreateRestrictingPlan)

4100: [获取锁仓信息](#GetRestrictingInfo)

### 奖励接口

5000: [提取委托奖励](#withdrawDelegateReward)

5100: [查询委托奖励](#getDelegateReward)


- 发起交易编解码协议

1. tx.input字段以及查询结果的data字段统一使用RLP编解码协议，各个接口参数列表详见以下表格
2. 查询结果沿用[以太坊的结果返回格式](#innerContract_info_result)
3. 下列经济模型和治理相关的交易接口均以接口说明的顺序及类型将对应的值放置到入参数组中做了rlp编码之后再序列化成十六进制入参，并在发起交易时填写到`sendTransaction`的data字段

如：

```
增持质押:

各个入参字段的编码规则:

rlp([rlp(1002), rlp('')])


交易发起的示例:

platon.sendTransaction({from: "lat1nwc2am8ple8rpuqx3rsv6txljkuetsm6890u6d",to: "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzlh5ge3", value: 0, gas:52792, gasPrice:500000000000, data:"0xf856838203eab842b840acae6c5bd52f6807d67da902164c6d6e3e9b8f84a06b04500961d211d3793cabbf54b25a652463967fcccde1b615680edd21321736df34b29000a39f44f78b3081808b8a01e7e4171bf4d3a00000"})
```

- 发起查询编解码协议

1. 下列经济模型和治理相关的查询累接口均以接口说明顺序及类型将对应的值放置到入参数组中做了rlp编码之后再序列化成十六进制入参，并在发起交易时填写到`call`的data字段

如:

```
platon.call({to: "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp3yp7hw", data:"0xda838210049594493301712671ada506ba6ca7891f436d29185821"})
```

所有`platon.sendTransaction`交易接口的结果 :

成功则回执中写的是: 0, 而失败写的是对应的错误码(错误码请参考底层内置合约错误码文档)

回执示例:

```
{
  blockHash: "0x9ac7f6702512c5572185e5acd64e6eb297296b603a795aa634c5a99bd01ef9d1",
  blockNumber: 836,
  contractAddress: null,
  cumulativeGasUsed: 52724,
  from: "lat1c8enpvs5v6974shxgxxav5dsn36e5jl4v29pec",
  gasUsed: 52724,
  logs: [{
      address: "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzlh5ge3",
      blockHash: "0x9ac7f6702512c5572185e5acd64e6eb297296b603a795aa634c5a99bd01ef9d1",
      blockNumber: 836,
      data: "0xc786333031313032", // 这个字段就是成功的"0"或者失败的"xxxx"错误码的rlp结果,解开它即可
      logIndex: 0,
      removed: false,
      topics: ["0x4ca61667a6086c915d0bf1b542abd171bdf676d52eed640e514e984beed3fefe"],
      transactionHash: "0x4c874a3af9c67c14317e6f62bf0279bc5a8db2f4cbb20a74873192aa46675d7b",
      transactionIndex: 0
  }],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000080000000000000000080002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzlh5ge3",
  transactionHash: "0x4c874a3af9c67c14317e6f62bf0279bc5a8db2f4cbb20a74873192aa46675d7b",
  transactionIndex: 0
}

```

`platon.call`查询类接口结果统一格式:

|名称|类型|说明|
|---|---|---|
|Code|uint32| 表示ppos内置合约返回的错误码|
|Ret|interface{}| (万能类型) 当Code为:0 时,返回json的查询结果(列表或单个对象)，具体结果格式参见以下查询相关接口返回值;当Code非0时,返回错误提示信息字符串 |

> 注：以下查询接口（platon_call调用的接口）如无特殊声明，返回参数都按照上述格式返回

### staking接口

**以下staking相关接口的合约地址为:**   
主网:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzsjx8h7  
EIP55地址:0x1000000000000000000000000000000000000002  

1. createStaking: 发起质押

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1000)|Y|
|typ|uint16(2bytes)|表示使用账户自由金额还是账户的锁仓金额做质押，0: 自由金额； 1: 锁仓金额;2: 优先使用锁仓余额，锁仓余额不足则剩下的部分使用自由金额|Y|
|benefitAddress|20bytes|用于接受出块奖励和质押奖励的收益账户|Y,客户端可传: '0x00000...000' (零账户地址，零地址代表被视为丢掉收益von)|
|nodeId|64bytes|被质押的节点Id(也叫候选人的节点Id)|Y|
|externalId|string|外部Id(有长度限制，给第三方拉取节点描述的Id)|Y,客户端可默认传: '' (空字符串)|
|nodeName|string|被质押节点的名称(有长度限制，表示该节点的名称)|Y,客户端可默认传: '' (空字符串)|
|website|string|节点的第三方主页(有长度限制，表示该节点的主页)|Y,客户端可默认传: '' (空字符串)|
|details|string|节点的描述(有长度限制，表示该节点的描述)|Y,客户端可默认传: '' (空字符串)|
|amount|*big.Int(bytes)|质押的von|Y|
|rewardPer|uint16(2bytes)|委托所得到的奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|programVersion|uint32|程序的真实版本，治理rpc获取|Y|
|programVersionSign|65bytes|程序的真实版本签名，治理rpc获取|Y|
|blsPubKey|96bytes|bls的公钥|Y|
|blsProof|64bytes|bls的证明,通过拉取证明接口获取|Y|

2. editCandidate: 修改质押信息

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1001)|Y|
|benefitAddress|20bytes|用于接受出块奖励和质押奖励的收益账户|N,默认值: nil (0x00...零账户地址，零地址代表被视为丢掉收益von)|
|nodeId|64bytes|被质押的节点Id(也叫候选人的节点Id)|Y|
|rewardPer|uint16(2bytes)|委托所得到的奖励分成比例，采用BasePoint 1BP=0.01%，例：传500就是5%的奖励作为委托奖励|N,默认值:nil（空byte）|
|externalId|string|外部Id(有长度限制，给第三方拉取节点描述的Id)|N,默认值: nil（空byte）|
|nodeName|string|被质押节点的名称(有长度限制，表示该节点的名称)|N,默认值: nil（空byte）|
|website|string|节点的第三方主页(有长度限制，表示该节点的主页)|N,默认值: nil（空byte）|
|details|string|节点的描述(有长度限制，表示该节点的描述)|N,默认值: nil（空byte）|

3. increaseStaking: 增持质押

| 参数 | 类型 | 说明 | 是否必须 |
| --- | --- | --- | --- |
| funcType | uint16(2bytes) | 代表方法类型码(1002) | Y |
| nodeId | 64bytes | 被质押的节点Id(也叫候选人的节点Id) | Y |
| typ | uint16(2bytes) | 表示使用账户自由金额还是账户的锁仓金额做质押，0: 自由金额； 1: 锁仓金额 | Y |
| amount | *big.Int(bytes) | 增持的von | Y |


4. withdrewStaking: 撤销质押(一次性发起全部撤销，多次到账)



|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1003)|Y|
|nodeId|64bytes|被质押的节点的NodeId|Y|

5. delegate: 发起委托



|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1004)|Y|
|typ|uint16(2bytes)|表示使用账户自由金额还是账户的锁仓金额做委托，0: 自由金额； 1: 锁仓金额|Y|
|nodeId|64bytes|被质押的节点的NodeId|Y|
|amount|*big.Int(bytes)|委托的金额(按照最小单位算，1LAT = 10**18 von)|Y|

6. withdrewDelegation: 减持/撤销委托(全部减持就是撤销)



|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1005)|Y|
|stakingBlockNum|uint64(8bytes)|代表着某个node的某次质押的唯一标识|Y|
|nodeId|64bytes|被质押的节点的NodeId|Y|
|amount|*big.Int(bytes)|减持生效的委托的金额(按照最小单位算，1LAT = 10**18 von)|Y|

返参：

注:交易结果存储在交易回执的logs.data中，如果是赎回全部委托，存储 rlp.Encode([][]byte{[]byte(状态码0)， rlp.Encode(委托的收益) })，否则和之前结构一样

| 参数           | 类型     | 说明       | 是否必须 |
| -------------- | -------- | ---------- | -------- |
| delegateIncome | *big.int | 委托的收益 | N        |


7. getVerifierList: 查询当前结算周期的验证人队列



入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1100)|Y|


返参： 列表

|名称|类型|说明|是否可为空(零值)|
|---|---|---|---|
|NodeId|64bytes|被质押的节点Id(也叫候选人的节点Id)|N|
|StakingAddress|20bytes|发起质押时使用的账户(后续操作质押信息只能用这个账户，撤销质押时，von会被退回该账户或者该账户的锁仓信息中)|N|
|BenefitAddress|20bytes|用于接受出块奖励和质押奖励的收益账户|Y, 零账户地址|
|RewardPer|uint16(2bytes)|当前结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|NextRewardPer|uint16(2bytes)|下一个结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|StakingTxIndex|uint32(4bytes)|发起质押时的交易索引|N|
|ProgramVersion|uint32|被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)|N|
|StakingBlockNum|uint64(8bytes)|发起质押时的区块高度|N|
|Shares|*big.Int(bytes)|当前候选人总共质押加被委托的von数目|N|
|ExternalId|string|外部Id(有长度限制，给第三方拉取节点描述的Id)|Y, 默认为空字符串|
|NodeName|string|被质押节点的名称(有长度限制，表示该节点的名称)|Y, 默认为空字符串|
|Website|string|节点的第三方主页(有长度限制，表示该节点的主页)|Y, 默认为空字符串|
|Details|string|节点的描述(有长度限制，表示该节点的描述)|Y, 默认为空字符串|
|ValidatorTerm|uint32(4bytes)|验证人的任期(在结算周期的101个验证人快照中永远是0，只有在共识轮的验证人时才会被有值，刚被选出来时也是0，继续留任时则+1)|Y,默认为 0|
|DelegateTotal|*big.Int(bytes)|当前候选人生效的总委托数量|Y|
|DelegateRewardTotal|*big.Int(bytes)|候选人当前发放的总委托奖励|Y|

8. getValidatorList: 查询当前共识周期的验证人列表



入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1101)|Y|

返参： 列表

|名称|类型|说明|是否可为空(零值)|
|---|---|---|---|
|NodeId|64bytes|被质押的节点Id(也叫候选人的节点Id)|N|
|StakingAddress|20bytes|发起质押时使用的账户(后续操作质押信息只能用这个账户，撤销质押时，von会被退回该账户或者该账户的锁仓信息中)|N|
|BenefitAddress|20bytes|用于接受出块奖励和质押奖励的收益账户|Y，默认为零账户地址|
|RewardPer|uint16(2bytes)|当前结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|NextRewardPer|uint16(2bytes)|下一个结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|StakingTxIndex|uint32(4bytes)|发起质押时的交易索引|N|
|ProgramVersion|uint32(4bytes)|被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)|N|
|StakingBlockNum|uint64(8bytes)|发起质押时的区块高度|N|
|Shares|*big.Int(bytes)|当前候选人总共质押加被委托的von数目|N|
|ExternalId|string|外部Id(有长度限制，给第三方拉取节点描述的Id)|Y, 默认为空字符串|
|NodeName|string|被质押节点的名称(有长度限制，表示该节点的名称)|Y, 默认为空字符串|
|Website|string|节点的第三方主页(有长度限制，表示该节点的主页)|Y, 默认为空字符串|
|Details|string|节点的描述(有长度限制，表示该节点的描述)|Y, 默认为空字符串|
|ValidatorTerm|uint32(4bytes)|验证人的任期(在结算周期的101个验证人快照中永远是0，只有在共识轮的验证人时才会被有值，刚被选出来时也是0，继续留任时则+1)|N|
|DelegateTotal|*big.Int(bytes)|当前候选人生效的总委托数量|Y|
|DelegateRewardTotal|*big.Int(bytes)|候选人当前发放的总委托奖励|Y|

9. getCandidateList: 查询所有实时的候选人列表

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1102)|Y|

返参： 列表

|名称|类型|说明|是否可为空(零值)|
|---|---|---|---|
|NodeId|64bytes|被质押的节点Id(也叫候选人的节点Id)|N|
|StakingAddress|20bytes|发起质押时使用的账户(后续操作质押信息只能用这个账户，撤销质押时，von会被退回该账户或者该账户的锁仓信息中)|N|
|BenefitAddress|20bytes|用于接受出块奖励和质押奖励的收益账户|Y，默认为零账户地址|
|RewardPer|uint16(2bytes)|当前结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|NextRewardPer|uint16(2bytes)|下一个结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|StakingTxIndex|uint32(4bytes)|发起质押时的交易索引|N|
|ProgramVersion|uint32(4bytes)|被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)|N|
|Status|uint32(4bytes)|候选人的状态(状态是根据uint32的32bit来放置的，可同时存在多个状态，值为多个同时存在的状态值相加【0: 节点可用 (32个bit全为0)； 1: 节点不可用 (只有最后一bit为1)； 2： 节点零出块需要锁定但无需解除质押(只有倒数第二bit为1)； 4： 节点的von不足最低质押门槛(只有倒数第三bit为1)； 8：节点被举报双签(只有倒数第四bit为1)); 16: 节点零出块需要锁定并解除质押(倒数第五位bit为1); 32: 节点主动发起撤销(只有倒数第六位bit为1)】|N|
|StakingEpoch|uint32(4bytes)|当前变更质押金额时的结算周期|N|
|StakingBlockNum|uint64(8bytes)|发起质押时的区块高度|N|
|Shares|string(0x十六进制字符串)|当前候选人总共质押加被委托的von数目|N|
|Released|string(0x十六进制字符串)|发起质押账户的自由金额的锁定期质押的von|Y,默认为0|
|ReleasedHes|string(0x十六进制字符串)|发起质押账户的自由金额的犹豫期质押的von|Y,默认为0|
|RestrictingPlan|string(0x十六进制字符串)|发起质押账户的锁仓金额的锁定期质押的von|Y,默认为0|
|RestrictingPlanHes|string(0x十六进制字符串)|发起质押账户的锁仓金额的犹豫期质押的von|Y,默认为0|
|ExternalId|string|外部Id(有长度限制，给第三方拉取节点描述的Id)|Y, 默认为空字符串|
|NodeName|string|被质押节点的名称(有长度限制，表示该节点的名称)|Y, 默认为空字符串|
|Website|string|节点的第三方主页(有长度限制，表示该节点的主页)|Y, 默认为空字符串|
|Details|string|节点的描述(有长度限制，表示该节点的描述)|Y, 默认为空字符串|
|DelegateEpoch|uint32(4bytes)|节点最后一次被委托的结算周期数|Y|
|DelegateTotal|string(0x十六进制字符串)|节点被委托的生效总数量|Y|
|DelegateTotalHes|string(0x十六进制字符串)|节点被委托的未生效的总数量|Y|
|DelegateRewardTotal|*big.Int(bytes)|候选人当前发放的总委托奖励|Y|

10. getRelatedListByDelAddr: 查询当前账户地址所委托的节点的NodeID和质押Id



入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(1103)|Y|
|addr|common.address(20bytes)|委托人的账户地址|Y|

返参： 列表

|名称|类型|说明|是否可为空(零值)|
|---|---|---|---|
|Addr|20bytes|委托人的账户地址|N|
|NodeId|64bytes|验证人的节点Id|N|
|StakingBlockNum|uint64(8bytes)|发起质押时的区块高度|N|

11. getDelegateInfo: 查询当前单个节点的委托信息

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16|代表方法类型码(1104)|Y|
|stakingBlockNum|uint64(8bytes)|发起质押时的区块高度|Y|
|delAddr|20bytes|委托人账户地址|Y|
|nodeId|64bytes|验证人的节点Id|Y|

返参：结构如下

|名称|类型|说明|是否可为空(零值)|
|---|---|---|---|
|Addr|20bytes|委托人的账户地址|N|
|NodeId|64bytes|验证人的节点Id|N|
|StakingBlockNum|uint64(8bytes)|发起质押时的区块高度|N|
|DelegateEpoch|uint32(4bytes)|最近一次对该候选人发起的委托时的结算周期|N|
|Released|string(0x十六进制字符串)|发起委托账户的自由金额的锁定期委托的von|Y,默认为0|
|ReleasedHes|string(0x十六进制字符串)|发起委托账户的自由金额的犹豫期委托的von|Y,默认为0|
|RestrictingPlan|string(0x十六进制字符串)|发起委托账户的锁仓金额的锁定期委托的von|Y,默认为0|
|RestrictingPlanHes|string(0x十六进制字符串)|发起委托账户的锁仓金额的犹豫期委托的von|Y,默认为0|
|CumulativeIncome|string(0x十六进制字符串)|待领取的委托收益|Y,默认为0|

12. getCandidateInfo: 查询当前节点的质押信息

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16|代表方法类型码(1105)|Y|
|nodeId|64bytes|验证人的节点Id|Y|

返参： 列表

|名称|类型|说明|是否可为空(零值)|
|---|---|---|---|
|NodeId|64bytes|被质押的节点Id(也叫候选人的节点Id)|N|
|StakingAddress|20bytes|发起质押时使用的账户(后续操作质押信息只能用这个账户，撤销质押时，von会被退回该账户或者该账户的锁仓信息中)|N|
|BenefitAddress|20bytes|用于接受出块奖励和质押奖励的收益账户|Y,默认为零账户地址|
|RewardPer|uint16(2bytes)|当前结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|NextRewardPer|uint16(2bytes)|下一个结算周期奖励分成比例，采用BasePoint 1BP=0.01%|Y|
|StakingTxIndex|uint32(4bytes)|发起质押时的交易索引|N|
|ProgramVersion|uint32(4bytes)|被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)|N|
|Status|uint32(4bytes)|候选人的状态(状态是根据uint32的32bit来放置的，可同时存在多个状态，值为多个同时存在的状态值相加【0: 节点可用 (32个bit全为0)； 1: 节点不可用 (只有最后一bit为1)； 2： 节点零出块需要锁定但无需解除质押(只有倒数第二bit为1)； 4： 节点的von不足最低质押门槛(只有倒数第三bit为1)； 8：节点被举报双签(只有倒数第四bit为1)); 16: 节点零出块需要锁定并解除质押(倒数第五位bit为1); 32: 节点主动发起撤销(只有倒数第六位bit为1)】|N|
|StakingEpoch|uint32(4bytes)|当前变更质押金额时的结算周期|N|
|StakingBlockNum|uint64(8bytes)|发起质押时的区块高度|N|
|Shares|string(0x十六进制字符串)|当前候选人总共质押加被委托的von数目|Y,默认为0|
|Released|string(0x十六进制字符串)|发起质押账户的自由金额的锁定期质押的von|Y,默认为0|
|ReleasedHes|string(0x十六进制字符串)|发起质押账户的自由金额的犹豫期质押的von|Y,默认为0|
|RestrictingPlan|string(0x十六进制字符串)|发起质押账户的锁仓金额的锁定期质押的von|Y,默认为0|
|RestrictingPlanHes|string(0x十六进制字符串)|发起质押账户的锁仓金额的犹豫期质押的von|Y,默认为0|
|ExternalId|string|外部Id(有长度限制，给第三方拉取节点描述的Id)|Y, 默认为空字符串|
|NodeName|string|被质押节点的名称(有长度限制，表示该节点的名称)|Y, 默认为空字符串|
|Website|string|节点的第三方主页(有长度限制，表示该节点的主页)|Y, 默认为空字符串|
|Details|string|节点的描述(有长度限制，表示该节点的描述)|Y, 默认为空字符串|
|DelegateEpoch|uint32(4bytes)|节点最后一次被委托的结算周期|Y,默认为0|
|DelegateTotal|string(0x十六进制字符串)|节点被委托的生效总数量|Y,默认为0|
|DelegateTotalHes|string(0x十六进制字符串)|节点被委托的未生效总数量|Y,默认为0|
|DelegateRewardTotal|*big.Int(bytes)|候选人当前发放的总委托奖励|Y|

13. getPackageReward: 查询当前结算周期的区块奖励


入参：

| 参数     | 类型           | 说明                 | 是否必须 |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | 代表方法类型码(1200) | Y        |

返参：

| 类型                     | 说明     | 是否可为空(零值) |
| ------------------------ | -------- | ---------------- |
| string(0x十六进制字符串) | 区块奖励 | N                |

14. getStakingReward: 查询当前结算周期的质押奖励

入参：

| 参数     | 类型           | 说明                 | 是否必须 |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | 代表方法类型码(1201) | Y        |

返参：

| 类型                     | 说明     | 是否可为空(零值) |
| ------------------------ | -------- | ---------------- |
| string(0x十六进制字符串) | 质押奖励 | N                |

15. getAvgPackTime: 查询打包区块的平均时间

入参：

| 参数     | 类型           | 说明                 | 是否必须 |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | 代表方法类型码(1202) | Y        |

返参：

| 类型   | 说明                             | 是否可为空(零值) |
| ------ | -------------------------------- | ---------------- |
| uint64 | 打包区块的平均时间（单位为毫秒） | N                |



### 治理接口

**以下 治理相关接口的合约地址为:**  
主网:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm  
EIP55地址:0x1000000000000000000000000000000000000005  

1. submitText: 提交文本提案

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2000)|Y|
|verifier|discover.NodeID(64bytes)|提交提案的验证人|Y|
|pIDID|string(uint64)|PIPID|Y|

2. submitVersion: 提交升级提案

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2001)|Y|
|verifier|discover.NodeID(64bytes)|提交提案的验证人|Y|
|pIDID|string(uint64)|PIPID|Y|
|newVersion|uint32(4bytes)|升级版本|Y|
|endVotingRounds|uint64|投票共识轮数量。说明：假设提交提案的交易，被打包进块时的共识轮序号时round1，则提案投票截止块高，就是round1 + endVotingRounds这个共识轮的第230个块高（假设一个共识轮出块250，ppos揭榜提前20个块高，250，20都是可配置的 ），其中0 < endVotingRounds <= 4840（约为2周，实际论述根据配置可计算），且为整数）|Y|

3. submitParam: 提交参数提案

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2002)|Y|
|verifier|discover.NodeID(64bytes)|提交提案的备选人|Y|
|pIDID|string(uint64)|PIPID|Y|
|module|string|参数模块|Y|
|name|string|参数名称|Y|
|newValue|string|参数新值|Y|


4. submitCancel: 提交取消提案

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2005)|Y|
|verifier|discover.NodeID(64bytes)|提交提案的验证人|Y|
|pIDID|string(uint64)|PIPID|Y|
|endVotingRounds|uint64|投票共识轮数量。参考提交升级提案的说明，同时，此接口中此参数的值不能大于对应升级提案中的值|Y|
|tobeCanceledProposalID|common.hash(32bytes)|待取消的升级提案ID|Y|


5. vote: 给提案投票

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2003)|Y|
|verifier|discover.NodeID(64bytes)|投票验证人|Y|
|proposalID|common.Hash(32bytes)|提案ID|Y|
|option|uint8(1byte)    0x01:支持 0x02:反对 其他值:弃权        |投票选项|Y|
|programVersion|uint32(4bytes)|节点代码版本，有rpc的getProgramVersion接口获取|Y|
|versionSign|common.VesionSign(65bytes)|代码版本签名，有rpc的getProgramVersion接口获取|Y|

6. declareVersion: 版本声明

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2004)|Y|
|verifier|discover.NodeID(64bytes)|声明的节点，只能是验证人/候选人|Y|
|programVersion|uint32(4bytes)|声明的版本，有rpc的getProgramVersion接口获取|Y|
|versionSign|common.VesionSign(65bytes)|声明的版本签名，有rpc的getProgramVersion接口获取|Y|


7. getProposal: 查询提案

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|2100|Y|
|proposalID|common.Hash(32bytes)|提案ID|Y|

返参为以下四种类型中的一种：

##### TextProposal：文本提案

- 字段说明：

|字段|类型|说明|
|---|---|---|
|ProposalID|common.Hash(32bytes)|提案ID|
|Proposer|common.NodeID(64bytes)|提案节点ID|
|ProposalType|byte|提案类型， 0x01：文本提案； 0x02：升级提案；0x03参数提案；0x04取消提案。|
|PIPID|string|提案PIPID|
|SubmitBlock|8bytes|提交提案的块高|
|EndVotingBlock|8bytes|提案投票结束的块高，系统根据SubmitBlock|


##### VersionProposal：升级提案

- 字段说明：

|字段|类型|说明|
|---|---|---|
|ProposalID|common.Hash(32bytes)|提案ID|
|Proposer|common.NodeID(64bytes)|提案节点ID|
|ProposalType|byte|提案类型， 0x01：文本提案； 0x02：升级提案；0x03参数提案；0x04取消提案。|
|PIPID|string|提案PIPID|
|SubmitBlock|8bytes|提交提案的块高|
|EndVotingRounds|8bytes|投票持续的共识周期数量|
|EndVotingBlock|8bytes|提案投票结束的块高，系统根据SubmitBlock，EndVotingRounds算出|
|ActiveBlock|8bytes|提案生效块高，系统根据EndVotingBlock算出|
|NewVersion|uint|升级版本|


##### CancelProposal：取消提案

- 字段说明：

|字段|类型|说明|
|---|---|---|
|ProposalID|common.Hash(32bytes)|提案ID|
|Proposer|common.NodeID(64bytes)|提案节点ID|
|ProposalType|byte|提案类型， 0x01：文本提案； 0x02：升级提案；0x03参数提案；0x04取消提案。|
|PIPID|string|提案PIPID|
|SubmitBlock|8bytes|提交提案的块高|
|EndVotingRounds|8bytes|投票持续的共识周期数量|
|EndVotingBlock|8bytes|提案投票结束的块高，系统根据SubmitBlock，EndVotingRounds算出|
|TobeCanceled|common.Hash(32bytes)|提案要取消的升级提案ID|


##### ParamProposal：参数提案

- 字段说明：

|字段|类型|说明|
|---|---|---|
|ProposalID|common.Hash(32bytes)|提案ID|
|Proposer|common.NodeID(64bytes)|提案节点ID|
|ProposalType|byte|提案类型， 0x01：文本提案； 0x02：升级提案；0x03参数提案；0x04取消提案。|
|PIPID|string|提案PIPID|
|SubmitBlock|8bytes|提交提案的块高|
|EndVotingBlock|8bytes|提案投票结束的块高，系统根据SubmitBlock，EndVotingEpochRounds算出|
|Moudule|string|参数模块名|
|Name|string|参数名称|
|NewVersion|uint|参数新值|


8. getTallyResult: 查询提案结果

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2101)|Y|
|proposalID|common.Hash(32bytes)|提案ID|Y|

返参：

|字段|类型|说明|
|---|---|---|
|proposalID|common.Hash(32bytes)|提案ID|
|yeas|uint64(8bytes)|赞成票|
|nays|uint64(8bytes)|反对票|
|abstentions|uint64(8bytes)|弃权票|
|accuVerifiers|uint64(8bytes)|在整个投票期内有投票资格的验证人总数|
|status|byte|状态|
|canceledBy|common.Hash(32bytes)|当status=0x06时，记录发起取消的ProposalID|


9. listProposal: 查询提案列表

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2102)|Y|

返参：

参考getProposal接口返回值

10. getActiveVersion: 查询节点的链生效版本

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2103)|Y|

返参：

版本号的json字符串，如{65536}，表示版本是：1.0.0。
解析时，需要把ver转成4个字节。主版本：第二个字节；小版本：第三个字节，patch版本，第四个字节。



11. getGovernParamValue: 查询当前块高的治理参数值

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2104)|Y|
|module|string|参数模块|Y|
|name|string|参数名称|Y|


返参：

参数值的json字符串，如{"32"}。返回的都是字符串，客户端自行转成目标类型。


12. getAccuVerifiersCount: 查询提案的累积可投票人数

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2105)|Y|
|proposalID|common.Hash(32bytes)|提案ID|Y|
|blockHash|common.Hash(32bytes)|块hash|Y|

返参：
是个[]uint16数组

|名称|类型|说明|
|---|---|---|
||uint16|累积可投票人数|
||uint16|赞成票数|
||uint16|反对票数|
||uint16|弃权票数|



13. listGovernParam: 查询治理参数列表

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(2106)|Y|
|module|string|参数模块。如果输入空串""，表示查询所有治理参数|Y|


返参：

是个[]GovernParam数组

|名称|类型|说明|
|---|---|---|
|ParamItem|ParamItem|参数项|
|ParamValue|ParamValue|参数值|

其中：

ParamItem

|名称|类型|说明|
|---|---|---|
|Module|string|参数模块|
|Name|strig|参数名称|
|Desc|string|参数说明|

ParamValue

|名称|类型|说明|
|---|---|---|
|StaleValue|string|旧参数值|
|Value|string|参数值|
|ActiveBlock|uint64|块高。(>=ActiveBLock，将取Value;否则取StaleValue)|


#### 下面是治理相关的类型的定义说明

##### ProposalType: 提案类型定义

|类型|定义|说明|
|---|---|---|
|TextProposal|0x01|文本提案|
|VersionProposal|0x02|升级提案|
|ParamProposal|0x03|参数提案|
|CancelProposal|0x04|取消提案|

##### ProposalStatus: 提案状态定义

对文本提案来说，有：0x01,0x02,0x03三种状态；
对升级提案来说，有：0x01,0x03,0x04,0x05,0x06五种状态。
对参数提案来说，有：0x01,0x02,0x03，0x6四种状态；
对取消提案来说，有：0x01,0x02,0x03三种状态；


|类型|定义|说明|
|---|---|---|
|Voting|0x01|投票中|
|Pass|0x02|投票通过|
|Failed|0x03|投票失败|
|PreActive|0x04|（升级提案）预生效|
|Active|0x05|（升级提案）生效|
|Canceled|0x06|被取消|



### 举报惩罚接口

**以下 slashing相关接口的合约地址为:**   
主网:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyva9ztf  
EIP55地址:0x1000000000000000000000000000000000000004  

1. ReportDuplicateSign: 举报双签

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(3000)|Y|
|typ|uint8| 代表双签类型，1：prepareBlock，2：prepareVote，3：viewChange |Y|
|data|string|单个证据的json值，格式参照[RPC接口Evidences](#evidences_interface) |Y|

2. CheckDuplicateSign: 查询节点是否已被举报过多签

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
|funcType|uint16(2bytes)|代表方法类型码(3001)|Y|
|typ|uint32| 代表双签类型，1：prepareBlock，2：prepareVote，3：viewChange|Y|
|nodeId|64bytes|举报的节点Id|Y|
|blockNumber|uint64|多签的块高|Y|

回参：

|类型|描述|是否可能为空|
|---|---|---|
|string|举报的交易Hash|Y, 可能为零交易Hash，即: 0x000...000|


3. ZeroProduceNodeList: 查询零出块的节点列表

入参：

| 参数     | 类型           | 说明                 | 是否必须 |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | 代表方法类型码(3002) | Y        |

回参：

| 类型         | 描述                         | 是否可能为空 |
| ------------ | ---------------------------- | ------------ |
| List(NodeId) | 零出块的节点列表，nodeId列表 | Y            |



### 锁仓接口

**以下 锁仓相关接口的合约地址为:**   
主网:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp7pn3ep  
EIP55地址:0x1000000000000000000000000000000000000001  

1. CreateRestrictingPlan: 创建锁仓计划

入参：

|参数|类型|说明|是否必须|
|---|---|---|---|
| funcType | uint16(2bytes) | 代表方法类型码(4000) | Y        |
| account |20bytes|`锁仓释放到账账户`|Y|
| plan |[]RestrictingPlan|plan 为 RestrictingPlan 类型的列表（数组），RestrictingPlan 定义如下：type RestrictingPlan struct {   Epoch uint64  Amount：big.Int}其中，Epoch：表示结算周期的倍数,需大于0，Epoch为1表示在交易所在结算周期释放锁仓。与每个结算周期出块数的乘积表示在目标区块高度上释放锁定的资金。Epoch  每周期的区块数至少要大于最高不可逆区块高度。Amount：表示目标区块上待释放的金额。|Y|

2. GetRestrictingInfo: 获取锁仓信息。

注：本接口支持获取历史数据，请求时可附带块高，默认情况下查询最新块的数据。

入参：


|参数|类型|说明|是否必须|
|---|---|---|---|
| funcType | uint16(2bytes) | 代表方法类型码(4100) | Y        |
|account|20bytes|`锁仓释放到账账户`|Y|

返参：

返回参数为下面字段的 json 格式字符串

|名称|类型|说明|是否可能为空|
|---|--- |--- | --- |
|balance|string(0x十六进制字符串)|总锁仓余额-已释放金额|N|
|pledge|string(0x十六进制字符串)|质押/抵押金额|Y, 默认为 0|
|debt|string(0x十六进制字符串)|欠释放金额|Y, 默认为 0|
|plans|bytes|锁仓分录信息，json数组：[{"blockNumber":"","amount":""},...,{"blockNumber":"","amount":""}]。其中：blockNumber：big.Int，释放区块高度amount：\string(0x十六进制字符串)，释放金额|N|

### 奖励接口

**以下 委托奖励相关接口的合约地址为:** 

主网:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxlcypcy  
EIP55地址:0x1000000000000000000000000000000000000006  


1. withdrawDelegateReward: 提取账户当前所有的可提取的委托奖励

入参：


| 参数     | 类型           | 说明                 | 是否必须 |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | 代表方法类型码(5000) | Y        |

返参：

注:交易结果存储在交易回执的logs.data中，如交易成功，存储 rlp.Encode([][]byte{[]byte(状态码0)， rlp.Encode(`节点收益列表`) })，如交易不成功，与之前方式一致。

`节点收益列表`为数组，按未领取的周期数逆序领取，最多一次性领取20个节点。


|参数|类型|说明|是否可为空(零值)|
|---|---|---|---|
|NodeID|discover.NodeID(64bytes)|节点ID|N|
|StakingNum|uint64|节点的质押块高|N|
|Reward|*big.Int|领取到的收益|N|

2. getDelegateReward: 查询账户在各节点未提取委托奖励。



入参：


|参数|类型|说明|是否必须|
|---|---|---|---|
| funcType | uint16(2bytes) | 代表方法类型码(5100) | Y        |
|address|20bytes|`要查询账户的地址`|Y|
|nodeIDs|[]discover.NodeID|`要查询的节点，如果为空则查询账户委托的所有节点`（当返回所有节点时将会进行排序，按DelegateEpoch升序，相同时按快排结果排列）|N|

返参：

是个[]Reward数组

|名称|类型|说明|
|---|--- |--- |
|nodeID|discover.NodeID(64bytes)|节点ID|
|stakingNum|uint64|节点的质押块高|N|
|reward|string(0x十六进制字符串)|未领取的委托收益|



### PPOS RPC 接口说明

### 查询双出、双签证据接口
<a name="evidences_interface"></a>

- 方法名称：platon_evidences
- 入参：无
- 出参：

|参数|类型|描述|
|---|---|---|
|jsonrpc|string|rpc版本号|
|id|int|id序号|
|result|string|证据字符串|
result为证据字符串，包含3种证据类型，分别是：duplicatePrepare、duplicateVote、duplicateViewchange
每种类型包含多个证据，所以是数组结构，解析时需注意


**duplicatePrepare**

|  字段名 |   |   |  类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  prepareA | epoch  |   | uint64  | 共识轮epoch值 |
|   |  viewNumber |   | uint64  | 共识轮view值 |
|   |  blockHash |   |  string | 区块hash |
|   |  blockNumber |   | uint64  | 区块number |
|   |  blockIndex |   | uint32  | 区块在一轮view中的索引值 |
|   |  blockData |   | string  | 区块rlp编码值 |
|   |  validateNode |  index |  uint32 | 验证人在一轮epoch中的索引值 |
|   |   |  nodeId |  string | 验证人nodeID |
|   |   |  blsPubKey | object  | 验证人bls公钥 |
|   | signature |   | byte[]  | 消息签名 |
|  prepareB | epoch  |   | uint64  | 共识轮epoch值 |
|   |  viewNumber |   | uint64  | 共识轮view值 |
|   |  blockHash |   |  string | 区块hash |
|   |  blockNumber |   | uint64  | 区块number |
|   |  blockIndex |   | uint32  | 区块在一轮view中的索引值 |
|   |  blockData |   | string  | 区块rlp编码值 |
|   |  validateNode |  index |  uint32 | 验证人在一轮epoch中的索引值 |
|   |   |  nodeId |  string | 验证人nodeID |
|   |   |  blsPubKey | object  | 验证人bls公钥 |
|   | signature |   | byte[]  | 消息签名 |


**duplicateVote**


|  字段名 |   |   |  类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  voteA | epoch  |   | uint64  | 共识轮epoch值 |
|   |  viewNumber |   | uint64  | 共识轮view值 |
|   |  blockHash |   |  string | 区块hash |
|   |  blockNumber |   | uint64  | 区块number |
|   |  blockIndex |   | uint32  | 区块在一轮view中的索引值 |
|   |  validateNode |  index |  uint32 | 验证人在一轮epoch中的索引值 |
|   |   |  nodeId |  string | 验证人nodeID |
|   |   |  blsPubKey | object  | 验证人bls公钥 |
|   | signature |   | byte[]  | 消息签名 |
|  voteB | epoch  |   | uint64  | 共识轮epoch值 |
|   |  viewNumber |   | uint64  | 共识轮view值 |
|   |  blockHash |   |  string | 区块hash |
|   |  blockNumber |   | uint64  | 区块number |
|   |  blockIndex |   | uint32  | 区块在一轮view中的索引值 |
|   |  validateNode |  index |  uint32 | 验证人在一轮epoch中的索引值 |
|   |   |  nodeId |  string | 验证人nodeID |
|   |   |  blsPubKey | object  | 验证人bls公钥 |
|   | signature |   | byte[]  | 消息签名 |


**duplicateViewchange**


|  字段名 |   |   |  类型 | 说明 |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  viewA | epoch  |   | uint64  | 共识轮epoch值 |
|   |  viewNumber |   | uint64  | 共识轮view值 |
|   |  blockHash |   |  string | 区块hash |
|   |  blockNumber |   | uint64  | 区块number |
|   |  validateNode |  index |  uint32 | 验证人在一轮epoch中的索引值 |
|   |   |  nodeId |  string | 验证人nodeID |
|   |   |  blsPubKey | object  | 验证人bls公钥 |
|   |  blockEpoch |   | uint32  | 区块产生的epoch值 |
|   |  blockView |   | uint32  | 区块产生的view值 |
|   |  signature |   | byte[]  | 消息签名 |
|  viewB | epoch  |   | uint64  | 共识轮epoch值 |
|   |  viewNumber |   | uint64  | 共识轮view值 |
|   |  blockHash |   |  string | 区块hash |
|   |  blockNumber |   | uint64  | 区块number |
|   |  validateNode |  index |  uint32 | 验证人在一轮epoch中的索引值 |
|   |   |  nodeId |  string | 验证人nodeID |
|   |   |  blsPubKey | object  | 验证人bls公钥 |
|   |  blockEpoch |   | uint32  | 区块产生的epoch值 |
|   |  blockView |   | uint32  | 区块产生的view值 |
|   |  signature |   | byte[]  | 消息签名 |

### 查询区块聚合签名接口
- 方法名称：platon_getPrepareQC
- 入参：blockNumber （必须）
- 出参：

|参数|类型|描述|
|---|---|---|
|jsonrpc|string|rpc版本号|
|id|int|id序号|
|result|string|聚合签名结构体|

**QuorumCert**

|  字段名 | 类型 | 说明 |
| ------------ | ------------ | ------------ |
| epoch | uint64 | 共识轮epoch值 |
| viewNumber | uint64 | 共识轮view值 |
| blockHash | string | 区块hash |
| blockNumber | uint64 | 区块number |
| blockIndex | uint32 | 区块在一轮view中的索引值 |
| signature | string | 聚合签名字符串 |
| validatorSet | string | 验证人索引集合 |


### 查询代码版本以及签名
- 方法名称：admin_getProgramVersion
- 入参：无
- 出参：

|参数|类型|描述|是否可能为空|
|---|---|---|---|
|jsonrpc|string|rpc版本号|N|
|id|int|id序号|N|
|result|string|字符串|N|

result为JSON字符串，包含Version和Sign两个字段


### 查询bls证明
- 方法名称：admin_getSchnorrNIZKProve
- 入参：无
- 出参：

|参数|类型|描述|是否可能为空|
|---|---|---|---|
|jsonrpc|string|rpc版本号|N|
|id|int|id序号|N|
|result|string|bls证明|N|

### 打开数据库垃圾回收
- 方法名称: debug_disableDBGC
- 入参: 无
- 出参: 无

### 关闭数据库垃圾回收
- 方法名称: debug_enableDBGC
- 入参: 无
- 出参: 无
