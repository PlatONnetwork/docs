---
id: Join_PlatON_NetWork
title: Join the PlatON network
sidebar_label: Join the PlatON network
---

## Overview

Currently PlatON  has two public networks.  One is the PlatON main network that has not yet been officially launched and operates independently. The chain ID is 100.

The other is the test network Baley World, which has been officially launched on 2020-2-20 Beijing time, and is open to developers. The chain ID is 101.



## Preparation

Before joining the PlatON public network, please ensure that the server has the following conditions：

- The PlatON node has been installed and the wallet file and node key have been created according to the instructions of [Installing a Node](/docs/en/Install_Node).

This section assumes that the server is Ubuntu 18.04, and the working directory the executable file is `~/platon-node`. Note that all subsequent commands should be run under the same working directory.




## Join the Main Network

The mainnet has not been officially launched yet.



## Join the Baley Network

Anyone or any organization can join PlatON test network.

###Start as a validation node

**Execute the following command to join the Baley World as a validation node**

```bash
nohup platon --identity platon --datadir ./data --port 16789 --testnet --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 3 --rpcaddr 127.0.0.1 --syncmode "full" > ./data/platon.log 2>&1 &
```

**Prompt：**

| **Parameters** | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| --identity     | Specify the network name                                     |
| --datadir      | Specify the data directory path                              |
| --rpcaddr      | Specify rpc server address                                   |
| --rpcport      | Specifying the RPC protocol communication port               |
| --rpcapi       | Specify the rpcapi name open by the node                     |
| --rpc          | Specify http-rpc communication method                        |
| --nodekey      | Specify the node private key file                            |
| --cbft.blskey  | Specify the node bls private key file                        |
| --testnet      | Specify to connect to the test network (Default: main network) |
| --syncmode     | fast: Fast synchronization mode, full: All synchronous mode  |
| --db.nogc      | Enable archive mode                                          |

See more parameters with the command `platon --help`

When PlatON is successfully started, under normal circumstances, it will automatically establish a connection with the node closest to it through the node discovery protocol. After the connection is successful, block synchronization will be started. You can determine whether joining the network successfully by looking at the peers of the node and confirming whether the block height of the node is increasing.



### Enter `PlatON` console

```bash
platon attach http://localhost:6789
```

### View peers of a node

```bash
> admin.peers
[{
    caps: ["cbft/1", "platon/62", "platon/63"],
    id: "0dd4e447cf23f4bfc94b1568bae626bf4894ce2e9d5ca474e3cc73ec7e9d4de550fffc1e2fc64cca25d42aecf6169cf8f8c0f4fe6adb847c33dc6ceb6f001bd1",
    name: "PlatONnetwork/platon/v0.8.0-unstable-c5fc6b19/linux-amd64/go1.11.11",
    network: {
      consensus: true,
      inbound: true,
      localAddress: "127.0.0.1:16789",
      remoteAddress: "127.0.0.1:47706",
      static: false,
      trusted: false
    },
    protocols: {
      cbft: {
        commitBn: 0,
        highestQCBn: 0,
        lockedBn: 0,
        protocolVersion: 1
      },
      platon: {
        head: "0x88a4fe315ce13b3010abf4ab5d120f25a21ac2ccae8ec563ad259e47e24b24bc",
        number: 0,
        version: 63
      }
    }
},
...
]
```



### View the current block height

You can get the block height of the current node by executing the following command in the `PlatON` console.

```bash
> platon.blockNumber
2235
```

A series of test network nodes appear in the node list and the block height is increasing, indicating that the connection is successful.
