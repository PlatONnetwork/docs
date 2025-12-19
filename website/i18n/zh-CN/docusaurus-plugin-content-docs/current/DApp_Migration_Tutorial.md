---
id: DApp_migrate
title: 以太坊DApp快速迁移教程
sidebar_label: 以太坊DApp快速迁移教程
---

为了更好的支持开发者迁移以太坊DApp到PlatON网络，本文将从开发者角度，首先介绍PlatON与以太坊的差异，然后介绍迁移DApp的大体思路。最后以uniswap迁移为例，基于现有以太坊开发工具对DApp合约迁移和前端界面迁移进行具体的介绍。

## PlatON和以太坊的差异

由于PlatON网络目前已经和以太坊进行适配，对于DAPP开发者来说，大大减少了迁移的工作量，使得迁移过程能够更平滑。但仍然有一些差异的地方在某些DAPP迁移过程中需要特别注意：

+ PlatON网络的出块要比以太坊快，大约是1s出一个区块，所以block的timestamp是以毫秒为单位，以太坊的block的timestamp是以秒为单位

+ token的单位：PlatON使用von、lat代替了以太坊的wei、ether。

+ 账户地址格式：PlatON同时支持EIP55和Bech32地址格式。

+ PlatON网络目前没有infrua类似的服务，目前对外提供了开发2网：https://devnet3openapi.platon.network/rpc 接口服务。



## DAPP迁移思路

要成功迁移DApp可以参考下面的迁移思路：

