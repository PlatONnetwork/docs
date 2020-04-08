---
id: Command_Line_Tools
title: PlatON命令行工具
sidebar_label: PlatON命令行工具
---

- [platon](#platon)
- [ctool](#ctool)
- [console](#console)

## platon 

- `Platon` 命令行参数说明。

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
---

## ctool

- 一个可以快速的进行合约发布、调用、查询的命令行工具。

### 简介 

`ctool`：一个可用于快速进行合约发布、交易发送（合约调用）、查询的简易工具集。

下载地址：

* [window 版本](https://download.platon.network/ctool-windows-amd64.exe)
* [Linux 版本](https://download.platon.network/ctool-linux-amd64)

### **使用说明**

```
$ ctool.exe <command> [--addr contractAddress] [--type txType(default:2)] [--func funcInfo] --abi <abi_path> --code <wasm_path> [--config <config_path>]
```

* `command` 待执行的命令,主要有：deploy(发布合约)、invoke(合约调用)、getTxReceipt(查询回执)；
* `abi_path` ABI文件的路径，示例中为：`firstdemo.cpp.abi.json`；
* `wasm_path` WASM文件路径，示例中为：`firstdemo.wasm`；
* `config_path` 配置文件路径，用于配置节点及账户信息；

**命令行选项**

* `--addr`：调用合约时使用，用于指明需要调用的合约地址；
* `--type`：调用合约时指定当次的交易类型，如果未指定则默认为`2`。可取值为：`2`(普通交易)、`5`(MPC交易)
* `--func`：调用合约时用于指定调用的方法名，如：--func 'sayHello("你好")'

提示：如果命令行中未明确指明配置文件路径，则会在当前工作路径读取文件：`config.json`。 

### **配置文件**

范例：

```JSON
{
  "url":"http://127.0.0.1:8545",
  "from":"0x60ceca9c1290ee56b98d4e160ef0453f7c40d219"
}
```

- `url` PlatON开放的`JSON-RPC`地址信息； 
- `from` 交易发送者的地址，注意，需要节点保证了该账户已进行了解锁动作；

### **发布合约**

此步用于演示如何进行合约发布，合约发布需要两个文件，一个为后缀为`.wasm`(合约二进制)文件，
另一个为后缀`.json`(合约接口描述)文件。如何获取这两个文件请参考：[WASM合约开发指南](/zh-cn/development/[Chinese-Simplified]-Wasm合约开发指南.md)


```shell
$ ctool.exe deploy --abi ./demo.cpp.abi.json --code ./demo.wasm --config ./config.json
```


```
trasaction hash: 0xdb0f9a28fcd447702e8d5961f47144d1ea830979e3c984acc8f72c0dca8bdcfc
contract address: 0x43355c787c50b647c425f594b441d4bd751951c1
```

命令执行后，会返回交易哈希与合约地址。

### **发送交易**

合约发布成功后，接下来进行合约调用，假定测试合约中包含了方法`sayHello(string _word);`,现在对
该方法进行调用：


```shell 
$ ctool.exe invoke -addr "0x43355c787c50b647c425f594b441d4bd751951c1" --func 'sayHello("HelloWorld")' --abi ./demo.cpp.abi.json --config ./config.json
```

### **查询结果**

继续假设，在上一步我们执行了合约方法`sayHello`,下一步我们将调用该函数将存储的值读取出来，这种动作
我们称为查询（call）调用。假定测试合约用包含方法：`char* getWorld()`，调用如下：


```shell 
$ ctool.exe invoke -addr "0x43355c787c50b647c425f594b441d4bd751951c1" --func 'getWorld()' --abi ./demo.cpp.abi.json --config ./config.json
```

> 预期结果获取到屏幕输出的结果应该为：`HelloWorld`。

### **查询交易回执**

有时候可能需要对交易发送后的回执信息进行查看，则：


```shell 
$ ctool.exe getTxReceipt 0x0b8996dadd6fd821f055affd1f95dbdf718d288a17e4ac5ed4133f3393bca44d(交易哈希)
```


### 常见问题及注意事项

- 注意事项

1.使用命令工具前请确保您使用的节点正常可用；

2.一般比较明显的错误在执行工具后会在控制台进行输出；

3.使用工具进行交易发送要求当前使用的账号在对应链接的节点已进行解锁操作；

- 基础问题

1.合约无法发布问题？

**A**: 请确保配置文件中的能量设置合理，使用的账户已在节点侧解锁。


### 更多问题

如果你有其他问题，或者你的问题在这里找不到答案，请提交一个 [issue](https://github.com/PlatONnetwork/PlatON-Go/issues/new) 。

---

## console

- 可以在交互式（控制台）或非交互式（脚本）模式下使用的javascript运行时环境（JSRE）.

PlatON console are based on Ethereum javascript console.

### Interactive use: the JSRE REPL  Console

The `PlatON CLI` executable `platon` has a JavaScript console (a **Read, Evaluate & Print Loop** = REPL exposing the JSRE), which can be started with the `console` or `attach` subcommand. The `console` subcommands starts the platon node and then opens the console. The `attach` subcommand will not start the platon node but instead tries to open the console on a running platon instance.

    $ platon console
    $ platon attach

The attach node accepts an endpoint in case the platon node is running with a non default ipc endpoint or you would like to connect over the rpc interface.

    $ platon attach ipc:/some/custom/path
    $ platon attach http://191.168.1.1:6789
    $ platon attach ws://191.168.1.1:6790

Note that by default the platon node doesn't start the http and weboscket service and not all functionality is provided over these interfaces due to security reasons. These defaults can be overridden when the `--rpcapi` and `--wsapi` arguments when the platon node is started, or with [admin.startRPC](admin_startRPC) and [admin.startWS](admin_startWS).

If you need log information, start with:

    $ platon --verbosity 5 console 2>> /tmp/eth.log

Otherwise mute your logs, so that it does not pollute your console:

    $ platon console 2>> /dev/null

or 

    $ platon --verbosity 0 console

PlatON has support to load custom JavaScript files into the console through the `--preload` argument. This can be used to load often used functions, setup web3 contract objects, or ...


```
platon --preload "/my/scripts/folder/utils.js,/my/scripts/folder/contracts.js" console


```


### Non-interactive use: JSRE script mode

It's also possible to execute files to the JavaScript interpreter. The `console` and `attach` subcommand accept the `--exec` argument which is a javascript statement. 

    $ platon --exec "eth.blockNumber" attach

This prints the current block number of a running platon instance.

Or execute a local script with more complex statements on a remote node over http:

    $ platon --exec 'loadScript("/tmp/checkbalances.js")' attach http://123.123.123.123:6789
    $ platon --jspath "/tmp" --exec 'loadScript("checkbalances.js")' attach http://123.123.123.123:6789

Use the `--jspath <path/to/my/js/root>` to set a libdir for your js scripts. Parameters to `loadScript()` with no absolute path will be understood relative to this directory.

You can exit the console cleanly by typing `exit` or simply with `CTRL-C`.

### Caveat 

The platon JSRE uses the [Otto JS VM](https://github.com/robertkrimen/otto) which has some limitations:

* "use strict" will parse, but does nothing.
* The regular expression engine (re2/regexp) is not fully compatible with the ECMA5 specification.

Note that the other known limitation of Otto (namely the lack of timers) is taken care of. PlatON JSRE implements both `setTimeout` and `setInterval`. In addition to this, the console provides `admin.sleep(seconds)` as well as a "blocktime sleep" method `admin.sleepBlocks(number)`. 

Since `web3.js` uses the [`bignumber.js`](https://github.com/MikeMcl/bignumber.js) library (MIT Expat Licence), it is also autoloded.

### Timers

In addition to the full functionality of JS (as per ECMA5), the platon JSRE is augmented with various timers. It implements `setInterval`, `clearInterval`, `setTimeout`, `clearTimeout` you may be used to using in browser windows. It also provides implementation for `admin.sleep(seconds)` and a block based timer, `admin.sleepBlocks(n)` which sleeps till the number of new blocks added is equal to or greater than `n`, think "wait for n confirmations". 

### Management APIs

Beside the official interface the platon node has support for additional management API's. These API's are offered using [JSON-RPC](http://www.jsonrpc.org/specification) and follow the same conventions as used in the DApp API. The platon package comes with a console client which has support for all additional API's.

[For more information please visit the Ethereum's management API wiki page](https://github.com/ethereum/go-ethereum/wiki/Management-APIs).




