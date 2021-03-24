---
id: PlatON_Governance_Solution
title: PlatON Governance Solution
sidebar_label: PlatON Governance Solution
---



## Governance Overview

Blockchain governance mechanism refers to a set of decision rules and action standards for stakeholders in the blockchain ecosystem to agree on decisions. The goal is to allow the decentralized network to iteratively develop over time. In the blockchain, some important technologies, such as consensus mechanism, scalability, security, etc., can be better solved by providing reasonable incentives through the governance mechanism. A complete blockchain governance mechanism should be the combined product of blockchain technology, economics, and politics, including rights distribution, economic incentives, and technological realization. The blockchain's ecological structure consists of developers, miners, and users. Each role in governance needs to play its own value, assume corresponding responsibilities, and obtain corresponding benefits. The significance of governance is to reduce the occurrence of community fragmentation and chaos, help the community to improve the efficiency of project update and iteration, and increase the participation of community members.

## Analysis of governance status

At present, governance is divided into off-chain governance and on-chain governance from the big model. Off-chain governance is controlled by core developers. Nodes send their decision signals by installing their preferred software and give full responsibility to those who run complete nodes. It has higher flexibility, but requires higher social coordination costs and lacks reasonable Incentive mechanism restricts the entry of new developers. On-chain management has a clear set of governance processes, which are forcibly upgraded through the on-chain proposal voting mechanism and hand over decision-making power to stakeholders.

The representative public chains of off-chain governance, such as Bitcoin and Ethereum, are mainly upgraded by the core developers, and ordinary miners and user groups lack the right to choose. Therefore, participation is low and the citizen base is weak. Recognizing the shortcomings of off-chain governance, some public chains have begun to launch their own on-chain governance mechanisms to digitize community decisions and greatly reduce the coordination costs of stakeholders. The common power distribution method of on-chain governance mechanisms is often the choice and balance of direct democracy and indirect democracy.

Direct democracy involves the holders of money directly participating in the formulation of rules, using one coin per vote, and a higher degree of decentralization, such as Decred and Tezos. In direct democracy, there are often problems such as turnout, professionalism, and token concentration. Indirect democracy is the representative system. Representatives are elected through different methods and rely on the representatives to exercise their rights, such as the EOS super node, the board in Polkadot, and the "follow voting" mechanism in DFINITY. Indirect democracy needs to take into account the design of governance structures, the allocation of power, and incentives.

## PlatON governance mechanism

In our opinion, decision-making power should belong to "stakeholders", that is, the right belongs to the people. However, the referendum needs to take into account issues such as implementation costs, turnout rates, professionalism, and governance efficiency. Therefore, the referendum should not be the governance norm, but also the governance method in the case of major differences. In our PPoS design, the generation of validators is an election in itself, and the interests of validators are closely related to the rise and fall of the public chain ecology. It should assume more governance responsibilities and have more governance rights. Therefore, in PlatON governance, we have adopted a combination of direct and indirect democracy. Its core principles are: in the normal state, voting by the validator, that is, indirect democracy; under major differences, voting by the community, which is direct democracy.

### Participating Roles

- **Alternative node**
  Nodes become candidates by stake certain amount of tokens. Other users can delegate their own tokens to candidates, and the system ranks according to the total staking amount of each candidates. The top 201 candidates are elected as validators.
  
- **Token holder**
  All LAT token holders.
  
- **Developers** 

  Co-construct core developers of the PlatON public chain and community.

### Rights Assignment
- **Alternative node**
  - Initiate a proposal
  - Vote on the referendum proposal
  - Vote on non-referendum proposals
  - Seconding the proposal
- **Currency holder**
  - Initiate a proposal
  - Vote on the referendum proposal
  - Seconding the proposal
- **Developers**
  - GitHub code control
  - Proposal review
  - Proposal implementation

### Proposal Classification

- **Referendum proposal**
  The referendum proposal occurs in a highly controversial scenario. Any currency holder can initiate a referendum proposal, and a referendum is required to produce results. The scenario is as follows:
  - Amendment of the Basic Law
  - Make a major fork, similar to The Dao's fork
  - Terminate the running of the chain
