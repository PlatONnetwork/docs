---
id: PlatON_system_contract_api
title: System contract api
sidebar_label: System contract api
---


### PlatON System Contract Api

#### json-RPC

For system contract interfaces involving data modifications, use the way to create a transaction on the chain (Platon_SendTransaction), the call parameters are as follows:

| **Field name**  | **length**  |  **describe**  |
| ------------ | ------------ | ------------ |
| from | 20bytes | Send a transaction account |
| nonce | 8bytes | The first few transactions sent by the current account |
| gasPrice | 32bytes | Current transaction GAS price |
| gas | 8bytes | The largest GAS that currently transaction allows consumption |
| to | 20bytes | System contract address |
| data | bytes | The command code and parameters of the contract interface, the coding rules are seen |


We extend the DATA field, and the contract interface needs to be called and the parameter encoding is filled out here. Coding rules, after encoding the command code of the interface, order, order in the array, and then perform RLP encoding for arrays.

```
 Such as enhanced quality
  rlp([rlp(1002), rlp('')....])
```

Complete example:
```
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_sendTransaction","params":[
  {
  "from": "lat1nwc2am8ple8rpuqx3rsv6txljkuetsm6890u6d",
  "to": "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzlh5ge3",
  "gas": "0x76c0", // 30400
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xf856838203eab842b840acae6c5bd52f6807d67da902164c6d6e3e9b8f84a06b04500961d211d3793cabbf54b25a652463967fcccde1b615680edd21321736df34b29000a39f44f78b3081808b8a01e7e4171bf4d3a00000"
}
],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}

```


Conversely, use the Platon_Call mode to call, the call parameters are as follows:

| **Field name**  | **length**  |  **describe**  |
| ------------ | ------------ | ------------ |
| from | 20bytes | Send a transaction account |
| to | 20bytes | System contract address |
| data | bytes | The command code and parameters of the contract interface, the coding rules are seen |

We extend the DATA field, and the contract interface needs to be called and the parameter encoding is filled out here. Coding rules, after encoding the command code of the interface, order, order in the array, and then perform RLP encoding for arrays.
```
  Such as query pledge operation 
  rlp([rlp(1105), rlp('')....])
```

The return value is as follows:

|name|type|describe|
|---|---|---|
|Code|uint32| Indicates the error code returned by the PPOS built-in contract|
|Ret|interface{}| (Universal Type) When the code is: 0, return JSON's query result (list or individual object), see the following query related interface return value; when the code is non-0, return error prompt information string |

```
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_call","params":[
{
  "from": "lat1nwc2am8ple8rpuqx3rsv6txljkuetsm6890u6d",
  "to": "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzlh5ge3",
  "data": "0xf856838203eab842b840acae6c5bd52f6807d67da902164c6d6e3e9b8f84a06b04500961d211d3793cabbf54b25a652463967fcccde1b615680edd21321736df34b29000a39f44f78b3081808b8a01e7e4171bf4d3a00000"
}
],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
      "Code":0,
      "Ret":{}
  }
}
```

#### SOLIDITY contract call


### staking Contract interface parameter description

**The contract address of the following stakeing related interface is:**   
Main network:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzsjx8h7  
EIP55 address:0x1000000000000000000000000000000000000002  

1. createStaking: Pledge

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1000)|Y|
|typ|uint16(2bytes)|Indicates the use of the free amount of the account or the list of locks, 0: Free amount; 1: Locking amount; 2: Priority to use the latch balance, the latch balance is insufficient, the remaining part is used for free amount|Y|
|benefitAddress|20bytes|Revenue account for accepting block rewards and pledge rewards | Y, client can transmit: '0x00000 ... 000' (zero account address, zero address representative is considered to lose the benefit von)|
|nodeId|64bytes|The pledged node ID (also called the node ID of the candidate)|Y|
|externalId|string|External ID (have longitudinally limited, ID) | Y, client can be default: '' (empty string)|
|nodeName|string|The name of the pledge node (with long limit, indicating the name of the node) | Y, the client can default: '' (empty string)|
|website|string|A third-party home page (long limit, indicating the home page of the node) | Y, the client can default: '' (empty string)|
|details|string|The description of the node (has a length limit, indicating the description of the node) | Y, the client can default: '' (empty string)|
|amount|*big.Int(bytes)|Pledgeful Von|Y|
|rewardPer|uint16(2bytes)|The proportion of rewards obtained, BasePoint 1BP = 0.01%|Y|
|programVersion|uint32|Program real version, governance RPC|Y|
|programVersionSign|65bytes|Program real version signature, governance RPC get|Y|
|blsPubKey|96bytes|BLS public key|Y|
|blsProof|64bytes|Proof of BLS, acquired by pulling a certificate interface|Y|

