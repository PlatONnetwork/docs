---
id: Json_Rpc
title: JSON RPC API
sidebar_label: JSON RPC
---

[JSON](http://json.org/) is a lightweight data-interchange format. It can represent numbers, strings, ordered sequences of values, and collections of name/value pairs.

[JSON-RPC](http://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON ([RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)) as data format.

## JavaScript API

To talk to an platon node from inside a JavaScript application use the [web3.js](https://github.com/PlatONnetwork/client-sdk-js) library, which gives an convenient interface for the RPC methods.

## Note

The following just shows the RPC call process with curl procedure. Actually you need to make some adjustments according to the specific situation of your server. For example, a possible call procedure for PlatON is `curl -X POST -H 'content-type: application/json' --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:6789`.

## JSON RPC API Reference

#### web3_clientVersion

Returns the current client version.

##### Parameters
none

##### Returns

`String` - The current client version.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Mist/v0.9.3/darwin/go1.4.1"
}
```

***

#### web3_sha3

Returns Keccak-256 (*not* the standardized SHA3-256) of the given data.

##### Parameters

1. `String` - the data to convert into a SHA3 hash.

```js
params: [
  '0x68656c6c6f20776f726c64'
]
```

##### Returns

`DATA` - The SHA3 result of the given string.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'

// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

***

#### net_version

Returns the current network protocol version.

##### Parameters
none

##### Returns

`String` - The current network protocol version.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "59"
}
```

***

#### net_listening

Returns `true` if client is actively listening for network connections.

##### Parameters
none

##### Returns

`Boolean` - `true` when listening, otherwise `false`.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

***

#### net_peerCount

Returns number of peers currenly connected to the client.

##### Parameters
none

##### Returns

`QUANTITY` - integer of the number of connected peers.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'

// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

***

#### platon_protocolVersion

Returns the current platon protocol version.

##### Parameters
none

##### Returns

`String` - The current platon protocol version.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_protocolVersion","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

***

#### platon_syncing

Returns an object with data about the sync status or FALSE.


##### Parameters
none

##### Returns

`Object|Boolean`, An object with sync status data or `FALSE`, when not syncing:
  - `startingBlock`: `QUANTITY` - The block at which the import started (will only be reset, after the sync reached his head).
  - `currentBlock`: `QUANTITY` - The current block, same as platon_blockNumber.
  - `highestBlock`: `QUANTITY` - The estimated highest block.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_syncing","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

***

#### platon_gasPrice

Returns the current price per gas in von.

##### Parameters
none

##### Returns

`QUANTITY` - integer of the current gas price in von.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_gasPrice","params":[],"id":73}'

// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x09184e72a000" // 10000000000000
}
```

***

#### platon_accounts

Returns a list of addresses owned by client.


##### Parameters
none

##### Returns

`Array of DATA`, string - address string in bech32 format owned by the client.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_accounts","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3"]
}
```

***

#### platon_blockNumber

Returns the number of most recent block.

##### Parameters
none

##### Returns

`QUANTITY` - integer of the current block number the client is on.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_blockNumber","params":[],"id":83}'

// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

***

#### platon_getBalance

Returns the balance of the account of given address.

##### Parameters

1. `DATA`, string - address string in bech32 format to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.

```js
params: [
   'lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3',
   'latest'
]
```

##### Returns

`QUANTITY` - integer of the current balance in von.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getBalance","params":["lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3", "latest"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

***

#### platon_getStorageAt

Returns the value from a storage position at a given address.

##### Parameters

1. `DATA`, string - address string in bech32 format of the storage.
2. `QUANTITY` - integer of the position in the storage.
3. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.


```js
params: [
   'lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3',
   '0x0', // storage position at 0
   '0x2' // state at block number 2
]
```

##### Returns

`DATA` - the value at this storage position.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getStorageAt","params":["lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3", "0x0", "0x2"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x03"
}
```

***

#### platon_getTransactionCount

Returns the number of transactions *sent* from an address.


##### Parameters

1. `DATA`, string - address string in bech32 format.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.

```js
params: [
   'lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3',
   'latest' // state at the latest block
]
```

##### Returns

`QUANTITY` - integer of the number of transactions send from this address.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getTransactionCount","params":["lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3","latest"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

***

#### platon_getBlockTransactionCountByHash

Returns the number of transactions in a block from a block matching the given block hash.


##### Parameters

1. `DATA`, 32 Bytes - hash of a block.

```js
params: [
   '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
]
```

##### Returns

`QUANTITY` - integer of the number of transactions in this block.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xb" // 11
}
```