- **Non-referendum proposal**
  Non-referendum proposals are ordinary proposals that are produced by validator votes. The types of proposals can be divided into the following types:
  - Text proposals: Text proposals can be used for decisions that need not be implemented.
  - Software upgrade proposal: used to initiate an upgrade vote on the chain to achieve the purpose of smooth upgrade.
  - Parameter modification proposal: used to modify manageable parameters such as system parameters.
  - Account proposal: used to freeze or unfreeze accounts (including contracts).
  - Incentive proposal: Used to allocate the balance of the governance fund account.
  - Cancel Proposal: Used to cancel the software upgrade proposal that is being voted on the chain.

### Governance process

<img src="/docs/img/en/PlatON_governance_solution.assets/governace-flow.png" alt="governace-flow"/>

**1)** **Initiate Proposal**

Referendum proposals can be initiated by anyone, and non-referendum proposals are initiated by validators. Each proposal should have a corresponding text description, which is stored in the PIP repository on github and managed by the core developer, similar to EIP.

To control spam proposals, the initiation of all types of proposals requires a proposal fee as the cost of the proposal. For the referendum proposal, a token is required to be pledged as the deposit of the proposal. Other holders can also attach the proposal by increasing the deposit of the proposal to increase the chance of the proposal entering the voting period. The proposal deposit is returned to the original account when the proposal enters the voting period.

**2)** **Proposal Screening**

- **Referendum Proposal**: Since the referendum proposal is not the norm, multiple referendum proposals can be initiated on the chain at the same time. These proposals will be sorted according to the highest margin, and the proposal with the highest margin will be selected each month to enter the voting stage .

- **Non-referendum proposal**: The successful launch of the proposal will enter the voting period, and multiple proposals can be voted in parallel.

**3)** **Vote for Proposal**

- **Referendum proposal**

  The core equity vote of the referendum proposal. Voting will last two weeks and there are three voting options: "Yes", "No" and "Abstain". Only tokens participating in the pledge and delegation can vote. The voting form adopts the model of "validator's vote + personal voting coverage". That is: the verifier's voting weight is the sum of its own pledged tokens and the number of accepted commissioned tokens. If the client and the validator have different opinions, the client can vote on its own, and its voting weight is the number of commissions. The voting options will be overwritten. All votes will be locked until the end of the vote.

  In order to alleviate the problem of voting centralization caused by the majority of tokens being controlled by a few nodes, the number of validators participating in the voting should be sufficient. If the majority of validators disagree or do not participate in the voting, the proposal will still not pass.

- **Non-referendum proposal**

  The core of voting on non-referendum proposals is validator voting. Any node that is elected as a validator within the voting period of the proposal can vote. The voting cycle is generally two weeks, and the voting cycle of a software upgrade proposal can be determined by the proposal initiator according to the situation. The voting method adopts a system of one person and one vote for validators. After voting, the validator's own pledged tokens will be locked until the end of voting. In addition to software upgrade proposals, there are three voting options for other types of voting: "Yes", "No", and "Abstain". In order to simplify the voting process, there are no explicit options for the **software upgrade proposal**. Each validator can indicate his or her voting position by whether to upgrade the local node. 

**4)** **Voting results calculation**

- **Referendum Proposal**: There are three dimensions for calculating the results of referendum proposals:
  - Validator support rate: the ratio of the number of validators who vote for support to the total number of validators who can vote;
  - Token support rate: the ratio of the number of tokens supported to the total number of tokens participating in the vote;
  - Token participation rate: The ratio of the total number of tokens participating in the voting to the total number of tokens in circulation.


  When both: validator support rate> P%, Token support rate> Q%, and Token participation rate> K%, the proposal is approved, otherwise the proposal is not approved.

- **Non-referendum proposal**: There are two calculation dimensions for non-referendum proposals:
  
  - Verifier support rate: the ratio of the number of validators who vote for support to the total number of validators who can vote;
- Validator participation rate: the ratio of the number of voting validators to the total number of voteable validators;
  

When both: Validator support rate> M% and validator participation rate> N%, the proposal is voted through, otherwise the proposal fails to vote.

   > **Note**: In the software upgrade proposal, the default validator participation rate is 100%.

