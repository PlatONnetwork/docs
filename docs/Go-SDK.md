---
id: Go_SDK
title: Go SDK
sidebar_label: Go SDK
---

**Note: This Go-SDK is for the Alaya network only, there are some differences with the PlatON network, the documentation is to be updated.**

## Development library import

You can install it to the GO_PATH path first:  
`go get https://github.com/oldmanfan/platon-go-sdk`

Or use go.mod directly, use in the file:  
`import github.com/oldmanfan/platon-go-sdk`

Requires go version: ^1.15.6

## Basic api usage

### Bech32 address

* **0x address to bech32 address**
```go
func main() {
  bytes, _ := hexutil.Decode("0x1963dd5b88accDA8F86C0D9A487c36cCDC0Aba0F")
  b32Addr, _ := bech32util.ConvertAndEncode(network.MainNetHrp, bytes)
  fmt.Println("bech32 addr: ", b32Addr)
  // Expect Output: atp1r93a6kug4nx637rvpkdyslpkenwq4ws0t0g884
}
```

* **bech32 address to 0x address**
```go
func main() {
  b32Addr := "atp1r93a6kug4nx637rvpkdyslpkenwq4ws0t0g884"

  hrp, ethAddr, _ := bech32util.DecodeAndConvert(b32Addr)
  fmt.Printf("eth hrp: %s, hex: %s\n", hrp, hexutil.Encode(ethAddr))
  // Expect Output: 0x1963dd5b88accDA8F86C0D9A487c36cCDC0Aba0F
}
```

### Network parameters

* **Initialize network**

Alaya's network configuration has been preset in `platon-go-sdk/network`, if you need to customize the network, you can customize the network configuration:

```go
 config := network.Config{"http://localhost:6789", big.newInt(1)}
```

* **Preset network configuration**
Some default settings of the Alaya network have been preset in the SDK:
```go
  network.MainNetHrp
  network.TestNetHrp
  network.MainNetConfig
  network.TestNetConfig
  network.PposMainNetParams
  network.PposTestNetParams
```

## Wallet Related
This wallet supports both **HDWallet** and **KeyStore Wallet**.
By default, HDWallet is used to manage the account. If you only import the account by importing the private key or importing the KeyStore file,
Then use KeyStore to store account information.

### Create a wallet
Create a wallet interface, the HDWallet wallet is created by default. It can be created in the following ways:
* `NewWallet` method:
Calling this method will create an HDWallet wallet, and will generate a new set of mnemonics and an account whose index of DerivationPath is 0.
```go
w, err := web3go.NewWallet()
if err != nil {
    fmt.Println("new wall error: ", err)
    return
}
account0, _ := w.Accounts()[0] // go the default 0 account
```
* `NewWalletByMnemonic` method:
Call this method to import the wallet through mnemonic words.
```go
mnemonic := "always brick access science decade nasty marriage attack fame topple pen add"
w, err := NewWalletByMnemonic(mnemonic)
```

* `NewWalletBySeed` method:
This method is called to import the wallet through the wallet's seed.
```go
seed := "0x9dfc7e3f52c4438d04db5488e13672faa37920ec62bacdc333a83974cb07bfdd893bfd46940dedfeb7ef30a142c4d07d552dd6589b40d3a58b941b7e9d6dae7e"
seedBytes, _ := hexutil.Decode(seed)
w, _ := NewWalletBySeed(seedBytes)
```
  
  In the following interface, we have successfully created a wallet `w` through the above method by default.
### Create a new account
After the wallet is successfully created, use the method `NewAccount(index uint64)` method to create an account with the serial number `index`.
```go
account, err := w.NewAccount(1)
```
The example code above will generate an account with the serial number `1`.

### List account information
Using the `Accounts() ([]accounts.Account, error)` method, all account information in the wallet will be listed.

### Check account balance
Use the `BalanceOf(owner common.Address) (*big.Int, error)` method to query the balance of the specified address.

### Transfer
Use `Transfer(from common.Address, to common.Address, value *big.Int) (string, error)` method to transfer money.
The following code example demonstrates how to list account balances and transfers on the Alaya testnet.

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
### Export HDWallet mnemonic
Use the `ExportMnemonic() (string, error)` method to export the mnemonic phrase of the wallet.

### Export HDWallet account details
Use the `ToString(account accounts.Account) string` method to export the details of an HDWallet account,
Including Alaya main network address, test network address, and private key.

### Export the private key of the account in the KeyStore
Use `ExportPrivateKey(account accounts.Account, passphrass string) (*ecdsa.PrivateKey, error)` method
Export the private key of the account in the KeyStore. `passphrase` is the password of the KeyStore file.

### Export KeyStore file
Use `ExportToKeyStore(account accounts.Account, path string, passphrase string) error` to export the account `account` to the path specified by `path`,
And set the password of the KeyStore file to `passphrase`.