2. editCandidate: Modify the pledge information

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1001)|Y|
|benefitAddress|20bytes|Revenue account for accepting block rewards and pledge rewards | N, Default: NIL (0x00 ... zero account address, zero address representative is considered to drop the benefits von)|
|nodeId|64bytes|The pledged node ID (also called the node ID of the candidate)|Y|
|rewardPer|uint16(2bytes)|The proportion of the rewards obtained, using BasePoint 1BP = 0.01%, Example: Biography 500 is 5% of the rewards as a delegate reward | N, default: nil (empty Byte)|
|externalId|string|External ID (have a length limit, giving the third party pull the ID) | N, the default value: nil (empty Byte)|
|nodeName|string|The name of the decociated node (has a length limit, indicating the name of the node) | n, default: nil (empty Byte)|
|website|string|A third-party home page of the node (length limit, indicating the home page of the node) | n, default: nil (empty Byte)|
|details|string|Description of the node (have a length limit, indicating the description of the node) | N, the default value: nil (empty Byte)|

3. increaseStaking: Increasing pledge

| parameter | type | describe | must| |
| --- | --- | --- | --- |
| funcType | uint16(2bytes) | Representing method type code(1002) | Y |
| nodeId | 64bytes |The pledged node ID (also called the node ID of the candidate) | Y |
| typ | uint16(2bytes) | Indicates the use of account free amount or the latch amount of the account, 0: Free amount; 1: Locking amount | Y |
| amount | *big.Int(bytes) | Increasing Von | Y |


4. withdrewStaking: Undo pledge (all revocation, multiple arrivals)

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1003)|Y|
|nodeId|64bytes|NodeID of the pledged node|Y|

5. delegate: Initiate

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1004)|Y|
|typ|uint16(2bytes)|Indicates the latch amount of the account free amount or the account of the account, 0: Free amount; 1: Locking amount|Y|
|nodeId|64bytes|NodeID of the pledged node|Y|
|amount|*big.Int(bytes)|The amount delegated (calculated according to the minimum unit, 1 lat = 10 ** 18 von)|Y|

6. withdrewDelegation: Reduce / revocation (all reduction is revoked)



|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1005)|Y|
|stakingBlockNum|uint64(8bytes)|A unique identity representing a certain pledge of a node|Y|
|nodeId|64bytes|NodeID of the pledged node|Y|
|amount|*big.Int(bytes)|The amount of entrusted entrusted (according to the minimum unit, 1 lat = 10 ** 18 von)|Y|

return value:

Note: The trading result is stored in the log.Data of the transaction receipt, if it is redeemed all delegate, store rlp.encode ([] [] byte {[] byte (status 0), RLP.Encode (entrusted)} ), Otherwise the same as before

| parameter           | type     | describe       | must| |
| -------------- | -------- | ---------- | -------- |
| delegateIncome | *big.int | Entrusted income | N        |


7. getVerifierList: Query the verification person queue of the current settlement cycle



parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1100)|Y|


return value: array

|name|type|describe|Is it empty (zero)|
|---|---|---|---|
|NodeId|64bytes|The pledged node ID (also called the node ID of the candidate)|N|
|StakingAddress|20bytes|The account used when launching pledge (subsequent operation pledge information can only use this account, withdraw the pledge, VON will be returned to the account or the lock information of the account)|N|
|BenefitAddress|20bytes|Revenue account for accepting block rewards and pledge rewards|Y, Zero account address|
|RewardPer|uint16(2bytes)|The current settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|NextRewardPer|uint16(2bytes)|The next settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|StakingTxIndex|uint32(4bytes)|Transaction index when launching pledge|N|
|ProgramVersion|uint32|The real version number of the PLATON process of the pledge node (get the version number of the interface is provided by governance)|N|
|StakingBlockNum|uint64(8bytes)|Block height when launching pledge|N|
|Shares|*big.Int(bytes)|Current candidate's total pledge plus VON number|N|
|ExternalId|string|External ID (have long limit, give the third party pull the ID)|Y, default is empty string|
|NodeName|string|The name of the pledge node (with long limit, indicating the name of the node)|Y, default is empty string|
|Website|string|A third-party home page (long limit, indicating the home page of the node)|Y, default is empty string|
|Details|string|Description of the node (have a length limit, indicating the description of the node)|Y, default is empty string|
|ValidatorTerm|uint32(4bytes)|The verification person's term (101 verifier snapshots in the settlement cycle is always 0, only if the verification person of the consensus wheel will be worthless, it is also 0, it is also 0, continue to stay, +1)|Y, default is 0|
|DelegateTotal|*big.Int(bytes)|The total commission of the current candidate takes effect|Y|
|DelegateRewardTotal|*big.Int(bytes)|Total entrustment reward for candidates|Y|

8. getValidatorList: Query the list of verifiers for the current consensus cycle



parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1101)|Y|

return value: array