| Type               | Participation Rate | Support ratio |
| :----------------- | :----------------- | :------------ |
| Text proposal      | >50%               | >=66.7%       |
| Cancel proposal    | >50%               | >=66.7%       |
| Parameter proposal | >50%               | >=66.7%       |
| Upgrade proposal   | =100%              | >=66.7%       |

### <span id="upgrade">Upgrade mechanism</span>

#### Overall mechanism

The upgrade mechanism is a guarantee that the network can continue to iterate and improve. For different situations that may occur during the operation of the blockchain system, we should provide targeted upgrade methods, mainly in the following four cases:

- Optimized upgrade: This type of upgrade is a function optimization of the current chain version. Each node can decide whether to upgrade according to the situation, whether or not the upgrade does not affect the consensus.

- Vote for upgrades: This category of upgrades adds new features or fixes to patches that affect the consensus mechanism. This upgrade needs to initiate a software upgrade proposal on the chain, and decide whether to implement the upgrade based on the voting results, and complete the smooth upgrade without interrupting the network. The focus will be explained later.

- Repair and upgrade: When a node cannot participate in consensus normally due to a low version or an abnormal transaction, the validator can restore the participation in the network consensus by installing a new version of the software.

- Snapshot upgrade: When the blockchain system encounters a major anomaly, which prevents the entire chain from producing blocks properly, a snapshot can be generated based on the previous normal network state, and then the network can be restored based on the snapshot.

Below we will focus on the **on-chain voting upgrade mechanism**.

#### On-chain voting upgrade

The upgrade package corresponding to the software upgrade proposal is provided by the developer. The upgrade package must be compatible with the current chain version, and validators can participate in voting after upgrading the local node.

##### Initiate Upgrade Proposal

The upgrade proposal can only be initiated by a validator. When it is initiated, a fee higher than the ordinary transaction fee must be paid. The following parameters need to be provided in the parameters of the software upgrade proposal:

- The version number of the upgrade target. The version number consists of three digits, such as 1.2.0. The first two digits of the version number of the upgrade target must be greater than the first two digits of the current chain version number.

- The ID of the file that github describes the upgrade information, which is PIP-ID. The ID must be unique.

- Number of consensus rounds for voting on the upgrade proposal. This parameter will be used to calculate the voting cutoff block height, that is, the 230th block cutoff vote of the Nth consensus round starts at the current consensus round.

There can only be one software upgrade proposal in the chain, that is, when there is already a software upgrade proposal in the voting or under implementation on the chain, another software upgrade proposal cannot be initiated. If you encounter a special reason or emergency at this time and need to initiate a new software upgrade proposal immediately, you can initiate a cancellation proposal to cancel the software upgrade proposal.

> Cancellation proposal description: Cancellation proposal can be initiated only when there is an upgrade proposal being voted on the chain. The following parameters are required to cancel a proposed transaction.
>
> - Canceled upgrade proposal transaction hash
>
> - GitHub's description file ID of the upgrade information, that is, PIP-ID. The ID must be unique.
>
> - Cancel consensus round of proposal voting. The vote cutoff block height calculated by this parameter cannot exceed the vote cutoff block height of the cancelled upgrade proposal.

##### Vote on Upgrade Proposal

After the software upgrade proposal is successfully launched, it enters the voting phase. Only validators can participate in the voting, that is, the voting transaction can only be initiated by the node's pledged account. Before voting, the local node must be upgraded to count votes by one person and one vote.

We did not set voting options for "support", "oppose", and "abstain" in the voting transaction for the software upgrade proposal, but expressed our position through node behavior, as follows:

- Supporters: After the local node version is updated to the version in the proposal upgrade, a vote on the upgrade proposal is initiated;

- Neutral: You can choose to upgrade the node, but do not vote, and initiate a version statement transaction to declare that this node has been upgraded, so that you can participate in consensus normally whether the proposal is passed or not;
  -Opponents: No need to upgrade local nodes, no voting required.

The following parameters are required to upgrade the proposal voting transaction:

- Hash to initiate proposal transactions

- The actual version number of the node. This version number needs to be the same as the version number of the upgrade target in the voting in order to vote successfully.

- Node signature. The signature is the node private key's signature on the node version number.