### Import private key
With only the private key, you can only import the private key of the account into the KeyStore file. Via `ImportPrivateKey(key *ecdsa.PrivateKey, ksPath string, passphrase string) (accounts.Account, error)`
Method, import the private key `key` into the KeyStore file specified by `ksPath`, and set the password to `passphrase`.

### Import KeyStore file
Through the `ImportFromKeyStore(path string, passphrase string, newpassphrase string) (accounts.Account, error)` method
Import the account. Where `path` is the path of the KeyStore file, `passphrase` is the current password of the KeyStore file, and `newpassphrase` is the password of the updated KeyStore file.

### Sign transaction but not broadcast
In the description of the `Transfer` method, when we perform a transfer operation, by default, the transaction will be broadcast to the network through the `rpc.SendRawTransaction` method.
If we only need the signature but do not need to broadcast to the network, we can use `SignTx(tx *types.Transaction, fromAccount accounts.Account) (*types.Transaction, error)`
The method signs the transaction, but does not broadcast it to the network, and at the same time obtains the `V`, `R`, and `S` data after the signature.
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
The above code will produce similar output:
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

## Basic RPC interface

Basic `API` includes network, transaction, query, node information, economic model parameter configuration and other related interfaces. For details, please refer to the following `API` instructions.

To call the RPC interface, you need to use the `Geb3` object:
```go
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)
```

In the following examples, we will use the object `web3g` as an example.

### ClientVersion

> Return to the current client version

* **Parameters**  

  no

* **return value**

`(string, error)`

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  rsp, err := web3g.ClientVersion()
  fmt.Println("Version Info: ", rsp, err)
}
```

Output: `Version Info: AlayaNetwork/alaya/v0.16.0-unstable-56b3a6aa/linux-amd64/go1.16.2 <nil>`

### Sha3

> Return keccak-256 of the given data (not standard sha3-256)

* **Parameters**  

  string: Data before encryption

* **return value**

```go
(common.hash, error)
```

* **Example**

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

> Return the current network ID

* **Parameters**  

  no

* **return value**

```go
(*big.Int, error)
```

The integer returned is the network ID

* **Example**

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

> If the client is actively listening for network connections, return true

* **Parameters**  

  no

* **return value**

```go
(bool, error)
```

* **Example**

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

> Returns the number of peers currently connected to the client

* **Parameters**  

  ​ None

* **return value**

```go
(uint64, error)
```

* **Example**

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

> Return to the current platon protocol version

* **Parameters**  

  no

* **return value**

```go
(uint64, error)
```

* **Example**

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

> Returns an object containing data about the synchronization state

* **Parameters**  

  no

* **return value**

```go
(*platon.SyncProgress, error)
```

If the return value is `(nil, nil)`, it means that there is no synchronization, otherwise platon.SyncProgress contains the data of the synchronization state.

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  syncing, err := web3g.Syncing()
  fmt.Println(syncing, err)
}
```

### GasPrice

> Return the current price of gas

* **Parameters**  

  no

* **return value**

```go
(*big.Int, error)
```

* **Example**

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

> Return to the list of addresses owned by the client

* **Parameters**  

  no

* **return value**

```go
([]string, error)
```

* **Example**

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

> Return the current highest block height

* **Parameters**  

  no

* **return value**

```go
(uint64, error)
```

* **Example**

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

> Return to query address balance

* **Parameters**  
    - string ： address The bech32 format address to be queried
    - pos:
      - "latest" latest block height (default)
      - "earliest" minimum block height
      - "pending" unpackaged transaction
      - *big.Int specifies the block height

* **return value**

```go
(*big.Int, error)
```

* **Example**

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

> Return the value of the specified key from the storage location of the given address

* **Parameters**  
    - string: address storage address
    - key: the hash of the stored data
    - option:
      - "latest" latest block height (default)
      - "earliest" minimum block height
      - "pending" unpackaged transaction
      - *big.Int specifies the block height

* **return value**

```go
([]byte, error)
```

* **Example**

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

> Query the number of transactions in the block according to the block hash

* **Parameters**  
  - common.Hash: blockHash block hash

* **return value**

```go
(uint, error)
```

* **Example**

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

> According to the block height, return the total number of transactions in the block height

* **Parameters**  
  - "latest" latest block height (default)
  - "earliest" minimum block height
  - "pending" unpackaged transaction
  - *big.Int specifies the block height

* **return value**

```go
(uint, error)
```

* **Example**

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

> Return the code of the given address

* **Parameters**  
    - account: address address/contract
    - pos:
      - "latest" latest block height (default)
      - "earliest" minimum block height
      - "pending" unpackaged transaction
      - *big.Int specifies the block height

* **return value**

```go
([]byte, error)
```

* **Example**

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

> Send transaction

* **Parameters**    
  - tx *types.Transaction: wallet signature data

