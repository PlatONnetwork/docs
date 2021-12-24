---
id: Json_Rpc
title: JSON-RPC
sidebar_label: JSON-RPC
---

[JSON](http://json.org/) is a lightweight data-interchange format. It can represent numbers, strings, ordered sequences of values, and collections of name/value pairs.

[JSON-RPC](http://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON ([RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)) as data format.

## JavaScript API

To talk to an platon node from inside a JavaScript application use the [web3.js](https://github.com/PlatONnetwork/client-sdk-js) library, which gives an convenient interface for the RPC methods.

## Note

After upgrading to version 1.1.1, PlatON has extended JSON-RPC 2.0 through [Ethereum Compatible](https://github.com/PlatONnetwork/PIPs/blob/master/PIPs/PIP-2.md) to extend JSON-RPC 2.0 to request The request object adds bech32 field, Booleans type. If bech32 is true, it means that the codec format of the address part in this rpc call is bech32, and the default is EIP55. And it supports Ethereum's RPC call, [Reference](https://geth.ethereum.org/docs/rpc/ns-eth).

The following just shows the RPC call process with curl procedure. Actually you need to make some adjustments according to the specific situation of your server. For example, a possible call procedure for PlatON is `curl -X POST -H 'content-type: application/json' --data '{"jsonrpc":"2.0","bech32":true,"method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:6789`.

## JSON RPC API Reference

#### admin_startWS

The startWS administrative method starts an WebSocket based JSON RPC API webserver to handle client requests. 

##### Parameters
All the parameters are optional:
1. host: network interface to open the listener socket on (defaults to "localhost")
2. port: network port to open the listener socket on (defaults to 8546)
3. cors: cross-origin resource sharing header to use (defaults to "")
4. apis: API modules to offer over this interface (defaults to "platon,net,web3")

##### Returns

`Boolean` - The method returns a boolean flag specifying whether the WebSocket RPC listener was opened or not. Please note, only one WebSocket endpoint is allowed to be active at any time.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_startWS","params":[host, port, cors, apis],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***

#### admin_stopWS

The stopWS administrative method closes the currently open WebSocket RPC endpoint. As the node can only have a single WebSocket endpoint running.

##### Parameters
none

##### Returns

`Boolean` -  whether the endpoint was closed or not.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_stopWS","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***


#### admin_startRPC

The startRPC administrative method starts an HTTP based JSON RPC API webserver to handle client requests. 

##### Parameters
All the parameters are optional:
1. host: network interface to open the listener socket on (defaults to "localhost")
2. port: network port to open the listener socket on (defaults to 8545)
3. cors: cross-origin resource sharing header to use (defaults to "")
4. apis: API modules to offer over this interface (defaults to "platon,net,web3")

##### Returns

`Boolean` - The method returns a boolean flag specifying whether the HTTP RPC listener was opened or not. Please note, only one HTTP endpoint is allowed to be active at any time.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_startRPC","params":[host, port, cors, apis],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***

#### admin_stopRPC

The stopRPC administrative method closes the currently open HTTP RPC endpoint. As the node can only have a single HTTP endpoint running.

##### Parameters
none

##### Returns

`Boolean` -  whether the endpoint was closed or not.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_stopRPC","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***

#### admin_removePeer

disconnects from a remote node if the connection exists.

##### Parameters
`string` -  enode URL of peer to remove.

##### Returns

`boolean` -  true if peer removed or false if peer not remove.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_removePeer","params":["enode://f59c0ab603377b6ec88b89d5bb41b98fc385030ab1e4b03752db6f7dab364559d92c757c13116ae6408d2d33f0138e7812eb8b696b2a22fe3332c4b5127b22a3@127.0.0.1:30304"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***

#### admin_exportChain

exports the current blockchain into a local file.

##### Parameters
`string` -  The location where the file needs to be exported.

##### Returns

`boolean` -  Whether the export is successful.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_exportChain","params":["/home/develop/blockchain.gz"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***

#### admin_importChain

imports a blockchain from a local file.

##### Parameters
`string` -  The location where the file needs to be imported.

##### Returns

`boolean` -  Whether the imported is successful.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_importChain","params":["/home/develop/blockchain.gz"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

***

#### web3_clientVersion

Returns the current client version.

##### Parameters
none

##### Returns

`String` - The current client version.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"web3_clientVersion","params":[],"id":67}'

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
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'

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
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"net_version","params":[],"id":67}'

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
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"net_listening","params":[],"id":67}'

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
curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"net_peerCount","params":[],"id":74}'

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

