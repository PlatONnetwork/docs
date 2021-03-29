---
id: Join_PlatON_NetWork
title: Join the PlatON network
sidebar_label: Join the PlatON network
---

## Overview

PlatON mainnet launch date to be determined, Chainid to be determined.The PlatON development network, which will be open to developers, is set to launch on March 10, 2021 (Chainid: 210309).



## Preparation

Before joining the PlatON public network, please ensure that the server has the following conditions:

- The PlatON node has been installed and the wallet file and node key have been created according to the instructions of [Installing a Node](/docs/en/Install_Node).

This section assumes that the server is Ubuntu 18.04, and the working directory of the executable file is `~/platon-node`. Note that all subsequent commands should be run under the same working directory.

```bash
cd ~/platon-node
```




## Join the Main Network

Anyone or any organization can join PlatON main network.

### Start as a validator node

Execute the following command to start the verification node to join the main network of Platon (please access it after the main network is online)

```bash
nohup platon --identity platon --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**Prompt:**

| **Parameters** | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| --identity     | Specify the network name                                     |
| --datadir      | Specify the data directory path                              |
| --port         | Specifying the P2P protocol communication port               |
| --rpcaddr      | Specify rpc server address                                   |
| --rpcport      | Specifying the RPC protocol communication port               |
| --rpcapi       | Specify the rpcapi name open by the node                     |
| --rpc          | Specify http-rpc communication method                        |
| --nodekey      | Specify the node private key file                            |
| --cbft.blskey  | Specify the node bls private key file                        |
| --verbosity    | The level of logging, 0: CRIT;  1: ERROR; 2: WARN;  3: INFO;  4: DEBUG; 5: TRACE |
| --syncmode     | fast: Fast synchronization mode, full: All synchronous mode  |
| --db.nogc      | Enable archive mode                                          |

See more parameters with the command `platon --help`

## Join the PlatON Develop Network

The development network provides a development test environment for the developer or node.There may be instability and a network reset.The current version of the development network is 1.0.0.

### Develop network related resources

> - platon：https://download.platon.network/platon/platon/1.0.0/platon
> - platonkey：https://download.platon.network/platon/platon/1.0.0/platonkey
>
> - mtool windows：https://download.platon.network/platon/mtool/windows/1.0.0/platon_mtool.exe
>
> - mtool linux：https://download.platon.network/platon/mtool/linux/1.0.0/platon_mtool.zip
>
>  > You need to change the chain ID in the configuration file config.properties to the development network chain ID: 210309；
>
> - samurai：
> - Open the RPC URL:http://47.241.98.219:6789 and ws://47.241.98.219:6790
> - Scan Browser Address: https://devnetscan.platon.network



### Initialize the genesis block

- Save the genesis block file

  Save the following to the genesis.json file:

  ```bash
  cd ~/platon-node && wget https://download.platon.network/platon/platon/1.0.0/genesis.json
  ```

- Initialize the genesis block file

  Executive command:

  ```shell
  cd ~/platon-node && platon --datadir ./data init genesis.json
  ```

  > Description:
  >
  > A prompt for `Successfully wrote genesis state` indicates that the initialization creation information is complete.


### Start as a validator node

Please refer to [Install node](/docs/en/Install_Node) section to create a nodekey: nodekey, blskey, and then execute the following command to start the verification node to join the PlatON development network;If you need to become a verification node, please apply for a large test LAT by following instructions (the development network will be reset irregularly according to the test needs, and the LAT of the develop network has no practical value).

```bash
cd ~/platon-node/ && nohup platon --identity platon-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://c72a4d2cb8228ca6f9072daa66566bcafa17bec6a9e53765c85c389434488c393357c5c7c5d18cf9b26ceda46aca4da20755cd01bcc1478fff891a201042ba84@devnetnode1.platon.network:16789 --syncmode "fast" > ./data/platon.log 2>&1 &
```

### Other

If you need to receive large amount of test LAT, please send an email to support@latticex.foundation according to the format requirements. The email requirements are:

```toml
Title: PlatON Develop Network Token Application
Name:
Contact Information:
WeChat ID (or other instant messaging software) :
Application amount:
USES:
Receipt account:
Remark:
```

## View node status

When PlatON is successfully started, under normal circumstances, it will automatically establish a connection with the node closest to it through the node discovery protocol. After the connection is successful, block synchronization will be started. You can determine whether joining the network successfully by looking at the peers of the node and confirming whether the block height of the node is increasing.

If the key is not generated in advance, the node is automatically generated in the node's data directory at startup. If it is automatically generated, only the node private key and BLS private key will be generated, and the relevant public key will not be automatically generated.



### Enter `PlatON ` console

```bash
platon attach http://localhost:6789
```

> Print `Welcome to the Platon JavaScript Console!` Relevant information, indicating successful access to the console, otherwise it will be deemed as failure to access the console, if there is any problem, you can contact the official customer service personnel.

### View peers of a node

View the connection node information by executing the following command in the Platon console.

```bash
admin.peers
```

> If the related Peers information is printed, it means that the connected node is successful, as follows:
>
> [{
>     caps: ["cbft/1", "platon/63"],
>     id: "c72a4d2cb8228ca6f9072daa66566bcafa17bec6a9e53765c85c389434488c393357c5c7c5d18cf9b26ceda46aca4da20755cd01bcc1478fff891a201042ba84",
>     name: "PlatONnetwork/alaya-47.241.93.189/v1.0.0-unstable-62b9a900/linux-amd64/go1.13.4",
>     network: {
>       consensus: false,
>       inbound: false,
>       localAddress: "192.168.2.128:55572",
>       remoteAddress: "47.241.93.189:16789",
>       static: false,
>       trusted: false
>     },
>     protocols: {
>       cbft: {
>         commitBn: 1404934,
>         highestQCBn: 1407304,
>         lockedBn: 1404935,
>         protocolVersion: 1
>       },
>       platon: {
>         head: "0xf31395262f876935c94e33b1d9f3314b2cb6effc33fcffa3b17b725678fd525f",
>         number: 1407295,
>         version: 63
>       }
>     }
> }
>
> ...]
>
> If the printed information is empty, it means that the connection node failed. If there is any problem, you can contact the official customer service personnel.

### View the current block height

View the block height of the current node by executing the following command in the Platon console.

```bash
platon.blockNumber
```

> - Execute this command several times, if the block height value increases continuously, then the connection is successful;
>
> - If it is a new node and the block height is always 0, it means that the node is in the synchronous block and there may be delay. You can use the command:
>
>   ```bash
>   platon.syncing
>   ```
>
>   - If `false` is printed, the node is not in a synchronous block state.
>
>   - If the following message is printed, the node is in a synchronous block state;
>
>     ```json
>     {
>       currentBlock: 1412416,
>       highestBlock: 1416699,
>       knownStates: 522,
>       pulledStates: 522,
>       startingBlock: 1408247
>     }
>     ```

### Exit console

Type Exit to exit the console.