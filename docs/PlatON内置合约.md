---
id: PlatON_Built-in_contract
title: PlatON Built-in contract
sidebar_label: PlatON Built-in contract
---

## PlatON Built-in contract

After the chain is started, some contracts have been built in the system. The addresses of these contracts have been fixed and the functions have been implemented. Some of the contracts are the realization of economic models, and various contract interfaces are provided to interact with the client.

### Staking contract
PlatON's consensus mechanism is based on the Byzantine fault-tolerant `PoS`, which integrates validators to maintain the normal operation of the network. You need to pledge at least 100000`LAT`to the `Staking contract` and have a running routine.
Delegater are holders of `LAT` who cannot or do not want to be validators. They can delegate the `LAT` to the verifier and get the benefits. The `LAT` delegated by the delegator to the verifier is only transferred to the `Staking contract`, instead of transferring their own `LAT` to the verifier. Hold the ownership of the entrusted `LAT`. If you are already a validator, you will no longer be able to become a Delegater.
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

   This interface makes the node become a verification node by staking `LAT` into the `staking contract`. Before staking, you need your own node to access the network, and ensure that the node's private key and bls private key are securely stored. When staking, you must fill in the node information, accept the income account of the block reward and the pledge reward, the reward share for the principal (the more the share, the more likely it is to attract more users to entrust), the amount of `LAT` you want to pledge (pledge The gold has a threshold of 100000 `LAT`, if it is lower than this amount, the pledge will fail) and other information. If the pledge is successful, the node will appear in the list of candidate validators, and the pledge deposit will be transferred from the balance of the user account/locking contract account to the `Staking contract`. The total weight of the validator is equal to the amount of `LAT` pledged by oneself plus the total amount of `LAT` delegated. The higher the total weight, the greater the probability of being selected as a consensus.

   **Enter: **  

    - The type of amount used as a pledge (free amount or locked balance, or both)
    - Earning accounts that accept block rewards and pledge rewards
    - External Id
    - Node name
    - The third-party homepage of the node
    - Description of the node
    - The amount of pledge
    - Proportion of rewards divided by commission
    - The real version of the program, obtained through the node's `RPC` interface
    - The real version signature of the program, obtained through the node's `RPC` interface
    - The public key of bls, which is an aggregate signature algorithm, the public key is obtained through the `RPC` interface of the node
    - Proof of bls, which is obtained through the node's `RPC` interface
    
   **Output: **None

2. Modify verification node information

   This interface is mainly used to modify the validator's income account, delegated share ratio, node information, etc. The interval for each modification of the share ratio must be greater than 10 consensus periods, and the magnitude of each modification cannot be greater than 5%.

   **Enter: ** 

    - Income account for receiving block rewards and pledge rewards
    - Proportion of rewards divided by commission
    - External Id
    - The name of the staked node
    - The third-party homepage of the node
    - Description of the node

   **Output: **None

3. Increase the node Staking amount

   This interface is used to increase the node Staking amount and increase the node weight. The minimum amount of each increase is 10`LAT`. The validator’s new weight will take effect in the next epoch.

   **Enter: ** 

    - Node id
    - The amount that needs to be increased

   **Output: **None

4. Release staking

   This interface is mainly used to exit the verification node. The user cannot reduce the pledge, but can only completely withdraw from the pledge. After the withdrawal, the pledge deposit will be locked for 168 cycles and then returned from the `Staking contract` to the user's account at the time of pledge. During the lock-up period, nodes will not be selected as validators to participate in the consensus.

   **Enter: ** The id of the node to release the staking

   **Output: **None

5. Query the validator list of the current epoch

   This interface is used to query the validator information of the current epoch. At the end of each epoch, the list of validators for the next epoch will be updated based on the total weight of all candidate validators.

   **Enter: ** None

   **Output: **Information list of all current validators

6. Query the list of validators in the consensus round

   This interface is used to query the list of validators selected to produce blocks in the current consensus round. Each consensus round has 430 blocks. At block 410, a list of validators who can participate in the next consensus round will be generated from the validator queue in the current settlement round.

   **Enter: ** None

   **Output: **List of validator information for the current consensus round