This property is read-only. If synchronizing, return the synchronization object. Otherwise return false.


##### Parameters
none

##### Returns

`Object|Boolean`, An object with sync status data or `FALSE`,  If the node is not yet synchronized with the network,

Returns false, otherwise returns a synchronous object with the following properties:

  - `startingBlock`: `Number` - The block at which the import started (will only be reset, after the sync reached his head).
  - `currentBlock`: `Number`- The current block, same as platon_blockNumber.
  - `highestBlock`: `Number`- The estimated highest block.
  - `knownStates`: `Number`: The  estimated download status
  - `pulledStates`: `Number`: The downloaded status

##### Example
```js
// Request
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"platon_syncing","params":[],"id":1}' http://127.0.0.1:6789

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454',
    knownStates: "0x0",
    pulledStates: "0x0"
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

Returns a list of addresses owned client.


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

#### platon_chainId

Returns the chain ID used for transaction signing at the current best block. Null is returned if not available.


##### Parameters

None

##### Returns

`QUANTITY` - Chain ID, or null if not available.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_chainId","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

***

#### platon_getAddressHrp

Returns the account address prefix of the current chain.


##### Parameters

None

##### Returns

`DATA` - Prefix of account address.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getAddressHrp","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "lat"
}
```

***

#### platon_getProof

Return the Merkle-proof for a given account and optionally some storage keys.


##### Parameters

1. `Address`, 20 Bytes - Address of a contract.
2. `StorageKeys` - key in storageTrie
3. `BlockNumber` - Block height

```js
params: [
   'lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm',
   ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],
   '0x1'
]
```

##### Returns

`Object` - Account related data and proof.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getProof","params":[see above],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
      "address": "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm",
      "accountProof": ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],
      "balance": "0x99",
      "codeHash": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
      "nonce": "0x1",
      "storageHash": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
      "storageProof":[
          {
            "key": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
            "value": "0x9",
            "proof": ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"]
          }
      ]
  }
}
```

***

#### platon_resend

Resend accepts an existing transaction and a new gas price and limit. It will remove the given transaction from the pool and reinsert it with the new gas price and limit.

##### Parameters

1. `Object` - The transaction object.

  - `from`: `DATA`, string - address string in bech32 format of the transaction is send from.
  - `to`: `DATA`, string - address string in bech32 format - (optional when creating new contract) The address the transaction is directed to.
  - `gas`: `QUANTITY`  - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
  - `gasPrice`: `QUANTITY`  - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas.
  - `value`: `QUANTITY`  - (optional) Integer of the value send with this transaction.
  - `data`: `DATA`  - (optional) The compiled code of a contract.
  - `nonce`: `QUANTITY`  - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

2. `QUANTITY` - Integer of the gasPrice used for each paid gas.
3. `QUANTITY` - Integer of the gas provided for the transaction execution.

```js
params: [{
  "from": "lat1lfxu0c2s4g2z872hgutpytlyekclw7272sj8dy",
  "to": "lat1wgs4njks2wm4s596prdktrvsnfayh0kzv5ntru",
  "gas": "0x76c0", // 30400,
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
},
"0x1",
"0x1"
]
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use platon_getTransactionReceipt to get the contract address, after the transaction was mined, when you created a contract.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_resend","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

***

#### platon_pendingTransactionsLength

Return the number of pending transactions in the transaction pool.


##### Parameters

None

##### Returns

`QUANTITY` - Number of pending transactions.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_pendingTransactionsLength","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": 1
}
```

***

#### platon_getPoolNonce

Return the latest Nonce for a given account.


##### Parameters

1. `Address`, 20 Bytes - Account address.

```js
params: ['lat1wgs4njks2wm4s596prdktrvsnfayh0kzv5ntru']
```

##### Returns

`QUANTITY` - Number of account nonce.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getPoolNonce","params":[see above],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": '0x1'
}
```

***

#### platon_pendingTransactions

returns the transactions that are in the transaction pool and have a from address that is one of the accounts this node manages.


##### Parameters

None

##### Returns

