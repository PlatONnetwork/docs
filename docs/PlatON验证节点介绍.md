---
id: PlatON_Validation_Introduce
title: Intro to validator
sidebar_label: Intro to validator
---

### What is a validator?

PlatON is a blockchain project that implements democratic governance. Validators are jointly selected by all LAT holders to maintain and develop the PlatON network. The 201 nodes with the most votes will become alternative nodes, from which 43 validators will be randomly selected by VRF to participate in the management of the entire PlatON network. The responsibilities of a validator are:

- Maintaining PlatON nodes and network
- Production and validating the blocks
- Proposal voting and decision-making

### Basic requirements to become a validator

#### Minimum staking requirements

Minimum staking of 100,000 LAT is required and additional staking can be made, but all staking can only be canceled at once. If the actual staking is lower than the minimum staking due to penalties or other reasons., the node will automatically be removed from the list of alternative node candidates.

#### Recommended configurations

- Server: Server or backup server running PlatON software (firewall required)
- Memory: 8GB RAM 
- Local storage: 100GB system disk, 200GB data disk (online scalable)
- Processor: 64-Bit 4 core (each core 2.4 GHz or higher)
- Bandwidth: 5 MB/s (online scalable)

#### Software requirements

- Linux: Ubuntu 18.04 or higher
- Clock synchronization: NTP
- User tools: Node management tools (mtool or other open sources/ self-developed tools)

#### Operation requirements

- Network monitoring and real-time support
- 99.9% uptime
- Cross-regional failure recovery and data backup
- Safety and security measures
- Support software upgrade

### How to be a validator?

Firstly, make sure you have a balance of 100,000 LAT in your staking account, locked or unlocked. Secondly, you have to own a server with recommended configurations mentioned above. When you meet the above two conditions, staking can be made [Become a mainnet validator](/docs/en/Become_PlatON_Main_Verification/).

Please refer to [Role Description](/docs/en/Economic_Model#role-description) for node-related terms and role descriptions.

### What rewards will I get for being a validator?

#### Source of reward

The source of reward consists of two parts:

- [Offerings](/docs/en/Economic_Model#incentives): Each year, 2.5% of the total of the previous year is offered in increments, and 80% of the offerings (which is 2% of the total) enter the reward pool
- [Foundation subsidy](/docs/en/Economic_Model#incentives): Equivalent to 3% of the total initial allocation. Allocated in the first 10 years. Keep the node reward pool the same every year

### Node Rewards

Node reward consists of three parts:

- [Block generation reward](/docs/en/Economic_Model#incentives): For each block produced, the validator will receive a fixed amount of LAT as a reward. 1/2 of the total annual node reward pool is used as block generation reward, which is distributed evenly based on the number of blocks per year (about 28,688,727).
- [Transaction Fee](/docs/en/Economic_Model#incentives): The fees for packaging transactions are all charged by validators who package the blocks.
- [Staking reward](/docs/en/Economic_Model#incentives): 1/2 of the total node reward pool is used as Staking reward, which is distributed evenly based on the number of Staking epochs per year (about 2668). Each staking epoch is (10,750 blocks, around 3 hours). Upon completion, the reward is distributed evenly to all alternative nodes.

#### [Delegator reward](/docs/en/Economic_Model#delegated-award)

  Staking rewards are issued to validators and alternative nodes, which will distribute them to the relevant delegators according to the set dividend proportion.

### What acts will be punished

### [Zero block generation penalty](/docs/en/Economic_Model#zero-block-the-system-automatically-judges-and-punishes)

- A consensus round is selected as a validator, and if no blocks are produced or all blocks produced are not confirmed by other validators, it is determined that there are zero blocks generated;
- Zero blocks were generated in a consensus round. If no blocks are produced in the following 20 consensus rounds (about 2 hours and a half), there will be a penalty equivalent to the block generation rewards of 2500 blocks, and the node qualification will be restricted. If the staking is less than 100,000 LAT after the penalty, [the status as an alternative node candidate will be revoked](/docs/en/Economic_Model#platons-way-of-punishment).

- A consensus round is selected as a validator, and if no blocks are produced or all blocks produced are not confirmed by other validators, it is determined that there are zero blocks generated;
- If a node generates zero blocks in a consensus round and does not produce blocks for the next 20 consensus rounds (about 2 hours and a half), it will receive the penalty, which is a deduction of LAT equivalent to the block generation rewards of 2500 blocks,

#### [Dual signing](/docs/en/Economic_Model#duplicateprepareduplicatevote-manual-reporting-and-systematic-penalties)

- Producing or signing multiple blocks in the same block height is deem as dual signing;
- Except for the revocation of nodes, a dual signing requires [a deduction of 10‰ of its staking](/docs/en/Economic_Model#platons-way-of-punishment);
- Anyone can report a dual signing, and after the current validator verifies and reaches consensus, the reported person will be recognized as a violation and punished. 50% of the penalty is given to the informer and 50% is placed in the reward pool for the next year's block generation and Staking rewards.

> Restrict the status for nodes: Temporary disqualification of the nodes, locking 56 epochs, during which period one cannot be a validator and cannot participate in block generation, and there will be no Staking rewards.
> Revocation of nodes: The staking is forcibly unsecured and the violator would be kicked out from the list of alternative node candidates. The staking LAT is returned to the original staking account after 168 Epochs, and cannot be re-staked as a new node during the pledge freeze period, and the original delegation relationship is abolished after re-staking.
> Deduct Staking LAT: Deduct LAT from the staking of the node and place the amount into the reward pool for block generation and staking rewards in the second year. If the staking is less than 100,000 LAT after the penalty, the node would be revoked.

### How to participate in the governance

In PlatON, governance is done through on-chain proposal voting with the following types of proposals:

- [Text proposal](/docs/en/PlatON_Governance_Solution#proposal-classification): Decisions that could be implemented without code can be initiated with a text proposal.

- [Upgrade proposal](/docs/en/PlatON_Governance_Solution#span-idupgradeupgrade-mechanismspan): Used for initiating version upgrade voting on the chain for smooth upgrade purposes.

- [Parameter proposal](/docs/en/PlatON_Governance_Solution#governance-parameters): Used for modifying the governable parameters such as system parameters.

- [Cancel proposal](/docs/en/PlatON_Governance_Solution#quick-upgrade): Used for canceling a software upgrade or parameter modification proposal which is being voted on the chain.