* **return value**

```go
(json.RawMessage, error)
```

* **Example**

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

> Execute a message call transaction, the message call transaction is directly executed in the node's VM without the need to execute through blockchain mining

* **Parameters**  
    - platongosdk.CallMsg: transaction structure
      - common.Address: From: Transaction send address
      - common.Address: To: The address of the recipient of the transaction
      - *big.Int: Gas: the upper limit of gas usage in this transaction
      - *big.Int: GasPrice: gas price
      - *big.Int: Value: transfer amount
      - string: Data: Data on the chain

* **return value**

```go
([]byte, error)
```

* **Example**

```go
func main() {
const alayaEndpoint = "http://172.16.64.132:6789"
web3g, err := web3go.New(alayaEndpoint)

from := common.MustBech32ToAddress("atp1r93a6kug4nx637rvpkdyslpkenwq4ws0t0g884")
to := common.MustBech32ToAddress("atp1qv5ffg7z3h42zt4e035vja65d86al7q0nr9s0g")

msg := platongosdk.CallMsg {
From: from,
To: &to,
Gas: 0,
GasPrice: nil,
Value: nil,
Data: nil,
}

rsp, err := web3g.CallContract(msg, "latest")
fmt.Println(rsp, err)
}
```

### EstimateGas

> Estimate gas usage of contract method

* **Parameters**  
    - msg: platon_go_sdk.CallMsg transaction structure
      - string: From: transaction send address
      - string: To: address of the recipient of the transaction
      - *big.Int: Gas: the upper limit of gas usage in this transaction
      - *big.Int: GasPrice: gas price
      - *big.Int: Value: transfer amount
      - []byte ：Data ：Data on the chain
      
* **return value**

```go
(uint, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  req := platongosdk.CallMsg{
    From: "atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a",
    To: "atp1fgdm0vsevzc8wy2094vmw4dtpdnph25j6l9e8a",
    Gas: 0,
    GasPrice: nil,
    Value: nil,
    Data: nil,
  }
  gaslimit, err := web3g.EstimateGasLimit(req)
  fmt.Println(gaslimit, err)
  // Expect Output: 21000
}
```

### BlockByHash

> Query block information based on block hash

* **Parameters**  
    - string: blockHash block hash

* **return value**

```go
(string, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  block, err := web3g.BlockByHash("0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc")
  fmt.Println(block, err)
  // Expect Output: { "extraData": "0xd8820d0085616c61796188676f312e31362e32856c696e757800000000000000c971b26df4489326a740841721ca639fba8ac24ca69db7cc1602d1aed4ab36ff31860425e9467201afc68be2757cca7c52e4d1832b39100b0c66a1f4671eab1400", "gasLimit": "0x8fcf88", "gasUsed": "0x0", "hash": "0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc", "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "miner": "atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr5jy24r","nonce":"0x03187105be36f06f4fe451e6da7a8d46fec0158bc5c84af2f2ca10c1894b8be 5616084f2d4143faab828a3fa4a03b018d38b9ba0b16bfdba2c2edbfcc9f47cd7753297b0d5d8c418a36bd35c1bba2596be "," number ":" 0x8c6b "," parentHash ":" 0x71d6573142d14423f357a6c7c222ff00eb894541f1cf351099c36de6c4e9d319 "," receiptsRoot ":" 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 "," size ":" 0x2db "," stateRoot ":" 0x2fb0f3f9567606946fd990f2e640215955d84c452de29768d60d2655fce8f145 "," timestamp ":" 0x17aa9f6b4e5 " ,"transactions":[],"transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"}
}
```

### BlockByNumber

> Query block information based on block height

* **Parameters**  
    - pos:
      - "latest" latest block height (default)
      - "earliest" minimum block height
      - "pending" unpackaged transaction
      - *big.Int specifies the block height

* **return value**

```go
(string, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  block, err := web3g.BlockByNumber("latest")
  fmt.Println(block, err)
  // Expect Output: { "extraData": "0xd8820d0085616c61796188676f312e31362e32856c696e7578000000000000007b16a535ffdd3d17fca3a6bc48af875566cadff4ba056799403edc400b1381ee79c100bd9659b21fce74c855e304e511d0675ffd987c2a736dbc60f794aba7e801", "gasLimit": "0x8fcf88", "gasUsed": "0x0", "hash": "0x38831d18d2339dc6b253235c4b15e1e0e41b3051d704e9569cf617440e17ee5a", "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "miner": "atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr5jy24r","nonce":"0x02b6d7efb3c656fe57ac0bbd237121bcc45e5a8c29837d2a4d52e942c1533fa 2823b6a483227e6ca8d77c140c3522d21eeeb39ea18e779ec7771744fb8f5122ecb1a730e5203d83fa25e7fdb18ebff6bde "," number ":" 0x9228 "," parentHash ":" 0xb77808424333dfdc1e94a8bcfcc9fc2aeabc5152b244282d1e559c3f42f2679f "," receiptsRoot ":" 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 "," size ":" 0x2db "," stateRoot ":" 0x90bb5621483f7b2da204739b63c50f5428316b715cef685aa33fe9c2d86a99d5 "," timestamp ":" 0x17aaa0f7f15 " ,"transactions":[],"transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"}
}
```