7. Query the list of candidate  information

   This interface is used to query the information list of all candidate verifiers, and any node that successfully pledges is a candidate verifier.

   **Enter: ** None

   **Output: **List of candidate information 

8. Query the validator entrusted by the delegator
  
   This interface is used to query which verifiers the specified principal has delegated.

   **Enter: ** account address

   **Output: **
   
    - validator's node Id
    - Block height when validators staking

9. Query the staking information of a node

   This interface is used to query the staking information of the node.

   **Enter: ** Verifier's node Id

   **Output: ** node information

10. delegation

    This interface is used to delegate or accumulate to delegate a validator node. Users who have already pledged nodes will not be able to delegate. The user can delegate `LAT` to the validator at any time, and the minimum amount of each delegation is 10`LAT`. After the delegation is successful, the `LAT` delegated by the delegator to the candidate validator is transferred to the `Staking contract`. The new weights of validators will take effect in the next consensus cycle. When the validator is selected to participate in the consensus, the block and staking rewards will be shared with the delegator.

    **Enter: ** 
    
      - Node ID of the delegated validator
      - delegate amount

    **Output: ** None

11. Reduce delegation

    This interface is used to reduce holdings or cancel delegation operations. The principal can reduce or cancel the entrustment at any time. The minimum amount of each reduction entrusted is 10 `LAT`. After the operation is completed, the `LAT` will be returned from the `Staking contract` to the principal's account in real time. If the holding is reduced After the remaining commission is less than 10 `LAT`, the commission of the principal will be revoked. The profit obtained by the validator in the current cycle will be distributed to the delegator according to the commission amount after the reduction.

    **Enter: ** 
    
      - Node ID of the delegated validator
      - delegate amount

    **Output: ** None

12. Query delegation

    This interface is used to query the user's delegation information.

    **Enter: ** 
    
      - Block height when staking 
      - account address
      - Verifier's node Id 

    **Output: ** 

      - Verifier's node id
      - Block height when staking is initiated
      - The settlement cycle of the most recent delegation to the candidate
      - Initiation of the `von` entrustment for the lock-up period of the free amount of the entrusted account
      - Initiation of the delegated `von` during the hesitation period of the free amount of the entrusted account
      - Initiate the `von` entrusted for the lock-up period of the lock-up amount of the entrusted account
      - Initiating the von von entrusted with the hesitation period of the lock-up amount of the entrusted account
      - Entrusted income to be collected
      - Settlement period when the order is withdrawn (used to calculate the income and the amount withdrawn)

13. Average time to query packaged blocks

    This interface is used to query the average time of a packed block.

    **Enter: ** None
    
    **Output: ** The average time to pack a block (in milliseconds)


14. Query the block reward of the epoch

    This interface is used to query the block reward of the current epoch.

    **Enter: ** None
    
    **Output: ** Block reward

15. Query the staking reward of the epoch

    This interface is used to query the staking reward of the current epoch.

    **Enter: ** None
    
    **Output: ** staking reward


### Governance contract
The on-chain governance method adopted by PlatON enables it to develop in accordance with the requirements of `LAT` holders. The goal of governance is to ensure that majority ownership can always control the network. Any governance modification plan discussed in the community can be initiated by a validator on the chain and voted for a referendum.

- `Text proposal` can be used to vote on content discussed in certain communities. The process includes the voting stage, where the vote is passed and the vote fails.
- `Version proposal` can be used to upgrade the version of the chain. The process includes the voting stage, voting failure, pre-validation, validation, and cancellation.
- `Cancel Proposal` can be used to cancel previously initiated proposals. The process includes the voting stage, where the vote is passed and the vote fails.
- `Parameter proposal` can be used to change some manageable parameters and optimize the ecology of the chain. The process includes the voting stage, where the vote is passed and the vote fails.

#### Contract interface