***

#### platon_getBlockTransactionCountByNumber

Returns the number of transactions in a block from a block matching the given block number.


##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`.

```js
params: [
   '0xe8', // 232
]
```

##### Returns

`QUANTITY` - integer of the number of transactions in this block.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}
```

***

#### platon_getCode

Returns code at a given address.


##### Parameters

1. `DATA`, string - address string in bech32 format .
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.

```js
params: [
   'lax14984xa8uuhkmer32s6tuz5e3valxa0ct68a0c5',
   '0x2'  // 2
]
```

##### Returns

`DATA` - the code from the given address.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getCode","params":["lax14984xa8uuhkmer32s6tuz5e3valxa0ct68a0c5", "0x2"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

***

#### platon_sign

Signs data with a given address.

**Note** the address to sign must be unlocked.

##### Parameters

1. `DATA`, string - address string in bech32 format .
2. `DATA`, Data to sign.

##### Returns

`DATA`: Signed data.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_sign","params":["lax16xk7yhxd842s5l44x2k8t89v00sfcfcej8gsug", "Schoolbus"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x2ac19db245478a06032e69cdbd2b54e648b78431d0a47bd1fbab18f79f820ba407466e37adbe9e84541cab97ab7d290f4a64a5825c876d22109f3bf813254e8601"
}
```

***

#### platon_sendTransaction

Creates new message call transaction or a contract creation, if the data field contains code.

##### Parameters

1. `Object` - The transaction object.
  - `from`: `DATA`, string - address string in bech32 format of the transaction is send from.
  - `to`: `DATA`, string - address string in bech32 format - (optional when creating new contract) The address the transaction is directed to.
  - `gas`: `QUANTITY`  - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
  - `gasPrice`: `QUANTITY`  - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas.
  - `value`: `QUANTITY`  - (optional) Integer of the value send with this transaction.
  - `data`: `DATA`  - (optional) The compiled code of a contract.
  - `nonce`: `QUANTITY`  - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

