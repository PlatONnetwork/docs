---
id: Command_Line_Tools
title: PlatON Command Line Tools
sidebar_label: PlatON Command line tools
---

## Introducing the program PlatON instructions 

```conf
NAME:
   platon.exe - the go-platon command line interface

   Copyright 2013-2018 The PlatON-Go Authors

USAGE:
   platon.exe [options] command [command options] [arguments...]

VERSION:
   1.8.16-stable-401329c1

COMMANDS:
   account           Manage accounts
   attach            Start an interactive JavaScript environment (connect to node)
   bug               opens a window to report a bug on the platon repo
   console           Start an interactive JavaScript environment
   copydb            Create a local chain from a target chaindata folder
   dump              Dump a specific block from storage
   dumpconfig        Show configuration values
   export            Export blockchain into file
   export-preimages  Export the preimage database into an RLP stream
   import            Import a blockchain file
   import-preimages  Import the preimage database from an RLP stream
   init              Bootstrap and initialize a new genesis block
   js                Execute the specified JavaScript files
   license           Display license information
   makecache         Generate ethash verification cache (for testing)
   makedag           Generate ethash mining DAG (for testing)
   monitor           Monitor and visualize node metrics
   removedb          Remove blockchain and state databases
   version           Print version numbers
   wallet            Manage Ethereum presale wallets
   help, h           Shows a list of commands or help for one command

ETHEREUM OPTIONS:
  --config value                                        TOML configuration file
  --datadir "C:\Users\jungle\AppData\Roaming\Ethereum"  Data directory for the databases and keystore
  --keystore                                            Directory for the keystore (default = inside the datadir)
  --nousb                                               Disables monitoring for and managing USB hardware wallets
  --networkid value                                     Network identifier (integer, 1=Frontier, 2=Morden (disused), 3=Ropsten, 4=Rinkeby) (default: 1)
  --testnet                                             Ropsten network: pre-configured proof-of-work test network
  --rinkeby                                             Rinkeby network: pre-configured proof-of-authority test network
  --syncmode "full"                                     Blockchain sync mode ("fast", "full", or "light")
  --gcmode value                                        Blockchain garbage collection mode ("full", "archive") (default: "full")
  --ethstats value                                      Reporting URL of a ethstats service (nodename:secret@host:port)
  --identity value                                      Custom node name
  --lightserv value                                     Maximum percentage of time allowed for serving LES requests (0-90) (default: 0)
  --lightpeers value                                    Maximum number of LES client peers (default: 100)
  --lightkdf                                            Reduce key-derivation RAM & CPU usage at some expense of KDF strength

DEVELOPER CHAIN OPTIONS:
  --dev               Ephemeral proof-of-authority network with a pre-funded developer account, mining enabled
  --dev.period value  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)

ETHASH OPTIONS:
  --ethash.cachedir                                 Directory to store the ethash verification caches (default = inside the datadir)
  --ethash.cachesinmem value                        Number of recent ethash caches to keep in memory (16MB each) (default: 2)
  --ethash.cachesondisk value                       Number of recent ethash caches to keep on disk (16MB each) (default: 3)
  --ethash.dagdir "C:\Users\jungle\AppData\Ethash"  Directory to store the ethash mining DAGs (default = inside home folder)
  --ethash.dagsinmem value                          Number of recent ethash mining DAGs to keep in memory (1+GB each) (default: 1)
  --ethash.dagsondisk value                         Number of recent ethash mining DAGs to keep on disk (1+GB each) (default: 2)

TRANSACTION POOL OPTIONS:
  --txpool.locals value         Comma separated accounts to treat as locals (no flush, priority inclusion)
  --txpool.nolocals             Disables price exemptions for locally submitted transactions
  --txpool.journal value        Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
  --txpool.rejournal value      Time interval to regenerate the local transaction journal (default: 1h0m0s)
  --txpool.pricelimit value     Minimum gas price limit to enforce for acceptance into the pool (default: 1)
  --txpool.pricebump value      Price bump percentage to replace an already existing transaction (default: 10)
  --txpool.accountslots value   Minimum number of executable transaction slots guaranteed per account (default: 16)
  --txpool.globalslots value    Maximum number of executable transaction slots for all accounts (default: 4096)
  --txpool.accountqueue value   Maximum number of non-executable transaction slots permitted per account (default: 64)
  --txpool.globalqueue value    Maximum number of non-executable transaction slots for all accounts (default: 1024)
  --txpool.globaltxcount value  Maximum number of transactions for package (default: 3000)
  --txpool.lifetime value       Maximum amount of time non-executable transaction are queued (default: 3h0m0s)

PERFORMANCE TUNING OPTIONS:
  --cache value            Megabytes of memory allocated to internal caching (default: 1024)
  --cache.database value   Percentage of cache memory allowance to use for database io (default: 75)
  --cache.gc value         Percentage of cache memory allowance to use for trie pruning (default: 25)
  --trie-cache-gens value  Number of trie node generations to keep in memory (default: 120)

ACCOUNT OPTIONS:
  --unlock value    Comma separated list of accounts to unlock
  --password value  Password file to use for non-interactive password input

API AND CONSOLE OPTIONS:
  --rpc                  Enable the HTTP-RPC server
  --rpcaddr value        HTTP-RPC server listening interface (default: "localhost")
  --rpcport value        HTTP-RPC server listening port (default: 6789)
  --rpcapi value         API's offered over the HTTP-RPC interface
  --ws                   Enable the WS-RPC server
  --wsaddr value         WS-RPC server listening interface (default: "localhost")
  --wsport value         WS-RPC server listening port (default: 6790)
  --wsapi value          API's offered over the WS-RPC interface
  --wsorigins value      Origins from which to accept websockets requests
  --ipcdisable           Disable the IPC-RPC server
  --ipcpath              Filename for IPC socket/pipe within the datadir (explicit paths escape it)
  --rpccorsdomain value  Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --rpcvhosts value      Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --jspath loadScript    JavaScript root path for loadScript (default: ".")
  --exec value           Execute JavaScript statement
  --preload value        Comma separated list of JavaScript files to preload into the console

NETWORKING OPTIONS:
  --bootnodes value     Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)
  --bootnodesv4 value   Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)
  --bootnodesv5 value   Comma separated enode URLs for P2P v5 discovery bootstrap (light server, light nodes)
  --port value          Network listening port (default: 16789)
  --maxpeers value      Maximum number of network peers (network disabled if set to 0) (default: 25)
  --maxpendpeers value  Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
  --nat value           NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
  --nodiscover          Disables the peer discovery mechanism (manual peer addition)
  --v5disc              Enables the experimental RLPx V5 (Topic Discovery) mechanism
  --netrestrict value   Restricts network communication to the given IP networks (CIDR masks)
  --nodekey value       P2P node key file
  --nodekeyhex value    P2P node key as hex (for testing)

MINER OPTIONS:
  --mine                         Enable mining
  --miner.threads value          Number of CPU threads to use for mining (default: 0)
  --miner.notify value           Comma separated HTTP URL list to notify of new work packages
  --miner.gasprice "1000000000"  Minimum gas price for mining a transaction
  --miner.gastarget value        Target gas floor for mined blocks (default: 3150000000)
  --miner.gaslimit value         Target gas ceiling for mined blocks (default: 3150000000)
  --miner.etherbase value        Public address for block mining rewards (default = first account) (default: "0")
  --miner.extradata value        Block extra data set by the miner (default = client version)
  --miner.recommit value         Time interval to recreate the block being mined (default: 3s)
  --miner.noverify               Disable remote sealing verification

GAS PRICE ORACLE OPTIONS:
  --gpoblocks value      Number of recent blocks to check for gas prices (default: 20)
  --gpopercentile value  Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)

VIRTUAL MACHINE OPTIONS:
  --vmdebug         Record information useful for VM and contract debugging
  --vm.evm value    External EVM configuration (default = built-in interpreter)
  --vm.ewasm value  External ewasm configuration (default = built-in interpreter)

LOGGING AND DEBUGGING OPTIONS:
  --fakepow                 Disables proof-of-work verification
  --nocompaction            Disables db compaction after import
  --verbosity value         Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)
  --vmodule value           Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)
  --backtrace value         Request a stack trace at a specific logging statement (e.g. "block.go:271")
  --debug                   Prepends log messages with call-site location (file and line number)
  --pprof                   Enable the pprof HTTP server
  --pprofaddr value         pprof HTTP server listening interface (default: "127.0.0.1")
  --pprofport value         pprof HTTP server listening port (default: 6060)
  --memprofilerate value    Turn on memory profiling with the given rate (default: 524288)
  --blockprofilerate value  Turn on block profiling with the given rate (default: 0)
  --cpuprofile value        Write CPU profile to the given file
  --trace value             Write execution trace to the given file
  --wasmlog value           output wasm contract log to file

METRICS AND STATS OPTIONS:
  --metrics                          Enable metrics collection and reporting
  --metrics.influxdb                 Enable metrics export/push to an external InfluxDB database
  --metrics.influxdb.endpoint value  InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")
  --metrics.influxdb.database value  InfluxDB database name to push reported metrics to (default: "platon")
  --metrics.influxdb.username value  Username to authorize access to the database (default: "test")
  --metrics.influxdb.password value  Password to authorize access to the database (default: "test")
  --metrics.influxdb.host.tag host   InfluxDB host tag attached to all measurements (default: "localhost")

WHISPER (EXPERIMENTAL) OPTIONS:
  --shh                       Enable Whisper
  --shh.maxmessagesize value  Max message size accepted (default: 1048576)
  --shh.pow value             Minimum POW accepted (default: 0.2)
  --shh.restrict-light        Restrict connection between two whisper light clients

DEPRECATED OPTIONS:
  --minerthreads value     Number of CPU threads to use for mining (deprecated, use --miner.threads) (default: 0)
  --targetgaslimit value   Target gas floor for mined blocks (deprecated, use --miner.gastarget) (default: 3150000000)
  --gasprice "1000000000"  Minimum gas price for mining a transaction (deprecated, use --miner.gasprice)
  --etherbase value        Public address for block mining rewards (default = first account, deprecated, use --miner.etherbase) (default: "0")
  --extradata value        Block extra data set by the miner (default = client version, deprecated, use --miner.extradata)

MPC COMPUTE OPTIONS:
  --mpc              Enable mpc compute
  --mpc.actor value  The address of actor to exec mpc compute
  --mpc.ice value    Filename for ice to init mvm

MISC OPTIONS:6
  --help, -h  show help


COPYRIGHT:
   Copyright 2013-2018 The PlatON-Go Authors
```