1. Create a text proposal

   This interface is used to send out text proposals. After the text proposal is sent, validators can vote for/again/abstaining votes. The voting deadline is about 2 weeks. When the voter turnout rate is greater than 50% and the voter approval rate is greater than 66.7%, the proposal is passed.

   **Enter: **

     - The validator who submitted the proposal
     - Proposal ID (generally refers to an ID assigned to a proposal offline, or an ID like a post on the GITHUB website)
    
   **Output: **None

2. Create an version proposal

   This interface is used to initiate an version proposal. Proposals can only be initiated by validators. After the proposal is passed, the on-chain version will be upgraded. The validator’s vote is regarded as a support vote. After the voting deadline has passed, when the support rate is greater than 66.7%, the proposal enters the pre-validation stage and will come into effect in the next settlement cycle.

    **Enter: ** 

     - The validator who submitted the proposal
     - Proposal ID
     - Upgraded version
     - The number of voting consensus rounds (the deadline for voting)
     
    **Output: **None

3. Create an parameter proposal

   This interface is used to initiate parameter proposals. The parameter proposal is used to change some manageable parameters on the chain. The validator can vote for/again/abstaining votes. The voting deadline is about 2 weeks. When the voter turnout rate is greater than 50% and the voter approval rate is greater than 66.7%, the proposal is passed.

   **Enter: ** 

      - The validator who submitted the proposal
      - Proposal ID
      - Parameter module
      - parameter name
      - The new value of the parameter
     
   **Output: **None

4. Create an cancellation proposal

   This interface is used to initiate a cancellation proposal. Canceling a proposal can cancel the previously initiated text, parameters, and upgrade proposal. The voting deadline must be greater than the voting deadline of the cancelled proposal. After the voting deadline, when the voting rate is greater than 50

   **Enter: ** 

      - The validator who submitted the proposal
      - Proposal ID
      - Upgraded version
      - The number of voting consensus rounds (the deadline for voting)
      - The ID of the upgrade proposal to be cancelled
     
   **Output: **None

5. Vote

   This interface is used to vote on proposals in progress. Only yes votes can be voted for the version upgrade proposal, and the node needs to be upgraded to the new version before voting.

   **Enter: ** 

     - Voted validator ID
     - Proposal ID
     - Voting type, yes/no/abstain
     - Node code version (obtained from the node through the `RPC interface`)
     - Code version signature (obtained from the node through the `RPC interface`)
     
   **Output: **None

6. DeclareVersion

   This interface is used to initiate version declarations. When the PlatON network is upgraded to a new version through an upgrade proposal, all verification nodes that have not voted need to upgrade their nodes to the latest version simultaneously, and update their version status in the network through a version statement, otherwise they will not be selected for consensus.
   
   **Enter: ** 

     - Voted validator ID
     - Node code version (obtained from the node through the `RPC interface`)
     - Code version signature (obtained from the node through the `RPC interface`)
     
   **Output: **None

7. Query proposal

   This interface is used to query the specified proposal.

   **Enter: ** Proposal ID
     
   **Output: **

     - Proposal ID
     - Proposal node ID
     - Proposal type
     - Proposal PID
     - The block height of the submitted proposal
     - The block height at which the proposal voting ends

8. Query proposal status

   This interface is used to query the current status of the proposal

   **Enter: ** Proposal ID
     
   **Output: **

     - Proposal ID
     - Number of votes
     - Number of negative votes
     - Number of abstentions
     - The total number of validators eligible to vote during the entire voting period
     - What is the current status of the proposal
     - If cancelled
     - Cancelled ProposalID

9. Query the list of proposals

   This interface is used to query the list of proposals that are in voting and have ended.

   **Enter: **None
     
   **Output: **Proposal information list, refer to the output value of query proposal

10. Query chain version

    This interface is used to query the current effective version of the chain.

    **Enter: **None

    **Output: **The version number of the current chain

11. Query governance parameter values

    This interface is used to query the governance parameter value of the current block height
    
    **Enter: **

      - Parameter module
      - parameter name

    **Output: **Parameter value