```js
params: [{
  "from": "lax1kc8gm4sut5etaqzchw8tjuy8purjxv245450s0",
  "to": "lax163hgm4nut5etaqzchw8tjuy8purjg3t87dtrgq",
  "gas": "0x76c0", // 30400,
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use platon_getTransactionReceipt to get the contract address, after the transaction was mined, when you created a contract.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_sendTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

***

#### platon_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.

##### Parameters

1. `Object` - The transaction object.
  - `data`: `DATA`, The signed transaction data.

```js
params: [{
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use platon_getTransactionReceipt to get the contract address, after the transaction was mined, when you created a contract.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_sendRawTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

***

#### platon_call

Executes a new message call immediately without creating a transaction on the block chain.


##### Parameters

1. `Object` - The transaction call object
  - `from`: `DATA`, string - address string in bech32 format - (optional) The address the transaction is send from.
  - `to`: `DATA`, string - address string in bech32 format - The address the transaction is directed to.
  - `gas`: `QUANTITY`  - (optional) Integer of the gas provided for the transaction execution. platon_call consumes zero gas, but this parameter may be needed by some executions.
  - `gasPrice`: `QUANTITY`  - (optional) Integer of the gasPrice used for each paid gas.
  - `value`: `QUANTITY`  - (optional) Integer of the value send with this transaction.
  - `data`: `DATA`  - (optional) The compiled code of a contract.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.

##### Returns

`DATA` - the return value of executed contract.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_call","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0"
}
```

***

#### platon_estimateGas

Makes a call or transaction, which won't be added to the blockchain and returns the used gas, which can be used for estimating the used gas.

##### Parameters

See platon_call parameters, expect that all properties are optional.

##### Returns

`QUANTITY` - the amount of gas used.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_estimateGas","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

***

#### platon_getBlockByHash

Returns information about a block by hash.


##### Parameters

1. `DATA`, 32 Bytes - Hash of a block.
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

```js
params: [
   '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
   true
]
```

##### Returns

`Object` - A block object, or `null` when no block was found:

  - `number`: `QUANTITY` - the block number. `null` when its pending block.
  - `hash`: `DATA`, 32 Bytes - hash of the block. `null` when its pending block.
  - `parentHash`: `DATA`, 32 Bytes - hash of the parent block.
  - `nonce`: `DATA`, 8 Bytes - hash of the generated proof-of-work. `null` when its pending block.
  - `sha3Uncles`: `DATA`, 32 Bytes - SHA3 of the uncles data in the block.
  - `logsBloom`: `DATA`, 256 Bytes - the bloom filter for the logs of the block. `null` when its pending block.
  - `transactionsRoot`: `DATA`, 32 Bytes - the root of the transaction trie of the block.
  - `stateRoot`: `DATA`, 32 Bytes - the root of the final state trie of the block.
  - `receiptsRoot`: `DATA`, 32 Bytes - the root of the receipts trie of the block.
  - `miner`: `DATA`, string - address string in bech32 format - the address of the beneficiary to whom the mining rewards were given.
  - `difficulty`: `QUANTITY` - integer of the difficulty for this block.
  - `totalDifficulty`: `QUANTITY` - integer of the total difficulty of the chain until this block.
  - `extraData`: `DATA` - the "extra data" field of this block.
  - `size`: `QUANTITY` - integer the size of this block in bytes.
  - `gasLimit`: `QUANTITY` - the maximum gas allowed in this block.
  - `gasUsed`: `QUANTITY` - the total used gas by all transactions in this block.
  - `timestamp`: `QUANTITY` - the unix timestamp for when the block was collated.
  - `transactions`: `Array` - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
  - `uncles`: `Array` - Array of uncle hashes.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getBlockByHash","params":["0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331", true],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": {
    "number": "0x1b4", // 436
    "hash": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
    "parentHash": "0x9646252be9520f6e71339a8df9c55e4d7619deeb018d2a3f2d21fc165dde5eb5",
    "nonce": "0xe04d296d2460cfb8472af2c5fd05b5a214109c25688d3704aed5484f9a7792f2",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "logsBloom": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "stateRoot": "0xd5855eb08b3387c0af375e9cdb6acfc05eb8f519e419b874b6ff2ffda7ed1dff",
    "miner": "lax1fejlmgs4j432f9he7dfzlzgj9gcgsjt6c4ujsh",
    "difficulty": "0x027f07", // 163591
    "totalDifficulty":  "0x027f07", // 163591
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "size":  "0x027f07", // 163591
    "gasLimit": "0x9f759", // 653145
    "minGasPrice": "0x9f759", // 653145
    "gasUsed": "0x9f759", // 653145
    "timestamp": "0x54e34e8e" // 1424182926
    "transactions": [{...},{ ... }] 
    "uncles": ["0x1606e5...", "0xd5145a9..."]
  }
}
```

***

#### platon_getBlockByNumber

Returns information about a block by block number.

##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`.
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

```js
params: [
   '0x1b4', // 436
   true
]
```

##### Returns

See platon_getBlockByHash

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Result see platon_getBlockByHash.

***

#### platon_getTransactionByHash

Returns the information about a transaction requested by transaction hash.


##### Parameters

1. `DATA`, 32 Bytes - hash of a transaction.

```js
params: [
   "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"
]
```

##### Returns

`Object` - A transaction object, or `null` when no transaction was found:

  - `hash`: `DATA`, 32 Bytes - hash of the transaction.
  - `nonce`: `QUANTITY` - the number of transactions made by the sender prior to this one.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in. `null` when its pending.
  - `blockNumber`: `QUANTITY` - block number where this transaction was in. `null` when its pending.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block. `null` when its pending.
  - `from`: `DATA`, string - address string in bech32 format of the sender.
  - `to`: `DATA`, string - address string in bech32 format of the receiver. `null` when its a contract creation transaction.
  - `value`: `QUANTITY` - value transferred in von.
  - `gasPrice`: `QUANTITY` - gas price provided by the sender in von.
  - `gas`: `QUANTITY` - gas provided by the sender.
  - `input`: `DATA` - the data send along with the transaction.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getTransactionByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": {
    "hash":"0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
    "nonce":"0x",
    "blockHash": "0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b",
    "blockNumber": "0x15df", // 5599
    "transactionIndex":  "0x1", // 1
    "from":"lax1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpnkqrx3",
    "to":"lax163hgm4nut5etaqzchw8tjuy8purjg3t87dtrgq",
    "value":"0x7f110" // 520464
    "gas": "0x7f110" // 520464
    "gasPrice":"0x09184e72a000",
    "input":"0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360",
  }
}
```

***

#### platon_getTransactionByBlockHashAndIndex

Returns information about a transaction by block hash and transaction index position.


##### Parameters

1. `DATA`, 32 Bytes - hash of a block.
2. `QUANTITY` - integer of the transaction index position.

```js
params: [
   '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
   '0x0' // 0
]
```

##### Returns

See platon_getBlockByHash.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getTransactionByBlockHashAndIndex","params":["0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b", "0x0"],"id":1}'
```

