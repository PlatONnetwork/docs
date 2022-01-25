---
id: Go_SDK
title: Go SDK
sidebar_label: Go SDK
---


**注：本Go-SDK仅面向Alaya网络，与PlatON网络存在一定的差异，文档内容待更新。**

## 开发库导入

可以先安装到GO_PATH路径下:  
`go get https://github.com/oldmanfan/platon-go-sdk`

或直接使用go.mod方式, 在文件中使用:  
`import github.com/oldmanfan/platon-go-sdk`

要求go版本: ^1.15.6

## 基础api使用

### Bech32地址

* **0x地址转bech32地址**
```go
func main() {
  bytes, _ := hexutil.Decode("0x1963dd5b88accDA8F86C0D9A487c36cCDC0Aba0F")
  b32Addr, _ := bech32util.ConvertAndEncode(network.MainNetHrp, bytes)
  fmt.Println("bech32 addr: ", b32Addr)
  // Expect Output: atp1r93a6kug4nx637rvpkdyslpkenwq4ws0t0g884
}
```

* **bech32地址转0x地址**
```go
func main() {
  b32Addr := "atp1r93a6kug4nx637rvpkdyslpkenwq4ws0t0g884"

  hrp, ethAddr, _ := bech32util.DecodeAndConvert(b32Addr)
  fmt.Printf("eth hrp: %s, hex: %s\n", hrp, hexutil.Encode(ethAddr))
  // Expect Output: 0x1963dd5b88accDA8F86C0D9A487c36cCDC0Aba0F
}
```

### 网络参数

* **初始化网络**

在`platon-go-sdk/network`中已经预置了Alaya的网络配置, 如果需要自定义网络, 可以自定义网络配置:

```go
 config := network.Config{"http://localhost:6789", big.newInt(1)}
```

* **预置的网络配置**
在sdk中已经预置了Alaya网络的一些默认设置: 
```go
  network.MainNetHrp
  network.TestNetHrp
  network.MainNetConfig
  network.TestNetConfig
  network.PposMainNetParams
  network.PposTestNetParams
```

## 钱包相关
本钱包同时支持**HDWallet**和**KeyStore Wallet**. 
默认情况下使用HDWallet管理账号, 如果仅通过导入私钥或导入KeyStore文件的方式导入账户,
则使用KeyStore存储账户信息.

### 创建钱包
创建钱包接口, 默认创建HDWallet钱包. 可以通过以下方式创建:
* `NewWallet`方法:  
调用该方法将创建一个HDWallet钱包, 同时会生成新的一组助记词和`DerivationPath`的index为0的账号.  
```go
w, err := web3go.NewWallet()
if err != nil {
    fmt.Println("new wall error: ", err)
    return
}
account0, _ := w.Accounts()[0]  // go the default 0 account
```
* `NewWalletByMnemonic`方法:  
调用该方法用来通过助记词导入钱包.
```go
mnemonic := "always brick access science decade nasty marriage attack fame topple pen add"
w, err := NewWalletByMnemonic(mnemonic)
```

* `NewWalletBySeed`方法:  
调用该方法用来通过钱包的seed导入钱包.
```go
seed := "0x9dfc7e3f52c4438d04db5488e13672faa37920ec62bacdc333a83974cb07bfdd893bfd46940dedfeb7ef30a142c4d07d552dd6589b40d3a58b941b7e9d6dae7e"
seedBytes, _ := hexutil.Decode(seed)
w, _ := NewWalletBySeed(seedBytes)
```
  
  下面的接口中, 我们默认已经通过上面的方法, 成功创建了一个钱包`w`.
### 创建新的账号
在钱包创建成功之后, 通过方法`NewAccount(index uint64)`方法, 创建一个序号为`index`的账号.
```go
account, err := w.NewAccount(1)
```
上面的示例代码将生成序号为`1`的账户.  

### 列出账号信息
使用`Accounts() ([]accounts.Account, error)`方法, 将列出钱包中所有的账号信息.

### 查询账号余额
使用`BalanceOf(owner common.Address) (*big.Int, error)`方法, 查询指定地址的余额.  

### 转账
使用`Transfer(from common.Address, to common.Address, value *big.Int) (string, error)`方法用来转账.
下面的代码示例, 演示了如何在ALAYA开发测试网上列出账户余额和转账的操作.

```go
const mnemonic = "always brick access science decade nasty marriage attack fame topple pen add"
  w, err := web3go.NewWalletByMnemonics(mnemonic)
  if err != nil {
    fmt.Println("import wall error: ", err)
    return
  }

  w.SetNetworkCfg(&web3go.DefaultTestNetCfg)

  accounts := w.Accounts()
  for _, account := range accounts {
    b, _ := w.BalanceOf(account.Address)
    addr, _ := account.ToMainNetAddress()
    fmt.Printf("balance of %s is %s\n", addr, b.String())
  }

  digest, err := w.Transfer(accounts[0].Address, common.MustBech32ToAddress("atp1ydaqepg8s48gqhz29kk0wrf3lqdtj38d8mkcz3"), big.NewInt(1000000000000000000))
  if err != nil {
    fmt.Println("transfer failed: ", err)
    return
  }

  fmt.Println("tx send: ", digest)
```
### 导出HDWallet的助记词
使用`ExportMnemonic() (string, error)`方法导出钱包的助记词.

### 导出HDWallet的账户详情
使用`ToString(account accounts.Account) string`方法导出一个HDWallet账号的详情,
包括Alaya主网地址, 开发测试网, 私钥.

### 导出KeyStore中账户的私钥
使用`ExportPrivateKey(account accounts.Account, passphrass string) (*ecdsa.PrivateKey, error)`方法
导出KeyStore中账户的私钥. `passphrase`是KeyStore文件的密码.

### 导出KeyStore文件
使用`ExportToKeyStore(account accounts.Account, path string, passphrase string) error`将账号`account`导出到`path`指定的路径下, 
并设置KeyStore文件的密码为`passphrase`.

### 导入私钥
仅仅只有私钥的情况下, 只能将账号的私钥导入到KeyStore文件中. 通过`ImportPrivateKey(key *ecdsa.PrivateKey, ksPath string, passphrase string) (accounts.Account, error)`
方法, 将私钥`key`导入到`ksPath`指定的KeyStore文件中, 并设置密码为`passphrase`.

### 导入KeyStore文件
通过`ImportFromKeyStore(path string, passphrase string, newpassphrase string) (accounts.Account, error)`方法
导入账号. 其中`path`是KeyStore文件的路径, `passphrase`是KeyStore文件的当前密码, `newpassphrase`是更新之后的KeyStore文件的密码.

### 签名交易但是不广播
在`Transfer`方法的说明中, 当我们进行转账操作的时候, 默认会通过`rpc.SendRawTransaction`方法, 将交易广播到网络中.
如果我们只需要签名但是无需广播到网络中, 则可以使用`SignTx(tx *types.Transaction, fromAccount accounts.Account) (*types.Transaction, error)`
方法对交易进行签名, 但是不广播到网络中, 同时获取签名之后的`V`, `R`, `S`数据.
```go
w, _ := NewWalletByMnemonics(mnemonic)
  w.NewAccount(1)
  fromAccount := w.Accounts()[0]
  toAccount := w.Accounts()[1]

  nonce := uint64(1)
  gasLimit := uint64(21000)
  gasPrice := big.NewInt(5000000000)
  tx := types.NewTransaction(nonce, toAccount.Address, big.NewInt(100000), gasLimit, gasPrice, nil)

  signedTx, _ := w.SignTx(tx, fromAccount)

  s, _ := json.Marshal(signedTx)

  fmt.Println("signed Tx: ", string(s))
```
上面的代码将产生类似的输出:
```json
{
    "nonce":"0x1",
    "gasPrice":"0x12a05f200",
    "gas":"0x5208",
    "to":"atx1u6vtwsz2fqw5ufnm3tm070k43scxhhc8r3nnts",
    "value":"0x186a0",
    "input":"0x",
    "v":"0x62297",
    "r":"0xd6904b0251615d525f6b3c699047977676baf2ba385f3ec8737e1a530c88796d",
    "s":"0x796efcf6b6bede3a49ec6c7969136d50a8fcbb5f43a8d8595e77c6b2b813732b",
    "hash":"0x3b8c1ef129e4b1e65ed527cbae7718c32a0a80c8a432d3c8b5c083e613485139"
}
```

