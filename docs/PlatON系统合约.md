---
id: PlatON_system_contract
title: System contracts
sidebar_label: System contracts
---



After the chain is started, some contracts have been built in the system. The addresses of these contracts have been fixed and the functions have been implemented. Some of the contracts are the realization of economic models, and various contract interfaces are provided to interact with the client.

### Staking contract

contract address:**lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzsjx8h7**

PlatON's network based on the `PoS` mechanism relies on a set of verifiers to keep it running properly. Validators participate in consensus blocking among nodes and receive blocking and staking revenue. To become a verifier, one needs to staking at least 100,000 `LAT` to the `Staking contract` and have a running node.

Delegates are those `LAT` holders who cannot or do not want to become a verifier. They can delegate `LAT` to the verifier and receive the proceeds. The `LAT` delegated by the principal to the verifier is only transferred to the `Staking contract`, not transferring their own `LAT` to the verifier, and the principal holds the ownership of the delegated `LAT` from the beginning to the end. If it is already a validator, it will not be able to become a principal again.

The interaction between the validator and the delegator is mainly done through the `Staking contract`. The `Staking contract` has the following functions:
  - Staking nodes become validators
  - Modify validator information
  - Remove the pledge and exit the validator list
  - Query verifier information and other operations
  - Delegated validator
  - Reduced holdings entrusted
  - Query Staking information