|name|type|describe|Is it empty (zero)|
|---|---|---|---|
|NodeId|64bytes|The pledged node ID (also called the node ID of the candidate)|N|
|StakingAddress|20bytes|The account used when launching pledge (subsequent operation pledge information can only use this account, withdraw the pledge, VON will be returned to the account or the lock information of the account)|N|
|BenefitAddress|20bytes|Revenue account for accepting block rewards and pledge rewards|Y, the default is the zero account address|
|RewardPer|uint16(2bytes)|The current settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|NextRewardPer|uint16(2bytes)|The next settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|StakingTxIndex|uint32(4bytes)|Transaction index when launching pledge|N|
|ProgramVersion|uint32(4bytes)|The real version number of the PLATON process of the pledge node (get the version number of the interface is provided by governance)|N|
|StakingBlockNum|uint64(8bytes)|Block height when launching pledge|N|
|Shares|*big.Int(bytes)|Current candidate's total pledge plus VON number|N|
|ExternalId|string|External ID (have long limit, give the third party pull the ID)|Y, Default is empty string|
|NodeName|string|The name of the pledge node (with long limit, indicating the name of the node)|Y, default is empty string|
|Website|string|A third-party home page (long limit, indicating the home page of the node)|Y, default is empty string|
|Details|string|Description of the node (have a length limit, indicating the description of the node)|Y, default is empty string|
|ValidatorTerm|uint32(4bytes)|The verification person's term (101 verifier snapshots in the settlement cycle is always 0, only if the verification person of the consensus wheel will be worthless, it is also 0, it is also 0, continue to stay, +1)|N|
|DelegateTotal|*big.Int(bytes)|The total commission of the current candidate takes effect|Y|
|DelegateRewardTotal|*big.Int(bytes)|Total entrustment reward for candidates|Y|

9. getCandidateList: Query all real-time candidates list

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1102)|Y|

return value: array