`Array` - Transaction collection:

  - `blockHash`: `DATA`, 32 Bytes - hash of the block. `null` when it's pending block.
  - `blockNumber`: `QUANTITY` - the block number. `null` when it's pending block.
  - `from`: `DATA`, string - address string in bech32 format.The sender of the transaction.
  - `gas`: `QUANTITY` - The gas consumed by the transaction.
  - `gasPrice`: `QUANTITY` - GasPrice provided for transaction execution.
  - `hash`: `DATA`, 32 Bytes - hash of the transaction.
  - `input`: `DATA` - the data send along with the transaction.
  - `nonce`: `QUANTITY` - the number of transactions made by the sender prior to this one.
  - `to`: `DATA`, string - address string in bech32 format of the receiver. `null` when it's a contract creation transaction.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block. `null` when it's pending.
  - `value`: `QUANTITY` - value transferred in von.
  - `r`: `Quantity` - the R field of the signature.
  - `s`: `Quantity` - the S field of the signature.
  - `v`: `Quantity` - the V field of the signature.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_pendingTransactions","params":[see above],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": [
      {
          blockHash: "",
          blockNumber: 26774895,
          from: "lat1lfxu0c2s4g2z872hgutpytlyekclw7272sj8dy",
          gas: 49220,
          gasPrice: 1000000000,
          hash: "0x926694537d833a406cb3b321f79966c7cab24e461ac419d4366e94dccc5f2e6e",
          input: "0xf855838203ec8180b842b8402d35a84c4fc677fe2a19c43407d4cd387b0bbf90a5a3511794d7f752012e4090d8e7a0931ed540be41b73badd3c767c5de28195f3062c7aefba951bfd7a5c49e8a896c6b935b8bbd400000",
          nonce: 1787,
          r: "0x61b8e974d37dfbe221be5267753e1717f573b6fcd9a0ca0b223aba1c2f8283af",
          s: "0xc0ef7e651bafbd396536b20250fde46199ed6fcf356d08b390e36a3ba039fca",
          to: "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm",
          transactionIndex: 0,
          v: "0x62297",
          value: 0
        }
  ]
}
```

***

#### platon_getRawTransactionByBlockHashAndIndex

Returns the bytes of the transaction for the given block hash and index.

##### Parameters

1. `Hash` - 32 Bytes - Block hash.
2. `Quantity` - The index of the transaction in the block.

```js
params: [
    '0x926694537d833a406cb3b321f79966c7cab24e461ac419d4366e94dccc5f2e6e', 
    '0x1'
]
```

##### Returns

- `Data` - The raw byte data of the transaction (after RLP).

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getRawTransactionByBlockHashAndIndex","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xf8c08206fb843b9aca0082c04494100000000000000000000000000000000000000280b857f855838203ec8180b842b8402d35a84c4fc677fe2a19c43407d4cd387b0bbf90a5a3511794d7f752012e4090d8e7a0931ed540be41b73badd3c767c5de28195f3062c7aefba951bfd7a5c49e8a896c6b935b8bbd40000083062297a061b8e974d37dfbe221be5267753e1717f573b6fcd9a0ca0b223aba1c2f8283afa00c0ef7e651bafbd396536b20250fde46199ed6fcf356d08b390e36a3ba039fca"
}
```

***

#### platon_getRawTransactionByBlockNumberAndIndex

Returns the bytes of the transaction for the given block number and index.

##### Parameters

1. `Quantity` - Block number.
2. `Quantity` - The index of the transaction in the block.

```js
params: [
    '0x1b4', 
    '0x1'
]
```

##### Returns

