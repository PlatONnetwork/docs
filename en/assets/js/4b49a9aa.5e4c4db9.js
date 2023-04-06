"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4419],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(a),d=o,h=u["".concat(s,".").concat(d)]||u[d]||m[d]||r;return a?n.createElement(h,l(l({ref:t},p),{},{components:a})):n.createElement(h,l({ref:t},p))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,l=new Array(r);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<r;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2259:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var n=a(7462),o=(a(7294),a(3905));const r={id:"Command_Line_Tools",title:"Command line tools",sidebar_label:"Command line tools"},l=void 0,i={unversionedId:"Command_Line_Tools",id:"Command_Line_Tools",isDocsHomePage:!1,title:"Command line tools",description:"Introducing the program PlatON instructions",source:"@site/../docs/PlatON\u547d\u4ee4\u884c\u5de5\u5177.md",sourceDirName:".",slug:"/Command_Line_Tools",permalink:"/docs/en/Command_Line_Tools",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/PlatON\u547d\u4ee4\u884c\u5de5\u5177.md",version:"current",frontMatter:{id:"Command_Line_Tools",title:"Command line tools",sidebar_label:"Command line tools"},sidebar:"docs",previous:{title:"MTool offline tutorial",permalink:"/docs/en/OffLine_MTool_Manual"},next:{title:"CTool tutorial",permalink:"/docs/en/CTool_Manual"}},s=[{value:"Introducing the program PlatON instructions",id:"introducing-the-program-platon-instructions",children:[]},{value:"Common rpc commands",id:"common-rpc-commands",children:[{value:"admin",id:"admin",children:[]},{value:"platon",id:"platon",children:[]},{value:"personal",id:"personal",children:[]},{value:"net",id:"net",children:[]},{value:"debug",id:"debug",children:[]}]}],c={toc:s},p="wrapper";function u(e){let{components:t,...a}=e;return(0,o.kt)(p,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"introducing-the-program-platon-instructions"},"Introducing the program PlatON instructions"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-conf"},'NAME:\n   platon - the platon-go command line interface\n\n   Copyright 2019 The PlatON-Go Authors\n\nUSAGE:\n   platon [options] command [command options] [arguments...]\n   \nVERSION:\n   1.4.0-unstable\n   \nCOMMANDS:\n   account                Manage accounts\n   attach                 Start an interactive JavaScript environment (connect to node)\n   console                Start an interactive JavaScript environment\n   copydb                 Create a local chain from a target chaindata folder\n   dump                   Dump a specific block from storage\n   dumpconfig             Show configuration values\n   export-preimages       Export the preimage database into an RLP stream\n   import-preimages       Import the preimage database from an RLP stream\n   init                   Bootstrap and initialize a new genesis block\n   inspect                Inspect the storage size for each type of data in the database\n   js                     Execute the specified JavaScript files\n   license                Display license information\n   removedb               Remove blockchain and state databases\n   show-deprecated-flags  Show flags that have been deprecated\n   version                Print version numbers\n   help, h                Shows a list of commands or help for one command\n   \nPLATON OPTIONS:\n  --config value                    TOML configuration file\n  --datadir "/home/platon/.platon"  Data directory for the databases and keystore\n  --datadir.ancient                 Data directory for ancient chain segments (default = inside chaindata)\n  --keystore                        Directory for the keystore (default = inside the datadir)\n  --nousb                           Disables monitoring for and managing USB hardware wallets\n  --networkid value                 Network identifier (integer, 1=Frontier, 2=Morden (disused), 3=Ropsten, 4=Rinkeby) (default: 1)\n  --main                            Mainnet network: pre-configured main network (default network)\n  --testnet                         Testnet network: pre-configured test network\n  --syncmode "full"                 Blockchain sync mode ("fast", "full", or "light")\n  --identity value                  Custom node name\n  --lightkdf                        Reduce key-derivation RAM & CPU usage at some expense of KDF strength\n  \nDEVELOPER CHAIN OPTIONS:\n  --dev.period value  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)\n  \nTRANSACTION POOL OPTIONS:\n  --txpool.locals value         Comma separated accounts to treat as locals (no flush, priority inclusion)\n  --txpool.nolocals             Disables price exemptions for locally submitted transactions\n  --txpool.journal value        Disk journal for local transaction to survive node restarts (default: "transactions.rlp")\n  --txpool.rejournal value      Time interval to regenerate the local transaction journal (default: 1h0m0s)\n  --txpool.pricebump value      Price bump percentage to replace an already existing transaction (default: 10)\n  --txpool.accountslots value   Minimum number of executable transaction slots guaranteed per account (default: 16)\n  --txpool.globalslots value    Maximum number of executable transaction slots for all accounts (default: 16384)\n  --txpool.accountqueue value   Maximum number of non-executable transaction slots permitted per account (default: 64)\n  --txpool.globalqueue value    Maximum number of non-executable transaction slots for all accounts (default: 4096)\n  --txpool.globaltxcount value  Maximum number of transactions for package (default: 3000)\n  --txpool.lifetime value       Maximum amount of time non-executable transaction are queued (default: 3h0m0s)\n  --txpool.cacheSize value      After receiving the specified number of transactions from the remote, move the transactions in the queen to pending (default: 0)\n  \nPERFORMANCE TUNING OPTIONS:\n  --cache value           Megabytes of memory allocated to internal caching (default: 1024)\n  --cache.database value  Percentage of cache memory allowance to use for database io (default: 75)\n  --cache.gc value        Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)\n  --cache.triedb value    Megabytes of memory allocated to triedb internal caching (default: 512)\n  \nACCOUNT OPTIONS:\n  --unlock value           Comma separated list of accounts to unlock\n  --password value         Password file to use for non-interactive password input\n  --allow-insecure-unlock  Allow insecure account unlocking when account-related RPCs are exposed by http\n  \nAPI AND CONSOLE OPTIONS:\n  --ipcdisable                Disable the IPC-RPC server\n  --ipcpath                   Filename for IPC socket/pipe within the datadir (explicit paths escape it)\n  --http                      Enable the HTTP-RPC server\n  --http.addr value           HTTP-RPC server listening interface (default: "localhost")\n  --http.port value           HTTP-RPC server listening port (default: 6789)\n  --http.api value            API\'s offered over the HTTP-RPC interface\n  --http.corsdomain value     Comma separated list of domains from which to accept cross origin requests (browser enforced)\n  --http.vhosts value         Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts \'*\' wildcard. (default: "localhost")\n  --ws                        Enable the WS-RPC server\n  --ws.addr value             WS-RPC server listening interface (default: "localhost")\n  --ws.port value             WS-RPC server listening port (default: 6790)\n  --ws.api value              API\'s offered over the WS-RPC interface\n  --ws.origins value          Origins from which to accept websockets requests\n  --graphql                   Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.\n  --graphql.corsdomain value  Comma separated list of domains from which to accept cross origin requests (browser enforced)\n  --graphql.vhosts value      Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts \'*\' wildcard. (default: "localhost")\n  --rpc.gascap value          Sets a cap on gas that can be used in platon_call/estimateGas (default: 0)\n  --jspath loadScript         JavaScript root path for loadScript (default: ".")\n  --exec value                Execute JavaScript statement\n  --preload value             Comma separated list of JavaScript files to preload into the console\n  \nNETWORKING OPTIONS:\n  --bootnodes value          Comma separated enode URLs for P2P discovery bootstrap (set v4+v5 instead for light servers)\n  --bootnodesv4 value        Comma separated enode URLs for P2P v4 discovery bootstrap (light server, full nodes)\n  --port value               Network listening port (default: 16789)\n  --maxpeers value           Maximum number of network peers (network disabled if set to 0) (default: 60)\n  --maxconsensuspeers value  Maximum number of network consensus peers (network disabled if set to 0) (default: 40)\n  --maxpendpeers value       Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)\n  --nat value                NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")\n  --nodiscover               Disables the peer discovery mechanism (manual peer addition)\n  --netrestrict value        Restricts network communication to the given IP networks (CIDR masks)\n  --nodekey value            P2P node key file\n  --nodekeyhex value         P2P node key as hex (for testing)\n  \nMINER OPTIONS:\n  --miner.gasprice "1000000000"  Minimum gas price for mining a transaction\n  \nGAS PRICE ORACLE OPTIONS:\n  --gpo.blocks value      Number of recent blocks to check for gas prices (default: 20)\n  --gpo.percentile value  Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)\n  \nLOGGING AND DEBUGGING OPTIONS:\n  --nocompaction                  Disables db compaction after import\n  --verbosity value               Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)\n  --vmodule value                 Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)\n  --backtrace value               Request a stack trace at a specific logging statement (e.g. "block.go:271")\n  --debug                         Prepends log messages with call-site location (file and line number)\n  --pprof                         Enable the pprof HTTP server\n  --pprof.addr value              pprof HTTP server listening interface (default: "127.0.0.1")\n  --pprof.port value              pprof HTTP server listening port (default: 6060)\n  --pprof.memprofilerate value    Turn on memory profiling with the given rate (default: 524288)\n  --pprof.blockprofilerate value  Turn on block profiling with the given rate (default: 0)\n  --pprof.cpuprofile value        Write CPU profile to the given file\n  --trace value                   Write execution trace to the given file\n  --wasmlog value                 output wasm contract log to file\n  \nMETRICS AND STATS OPTIONS:\n  --metrics                          Enable metrics collection and reporting\n  --metrics.expensive                Enable expensive metrics collection and reporting\n  --metrics.influxdb                 Enable metrics export/push to an external InfluxDB database\n  --metrics.influxdb.endpoint value  InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")\n  --metrics.influxdb.database value  InfluxDB database name to push reported metrics to (default: "alaya")\n  --metrics.influxdb.username value  Username to authorize access to the database (default: "test")\n  --metrics.influxdb.password value  Password to authorize access to the database (default: "test")\n  --metrics.influxdb.tags value      Comma-separated InfluxDB tags (key/values) attached to all measurements (default: "host=localhost")\n  \nCBFT OPTIONS:\n  --cbft.msg_queue_size value      Message queue size (default: 1024)\n  --cbft.wal.disabled              Disable the Wal server\n  --cbft.max_ping_latency value    Maximum latency of ping (default: 2000)\n  --cbft.blskey value              BLS key file\n  --cbft.blacklist_deadline value  Blacklist effective time. uint:minute (default: "60")\n  \nDB OPTIONS:\n  --db.nogc                           Disables database garbage collection\n  --db.gc_interval value              Block interval for garbage collection (default: 86400)\n  --db.gc_timeout value               Maximum time for database garbage collection (default: 1m0s)\n  --db.gc_mpt                         Enables database garbage collection MPT\n  --db.gc_block value                 Number of cache block states, default 10 (default: 10)\n  --db.validators_history             Store the list of validators for each consensus round\n  \nVM OPTIONS:\n  --vm.wasm_type value         The actual implementation type of the wasm instance (default: "wagon")\n  --vm.timeout_duration value  The VM execution timeout duration (uint: ms) (default: 0)\n  \nALIASED (deprecated) OPTIONS:\n  --rpc                     Enable the HTTP-RPC server (deprecated, use --http)\n  --rpcaddr value           HTTP-RPC server listening interface (deprecated, use --http.addr) (default: "localhost")\n  --rpcport value           HTTP-RPC server listening port (deprecated, use --http.port) (default: 6789)\n  --rpccorsdomain value     Comma separated list of domains from which to accept cross origin requests (browser enforced) (deprecated, use --http.corsdomain)\n  --rpcvhosts value         Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts \'*\' wildcard. (deprecated, use --http.vhosts) (default: "localhost")\n  --rpcapi value            API\'s offered over the HTTP-RPC interface (deprecated, use --http.api)\n  --wsaddr value            WS-RPC server listening interface (deprecated, use --ws.addr) (default: "localhost")\n  --wsport value            WS-RPC server listening port (deprecated, use --ws.port) (default: 6790)\n  --wsorigins value         Origins from which to accept websockets requests (deprecated, use --ws.origins)\n  --wsapi value             API\'s offered over the WS-RPC interface (deprecated, use --ws.api)\n  --gpoblocks value         Number of recent blocks to check for gas prices (deprecated, use --gpo.blocks) (default: 20)\n  --gpopercentile value     Suggested gas price is the given percentile of a set of recent transaction gas prices (deprecated, use --gpo.percentile) (default: 60)\n  --pprofport value         pprof HTTP server listening port (deprecated, use --pprof.port) (default: 6060)\n  --pprofaddr value         pprof HTTP server listening interface (deprecated, use --pprof.addr) (default: "127.0.0.1")\n  --memprofilerate value    Turn on memory profiling with the given rate (deprecated, use --pprof.memprofilerate) (default: 524288)\n  --blockprofilerate value  Turn on block profiling with the given rate (deprecated, use --pprof.blockprofilerate) (default: 0)\n  --cpuprofile value        Write CPU profile to the given file (deprecated, use --pprof.cpuprofile)\n  \nMISC OPTIONS:\n  --help, -h  show help\n  \n\nCOPYRIGHT:\n   Copyright 2019 The PlatON-Go Authors\n')),(0,o.kt)("h2",{id:"common-rpc-commands"},"Common rpc commands"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Description",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"The rpc port is changed according to the actual startup command and the default is 6789")))),(0,o.kt)("h3",{id:"admin"},"admin"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the data directory of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.datadir\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the ChainID of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.chainId\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the id of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.id\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the blsPubKey of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.blsPubKey\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the p2p port number of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"platon attach http://localhost:6789 -exec admin.nodeInfo.ports.listener\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the connection information of peers of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.peers\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the genesis block hash of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.genesis\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the maximum number of blocks ($amount) of a single node in each consensus round of cbft consensus"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.cbft.amount\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the time window of block generation by a single node in each consensus round of cbft consensus ($period, unit: ms)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.cbft.period\n")),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Blocking time interval = period / 1000 / amount")))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Get the binary version number and signature information"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'admin.getProgramVersion()'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Obtain zero- knowledge proof information (use the node's private key to prove whether the certificate issued by the interface is correct and used for node pledge)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'admin.getSchnorrNIZKProve()'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the type of virtual machine used at the bottom (EVM / WASM)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec admin.nodeInfo.protocols.platon.config.interpreter\n")))),(0,o.kt)("h3",{id:"platon"},"platon"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View all wallet addresses under the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec platon.accounts\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the block height of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec platon.blockNumber\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Check the balance of the specified account ($account is the account address)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.getBalance(\"$account\")'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Query the number of transactions in the specified block ($blockNumber is the block height or block hash of the specified block)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.getBlockTransactionCount($blockNumber)'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Query transaction information ($txHash is transaction hash)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.getTransaction(\"$txHash\")'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Query transaction receipt ($txHash is transaction hash)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.getTransactionReceipt(\"$txHash\")'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Query the number of transactions in the specified account (parameter $address is the account address, used to specify the nonce of the transaction when sending the transaction)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.getTransactionCount(\"$address\")'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Query the pending transaction of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec platon.pendingTransactions\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the default gasPrice of the current node (unit: von)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec platon.gasPrice\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Estimate the gas of the transaction (parameter $transaction is the transaction details, unit: von)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.estimateGas($transaction)'\n")),(0,o.kt)("p",{parentName:"li"},"For example:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'platon attach http://localhost:6789 -exec \'platon.estimateGas({from:"lax1fyeszufxwxk62p46djncj86rd553skpptsj8v6",to:"lax1zhllhqu72wz66cdwly8983xhla2sann75j2ec2",value:"0x10000000000000",data:"0x11",gas:"0x88888",gasprice:"0x333333",nonce:"11"})\'\n'))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the p2p protocol number of the underlying version of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'web3.toDecimal(platon.protocolVersion)'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"See if the current node is in sync"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec platon.syncing\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Get details of specified block"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'platon.getBlock($blockNumber)'\n")))),(0,o.kt)("h3",{id:"personal"},"personal"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Generate wallet (parameter is wallet password)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'personal.newAccount(\"88888888\")'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Import private key to generate wallet"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'personal.importRawKey($privateKey, $password)'\n")),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},"Parameters:"),(0,o.kt)("ul",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ul"},"privateKey: private key, remove the leading 0x"),(0,o.kt)("li",{parentName:"ul"},"password: wallet password")),(0,o.kt)("p",{parentName:"blockquote"},"Back to:"),(0,o.kt)("ul",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ul"},"Wallet address"))),(0,o.kt)("p",{parentName:"li"},"For example:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'platon attach http://localhost:6789 -exec \'personal.importRawKey ("842d943dbb50a8d3fe63af2f82fda3d8f0ca817fe8d47e61698142bac7c24212", "88888888")\'\n'))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View account address"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'personal.listAccounts'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View local wallet information, including wallet address, wallet file path and wallet status"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'personal.listWallets'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Lock account"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'personal.lockAccount(platon.accounts[0])'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Unlock account"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'personal.unlockAccount(platon.accounts[0], \"88888888\", 24*3600)'\n")),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},"Parameters:"),(0,o.kt)("ul",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ul"},"Account address"),(0,o.kt)("li",{parentName:"ul"},"Wallet password"),(0,o.kt)("li",{parentName:"ul"},"Unlock time in seconds")))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Send unsigned transactions"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'platon attach http://localhost:6789 -exec \'personal.sendTransaction({from: platon.accounts[2], to: platon.accounts[0], value:web3.toVon("0.1","lat"), nonce: platon.getTransactionCount(platon.accounts[2])}, "88888888") \'\n')))),(0,o.kt)("h3",{id:"net"},"net"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the networkid of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec net.version\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Check whether the p2p port of the current node is in the listening state"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec net.listening\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"View the number of peer connections of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec net.peerCount\n")))),(0,o.kt)("h3",{id:"debug"},"debug"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Query the economic model configuration parameters of the current node"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789 -exec 'debug.economicConfig()'\n"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Set log level"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"platon attach http://localhost:6789 -exec 'debug.verbosity(4)'\n")),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},"Log level description:"),(0,o.kt)("p",{parentName:"blockquote"},"0: CRIT"),(0,o.kt)("p",{parentName:"blockquote"},"1: ERROR"),(0,o.kt)("p",{parentName:"blockquote"},"2: WARN"),(0,o.kt)("p",{parentName:"blockquote"},"3: INFO"),(0,o.kt)("p",{parentName:"blockquote"},"4: DEBUG"),(0,o.kt)("p",{parentName:"blockquote"},"5: TRACE")))))}u.isMDXComponent=!0}}]);