1. 先搞清楚DApp自身的主要功能，按功能依赖关系给功能做个依赖关系排序。以uniswap为例，功能依赖关系为：__MetaMask增加PlatON(测试)网络配置__([节点信息](https://devdocs.platon.network/docs/zh-CN/Join_Dev_Network))->连上MetaMask钱包->swap界面能够展示代币及显示余额->能够创建交易对并添加流动性->能够操作swap成功->能够移除流动性。

   __MetaMask配置PlatON开发2测试网节点__：

   ```javascript
   网络名称: PlatON开发测试网
   新增RPC URL: https://devnet3openapi.platon.network/rpc
   链ID: 20250407
   符号(选填): LAT
   区块浏览器URL(选填): https://devnet3scan.platon.network
   ```

2. 根据下文的“uniswap合约迁移”章节迁移好DApp相关合约，部署到自己的PlatON测试网络。

3. 根据第1步梳理功能依赖和下文的“uniswap前端界面迁移”，依次调试通过每一个功能。



## DAPP迁移例子

### uniswap迁移

#### uniswap迁移介绍

为了让开发者更好的进行DAPP迁移，我们以uniswap为例子详细讲述迁移的过程及修改点。uniswap在业务流程及复杂性上在DAPP中都算比较大的，因此uniswap的迁移例子会更有代表性。

#### uniswap业务流程

+ 连接MetaMask钱包，MetaMask授权选择账户连接，连接成功后uniswap前端能够显示连接的账户及账户的原生代币余额。

+ 在swap界面上点击Select a token能够展示各个代币的余额。

+ 在pool界面可以创建交易对并增加流动性(需要唤醒MetaMask同意授权以及签名等) ,操作成功后可以在页面展示出创建的交易对流动性，点击流动性详情页面的remove可以按百分比等移除对应的流动性。

+ 切换回swap界面可以在创建的交易对里的代币间进行swap操作(需要唤醒MetaMask签名)。

#### uniswap合约迁移

合约代码请参考：https://github.com/treelaketreelake/swap-contracts

合约部署的具体步骤如下:

+ __安装nodejs__

执行如下命令安装nodejs：

```shell
$ wget https://nodejs.org/download/release/v14.18.1/node-v14.18.1-linux-x64.tar.gz
$ sudo tar -zxvf node-v14.18.1-linux-x64.tar.gz -C /usr/local
$ sudo ln -s /usr/local/node-v14.18.1-linux-x64/bin/* /usr/bin/
$ node -v
$ sudo chmod -R 777 /usr/local/node-v14.18.1-linux-x64/bin
$ sudo chmod -R 777 /usr/local/node-v14.18.1-linux-x64/lib/node_modules/
```

+ __安装truffle__

```shell
npm install -g truffle
truffle -version
```

+ __修改配置文件__

修改压缩包中的配置文件migrations/2_deploy_contracts.js中feeToSetter值为合约部署者：

```javascript
const feeToSetter='0xef8ff83e1510DDaD35Db33efa6735F0a9C94ca74'; //有权更改feeTo地址的账户,为当前合约部署者
```

+ __修改链相关配置__

修改uniswap-apt/truffle-config.js 文件里链相关配置信息：

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');
module.exports = {
	networks: {
        development: {
            provider: () => new HDWalletProvider("bdbcca45b8af0b751bb39657a005c9ed4341ed7bc15ac6eb37a84b7fd12fcc07", `https://devnetopenapi2.platon.network/rpc`),
            network_id: "*",       // Any network (default: none)
         },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
        version: "^0.5.17",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
            enabled: false,
            runs: 200
          }
      //  evmVersion: "byzantium"
        }
    }
  }
}
```

+ __编译uniswap相关合约__

```shell
truffle compile
```

__注意：由于PlatON网络目前底层确定支持的solidity版本是0.8.6，因此建议在编译相关的业务类合约的时候配置的编译器版本要在0.8.6及以下版本__

+ __部署uniswap交易对相关合约__

```shell
truffle migrate --f 2 --to 2 --skip-dry-run
```

__注意：libraries/UniswapV2Library.sol合约里面pairFor函数里面的init code hash字段可能需要修改，部署的用户地址不同会导致这个字段不一样，但同一个地址部署多次都是一样的。这个字段在生成pair地址的时候需要用到，在uniswap的代码及@uniswap/sdk依赖库里面都配置了，必须保持一致，否则会影响后面的业务逻辑调用合约没法成功，导致业务逻辑出现问题。__

+ **记录部署合约地址信息**

根据实际部署结果记录，下面是测试过程的输出信息：

```
uniswapV2Factory at: 0xB5bDf1dDf5a4Cfa3C534fFaBD201643093775889
WETH at: 0xE90A2e39255A3879607b77b652d80aAC89D3A18a
uniswapV2Router02 at: 0x6E5a8fd360b5f3c6cA51F20d3bbC93C862A7b9CF
Multicall  at: 0x6E7C672457bBea5fA0b8815944C9575Bd52385Ca
initHash is at: 0x2d2546605b9f2d8c64755e6b9c29cc742d5f0b74bad6d7b8c188c2ccd0822fad
```

#### uniswap依赖库修改

* 包名：uniswap-sdk

* 源码地址: https://github.com/Uniswap/v2-sdk/tree/a88048e9c4198a5bdaea00883ca00c8c8e582605

+ 修改位置：

    + src/constants.ts (7/28行处)

  ```javascript
  export const FACTORY_ADDRESS = '0xB5bDf1dDf5a4Cfa3C534fFaBD201643093775889'
  export const INIT_CODE_HASH = '0x2d2546605b9f2d8c64755e6b9c29cc742d5f0b74bad6d7b8c188c2ccd0822fad'
  ```

  将上面的FACTORY_ADDRESS和INIT_CODE_HASH替换成新部署生成的对应的数据。

  ```javascript
  export enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42
    PLATON = 20250407
  }
  ```

  在上面的ChainId增加PlatON开发测试网的chainId枚举。

    + src/entities/token.ts(63行)
    
  ```javascript
  export const WETH = {
  [ChainId.PLATON]: new Token(
    ChainId.PLATON,
    '0xE90A2e39255A3879607b77b652d80aAC89D3A18a',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  ```

将上面的地址替换成新部署生成的WETH代币地址。

修改完依赖包的代码后编译生成dist目录替换掉安装的之前的依赖的dist目录即可。

#### uniswap前端代码修改

+ src/connectors/index.ts(第30行)

```javascript
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 20250407]
})
```

supportedChainIds增加PlatON开发测试网对应的chainId。

- src/constants/index.ts(第6/29/30/32行)

```javascript
export const ROUTER_ADDRESS = '0x6E5a8fd360b5f3c6cA51F20d3bbC93C862A7b9CF'
```

将上面的ROUTER_ADDRESS替换成新部署生成的router合约地址。

- src/constants/multicall/index.ts(第10行)

```javascript
[ChainId.PlatON]: '0x6E7C672457bBea5fA0b8815944C9575Bd52385Ca'
```

MULTICALL_NETWORKS新增加PlatON开发测试网及对应的multicall合约地址。

- src/constants/list.ts(第2行)

```javascript
export const DEFAULT_TOKEN_LIST_URL = 'http://10.1.1.50:8080/token-list.json'
```

+ src/hooks/useTimestampFromBlock.ts(第11行)

```javascript
blockData && setTimestamp(blockData.timestamp / 1000)
```

block信息里的timestamp需要/1000，因为PlatON开发测试网络的区块时间戳单位是ms而以太坊是s。

+ src/hooks/useTransactionDeadline.ts(第12行)

```javascript
if (blockTimestamp && ttl) return blockTimestamp.add(ttl * 1000)
```

blockTimeStamp需要乘1000，因为PlatON开发测试网络的区块时间戳单位是ms而以太坊是s。

#### uniswap迁移总结

+ swap源代码及依赖库@uniswap/sdk增加PlatON网络配置，支持chainId为20250407的PlatON开发2测试网。
  
+ 修改业务相关的合约的依赖合约UniswapV2Library中的init code hash对应代码，然后部署业务相关的合约(uniswapV2Factory/WETH/uniswapV2Router/multicall)，获取相关合约的地址（solidity版本需要注意的点）。

+ 替换swap源代码中的相关业务的合约地址(uniswapV2Factory/WETH/uniswapV2Router/multicall/initHash)。

+ 替换@uniswap/sdk代码中相关业务的合约地址(uniswapV2Factory/WETH/uniswapV2Router/multicall/initHash)。

+ swap源代码中涉及blocktimestamp有些相关的需要做处理。

## DAPP迁移总结

从上面uniswap的修改点我们可以看出，大部分的改动都是由于业务需要所做的改动，比如在代码中支持新的网络需要进行的必要网络配置改动，比如代码中的业务类的合约地址由于重新部署导致和之前有差异因此也需要改动，当然在实际生产环境中也可以做到用固定的账户去部署产生固定的合约地址，这种情况便不需要替换。这些改动本身还是和业务是强相关。因此了解DAPP的业务逻辑(包括业务合约)是非常有必要的，这对迁移过程中由于某些地方没有修改全导致出现一些问题的debug是很有帮助的，当然在PlatON网络与以太坊的差异点主要在出块时间导致blocktimestamp的单位差异也是需要特别注意的(如果业务代码中涉及的话)，整体上来看迁移过程还是很平滑的，因此在了解DAPP业务逻辑的前提下需要改动的工作量不会很大。