- `Data` - The raw byte data of the transaction (after RLP).

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getRawTransactionByBlockNumberAndIndex","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xf8c08206fb843b9aca0082c04494100000000000000000000000000000000000000280b857f855838203ec8180b842b8402d35a84c4fc677fe2a19c43407d4cd387b0bbf90a5a3511794d7f752012e4090d8e7a0931ed540be41b73badd3c767c5de28195f3062c7aefba951bfd7a5c49e8a896c6b935b8bbd40000083062297a061b8e974d37dfbe221be5267753e1717f573b6fcd9a0ca0b223aba1c2f8283afa00c0ef7e651bafbd396536b20250fde46199ed6fcf356d08b390e36a3ba039fca"
}
```

***

#### platon_signTransaction

Signs transactions without dispatching it to the network. It can be later submitted using platon_sendRawTransaction.

##### Parameters

1. `Object` - Transaction object. See platon_sendTransaction.

##### Returns

- `Object` - Signed transaction and it’s details:
  - `raw`: `Data` - The signed, RLP encoded transaction.
  - `tx`: `Object` - Transaction Response Object

##### Example

```js
// Request
curl -X POST localhost:6789 --data '{"jsonrpc":"2.0","method":"platon_signTransaction","params":[{see above}],"id":1}' -H "Content-Type: application/json" 
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    "raw": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
    "tx": {
      "hash": "0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
      "nonce": "0x0", // 0
      "blockHash": "0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b",
      "blockNumber": "0x15df", // 5599
      "transactionIndex": "0x1", // 1
      "from": "lat1lfxu0c2s4g2z872hgutpytlyekclw7272sj8dy",
      "to": "lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq93t3hkm",
      "value": "0x7f110", // 520464
      "gas": "0x7f110", // 520464
      "gasPrice": "0x09184e72a000",
      "input": "0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360"
    }
  }
}
```

***

#### platon_getRawTransactionByHash

Returns the bytes of the transaction for the given hash.

##### Parameters

1. `Hash` - 32 Bytes - Transaction hash.

```js
params: [
    '0x926694537d833a406cb3b321f79966c7cab24e461ac419d4366e94dccc5f2e6e'
]
```

##### Returns

- `Data` - The raw byte data of the transaction (after RLP).

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"platon_getRawTransactionByHash","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xf8c08206fb843b9aca0082c04494100000000000000000000000000000000000000280b857f855838203ec8180b842b8402d35a84c4fc677fe2a19c43407d4cd387b0bbf90a5a3511794d7f752012e4090d8e7a0931ed540be41b73badd3c767c5de28195f3062c7aefba951bfd7a5c49e8a896c6b935b8bbd40000083062297a061b8e974d37dfbe221be5267753e1717f573b6fcd9a0ca0b223aba1c2f8283afa00c0ef7e651bafbd396536b20250fde46199ed6fcf356d08b390e36a3ba039fca"
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

  - `number`: `QUANTITY` - the block number. `null` when it's pending block.
  - `hash`: `DATA`, 32 Bytes - hash of the block. `null` when it's pending block.
  - `parentHash`: `DATA`, 32 Bytes - hash of the parent block.
  - `nonce`: `DATA`, 8 Bytes - hash of the generated proof-of-work. `null` when it's pending block.
  - `sha3Uncles`: `DATA`, 32 Bytes - SHA3 of the uncles data in the block.
  - `logsBloom`: `DATA`, 256 Bytes - the bloom filter for the logs of the block. `null` when it's pending block.
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
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in. `null` when it's pending.
  - `blockNumber`: `QUANTITY` - block number where this transaction was in. `null` when it's pending.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block. `null` when it's pending.
  - `from`: `DATA`, string - address string in bech32 format of the sender.
  - `to`: `DATA`, string - address string in bech32 format of the receiver. `null` when it's a contract creation transaction.
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
  - `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when it's pending log.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` when it's pending log.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when it's pending log.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` when it's pending. `null` when it's pending log.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. `null` when it's pending. `null` when it's pending log.
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
Curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_nodeInfo","params":[],"id":74}'

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
Curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_peers","params":[],"id":74}'

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
Curl -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"admin_getProgramVersion","params":[],"id":74}'

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

#### personal_openWallet

OpenWallet initiates a hardware wallet opening procedure, establishing a USB connection and attempting to authenticate via the provided passphrase.

##### Parameters

1. `String` - path of the wallet.
2. `String` - passphrase of the wallet.

##### Returns

`Boolean` - `true` if the wallet was successfully opened, otherwise `false`.

##### Example

```js
// Request
curl -X POST --data '{ "jsonrpc": "2.0", "method": "personal_openWallet", "params": ["keycard://044def09","abcdefg"], "id": 75}'

```

***

#### personal_sendTransaction

Sends transaction and signs it in a single call. The account does not need to be unlocked to make this call, and will not be left unlocked after.

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
  "from": "lat1kc8gm4sut5etaqzchw8tjuy8purjxv24msxq7q",
  "to": "lat163hgm4nut5etaqzchw8tjuy8purjg3t83gevx0",
  "gas": "0x76c0", // 30400,
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

##### Example


```js
//Request
curl --data '{"method":"personal_sendTransaction","params":[{"from":"lat1kc8gm4sut5etaqzchw8tjuy8purjxv24msxq7q","to":"lat163hgm4nut5etaqzchw8tjuy8purjg3t83gevx0","data":"0x41cd5add4fd13aedd64521e363ea279923575ff39718065d38bd46f0e6632e8e","value":"0x186a0"},"hunter2"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789

//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x62e05075829655752e146a129a044ad72e95ce33e48ff48118b697e15e7b41e4"
}
```