12. Query the cumulative number of votes available for a proposal
    
    This interface is used to query the cumulative number of votes available for a proposal.

    **Enter: **

      - Proposal ID
      - Block hash

    **Output: **
      
      - The number of people who can vote
      - Number of people who voted yes
      - Number of people who voted against
      - Number of people who abstained from voting

13. Query the list of governance parameters
  
    This interface is used to query all management parameters of a certain module.

    **Enter: **Parameter module, if it is empty, all governance parameters can be queried

    **Output: **
       - Parameter module
       - parameter name
       - Parameter Description
       - Old parameter value
       - Parameter value
       - Effective block height

### Slashing contract

The slashing contract is mainly for system security to monitor the behavior of each node, Penalties will be imposed on violating nodes that violate system security, the contract has the following two major functions：

- Slashing nodes that can't produce blocks

  According to system rules, each consensus round will have a batch of nodes responsible for producing the blocks of that round, the number of blocks to be produced is fixed for each consensus round, each node is assigned a time window and the number of blocks that need to be produced, generate blocks in turn to complete the block production of the entire consensus round. When a node does not produce a block within the specified time window, will switch to the next node to continue producing blocks, this cycle continues until the number of blocks required to complete the consensus round. The entire consensus round is completed and a new batch of nodes starts the next consensus round. If a node has not produced a block in the entire consensus round, then the zero block behavior of the node will be recorded. The Punish conditions are: start recording when the node generates zero blocks for the first time, count the production of blocks in each consensus round in the next period of time, if during this period the node participates in the consensus round again and produces a block, then the previous zero block records will be cleared and exempted from penalties, otherwise, the node will be punished when the statistical time is up, Impose a fine (amount of fine = current block reward*n) and state lock (automatically unlock after a period of lock and return to the normal state. During the lock period, the node cannot perform any actions, including modifying information, revoking staking, participating in block production, and accepting delegation).

- Slashing double-production or double-signed nodes

  Under normal circumstances, a node will only generate one block at the same block height or only sign one of the blocks for different blocks of the same block height, otherwise it is a violation of the rules and will be punished, when this happens to a node, the evidence of violation will be recorded locally by the received node, users can use the `RPC` to call the `platon_evidences` interface to obtain evidence of violations, then send the evidence to the chain in the form of a transaction, the system will judge the evidence, if the evidence is true, the node will be punished.

#### Contract interface

1. Report double sign/double production

   This interface is used to report the double-signature or double-production behavior of a node, the user sends the evidence to the penalty contract in the form of a transaction, After the system verifies that the evidence is true, the node will be fined and the staking will be forcibly released (disqualification of validators and alternative nodes), Part of the fine (default: 50%) will be awarded to the reporter as a reward and transferred to the account immediately (transferred to the account that initiated the reporting transaction).

   **Enter: **evidence type (double sign/double production), evidence (obtained by calling the `RPC` interface `platon_evidences`)

   **Output: **None

2. Check whether the evidence has been reported

   This interface is used to check whether the evidence to be reported has been used before initiating a report (already reported), after the user obtains the evidence by calling the `RPC` interface, he can first call the interface to check whether the evidence has been reported to avoid repeated reporting. Because the reporting interface requires a lot of cost, and regardless of whether the evidence has been reported (used) or not, the cost of the transaction will still be spent. So this interface can provide pre-check, all input parameters of this interface are parsed from the evidence list returned by the `RPC` interface `platon_evidences`.

   **Enter: **Evidence type (double sign/double production), node ID, block height to which the violation belongs

   **Output: **Transaction Hash (If the evidence has been reported, the hash of the reported transaction will be returned, otherwise empty)



### Lockup contract