### TransactionByBlockHashAndIndex

> Query the transaction with the specified serial number in the block according to the block hash

* **Parameters**  
    - string: blockHash block hash
    - *big.Int: transactionIndex the serial number of the transaction in the block

* **return value**

```go
(*types.Transaction, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  tx, err := web3g.TransactionByBlockHashAndIndex(common.HexToHash("0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc"), 0)
  fmt.Println(tx, err)
}
```

### TransactionByBlockNumberAndIndex

> Query the transaction with the specified serial number in the block according to the block height

* **Parameters**  
    - pos:
      - "latest" latest block height (default)
      - "earliest" minimum block height
      - "pending" unpackaged transaction
      - *big.Int specifies the block height
    - index: uint

* **return value**

```go
(*types.Transaction, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  tx, err := web3g.TransactionByBlockNumberAndIndex("pending", 1)
  fmt.Println(tx, err)
}
```

### TransactionReceipt

> Query transaction receipt based on transaction hash

* **Parameters**  
  - common.Hash: transactionHash transaction hash

* **return value**

```go
(*types.Receipt, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  tx, err := web3g.TransactionReceipt(common.HexToHash("0x733a072fd7d074f4116585c7be7c036c86ead3f453265b8c34ba56a99b9f6bcc"))
  fmt.Println(tx, err)
}
```

### AdminGetProgramVersion

> Get code version

* **Parameters**

  no

* **return value**

```go
(*params.ProgramVersion, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  pv, err := web3g.AdminGetProgramVersion()
  fmt.Println(pv, err)
  // Expect Output: {4096 0x0dca7024507a5d94c84b9c9deb417d56bf58f6fe5e37ecee86e64a62d1f518b67ddeeed7ba59a619b7f30ecd881164e96f9781b30309c07ea8985929401692de00}
}
```

* **ProgramVersion object resolution**
    - *big.Int: version: code version
    - string: sign: code version signature

### GetSchnorrNIZKProve

> Obtain bls certificate

* **Parameters**  

  no

* **return value**

```go
(string, error)
```

* **Example**

```go
func main() {
  const alayaEndpoint = "http://172.16.64.132:6789"
  web3g, err := web3go.New(alayaEndpoint)

  p, err := web3g.GetSchnorrNIZKProve()
  fmt.Println(p, err)
  // Expect Output: b9f8498559d91d4823c2bea19a2ee315cc4418a3bfe06d328c99e7567d725939e7df9ec1902ca910cf789471342b971ed0810d7d61cda5dfb54b9270c9557256
}
```

## System contract call

The system interface mainly includes the economic model and the contract interface related to governance:
* Stake related interface
* Delegate related interfaces
* Reward related interface
* Node related interface
* Governance related interfaces
* Report related interface
* Locking related interface

For the introduction and use of the above interface, please refer to the following interface description.

When using a contract, you need to provide Credentials. The examples in this document use the following `credential`:
```go
const PrivateKey = "ed72066fa30607420635be56785595ccf935675a890bef7c808afc1537f52281"
var credentials, _ = typedefs.NewCredential(PrivateKey, network.MainNetHrp)
```

### Pledge related interface

> Pledge-related interfaces: Mainly include nodes pledge, modify pledge information, release pledge, query pledge information, etc.

#### Interface Description

##### **Staking**

> Node pledge: Applicable to miners. Only after the node pledges can they have the opportunity to participate in consensus and obtain benefits. Before staking, you need your own node to access the network. When staking, the rpc link address must be the node that needs to be pledged. If the pledge is successful, the node will appear in the candidate list.

* **Enrollment**

  - NodeId The node id, in hexadecimal format, that is, the public key of the node, which can be queried through the management console.
  - Amount pledged amount
  - StakingAmountType indicates whether the free amount of the account or the locked amount of the account is used as pledge, StakingAmountType.FREE_AMOUNT_TYPE: free amount, StakingAmountType.RESTRICTING_AMOUNT_TYPE: locked amount
  - BenefitAddress income account, which is used to receive block rewards and pledge rewards.
  - NodeName The name of the node
  - ExternalId External Id (there is a length limitation, the Id described by the node is pulled for a third party), currently the keybase account public key, and the node icon is obtained through the public key.
  - The third-party homepage of the WebSite node (there is a length limit, indicating the homepage of the node)
  - The description of the Details node (there is a length limit, which means the description of the node)
  - ProgramVersion The real version of the program, obtained through the management rpc
  - BlsPubKey bls public key
  - Proof of BlsProof bls, obtained through governance rpc
  - RewardPer commissioned reward sharing ratio, 1=0.01% 10000=100%

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash transaction hash