***

#### personal_ecRecover

Returns the address associated with the private key that was used to calculate the signature in `personal_sign`.

##### Parameters

1. `Data` - The data which hash was signed.
2. `Data` - Signed data.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  "0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c"
]
```

##### Returns

`Address` - Address of the signer of the message.

##### Example

```js
//Request
curl --data '{"method":"personal_ecRecover","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789

//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "lat1kc8gm4sut5etaqzchw8tjuy8purjxv24msxq7q"
}
```

***

#### personal_importRawKey

Imports the given private key into the key store, encrypting it with the passphrase.

##### Parameters

1. `String` - An unencrypted private key (hex string).
2. `String` - The password of the account.

##### Returns

`String` - The address of the account.

##### Example

```js
//Request
curl --data '{"method":"personal_importRawKey","params":["cd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e","password1234"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789

//Result
"lat1kc8gm4sut5etaqzchw8tjuy8purjxv24msxq7q"
```

***

#### personal_listAccounts

Lists all stored accounts.

##### Parameters
no

##### Returns

`Array` - A list of 20 byte account identifiers.

##### Example

```js
//Request
curl --data '{"method":"personal_listAccounts","params":[],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    "lat1kc8gm4sut5etaqzchw8tjuy8purjxv24msxq7q",
    "lat1e2q84y8avn0w6as0hx9lpp5mgawydy6g4lups0"
  ]
}
```

***

#### personal_listWallets

list all your accounts you’ve used before + 1 empty new one

##### Parameters
no

##### Returns

`rawWalletArray` - A list of raw wallets.

##### Example

```js
//Request
curl --data '{"method":"personal_listWallets","params":[],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  accounts: [{
      address: "atp1v79he42uvxghmmajx4r2gxqrckl7l0r6w2pwk8",
      url: "keycard://044d/m/44'/60'/0'/0/0"
  }],
  status: "Online",
  url: "keycard://044def09"
}
```

***

#### personal_lockAccount

Locks the given account.

##### Parameters

1. `String` - The account address. 
2. `Function` - (optional) Optional callback, returns an error object as first parameter and the result as second.

##### Returns

`Boolean` - `true` if the account was successfully locked, otherwise `false`.

##### Example

```js
//Request
curl --data '{"method":"personal_lockAccount","params":["lat1v79he42uvxghmmajx4r2gxqrckl7l0r6huhkfg"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  result: true
}
```

***

#### personal_newAccount

Creates new account.

Note: it becomes the new current unlocked account. There can only be one unlocked account at a time.

##### Parameters

1. `String` - Password for the new account.

##### Returns

`Address` - 20 Bytes - The identifier of the new account.

##### Example

```js
//Request
curl --data '{"method":"personal_newAccount","params":["abc123"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "lat13upz04zc2wjsam753h20asjatvlay227nmyk6p"
}
```

***

#### personal_sign

Calculates an PlatON specific signature with: sign(keccak256("PlatON Signed Message: " + len(message) + message))).

##### Parameters

1. `Data` - The data to sign
2. `Address` - 20 Bytes - The address of the account to sign with
3. `String` - Passphrase to unlock the from account.

##### Returns

`Data` - Signed data.

##### Example

```js
//Request
curl --data '{"method":"personal_sign","params":[0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","lat1kc8gm4sut5etaqzchw8tjuy8purjxv24msxq7q","hunter"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c"
}
```

***

#### personal_signTransaction

Signs a transaction without dispatching it to the network. It can later be submitted using `platon_sendRawTransaction`. The account does not need to be unlocked to make this call, and will not be left unlocked after.

##### Parameters

1. `Object` - Transaction object with optional condition field. see platon_sendRawTransaction.
2. `String` - Passphrase to unlock the from account.

##### Returns

`Object` - Signed transaction and its details:
- raw: Data - The signed, RLP encoded transaction.
- tx: Object - Transaction object.
- from: Address - 20 Bytes - The address the transaction is send from.
- to: Address - (optional) 20 Bytes - The address the transaction is directed to.
- gas: Quantity - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- gasPrice: Quantity - (optional) Integer of the gas price used for each paid gas.
- value: Quantity - (optional) Integer of the value sent with this transaction.
- data: Data - (optional) 4 byte hash of the method signature followed by encoded parameters. For details see Ethereum Contract ABI.
- nonce: Quantity - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
- condition: Object - (optional) Conditional submission of the transaction. Can be either an integer block number { block: 1 } or UTC timestamp (in seconds) { time: 1491290692 } or null.

##### Example

```js
//Request
curl --data '{"method":"personal_signTransaction","params":[{"from":"lat1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpunjvg7","to":"lat14984xa8uuhkmer32s6tuz5e3valxa0ct4z0qkm","data":"0x41cd5add4fd13aedd64521e363ea279923575ff39718065d38bd46f0e6632e8e","value":"0x186a0"},"hunter2"],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "raw": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
    "tx": {
      "hash": "0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
      "nonce": "0x0",
      "blockHash": "0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b",
      "blockNumber": "0x15df",
      "transactionIndex": "0x1",
      "from": "lat1gp7h8k9ynm4ct5ev73j4qlwhr4g8zqxpunjvg7",
      "to": "lat1s5l58k9ynm4ct5ev73j4qlwhr4g8zqxpkhv75y",
      "value": "0x7f110",
      "gas": "0x7f110",
      "gasPrice": "0x09184e72a000",
      "input": "0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360"
    }
  }
}
```

***

#### personal_unlockAccount

Decrypts the key with the given address from the key store.This method is disabled by default in the PlatON 1.1.1 version and above, and needs to be enabled by adding --allow-insecure-unlock to the startup parameters.

The unencrypted key will be held in memory until the unlock duration expires. If the unlock duration defaults to 300 seconds. An explicit duration of zero seconds unlocks the key until geth exits.

The account can be used with platon_sign and platon_sendTransaction while it is unlocked.

##### Parameters

1. `Address` - 20 Bytes - The address of the account to unlock.
2. `String` - Passphrase to unlock the account.
3. `Quantity` - (default: 300) Integer or null - Duration in seconds how long the account should remain unlocked for.

##### Returns

`Boolean` - whether the call was successful

##### Example

```js
//Request
curl --data '{"method":"personal_unlockAccount","params":["lat13upz04zc2wjsam753h20asjatvlay227nmyk6p","hunter2",null],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

