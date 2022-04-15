---
id: Command_Line_Tools
title: Command line tools
sidebar_label: Command line tools
---

## Introducing the program PlatON instructions 

```conf
NAME:
   platon - the platon-go command line interface

   Copyright 2019 The PlatON-Go Authors

USAGE:
   platon [options] command [command options] [arguments...]
   
VERSION:
   1.2.1-unstable
   
COMMANDS:
   account                Manage accounts
   attach                 Start an interactive JavaScript environment (connect to node)
   console                Start an interactive JavaScript environment
   copydb                 Create a local chain from a target chaindata folder
   dump                   Dump a specific block from storage
   dumpconfig             Show configuration values
   export-preimages       Export the preimage database into an RLP stream
   import-preimages       Import the preimage database from an RLP stream
   init                   Bootstrap and initialize a new genesis block
   inspect                Inspect the storage size for each type of data in the database
   js                     Execute the specified JavaScript files
   license                Display license information
   removedb               Remove blockchain and state databases
   show-deprecated-flags  Show flags that have been deprecated
   version                Print version numbers
   help, h                Shows a list of commands or help for one command
   
PLATON OPTIONS:
  --config value                    TOML configuration file
  --datadir "/home/platon/.platon"  Data directory for the databases and keystore
  --datadir.ancient                 Data directory for ancient chain segments (default = inside chaindata)
  --keystore                        Directory for the keystore (default = inside the datadir)
  --nousb                           Disables monitoring for and managing USB hardware wallets
  --networkid value                 Network identifier (integer, 1=Frontier, 2=Morden (disused), 3=Ropsten, 4=Rinkeby) (default: 1)
  --main                            Mainnet network: pre-configured main network (default network)
  --testnet                         Testnet network: pre-configured test network
  --syncmode "full"                 Blockchain sync mode ("fast", "full", or "light")
  --identity value                  Custom node name
  --lightkdf                        Reduce key-derivation RAM & CPU usage at some expense of KDF strength
  
DEVELOPER CHAIN OPTIONS:
  --dev.period value  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)
  
TRANSACTION POOL OPTIONS:
  --txpool.locals value         Comma separated accounts to treat as locals (no flush, priority inclusion)
  --txpool.nolocals             Disables price exemptions for locally submitted transactions
  --txpool.journal value        Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
  --txpool.rejournal value      Time interval to regenerate the local transaction journal (default: 1h0m0s)
  --txpool.pricebump value      Price bump percentage to replace an already existing transaction (default: 10)
  --txpool.accountslots value   Minimum number of executable transaction slots guaranteed per account (default: 16)
  --txpool.globalslots value    Maximum number of executable transaction slots for all accounts (default: 16384)
  --txpool.accountqueue value   Maximum number of non-executable transaction slots permitted per account (default: 64)
  --txpool.globalqueue value    Maximum number of non-executable transaction slots for all accounts (default: 4096)
  --txpool.globaltxcount value  Maximum number of transactions for package (default: 3000)
  --txpool.lifetime value       Maximum amount of time non-executable transaction are queued (default: 3h0m0s)
  --txpool.cacheSize value      After receiving the specified number of transactions from the remote, move the transactions in the queen to pending (default: 0)
  
PERFORMANCE TUNING OPTIONS:
  --cache value           Megabytes of memory allocated to internal caching (default: 1024)
  --cache.database value  Percentage of cache memory allowance to use for database io (default: 75)
  --cache.gc value        Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)
  --cache.triedb value    Megabytes of memory allocated to triedb internal caching (default: 512)
  
ACCOUNT OPTIONS:
  --unlock value           Comma separated list of accounts to unlock
  --password value         Password file to use for non-interactive password input
  --allow-insecure-unlock  Allow insecure account unlocking when account-related RPCs are exposed by http
  
API AND CONSOLE OPTIONS:
  --ipcdisable                Disable the IPC-RPC server
  --ipcpath                   Filename for IPC socket/pipe within the datadir (explicit paths escape it)
  --http                      Enable the HTTP-RPC server
  --http.addr value           HTTP-RPC server listening interface (default: "localhost")
  --http.port value           HTTP-RPC server listening port (default: 6789)
  --http.api value            API's offered over the HTTP-RPC interface
  --http.corsdomain value     Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --http.vhosts value         Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --ws                        Enable the WS-RPC server
  --ws.addr value             WS-RPC server listening interface (default: "localhost")
  --ws.port value             WS-RPC server listening port (default: 6790)
  --ws.api value              API's offered over the WS-RPC interface
  --ws.origins value          Origins from which to accept websockets requests
  --graphql                   Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.
  --graphql.corsdomain value  Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --graphql.vhosts value      Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --rpc.gascap value          Sets a cap on gas that can be used in platon_call/estimateGas (default: 0)
  --jspath loadScript         JavaScript root path for loadScript (default: ".")
  --exec value                Execute JavaScript statement
  --preload value             Comma separated list of JavaScript files to preload into the console
  
NETWORKING OPTIONS:
  --bootnodes value          Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)
  --bootnodesv4 value        Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)
  --port value               Network listening port (default: 16789)
  --maxpeers value           Maximum number of network peers (network disabled if set to 0) (default: 60)
  --maxconsensuspeers value  Maximum number of network consensus peers (network disabled if set to 0) (default: 40)
  --maxpendpeers value       Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
  --nat value                NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
  --nodiscover               Disables the peer discovery mechanism (manual peer addition)
  --netrestrict value        Restricts network communication to the given IP networks (CIDR masks)
  --nodekey value            P2P node key file
  --nodekeyhex value         P2P node key as hex (for testing)
  
MINER OPTIONS:
  --miner.gasprice "1000000000"  Minimum gas price for mining a transaction
  
GAS PRICE ORACLE OPTIONS:
  --gpo.blocks value      Number of recent blocks to check for gas prices (default: 20)
  --gpo.percentile value  Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)
  
LOGGING AND DEBUGGING OPTIONS:
  --nocompaction                  Disables db compaction after import
  --verbosity value               Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)
  --vmodule value                 Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)
  --backtrace value               Request a stack trace at a specific logging statement (e.g. "block.go:271")
  --debug                         Prepends log messages with call-site location (file and line number)
  --pprof                         Enable the pprof HTTP server
  --pprof.addr value              pprof HTTP server listening interface (default: "127.0.0.1")
  --pprof.port value              pprof HTTP server listening port (default: 6060)
  --pprof.memprofilerate value    Turn on memory profiling with the given rate (default: 524288)
  --pprof.blockprofilerate value  Turn on block profiling with the given rate (default: 0)
  --pprof.cpuprofile value        Write CPU profile to the given file
  --trace value                   Write execution trace to the given file
  --wasmlog value                 output wasm contract log to file
  
METRICS AND STATS OPTIONS:
  --metrics                          Enable metrics collection and reporting
  --metrics.expensive                Enable expensive metrics collection and reporting
  --metrics.influxdb                 Enable metrics export/push to an external InfluxDB database
  --metrics.influxdb.endpoint value  InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")
  --metrics.influxdb.database value  InfluxDB database name to push reported metrics to (default: "alaya")
  --metrics.influxdb.username value  Username to authorize access to the database (default: "test")
  --metrics.influxdb.password value  Password to authorize access to the database (default: "test")
  --metrics.influxdb.tags value      Comma-separated InfluxDB tags (key/values) attached to all measurements (default: "host=localhost")
  
CBFT OPTIONS:
  --cbft.msg_queue_size value      Message queue size (default: 1024)
  --cbft.wal.disabled              Disable the Wal server
  --cbft.max_ping_latency value    Maximum latency of ping (default: 2000)
  --cbft.blskey value              BLS key file
  --cbft.blacklist_deadline value  Blacklist effective time. uint:minute (default: "60")
  
DB OPTIONS:
  --db.nogc               Disables database garbage collection
  --db.gc_interval value  Block interval for garbage collection (default: 86400)
  --db.gc_timeout value   Maximum time for database garbage collection (default: 1m0s)
  --db.gc_mpt             Enables database garbage collection MPT
  --db.gc_block value     Number of cache block states, default 10 (default: 10)
  
VM OPTIONS:
  --vm.wasm_type value         The actual implementation type of the wasm instance (default: "wagon")
  --vm.timeout_duration value  The VM execution timeout duration (uint: ms) (default: 0)
  
ALIASED (deprecated) OPTIONS:
  --rpc                     Enable the HTTP-RPC server (deprecated, use --http)
  --rpcaddr value           HTTP-RPC server listening interface (deprecated, use --http.addr) (default: "localhost")
  --rpcport value           HTTP-RPC server listening port (deprecated, use --http.port) (default: 6789)
  --rpccorsdomain value     Comma separated list of domains from which to accept cross origin requests (browser enforced) (deprecated, use --http.corsdomain)
  --rpcvhosts value         Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (deprecated, use --http.vhosts) (default: "localhost")
  --rpcapi value            API's offered over the HTTP-RPC interface (deprecated, use --http.api)
  --wsaddr value            WS-RPC server listening interface (deprecated, use --ws.addr) (default: "localhost")
  --wsport value            WS-RPC server listening port (deprecated, use --ws.port) (default: 6790)
  --wsorigins value         Origins from which to accept websockets requests (deprecated, use --ws.origins)
  --wsapi value             API's offered over the WS-RPC interface (deprecated, use --ws.api)
  --gpoblocks value         Number of recent blocks to check for gas prices (deprecated, use --gpo.blocks) (default: 20)
  --gpopercentile value     Suggested gas price is the given percentile of a set of recent transaction gas prices (deprecated, use --gpo.percentile) (default: 60)
  --pprofport value         pprof HTTP server listening port (deprecated, use --pprof.port) (default: 6060)
  --pprofaddr value         pprof HTTP server listening interface (deprecated, use --pprof.addr) (default: "127.0.0.1")
  --memprofilerate value    Turn on memory profiling with the given rate (deprecated, use --pprof.memprofilerate) (default: 524288)
  --blockprofilerate value  Turn on block profiling with the given rate (deprecated, use --pprof.blockprofilerate) (default: 0)
  --cpuprofile value        Write CPU profile to the given file (deprecated, use --pprof.cpuprofile)
  
MISC OPTIONS:
  --help, -h  show help
  

COPYRIGHT:
   Copyright 2019 The PlatON-Go Authors
```

## Common rpc commands

- Description
  - The rpc port is changed according to the actual startup command and the default is 6789

### admin

- View the data directory of the current node

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

  For example:

  ```bash
  platon attach http://localhost:6789 -exec 'platon.estimateGas({from:"lax1fyeszufxwxk62p46djncj86rd553skpptsj8v6",to:"lax1zhllhqu72wz66cdwly8983xhla2sann75j2ec2",value:"0x10000000000000",data:"0x11",gas:"0x88888",gasprice:"0x333333",nonce:"11"})'
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

  For example:

  ```bash
  platon attach http://localhost:6789 -exec 'personal.importRawKey ("842d943dbb50a8d3fe63af2f82fda3d8f0ca817fe8d47e61698142bac7c24212", "88888888")'
  ```

- View account address

  ```bash
  platon attach http://localhost:6789 -exec 'personal.listAccounts'
  ```

- View local wallet information, including wallet address, wallet file path and wallet status

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

- Query the economic model configuration parameters of the current node

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