* **Contract usage**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  sp := req.StakingParam{
    NodeId: "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050",
    Amount: big.NewInt(10),
    StakingAmountType: typedefs.FREE_AMOUNT_TYPE,
    BenefitAddress: MainFanAccount,
    ExternalId: "",
    NodeName: "chendai-node3",
    WebSite: "www.baidu.com",
    Details: "chendai-node3-details",
    ProcessVersion: typedefs.ProgramVersion{
      Version: big.NewInt(4096),
      Sign: "0x0dca7024507a5d94c84b9c9deb417d56bf58f6fe5e37ecee86e64a62d1f518b67ddeeed7ba59a619b7f30ecd881164e96f9781b30309c07ea8985929401692de00",
    },
    BlsPubKey: "0x5ccd6b8c32f2713faa6c9a46e5fb61ad7b7400e53fabcbc56bdc0c16fbfffe09ad6256982c7059e7383a9187ad93a002a7cda7a75d569f686e79771794778ae778aedf31730481a8b91b5fcafd569f591730481a8b91b5fad52df31
    BlsProof: "0xa8fadadfc215f4f73fcdd539f5c2c8228a948f9d9f1f840329965a4abaec284be94d76f02839a0dd73d5a446dd5cd415c10b6ce621f0b1226924b8f36385a95b098d1c4357785a95b09853c843c8228a948f9d9f1f840329965a4
    RewardPer: big.NewInt(1000),
  }

  tx, err := sc.Staking(sp)
  fmt.Println(tx, err)
}
```

##### **UnStaking**

> The node revokes the pledge (all cancellation is initiated at one time, and the account is received multiple times). After success, the node will be removed from the candidate list. The transaction can only be initiated by the pledge wallet address of the node.

* **Enrollment**

  - string: nodeId node id, in hexadecimal format, that is, node public key

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash transaction receipt

* **Contract usage**

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

> To modify the pledge information, transactions can only be initiated by the pledge wallet address of the node.

* **Enrollment**

  - string: nodeId node id, in hexadecimal format, that is, the node public key
  - string: benifitAddress income account, which is used to receive block rewards and pledge rewards.
  - string: nodeName The name of the node
  - string: externalId External Id (there is a length limit, the Id described by the third party pulls the node), currently the keybase account public key, the node icon is obtained through the public key.
  - string: the third-party homepage of the webSite node (there is a length limit, indicating the homepage of the node)
  - string: details The description of the node (there is a length limit, indicating the description of the node)
  - *big.Int: rewardPer delegated reward sharing ratio, 1=0.01% 10000=100%

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash transaction receipt

* **Contract usage**

```go
func main() {
  config := network.PposMainNetParams
  sc := NewStakingContract(config, credentials)

  req := req.UpdateStakingParam{
    NodeId: "0x77fffc999d9f9403b65009f1eb27bae65774e2d8ea36f7b20a89f82642a5067557430e6edfe5320bb81c3666a19cf4a5172d6533117d7ebcd0f2c82055499050",
    BenifitAddress: MainFanAccount,
    ExternalId: "",
    NodeName: "chendai-node3",
    WebSite: "www.baidu.com",
    Details: "chendai-node3-details",
    RewardPer: big.NewInt(1000),
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

> Increase the stake and increase the pledge deposit of the pledged node, and transactions can only be initiated by the pledge wallet address of the node.

* **Enrollment**

    - string: nodeId node id, in hexadecimal format, that is, node public key
    - stakingAmountType: stakingAmountType indicates whether the free amount of the account or the locked amount of the account is used for pledge, StakingAmountType.FREE_AMOUNT_TYPE: free amount, StakingAmountType.RESTRICTING_AMOUNT_TYPE: locked amount
    - *big.Int: addStakingAmount increase amount

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash transaction receipt

* **Contract usage**

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

> Query the pledge information of the current node

* **Enrollment**

  - string: nodeId node id, in hexadecimal format, that is, node public key

* **return value**

```go
resp.Node, error
```

* **Node**: save a single candidate node information object

  - string: NodeId is pledged node Id (also called candidate node Id)

  - string: The account used when StakingAddress initiates staking

  - string: BenifitAddress is used to receive the income account of block rewards and pledge rewards

  - *big.Int: RewardPer current settlement cycle reward sharing ratio

  - *big.Int: NextRewardPer reward sharing ratio in the next settlement cycle

  - *big.Int: StakingTxIndex transaction index when staking is initiated

  - *big.Int: ProgramVersion The real version number of the PlatON process of the pledged node (the interface to obtain the version number is provided by governance)

  - *big.Int: Status of the candidate, 0: the node is available, 1: the node is unavailable, 2: the node has a low block generation rate but does not meet the removal conditions, 4: the minimum pledge threshold of the node, 8: the node is Report double-signature, 16: the node has a low block generation rate and meets the removal conditions, 32: the node takes the initiative to initiate cancellation

  - *big.Int: StakingEpoch's current settlement cycle when the pledge amount is changed

  - *big.Int: StakingBlockNum block height when staking is initiated

  - *big.Int: Shares The current candidate's total pledge plus the number of delegates

  - *big.Int: Released The amount of pledge during the lock-up period of the free amount of the pledge account initiated

  - *big.Int: ReleasedHes The number of pledges during the hesitation period of the free amount of the released pledge account

  - *big.Int: The amount of pledge during the lock-up period of the lock-up amount of the account that initiated the pledge by RestrictingPlan

  - *big.Int: RestrictingPlanHes The amount of pledge during the hesitation period of the lock-up amount of the staking account initiated by RestrictingPlanHes

  - string: ExternalId External Id (there is a length limitation, the Id described by the third party pulls the node), currently the keybase account public key, the node icon is obtained through the public key.

  - string: NodeName is the name of the pledged node (there is a length limit, indicating the name of the node)

  - string: The third-party homepage of the Website node (there is a length limit, indicating the homepage of the node)

  - string: The description of the Details node (there is a length limit, indicating the description of the node)

  - *big.Int: The settlement cycle of the last time the DelegateEpoch node was delegated

  - *big.Int: DelegateTotal node is the total number of effective delegates

  - *big.Int: DelegateTotalHes node is delegated the total number of ineffective

  - *big.Int: DelegateRewardTotal The current total delegated rewards issued by the candidate

* **Contract usage**

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

> Query the block reward of the current settlement cycle

* **Parameters**  

  No

* **return value**

```go
(*big.Int, error)
```

* **Contract usage**

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

> Query the staking reward of the current settlement cycle

* **Parameters**  

  No

* **return value**

```go
(*big.Int, error)
```

* **Contract usage**

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

> Query the average time of packed blocks

* **Parameters**  

  No

* **return value**

```go
(*big.Int, error)
```

* **Contract usage**

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

### Delegation Related Interface

> Principal related contract interface in PlatON economic model

#### Interface Description

##### **Delegate**

> Initiate a commission, commission a node that has been pledged, and commission a node to increase the weight of the node to obtain revenue

* **Parameters**  

  - string: nodeId   node id, hexadecimal format, starting with 0x.
  - StakingAmountType：stakingAmountType   stakingAmountType, enumeration, FREE_AMOUNT_TYPE means use the free amount of the account, RESTRICTING_AMOUNT_TYPE means use the amount of the lock to make a pledge
  - *big.Int: amount of amount commissioned(based on the smallest unit, 1LAT = 10**18 VON)

* **return value**

``` java
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash transaction receipt

* **Contract usage**

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

> Reduction / revocation of commission(all reductions are revocation)

* **Parameters**  

  - string: nodeId   node id, hexadecimal format, starting with 0x
  - *big.Int: stakingBlockNum   The stakingBlockNum entrusted node has a high pledge block, which represents a unique sign of a pledge of a node
  - *big.Int: stakingAmount     the commission amount of stakingAmount reduction(based on the smallest unit, 1LAT = 10**18 von)

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash  transaction receipt

* **Transaction Receipt**

   - *big.Int: Reward   Obtain the delegate income drawn when the commission is cancelled

* **Contract usage**

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

### Reward Related Interface

> Contract-related contract interfaces in the PlatON economic model

#### Interface Description

##### **WithdrawDelegateReward**

> Withdraw all currently available commissioned rewards on the account

* **Parameters**  

  No

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash: transaction receipt

* **transaction receipt**
   - string：NodeId    node id
   - *big.Int：StakingNum  node staking block number
   - *big.Int：Reward  received benefits

* **Contract usage**

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

> Check the current account to get the reward details

* **Parameters**  
  - string：Address   check the address of your account
  - []string： NodeList  nodeList Node list, if all is checked

* **return value**

```go
([]resp.Reward, error)
```

* **Reward** Reward details
   - string：nodeId    node id
   - *big.Int：stakingNum  Node pledge block is high
   - *big.Int：reward  received benefits

* **Contract usage**

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

### Node-related Contracts

> Principal related contract interface in PlatON economic model

#### Interface Description

##### **GetVerifierList**

> Query the queue of validators in the current settlement cycle

* **Parameters**  

  No

* **return value**

```go
[]resp.Node, error
```

* **Node** object for saving node information for a single current settlement cycle

  - string: NodeId   The node Id of the pledge(also called the candidate's node Id)

  - string: StakingAddress   The account used when initiating the pledge(when the pledge is cancelled, von will be returned to the account or the account's lock information)

  - string: BenifitAddress	benefitAddress is used to accept the block reward and pledged reward income account

  - *big.Int: RewardPer Proportion of reward share in current settlement cycle

  - *big.Int: NextRewardPer Proportion of reward share in the next settlement cycle

  - *big.Int: StakingTxIndex   transaction index when pledge is initiated

  - *big.Int: ProgramVersion  The real version number of the PlatON process of the pledged node(the interface for obtaining the version number is provided by the governance)

  - *big.Int: StakingBlockNum    block height when StakingBlockNum initiated pledge

  - string: ExternalId   External Id (with a length limit, the ID described by the third party to pull the node) is currently the public key of the keybase account, and the node icon is obtained through the public key.


  - string: Website   The third-party homepage of the Website node(the length of the node is the homepage of the node)

  - string: Details   details The description of the Details node(the length is limited, indicating the description of the node)


  - *big.Int: DelegateTotal  The total number of commissioned nodes


  - *big.Int: DelegateRewardTotal  Total delegated rewards currently issued by the candidate


* **Contract usage**

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
> Query the list of validators in the current consensus cycle

* **Parameters**  

  No

* **return value**

```go
[]resp.Node, error
```

* **Contract usage**

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

> Query all real-time candidate lists

* **Parameters**  

  No

* **return value**

```go
[]resp.Node, error
```

* **Contract usage**

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

###  Governance Related Contracts

> Contract interface related to PlatON governance

#### Interface Description

##### **SubmitProposal**

> Submit Proposal

* **Parameters**  

  - resp.Proposal: Proposal

* **文本提案 CreateTextProposal**
  - string：Verifier Submit verifier
  - string：PIDID  PIPID

* **升级提案 CreateVersionProposal**
  - string: verifier Submit verifier
  - string: pIDID  PIPID
  - *big.Int: newVersion  updated version
  - *big.Int: endVotingRounds   Number of voting consensus rounds. Explanation: Suppose that the transaction that submitted the proposal is round1 when the consensus round number is packed into the block, the proposal voting deadline block is high, which is round1 + endVotingRounds, the 230th block height of the consensus round (assuming a consensus round produces block 250, ppos Unveiled 20 blocks high in advance, 250 and 20 are configurable), where 0 <endVotingRounds <= 4840 (about 2 weeks, actual discussion can be calculated based on configuration), and is an integer)

* **ParamProposal CreateParamProposal**
  - string: Verifier Submit verifier
  - string: PIDID  PIPID
  - string: Module  parameter module
  - string: Name  parameter name
  - string: NewValue new value

* **CancelProposal CreateCancelProposal**
  - string: Verifier Submit verifier
  - string: PIDID  PIPID
  - *big.Int: EndVotingRounds  Number of voting consensus rounds. Refer to the description of submitting an upgrade proposal. At the same time, the value of this parameter in this interface cannot be greater than the corresponding
  - string: TobeCanceledProposalID  Proposal ID to be cancelled

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：transaction receipt

* **Contract usage**

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

> Vote on proposals

* **Parameters**  

  - ProgramVersion:ProgramVersion the real version of the ProgramVersion program, managed by the rpc interface admin_getProgramVersion
  - VoteOption：VoteOption   voting type, YEAS in favor, NAYS against, ABSTENTIONS abstaining
  - string: ProposalID   proposal ID
  - string: Verifier   declared node, can only be validator / candidate

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash transaction receipt

* **Contract usage**：

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

>  Query Proposal

* **Parameters**  

  - string: ProposalID   proposal id

* **return value**

```go
(resp.Proposal, error)
```

* **Proposal**：Objects that hold information about a single proposal
  - string:	   ProposalId	proposal ID
  - string:    Proposer   proposal node id
  - int:       ProposalType   proposal type, 0x01: text proposal; 0x02: upgrade proposal; 0x03 parameter proposal
  - string:    PiPid   proposal PIPID
  - *big.Int:   SubmitBlock
  - *big.Int:   EndVotingBlock
  - *big.Int:   NewVersion   updated version
  - *big.Int:   ToBeCanceled   ID of the promotion proposal to be canceled by the toBeCanceled proposal
  - *big.Int:   ActiveBlock   activeBlock(if the vote passes) the effective block height(endVotingBlock + 20 + 4 * 250<effective block height<= endVotingBlock + 20 + 10 * 250)
  - string:   Verifier     Submit verifier

* **Contract usage**

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

> Query Proposal Results

* **Parameters**  

  - string: proposalID   proposal ID

* **return value**

```go
(resp.TallyResult, error)
```

* **TallyResult**：Object that holds the results of a single proposal
  - string:   ProposalID   proposal ID
  - *big.Int:   Yeas
  - *big.Int:   Nays
  - *big.Int:   Abstentions
  - *big.Int:   AccuVerifiers
  - int:   Status

* **status**
  - Voting：0x01
  - Pass：0x02
  - Failed：0x03
  - PreActive：0x04
  - Active：0x05
  - Canceled：0x06

* **Contract usage**

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

> Query proposal list

* **Parameters**  

  No

* **return value**

```go
[]resp.Proposal, error
```

* **Contract usage**

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

> Release statement

* **Parameters**  

  - ProgramVersion:ProgramVersion the real version of the ProgramVersion program, managed by the rpc interface admin_getProgramVersion
  - string: Verifier   declared node, can only be validator / candidate

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash  transaction receipt

* **Contract usage**

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

> Query node chain effective version

* **Parameters**  

  No

* **return value**

```go
(uint64, error)
```

* **Contract usage**

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

###  Double Sign Report Related Interface

> PlatON report contract related punishment interface

#### Interface Description

##### **ReportDoubleSign**

> Submit a report

* **Parameters**  

  - typedefs.DuplicateSignType:   DuplicateSignType enumeration, representing double sign types: prepareBlock, EprepareVote, viewChange
  - string：data   json value of a single evidence, format refer to [RPC interface Evidences](# evidences_interface)

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：transaction receipt

* **Contract usage**

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

> Query whether a node has been reported as oversigned

* **Parameters**  

  - typedefs.DuplicateSignType   DuplicateSignType enumeration, representing double sign types: prepareBlock, EprepareVote, viewChange
  - string：address   address of the node reported by address
  - *big.Int: blockNumber   multi-sign block height

* **return value**

```go
(string, error)
```

* **Contract usage**

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

###  Lock Related Interface

> PlatON report contract related punishment interface

#### Interface Description

##### **CreateRestrictingPlan**

> Create Lockup Plan

* **Parameters**  

  - string：address   address lock position is released to the account
  - []resp.RestrictingPlan   plan Locked plan list(array)
    - Epoch：indicates a multiple of the settlement cycle. The product of the number of blocks produced per settlement cycle indicates the release of locked funds at the height of the target block. If account is the incentive pool address, the period value is a multiple of 120(that is, 30 * 4). In addition, period, the number of blocks per cycle must be at least greater than the highest irreversible block height.
    - Amount indicates the amount to be released on the target block.

* **return value**

```go
(typedefs.TransactionHash, error)
```

- typedefs.TransactionHash：transaction receipt

* **Contract usage**

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

> Get Locked Up Plan

* **Parameters**  

  - common.Address address   address lock position is released to the account

* **return value**

```go
(resp.RestrictingItem, error)
```

* **RestrictingItem** save lock information object
  - *big.Int: Balance
  - *big.Int: Pledge
  - *big.Int: Debt
  - []RestrictingInfo：Info
* **RestrictingInfo**
  - *big.Int: BlockNumber
  - *big.Int: Amount

* **Contract usage**

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
## Solidity contract call

The `contracts` module of Alaya sdk is used to deploy and operate smart contracts on the Alaya network.

### Ready to work
To deploy and call the contract through the SDK, you need to use `solc`, please install the solc compiler according to the official document. And follow the instructions of [Alaya-Go](https://github.com/AlayaNetwork/Alaya-Go), After the project is successfully compiled, you can find the `abigen` tool in the `build/bin` directory.

In order to demonstrate how to use it, we prepared a test contract `store.sol` (for how to write a contract, please refer to the solidity official tutorial):
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

Then, we use the following commands to compile the bin and abi files we need:
`solc --bin --abi store.sol -o Store`
After the execution is successful, two files Store.abi and Store.bin will be generated in the `Store` directory.

Next, we use the `abigen` tool to generate the `Store.go` file:
`abigen --bin=Store.bin --abi=Store.abi --pkg=store --out=Store.go`

At this point, the documents we need have been prepared.

For the operations described in the following part of this article, you can find a complete usage example in [here](../examples/contracts-operation.go).

### Deploy the contract
Before operating the contract, we need to obtain a `Contract` object:
```go
contract := contracts.Contract{
    Url: AlayaEndpoint,
    PrivateKey: privateKey,
}

opts, client, err := contract.Init()
if err != nil {
    log.Fatal(err)
}
```
After the Init operation is completed, we obtain the `opts` and `client` objects, their types are `*bind.TransactOpts` and `bind.ContractBackend`, with these two objects, we can use the following code to Deploy the contract:
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

After the deployment is successful, we can obtain the hash of the transaction and the address where the contract is deployed. Through this address, we can use it to call the method of the contract.

### Call contract
After the contract is successfully deployed, we can call its methods to complete the work. The following code example illustrates how to call the `Version`, `SetItems` and `Items` methods:
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

### to sum up
In this article, we demonstrated how to deploy the contract and call the view method and non-view method in the contract.