|name|type|describe|is nil|
|---|---|---|---|
|NodeId|64bytes|The pledged node ID (also called the node ID of the candidate)|N|
|StakingAddress|20bytes|The account used when launching pledge (subsequent operation pledge information can only use this account, withdraw the pledge, VON will be returned to the account or the lock information of the account)|N|
|BenefitAddress|20bytes|Revenue account for accepting block rewards and pledge rewards|Y, the default is the zero account address|
|RewardPer|uint16(2bytes)|The current settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|NextRewardPer|uint16(2bytes)|The next settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|StakingTxIndex|uint32(4bytes)|Transaction index when launching pledge|N|
|ProgramVersion|uint32(4bytes)|The real version number of the PLATON process of the pledge node (get the version number of the interface is provided by governance)|N|
|Status|uint32(4bytes)|The status of the candidate (status is placed according to the 32bit of UINT 32, can be present at the same time, the value is a plurality of simultaneous state values plus [0: node available (32 Bit all 0); 1: Node Not available (only the last bit is 1); 2: Node zero blocks need to be locked but do not need to be released (only the second bit of 1); 4: Node's VON is less than the lowest quality (only the number of countdown, third bit is 1 ); 8: Node is reported to be double-signed (only the countdown fourth bit is 1)); 16: Node zero block requires locking and unlocking the pledge (the fifth bit of the countdown is 1); 32: Node initiative to revoke (only countdown The sixth bit bit is 1)]|N|
|StakingEpoch|uint32(4bytes)|Current change cycle when the pledge amount is changed|N|
|StakingBlockNum|uint64(8bytes)|Block height when launching pledge|N|
|Shares|string(0x hexadecimal string)|Current candidate's total pledge plus VON number|N|
|Released|string(0x hexadecimal string)|Local pledge of the free amount of the pledged account|Y,Default is 0|
|ReleasedHes|string(0x hexadecimal string)|The free amount of the percentage of the pledged account|Y,Default is 0|
|RestrictingPlan|string(0x hexadecimal string)|Locking amount of latch lottery launches pledge|Y,Default is 0|
|RestrictingPlanHes|string(0x hexadecimal string)|Locking amount launched a pledge account,Herdity pledged Von|Y,Default is 0|
|ExternalId|string|External ID (have long limit, give the third party pull the ID)|Y, Default is empty string|
|NodeName|string|The name of the pledge node (with long limit, indicating the name of the node)|Y, Default is empty string|
|Website|string|A third-party home page (long limit, indicating the home page of the node)|Y, Default is empty string|
|Details|string|Description of the node (have a length limit, indicating the description of the node)|Y, Default is empty string|
|DelegateEpoch|uint32(4bytes)|Number of settlement cycles for the last entrusted|Y|
|DelegateTotal|string(0x hexadecimal string)|Number of nodes is entrusted|Y|
|DelegateTotalHes|string(0x hexadecimal string)|The total quantity of the node is entrusted|Y|
|DelegateRewardTotal|*big.Int(bytes)|Total entrustment reward for candidates|Y|

10. getRelatedListByDelAddr: Query the NodeID and Pledge ID of the node delegated by the current account address



parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(1103)|Y|
|addr|common.address(20bytes)|Principal account address|Y|

return value: array

|name|type|describe|Is it empty (zero)|
|---|---|---|---|
|Addr|20bytes|Principal account address|N|
|NodeId|64bytes|Verifiable person's node ID|N|
|StakingBlockNum|uint64(8bytes)|Block height when launching pledge|N|

11. getDelegateInfo: Query the principal information of the current single node

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16|Representing method type code(1104)|Y|
|stakingBlockNum|uint64(8bytes)|Block height when launching pledge|Y|
|delAddr|20bytes|Principal account address|Y|
|nodeId|64bytes|Verifiable person's node ID|Y|

return value:

|name|type|describe|is nil|
|---|---|---|---|
|Addr|20bytes|Principal account address|N|
|NodeId|64bytes|Verifiable person's node ID|N|
|StakingBlockNum|uint64(8bytes)|Block height when launching pledge|N|
|DelegateEpoch|uint32(4bytes)|The last time the settlement cycle of the candidate initiated|N|
|Released|string(0x hexadecimal string)|Locked the latch of the secreted amount of the confused|Y,Default is 0|
|ReleasedHes|string(0x hexadecimal string)|Voncounted Von, a free amount that launches a delegate account|Y,Default is 0|
|RestrictingPlan|string(0x hexadecimal string)|Locking amount of lock bin in the entrustment account|Y,Default is 0|
|RestrictingPlanHes|string(0x hexadecimal string)|Temperators to launch the latch of the entrustment account|Y,Default is 0|
|CumulativeIncome|string(0x hexadecimal string)|Entrusted income to be taken|Y,Default is 0|

12. getCandidateInfo: Query the pledge information of the current node

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16|Representing method type code(1105)|Y|
|nodeId|64bytes|Verifiable person's node ID|Y|

return value: List

|name|type|describe|Is it empty (zero)|
|---|---|---|---|
|NodeId|64bytes|The pledged node ID (also called the node ID of the candidate)|N|
|StakingAddress|20bytes|The account used when launching pledge (subsequent operation pledge information can only use this account, withdraw the pledge, VON will be returned to the account or the lock information of the account)|N|
|BenefitAddress|20bytes|Revenue account for accepting block rewards and pledge rewards|Y,By default is the zero account address|
|RewardPer|uint16(2bytes)|The current settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|NextRewardPer|uint16(2bytes)|The next settlement cycle reward is divided into proportion, using BasePoint 1BP = 0.01%|Y|
|StakingTxIndex|uint32(4bytes)|Transaction index when launching pledge|N|
|ProgramVersion|uint32(4bytes)|The real version number of the PLATON process of the pledge node (get the version number of the interface is provided by governance)|N|
|Status|uint32(4bytes)|The status of the candidate (status is placed according to the 32bit of UINT 32, can be present at the same time, the value is a plurality of simultaneous state values plus [0: node available (32 Bit all 0); 1: Node Not available (only the last bit is 1); 2: Node zero blocks need to be locked but do not need to be released (only the second bit of 1); 4: Node's VON is less than the lowest quality (only the number of countdown, third bit is 1 ); 8: Node is reported to be double-signed (only the countdown fourth bit is 1)); 16: Node zero block requires locking and unlocking the pledge (the fifth bit of the countdown is 1); 32: Node initiative to revoke (only countdown The sixth bit bit is 1)]|N|
|StakingEpoch|uint32(4bytes)|Current change cycle when the pledge amount is changed|N|
|StakingBlockNum|uint64(8bytes)|Block height when launching pledge|N|
|Shares|string(0x hexadecimal string)|Current candidate's total pledge plus VON number|Y,Default is 0|
|Released|string(0x hexadecimal string)|Local pledge of the free amount of the pledged account|Y,Default is 0|
|ReleasedHes|string(0x hexadecimal string)|The free amount of the percentage of the pledged account|Y,Default is 0|
|RestrictingPlan|string(0x hexadecimal string)|Locking amount of latch lottery launches pledge|Y,Default is 0|
|RestrictingPlanHes|string(0x hexadecimal string)|Locking amount launched a pledge account,Herdity pledged Von|Y,Default is 0|
|ExternalId|string|External ID (have long limit, give the third party pull the ID)|Y, Default is empty string|
|NodeName|string|The name of the pledge node (with long limit, indicating the name of the node)|Y, Default is empty string|
|Website|string|A third-party home page (long limit, indicating the home page of the node)|Y, Default is empty string|
|Details|string|Description of the node (have a length limit, indicating the description of the node)|Y, Default is empty string|
|DelegateEpoch|uint32(4bytes)|The settlement cycle of the last commissioned settlement|Y,Default is 0|
|DelegateTotal|string(0x hexadecimal string)|Number of nodes is entrusted|Y,Default is 0|
|DelegateTotalHes|string(0x hexadecimal string)|The total number of unnifunctioned nodes is commissioned|Y,Default is 0|
|DelegateRewardTotal|*big.Int(bytes)|Total entrustment reward for candidates|Y|

13. getPackageReward: Query the block reward of the current settlement cycle


parameter：

| parameter     | type           | describe                 | must| |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | Representing method type code(1200) | Y        |

return value:

| type                     | describe     | Is it empty (zero) |
| ------------------------ | -------- | ---------------- |
| string(0x hexadecimal string) | Block reward | N                |

14. getStakingReward: Query the current settlement cycle pledge reward

parameter：

| parameter     | type           | describe                 | must| |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | Representing method type code(1201) | Y        |

return value:

| type                     | describe     | Is it empty (zero) |
| ------------------------ | -------- | ---------------- |
| string(0x hexadecimal string) | Pledge reward | N                |

15. getAvgPackTime: Query the average time of package blocking blocks

parameter：

| parameter     | type           | describe                 | must| |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | Representing method type code(1202) | Y        |

return value:

| type   | describe                             | Is it empty (zero) |
| ------ | -------------------------------- | ---------------- |
| uint64 | The average time (unit of millisecond) package block (unit of millisecond) package block | N                |



### Governance contract interface parameter description

**The contract address of the following governance related interface is:**  
Main network:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm  
EIP55 address:0x1000000000000000000000000000000000000005  

1. submitText: Submit a text proposal

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2000)|Y|
|verifier|discover.NodeID(64bytes)|Submit the verifier|Y|
|pIDID|string(uint64)|PIPID|Y|

2. submitVersion: Submit an upgrade proposal

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2001)|Y|
|verifier|discover.NodeID(64bytes)|Submit the verifier|Y|
|pIDID|string(uint64)|PIPID|Y|
|newVersion|uint32(4bytes)|updated version|Y|
|endVotingRounds|uint64|Voting consensus wheel number. Description: Suppose submitted transactions 20 blocks high in advance, 250, 20 are configurable),Where 0 < endvotingrounds <= 4840 (approximately 2 weeks, the actual discussion can be calculated according to the configuration), and is an integer）|Y|

3. submitParam: Submit parameter proposal

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2002)|Y|
|verifier|discover.NodeID(64bytes)|Alternative to submit proposals|Y|
|pIDID|string(uint64)|PIPID|Y|
|module|string|Parameter module|Y|
|name|string|parameter name|Y|
|newValue|string|New value of parameters|Y|