> Although the node has been upgraded during the voting period, the logic currently running is still the logic of the old version. Wait until the implementation is complete before switching to the new version of the logic.

##### Statistics on voting results of upgrade proposals

<img src="/docs/img/en/PlatON_governance_solution.assets/upgrade-statistics.png" alt="upgrade-statistics"/>

The voting result of the upgrade proposal is highly counted at the voting deadline block. If the voting situation in the voting cycle is as shown above:

- The total number of validators in the settlement cycle 1: $ P_1 $, the number of validator-initiated upgrade votes is $ M_1 $

- The total number of validators in the settlement cycle 2: $ P_2 $, the number of validator-initiated upgrade votes is $ M_2 $

- The total number of validators in the settlement period N: $ P_n $, and the number of validator-initiated upgrade votes is $ M_n $

Then the final support rate: $SR=\frac{100\%\times \sum_{i=1}^{n}M_i}{\sum_{i=1}^{n}P_i-P_1\cap P_2 \cap ... \cap P_n}$

If $SR \geq 66.7%$, the proposal is voted through and the implementation phase is entered.
    

##### Upgrade Proposal Implementation

Due to the randomness of VRF selection of candidate nodes and in order not to affect consensus, we need to ensure that the verification nodes in a consensus round are all upgraded nodes when implementing the upgrade.

Therefore, when the proposal voting deadline is high, the proposal's approval rate reaches 66.7%, then the upgrade will be implemented in the first block of the next consensus round, and no non-upgraded nodes will no longer be selected to participate in the consensus. In the current settlement cycle, the eliminated non-upgraded nodes will just not be selected by VRF to participate in consensus, but still enjoy the pledged benefits of the current settlement cycle.

##### Release Statement

As there may be data incompatibility between different versions, in order to avoid consensus failure due to version issues, the node version on the chain should be controlled, so we introduced a version declaration. A node initiates a version statement to indicate that its node version is consistent with the target version number in the current chain version or software upgrade proposal vote, so that it can have the opportunity to participate in consensus normally before and after the upgrade.

Only candidate nodes and validator nodes can initiate version declarations. Newly added nodes need to be candidates before they can launch a version statement. The conditions for each stage version declaration are as follows:

<img src="/docs/img/en/PlatON_governance_solution.assets/version-declare.png" alt="version-declare"/>

When the node version and the version on the chain are inconsistent (the first two digits of the version number are different), the node will not be selected to participate in the consensus, even if the pledge is high, at this time, the node can declare that its node is consistent with the chain version by initiating a version declaration transaction. In order to participate in consensus in the subsequent settlement cycle. When there is a voting software upgrade proposal on the chain, a version statement consistent with the upgrade version can be issued. The version statement does not represent a vote. After the upgrade proposal is voted through, the node that has the same version number as the upgrade destination is declared without voting. Can participate in consensus normally.

##### Quick Upgrade

Initiating an upgrade vote on the chain is a serious matter. In theory, there should be no possibility of revoking the proposal. All the results should be submitted to the verifier to vote. However, we only allow one software upgrade proposal to be voted on the chain, so when an emergency situation needs to be upgraded quickly, if there are unprocessed proposals on the chain, it will directly affect the emergency processing speed. From this we introduce the cancellation proposal, which is initiated by the validator. The voting cycle can be determined by itself, but it must be within the voting cycle of the cancelled proposal. By initiating the cancellation proposal and the quick response of each node, the software upgrade proposal that is being voted on can be cancelled in a short time, thereby implementing the emergency plan quickly. Cancellation proposals can only be initiated when there is an upgrade proposal being voted on the chain. Cancellation proposals must be implemented once they are initiated, so we encourage the use of cancellation proposals only in emergencies.

The following parameters are required to cancel a proposed transaction:

- Canceled upgrade proposal transaction hash

- The ID of the file that github describes the upgrade information, which is PIP-ID. The ID must be unique.

- Number of consensus rounds to cancel proposal voting. The vote cutoff block height calculated by this parameter cannot exceed the vote cutoff block height of the cancelled upgrade proposal.

### Governance parameters