#### Contract interface
1. Create verification node

   This interface is used to make a node an authentication node by staking `LAT` to the `Staking contract`. Before staking, you need your own node to access the network and make sure that the node private key and bls private key are stored safely. When staking, you have to fill in the node information, the revenue account for receiving the block reward and the pledge reward, the reward share for the principal (the more the share, the more likely to attract more users to the principal), the amount of `LAT` you want to pledge (there is a threshold of 100,000 `LAT` for the pledge, if it is lower than that amount, the pledge will fail), and other information. If the pledge is successful, the pledge is transferred from the balance of the user account/locked contract account to the `Staking contract` and the node will participate in the election to become a block-out node in the next epoch. The total weight of the verifier is equal to the total amount of `LAT` pledged by itself plus the total amount of `LAT` delegated, and the higher the total weight the higher the probability of being elected as consensus.

   Interface parameters reference Java SDK:[ create validation node](/docs/en/Java_SDK#staking). 


2. Modify verification node information

   This interface is mainly used to modify the validator's income account, delegated share ratio, node information, etc. The interval for each modification of the share ratio must be greater than 10 consensus periods, and the magnitude of each modification cannot be greater than 5%.

   Interface parameters reference Java SDK:[ Modify verification node information](/docs/en/Java_SDK#updatestaking). 

3. Increase the node Staking amount

   This interface is used to increase the node Staking amount and increase the node weight. The minimum amount of each increase is 10`LAT`. The validator’s new weight will take effect in the next epoch.

   Interface parameters reference Java SDK:[ Increase the node Staking amount](/docs/en/Java_SDK#addstaking). 

4. Release staking

   This interface is mainly used to exit the verification node. The user cannot reduce the staking and can only exit the staking completely. When a staking is released, the staking is unlocked according to the following rules.

     - The release of staking is in the same epoch as the staking/addition, and the related staking will be returned to the user's staking account from the `Staking contract` in real time.

     - If the release of the staking is not in the same epoch as the staking/addition, the staking will be locked for 168 cycles and then returned from the `Staking Contract` to the user's account at the time of the staking.
   
   After initiating a release of staking, the node will not be selected as a validator to participate in consensus.

   Interface parameters reference Java SDK:[ Release staking](/docs/en/Java_SDK#unstaking). 


5. Query the validator list of the current epoch

   This interface is used to query the validator information of the current epoch. At the end of each epoch, the list of validators for the next epoch will be updated based on the total weight of all candidate validators.

   Interface parameters reference Java SDK:[ Query the validator list of the current epoch](/docs/en/Java_SDK#getverifierlist). 


6. Query the list of validators in the consensus round

   This interface is used to query the list of verifiers that have been selected out of blocks for the current consensus cycle. Each consensus round is 430 blocks, and at 410 blocks will generate a list of verifiers from the verifier queue of the current Epoch that can participate in the next consensus round to get out the blocks.

   Interface parameters reference Java SDK:[ Query the list of validators in the consensus round](/docs/en/Java_SDK#getvalidatorList). 

7. Query the list of candidate  information

   This interface is used to query the list of all candidate verifier information. Any node that has successfully pledged is a candidate verifier.

   Interface parameters reference Java SDK:[ Query the list of candidate  information](/docs/en/Java_SDK#getcandidateList). 

8. Query the validator entrusted by the delegator
  
   This interface is used to query which validators have been delegated by the specified delegator.

   Interface parameters reference Java SDK:[ Query the validator entrusted by the delegator](/docs/en/Java_SDK#getrelatedListbydeladdr). 


9. Query the staking information of a node

   This interface is used to query the staking information of the node.

   Interface parameters reference Java SDK:[ Query the staking information of a node](/docs/en/Java_SDK#getstakinginfo). 

10. delegation

    This interface is used to delegate or incrementally delegate a verifier node. Users who have already pledged a node will not be able to delegate it. The user can delegate `LAT` to the verifier at any time with a minimum amount of 10 `LAT` per delegation. After a successful delegation, the `LAT` delegated by the delegator to the candidate verifier is transferred to the `Staking contract`. The new weight of the verifier will take effect in the next Epoch. When the verifier is selected to participate in the consensus, it will share the block-out and Staking rewards with the principal.

   Interface parameters reference Java SDK:[ delegation](/docs/en/Java_SDK#delegate). 


11. Decrease/revoke delegation

    This interface is used to reduce or revoke the delegate operation. The principal can reduce or revoke the commission at any time, and the minimum amount of each reduced commission is 10`LAT`. After the operation is completed, `LAT` will be returned to the principal's account from the `Staking contract` in real time, and if the remaining commission after the reduction is less than 10`LAT`, the commission of this principal will be revoked. The proceeds received by the validator in the current cycle will be distributed to the principal according to the amount of the mandate after the reduction.

   Interface parameters reference Java SDK:[ Decrease/revoke delegation](/docs/en/Java_SDK#undelegate). 


12. Query delegation

    This interface is used to query the user's delegation information.

    Interface parameters reference Java SDK:[ Query delegation](/docs/en/Java_SDK#getdelegateinfo). 


13. Query average time of packed blocks

    This interface is used to query the average time of packed blocks.

    Interface parameters reference Java SDK:[ Query average time of packed blocks](/docs/en/Java_SDK#getavgpacktime). 


14. Query the block reward of the epoch

    This interface is used to query the block reward of the current epoch.

    Interface parameters reference Java SDK:[ Query the block reward of the epoc](/docs/en/Java_SDK#getpackagerewards). 


15. Query the staking reward of the epoch

    This interface is used to query the staking reward of the current epoch.

    Interface parameters reference Java SDK:[ Query the staking reward of the epoch](/docs/en/Java_SDK#getstakingreward). 



### Governance contract

contract address:**lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm**

The on-chain governance method adopted by PlatON enables it to develop in accordance with the requirements of `LAT` holders. The goal of governance is to ensure that majority ownership can always control the network. Any governance modification plan discussed in the community can be initiated by a validator on the chain and voted for a referendum.

- `Text proposal` can be used to vote on content discussed in certain communities. The process includes the voting stage, where the vote is passed and the vote fails.
- `Version proposal` can be used to upgrade the version of the chain. The process includes the voting stage, voting failure, pre-validation, validation, and cancellation.
- `Cancel Proposal` can be used to cancel previously initiated proposals. The process includes the voting stage, where the vote is passed and the vote fails.
- `Parameter proposal` can be used to change some manageable parameters and optimize the ecology of the chain. The process includes the voting stage, where the vote is passed and the vote fails.

#### Contract interface

1. Create a text proposal

   This interface is used to issue a text proposal. After the text proposal is issued, validators can vote for/against/abstain from the proposal. The voting deadline is about 2 weeks, and the proposal is passed when the voting rate is greater than 50% and the support rate among those who voted is greater than 66.7%.

   Interface parameters reference Java SDK:[ Create a text proposal](/docs/en/Java_SDK#submitproposal). 


2. Create an version proposal

   This interface is used to initiate an version proposal. Proposals can only be initiated by validators. After the proposal is passed, the on-chain version will be upgraded. The validator’s vote is regarded as a support vote. After the voting deadline has passed, when the support rate is greater than 66.7%, the proposal enters the pre-validation stage and will come into effect in the next Epoch.

   Interface parameters reference Java SDK:[ Create an version proposal](/docs/en/Java_SDK#submitproposal).


3. Create an parameter proposal

   This interface is used to initiate parameter proposals. The parameter proposal is used to change some manageable parameters on the chain. The validator can vote for/again/abstaining votes. The voting deadline is about 2 weeks. When the voter turnout rate is greater than 50% and the voter approval rate is greater than 66.7%, the proposal is passed.

   Interface parameters reference Java SDK:[ Create an parameter proposal](/docs/en/Java_SDK#submitproposal).


4. Create an cancellation proposal

   This interface is used to initiate a cancellation proposal. Canceling a proposal can cancel the previously initiated text, parameters, and upgrade proposal. The voting deadline must be greater than the voting deadline of the cancelled proposal. After the voting deadline, when the voting rate is greater than 50

   Interface parameters reference Java SDK:[ Create an cancellation proposal](/docs/en/Java_SDK#submitproposal).


5. Vote

   This interface is used to vote on proposals in progress. Only yes votes can be voted for the version upgrade proposal, and the node needs to be upgraded to the new version before voting.

   Interface parameters reference Java SDK:[ Vote](/docs/en/Java_SDK#vote). 

6. DeclareVersion

   This interface is used to initiate version declarations. When the PlatON network is upgraded to a new version through an upgrade proposal, all verification nodes that have not voted need to upgrade their nodes to the latest version simultaneously, and update their version status in the network through a version statement, otherwise they will not be selected for consensus.
   
   Interface parameters reference Java SDK:[ Declare Version](/docs/en/Java_SDK#declareversion). 


7. Query proposal

   This interface is used to query the specified proposal.

   Interface parameters reference Java SDK:[ Query proposal](/docs/en/Java_SDK#getproposal). 


8. Query proposal status

   This interface is used to query the current status of the proposal

   Interface parameters reference Java SDK:[ Query proposal status](/docs/en/Java_SDK#getTallyresult). 


9. Query the list of proposals

   This interface is used to query the list of proposals that are in voting and have ended.

   Interface parameters reference Java SDK:[ Query the list of proposals](/docs/en/Java_SDK#getProposalList). 

10. Query chain version

    This interface is used to query the current effective version of the chain.

    Interface parameters reference Java SDK:[ Query chain version](/docs/en/Java_SDK#getactiveversion). 

11. Query governance parameter values

    This interface is used to query the governance parameter value of the current block height

    Interface parameters reference Python SDK:[ Query governance parameter values](/docs/en/Python_SDK#query-the-governance-parameter-value-of-the-current-block-height). 
    
12. Query the cumulative number of votes available for a proposal
  
    This interface is used to query the cumulative number of votes available for a proposal.

    Interface parameters reference Python SDK:[ Query the cumulative number of votes available for a proposal](/docs/en/Python_SDK#query-the-cumulative-number-of-votes-available-for-a-proposal). 
    
13. Query the list of governance parameters
  
    This interface is used to query all management parameters of a certain module.

    Interface parameters reference Python SDK:[ Query the list of governance parameters](/docs/en/Python_SDK#query-the-list-of-proposals). 

### Slashing contract

contract address:**lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyva9ztf**

The slashing contract is mainly for system security to monitor the behavior of each node, Penalties will be imposed on violating nodes that violate system security, the contract has the following two major functions：

- Slashing nodes that can't produce blocks

  According to system rules, each consensus round will have a batch of nodes responsible for producing the blocks of that round, the number of blocks to be produced is fixed for each consensus round, each node is assigned a time window and the number of blocks that need to be produced, generate blocks in turn to complete the block production of the entire consensus round. When a node does not produce a block within the specified time window, will switch to the next node to continue producing blocks, this cycle continues until the number of blocks required to complete the consensus round. The entire consensus round is completed and a new batch of nodes starts the next consensus round. 

  If a node has not produced a block in the entire consensus round, then the zero block behavior of the node will be recorded. The Punish conditions are:start recording when the node generates zero blocks for the first time, count the production of blocks in each consensus round in the next period of time, if during this period the node participates in the consensus round again and produces a block, then the previous zero block records will be cleared and exempted from penalties, otherwise, the node will be punished when the statistical time is up, Impose a fine (amount of fine = current block reward*n) and state lock (automatically unlock after a period of lock and return to the normal state. During the lock-up period, the node has no rewards and cannot perform any actions, including modifying information, revoking staking, participating in block production, and accepting delegation).

- Slashing double-production or double-signed nodes

  Under normal circumstances, a node will only generate one block at the same block height or only sign one of the blocks for different blocks of the same block height, otherwise it is a violation of the rules and will be punished, when this happens to a node, the evidence of violation will be recorded locally by the received node, users can use the `RPC` to call the `platon_evidences` interface to obtain evidence of violations, then send the evidence to the chain in the form of a transaction, the system will judge the evidence, if the evidence is true, the node will be punished.

#### Contract interface

1. Report double sign/double production

   This interface is used to report the double-signature or double-production behavior of a node, the user sends the evidence to the penalty contract in the form of a transaction, After the system verifies that the evidence is true, the node will be fined and the staking will be forcibly released (disqualification of validators and alternative nodes), Part of the fine (default:50%) will be awarded to the reporter as a reward and transferred to the account immediately (transferred to the account that initiated the reporting transaction).

   Interface parameters reference Java SDK:[ Report double sign/double production](/docs/en/Java_SDK#reportdoubleSign). 


2. Check whether the evidence has been reported

   This interface is used to check whether the evidence to be reported has been used before initiating a report (already reported), after the user obtains the evidence by calling the `RPC` interface, he can first call the interface to check whether the evidence has been reported to avoid repeated reporting. Because the reporting interface requires a lot of cost, and regardless of whether the evidence has been reported (used) or not, the cost of the transaction will still be spent. So this interface can provide pre-check, all input parameters of this interface are parsed from the evidence list returned by the `RPC` interface `platon_evidences`.

   Interface parameters reference Java SDK:[ Check whether the evidence has been reported](/docs/en/Java_SDK#checkduplicatesign). 

### Lockup contract

contract address:**lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp7pn3ep**

This contract can be used to lock the asset to restrict its circulation within a certain period of time, it can control the total asset circulation within a certain period of time or other lock-in requirements of external personnel, When the lock-up period of the asset ends, the asset will be automatically transferred to the receiving account (the receiving account after unlocking entered when the lock plan was initiated), after the locked asset is transferred to the lock-up contract, the ownership of the asset will belong to the unlocked receiving account, the asset cannot be used for trading during the lock-up period, although it belongs to the receiving account, the funds are stored in the lock-up contract and the account balance cannot be queried, the asset can only be obtained by querying the lock-up record in the lock-up contract. The contract will release the assets to the designated unlock recipient according to the release rules specified by the person who initiated the lock, the release rule can be customized to unlock all at a certain point in time and transfer to the recipient's account, it can also be defined as splitting an asset into N shares and releasing them in M phases, setting the release time of each phase to release one part until all the locked assets are released after the M period, and each time the asset is released, the asset arrives in time. The user account can be used freely.

Assets in the locked period cannot be transferred due to restrictions, in order to compensate users for the loss of asset liquidity and benefits, this asset can be used for staking nodes and delegation nodes to revitalize funds to obtain income and offset the value dilution caused by inflation. However, when the asset is used for staking or entrusted use, the asset will not be transferred to the recipient's account after the lock-up period has expired. Instead, the asset will be transferred to the recipient's account when the user releases the staking or the delegation, the release rules of the lockup contract will be handled differently according to the use of the asset. If the funds used for staking and delegation only use part of the assets in the locked position, then when the release period is reached, it will only be released from the funds that have never been misappropriated. If the released amount is not enough, it will not be released currently but wait for the user Only release when the misappropriated funds are cancelled.

#### Contract interface

1. Create a lockup plan

   This interface is used to create an asset lock, transfer the specified amount from the initiator's account to the lock-up contract, and transfer it to the specified recipient account when the specified time is reached.

   Interface parameters reference Java SDK:[ Create a lockup plan](/docs/en/Java_SDK#createrestrictingplan). 

2. Query the lock-up plan

   This interface is used to query the lock-up plan under the specified account, and the specified account is the recipient's account after unlocking.

   Interface parameters reference Java SDK:[ Query the lock-up plan](/docs/en/Java_SDK#getrestrictinginfo). 

### DelegationReward contract

contract address:**lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxlcypcy**

The contract is mainly used to deal with the business related to delegate income. When each user delegates a node, a delegation record will be generated, each delegation record will get dividends from the delegated node, the dividend amount is calculated from the node's income according to the dividend ratio set by the node to the delegator, the total dividends allocated will be divided equally according to the total delegations of the nodes, Each delegated unit will get a certain income, so the income that a single delegation can obtain is directly proportional to the delegated volume. 

In this process, at the end of each epoch, the system will automatically calculate the dividend rewards of each candidate node to all its delegators, all dividend rewards will be immediately transferred to this contract for temporary storage, that is, the income obtained by each principal is first stored in this contract, it is necessary to wait for the user to initiate a transaction for receiving revenue. At this time, the system will calculate how much delegation revenue this user has in this contract and immediately transfer it to the user's account.

#### Contract interface

1. Receive delegated rewards

   This interface is used to extract delegated rewards that the user has not yet claimed, when a single user entrusts multiple nodes to generate multiple delegations, the interface can only process the rewards for 20 delegations at a time, the rest must be re-initiated to receive the operation (the rules for receiving 20 delegated rewards are sorted according to the number of Epochs that have not been claimed for each delegation, the more the number of unclaimed cycles, the priority to receive the delegated awards), if the number of delegated rewards waiting to be collected is less than 20, then directly collect all of them.

   Interface parameters reference Java SDK:[ Receive delegated rewards](/docs/en/Java_SDK#withdrawdelegatereward). 


2. Query delegation reward

   This interface can be used to query all pending delegation income details of the interface initiator, you can also specify to query a certain delegation or multiple delegations, the return result will be a sorted list of income details, the sorting rule is to sort in reverse order according to the number of unclaimed Epochs for each delegation (the return data will not be sorted if there are less than 20 delegated rewards to be received)。

   Interface parameters reference Java SDK:[ Query delegation reward](/docs/en/Java_SDK#getdelegatereward). 

### random number contract

contract address:**lat1xqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpe9fgva**

This contract is mainly used to generate multiple random numbers. The parameter is the number of random numbers to be generated. It supports the generation of up to 500 random numbers. The return value is a []byte array, and every 32 bits is a random number.

If only one random number is generated, it is obtained by the XOR of the random number of the current block and the transaction hash. If multiple random numbers need to be generated, the first random number is obtained by the XOR of the random number of the current block and the transaction hash. The random number is obtained by XORing the random number of the previous block in turn with the first random number.

The random number generation principle of the block: After the PlatON node packs the block, it will use VRF to generate a random number and proof for the block, and store it in the Nonce field of the block. The random number seed is the random number of the previous block. number.