Result see platon_getTransactionByHash.

***

#### platon_getTransactionByBlockNumberAndIndex

Returns information about a transaction by block number and transaction index position.


##### Parameters

1. `QUANTITY|TAG` - a block number, or the string `"earliest"`, `"latest"` or `"pending"`.
2. `QUANTITY` - the transaction index position.

```js
params: [
   '0x29c', // 668
   '0x0' // 0
]
```

##### Returns

See platon_getBlockByHash.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getTransactionByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Result see platon_getTransactionByHash.

***

#### platon_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.

**Note** That the receipt is not available for pending transactions.


##### Parameters

1. `DATA`, 32 Bytes - hash of a transaction.

```js
params: [
   '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
]
```

##### Returns

`Object` - A transaction receipt object, or `null` when no receipt was found:

  - `transactionHash `: `DATA`, 32 Bytes - hash of the transaction.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in.
  - `blockNumber`: `QUANTITY` - block number where this transaction was in.
  - `cumulativeGasUsed `: `QUANTITY ` - The total amount of gas used when this transaction was executed in the block.
  - `gasUsed `: `QUANTITY ` - The amount of gas used by this specific transaction alone.
  - `contractAddress `: `DATA`, string - address string in bech32 format - The contract address created, if the transaction was a contract creation, otherwise `null`.
  - `logs`: `Array` - Array of log objects, which this transaction generated.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getTransactionReceipt","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": {
     transactionHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
     transactionIndex:  '0x1', // 1
     blockNumber: '0xb', // 11
     blockHash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
     cumulativeGasUsed: '0x33bc', // 13244
     gasUsed: '0x4dc', // 1244
     contractAddress: 'lax1kc8gm4sut5etaqzchw8tjuy8purjxv245450s0' // or null, if none was created
     logs: [{
         // logs as returned by getFilterLogs, etc.
     }, ...]
  }
}
```

***

#### platon_newFilter

Creates a filter object, based on filter options, to notify when the state changes (logs).
To check if the state has changed, call platon_getFilterChanges.

##### Parameters

1. `Object` - The filter options:
  - `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  - `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  - `address`: `DATA|Array`, string - address string in bech32 format  - (optional) Contract address or a list of addresses from which logs should originate.
  - `topics`: `Array of DATA`,  - (optional) Array of 32 Bytes `DATA` topics. Each topic can also be an array of DATA with "or" options.

```js
params: [{
  "fromBlock": "0x1",
  "toBlock": "0x2",
  "address": "lax13zy0ruv447se9nlwscrfskzvqv85e8d35gau40",
  "topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, [0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b, 0x000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc]]
}]
```

##### Returns

`QUANTITY` - A filter id.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

***

#### platon_newBlockFilter

Creates a filter in the node, to notify when a new block arrives.
To check if the state has changed, call platon_getFilterChanges.

##### Parameters
None

##### Returns

`QUANTITY` - A filter id.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_newBlockFilter","params":[],"id":73}'

// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

***

#### platon_newPendingTransactionFilter

Creates a filter in the node, to notify when new pending transactions arrive.
To check if the state has changed, call platon_getFilterChanges.

##### Parameters
None

##### Returns

`QUANTITY` - A filter id.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_newPendingTransactionFilter","params":[],"id":73}'

// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

***

#### platon_uninstallFilter

Uninstalls a filter with given id. Should always be called when watch is no longer needed.
Additonally Filters timeout when they aren't requested with platon_getFilterChanges for a period of time.


##### Parameters

1. `QUANTITY` - The filter id.

```js
params: [
  "0xb" // 11
]
```

##### Returns

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_uninstallFilter","params":["0xb"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

***

#### platon_getFilterChanges

Polling method for a filter, which returns an array of logs which occurred since last poll.


##### Parameters

1. `QUANTITY` - the filter id.

```js
params: [
  "0x16" // 22
]
```

##### Returns

`Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with `platon_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
- For filters created with `platon_newPendingTransactionFilter ` the return are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
- For filters created with `platon_newFilter` logs are objects with following params:

  - `type`: `TAG` - `pending` when the log is pending. `mined` if log is already mined.
  - `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when its pending log.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` when its pending log.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when its pending log.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` when its pending. `null` when its pending log.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. `null` when its pending. `null` when its pending log.
  - `address`: `DATA`, address string in bech32 format - address from which this log originated.
  - `data`: `DATA` - contains one or more 32 Bytes non-indexed arguments of the log.
  - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (In *solidity*: The first topic is the *hash* of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.).

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getFilterChanges","params":["0x16"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4" // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "lax1zmzhskk9vtl5rckulhuzn3dpgtclenta5fjs08",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