## Common rpc commands

- Description
  - The rpc port is changed according to the actual startup command, the default is:6789

### admin

- View the current node data directory

  ```bash
  platon attach http://localhost:6789 -exec admin.datadir
  ```

- View the ChainID of the current node

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.chainId
  ```

- View the id of the current node

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.id
  ```

- View the blsPubKey of the current node

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.blsPubKey
  ```

- View the p2p port number of the current node

  ```
  platon attach http://localhost:6789 -exec admin.nodeInfo.ports.listener
  ```

- View the connection information of peers of the current node

  ```bash
  platon attach http://localhost:6789 -exec admin.peers
  ```

- View the genesis block hash of the current node

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.genesis
  ```

- View the maximum number of blocks ($amount) of a single node in each consensus round of cbft consensus

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.cbft.amount
  ```

- View the time window of block generation by a single node in each consensus round of cbft consensus ($period, unit: ms)

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.cbft.period
  ```

  > **Blocking time interval = period / 1000 / amount**

- Get the binary version number and signature information

  ```bash
  platon attach http://localhost:6789 -exec 'admin.getProgramVersion()'
  ```

- Obtain zero- knowledge proof information (use the node's private key to prove whether the certificate issued by the interface is correct and used for node pledge)

  ```bash
  platon attach http://localhost:6789 -exec 'admin.getSchnorrNIZKProve()'
  ```

- View the type of virtual machine used at the bottom (EVM / WASM)

  ```bash
  platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.interpreter
  ```

### platon

- View all wallet addresses under the current node

  ```bash
  platon attach http://localhost:6789 -exec platon.accounts
  ```

- View the block height of the current node

  ```bash
  platon attach http://localhost:6789 -exec platon.blockNumber
  ```

- Check the balance of the specified account ($account is the account address)

  ```bash
  platon attach http://localhost:6789 -exec 'platon.getBalance("$account")'
  ```

- Query the number of transactions in the specified block ($blockNumber is the block height or block hash of the specified block)

  ```bash
  platon attach http://localhost:6789 -exec 'platon.getBlockTransactionCount($blockNumber)'
  ```

- Query transaction information ($txHash is transaction hash)

  ```bash
  platon attach http://localhost:6789 -exec 'platon.getTransaction("$txHash")'
  ```

- Query transaction receipt ($txHash is transaction hash)

  ```bash
  platon attach http://localhost:6789 -exec 'platon.getTransactionReceipt("$txHash")'
  ```

- Query the number of transactions in the specified account (parameter $address is the account address, used to specify the nonce of the transaction when sending the transaction)

  ```bash
  platon attach http://localhost:6789 -exec 'platon.getTransactionCount("$address")'
  ```

- Query the pending transaction of the current node

  ```bash
  platon attach http://localhost:6789 -exec platon.pendingTransactions
  ```

- View the default gasPrice of the current node (unit: von)

  ```bash
  platon attach http://localhost:6789 -exec platon.gasPrice
  ```

- Estimate the gas of the transaction (parameter $transaction is the transaction details, unit: von)

  ```bash
  platon attach http://localhost:6789 -exec 'platon.estimateGas($transaction)'
  ```

  Such as:

  ```bash
  platon attach http://localhost:6789 -exec 'platon.estimateGas({from:"0x493301712671ada506ba6ca7891f436d29185821",to:"0x15fffb839e5385ad61aef90e53c4d7ff550ece7e",value:"0x10000000000000",data:"0x11",gas:"0x88888",gasprice:"0x333333",nonce:"11"})'
  ```

- View the p2p protocol number of the underlying version of the current node

  ```bash
  platon attach http://localhost:6789 -exec 'web3.toDecimal(platon.protocolVersion)'
  ```

- See if the current node is in sync

  ```bash
  platon attach http://localhost:6789 -exec platon.syncing
  ```

- Get details of specified block

  ```bash
  platon attach http://localhost:6789 -exec 'platon.getBlock($blockNumber)'
  ```

### personal

- Generate wallet (parameter is wallet password)

  ```bash
  platon attach http://localhost:6789 -exec 'personal.newAccount("88888888")'
  ```

- Import private key to generate wallet

  ```bash
  platon attach http://localhost:6789 -exec 'personal.importRawKey($privateKey, $password)'
  ```

  > Parameters:
  >
  >- privateKey: private key, remove the leading 0x
  >- password: wallet password
  >
  > Back to:
  >
  >- Wallet address

  example:

  ```bash
  platon attach http://localhost:6789 -exec 'personal.importRawKey ("842d943dbb50a8d3fe63af2f82fda3d8f0ca817fe8d47e61698142bac7c24212", "88888888")'
  ```

- View account address

  ```bash
  platon attach http://localhost:6789 -exec 'personal.listAccounts'
  ```

- View local wallet information, including wallet address, wallet file path, wallet status

  ```bash
  platon attach http://localhost:6789 -exec 'personal.listWallets'
  ```

- Lock account

  ```bash
  platon attach http://localhost:6789 -exec 'personal.lockAccount(platon.accounts[0])'
  ```

- Unlock account

  ```bash
  platon attach http://localhost:6789 -exec 'personal.unlockAccount(platon.accounts[0], "88888888", 24*3600)'
  ```

  > Parameters:
  >
  > - Account address
  > - Wallet password
  > - Unlock time in seconds

- Send unsigned transactions
  ```shell
  platon attach http://localhost:6789 -exec 'personal.sendTransaction({from: platon.accounts[2], to: platon.accounts[0], value:web3.toVon("0.1","lat"), nonce: platon.getTransactionCount(platon.accounts[2])}, "88888888") '
  ```

### net

- View the networkid of the current node

  ```bash
  platon attach http://localhost:6789 -exec net.version
  ```

- Check whether the p2p port of the current node is in the listening state

  ```bash
  platon attach http://localhost:6789 -exec net.listening
  ```

- View the number of peer connections of the current node

  ```bash
  platon attach http://localhost:6789 -exec net.peerCount
  ```

### debug

- Query current node economic model configuration parameters

  ```bash
  platon attach http://localhost:6789 -exec 'debug.economicConfig()'
  ```

- Set log level

  ```shell
  platon attach http://localhost:6789 -exec 'debug.verbosity(4)'
  ```

  > Log level description:
  >
  > 0: CRIT
  >
  > 1: ERROR
  >
  > 2: WARN
  >
  > 3: INFO
  >
  > 4: DEBUG
  >
  > 5: TRACE