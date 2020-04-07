---
id: WASM_Smart_Contract
title: WASM Smart Contract Development
sidebar_label: WASM Smart Contract Development
---

WebAssembly (wasm for short) is a binary instruction set designed for stacked virtual machines. Wasm was designed to be a compile target for platforms such as C / C ++ / Rust, and was originally designed to solve JavaScript performance issues. Wasm is a web standard being led by the W3C and supported by browser vendors such as Google, Microsoft, and Mozilla.

This tutorial is mainly to guide users to create a WASM smart contract using wasm language on PlatON.

Mainly from the following aspects to explain： 

- [Getting Started](#getting-started)
- [Development Costs](#development-costs)
- [Best Practice](#best-practice)
- [API](#api)
- [FAQ](#faq)

## Getting Started

### Introduce

This tutorial is mainly to guide users to create a simple HelloWorld smart contract using wasm language on PlatON, compile, deploy, and call this contract through platinum-truffle.If you want to use a richer API. 

### Platon-truffle Introduce 

Platon-truffle is a tool provided by PlatON that can compile, deploy, and invoke smart contracts locally. For specific installation and usage manuals, refer to:

- Platon-truffle develop tools[specific installation](https://platon-truffle.readthedocs.io/en/v0.11.1/getting-started/installation.html#)
- Platon-truffle develop tools[usage manuals](https://platon-truffle.readthedocs.io/en/v0.11.1/)


### Create HelloWorld Contract

```c++
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class message {
   public:
      std::string head;
      PLATON_SERIALIZE(message, (head))
};

class my_message : public message {
   public:
      std::string body;
      std::string end;
      PLATON_SERIALIZE_DERIVED(my_message, message, (body)(end))
};

CONTRACT HelloWorld : public platon::Contract{
   public:
      ACTION void init(const my_message &one_message){
        info.self().push_back(one_message);
      }

      ACTION void add_message(const my_message &one_message){
          info.self().push_back(one_message);
      }

      CONST uint8_t get_message_size(){
          return info.self().size();
      }

      CONST std::string get_message_body(const uint8_t index){
          return info.self()[index].body;
      }

   private:
      platon::StorageType<"myvector"_n, std::vector<my_message>> info;
};

PLATON_DISPATCH(HelloWorld, (init)(add_message)(get_message_size)(get_message_body))

```

Contract Files Description:
- Each contract file has only one contract class. The contract class is decorated with Contract. It must be publicly inherited from platon :: Contract and must have an init function.

- ACTION and CONST qualified member functions represent callable functions, and such member functions cannot be overloaded. The ACTION function will modify the data on the chain. The CONST function just queries the attributes and does not modify the data on the chain.

- The type in the callable function parameter list is a custom type. In this type definition, you need to add the PLATON_SERIALIZE macro to declare the serialization function. This type inherits from other types. You need to add the PLATON_SERIALIZE_DERIVED macro to declare the serialization function.

- Callable functions can only be called externally if the unified entry function is defined in the PLATON_DISPATCH macro.

- At present, platon will persistently store member variables of the contract class. The member variables must be of type platon :: StorageType. The first parameter string of the platon :: StorageType template is followed by _n, and the string must be .12345abcdefghijklmnopqrstuvwxyz. 32 characters Characters. The second parameter is the concrete type of the actual storage. Member function modification member variables need to obtain an instance of a specific type through the self () function, and then execute the corresponding instance function.

- The second parameter type of the platon :: StorageType template is a custom type. A PLATON_SERIALIZE macro must be added to this type definition to declare a serialization function. This type inherits from other types. A PLATON_SERIALIZE_DERIVED macro must be added to declare a serialization function.

  


### Compile HelloWorld Contract 

**Step1.** Creat new directory for HelloWorld project 

```
mkdir HelloWorld && cd HelloWorld
```
- The following commands are performed in the HelloWorld directory without special instructions

**Step2.**  Init project

```
platon-truffle init
```
After the command is executed, project directory structure is as follows:

- `contracts/` wasm contract directory

- `migrations/` depoly file directory

- `test/` test script directory

- `truffle-config.js` platon-truffle config

**Step3.** Move HelloWorld contract compiled in to HelloWorld/contracts/

```
ls contracts/
```
- HelloWorld.cpp

**Step4.** Modify the platon-truffle configuration file truffle-config.js and add the compiled wasm contract version number

```
vim truffle-config.js
```

Truffle-config.js content is  as follows:
```
compilers: {
     wasm: {
           version: "1.0.0"
     }
}
```

**Step5.**  Compile contract

```
platon-truffle compile
```
After the command is executed, project directory structure is as follows:

- `build/` wasm contract directory after compiled
- `build/contracts/HelloWorld.abi.json`  HelloWorld contract compiled abi interface file
- `build/contracts/HelloWorld.wasm`  HelloWorld contract compiled binary

### Deploly HelloWorld Contract

**Step1.** Setting config  information for blockchain in truffle-config.js

```
vim truffle-config.js
```
Set blockchain network  info
```
networks: {
	development: {
       host: "10.1.1.6",     // blockchain server address
       port: 8806,            // server port
       network_id: "*",       // Any network (default: none)
       from: "0x5b37dabedae06edb142257819fad207199986992",
       gas: 4712388,
       gasPrice: 1000000000,
	},
}
```

**Step2.** Deploy contract

```
platon-truffle deploy --wasm --contract-name HelloWorld --params '[[["1"], "2", "3"]]'
```
- `HelloWorld` deployed contract
- `params` parameters of contract init function

If deploy success，you wil see log info as follows:
```
receipt:  { blockHash:
   '0x266733b693ba650315a59c34e72804c06ca3e27fab145625797bd42259b572c5',
  blockNumber: 70441,
  contractAddress: '0x0bf45390B486890486e6eB3F1D5C8e0840FD8B56',
  cumulativeGasUsed: 291314,
  from: '0x5b37dabedae06edb142257819fad207199986992',
  gasUsed: 291314,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash:
   '0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d',
  transactionIndex: 0 }
  contract HelloWorld deployed successfully
======================

   > transactionHash:     0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d
   > contract address:    0x0bf45390B486890486e6eB3F1D5C8e0840FD8B56
   > block number:        70441
   > block timestamp:     1583247148341
   > account:             0x5b37dabedae06edb142257819fad207199986992
   > balance:             3533694129556768659166595001485837031654967793751237866225582808584074296
   > gas limit:           100000000
   > gas used:            291314
   > gas price:           0.000000050000000004 LAT
   > total cost:          0.014565700001165256 LAT
```

### Call HelloWorld Contract

**Step1.**  Enter the platon-truffle console

```
platon-truffle console
```
- You can execute command in platon-truffle console

**Step2.**  Create contract object

```json
var abi = [{"baseclass":[],"fields":[{"name":"head","type":"string"}],"name":"message","type":"struct"},{"baseclass":["message"],"fields":[{"name":"body","type":"string"},{"name":"end","type":"string"}],"name":"my_message","type":"struct"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];
var contractAddr = '0x0bf45390B486890486e6eB3F1D5C8e0840FD8B56';
 
var helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 }); 
```

Description： 
- `abi`  the interface provided by the contract to external calls，the abi  in the file compiled ：`HelloWorld/build/contracts/HelloWorld.json` 
- `contractAddr` contract address
- `helloWorld` contract object created

**Step3.**  Call contract

```javascript
helloworld.methods.add_message('[[["5"], "6", "7"]]').send({
	from: '0x5b37dabedae06edb142257819fad207199986992',gas: 90000000
}).on('receipt', function(receipt) {
	console.log(receipt);
}).on('error', console.error);
```

Description：
- `helloWorld` the contract object created
- `methods` specify the call method
- `add_message`  method in the HelloWorld contract with a custom my_message input
- `from` caller's contract address 
- `on` listen on the result of the contract method executed. if fail, it will print the error info. If success ,the console will print the receipt as belows:

```
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: '0x5b37dabedae06edb142257819fad207199986992',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0bf45390b486890486e6eb3f1d5c8e0840fd8b56',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: '0x5b37dabedae06edb142257819fad207199986992',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0bf45390b486890486e6eb3f1d5c8e0840fd8b56',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
```

**Step4.**  Query contract

```javascript
helloworld.methods.get_message_body(0).call()
```
Description：

- `helloWorld` the contract object created
- `methods` specify the call method
- `get_message_body` method in the HelloWorld contract, which has an input parameter of type int
- `call` specify the query method

---

## Development Costs

### Summary

In a blockchain system, developing smart contracts based on any public chain system involves the development cost of resource expenditure. For example, deploying/calling smart contracts on the network, energy transfer, pledge/delegation and other operations all require a certain cost. Different blockchain network development costs are different. There are two types of virtual machines running in the PlatON network. `EVM` and `WASM`, the cost of developing smart contracts on different virtual machines is also different. This article will compare the different development costs of small contracts, medium contracts and large contracts in the form of a table. At the same time, we will compare the `EVM`/`WASM` virtual machine of `PlatON` with the Ethereum virtual machine. In terms of contracts, a simple `SET/GET` function contract is used as a small test contract. The medium-sized contract example will use an open source [Tweet](https://github.com/yep/eth-tweet) contract The large contract is a smart contract that implements the `ERC20` standard.


#### Data Overview

**Simple Storage Contract**

| Platform    | Contract Level | Size     | GasUsed | GasPrice            | Amount        | Remark            |
| :---------- | :------------- | :------- | :------ | :------------------ | :------------ | :---------------- |
| PlatON-EVM  | Small-sized    | 0.3 kb   | 76953   | 5,000,000,000 `VON` | 384765 `gVON` | 0.000384765 `LAT` |
| Ethereum    | Small-sized    | 0.3 kb   | 127173  | 5,000,000,000 `wei` | 635865 `Gwei` | 0.000635865 `ETH` |
| PlatON-WASM | Small-sized    | 13.55 kb | 184043  | 5,000,000,000 `VON` | 920215 `gVON` | 0.000920215 `LAT` |


**eth-tweet Contract**

| Platform    | Contract Level | Size     | GasUsed | GasPrice            | Amount         | Remark            |
| :---------- | :------------- | :------- | :------ | :------------------ | :------------- | :---------------- |
| PlatON-EVM  | Medium-sized   | 2.08 kb  | 257065  | 5,000,000,000 `VON` | 1285325 `gVON` | 0.001285325 `LAT` |
| Ethereum    | Medium-sized   | 2.08 kb  | 621385  | 5,000,000,000 `wei` | 3106925 `Gwei` | 0.003106925 `ETH` |
| PlatON-WASM | Medium-sized   | 30.07 kb | 349713  | 5,000,000,000 `VON` | 1748565 `gVON` | 0.001748565 `LAT` |


**ERC20 Token Contract**

| Platform    | Contract Level | Size    | GasUsed | GasPrice            | Amount          | Remark            |
| :---------- | :------------- | :------ | :------ | :------------------ | :-------------- | :---------------- |
| PlatON-EVM  | Large-sized    | 4.45 kb | 552823  | 5,000,000,000 `VON` | 2764115  `gVON` | 0.002764115 `LAT` |
| Ethereum    | Large-sized    | 4.45 kb | 1282171 | 5,000,000,000 `wei` | 6410855  `Gwei` | 0.006410855 `ETH` |
| PlatON-WASM | Large-sized    | 35.9 kb | 486274  | 5,000,000,000 `VON` | 2431370  `gVON` | 0.00243137 `LAT`  |


### Small-sized Contract

#### Simple Storage Contract

**EVM Sample Code**

```
pragma solidity ^0.4.12;

contract SimpleTest {
    
	uint public age;
 
	function setAge(uint _input) public {
		age = _input;
	}
 
	function getAge() public constant returns (uint) {
		return age;
	}
}
```

ByteCode

```
608060405234801561001057600080fd5b50610117806100206000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063262a9dff146058578063967e6e65146080578063d5dcf1271460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e1565b005b60005481565b60008054905090565b80600081905550505600a165627a7a7230582079e51340567895e1097e1c9115e778c3d982b8e71b6997c57f1ba497c56c8b3b0029
```

ByteSize：`311 byte => 0.3 kb`

-------------------

**WASM Sample Code**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

CONTRACT SimpleStorage: public platon::Contract
{
	public:
		ACTION void init(){}
	
		ACTION void set(uint64_t input)
		{
			storedData.self() = input;		
		}
		
		CONST uint64_t get()
		{
			return storedData.self();
		}

	private:
		platon::StorageType<"sstored"_n, uint64_t> storedData;
};

PLATON_DISPATCH(SimpleStorage,(init)(set)(get))
```

ByteCode

[Click to view bincode](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/SimpleStorage_wasm.bin)

ByteSize: `13882 byte => 13.55 kb`

-------------------

###### Cost

PlatON-EVM

* GasUsed: 76953
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  384765 `gVON`（0.000384765 `LAT`）

Ethereum 

* GasUsed: 127173 
* GasPrice: 5,000,000,000 (5 `Gwei`)
* Costs:  635865 `Gwei`（0.000635865 `ETH`）

PlatON-WASM

* GasUsed: 184043
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  920215 `gVON`（0.000920215 `LAT`）

-----------------------------------

### Medium-sized Contract 

#### Eth-Tweet

**EVM Sample Code**

[Click to view code](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/account.sol)


ByteCode

[Click to view bincode](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_evm.bin)


ByteSize: `2130.5 byte => 2.08 kb`

---------------

**WASM Sample Code**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

// data structure of a single tweet.
struct Tweet{

	public:
		uint64_t timestamp;
		std::string tweetString;

	public:
		Tweet(){}
		Tweet(uint64_t &timestamp, const std::string &tweet):timestamp(timestamp), tweetString(tweet) {
		}

	public:
		PLATON_SERIALIZE(Tweet, (timestamp)(tweetString))
};

CONTRACT TweetAccount: public platon::Contract
{
	private:
		// "array" of all tweets of this account: maps the tweet id to the actual tweet.
		platon::StorageType<"smapping"_n, std::map<std::uint64_t, Tweet>> _tweets;
		// total number of tweets in the above _tweets mapping.
		platon::StorageType<"suint"_n, uint64_t> _numberOfTweets;
		// "owner" of this account: only admin is allowed to tweet.
		platon::StorageType<"saddress"_n, Address> _adminAddress;
	
	public:
		ACTION void init()
		{
			_numberOfTweets.self() = 0;
			_adminAddress.self() = platon::platon_caller();
		}
		
		// returns true if caller of function("sender") is admin.
		CONST bool isAdmin(){
			return platon::platon_caller() == _adminAddress.self();		
		}
	
		// create new tweet
		ACTION int64_t tweet(const std::string& tweetString) {
			int64_t result = 0;		
			if(!isAdmin()){
				// only owner is allowed to create tweets for this account.
				result = -1;
			} else if (tweetString.length() > 160) {
				// tweet contains more than 160 bytes.
				result = -2;
			} else {
				_tweets.self()[_numberOfTweets].timestamp = platon_timestamp();
				_tweets.self()[_numberOfTweets].tweetString = tweetString;
				_numberOfTweets.self() = _numberOfTweets.self() + 1;	
				result = 0; // success.		
			}
			return result;
		}

		CONST std::string getTweet(uint64_t tweetId){
			// returns two values 
			std::string tweetString = _tweets.self()[tweetId].tweetString;
			uint64_t timestamp = _tweets.self()[tweetId].timestamp;
			return tweetString;		
		}
	
		CONST std::string getLatestTweet() {
			// returns three values.
			std::string tweetString = _tweets.self()[_numberOfTweets.self() - 1].tweetString;
			uint64_t timestamp = _tweets.self()[_numberOfTweets.self() - 1].timestamp;
			uint64_t numberOfTweets = _numberOfTweets.self();
			return tweetString;		
		} 
		
		CONST Address getOwnerAddress() {
			return _adminAddress.self();		
		}

		CONST uint64_t getNumberOfTweets() {
			return _numberOfTweets.self();			
		}
		
		ACTION void adminRetrieveDonations(const Address& receiver) {
			if(isAdmin()){
				Address caddr = platon_address();
				Energon e = platon_balance(caddr);
				platon_transfer(receiver, e);
			}		
		}
		
		CONST Address caddr(){
			return platon_address();		
		}
	
		CONST std::string caddrBalance(Address receiver){
			//Address caddr = platon_address();
			Energon e = platon_balance(receiver);
			return std::to_string(e.Get());		
		}
			
		ACTION void adminDeleteAccount(){
			if(isAdmin()){
				// this is a predefined function, it deletes theh contract and returns all funds to the owner.	
				platon_destroy(_adminAddress.self());	
			}		
		}
};

PLATON_DISPATCH(TweetAccount,(init)(isAdmin)(tweet)(getTweet)(getLatestTweet)
(getOwnerAddress)(getNumberOfTweets)(adminRetrieveDonations)(adminDeleteAccount)
(caddr)(caddrBalance))
```

ByteCode

[Click to view bincode](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_wasm.bin)

```

```

ByteSize: `30788` byte => 30.07 kb`

---------------

###### Costs

PlatON-EVM

* GasUsed: 257065
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  1285325 `gVON`（0.001285325 `LAT`）

Ethereum

* GasUsed: 621385 
* GasPrice: 5,000,000,000 (5 `Gwei`)
* Costs:  3106925 `Gwei`（0.003106925 `ETH`）

PlatON-WASM

* GasUsed: 349713
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  1748565 `gVON`（0.001748565 `LAT`）

------------------------

### Large-sized Contract 

#### ERC20 Token Contract

**EVM Sample Code**

[Click to view code](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/token.sol)


ByteCode

[Click to view bincode](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_evm.bin)


ByteSize: `4557.5 byte => 4.45 kb`

-----------------------------

**WASM Sample Code**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class Token {
	public:
		// total amount of tokens
		platon::StorageType<"totalsupply"_n, uint64_t> totalSupply;
	
	public: // event
		// define: _from, _to, _value
		PLATON_EVENT2(Transfer, Address, Address, uint64_t);
		// define: _owner, _spender, _value
		PLATON_EVENT2(Approval, Address, Address, uint64_t);

	public:
		// @param _owner The address from which the balance will be retrieved
		// @return The balance.
		virtual uint64_t balanceOf(Address _owner) = 0;

		// @notice send '_value' token to `_to` from `msg.sender`
		// @param _to THe address of the recipient.
 		// @param _value The amount of token to be transferred.
		// @return Whether the transfer was successful or not.
		virtual bool transfer(Address _to, uint64_t _value) = 0;

		// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
		// @param _from The address of the sender.
		// @param _to The address of the recepient.
		// @param _value The amount of token to be transferred.
		// @return Whether the transfer was successful or not.
		virtual bool transferFrom(Address _from, Address _to, uint64_t _value) = 0;

		// @notice `msg.sender` approves `_spender` to spend `_value` tokens
		// @param _spender The address of the account able to transfer the tokens
		// @param _value The amount of tokens to be approved for transfer
		// @return Whether thee approval was successful or not.
		virtual bool approve(Address _spender, uint64_t _value) = 0;

		// @param _owner The address of the account owning tokens
		// @param _spender The address of the account able to transfer the tokens
		// @return Amount of remaining tokens allowed to spent.
		virtual uint64_t allowance(Address _owner, Address _spender) = 0;
};

// You should inherit from StandardTOken or, for a token like you would want
// to deploy in something like MIst, see HumanStandardToken.cpp.
// (This implements ONLY the standard functions and NOTHING else.
// If you deploy this, you won't have anthing useful.)
class StandardToken: public Token
{
	protected: 
		platon::StorageType<"balances"_n, std::map<Address, uint64_t>> balances;
		platon::StorageType<"allowed"_n, std::map<Address, std::map<Address, uint64_t>>> allowed;

	public:
		CONST uint64_t balanceOf(Address _owner) {
			return balances.self()[_owner];		
		}

		ACTION bool transfer(Address _to, uint64_t _value){
			// Default assumes totalSupply can't be over max(2^64 - 1)
			// If your token leaves out totalSupply and can issue more tokens as time goes on,
			// you need to check if it doesn't wrap.
			// Replace the if with this on instead.
			Address sender = platon_caller();
			if (balances.self()[sender] >= _value && _value > 0) {
				balances.self()[sender] -= _value;
				balances.self()[_to] += _value;
				PLATON_EMIT_EVENT2(Transfer, sender, _to, _value);
				return true;
			} else {
				return false;			
			}
		}

		ACTION bool transferFrom(Address _from, Address _to, uint64_t _value) {
			// same as above. Replace this line with the following if you want to protect against
			// wrapping uints.
			Address sender = platon_caller();
			if(balances.self()[_from] >= _value 
				&& allowed.self()[_from][sender] >= _value && _value > 0){
				balances.self()[_to] += _value;
				balances.self()[_from] -= _value;
				PLATON_EMIT_EVENT2(Transfer, _from, _to, _value);
				return true;
			} else {
				return false;			
			}
		}

		ACTION bool approve(Address _spender, uint64_t _value){
			Address sender = platon_caller();			
			allowed.self()[sender][_spender] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			return true;		
		}

		CONST uint64_t allowance(Address _owner, Address _spender){
			return allowed.self()[_owner][_spender];		
		}
};


CONTRACT LATToken: public platon::Contract, public StandardToken
{
	
	public:
		platon::StorageType<"name"_n, std::string> name;		// fancy name: eg PlatON Token
		platon::StorageType<"decimals"_n, uint8_t> decimals;	// HOw many decimals to show.
		platon::StorageType<"symbol"_n, std::string> symbol;	// An identifier: eg LTT
		platon::StorageType<"version"_n, std::string> version;	// 0.1 standard. Just an arbitrary versioning scheme.

	public:
		ACTION void init(uint64_t _initialAmount, const std::string& _tokenName,
			uint8_t _decimalUnits, const std::string& _tokenSymbol)
		{
			Address sender = platon_caller();
			balances.self()[sender] = _initialAmount;		// Give the creator all initial tokens.
			totalSupply.self() = _initialAmount;			// Update total supply.
			name.self() = _tokenName;						// Set the name for display purposes
			decimals.self() = _decimalUnits;				// Amount of decimals for display purposes
			symbol.self() = _tokenSymbol;					// Set the symbol for display purposes.
		}

		CONST std::string getName(){
			return name.self();		
		}

		CONST uint8_t getDecimals(){
			return decimals.self();		
		}

		CONST std::string getSymbol(){
			return symbol.self();		
		}

		CONST uint64_t getTotalSupply(){
			return totalSupply.self();		
		}
		
		// Approves and then calls the receiving contract.
		ACTION bool approveAndCall(Address _spender, uint64_t _value, const bytes& _extraData) {
			Address sender = platon_caller();
			allowed.self()[sender][_spender] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			// call the receiveApproval function on the contract you want to be notified. This 
			// crafts the function signature manually so one doesn't have to include a contract 
			// in here just for this.
			// define: receiveApproval(Address _from, uint64_t _value, Address _tokenContract, bytes& _extraDaa)
			// it is assumed that when does this that the call should succeed.
			return true;
		}
};

PLATON_DISPATCH(LATToken,(init)(balanceOf)(transfer)(transferFrom)(approve)(allowance)
(getName)(getDecimals)(getSymbol)(getTotalSupply)(approveAndCall))
```

ByteCode

[Click to view bincode](https://github.com/PlatONnetwork/Docs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_wasm.bin)

ByteSize: `36764 byte => 35.9 kb`

-----------------------------

###### Costs

PlatON-EVM

* GasUsed: 552823
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  2764115 `gVON`（0.002764115 `LAT`）

Ethereum

* GasUsed: 1282171 
* GasPrice: 5,000,000,000 (5 `Gwei`)
* Costs:  6410855 `Gwei`（0.006410855 `ETH`）

PlatON-WASM

* GasUsed: 486274
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  2431370 `gVON`（0.00243137 `LAT`）

------------------------

## Best Practice

### Introduction

This guide introduces users to some key points that need to be paid attention to
in the development of smart contracts, mainly in the practice of actual
development. Users can use this guide to quickly understand how to set a
reasonable fee for a transaction, how to avoid losing the fee due to transaction
failure, and how to encode a more standardized smart contract.

### Reasonable Cost Setting

When you need to deploy a contract on the main network of PlatON, you need to set a reasonable fee limit. The fee limit refers to the upper limit of the energy consumption cost of smart contract deployment/execution in PlatON. This restriction is mainly accomplished through Gas. Gas is the fuel value of the PlatON network world, which determines the normal operation of the PlatON network ecosystem. Gas is usually used to measure how much “work” is required to perform certain actions, and these workloads are the amount of fees that need to be paid to the PlatON network in order to perform the action. In a simple understanding, Gas is the commission for network miners, and is paid by LAT. Any transaction, contract execution, and data storage on the network need to use Gas.

PlatON is similar to Ethereum’s blockchain system. It uses `LAT` for payment and
maintenance networks. One `LAT` is divided into: `mLAT/uLAT/gVON/mVON/kVON/VON`, and `VON` is the smallest unit.

Gas consists of two parts: GasLimit and GasPrice. GasLimit is the maximum Gas consumption (minimum 21,000) that a user is willing to pay to perform an operation or confirm a transaction. GasPrice is the unit price of each Gas.

When a user sends a transaction, GasLimit and GasPrice are set. GasLimit * GasPrice is the user’s transaction cost, and the cost is rewarded to the miner as a commission.

The higher the GasPrice of the transaction, the higher the execution priority of the transaction and the greater the transaction cost. After each transaction is completed, the remaining unused Gas will be returned to the sender’s address account. It is important to note that if the execution of the transaction fails because the GasLimit is set too low, the Gas will not be returned to the user’s address at this time, and the user still needs to pay the energy cost for the failed transaction. Therefore, regardless of whether the transaction is executed successfully, the transaction sender needs to pay a certain calculation fee to the miner.

In the PlatON network, the maximum gas limit is `100,800,000` and the minimum is 22,000. Too low or too high will cause transaction failure. When deploying large contracts or calling complex functions in contracts, you can increase the gas limit, for example: 1,000,000. If it is a normal transfer, set it to the lowest value. The specific value needs to be estimated according to the size and complexity of the contract. Before the contract is released, the interface platon_estimateGas can be called for approximate estimation to avoid failure due to insufficient Gas.

**LAT Unit Conversion**

| Unit     | VON Value | VON                                   |
| -------- | --------- | ------------------------------------- |
| VON      | 1         | 1                                     |
| kVON     | 1e3 VON   | 1,000                                 |
| mVON     | 1e6 VON   | 1,000,000                             |
| gVON     | 1e9 VON   | 1,000,000,000                         |
| microLAT | 1e12 VON  | 1,000,000,000,000                     |
| milliLAT | 1e15 VON  | 1,000,000,000,000,000                 |
| LAT      | 1e18 VON  | 1,000,000,000,000,000,000             |
| kLAT     | 1e21 VON  | 1,000,000,000,000,000,000,000         |
| mLAT     | 1e24 VON  | 1,000,000,000,000,000,000,000,000     |
| gLAT     | 1e27 VON  | 1,000,000,000,000,000,000,000,000,000 |

### Avoid Timeouts

Sending transactions on the PlatON network does not have the concept of timeout, but it will eventually stop according to the set gas limit value. If the limit value is lower than the consumption required for contract deployment, the transaction execution fails and the corresponding processing fee will be deducted. The fee setting cannot be infinite, because in the network, the block itself has a maximum GasLimit value. When the GasLimit of the transaction exceeds this value, the transaction will not be accepted.

If the call function of a published contract is called (a call is a stateless operation in the contract logic), there is a 5s timeout limit. If the contract logic is not executed within 5s, a timeout will occur and the virtual machine will forcely exit , Causing the query to fail.

To avoid contract-related transaction failures, try breaking large contracts into smaller pieces and referencing each other as needed. To avoid infinite loops, be aware of common pitfalls and recursive calls.

### Punishment For Illegal Operations

If the smart contract is not compiled by a standard valid compiler, or the instruction code is changed at will, the opcode will be invalid. This type of contract not only fails to be deployed and executed successfully, but also generates a full amount (GasLimit * GasPrice) penalty. The transaction fee for the current transaction will be deducted. This is a very strong penalty. If the operator does not pay attention At this point, keep retrying, then the cost will be higher and the cost will be heavier.

In general, invalid opcodes have the following conditions:

- Manually changed the instruction code for the normally compiled contract
- The contract compiler version is not consistent with the contract version
  supported by the network lock
- Use float type to do operation

When operating a contract in the PlatON network. First, you must confirm the smart contract version supported by the current network, and then select the compiler of the corresponding version pair.

The normal operation is to use the latest Truffle/PlatON-CDT officially provided by PlatON to compile/deploy/execute the contract. At the same time, before switching to the main network, it must be validated on the test network.

### C/C++ Language Limit

**C/C++ features not supported**

- float type(float/double)
- typeid/dynamic_cast(-fno-rtti)
- try-catch(-fno-exception)
- features after C++17

**libc not supported header files**

- signal.h
- math.h
- locale.h
- errno.h
- uchar.h
- time.h

**libc++ not suppported header files**

- rand
- atomics
- thread
- random

### Coding Standards
#### Naming rules

- The style of a name immediately informs us what sort of thing the named entity
  is: a type, a variable, a function, a constant, a macro, etc.

- Use terminology within the blockchain industry.

- Use as few abbreviations as possible. If you must use them, it is recommended
  to use public abbreviations and custom abbreviations.

- Filenames should be all lowercase and can include underscores (_) or dashes
  (-).

- For smart contracts, the file name is consistent with the contract name.

- Type names start with a capital letter and have a capital letter for each new
  word, with no underscores: `MyExcitingClass`, `MyExcitingEnum`.

- The names of variables (including function parameters) and data members are
  all lowercase, with underscores between words. Data members of classes (but
  not structs) additionally have trailing underscores. For instance:
  `a_local_variable`, `a_struct_data_member`, `a_class_data_member_`.

- Variables declared constexpr or const, and whose value is fixed for the
  duration of the program, are named with a leading "k" followed by mixed case.
  Underscores can be used as separators in the rare cases where capitalization
  cannot be used for separation. For example:
  ```cpp
  const int kDaysInAWeek = 7;
  ```

- Regular functions have mixed case; accessors and mutators may be named like
  variables: `MyExcitingFunction()`, `MyExcitingMethod()`,
  `my_exciting_member_variable()`, `set_my_exciting_member_variable()`

- Enumerators (for both scoped and unscoped enums) should be named either like
  constants or like macros: either `kEnumName` or `ENUM_NAME`.

- If you are naming something that is analogous to an existing C or C++ entity
  then you can follow the existing naming convention scheme.

#### Document Format For Smart Contracts

File Layout Rules:

- Generally more than 1000 lines of program code is difficult to read, try to
  avoid the situation that the number of lines of code in a file is too long.
  Each contract document should contain only a single contract class or contract
  interface.

Order Of Files:

- Notes on files: All contract source files have a note at the beginning, which
  lists the copyright statement, file name, function description, and creation
  and modification records of the file.
- Remarks for class or interface: Comments should be made before class and
  interface definitions, including descriptions of classes and interfaces,
  latest modifiers, version numbers, reference links, etc.
- The order of class member: first the public level, then the protection
  level, and finally the private level.
- Member functions: Functions within a contract should be grouped by module, not by
  scope or access permissions.

#### Feature Uses Advice

##### Structs vs. Classes

Use a struct only for passive objects that carry data; everything else is a
class.

The struct and class keywords behave almost identically in C++. We add our own
semantic meanings to each keyword, so you should use the appropriate keyword for
the data-type you're defining.

structs should be used for passive objects that carry data, and may have
associated constants, but lack any functionality other than access/setting the
data members. All fields must be public, and accessed directly rather than
through getter/setter methods. The struct must not have invariants that imply
relationships between different fields, since direct user access to those fields
may break those invariants. Methods should not provide behavior but should only
be used to set up the data members, e.g., constructor, destructor, Initialize(),
Reset().

If more functionality or invariants are required, a class is more appropriate.
If in doubt, make it a class.

##### Inheritance

Composition is often more appropriate than inheritance. When using inheritance,
make it `public`.

All inheritance should be public. If you want to do private inheritance, you
should be including an instance of the base class as a member instead.

Do not overuse implementation inheritance. Composition is often more
appropriate. Try to restrict use of inheritance to the "is-a" case: Bar
subclasses Foo if it can reasonably be said that Bar "is a kind of" Foo.



##### Multiple Inheritance

Multiple inheritance is especially problematic, because it often imposes a
higher performance overhead (in fact, the performance drop from single
inheritance to multiple inheritance can often be greater than the performance
drop from ordinary to virtual dispatch), and because it risks leading to
"diamond" inheritance patterns, which are prone to ambiguity, confusion, and
outright bugs.

**Multiple implementation inheritance is strongly discouraged.**

##### move

The `std::move` introduced in C++11 can effectively transfer resources to other
objects. In our practice, use `std :: move` can effectively reduce the
consumption of `Gas`, especially when using containers. When returning a value,
it should return rvalue references and use `std::move` to convert lvalue
references to rvalue references to reduce Gas consumption. For example:

```cpp
std::vector<std::string>&& get_vec() {
    std::vector<std::string> v;
    // ignore
    return std::move(v); // very important
}
```
#### auto

The `auto` keyword can automatically deduced from its initializer. Used with
containers and iterators can simplify code. For example:

```cpp
std::map<std::string, std::string> my_map;
for (auto it = my_map.begin(); it != my_map.end(); it++) {
    // ignore
}
```
##### Reference Arguments

Suggest using reference arguments as function parameters. Reference parameters
can reduce unnecessary replication and reduce unnecessary memory allocation. For us
WASM virtual machines, memory allocation is an expensive operation.

##### Containers

The C ++ standard library provides some commonly used containers (map, vector, list, etc.), and you should carefully read the corresponding interface documentation when using it. It is important to note that the `operator[]` oper ator of map, according to the interface documentation, when the key does not exist, the insert action will be performed. For contract development, when using `StorageType` to store the map, do not use` operator [] `to determine whether the key exists, but use` find () ` .

---

## API








### block api

#### platon_block_hash()

```cpp
h256 platon::platon_block_hash(int64_t num)
```

Gets the block hash based on the block height.

* **Parameters**
  * `num:` Height of block
* **Returns**
  * Hash of block

#### platon_block_number()

```cpp
uint64_t platon_block_number()
```

Get the height of the current block

* **Returns**
  * the height of the current block

#### platon_coinbase()

```cpp
Address platon::platon_coinbase()
```

Gets the Hash of miner nodes.

* **Returns**
  * Hash of miner nodes

#### platon_unix_timestamp()

```cpp
int64_t platon::platon_unix_timestamp()
```

Get the unix timestamp of the current block.

* **Returns**
  * The unix timestamp of the current block (second)

#### platon_gas_limit()

```cpp
uint64_t platon_gas_limit()
```

Get the value of gas price limit

* **Returns**
  * the value of gas price limit

### transaction api

#### platon_gas_price()

```cpp
u128 platon::platon_gas_price()
```

Get the value of gas price.

* **Returns**
  * The value of gas price

#### platon_gas()

```cpp
uint64_t platon_gas()
```

Get the value of gas

* **Returns**
  * the value of gas

#### platon_caller_nonce

```cpp
uint64_t platon_caller_nonce()
```

Get the value of the caller's nonce

* **Returns**
  * the value of the caller's nonce

#### platon_call_value()

```cpp
u128 platon::platon_call_value()
```

Get the value of the current transaction value field.

* **Returns**
  * The value of the current transaction value field

#### platon_caller()

```cpp
Address platon::platon_caller()
```

Get the address of caller.

* **Returns**
  * The address of calle

#### platon_origin()

```cpp
Address platon::platon_origin()
```

Get the address of original caller.

* **Returns**
  * The address of original caller

#### platon_address()

```cpp
Address platon::platon_address()
```

Get the address of contract.

* **Returns**
  * The address of contract

### account api

#### make_address()

```cpp
template <size_t M> Address make_address(const char (&str)[M])
```

Converts a c-style string to an address object.

* **参数**
  * `str：` C-style string
* **返回值**
  * Address object


#### platon_balance()

```cpp
Energon platon::platon_balance(const Address & addr)
```

Get the balance based on the address.

* **Parameters**
  * `addr:` address
* **Returns**
  * The balance of the address

#### platon_transfer()

```cpp
bool platon::platon_transfer(const Address &addr, const Energon &amount)
```

Transfer the amount of Energon to address.

* **Parameters**
  * `addr:` Accounts address
  * `amount:` The amount of Energon
* **Returns**
  * true if transfer success, false otherwise

#### platon::Energon Class

Energo is a type of currency

* **Public Member Functions**
  * `Energon (u128 n)`
    Construct a new Energon.

  * `const u128 Get () const`
    Get amount of Von.

  * `const bytes Bytes () const`
    Get the bytes of value, the bytes use big-end representations.

  * `Energon & Add (const u128 &v)`
    Add amount of Von.

  * `Energon & Add (const Energon &rhs)`
    Add amount of Von.

  * `Energon & operator+= (const Energon &rhs)`
    Implement operator +=

* **Constructor & Destructor Documentation**

  * `platon::Energon::Energon(u128 n)`
    Construct a new Energon.
    * **Parameters**
      * `n:`amount of Von

* **Member Function Documentation**
  * `Energon& platon::Energon::Add(const Energon & rhs)`
    Add amount of Von.

    * **Parameters**
      * `rhs:`Amount of Von
    * **Returns**
      * The reference of Energon

  * `Energon& platon::Energon::Add(const u128 & v)`
    Add amount of Von.

    * **Parameters**
      * `v:` Amount of Von
    * **Returns**
      * The reference of Energon

  * `const bytes platon::Energon::Bytes() const`

    Get the bytes of value, the bytes use big-end representations.

    * **Returns**
      * The bytes of value

  * `const u128 platon::Energon::Get() const`

    Get amount of Von.

    * **Returns**
      * The amount of Von

  * `Energon& platon::Energon::operator+= ( const Energon & rhs)`

    Implement operator +=

    * **Parameters**
      * `rhs:` Energon object
    * **Returns**
      * The reference of Energon

#### platon::WhiteList< TableName > Class

```cpp
template<Name::Raw TableName>
class platon::WhiteList< TableName >
```

Persist storage whitelist implement.

* **Template Parameters**
  * `Name:` Whitelist name, in the same contract, the name should be unique

* **Constructor & Destructor Documentation**

  * `template<Name::Raw TableName>
    platon::WhiteList< TableName >::WhiteList ()`

    Construct a new whitlist.

* **public Member Functions**
  * `WhiteList ()`
    Construct a new whitlist.

  * `void Add (const std::string &addr)`
    Add the address to whitelist.

  * `void Add (const Address &addr)`
    Add the address to whitelist.

  * `void Delete (const std::string &addr)`
    Delete the address from whitelist.

  * `void Delete (const Address &addr)`
    Delete the address from whitelist.

  * `bool Exists (const std::string &addr)`
    Whether the address exists in whitelist.

  * `bool Exists (const Address &addr)`
    Whether the address exists in whitelist.

* **Member Function Documentation**

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Add ( const Address & addr)`

    Add the address to whitelist.

    * **Parameters**
      * `addr:` Accounts address

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Add ( const std::string & addr)`
    Add the address to whitelist.

    * **Parameters**
      * `addr:` Accounts address

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Delete ( const Address & addr)`
    Delete the address from whitelist.
    * **Parameters**
      * `addr:` Accounts address

  * `template<Name::Raw TableName>
    void platon::WhiteList< TableName >::Delete ( const std::string & addr)`
    Delete the address from whitelist.

    * **Parameters**
      * `addr:` Accounts address

  * `template<Name::Raw TableName>
    bool platon::WhiteList< TableName >::Exists ( const Address & addr)`
    Whether the address exists in whitelist.
    * **Parameters**
      * `addr:` Accounts address
    * **Returns**
      * true if exists, false otherwise

  * `template<Name::Raw TableName>
    bool platon::WhiteList< TableName >::Exists ( const std::string & addr)`
    Whether the address exists in whitelist.

    * **Parameters**
      * `addr:` Accounts address
    * **Returns**
      * true if exists, false otherwise

### storage api

#### platon_set_state()

```cpp
void platon_set_state(const uint8_t *key, size_t klen, const uint8_t *value, size_t vlen)
```

Set the state object

* **Parameters**
  * `key:` Key
  * `Klen:` The length of key
  * `value:` Value
  * `vlen:` The length of value

#### platon_get_state_length()

```cpp
size_t platon_get_state_length(const uint8_t *key, size_t klen)
```

Get the length of state object

* **Parameters**
  *`key:` Key
  * `Klen:` The length of key

* **Returns**
  * The length of state object

#### platon_get_state()

```cpp
size_t platon_get_state(const uint8_t *key, size_t klen, uint8_t *value, size_t vlen);
```

Get the state object

* **Parameters**
  * `key:` Key
  * `Klen:` The length of key
  * `value:` Value
  * `vlen:` The length of value

* **Returns**
  * The length of value

#### platon::StorageType< StorageName, T > Class Template

```cpp
template<Name::Raw StorageName, typename T>
class platon::StorageType< StorageName, T >
```

* **Template Parameters**
  * `StorageName:` Element value name, in the same contract, the name needs to be unique
  * `T:` Element type

* **Public Member Functions**
  * `StorageType ()`
    Construct a new Storage Type object

  * `StorageType (const T &d)`
    Construct a new Storage Type object

  * `StorageType (const StorageType< StorageName, T > &)=delete`

  * `StorageType (const StorageType< StorageName, T > &&)=delete`

  * `~StorageType ()`
    Destroy the Storage Type object. Refresh to blockchain.

  * `T & operator= (const T &t)`

  * `template<typename P>
    bool operator== (const P &t) const`

  * `template<typename P>
    bool operator!= (const P &t) const`

  * `template<typename P>
    bool operator< (const P &t) const`

  * `template<typename P>
    bool operator>= (const P &t) const`

  * `template<typename P>
    bool operator<= (const P &t) const`

  * `template<typename P>
    bool operator> (const P &t) const

  * `template<typename P>
    T & operator^= (const P &t) const`

  * `template<typename P>
    T  operator^ (const P &t) const`

  * `template<typename P>
    T & operator|= (const P &t) const`

  * `template<typename P>
    T  operator| (const P &t) const`

  * `template<typename P>
    T & operator&= (const P &t) const`

  * `template<typename P>
    T  operator& (const P &t) const`

  * `T  operator~ () const`

  * `T & operator<< (int offset)`

  * `T & operator>> (int offset)`

  * `T & operator++ ()`

  * `T  operator++ (int)`

  * `T & operator[] (int i)`

  * `template<typename P>
    T & operator+= (const P &p)`

  * `template<typename P>
    T & operator-= (const P &p)`

  * `T & operator* ()`

  * `T *  operator-> ()`

  * `operator bool () const`

  * `T  get () const`

  * `T & self ()`

#### platon::db::Array< TableName, Key, N > Class Template

```cpp
template<Name::Raw TableName, typename Key, unsigned N>
class platon::db::Array< TableName, Key, N >
```

* **Classes**
  * `class const_iterator
    Constant iterator.`

  * `class const_reverse_iterator
    Constant reverse iterator.`

  * `class iterator
    Iterator.`

* **Public Types**
  * `typedef std::reverse_iterator< iterator >  reverse_iterator`

* **Public Member Functions**
  * `Array ()`

  * `Array (const Array< TableName, Key, N > &)=delete`

  * `Array (const Array< TableName, Key, N > &&)=delete`

  * `Array< TableName, Key, N > & operator= (const Array< TableName, Key, N > &)=delete`

  * `~Array ()`

  * `iterator begin ()`
    iterator start position

  * `iterator end ()`
    iterator end position

  * `reverse_iterator rbegin ()`
    Reverse iterator start position.

  * `reverse_iterator rend ()`
    Reverse iterator end position.

  * `const_iterator cbegin ()`
    Constant iterator start position.

  * `const_iterator cend ()`
    Constant iterator end position.

  * `const_reverse_iterator crbegin ()`
    Inverse constant iterator start position.

  * `const_reverse_iterator crend ()`
    Inverse constant iterator end position.

  * `Key & at (size_t pos)`
    Get the specified position element.

  * `Key & operator[] (size_t pos)`
    Bracket operator.

  * `size_t  size ()`
    array size

  * `Key get_const (size_t pos)`
    Get the Const object. Do not flush to cache.

  * `void  set_const (size_t pos, const Key &key)`
    Set the Const object, Do not flush to cache.

* **Static Public Attributes**
  * `static const std::string  kType = "__array__"`

#### platon::db::Map< TableName, Key, Value > Class Template

```cpp
template<Name::Raw TableName, typename Key, typename Value>
class platon::db::Map< TableName, Key, Value >
```

Implement map operations, Map templates.

* **Template Parameters**
  * `TableName:` The name of the Map, the name of the Map should be unique within each contract.
  * `Key:` key type
  * `Value:` value type

  MapType::Traverse The default is Traverse, when Traverse needs extra data structure to operate, set to NoTraverse when no traversal operation is needed.

* **Public Member Functions**
  * `Map ()`

  * `Map(const Map< TableName, Key, Value > &)=delete`

  * `Map(const Map< TableName, Key, Value > &&)=delete`

  * `Map< TableName, Key, Value > & operator= (const Map< TableName, Key, Value > &)=delete`

  * `~Map ()`
    Destroy the Map object Refresh data to the blockchain.

  * `bool insert (const Key &k, const Value &v)`
    Insert a new key-value pair, Update to cache.

  * `bool insert_const (const Key &k, const Value &v)`
    Insert a new key-value pair that will not be updated to the cache. Suitable for large number of inserts, no updates after insertion.

  * `Value  get_const (const Key &k)`
    Get the Const object, will not join the cache.

  * `Value & at (const Key &k)`
    Get value, will be added to the cache.

  * `void  erase (const Key &k)`
    Delete key-value pairs.

  * `Value & operator[] (const Key &k)`
    Bracket operator.

  * `boolcontains (const Key &key)`
    Checks if there is an element with key equivalent to key in the container.

  * `void  flush ()`
    Refresh the modified data in memory to the blockchain.

* **Static Public Attributes**
  * `static const std::string  kType = "__map__"`

* **Constructor & Destructor Documentation**

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::Map ()`

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > & )`

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::Map (const Map< TableName, Key, Value > && )`

  * `template<Name::Raw TableName, typename Key , typename Value >
    platon::db::Map< TableName, Key, Value >::~Map ()`

Destroy the Map object Refresh data to the blockchain.

* **Member Function Documentation**

  * `template<Name::Raw TableName, typename Key , typename Value >
    Value& platon::db::Map< TableName, Key, Value >::at ( const Key & k )`
    Get value, will be added to the cache.

    * **Parameters**
      * `k:` Key
    * **Returns**
      * Value&
    * **Example:**

      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
      assert(map.at["hello"] == "world");
      ```

  * `template<Name::Raw TableName, typename Key , typename Value >
    bool platon::db::Map< TableName, Key, Value >::contains ( const Key & key )`
    Checks if there is an element with key equivalent to key in the container.

    * **Parameters**
      * `k:` Key
    * **Returns**
      * true if there is such an element, otherwise false.
    * **Example:**

      ```cpp
       typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
       MapStr map;
       map.["hello"] = "world";
       assert(map.contains("hello"));
      ```

  * `template<Name::Raw TableName, typename Key , typename Value >
    void platon::db::Map< TableName, Key, Value >::erase ( const Key & k )`
    Delete key-value pairs.

    * **Parameters**
      * `k:` Key
    * **Example:**

      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
      map.erase("hello");
      ```

  * `template<Name::Raw TableName, typename Key , typename Value >
    void platon::db::Map< TableName, Key, Value >::flush ()`
    Refresh the modified data in memory to the blockchain.

  * `template<Name::Raw TableName, typename Key , typename Value >
    Value platon::db::Map< TableName, Key, Value >::get_const ( const Key & k)`
    Get the Const object, will not join the cache.

    * **Parameters**
      * `k:` Key
    * **Returns**
      * Value
    * **Example:**

      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
      assert(map.get_const["hello"] == "world");
      ```

  * `template<Name::Raw TableName, typename Key , typename Value >
    bool platon::db::Map< TableName, Key, Value >::insert ( const Key & k,
    const Value & v)`
    Insert a new key-value pair, Update to cache.

    * **Parameters**
      * `k:` Key
      * `v:` Value
    * **Returns**
      * true Inserted successfully, false Insert failed
    * **Example:**

      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert("hello", "world");
      assert(map["hello"] == "world");
      ```

  * `template<Name::Raw TableName, typename Key , typename Value >
    bool platon::db::Map< TableName, Key, Value >::insert_const ( const Key & k,
    const Value & v)`
    Insert a new key-value pair that will not be updated to the cache. Suitable for large number of inserts, no updates after insertion.

    * **Parameters**
      * `k:` Key
      * `v:` Value
    * **Returns**
      * true Inserted successfully, false Insert failed
    * **Example:**

      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.insert_const("hello", "world");
      assert(map["hello"] == "world");
      ```

  * `template<Name::Raw TableName, typename Key , typename Value >
    Map<TableName, Key, Value>& platon::db::Map< TableName, Key, Value >::operator= ( const Map< TableName, Key, Value > & )`

  * `template<Name::Raw TableName, typename Key , typename Value >
    Value& platon::db::Map< TableName, Key, Value >::operator[] ( const Key & k)`
    Bracket operator.

    * **Parameters**
      * `k:` Key
    * **Returns**
      * Value& Get Value
    * **Example:**

      ```cpp
      typedef platon::db::Map<"map_str"_n, std::string, std::string> MapStr;
      MapStr map;
      map.["hello"] = "world";
      ```

* **Member Data Documentation**
  * `template<Name::Raw TableName, typename Key , typename Value >
    const std::string platon::db::Map< TableName, Key, Value >::kType = "__map__"`

#### template<Name::Raw TableName, typename T, typename... Indices> class platon::db::MultiIndex< TableName, T, Indices >

MultiIndex supports unique indexes and ordinary indexes. The unique index should be placed first in the parameter. The structure needs to provide the get function corresponding to the index field.

* **Member Function Documentation**
  * `template<Name::Raw TableName, typename T , typename... Indices>const_iterator platon::db::MultiIndex< TableName, T, Indices >::cbegin()`
Iterator start position

    * **Returns**
      * const_iterator
    * **Example:**

    ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
    for (auto it = member_table.cbegin(); it != it_end; ++it){}
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices>
const_iterator platon::db::MultiIndex< TableName, T, Indices >::cend()`
Iterator end position

    * **Returns**
      * const_iterator
    * **Example:**

    ```cpp
      struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
    for (auto it = member_table.cbegin(); it != it_end; ++it){}
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > size_t platon::db::MultiIndex< TableName, T, Indices >::count(const KEY &key)`

    * **Returns**
      * Gets the number of data corresponding to the index value
    * **Example:**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    auto count = member_table.count<"index2"_n>(uint8_t(10));
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda> std::pair<const_iterator, bool> platon::db::MultiIndex< TableName, T, Indices >::emplace(Lambda &constructor)`

    * **Parameters**
      * constructor of value
    * **Returns**
      * Returns an iterator that indicates whether the insertion was successful with the bool type. If unique index conflicts, the insertion fails
    * **Example:**

    ```cpp
    struct Member {
      std::string name;
      uint8_t age;
      uint8_t sex;
      uint64_t $seq_;
      std::string Name() const { return name; }
      uint8_t Age() const { return age; }
      PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
      "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                          IndexType::UniqueIndex>>,
      IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
      member_table;
    member_table.emplace([&](auto &m) {
      m.age = 10;
      m.name = "hello";
      m.sex = 1;
    });
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> void platon::db::MultiIndex< TableName, T, Indices >::erase(const_iterator position)`
erase data based on iterator

    * **Parameters**
      * `position:` position of iterator
    * **Example:**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
    IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                      IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                        IndexType::NormalIndex>>>
    member_table;
    auto vect_iter = member_table.find<"index2"_n>(uint8_t(10));
    member_table.erase(vect_iter[0]);
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName, typename KEY > const_iterator platon::db::MultiIndex< TableName, T, Indices >::find(const KEY & key)`
Find the data, Only a unique index is available.

    * **Parameters**
      * `key:` key of index
    * **Returns**
      * the first iterator. cend() if not found.
    * **Example:**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    auto vect_iter = member_table.find<"index2"_n>(uint8_t(10));
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<Name::Raw IndexName>auto platon::db::MultiIndex< TableName, T, Indices >::get_index()`
Gets the index object of a non-unique index.

    * **Returns**
      * index object
    * **Example:**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    auto index = member_table.get_index<"index2"_n>();
    ```

  * `template<Name::Raw TableName, typename T , typename... Indices> template<typename Lambda >void platon::db::MultiIndex< TableName, T, Indices >::modify(const_iterator position,Lambda && constructor)`
Modify data based on iterator, but cannot modify all index-related fields .

    * **Parameters**
      * `position:` position of iterator
      * `constructor:` lambda function that updates the target object
    * **Example:**

    ```cpp
    struct Member {
    std::string name;
    uint8_t age;
    uint8_t sex;
    uint64_t $seq_;
    std::string Name() const { return name; }
    uint8_t Age() const { return age; }
    PLATON_SERIALIZE(Member, (name)(age)(sex))
    };
    MultiIndex<
    "table"_n, Member,
      IndexedBy<"index"_n, IndexMemberFun<Member, std::string, &Member::Name,
                                        IndexType::UniqueIndex>>,
    IndexedBy<"index2"_n, IndexMemberFun<Member, uint8_t, &Member::Age,
                                          IndexType::NormalIndex>>>
    member_table;
    member_table.modify(r.first, [&](auto &m) { m.sex = 15; });
 

### contract api

#### platon_destroy()

```cpp
bool platon::platon_destroy ( const Address & addr)
```

Destory contract.

* **Parameters**
  * `addr:` Address of the contract
* **Returns**
  * true if destroy successfully, false otherwise

#### platon_migrate_contract()

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_migrate_contract ( Address & addr,
const bytes & init_args,
value_type  value,
gas_type  gas)
```

Migrate contract.

* **Parameters**
  * `addr:` The address of new contract
  * `init_args:` The input arguments
  * `value:` Transfer amount
  * `gas:` Pay amount of gas for this transaction
* **Returns**
  * true if migration successfully, false otherwise

#### cross_call_args()

```cpp
template<typename... Args>
bytes platon::cross_call_args ( const std::string & method,
const Args &...  args)  
```

Construct the Parameters of the call across contracts.

* **Parameters**
  * `method:` The method name of the invoked contract
  * `args:` The Parameters corresponding to the contract method
* **Returns**
  * Parameter byte array

#### platon_call() 1/2

```cpp
template<typename value_type , typename gas_type >
bool platon::platon_call ( const Address & addr,
const bytes & paras,
const value_type & value,
const gas_type & gas)  
```

Normal cross-contract invocation.

* **Parameters**
  * `addr:` The contract address to be invoked
  * `paras:` A contract parameter constructed using the function cross_call_args
  * `gas:` The called contract method estimates the gas consumed
  * `value:` The amount transferred to the contract
* **Returns**
  * The call succeeds or fails

#### platon_call() 2/2

```cpp
template<typename return_type , typename value_type , typename gas_type , typename... Args>
decltype(auto) platon::platon_call ( const Address & addr,
const value_type & value,
const gas_type & gas,
const std::string & method,
const Args &...  args
)
```

Normal cross-contract invocation.

* **Parameters**
  * `addr:` The contract address to be invoked
  * `value:` The amount transferred to the contract
  * `gas:` The called contract method estimates the gas consumed
  * `method:` The method name of the invoked contract
  * `args:` The Parameters corresponding to the contract method
* **Returns**
  * The contract method * **Returns** the value and whether the execution was successful
* **Example:**

   ```cpp
   auto result =
   platon_call<int>(Address("0xEC081ab45BE978A4A630eB8cbcBffA50E747971B"),
   uint32_t(100), uint32_t(100), "add", 1,2,3);
   if(!result.secod){
     platon_throw("cross call fail");
   }
   ```

#### platon_delegate_call() 1/2

```cpp
template<typename gas_type >
bool platon::platon_delegate_call ( const Address & addr,
const bytes & paras,
const gas_type & gas
)  
```

Cross contract delegation call.

* **Parameters**
  * `addr:` The contract address to be invoked
  * `paras:` A contract parameter constructed using the function cross_call_args
  * `gas:` The called contract method estimates the gas consumed
* **Returns**
  * The call succeeds or fails

#### platon_delegate_call() 2/2

```cpp
template<typename return_type , typename gas_type , typename... Args>
decltype(auto) platon::platon_delegate_call ( const Address & addr,
const gas_type & gas,
const std::string & method,
const Args &...  args)  
```

The proxy is invoked across contracts.

* **Parameters**
  * `addr:` The contract address to be invoked
  * `gas:` The called contract method estimates the gas consumed
  * `method:` The method name of the invoked contract
  * `args:` The Parameters corresponding to the contract method
* **Returns**
  * The contract method * **Returns** the value and whether the execution was successful
* **Example:**

  ```cpp
  auto result =
  platon_delegate_call<int>(Address("0xEC081ab45BE978A4A630eB8cbcBffA50E747971B"),
   uint32_t(100), "add", 1,2,3);
   if(!result.secod){
     platon_throw("cross call fail");
   }
  ```

#### get_call_output()

```cpp
template<typename T >
void platon::get_call_output ( T & t)
```

Gets the return value of calling contract methods across contracts.

* **Template Parameters**
  * `T:` The output value type
* **Parameters**
  * `t:` The value returned by the contract method

#### platon_event

```cpp
void platon_event(const uint8_t *topic, size_t topic_len, const uint8_t *args,
                  size_t args_len);
```

Post event to VM

* **Parameters**
  * `topic:` The topic of event
  * `topic_len:` The length of topic
  * `args:` The arguments
  * `args_len:` The length of arguments

### exception api

#### platon_panic

```cpp
void platon_panic(void);
```

Terminate transaction, deduct all gas given by transaction

#### platon_revert

```cpp
void platon_revert(void);
```

Terminate the transaction and deduct the gas consumed

### other api

#### platon_sha3()

```cpp
h256 platon::platon_sha3 ( const bytes & data )
```

Sh3 algorithm.

* **Parameters**
  * `data:` Binary data
* **Returns**
  * The Hash of the data

---

## FAQ

### About Compile

1. How to use `platon-cpp` for compile multiple `cpp` files?

    ```shell
    platon-cpp ./test.cpp ./test1.cpp
    ```

    Only allowing exists one contract class.

2. How to specified output directory and filename when use `platon-cpp`
   to compile contract?

   Use `-o` flag, and must be specified output directory and filename at the
   same time.

   ```shell
   platon-cpp ./test.cpp -o ./out/test.wasm
   ```

3. What data types does ABI support?

    Generate ABI supported types and conversion rules as follows:

| Type               | ABI          |
| ------------------ | ------------ |
| bool               | bool         |
| uint8\_t           | uint8        |
| uint16\_t          | uint16       |
| uint32\_t          | uint32       |
| uint64\_t          | uint64       |
| int8\_t            | int8         |
| int16\_t           | int16        |
| int32\_t           | int32        |
| int64\_t           | int64        |
| bytes              | uint8\[\]    |
| std::string        | string       |
| std::vector<T>     | T\[\]        |
| std::array\[T, N\] | T\[N\]       |
| std::pair<T, U>    | pair<T, U    |
| std::set<T>        | set<T>       |
| std::map<T, V>     | map<T, V>    |
| std::list<T>       | list<T>      |
| FixedHash<N>       | FixedHash<N> |
| u128               | uint128      |
| bigint             | uint128      |

### About Contract

1. How to output contract debug logs in the `platon` process?

    - Add `#undef NDEBUG` at the first line of contract codes, and must before
      header file included.

      ```cpp
      #undef NDEBUG
      
      #include <platon/platon.hpp>
      
      //...
      ```

    - `platon` startup command specifies log level 4 and enable debug flag.

        ```cpp
        ./platon --debug --verbosity 4 ...
        ```

2. How to write a contract can effectively reduce Gas consumption?

    - Use reference arguments
      ```cpp
      void test(const std::string& str) {}
      ```

    - Return rvalue reference

    ```cpp
    std::vector<std::string>&& test() {
        std::vector<std::string> v;
        // ...
        return std::move(v);
    }
    ```

    - Try not to apply for large blocks of memory

3. What should I pay attention to when using `StorageType`?

   - Should be initialized in `init()`
     ```cpp
      CONTRAT Hello : public Contract {
      public:
        ACTION void init() {
            s_.self() = "test";
        }
      private:
        StorageType<"test"_n, std::string> s_;
      };
     ```
    ```
   
    - It is recommended to use a specialized type of `StorageType` directly
   
      + Uint8
      + Int8
      + Uint16
      + Int16
      + Uint
      + Int
      + Uint64
      + Int64
      + String
      + Vector
      + Set
      + Map
      + Array
      + Tuple
    ```

4. What is the difference between `StorageType` and `platon::db::Map`,
   `platon::db::Array`?

   From the underlying storage level, the implementation of `StorageType` is
   serialized as a whole, and then stored in the database. `platon::db::Map`
   and `platon::db::Array` serialize each element of the container as K/V is
   stored to the database. For large-scale data, `platon::db::Map` and
   `platon::db::Array` perform better.

    When implementing a contract, a suitable storage structure should be
    selected based on the size of the data.

5. RLP serialization/deserialization What C++ standard library types are
   supported?

   The following C ++ standard library types are supported:

   - std::string
   - std::vector
   - std::map
   - std::list
   - std::array
   - std::set
   - std::pair
   - std::tuple

6. How do custom types support RLP serialization/deserialization?

    - Macro `PLATON_SERIALIZE` for common types
    ```cpp
       struct Base {
       int a;
       std::string b;
    
       PLATON_SERIALIZE(Base, (a)(b));
       };
    ```
    - The derived class uses the macro `PLATON_SERIALIZE_DERIVED`, and the base class also uses the macro `PLATON_SERIALIZE` 

    ```cpp
    struct Derived : public Base {
      int c;
      int d;
    
      PLATON_SERIALIZE_DERIVED(Derived, Base, (c)(d));
    };
    ```

    














