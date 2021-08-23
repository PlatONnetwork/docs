---
id: PlatEye
title: PlatEye
sidebar_label: PlatEye
---

PlatEye is a professional blockchain explorer for PlatON and Alaya networks. Based on the professional in-depth analysis of on-chain data, it provides the community with massive data and versatile data analysis and query functions. Through PlatEye, you can query information such as blocks, transactions, account addresses, nodes, large account addresses, and large transactions.

Access to PlatON blockchain:[https://www.plateye.com](https://www.plateye.com)



## Major Technique

PlatEye employs Apache Flink, a high-throughput, low-latency distributed streaming data processing framework, for statistics on the latest data. Data that need to be retrieved, e.g. transactions and contracts, are processed and stored in the Elastic Search cluster. Data can be queried and retrieved within milliseconds using the MySql database. The front-end uses the Vue.js framework, while the back-end uses Java, separate from each other in development. The CDN uses Cloudflare. The information on the chain is accessed through the node rpc. Meanwhile, the client needs to be modified to obtain the transactions in the current transaction pool, which is used to work out the relationship between the time the transactions are packaged in the transaction pool and the gas.



## Function Description

### Home page

- The home page of the explorer displays the latest information on the current ATP. The latest block and the list of the lastest transactions are displayed in scroll bars.
- There is a block/address/transaction search bar where you can query block/address/transaction information through the query function provided by the explorer.

### Query

You can query specific information about a block, address, and transaction by entering the block height, address or transaction hash value respectively.

### Address holding ranking

PlatEye Browser provides a function to view the ranking of address positions.  Addresses can be ranked by total amount, liquidity amount, locked position amount, and total pledged amount. Click on an address to jump to the address details page to see the details of that address.

### Transaction list and transaction details view

A list showing all transactions and you can view the detailed information of a given transaction.

### On-chain information monitoring

You can view the transaction list and detailed information, monitor large transactions, check lock-up balance and lock-up plans, etc.

### Ranking of nodes and node details

You can view the node list. The details page provides the relevant data of the node with a snapshot available for download.

### Token list and transactions

You can view the list of PRC20 and PRC721 tokens, with details of the token name, holder and corresponding contract, as well as the list of transactions corresponding to the token.



## Functions under Development

### Gas station

For the statistics of gas consumed and the estimation of gas required for transactions.

### Smart contract module

To display smart contracts deployed on the Alaya network, open-source code, contract interface data, etc.

### DApp

To display DApps in the current ecosystem and submit a DApp.