## 基础RPC接口

基础`API`包括网络，交易，查询，节点信息，经济模型参数配置等相关的接口，具体参考如下`API`使用说明。

调用RPC接口, 需要使用`Geb3`对象: 
```go
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)
```

下面的示例中, 我们都将使用`web3g`这个对象来举例.

### ClientVersion

> 返回当前客户端版本

* **参数**

  无

* **返回值**

`(string, error)`

* **示例**

```go
func main() {
  // const alayaEndpoint = "https://openapi.alaya.network/rpc"
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  rsp, err := web3g.ClientVersion()
  fmt.Println("Version Info: ", rsp, err)
}
```

输出: `Version Info:  AlayaNetwork/alaya/v0.16.0-unstable-56b3a6aa/linux-amd64/go1.16.2 <nil>`

### Sha3

> 返回给定数据的keccak-256（不是标准sha3-256）

* **参数**

  String ：加密前的数据

* **返回值**

```go
(common.hash, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  sha3, err := web3g.Sha3("hello world")
  fmt.Println("sha3: ", sha3.Hex(), err)
  // Expect Output: 0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
}
```

### NetworkID

> 返回当前网络ID

* **参数**

  无

* **返回值**

```go
(*big.Int, error)
```

返回的整数即为网络ID

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  netver, err := web3g.NetworkID()
  fmt.Println(netver, err)
  // Expect Output: 1
}
```

### NetListening

> 如果客户端正在积极侦听网络连接，则返回true

* **参数**

  无

* **返回值**

```go
(bool, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  netlistening, err := web3g.NetListening()
  fmt.Println(netlistening, err)
  // Expect Output: true
}
```

### NetPeerCount

> 返回当前连接到客户端的对等体的数量

* **参数**

  ​	无

* **返回值**

```go
(uint64, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  netPeerCount, err := web3g.NetPeerCount()
  fmt.Println(netPeerCount, err)
  // Expect Output: 0
}
```

### ProtocolVersion

> 返回当前platon协议版本

* **参数**

  无

* **返回值**

```go
(uint64, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  protocolVer, err := web3g.ProtocolVersion()
  fmt.Println(protocolVer, err)
  // Expect Output: 65
}
```

### Syncing

> 返回一个对象，其中包含有关同步状态的数据

* **参数**

  无

* **返回值**

```go
(*platon.SyncProgress, error)
```

如果返回值为`(nil, nil)`, 表示没有在同步, 否则platon.SyncProgress中含有同步状态的数据.

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  syncing, err := web3g.Syncing()
  fmt.Println(syncing, err)
}
```

### GasPrice

> 返回gas当前价格

* **参数**

  无

* **返回值**

```go
(*big.Int, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  gasPrice, err := web3g.GasPrice()
  fmt.Println(gasPrice, err)
  // Expect Output: 1000000000
}
```

### Accounts

> 返回客户端拥有的地址列表

* **参数**

  无

* **返回值**

```go
([]string, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  accounts, err := web3g.Accounts()
  fmt.Println(accounts, err)
  // Expect Output: [atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a atp1rat5qr98desmch5jk4shhwpxspqw24ekgkhjdv atp1ulc54kqt9w6jla8pq264dfgqgcgcxnrlayve05]
}
```

### BlockNumber

> 返回当前最高块高

* **参数**

  无

* **返回值**

```go
(uint64, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  blockNum, err := web3g.BlockNumber()
  fmt.Println(blockNum, err)
  // Expect Output: 31329
}
```

### BalanceAt

> 返回查询地址余额

* **参数**
    - String ： address 需要查询的bech32格式地址
    - Pos:
      - "latest"  最新块高(默认)
      - "earliest" 最低块高
      - "pending" 未打包交易
      - *big.Int 指定块高

* **返回值**

```go
(*big.Int, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  balance, err := web3g.BalanceAt("atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a", "latest")
  fmt.Println(balance, err)
  // Expect Output: 999000000000000000000
}
```

### StorageAt

> 从给定地址的存储位置返回指定key的值

* **参数**
    - String : address  存储地址
    - key: 存储数据的hash
    - option:
      - "latest"  最新块高(默认)
      - "earliest" 最低块高
      - "pending" 未打包交易
      - *big.Int 指定块高

* **返回值**

```go
([]byte, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  storage, err := web3g.StorageAt(
    "atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a", 
    common.HexToHash("0x4b3b9abff5c129788aa18916328eadc8c02465a31237df27756c7e5c6dd72ce8"), 
    "latest")
  fmt.Println(storage, err)
  // Expect Output: 0x0
}
```

### TransactionCountByHash

> 根据区块hash查询区块中交易个数

* **参数**
  - common.Hash : blockHash 区块hash

* **返回值**

```go
(uint, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  count, err := web3g.TransactionCountByHash(common.HexToHash("0x4b3b9abff5c129788aa18916328eadc8c02465a31237df27756c7e5c6dd72ce8"))
  fmt.Println(count, err)
  // Expect Output: 0
}
```

### TransactionCountByNumber

> 根据区块块高，返回块高中的交易总数

* **参数**  
  - "latest"  最新块高(默认)
  - "earliest" 最低块高
  - "pending" 未打包交易
  - *big.Int 指定块高

* **返回值**

```go
(uint, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  count, err := web3g.TransactionCountByNumber("latest")
  fmt.Println(count, err)
  // Expect Output: 0
}
```

### CodeAt

>  返回给定地址的代码

* **参数**
    - account ： address 地址/合约
    - pos:
      - "latest"  最新块高(默认)
      - "earliest" 最低块高
      - "pending" 未打包交易
      - *big.Int 指定块高

* **返回值**

```go
([]byte, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  code, err := web3g.CodeAt("atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a", "latest")
  fmt.Println(code, err)
  // Expect Output: []
}
```

### SendRawTransaction

>  发送交易

* **参数**
  - tx *types.Transaction: 钱包签名后数据

* **返回值**

```go
(json.RawMessage, error)
```

* **示例**

```go
func main() {
	const alayaEndpoint = "http://172.16.64.132:6789"
	web3g, err := web3go.New(alayaEndpoint)

	const PrivateKey = "ed72066fa30607420635be56785595ccf935675a890bef7c808afc1537f52281"
	var credentials, _ = typedefs.NewCredential(PrivateKey, network.MainNetHrp)
	tx := types.NewTransaction(0, common.MustBech32ToAddress("atp1qv5ffg7z3h42zt4e035vja65d86al7q0nr9s0g"), nil, 0, nil, nil)
	signedTx, _ := credentials.SignTx(tx, network.MainNetChainId)
	rsp, err := web3g.SendRawTransaction(signedTx)
	fmt.Println(rsp, err)
}
```

### CallContract

>   执行一个消息调用交易，消息调用交易直接在节点旳VM中执行而 不需要通过区块链的挖矿来执行

* **参数**
    - platongosdk.CallMsg: 交易结构
      - common.Address : From : 交易发送地址
      - common.Address : To : 交易接收方地址
      - *big.Int ： Gas ：  本次交易gas用量上限
      - *big.Int ： GasPrice ： gas价格
      - *big.Int ：Value ： 转账金额
      - String ：Data ： 上链数据

* **返回值**

```go
([]byte, error)
```

* **示例**

```go
func main() {
	const alayaEndpoint = "http://172.16.64.132:6789"
	web3g, err := web3go.New(alayaEndpoint)

	from := common.MustBech32ToAddress("atp1r93a6kug4nx637rvpkdyslpkenwq4ws0t0g884")
	to := common.MustBech32ToAddress("atp1qv5ffg7z3h42zt4e035vja65d86al7q0nr9s0g")

	msg := platongosdk.CallMsg {
		From:     from,
		To:       &to,
		Gas:      0,
		GasPrice: nil,
		Value:    nil,
		Data:     nil,
	}

	rsp, err := web3g.CallContract(msg, "latest")
	fmt.Println(rsp, err)
}
```

### EstimateGas

>   估算合约方法gas用量

* **参数**
    - msg: platon_go_sdk.CallMsg交易结构
      - string : From : 交易发送地址
      - string : To : 交易接收方地址
      - *big.Int ： Gas ：  本次交易gas用量上限
      - *big.Int ： GasPrice ： gas价格
      - *big.Int ：Value ： 转账金额
      - []byte ：Data ： 上链数据
      