***

#### miner_setGasPrice

Sets the minimal accepted gas price when mining transactions. Any transactions that are below this limit are excluded from the mining process.

##### Parameters

1. Uint - number of gas.

##### Returns

`Boolean` - whether the gas price was successfully set.


##### Example
```js
//Request
curl --data '{"method":"miner_setGasPrice","params":[19999999],"id":1,"jsonrpc":"2.0","bech32":true}' -H "Content-Type: application/json" -X POST localhost:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

***

#### txpool_status

The status property of txPool can be used to query information such as the number of transactions in the transaction pool waiting to be packaged into the next block.

##### Parameters

none

##### Returns

`Object` - The value of the status property is an object containing two fields, pending and Queued, each of which is an associative array.


##### Example
```js
//Request
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"txpool_status","params":[],"id":1}' http://127.0.0.1:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
		"pending": "0x0",
		"queued": "0x0"
	}
}
```

***

#### txpool_content

The content property of txPool can be used to list pending and queued transactions currently in the pool. 

##### Parameters

none

##### Returns

`Object` - The value is an object containing two fields: Pending and Queued, each of which is an associative array.


##### Example
```js
//Request
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"txpool_content","params":[],"id":1}' http://127.0.0.1:6789
//Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
		"pending": {
			"lat1fx2pjucpzk3zm7fdyqez4yhxyqkrqlzhgpzcf7": {
				806: [{
						blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
						blockNumber: null,
						from: "lat1fx2pjucpzk3zm7fdyqez4yhxyqkrqlzhgpzcf7",
						gas: "0x5208",
						gasPrice: "0xba43b7400",
						hash: "0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586",
						input: "0x",
						nonce: "0x326",
						to: "lat1c7kuxvr4wdswy89p049spsk6ddwtqhjqcp4uef",
						transactionIndex: null,
						value: "0x19a99f0cf456000"
				}]
			}
		},
		"queued": {
			"lat1h926hjvmfnhenwrx7tzr2mcwk2wq80dvzzeqjj": {
				2: [{
					blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
					blockNumber: null,
					from: "lat1h926hjvmfnhenwrx7tzr2mcwk2wq80dvzzeqjj",
					gas: "0x15f90",
					gasPrice: "0xba43b7400",
					hash: "0x3a3c0698552eec2455ed3190eac3996feccc806970a4a056106deaf6ceb1e5e3",
					input: "0x",
					nonce: "0x2",
					to: "lat1smxhhr3ufxnqv55agjtq3cjsng4rqx489p6d0m",
					transactionIndex: null,
					value: "0xebec21ee1da40000"
				}],
			}
		}
	}
}
```

***

#### txpool_inspect

The inspect property of TXPool lists the summary of transactions in the transaction pool that are currently waiting to be packaged into the next block.

##### Parameters

none

##### Returns

`Object` - The value of the Inspect property is an object containing two fields, pending and Queued, each of which is an associative array.


##### Example
```js
//Request
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","bech32":true,"method":"txpool_inspect","params":[],"id":1}' http://127.0.0.1:6789
//Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"pending": {
			"lat1wv9jphl4gxj8jyazl63qvfzp4sq2zv82u0zl2n": {
				"13975": "lat1d5cqy3j8462xrywh9h08jndpfky78rt82qapul: 1 von + 21000 gas × 1000000000 von",
				"13976": "lat1qtyzgqm8n0vcv2cnmyvqnvzeures9ggr38yf9k: 1 von + 21000 gas × 1000000000 von",
				"13977": "lat1j5zyyyztejn7d67f4vk3c0uydhgx8qu0quhj7e: 1 von + 21000 gas × 1000000000 von",
				"13978": "lat1jvy3w9ps7t076w4pclhv9n9x3ng4zjxedhwdcj: 1 von + 21000 gas × 1000000000 von",
				"13979": "lat1ft23z88sfdqaphp6u7lt5eaaha3x9tqpwq6geu: 1 von + 21000 gas × 1000000000 von"
			},
			"lat1z9ayvyxhtepectk92gd8rkfzuk48wq3pxyexrs": {
				"13829": "lat1896fjn0fsun8xnpy58jcku9zpgdpzta07565v4: 1 von + 21000 gas × 1000000000 von",
				"13830": "lat1e2aew0nh6dcung2mg0xuqtdp0fl5x9sm36jmvl: 1 von + 21000 gas × 1000000000 von",
				"13831": "lat1kvyd32vqqwtrnw0687hvccjezm5jnl8a5lm5hf: 1 von + 21000 gas × 1000000000 von"
			}
		},
		"queued": {
			"lat1g62rmjcmd5v8ezyp0levzakp2t3g2x3qfjeeyy": {
				"13813": "lat16z74lt8sj75mdw9lxpjpce22x9u6h5tslealgp: 1 von + 21000 gas × 1000000000 von",
				"13814": "lat1hff2xwvh7p34rayy695xg48f78j7nmkwctgqld: 1 von + 21000 gas × 1000000000 von"
			},
			"lat14zgzfkz6sfh5sy3csvwsfcphg458kgdhhc3e5r": {
				"14192": "lat1wyfjc62wp9axjcjg6jupeclnrklzhk2m58he44: 1 von + 21000 gas × 1000000000 von",
				"14193": "lat1rz5dq9ea8ay6mj4chlzq9cn6qkvunad6ezynnn: 1 von + 21000 gas × 1000000000 von",
				"14194": "lat1lvcl6w2nfhjhachqsncfe4nvafe5seykfj05vm: 1 von + 21000 gas × 1000000000 von"
			}
		}
	}
}
```

***

#### debug_getWaitSlashingNodeList

Get all nodes with zero production blocks, and a list of nodes that have been observed because of zero production blocks.

##### Parameters
no

##### Returns
`array` - The node list of the zero production block, each structure contains three fields, NodeId: the node ID of the zero production block, Round: the number of consensus rounds in the first zero production during the observation period, CountBit: the zero production block Bitmap of the number of times (starting from Round, 1 means that no block is produced in this round).

##### Example
```js
// Request
curl -X POST --data '{ "jsonrpc": "2.0", "method": "debug_getWaitSlashingNodeList", "params": [], "id": 74}'
// Result
{
  "id": 74,
  "jsonrpc": "2.0",
  "result": "[{
    "NodeId": "8e91f562c1798dc8c567a5c4a99a840eb86e43324b622fd0a4a8defdf873baf8f822313d7f35227fe15b6f4a2767dfb9ea7f7968d0a3a243e57b4d1090f6fc6c",
    "Round": 1000,
    "CountBit": 7
  }]"
}
```