***

#### platon_getFilterLogs

Returns an array of all logs matching filter with given id.


##### Parameters

1. `QUANTITY` - The filter id.

```js
params: [
  "0x16" // 22
]
```

##### Returns

See platon_getFilterChanges.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getFilterLogs","params":["0x16"],"id":74}'
```

Result see platon_getFilterChanges.

***

#### platon_getLogs

Returns an array of all logs matching a given filter object.

##### Parameters

1. `Object` - the filter object, see platon_newFilter parameters.

```js
params: [{
  "topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]
}]
```

##### Returns

See platon_getFilterChanges.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Result see platon_getFilterChanges.

***

#### platon_evidences
Return double sign report data.

##### Parameters
no

##### Returns
`String` - The evidence string contains three types of evidence: duplicatePrepare, duplicateVote, duplicateViewchange. Each type contains multiple pieces of evidence, so it is an array structure. Please pay attention when parsing.

##### Example
```js
// Request
Curl -X POST --data '{"jsonrpc":"2.0","method":"platon_evidences","params":[],"id":74}'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": "evidences data..."
}
```

***

#### admin_addPeer

Add a node.


##### Parameters

1. `String` - peer node string details.


##### Returns

`Boolean` - Added success or failure (note: returning true does not necessarily add success).


##### Example
```js
// Request
curl -X POST --data '{ "jsonrpc": "2.0", "method": "admin_addPeer", "params": [ "enode: //acb2281452fb9fc25d40113fb6afe82b498361de0ee4ce69f55c180bb2afce2c5a00f97bfbe0270fadba174264cdf6da76ba334a6380c0005a84e8a6449c2502@127.0.0.1: 14789"], "id": 74 }'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": true
}
```

***

#### admin_nodeInfo

Returns the current client node details.


##### Parameters

no


##### Returns

`Object` - current node details.


##### Example
```js
// Request
Curl -X POST --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":74}'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": {node information }
}
```

***

#### admin_peers

Returns the details of the peer connected to the current client.


##### Parameters

no


##### Returns

`Array` - array, connected peer node details.


##### Example
```js
// Request
Curl -X POST --data '{"jsonrpc":"2.0","method":"admin_peers","params":[],"id":74}'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "Result": [{Node 1 information} ,  {Node 2 information}, ..., {node information N}]
}
```

***

#### admin_getProgramVersion

Query code version and signature.


##### Parameters

no


##### Returns

`Object` - contains two fields, Version and Sign.


##### Example
```js
// Request
Curl -X POST --data '{"jsonrpc":"2.0","method":"admin_getProgramVersion","params":[],"id":74}'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": {
        "Version": 1794,
        "Sign": "0xa5eb0a935f63006b8f3a2f4dcb007a2bf50c6eb4755f3c27ff3b3af63078da2f5f1eed9beafd1e2dd8f4e588a8eafa60337b7f95aba5a0167fa600115542763a00"
    }
}
```

***

#### admin_getSchnorrNIZKProve

Get proof of bls.


##### Parameters

no


##### Returns

`String` - proof of bls.


##### Example
```js
// Request
curl -X POST --data '{ "jsonrpc": "2.0", "method": "admin_getSchnorrNIZKProve", "params": [], "id": 74}'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": "02705b94701eec4f4619d42796f3241a93035b8b8df3f098ae21f428339ed90599e77f4c90944854b70cbca341cb22480c8872da3b0ae4f6fda29df7293df93d"
}
```

***

#### admin_datadir
Get the data directory.

##### Parameters
no

##### Returns
`String` - data directory.

##### Example
```js
// Request
curl -X POST --data '{ "jsonrpc": "2.0", "method": "admin_datadir", "params": [], "id": 74}'

// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": "/home/platon/network/data"
}
```
***