4. submitCancel: Submit cancellation proposal

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2005)|Y|
|verifier|discover.NodeID(64bytes)|Submit the verifier|Y|
|pIDID|string(uint64)|PIPID|Y|
|endVotingRounds|uint64|Voting consensus wheel number. Refer to the instructions for submitting the upgrade proposal, at the same time, the value of this parameter in this interface cannot be greater than the value in the corresponding upgrade proposal.|Y|
|tobeCanceledProposalID|common.hash(32bytes)|Upgrade proposal ID to be canceled|Y|


5. vote: Vote for proposals

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2003)|Y|
|verifier|discover.NodeID(64bytes)|Victor|Y|
|proposalID|common.Hash(32bytes)|Proposal ID|Y|
|option|uint8(1byte)    0x01: Support 0x02: Objecting Other values: abstain        |Voting options|Y|
|programVersion|uint32(4bytes)|Node code version, GetProgramVersion interface with RPC|Y|
|versionSign|common.VesionSign(65bytes)|Code version signature, GetProgramVersion interface with RPC|Y|

6. declareVersion: Version statement

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2004)|Y|
|verifier|discover.NodeID(64bytes)|The node that is declared can only be a verification person / candidate.|Y|
|programVersion|uint32(4bytes)|Declare version, GetProgramVersion interface with RPC|Y|
|versionSign|common.VesionSign(65bytes)|Declare version signature, GetProgramVersion interface with RPC|Y|


7. getProposal: Query proposal

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|2100|Y|
|proposalID|common.Hash(32bytes)|Proposal ID|Y|

Returns one of the following four types:

##### TextProposal：Text proposal

- Field description：

|Field|type|describe|
|---|---|---|
|ProposalID|common.Hash(32bytes)|Proposal ID|
|Proposer|common.NodeID(64bytes)|Proposal node ID|
|ProposalType|byte|Proposal type, 0x01: text proposal; 0x02: upgrade proposal; 0x03 parameter proposal; 0x04 cancel proposal.|
|PIPID|string|Proposal PIPID|
|SubmitBlock|8bytes|Submit the proposal|
|EndVotingBlock|8bytes|The block is high, the system is high, and the system is based on Submitblock.|


##### VersionProposal：Upgrade proposal

- Field description：

|Field|type|describe|
|---|---|---|
|ProposalID|common.Hash(32bytes)|Proposal ID|
|Proposer|common.NodeID(64bytes)|Proposal node ID|
|ProposalType|byte|Proposal type, 0x01: text proposal; 0x02: upgrade proposal; 0x03 parameter proposal; 0x04 cancel proposal.|
|PIPID|string|Proposal PIPID|
|SubmitBlock|8bytes|Submit the proposal|
|EndVotingRounds|8bytes|Voting sustainable consensus period quantity|
|EndVotingBlock|8bytes|The block is high, the system is high, and the system is calculated according to Submitblock, EndvotingRounds.|
|ActiveBlock|8bytes|The proposal is high, and the system is calculated according to endvotingblock.|
|NewVersion|uint|updated version|


##### CancelProposal：Cancel proposal

- Field description：

|Field|type|describe|
|---|---|---|
|ProposalID|common.Hash(32bytes)|Proposal ID|
|Proposer|common.NodeID(64bytes)|Proposal node ID|
|ProposalType|byte|Proposal type, 0x01: text proposal; 0x02: upgrade proposal; 0x03 parameter proposal; 0x04 cancel proposal.|
|PIPID|string|Proposal PIPID|
|SubmitBlock|8bytes|Submit the proposal|
|EndVotingRounds|8bytes|Voting sustainable consensus period quantity|
|EndVotingBlock|8bytes|The block is high, the system is high, and the system is calculated according to Submitblock, EndvotingRounds.|
|TobeCanceled|common.Hash(32bytes)|Proposal to cancel the upgrade proposal ID|


##### ParamProposal：Parameter proposal

- Field description：

