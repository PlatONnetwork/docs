---
id: PlatEye
title: PlatEye
sidebar_label: PlatEye
---

The PlatEye blockchain browser project aims to enrich blockchain browser functionality, as well as professional data mining of on-chain data, while driving traffic to the portal, increasing ecological exposure, increasing the trustworthiness and transparency of Alaya and PlatON's blockchain, and creating a user-friendly and professional Alaya/PlatON blockchain browser. https://www.alayascan.com can be accessed.

## Key Technologies

Use Apache Flink, a high-throughput, low-latency distributed streaming data processing framework, to perform statistics on the latest data. The data such as transactions and contracts that need to be retrieved are processed and stored in Elastic Search cluster, which supports millisecond query retrieval, combined with MySql database. The front-end uses Vue.js framework, the back-end uses java, using the front-end and back-end separated development method development, CDN using Cloudflare. chain information through the node rpc to obtain. Also need to modify the client to get the current transactions in the transaction pool, used to count the relationship between the transaction was packed time and gas cost in the transaction pool.

## Function description

### Home page

* Home page of the browser displays the latest information of the current ATP, and scrolls the list of the latest blocks and the latest transactions.
* Provide block/address/transaction search bar, you can use the query function provided by the browser to query block/address/transaction information.

### Query function

The search box in the Header or the browser home page can be queried by entering the block height, address or transaction hash value, and return the specific information of the block, address and transaction respectively.

### Address Position Ranking

PlatEye Browser provides a function to view the ranking of address positions. Click on the block chain in the navigation bar and click on the address to view the list of addresses and their ranking information. Addresses can be ranked by total amount, liquidity amount, locked position amount, and total pledged amount. Click on an address to jump to the address details page to see the details of that address.

### On-chain information monitoring

View transaction list and details, monitor large transactions, lockup balance statistics, etc.

### Node list ranking and node details view

You can view the node list, the detail page statistics related to this node, and provide snapshot download.


## Browser public API usage instructions

* Interface documentation
  * Document description: http://129.226.175.12:54444/file/docs/#/home
  * BasePath: http://129.226.175.12:54444/alaya-api/
  * You can use postman to test the interface
* Home page interface
  * Base data: /alaya-api/home/chainStatistic. push ATP base data, such as current height, outgoing block node ID, etc.
  * Outgoing block trend: /alaya-api/home/blockStatistic. push the latest 50 outgoing block trend data.
  * Verifier list: /alaya-api/home/stakingList. push the latest 8 verifiers.
* Address Interface
  * Address details: /alaya-api/address/details. returns details such as the specified address.
  * Address lockout details: /alaya-api/address/rpplanDetail. queries real-time lockout balance information and lockout plans on the chain.
* Block interface
  * Block List: /alaya-api/block/blockList. push the full list of outgoing blocks.
  * Node block list: /alaya-api/block/blockListByNodeId. push all out block list of specified node.
  * Block details: /alaya-api/block/blockDetails. returns the details of the specified block.
* Node Interface
  * Aggregate data: /alaya-api/staking/statistic. pushes the aggregate data of all nodes of ATP, once every 5 seconds.
  * Real-time node list: /alaya-api/staking/aliveStakingList. push all real-time verification nodes.
  * History node list: /alaya-api/staking/historyStakingList. push the list of exiting nodes.
  * Locked node list: /alaya-api/staking/lockedStakingList. Push a list of nodes with zero exit penalty.
  * Node details: /alaya-api/staking/stakingDetails. provides verification node details view function.
  * Node Operation Record: /alaya-api/staking/stakingOptRecordList. provides node operation record query function, such as creating proposal, voting, etc.
  * Node Delegation List: /alaya-api/staking/delegationListByStaking. provides query function for node related delegate list.
  * Address Delegation List: /alaya-api/staking/delegationListByAddress. address-related delegation list query function.
* Transaction interface
  * Transaction List: /alaya-api/transaction/transactionList. push all transaction list.
  * Block Transaction List: /alaya-api/transaction/transactionListByBlock. pushes the list of block related transactions.
  * Transaction List by Address: /alaya-api/transaction/transactionListByAddress. pushes the list of address-related transactions.
  * Transaction details: /alaya-api/transaction/transactionDetails. returns the details of the specified transaction.
  * Address Claims List: /alaya-api/transaction/queryClaimByAddress. returns the list of all nodes claiming rewards under the current address.
  * Node-related claim list: /alaya-api/transaction/queryClaimByStaking. node-related claim list query function.