Alternative nodes can modify some system parameters by initiating a parameter governance proposal. To avoid problems caused by the cross-implementation of parameter proposals and upgrade proposals, when there are voting upgrade proposals or parameter proposals on the chain, it is not allowed to initiate new parameter modification proposals.
The parameter proposal voting cycle is two weeks. As of now, the governance parameters we support are as follows:

- staking module

| Key                     | description                                                  | range                      |
| ----------------------- | ------------------------------------------------------------ | -------------------------- |
| stakeThreshold          | The minimum number of staking tokens to become alternative node candidates | [10w,1000w] LAT            |
| operatingThreshold      | Minimum number of tokens for each delegation and redemption by the client | [10, 10000] LAT            |
| maxValidators           | Number of alternative nodes                                  | [43, 10000]                |
| unStakeFreezeDuration   | Verify the number of settlement cycles when the node exits and the pledged money is frozen | (maxEvidenceAge,336] Epoch |
| rewardPerMaxChangeRange | "Reward Rate of Commitment" The maximum range of rewards that can be adjusted per revision (‱) | [1，2000]                  |
| rewardPerChangeInterval | The "Delegate Rewards Ratio" allows you to change the number of settlement cycles that need to wait again | [2, 28]                    |

- slashing module

| Key                        | description                                                  | range                             |
| -------------------------- | ------------------------------------------------------------ | --------------------------------- |
| slashBlocksReward          | When the block generation rate is 0, the number of blocks rewarded by the reduced block | [0, 50000) blocks                 |
| slashFractionDuplicateSign | Proportion of penalty node own staking when dual signing behavior was reported(‱) | (0,10000]                         |
| duplicateSignReportReward  | Whistleblower reward ratio(%)                                | (0, 80]                           |
| maxEvidenceAge             | Number of valid settlement cycles for evidence reported by dual signing | (0, unStakeFreezeDuration)        |
| zeroProduceCumulativeTime  | The number of continuous consensus rounds of zero block out, and the number of zero block out is accumulated within this time | [zeroProduceNumberThreshold , 50] |
| zeroProduceNumberThreshold | Zero block times penalty threshold                           | [1,zeroProduceCumulativeTime]     |
| ZeroProduceFreezeDuration  | Node zero block penalty is locked time                       | [1, unStakeFreezeDuration)        |

- block module

| Key              | description                                                  | range                    |
| ---------------- | ------------------------------------------------------------ | ------------------------ |
| MaxBlockGasLimit | Block GasLimit dynamically adjusts the maximum Gas limit that can be reached | [9424776, 300000000] gas |

- reward

| Key                   | description                                                  | range     |
| --------------------- | ------------------------------------------------------------ | --------- |
| increaseIssuanceRatio | Percentage of annual increase in Platon Network LAT issuance (‱) | [0, 2000] |

- restricting

| Key            | description                                                  | range           |
| -------------- | ------------------------------------------------------------ | --------------- |
| minimumRelease | The minimum value of the release amount in the release cycle of the lockup plan | [100, 10000000] |

### Reward and punishment mechanism

When designing a governance mechanism, a good system is needed to encourage more interested and capable professionals to participate in governance, and at the same time punish malicious acts such as occupying network resources.

#### Reward

- Proposal rewards: Proposal rewards are automatically distributed to the proposal launch account after the proposal has been voted through;

- Voting rewards: After voting, the tokens need to be locked until the voting of the proposal ends, so the voting reward is proportional to the length of the voting lock time and will be distributed to each voting account at the end of the voting of the proposal

- Developer rewards: Developer rewards need to initiate proposals on the chain and decide whether to release them based on the voting results;

- Vulnerability bounty: After confirming the existence of the loophole, a proposal must be launched on the chain and the voting result will be used to decide whether to release it.

#### Punishment

If the dishonest node achieves the upgrade by disguising the version, when the chain upgrade is successful, the validator is selected to participate in the consensus, and the block generation rate will be low because the block cannot be consensus, which will result in system punishment. You can directly disqualify the node.

### Governance Fund

The governance fund comes from the foundation, and a fixed percentage of funds are transferred from the foundation's account to the governance account each year, and the balance of the governance account is allocated by way of voting on proposals for incentives and salary distribution. When the proposal is voted through, it will be automatically issued through multiple signatures.