|Field|type|describe|
|---|---|---|
|ProposalID|common.Hash(32bytes)|Proposal ID|
|Proposer|common.NodeID(64bytes)|Proposal node ID|
|ProposalType|byte|Proposal type, 0x01: text proposal; 0x02: upgrade proposal; 0x03 parameter proposal; 0x04 cancel proposal.|
|PIPID|string|Proposal PIPID|
|SubmitBlock|8bytes|Submit the proposal|
|EndVotingBlock|8bytes|The block is high, the system is high, and the system is calculated according to Submitblock, EndvotingePochrounds.|
|Moudule|string|Parameter module name|
|Name|string|parameter name|
|NewVersion|uint|New value of parameters|


8. getTallyResult: Query proposal results

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2101)|Y|
|proposalID|common.Hash(32bytes)|Proposal ID|Y|

return value:

|Field|type|describe|
|---|---|---|
|proposalID|common.Hash(32bytes)|Proposal ID|
|yeas|uint64(8bytes)|Vote|
|nays|uint64(8bytes)|Opposition|
|abstentions|uint64(8bytes)|Abandonment|
|accuVerifiers|uint64(8bytes)|Total number of verifiers for voting qualifications throughout the voting period|
|status|byte|condition|
|canceledBy|common.Hash(32bytes)|When status = 0x06, record the Proposalid that initiates canceled|


9. listProposal: Query proposal list

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2102)|Y|

return value:

Refer to the GetProposal interface return value

10. getActiveVersion: Query node chain life effect version

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2103)|Y|

return value:

The JSON string of the version number, such as {65536}, said version is: 1.0.0.
When parsing, Ver needs to be converted to 4 bytes. Main version: Second byte; small version: third byte, Patch version, fourth byte.



11. getGovernParamValue: Query the high governance parameter value of the current block

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2104)|Y|
|module|string|Parameter module|Y|
|name|string|parameter name|Y|


return value:

The JSON string of the parameter value, such as {"32"}. Returns are all strings, and the client is turned to the target type.


12. getAccuVerifiersCount: Cumulative voter number of query proposals

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2105)|Y|
|proposalID|common.Hash(32bytes)|Proposal ID|Y|
|blockHash|common.Hash(32bytes)|Block Hash|Y|

return value:
Is a [] UINT16 array

|name|type|describe|
|---|---|---|
||uint16|Cumulative voter|
||uint16|Number of votes|
||uint16|Objection|
||uint16|Abandonment|



13. listGovernParam: Query governance parameters list

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(2106)|Y|
|module|string|Parameter module. If you enter an empty string "," indicate all governance parameters|Y|


return value:

Is a [] governparam array

|name|type|describe|
|---|---|---|
|ParamItem|ParamItem|Parameter item|
|ParamValue|ParamValue|Parameter value|

in:

ParamItem

|name|type|describe|
|---|---|---|
|Module|string|Parameter module|
|Name|strig|parameter name|
|Desc|string|Parameter Description|

ParamValue

|name|type|describe|
|---|---|---|
|StaleValue|string|Old parameter value|
|Value|string|Parameter value|
|ActiveBlock|uint64|High block. (> = ActiveBlock, will take value; otherwise STALEVALUE)|


#### The following is a definition of the type of governance

##### ProposalType: Proposal type definition

|type|value|describe|
|---|---|---|
|TextProposal|0x01|Text proposal|
|VersionProposal|0x02|Upgrade proposal|
|ParamProposal|0x03|Parameter proposal|
|CancelProposal|0x04|Cancel proposal|

##### ProposalStatus: Proposal state definition

For text proposals, there are three states: 0x01, 0x02, 0x03;
For the upgrade proposal, there are: 0x01, 0x03, 0x04, 0x05, 0x06 five states.
For parameters proposals, there are: 0x01, 0x02, 0x03, 0x6 four states;
For canceled proposals, there are: 0x01, 0x02, 0x03 three states;


|type|value|describe|
|---|---|---|
|Voting|0x01|Vote|
|Pass|0x02|Vote|
|Failed|0x03|Vote failed|
|PreActive|0x04|(Upgrade proposal) presuppose|
|Active|0x05|(Upgrade proposal) take effect|
|Canceled|0x06|got canceled|



### Report penalty contract interface parameter description

**The contract address of the following slashing related interfaces is:**   
Main network:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyva9ztf  
EIP55 address:0x1000000000000000000000000000000000000004  

1. ReportDuplicateSign: Report double sign

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(3000)|Y|
|typ|uint8| Represents double sign type,1：prepareBlock，2：prepareVote，3：viewChange |Y|
|data|string|A single evidence JSON value, format refer to evidens_interface |Y|

2. CheckDuplicateSign: Whether the query node has been reported to have been reported

parameter：

|parameter|type|describe|must|
|---|---|---|---|
|funcType|uint16(2bytes)|Representing method type code(3001)|Y|
|typ|uint32| Represents Double Sign Type, 1: Prepareblock, 2: Preparevote, 3: ViewChange|Y|
|nodeId|64bytes|Reported node ID|Y|
|blockNumber|uint64|Multi-signed block high|Y|

带来：

|type|describe|Will it be empty?|
|---|---|---|
|string|Report transaction HASH|Y, may be zero trading hash, namely: 0x000 ... 000|


3. ZeroProduceNodeList: Query the list of nodes from zero

parameter：

| parameter     | type           | illustrate                 | must| |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | Representing method type code(3002) | Y        |