This contract can be used to lock the asset to restrict its circulation within a certain period of time, it can control the total asset circulation within a certain period of time or other lock-in requirements of external personnel, When the lock-up period of the asset ends, the asset will be automatically transferred to the receiving account (the receiving account after unlocking entered when the lock plan was initiated), after the locked asset is transferred to the lock-up contract, the ownership of the asset will belong to the unlocked receiving account, the asset cannot be used for trading during the lock-up period, although it belongs to the receiving account, the funds are stored in the lock-up contract and the account balance cannot be queried, the asset can only be obtained by querying the lock-up record in the lock-up contract. The contract will release the assets to the designated unlock recipient according to the release rules specified by the person who initiated the lock, the release rule can be customized to unlock all at a certain point in time and transfer to the recipient's account, it can also be defined as splitting an asset into N shares and releasing them in M phases, setting the release time of each phase to release one part until all the locked assets are released after the M period, and each time the asset is released, the asset arrives in time. The user account can be used freely.

Assets in the locked period cannot be transferred due to restrictions, in order to compensate users for the loss of asset liquidity and benefits, this asset can be used for staking nodes and delegation nodes to revitalize funds to obtain income and offset the value dilution caused by inflation. However, when the asset is used for staking or entrusted use, the asset will not be transferred to the recipient's account after the lock-up period has expired. Instead, the asset will be transferred to the recipient's account when the user releases the staking or the delegation, the release rules of the lockup contract will be handled differently according to the use of the asset. If the funds used for staking and delegation only use part of the assets in the locked position, then when the release period is reached, it will only be released from the funds that have never been misappropriated. If the released amount is not enough, it will not be released currently but wait for the user Only release when the misappropriated funds are cancelled.

#### Contract interface

1. Create a lockup plan

   This interface is used to create an asset lock, transfer the specified amount from the initiator's account to the lock-up contract, and transfer it to the specified recipient account when the specified time is reached.

   **Enter: **Recipient account, array (multiple lock-up plans, how much funds are released at each time point)

   **Output: **None

2. Query the lock-up plan

   This interface is used to query the lock-up plan under the specified account, and the specified account is the recipient's account after unlocking.

   **Enter: **account

   **Output: **All unreleased lock-up plans under the account, including: the total funds locked up, the total funds used for staking and delegation, and the funds released at each point in time



### DelegationReward contract

The contract is mainly used to deal with the business related to delegate income. When each user delegates a node, a delegation record will be generated, each delegation record will get dividends from the delegated node, the dividend amount is calculated from the node's income according to the dividend ratio set by the node to the delegator, the total dividends allocated will be divided equally according to the total delegations of the nodes, Each delegated unit will get a certain income, so the income that a single delegation can obtain is directly proportional to the delegated volume. In this process, at the end of each settlement cycle, the system will automatically calculate the dividend rewards of each candidate node to all its delegators, all dividend rewards will be immediately transferred to this contract for temporary storage, that is, the income obtained by each principal is first stored in this contract, it is necessary to wait for the user to initiate a transaction for receiving revenue. At this time, the system will calculate how much delegation revenue this user has in this contract and immediately transfer it to the user's account.

#### Contract interface

1. Receive delegated rewards

   This interface is used to extract delegated rewards that the user has not yet claimed, when a single user entrusts multiple nodes to generate multiple delegations, the interface can only process the rewards for 20 delegations at a time, the rest must be re-initiated to receive the operation (the rules for receiving 20 delegated rewards are sorted according to the number of settlement cycles that have not been claimed for each delegation, the more the number of unclaimed cycles, the priority to receive the delegated awards), if the number of delegated rewards waiting to be collected is less than 20, then directly collect all of them.

   **Enter: **None

   **Output: **Array (details of each delegated reward received), including: node ID, node staking block height, delegation income

2. Query delegation reward

   This interface can be used to query all pending delegation income details of the interface initiator, you can also specify to query a certain delegation or multiple delegations, the return result will be a sorted list of income details, the sorting rule is to sort in reverse order according to the number of unclaimed settlement cycles for each delegation (the return data will not be sorted if there are less than 20 delegated rewards to be received)。

   **Enter: **None

   **Output: **Array (details of each delegated income to be received), including: node ID, delegated income, node staking block height