* **返回值**

```go
(uint, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  req := platongosdk.CallMsg{
    From:     "atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a",
    To:       "atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a",
    Gas:      0,
    GasPrice: nil,
    Value:    nil,
    Data:     nil,
  }
  gaslimit, err := web3g.EstimateGasLimit(req)
  fmt.Println(gaslimit, err)
  // Expect Output: 21000
}
```

### BlockByHash

>  根据区块hash查询区块信息

* **参数**
    - string ： blockHash  区块hash

* **返回值**

```go
(string, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  block, err := web3g.BlockByHash("0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc")
  fmt.Println(block, err)
  // Expect Output: {"extraData":"0xd8820d0085616c61796188676f312e31362e32856c696e757800000000000000c971b26df4489326a740841721ca639fba8ac24ca69db7cc1602d1aed4ab36ff31860425e9467201afc68be2757cca7c52e4d1832b39100b0c66a1f4671eab1400","gasLimit":"0x8fcf88","gasUsed":"0x0","hash":"0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","miner":"atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr5jy24r","nonce":"0x03187105be36f06f4fe451e6da7a8d46fec0158bc5c84af2f2ca10c1894b8be5616084f2d4143faab828a3fa4a03b018d38b9ba0b16bfdba2c2edbfcc9f47cd7753297b0d5d8c418a36bd35c1bba2596be","number":"0x8c6b","parentHash":"0x71d6573142d14423f357a6c7c222ff00eb894541f1cf351099c36de6c4e9d319","receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","size":"0x2db","stateRoot":"0x2fb0f3f9567606946fd990f2e640215955d84c452de29768d60d2655fce8f145","timestamp":"0x17aa9f6b4e5","transactions":[],"transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"}
}
```

### BlockByNumber

>  根据区块高度查询区块信息

* **参数**
    - pos:
      - "latest"  最新块高(默认)
      - "earliest" 最低块高
      - "pending" 未打包交易
      - *big.Int 指定块高

* **返回值**

```go
(string, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  block, err := web3g.BlockByNumber("latest")
  fmt.Println(block, err)
  // Expect Output: {"extraData":"0xd8820d0085616c61796188676f312e31362e32856c696e7578000000000000007b16a535ffdd3d17fca3a6bc48af875566cadff4ba056799403edc400b1381ee79c100bd9659b21fce74c855e304e511d0675ffd987c2a736dbc60f794aba7e801","gasLimit":"0x8fcf88","gasUsed":"0x0","hash":"0x38831d18d2339dc6b253235c4b15e1e0e41b3051d704e9569cf617440e17ee5a","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","miner":"atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr5jy24r","nonce":"0x02b6d7efb3c656fe57ac0bbd237121bcc45e5a8c29837d2a4d52e942c1533fa2823b6a483227e6ca8d77c140c3522d21eeeb39ea18e779ec7771744fb8f5122ecb1a730e5203d83fa25e7fdb18ebff6bde","number":"0x9228","parentHash":"0xb77808424333dfdc1e94a8bcfcc9fc2aeabc5152b244282d1e559c3f42f2679f","receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","size":"0x2db","stateRoot":"0x90bb5621483f7b2da204739b63c50f5428316b715cef685aa33fe9c2d86a99d5","timestamp":"0x17aaa0f7f15","transactions":[],"transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"}
}
```

### TransactionByBlockHashAndIndex

>  根据区块hash查询区块中指定序号的交易

* **参数**
    - string : blockHash  区块hash
    - *big.Int ： transactionIndex  交易在区块中的序号

* **返回值**

```go
(*types.Transaction, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  tx, err := web3g.TransactionByBlockHashAndIndex(common.HexToHash("0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc"), 0)
  fmt.Println(tx, err)
}
```

### TransactionByBlockNumberAndIndex

>  根据区块高度查询区块中指定序号的交易

* **参数**
    - pos:
      - "latest"  最新块高(默认)
      - "earliest" 最低块高
      - "pending" 未打包交易
      - *big.Int 指定块高
    - index: uint

* **返回值**

```go
(*types.Transaction, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  tx, err := web3g.TransactionByBlockNumberAndIndex("pending", 1)
  fmt.Println(tx, err)
}
```

### TransactionReceipt

>  根据交易hash查询交易回执

* **参数**
  - common.Hash : transactionHash  交易hash

* **返回值**

```go
(*types.Receipt, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  tx, err := web3g.TransactionReceipt(common.HexToHash("0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc"))
  fmt.Println(tx, err)
}
```

### AdminGetProgramVersion

>    获取代码版本

* **参数**

  无

* **返回值**

```go
(*params.ProgramVersion, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  pv, err := web3g.AdminGetProgramVersion()
  fmt.Println(pv, err)
  // Expect Output: {4096 0x0dca7024507a5d94c84b9c9deb417d56bf58f6fe5e37ecee86e64a62d1f518b67ddeeed7ba59a619b7f30ecd881164e96f9781b30309c07ea8985929401692de00}
}
```

* **ProgramVersion 对象解析**
    - *big.Int ： version ： 代码版本
    - string ： sign ： 代码版本签名

### GetSchnorrNIZKProve

>    获取bls的证明

* **参数**

  无

* **返回值**

```go
(string, error)
```

* **示例**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  p, err := web3g.GetSchnorrNIZKProve()
  fmt.Println(p, err)
  // Expect Output: b9f8498559d91d4823c2bea19a2ee315cc4418a3bfe06d328c99e7567d725939e7df9ec1902ca910cf789471342b971ed0810d7d61cda5dfb54b9270c9557256
}
```

## 系统合约调用

系统接口主要包含经济模型和治理相关的合约接口：
* 质押相关接口
* 委托相关接口
* 奖励相关接口
* 节点相关接口
* 治理相关接口
* 举报相关接口
* 锁仓相关接口

如上接口的介绍和使用，请参考如下接口说明。

使用合约时, 需要提供Credentials, 本文档中的示例, 统一使用以下的`credential`: 
```go
const PrivateKey = "ed72066fa30607420635be56785595ccf935675a890bef7c808afc1537f52281"
var credentials, _ = typedefs.NewCredential(PrivateKey, network.MainNetHrp)
```

### 质押相关接口

> 质押相关的接口：主要包括节点质押、修改质押信息、解除质押、查询质押信息等接口

#### 接口说明

##### **Staking**

> 节点质押：适用于矿工，节点质押后才有机会参与共识，获得收益。质押前需要自己的节点接入网络，质押时rpc链接地址必须是当前需要质押的节点。如果质押成功，节点会出现在候选人列表中。

* **入参**

  - NodeId   节点id，16进制格式，即节点公钥，可以通过管理台查询。
  - Amount  质押的金额
  - StakingAmountType  表示使用账户自由金额还是账户的锁仓金额做质押，StakingAmountType.FREE_AMOUNT_TYPE：自由金额，StakingAmountType.RESTRICTING_AMOUNT_TYPE：锁仓金额
  - BenefitAddress   收益账户，用于接收出块奖励和质押奖励的收益账户。
  - NodeName   节点的名称
  - ExternalId   外部Id(有长度限制，给第三方拉取节点描述的Id)，目前为keybase账户公钥，节点图标是通过该公钥获取。
  - WebSite   节点的第三方主页(有长度限制，表示该节点的主页)
  - Details   节点的描述(有长度限制，表示该节点的描述)
  - ProgramVersion  程序的真实版本，通过治理rpc获取
  - BlsPubKey   bls的公钥
  - BlsProof    bls的证明，通过治理rpc获取
  - RewardPer   委托所得到的奖励分成比例，1=0.01%   10000=100%

* **返回值**

```go
(typedefs.TransactionHash, error)
```
  * typedefs.TransactionHash 交易的hash

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  sp := req.StakingParam{
    NodeId:            "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050",
    Amount:            big.NewInt(10),
    StakingAmountType: typedefs.FREE_AMOUNT_TYPE,
    BenefitAddress:    MainFanAccount,
    ExternalId:        "",
    NodeName:          "chendai-node3",
    WebSite:           "www.baidu.com",
    Details:           "chendai-node3-details",
    ProcessVersion: typedefs.ProgramVersion{
      Version: big.NewInt(4096),
      Sign:    "0x0dca7024507a5d94c84b9c9deb417d56bf58f6fe5e37ecee86e64a62d1f518b67ddeeed7ba59a619b7f30ecd881164e96f9781b30309c07ea8985929401692de00",
    },
    BlsPubKey: "0x5ccd6b8c32f2713faa6c9a46e5fb61ad7b7400e53fabcbc56bdc0c16fbfffe09ad6256982c7059e7383a9187ad93a002a7cda7a75d569f591730481a8b91b5fad52ac26ac495522a069686df1061fc184c31771008c1fedfafd50ae794778811",
    BlsProof:  "0xa8fadadfc215f4f73fcdd539f5c2c8228a948f9d9f1f840329965a4abaec284be94d76f02839a0dd73d5a446dd5cd415c10b6ce621f0b1226924b8f3633f055a94b86446bb57dba0c9e85fb2e4b065773be39d8435352b6542a43c953afa0981",
    RewardPer: big.NewInt(1000),
  }

  tx, err := sc.Staking(sp)
  fmt.Println(tx, err)
}
```