带来：

| type         | describe                         | Will it be empty? |
| ------------ | ---------------------------- | ------------ |
| List(NodeId) | Zero block node list, NodeID list | Y            |



### Locking contract interface parameter description

**The contract address of the following lock-related interface is:**   
Main network:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp7pn3ep  
EIP55 address:0x1000000000000000000000000000000000000001  

1. CreateRestrictingPlan: Create a lock plan plan

parameter：

|parameter|type|describe|must|
|---|---|---|---|
| funcType | uint16(2bytes) | Representing method type code(4000) | Y        |
| account |20bytes|`Locklet release to the account account`|Y|
| plan |[] RestrictingPLAN | Plan is a list of restrictingplan types (arrays), and restrictingplan is defined as follows: Type RestrictingPlan Struct {EPOCH UINT64 AMOUCT: BIG.INT} where EPOCH: Indicates the multiple of the settlement cycle, more than 0, EPOCH is 1 represented in the transaction The settlement cycle releases the lock bin. The product of the number of pieces per settlement period is represented in the target block height to release the locked funds. The number of EPOCHs is at least greater than the highest irreversible zone height. Amount: Indicates the amount to be released to the target block. |Y|

2. GetRestrictingInfo: Get the lock information

Note: This interface supports acquisition history data, which can be attached with a high block when requested, and the data of the latest block is queried by default.

parameter：


|parameter|type|describe|must|
|---|---|---|---|
| funcType | uint16(2bytes) | Representing method type code(4100) | Y        |
|account|20bytes|`Locklet release to the account account`|Y|

return value:

Returns the parameter to the JSON format string of the following fields

|name|type|describe|Will it be empty?|
|---|--- |--- | --- |
|balance|string(0x hexadecimal string)|Total lock bin balance - released amount|N|
|pledge|string(0x hexadecimal string)|Pledge / mortgage|Y, 默认为 0|
|debt|string(0x hexadecimal string)|Deposit|Y, 默认为 0|
|plans|bytes|Lock-locking information, JSON array:[{"blockNumber":"","amount":""},...,{"blockNumber":"","amount":""}]。Among them: blocknumber: BIG.INT, release block height amount：\string(0x hexadecimal string), Release the amount|N|

### Reward contract interface parameter description

**The contract address of the reward associated interface is:** 

Main network:lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxlcypcy  
EIP55 address:0x1000000000000000000000000000000000000006  


1. withdrawDelegateReward: Extract all of the currently extracted delegation rewards

parameter：

| parameter     | type           | describe                 | must |
| -------- | -------------- | -------------------- | -------- |
| funcType | uint16(2bytes) | Representing method type code(5000) | Y        |

return value:

Note: The trading results are stored in logs.data in the transaction receipt, such as transaction success, storage rlp.encode ([] byte {[] Byte (status code 0), rlp.encode (`Node Receals list)}) If the transaction is unsuccessful, it is consistent with the previous manner.storage rlp.encode ([] byte {[] Byte (status code 0), rlp.encode (`Node Receals list)}) If the transaction is unsuccessful, it is consistent with the previous manner.

`Node Reception List` As an array, receive up to 20 nodes at a time at least one time.


|parameter|type|describe|is nil|
|---|---|---|---|
|NodeID|discover.NodeID(64bytes)|Node ID|N|
|StakingNum|uint64|The decoration block of the node is high|N|
|Reward|*big.Int|Receiving income|N|

2. getDelegateReward: The query account has not extracted a reward in each node.



parameter：


|parameter|type|describe|must|
|---|---|---|---|
| funcType | uint16(2bytes) | Representing method type code(5100) | Y        |
|address|20bytes|`To check the address of your account`|Y|
|nodeIDs|[]discover.NodeID|`To query the nodes, if you are empty, check all the nodes entrusted by your account.`(Sort by returning all nodes, press DelegateEPoch ascending, the same time is arranged in the fast row results)|N|

return value:

Is a [] Reward array

|name|type|describe|
|---|--- |--- |
|nodeID|discover.NodeID(64bytes)|Node ID|
|stakingNum|uint64|The decoration block of the node is high|N|
|reward|string(0x hexadecimal string)|Unpaged entrusted revenue|



### PPOS RPC Interface Description

### Query double out, double visa according to interface
<a name="evidences_interface"></a>

- Method name：platon_evidences
- parameter：without
- return value：

|parameter|type|describe|
|---|---|---|
|jsonrpc|string|RPC version number|
|id|int|ID serial number|
|result|string|Evidence string|
Result is evidence string, including 3 evidence types, named: DuplicatePrepare, DuPlicateViewChange 
 Each type contains multiple evidence, so it is an array structure and needs attention when parsing


**duplicatePrepare**