##### **UnStaking**

> 节点撤销质押(一次性发起全部撤销，多次到账)，成功后节点会从候选人列表移除。只能由该节点的质押钱包地址发起交易。

* **入参**

  - string: nodeId   节点id，16进制格式，即节点公钥

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash 交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"

  list, err := sc.UnStaking(nodeId)
  if err != nil {
    t.Errorf("StakingContract.UnStaking failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }
  fmt.Println(string(result))
}
```

##### **UpdateStakingInfo**

> 修改质押信息，只能由该节点的质押钱包地址发起交易。

* **入参**

  - string: nodeId   节点id，16进制格式，即节点公钥，可以通过管理台查询（platon attach http://127.0.0.1:6789 --exec "admin.nodeInfo.id"）。
  - string: benifitAddress   收益账户，用于接收出块奖励和质押奖励的收益账户。
  - string: nodeName   节点的名称
  - string: externalId   外部Id(有长度限制，给第三方拉取节点描述的Id)，目前为keybase账户公钥，节点图标是通过该公钥获取。
  - string: webSite   节点的第三方主页(有长度限制，表示该节点的主页)
  - string: details   节点的描述(有长度限制，表示该节点的描述)
  - *big.Int: rewardPer   委托所得到的奖励分成比例，1=0.01%   10000=100%

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash 交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  req := req.UpdateStakingParam{
    NodeId:         "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050",
    BenifitAddress: MainFanAccount,
    ExternalId:     "",
    NodeName:       "chendai-node3",
    WebSite:        "www.baidu.com",
    Details:        "chendai-node3-details",
    RewardPer:      big.NewInt(1000),
  }
  list, err := sc.UpdateStakingInfo(req)
  if err != nil {
    t.Errorf("StakingContract.UpdateStakingInfo failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **AddStaking**

> 增持质押，增加已质押节点质押金，只能由该节点的质押钱包地址发起交易。

* **入参**

    - string: nodeId   节点id，16进制格式，即节点公钥
    - StakingAmountType：stakingAmountType  表示使用账户自由金额还是账户的锁仓金额做质押，StakingAmountType.FREE_AMOUNT_TYPE：自由金额，StakingAmountType.RESTRICTING_AMOUNT_TYPE：锁仓金额
    - *big.Int: addStakingAmount   增持的金额

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash 交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"

  list, err := sc.AddStaking(nodeId, typedefs.FREE_AMOUNT_TYPE, big.NewInt(10))
  if err != nil {
    t.Errorf("StakingContract.AddStaking failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetStakingInfo**

> 查询当前节点的质押信息

* **入参**

  - string: nodeId   节点id，16进制格式，即节点公钥

* **返回值**

```go
resp.Node, error
```

* **Node**：保存单个候选节点信息对象

  - string: NodeId   被质押的节点Id(也叫候选人的节点Id)

  - string: StakingAddress   发起质押时使用的账户

  - string: BenifitAddress	用于接受出块奖励和质押奖励的收益账户

  - *big.Int: RewardPer 当前结算周期奖励分成比例

  - *big.Int: NextRewardPer 下一个结算周期奖励分成比例

  - *big.Int: StakingTxIndex   发起质押时的交易索引

  - *big.Int: ProgramVersion  被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)

  - *big.Int: Status   候选人的状态，0: 节点可用，1: 节点不可用 ，2:节点出块率低但没有达到移除条件的，4:节点的最低质押门槛，8:节点被举报双签，16:节点出块率低且达到移除条件, 32: 节点主动发起撤销

  - *big.Int: StakingEpoch   当前变更质押金额时的结算周期

  - *big.Int: StakingBlockNum    发起质押时的区块高度

  - *big.Int: Shares   当前候选人总共质押加被委托的数目

  - *big.Int: Released   发起质押账户的自由金额的锁定期质押的数量

  - *big.Int: ReleasedHes   发起质押账户的自由金额的犹豫期质押的数量

  - *big.Int: RestrictingPlan   发起质押账户的锁仓金额的锁定期质押的数量

  - *big.Int: RestrictingPlanHes   发起质押账户的锁仓金额的犹豫期质押的数量

  - string: ExternalId   外部Id(有长度限制，给第三方拉取节点描述的Id)，目前为keybase账户公钥，节点图标是通过该公钥获取。

  - string: NodeName   被质押节点的名称(有长度限制，表示该节点的名称)

  - string: Website   节点的第三方主页(有长度限制，表示该节点的主页)

  - string: Details   节点的描述(有长度限制，表示该节点的描述)

  - *big.Int: DelegateEpoch  节点最后一次被委托的结算周期

  - *big.Int: DelegateTotal  节点被委托的生效总数量

  - *big.Int: DelegateTotalHes  节点被委托的未生效总数量

  - *big.Int: DelegateRewardTotal  候选人当前发放的总委托奖励

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  list, err := sc.GetStakingInfo(SNZPoolId)
  if err != nil {
    t.Errorf("StakingContract.GetStakingInfo failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetPackageReward**

> 查询当前结算周期的区块奖励

* **入参**

  无

* **返回值**

```go
(*big.Int, error)
```

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  list, err := sc.GetPackageReward()
  if err != nil {
    t.Errorf("StakingContract.GetPackageReward failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetStakingReward**

> 查询当前结算周期的质押奖励

* **入参**

  无

* **返回值**

```go
(*big.Int, error)
```

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  list, err := sc.GetStakingReward()
  if err != nil {
    t.Errorf("StakingContract.GetStakingReward failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }
  fmt.Println(string(result))
}
```

##### **GetAvgPackTime**

> 查询打包区块的平均时间

* **入参**

  无

* **返回值**

```go
(*big.Int, error)
```

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  list, err := sc.GetAvgPackTime()
  if err != nil {
    t.Errorf("StakingContract.GetAvgPackTime failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // 1073
}
```

### 委托相关接口

> PlatON经济模型中委托人相关的合约接口

#### 接口说明

##### **Delegate**

> 发起委托，委托已质押节点，委托给某个节点增加节点权重来获取收入

* **入参**

  - string: nodeId   节点id，16进制格式，即节点公钥.
  - StakingAmountType：stakingAmountType   表示使用账户自由金额还是账户的锁仓金额做质押，StakingAmountType.FREE_AMOUNT_TYPE：自由金额，StakingAmountType.RESTRICTING_AMOUNT_TYPE：锁仓金额
  - *big.Int: amount   委托的金额，单位Token，默认委托金额必须大于等于10LAT，该大小限制可以通过治理参数动态调整，可通过治理接口获得当前值（proposalContract.getGovernParamValue("staking", "operatingThreshold")）。

* **返回值**

``` java
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash 交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  dc := NewDelegateContract(config, credentials)

  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"

  amount := new(big.Int)
  amount.SetString("200000000000000000000", 10)
  list, err := dc.Delegate(nodeId, typedefs.FREE_AMOUNT_TYPE, amount)
  if err != nil {
    t.Errorf("DelegateContract.Delegate failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **UnDelegate**

> 减持/撤销委托(全部减持就是撤销)

* **入参**

  - string: nodeId   节点id，16进制格式，0x开头
  - *big.Int: stakingBlockNum   委托节点的质押块高，代表着某个node的某次质押的唯一标示
  - *big.Int: stakingAmount     减持的委托金额(按照最小单位算，1LAT = 10**18 Token)

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash  交易的回执

* **解交易回执**

   - *big.Int: Reward   获得解除委托时所提取的委托收益

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  dc := NewDelegateContract(config, credentials)

  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"
  stakingBlockNumber := big.NewInt(129518)
  amount := new(big.Int)
  amount.SetString("100000000000000000000", 10)
  list, err := dc.UnDelegate(nodeId, stakingBlockNumber, amount)
  if err != nil {
    t.Errorf("DelegateContract.UnDelegate failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

### 奖励相关接口

> PlatON经济模型中奖励相关的合约接口

#### 接口说明

##### **WithdrawDelegateReward**

> 提取账户当前所有的可提取的委托奖励

* **入参**

  无

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：交易的回执

* **解交易回执**
   - string：NodeId    节点ID
   - *big.Int：StakingNum  节点的质押块高
   - *big.Int：Reward  领取到的收益

* **合约使用**

```go
const (
  MainFanAccount = "atp1qv5ffg7z3h42zt4e035vja65d86al7q0nr9s0g"
  SNZPoolId      = "0xc0dc97ee57ba202faf012ecb72bf30aebcd2cf7c161d7012017e0320e0db15925c107998bd833d61ec4c2689172d7e34a0371f4511773641e00814c2632b0e66"
  XiaoYiId       = "0x0423022e05633d8d2a80cb66d65d7b8bb267ef3c5deeb6cc124726219ddcd05194f6e958207443c3d39fb81b1072025b24525c7f2a14a2a2076b59a9af7bb70e"
)

func main() {
  config := network.PposMainNetParams
  rc := NewRewardContract(config, credentials)

  receipt, err := rc.WithdrawDelegateReward()
  if err != nil {
    t.Errorf("Get Delegate Reward info failed: %s", err)
  }

  fmt.Println(receipt)
}
```

##### **GetDelegateReward**

> 查询当前账号可提取奖励明细

* **入参**
  - string：Address   委托人的账户地址
  - []string： NodeList  节点列表，如果为空查全部

* **返回值**

```go
([]resp.Reward, error)
```

* **Reward**：奖励明细
   - string：nodeId    节点ID
   - *big.Int：stakingNum  节点的质押块高
   - *big.Int：reward  领取到的收益

* **合约使用**

```go
const (
  MainFanAccount = "atp1qv5ffg7z3h42zt4e035vja65d86al7q0nr9s0g"
  SNZPoolId      = "0xc0dc97ee57ba202faf012ecb72bf30aebcd2cf7c161d7012017e0320e0db15925c107998bd833d61ec4c2689172d7e34a0371f4511773641e00814c2632b0e66"
  XiaoYiId       = "0x0423022e05633d8d2a80cb66d65d7b8bb267ef3c5deeb6cc124726219ddcd05194f6e958207443c3d39fb81b1072025b24525c7f2a14a2a2076b59a9af7bb70e"
)

func main() {
  config := network.PposMainNetParams
  rc := NewRewardContract(config, credentials)

  addr := common.MustBech32ToAddress(MainFanAccount)
  nodeId := []string{SNZPoolId, XiaoYiId}

  list, err := rc.GetDelegateReward(addr, nodeId)
  if err != nil {
    t.Errorf("Get Delegate Reward info failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // Expect Output: [{"nodeId":"0423022e05633d8d2a80cb66d65d7b8bb267ef3c5deeb6cc124726219ddcd05194f6e958207443c3d39fb81b1072025b24525c7f2a14a2a2076b59a9af7bb70e","stakingNum":10464209,"reward":"0x9715aca6c9eadbf2"},{"nodeId":"c0dc97ee57ba202faf012ecb72bf30aebcd2cf7c161d7012017e0320e0db15925c107998bd833d61ec4c2689172d7e34a0371f4511773641e00814c2632b0e66","stakingNum":500930,"reward":"0x16455593f23fd3c07"}]
}
```

### 节点相关合约

> PlatON经济模型中委托人相关的合约接口

#### 接口说明

##### **GetVerifierList**

> 查询当前结算周期的验证人队列

* **入参**

  无

* **返回值**

```go
[]resp.Node, error
```

* **Node**：保存单个候选节点信息对象

  - string: NodeId   被质押的节点Id(也叫候选人的节点Id)

  - string: StakingAddress   发起质押时使用的账户(撤销质押时，Token会被退回该账户或者该账户的锁仓信息中)

  - string: BenifitAddress	用于接受出块奖励和质押奖励的收益账户

  - *big.Int: RewardPer 当前结算周期奖励分成比例

  - *big.Int: NextRewardPer 下一个结算周期奖励分成比例

  - *big.Int: StakingTxIndex   发起质押时的交易索引

  - *big.Int: ProgramVersion  被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)

  - *big.Int: Status   候选人的状态，0: 节点可用，1: 节点不可用 ，2:节点出块率低但没有达到移除条件的，4:节点的Token不足最低质押门槛，8:节点被举报双签，16:节点出块率低且达到移除条件, 32: 节点主动发起撤销

  - *big.Int: StakingEpoch   当前变更质押金额时的结算周期

  - *big.Int: StakingBlockNum    发起质押时的区块高度

  - *big.Int: Shares   当前候选人总共质押加被委托的Token数目

  - *big.Int: Released   发起质押账户的自由金额的锁定期质押的Token

  - *big.Int: ReleasedHes   发起质押账户的自由金额的犹豫期质押的Token

  - *big.Int: RestrictingPlan   发起质押账户的锁仓金额的锁定期质押的Token

  - *big.Int: RestrictingPlanHes   发起质押账户的锁仓金额的犹豫期质押的Token

  - string: ExternalId   外部Id(有长度限制，给第三方拉取节点描述的Id)，目前为keybase账户公钥，节点图标是通过该公钥获取。

  - string: NodeName   被质押节点的名称(有长度限制，表示该节点的名称)

  - string: Website   节点的第三方主页(有长度限制，表示该节点的主页)

  - string: Details   节点的描述(有长度限制，表示该节点的描述)

  - *big.Int: DelegateEpoch  节点最后一次被委托的结算周期

  - *big.Int: DelegateTotal  节点被委托的生效总数量

  - *big.Int: DelegateTotalHes  节点被委托的未生效总数量

  - *big.Int: DelegateRewardTotal  候选人当前发放的总委托奖励


* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  nc := NewNodeContract(config, credentials)

  list, err := nc.GetVerifierList()
  if err != nil {
    t.Errorf("Get Verifier list failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetValidatorList**
> 查询当前共识周期的验证人列表

* **入参**

  无

* **返回值**

```go
[]resp.Node, error
```

* **Node**：保存单个候选节点信息对象

  - string: NodeId   被质押的节点Id(也叫候选人的节点Id)

  - string: StakingAddress   发起质押时使用的账户(撤销质押时，Token会被退回该账户或者该账户的锁仓信息中)

  - string: BenifitAddress	用于接受出块奖励和质押奖励的收益账户

  - *big.Int: RewardPer 当前结算周期奖励分成比例

  - *big.Int: NextRewardPer 下一个结算周期奖励分成比例

  - *big.Int: StakingTxIndex   发起质押时的交易索引

  - *big.Int: ProgramVersion  被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)

  - *big.Int: Status   候选人的状态，0: 节点可用，1: 节点不可用 ，2:节点出块率低但没有达到移除条件的，4:节点的Token不足最低质押门槛，8:节点被举报双签，16:节点出块率低且达到移除条件, 32: 节点主动发起撤销

  - *big.Int: StakingEpoch   当前变更质押金额时的结算周期

  - *big.Int: StakingBlockNum    发起质押时的区块高度

  - *big.Int: Shares   当前候选人总共质押加被委托的Token数目

  - *big.Int: Released   发起质押账户的自由金额的锁定期质押的Token

  - *big.Int: ReleasedHes   发起质押账户的自由金额的犹豫期质押的Token

  - *big.Int: RestrictingPlan   发起质押账户的锁仓金额的锁定期质押的Token

  - *big.Int: RestrictingPlanHes   发起质押账户的锁仓金额的犹豫期质押的Token

  - string: ExternalId   外部Id(有长度限制，给第三方拉取节点描述的Id)，目前为keybase账户公钥，节点图标是通过该公钥获取。

  - string: NodeName   被质押节点的名称(有长度限制，表示该节点的名称)

  - string: Website   节点的第三方主页(有长度限制，表示该节点的主页)

  - string: Details   节点的描述(有长度限制，表示该节点的描述)

  - *big.Int: DelegateEpoch  节点最后一次被委托的结算周期

  - *big.Int: DelegateTotal  节点被委托的生效总数量

  - *big.Int: DelegateTotalHes  节点被委托的未生效总数量

  - *big.Int: DelegateRewardTotal  候选人当前发放的总委托奖励


* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  nc := NewNodeContract(config, credentials)

  list, err := nc.GetValidatorList()
  if err != nil {
    t.Errorf("Get Validator list failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetCandidateList**

> 查询所有实时的候选人列表

* **入参**

  无

* **返回值**

```go
[]resp.Node, error
```

* **Node**：保存单个候选节点信息对象

  - string: NodeId   被质押的节点Id(也叫候选人的节点Id)

  - string: StakingAddress   发起质押时使用的账户(撤销质押时，Token会被退回该账户或者该账户的锁仓信息中)

  - string: BenifitAddress	用于接受出块奖励和质押奖励的收益账户

  - *big.Int: RewardPer 当前结算周期奖励分成比例

  - *big.Int: NextRewardPer 下一个结算周期奖励分成比例

  - *big.Int: StakingTxIndex   发起质押时的交易索引

  - *big.Int: ProgramVersion  被质押节点的PlatON进程的真实版本号(获取版本号的接口由治理提供)

  - *big.Int: Status   候选人的状态，0: 节点可用，1: 节点不可用 ，2:节点出块率低但没有达到移除条件的，4:节点的Token不足最低质押门槛，8:节点被举报双签，16:节点出块率低且达到移除条件, 32: 节点主动发起撤销

  - *big.Int: StakingEpoch   当前变更质押金额时的结算周期

  - *big.Int: StakingBlockNum    发起质押时的区块高度

  - *big.Int: Shares   当前候选人总共质押加被委托的Token数目

  - *big.Int: Released   发起质押账户的自由金额的锁定期质押的Token

  - *big.Int: ReleasedHes   发起质押账户的自由金额的犹豫期质押的Token

  - *big.Int: RestrictingPlan   发起质押账户的锁仓金额的锁定期质押的Token

  - *big.Int: RestrictingPlanHes   发起质押账户的锁仓金额的犹豫期质押的Token

  - string: ExternalId   外部Id(有长度限制，给第三方拉取节点描述的Id)，目前为keybase账户公钥，节点图标是通过该公钥获取。

  - string: NodeName   被质押节点的名称(有长度限制，表示该节点的名称)

  - string: Website   节点的第三方主页(有长度限制，表示该节点的主页)

  - string: Details   节点的描述(有长度限制，表示该节点的描述)

  - *big.Int: DelegateEpoch  节点最后一次被委托的结算周期

  - *big.Int: DelegateTotal  节点被委托的生效总数量

  - *big.Int: DelegateTotalHes  节点被委托的未生效总数量

  - *big.Int: DelegateRewardTotal  候选人当前发放的总委托奖励

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  nc := NewNodeContract(config, credentials)

  list, err := nc.GetCandidateList()
  if err != nil {
    t.Errorf("Get Candidate list failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // {"NodeId":"ab74f5500dd35497ce09b2dc92a3da26ea371dd9f6d438559b6e19c8f1622ee630951b510cb370aca8267f9bb9a9108bc532ec48dd077474cb79a48122f2ab03","BlsPubKey":"a74daa9361921a6d42eb8c150976efea2dab4a56d5177c9e4834985ce6e85270870c158bd47a67381d832ce2fe2b5c035c807d06a9468ed4cd7fef3cce3efbec0a0f40019cbe541266281c4fc86cbde3e7ae52932987328ea1313f754d33d504","StakingAddress":"atp16lcj06w6q2md0cztxru2z3sss4mrjy9vlkaaeu","BenefitAddress":"atp1r6jegq7twgcmnv6w3zhjlnlm9t5lsnsca72a6u","RewardPer":8888,"NextRewardPer":8888,"RewardPerChangeEpoch":48,"StakingTxIndex":0,"ProgramVersion":3840,"Status":0,"StakingEpoch":49,"StakingBlockNum":507203,"Shares":"0x1acf31fa638ce992fe9c","Released":"0x46a10a47349e9769c","ReleasedHes":"0x0","RestrictingPlan":"0x21e19e0c9bab2400000","RestrictingPlanHes":"0x0","DelegateEpoch":2038,"DelegateTotal":"0x1250a7164caaa53d8800","DelegateTotalHes":"0x0","DelegateRewardTotal":"0x3bf2da80056ba48c4dd","ExternalId":"DB667A6F239969F5","NodeName":"IRISnet-Bianjie","Website":"https://irisnet.org/irisnet-bianjie","Details":"Interchain Service Hub for NextGen Distributed Applications."},
}
```

###  治理相关合约

> PlatON治理相关的合约接口

#### 接口说明

##### **SubmitProposal**

> 提交提案

* **入参**

  - resp.Proposal: 提案对象

* **文本提案 CreateTextProposal**
  - string：Verifier 提交提案的验证人
  - string：PIDID  PIPID

* **升级提案 CreateVersionProposal**
  - string: verifier 提交提案的验证人
  - string: pIDID  PIPID
  - *big.Int: newVersion  升级版本
  - *big.Int: endVotingRounds   投票共识轮数量。说明：假设提交提案的交易，被打包进块时的共识轮序号时round1，则提案投票截止块高，就是round1 + endVotingRounds这个共识轮的第230个块高（假设一个共识轮出块250，ppos揭榜提前20个块高，250，20都是可配置的 ），其中0 < endVotingRounds <= 4840（约为2周，实际论述根据配置可计算），且为整数）

* **参数提案 CreateParamProposal**
  - string: Verifier 提交提案的验证人
  - string: PIDID  PIPID
  - string: Module  参数模块
  - string: Name  参数名称
  - string: NewValue 参数新值

* **取消提案 CreateCancelProposal**
  - string: Verifier 提交提案的验证人
  - string: PIDID  PIPID
  - *big.Int: EndVotingRounds  投票共识轮数量。参考提交升级提案的说明，同时，此接口中此参数的值不能大于对应升级提案中的
  - string: TobeCanceledProposalID  待取消的提案ID

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)

  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"
  proposal := resp.CreateTextProposal(nodeId, "1000")

  list, err := pc.SubmitProposal(proposal)
  if err != nil {
    t.Errorf("ProposalContract.SubmitTextProposal failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // 0x0c780c48043192c722cb152f18281ba0aa54d622d8cf6eb5fc3c7b9f1cc27606
}
```

##### **Vote**

> 给提案投票

* **入参**

  - ProgramVersion:ProgramVersion 程序的真实版本，治理rpc接口admin_getProgramVersion获取
  - VoteOption：VoteOption   投票类型，YEAS 赞成票，NAYS 反对票，ABSTENTIONS 弃权票
  - string: ProposalID   提案ID
  - string: Verifier   声明的节点，只能是验证人/候选人

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash 交易的回执

* **合约使用**：

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)

  proposalId := "0x261cf6c0f518aeddffb2aa5536685af6f13f8ba763c77b42f12ce025ef7170ed"
  pv := typedefs.ProgramVersion{
    Version: big.NewInt(4096),
    Sign:    "0x0dca7024507a5d94c84b9c9deb417d56bf58f6fe5e37ecee86e64a62d1f518b67ddeeed7ba59a619b7f30ecd881164e96f9781b30309c07ea8985929401692de00",
  }
  voption := typedefs.YEAS
  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"

  list, err := pc.Vote(pv, voption, proposalId, nodeId)
  if err != nil {
    t.Errorf("ProposalContract.Vote failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetProposal**

>  查询提案

* **入参**

  - string: ProposalID   提案id

* **返回值**

```go
(resp.Proposal, error)
```

* **Proposal**：保存单个提案信息的对象
  - string:	   ProposalId	提案ID
  - string:    Proposer   提案节点ID
  - int:       ProposalType   提案类型， 0x01：文本提案； 0x02：升级提案；0x03参数提案  0x04取消提案
  - string:    PiPid   提案PIPID
  - *big.Int:   SubmitBlock   提交提案的块高
  - *big.Int:   EndVotingBlock   提案投票结束的块高
  - *big.Int:   NewVersion   升级版本
  - *big.Int:   ToBeCanceled   提案要取消的升级提案ID
  - *big.Int:   ActiveBlock   提案生效块高，系统根据EndVotingBlock算出
  - string:   Verifier     提交提案的验证人

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)

  proposalId := "0x261cf6c0f518aeddffb2aa5536685af6f13f8ba763c77b42f12ce025ef7170ed"
  list, err := pc.GetProposal(proposalId)
  if err != nil {
    t.Errorf("ProposalContract.GetProposal failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // {"ProposalID":"0x261cf6c0f518aeddffb2aa5536685af6f13f8ba763c77b42f12ce025ef7170ed","Proposer":"9460fce5beea98e4d56c62a920bb041f45e48a5a7b96d12d02a16cbb20863be9c76491127533d9cefa5b4cec48ae6595b7ba347ef7dc8277cfb343eebde4646b","ProposalType":2,"PIPID":"12","SubmitBlock":5194289,"EndVotingBlock":5619480,"NewVersion":3584,"TobeCanceled":"","ActiveBlock":5619501,"Verifier":"","Module":"","Name":"","NewValue":""}

}
```

##### **GetTallyResult**

> 查询提案结果

* **入参**

  - string: proposalID   提案ID

* **返回值**

```go
(resp.TallyResult, error)
```

* **TallyResult**：保存单个提案结果的对象
  - string:   ProposalID   提案ID
  - *big.Int:   Yeas   赞成票票数
  - *big.Int:   Nays   反对票票数
  - *big.Int:   Abstentions   弃权票票数
  - *big.Int:   AccuVerifiers   在整个投票期内有投票资格的验证人总数
  - int:   Status   提案状态

* **status**
  - 1  投票中
  - 2  投票通过
  - 3  投票失败
  - 4 （升级提案）预生效
  - 5 （升级提案）生效
  - 6  被取消

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)

  proposalId := "0x261cf6c0f518aeddffb2aa5536685af6f13f8ba763c77b42f12ce025ef7170ed"
  list, err := pc.GetTallyResult(proposalId)
  if err != nil {
    t.Errorf("ProposalContract.GetTallyResult failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }
  fmt.Println(string(result))
  // {"ProposalID":"0x261cf6c0f518aeddffb2aa5536685af6f13f8ba763c77b42f12ce025ef7170ed","Yeas":102,"Nays":0,"Abstentions":0,"AccuVerifiers":116,"Status":5}
}
```

##### **GetProposalList**

> 查询提案列表

* **入参**

  无

* **返回值**

```go
[]resp.Proposal, error
```

* **Proposal**：保存单个提案的对象
  - string:	   ProposalId	提案ID
  - string:    Proposer   提案节点ID
  - int:    ProposalType   提案类型， 0x01：文本提案； 0x02：升级提案；0x03参数提案
  - string:    PiPid   提案PIPID
  - *big.Int:   SubmitBlock   提交提案的块高
  - *big.Int:   EndVotingBlock   提案投票结束的块高
  - *big.Int:   NewVersion   升级版本
  - string:   ToBeCanceled   提案要取消的升级提案ID
  - *big.Int:   ActiveBlock   提案生效块高，系统根据EndVotingBlock算出
  - string:   Verifier     提交提案的验证人

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)

  list, err := pc.GetProposalList()
  if err != nil {
    t.Errorf("ProposalContract.GetProposalList failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // [{"ProposalID":"0x261cf6c0f518aeddffb2aa5536685af6f13f8ba763c77b42f12ce025ef7170ed","Proposer":"9460fce5beea98e4d56c62a920bb041f45e48a5a7b96d12d02a16cbb20863be9c76491127533d9cefa5b4cec48ae6595b7ba347ef7dc8277cfb343eebde4646b","ProposalType":2,"PIPID":"12","SubmitBlock":5194289,"EndVotingBlock":5619480,"NewVersion":3584,"TobeCanceled":"","ActiveBlock":5619501,"Verifier":"","Module":"","Name":"","NewValue":""},{"ProposalID":"0xf61e717687fb76ef097b7078f9ea6723dd30926ec754ffc4db266b57461b1011","Proposer":"9460fce5beea98e4d56c62a920bb041f45e48a5a7b96d12d02a16cbb20863be9c76491127533d9cefa5b4cec48ae6595b7ba347ef7dc8277cfb343eebde4646b","ProposalType":2,"PIPID":"14","SubmitBlock":8296399,"EndVotingBlock":8623980,"NewVersion":3840,"TobeCanceled":"","ActiveBlock":8624001,"Verifier":"","Module":"","Name":"","NewValue":""},{"ProposalID":"0x81a704420dfdafb9056ad1b85066d896899186dac4ce5f72753c8e74131841bc","Proposer":"0eb6b43a9945a062e67b45248084ec4b5da5f22d35a58991c8f508666253fbd1b679b633728f4c3384ee878ca5efca7623786fdf623b4e5288ace830dc237614","ProposalType":1,"PIPID":"15","SubmitBlock":10894675,"EndVotingBlock":12104230,"NewVersion":null,"TobeCanceled":"","ActiveBlock":null,"Verifier":"","Module":"","Name":"","NewValue":""}]
}
```

##### **DeclareVersion**

> 版本声明

* **入参**

  - ProgramVersion:ProgramVersion 程序的真实版本，治理rpc接口admin_getProgramVersion获取
  - string: Verifier   声明的节点，只能是验证人/候选人

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash  交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)
  version := typedefs.ProgramVersion{
    Version: big.NewInt(4096),
    Sign:    "0x0dca7024507a5d94c84b9c9deb417d56bf58f6fe5e37ecee86e64a62d1f518b67ddeeed7ba59a619b7f30ecd881164e96f9781b30309c07ea8985929401692de00",
  }

  verifier := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"
  list, err := pc.DeclareVersion(version, verifier)
  if err != nil {
    t.Errorf("ProposalContract.DeclareVersion failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetActiveVersion**

> 查询节点的链生效版本

* **入参**

  无

* **返回值**

```go
(uint64, error)
```

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  pc := NewProposalContract(config, credentials)

  list, err := pc.GetActiveVersion()
  if err != nil {
    t.Errorf("ProposalContract.GetActiveVersion failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
  // 3804
}
```

###  双签举报相关接口

> PlatON举报惩罚相关的合约接口

#### 接口说明

##### **ReportDoubleSign**

> 举报双签

* **入参**

  - typedefs.DuplicateSignType:   枚举，代表双签类型：PREPARE_BLOCK，PREPARE_VOTE，VIEW_CHANGE
  - string：data   单个证据的json值，格式参照[RPC接口Evidences](#evidences_interface)

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewSlashContract(config, credentials)

  evidence := "{\"prepareA\":{\"epoch\":0,\"viewNumber\":0,\"blockHash\":\"0x47c0b9cc1e544e866ed3afb1a2fec5f8c0c6d97a04680f56f26b238b362482ca\",\"blockNumber\":583848,\"blockIndex\":0,\"blockData\":\"0x005e8ae4a78cd34d2c9fb08abda0e39d781e4abc58ea7f9b03c56f6a8e804027\",\"validateNode\":{\"index\":0,\"address\":\"0x0550184a50db8162c0cfe9296f06b2b1db019331\",\"nodeId\":\"77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050\",\"blsPubKey\":\"5ccd6b8c32f2713faa6c9a46e5fb61ad7b7400e53fabcbc56bdc0c16fbfffe09ad6256982c7059e7383a9187ad93a002a7cda7a75d569f591730481a8b91b5fad52ac26ac495522a069686df1061fc184c31771008c1fedfafd50ae794778811\"},\"signature\":\"0x974d787c28b7fb2ec67decdb750e4e29ace69e07ab3d1864c4fba9b7eb780868fb36966183ac6f156b99b0f1d8034d8500000000000000000000000000000000\"},\"prepareB\":{\"epoch\":0,\"viewNumber\":0,\"blockHash\":\"0x4bf9291e34fb7ae3f93eb4bb77a4b41251dce247e4a9b8e120dbf69a310f87bb\",\"blockNumber\":583848,\"blockIndex\":0,\"blockData\":\"0x4b6fd7afae0fd5ab3b2457720297165539623562eff16827981904357720b995\",\"validateNode\":{\"index\":0,\"address\":\"0x0550184a50db8162c0cfe9296f06b2b1db019331\",\"nodeId\":\"77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050\",\"blsPubKey\":\"5ccd6b8c32f2713faa6c9a46e5fb61ad7b7400e53fabcbc56bdc0c16fbfffe09ad6256982c7059e7383a9187ad93a002a7cda7a75d569f591730481a8b91b5fad52ac26ac495522a069686df1061fc184c31771008c1fedfafd50ae794778811\"},\"signature\":\"0x615967a22bb06245a76c94ce8914c95bdc9eda8fbfaa97b85d8472c7c7bb10bc6aff325798965e583130690ac7ef568c00000000000000000000000000000000\"}}"
  list, err := sc.ReportDoubleSign(typedefs.PREPARE_BLOCK, evidence)
  if err != nil {
    t.Errorf("SlashContract.ReportDoubleSign failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **CheckDoubleSign**

> 查询节点是否已被举报过多签

* **入参**

  - typedefs.DuplicateSignType   枚举，代表双签类型：prepareBlock，EprepareVote，viewChange
  - string：address   举报的节点地址
  - *big.Int: blockNumber   多签的块高

* **返回值**

```go
(string, error)
```

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewSlashContract(config, credentials)

  nodeId := "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050"
  blockNumber := big.NewInt(583848)
  list, err := sc.CheckDoubleSign(typedefs.PREPARE_BLOCK, nodeId, blockNumber)
  if err != nil {
    t.Errorf("SlashContract.CheckDoubleSign failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }
  fmt.Println(string(result))
}
```

###  锁仓相关接口

> PlatON锁仓相关接口

#### 接口说明

##### **CreateRestrictingPlan**

> 创建锁仓计划

* **入参**

  - string：address   锁仓释放到账账户
  - []resp.RestrictingPlan   锁仓计划列表（数组）
    - Epoch：锁仓的周期，表示结算周期的倍数
    - Amount：表示目标区块上待释放的金额。

* **返回值**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：交易的回执

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  rpc := NewRestrictingPlanContract(config, credentials)

  addr := common2.MustBech32ToAddress(MainFanAccount)

  plan1Amount := new(big.Int)
  plan1Amount.SetString("1000000000000000000", 10)
  plan1 := resp.RestrictingPlan{
    Epoch:  big.NewInt(100),
    Amount: plan1Amount,
  }

  plan2Amount := new(big.Int)
  plan2Amount.SetString("2000000000000000000", 10)
  plan2 := resp.RestrictingPlan{
    Epoch:  big.NewInt(200),
    Amount: plan2Amount,
  }
  plans := []resp.RestrictingPlan{plan1, plan2}

  list, err := rpc.CreateRestrictingPlan(addr, plans)
  if err != nil {
    t.Errorf("RestrictingPlanContract.CreateRestrictingPlan failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }

  fmt.Println(string(result))
}
```

##### **GetRestrictingInfo**

> 获取锁仓计划

* **入参**

  - common.Address address   锁仓释放到账账户

* **返回值**

```go
(resp.RestrictingItem, error)
```

* **RestrictingItem**：保存锁仓信息对象
  - *big.Int: Balance    锁仓余额
  - *big.Int: Pledge   质押/抵押金额
  - *big.Int: Debt   欠释放金额
  - []RestrictingInfo：Info   锁仓分录信息
* **RestrictingInfo**：保存单个锁仓分录信息的对象
  - *big.Int: BlockNumber    释放区块高度
  - *big.Int: Amount   释放金额

* **合约使用**

```go
func main() {
  config := network.PposMainNetParams
  rpc := NewRestrictingPlanContract(config, credentials)

  addr := common2.MustBech32ToAddress(MainFanAccount)
  list, err := rpc.GetRestrictingInfo(addr)
  if err != nil {
    t.Errorf("RestrictingPlanContract.GetRestrictingInfo failed: %s", err)
  }

  result, err := json.Marshal(list)
  if err != nil {
    t.Errorf("Marshal of list failed: %s", err)
  }
  fmt.Println(string(result))
}
```

## Solidity合约调用

Alaya sdk的`contracts`模块用于在Alaya网络上部署, 操作智能合约.

### 准备工作
要通过sdk部署和调用合约, 需要使用到`solc`, 请按照官方文档安装好solc编译器. 以及按照[Alaya-Go](https://github.com/AlayaNetwork/Alaya-Go) 的说明, 项目编译成功之后, 在`build/bin`目录下, 可以找到`abigen`工具.

为了演示如何使用, 我们准备了一个测试合约`store.sol`(关于如何编写合约, 请参考solidity官方教程):
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Store {
  event ItemSet(bytes32 key, bytes32 value);

  string public version;
  mapping (bytes32 => bytes32) public items;

  constructor(string memory _version) {
    version = _version;
  }

  function setItem(bytes32 key, bytes32 value) external {
    items[key] = value;
    emit ItemSet(key, value);
  }
}

```

然后, 我们使用以下命令, 编译出我们需要的bin和abi文件:  
`solc --bin --abi store.sol -o Store`  
执行成功之后, 会在`Store`目录下生成Store.abi和Store.bin两个文件.   

接着, 我们使用`abigen`工具, 生成`Store.go`文件:  
`abigen --bin=Store.bin --abi=Store.abi --pkg=store --out=Store.go`

至此, 我们需要的文件已经准备完毕.  

本文以下部分描述的操作, 可以在[这里](../examples/contracts-operation.go)找到完整的使用示例.  

### 部署合约
在操作合约之前, 我们需要先获得一个`Contract`对象:
```go
contract := contracts.Contract{
    Url:        AlayaEndpoint,
    PrivateKey: privateKey,
}

opts, client, err := contract.Init()
if err != nil {
    log.Fatal(err)
}
```
在Init操作完成之后, 我们获得了`opts`和`client`对象, 它们的类型分别是`*bind.TransactOpts`和`bind.ContractBackend`, 有了这两个对象, 我们就可以通过以下代码来部署合约了:  
```go
func toDeployContract(opts *bind.TransactOpts, client bind.ContractBackend) string {
  input := "1.0"
  address, tx, _, err := store.DeployStore(opts, client, input)
  if err != nil {
    log.Fatal(err)
  }

  fmt.Println(address.Hex())
  fmt.Println(tx.Hash().Hex())
  // wait until tx confirmed
  time.Sleep(time.Duration(10) * time.Second)
  return address.Hex()
}
```

部署成功之后, 我们可以获得交易的hash以及合约部署的地址. 通过这引地址, 我们就可以用来调用合约的方法了.

### 调用合约
合约部署成功之后, 我们可以调用它的方法来完成工作了, 以下的代码示例说明了如果调用`Version`, `SetItems`和`Items`方法:
```go
func toCallContractMethod(hexContractAddr string, opts *bind.TransactOpts, client bind.ContractBackend) {
  addr := common.HexToAddress(hexContractAddr)
  instance, err := store.NewStore(addr, client)
  if err != nil {
    log.Fatal("new instance failed: ", err)
  }
  // to query version
  ver, err := instance.Version(nil)
  if err != nil {
    log.Fatal(err)
  }

  fmt.Println("version of contract is ", ver)

  // to set new items
  key := [32]byte{}
  value := [32]byte{}
  copy(key[:], []byte("hello"))
  copy(value[:], []byte("kitty"))

  tx, err := instance.SetItem(opts, key, value)
  if err != nil {
    log.Fatal(err)
  }

  fmt.Printf("tx sent: %s\n", tx.Hash().Hex())

  time.Sleep(time.Duration(10) * time.Second)

  result, err := instance.Items(nil, key)
  if err != nil {
    log.Fatal(err)
  }

  fmt.Println(string(result[:])) // kitty
}
```

### 总结
在本文中, 我们演示了怎样部署合约, 以及调用合约中的`view`方法和`非view`方法.