|  name |   |   |  type | describe |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  prepareA | epoch  |   | uint64  | Connectic wheel EPOCH value |
|   |  viewNumber |   | uint64  | Consensus wheel View value |
|   |  blockHash |   |  string | Block Hash |
|   |  blockNumber |   | uint64  | Block Number |
|   |  blockIndex |   | uint32  | Index value of blocks in a round of VIEW |
|   |  blockData |   | string  | Block RLP encoding value |
|   |  validateNode |  index |  uint32 | Verify the index value in a round of EPOCH |
|   |   |  nodeId |  string | Verifier NodeID |
|   |   |  blsPubKey | object  | Verifier BLS public key |
|   | signature |   | byte[]  | Message signature |
|  prepareB | epoch  |   | uint64  | Connectic wheel EPOCH value |
|   |  viewNumber |   | uint64  | Consensus wheel View value |
|   |  blockHash |   |  string | Block Hash |
|   |  blockNumber |   | uint64  | Block Number |
|   |  blockIndex |   | uint32  | Index value of blocks in a round of VIEW |
|   |  blockData |   | string  | Block RLP encoding value |
|   |  validateNode |  index |  uint32 | Verify the index value in a round of EPOCH |
|   |   |  nodeId |  string | Verifier NodeID |
|   |   |  blsPubKey | object  | Verifier BLS public key |
|   | signature |   | byte[]  | Message signature |


**duplicateVote**


|  name |   |   |  type | describe |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  voteA | epoch  |   | uint64  | Connectic wheel EPOCH value |
|   |  viewNumber |   | uint64  | Consensus wheel View value |
|   |  blockHash |   |  string | Block Hash |
|   |  blockNumber |   | uint64  | Block Number |
|   |  blockIndex |   | uint32  | Index value of blocks in a round of VIEW |
|   |  validateNode |  index |  uint32 | Verify the index value in a round of EPOCH |
|   |   |  nodeId |  string | Verifier NodeID |
|   |   |  blsPubKey | object  | Verifier BLS public key |
|   | signature |   | byte[]  | Message signature |
|  voteB | epoch  |   | uint64  | Connectic wheel EPOCH value |
|   |  viewNumber |   | uint64  | Consensus wheel View value |
|   |  blockHash |   |  string | Block Hash |
|   |  blockNumber |   | uint64  | Block Number |
|   |  blockIndex |   | uint32  | Index value of blocks in a round of VIEW |
|   |  validateNode |  index |  uint32 | Verify the index value in a round of EPOCH |
|   |   |  nodeId |  string | Verifier NodeID |
|   |   |  blsPubKey | object  | Verifier BLS public key |
|   | signature |   | byte[]  | Message signature |


**duplicateViewchange**


|  name |   |   |  type | describe |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  viewA | epoch  |   | uint64  | Connectic wheel EPOCH value |
|   |  viewNumber |   | uint64  | Consensus wheel View value |
|   |  blockHash |   |  string | Block Hash |
|   |  blockNumber |   | uint64  | Block Number |
|   |  validateNode |  index |  uint32 | Verify the index value in a round of EPOCH |
|   |   |  nodeId |  string | Verifier NodeID |
|   |   |  blsPubKey | object  | Verifier BLS public key |
|   |  blockEpoch |   | uint32  | EPOCH value generated by blocks |
|   |  blockView |   | uint32  | VIEW value generated by blocks |
|   |  signature |   | byte[]  | Message signature |
|  viewB | epoch  |   | uint64  | Connectic wheel EPOCH value |
|   |  viewNumber |   | uint64  | Consensus wheel View value |
|   |  blockHash |   |  string | Block Hash |
|   |  blockNumber |   | uint64  | Block Number |
|   |  validateNode |  index |  uint32 | Verify the index value in a round of EPOCH |
|   |   |  nodeId |  string | Verifier NodeID |
|   |   |  blsPubKey | object  | Verifier BLS public key |
|   |  blockEpoch |   | uint32  | EPOCH value generated by blocks |
|   |  blockView |   | uint32  | VIEW value generated by blocks |
|   |  signature |   | byte[]  | Message signature |

### Query block aggregate signature interface
- Method name：platon_getPrepareQC
- parameter：blockNumber (must)
- return value：

|parameter|type|describe|
|---|---|---|
|jsonrpc|string|RPC version number|
|id|int|ID serial number|
|result|string|Aggregate signature structure|

**QuorumCert**

|  name | type | describe |
| ------------ | ------------ | ------------ |
| epoch | uint64 | Connectic wheel EPOCH value |
| viewNumber | uint64 | Consensus wheel View value |
| blockHash | string | Block Hash |
| blockNumber | uint64 | Block Number |
| blockIndex | uint32 | Index value of blocks in a round of VIEW |
| signature | string | Aggregate signature string |
| validatorSet | string | Verifier index collection |


### Query code versions and signatures
- Method name：admin_getProgramVersion
- parameter：none
- return value：

|parameter|Types of|describe|Will it be empty?|
|---|---|---|---|
|jsonrpc|string|RPC version number|N|
|id|int|ID serial number|N|
|result|string|String|N|

Result is a JSON string, contains two fields of Version and SIGN


### Query BLS certification
- Method name：admin_getSchnorrNIZKProve
- parameter：none
- return value：none

|parameter|Types of|describe|Will it be empty?|
|---|---|---|---|
|jsonrpc|string|RPC version number|N|
|id|int|ID serial number|N|
|result|string|BLS proof|N|

### Open database garbage collection
- Method name: debug_disableDBGC
- parameter: none
- return value: none

### Turn off database garbage collection
- Method name: debug_enableDBGC
- parameter: none
- return value: none
