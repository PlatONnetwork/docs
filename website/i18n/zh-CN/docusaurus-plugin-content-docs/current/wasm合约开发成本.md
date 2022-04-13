---
id: Wasm_Contract_Dev_Costs
title: 开发成本
sidebar_label: 开发成本
---

### 概要


在区块链系统中，基于任何一条公链系统开发智能合约都涉及资源支出的开发成本。例如，在网络上部署/调用智能合约，进行能量转移，质押/委托等操作都需要花费一定的成本，不同的区块链网络开发成本不一样，在 `PlatON` 网络中运行着两种虚拟机EVM和WASM，在不同虚拟机上上开发智能合约的成本也是不一样的。本手册将重点介绍使用 `WASN` 虚拟机涉及到的成本使用，本文将用表格的形式对比小型合约、中型合约和大型合约的不同开发成本，同时将 `PlatON` 的 `EVM`/`WASM`虚拟机和以太坊虚拟机之间进行对比。在合约方面，使用一个简单的`SET/GET`功能的合约作为小型测试合约，中型合约示例将使用一个开源的[微博客](https://github.com/yep/eth-tweet)合约，而大型合约则是一个符合 `PRC20` 标准的智能合约。


#### 资源消耗

**简单set/get合约**

| 系统        | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗      | 备注              |
| :---------- | :------- | :------- | :------ | :------------------ | :------------ | :---------------- |
| PlatON-EVM  | 小型合约 | 0.3 kb   | 76953   | 5,000,000,000 `VON` | 384765 `gVON` | 0.000384765 `LAT` |
| Ethereum    | 小型合约 | 0.3 kb   | 127173  | 5,000,000,000 `wei` | 635865 `Gwei` | 0.000635865 `ETH` |
| PlatON-WASM | 小型合约 | 13.55 kb | 184043  | 5,000,000,000 `VON` | 920215 `gVON` | 0.000920215 `LAT` |


**微博客**

| 系统        | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗       | 备注              |
| :---------- | :------- | :------- | :------ | :------------------ | :------------- | :---------------- |
| PlatON-EVM  | 中型合约 | 2.08 kb  | 257065  | 5,000,000,000 `VON` | 1285325 `gVON` | 0.001285325 `LAT` |
| Ethereum    | 中型合约 | 2.08 kb  | 621385  | 5,000,000,000 `wei` | 3106925 `Gwei` | 0.003106925 `ETH` |
| PlatON-WASM | 中型合约 | 30.07 kb | 349713  | 5,000,000,000 `VON` | 1748565 `gVON` | 0.001748565 `LAT` |


**PRC20标准Token**

| 系统        | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗        | 备注              |
| :---------- | :------- | :------- | :------ | :------------------ | :-------------- | :---------------- |
| PlatON-EVM  | 大型合约 | 4.45 kb  | 552823  | 5,000,000,000 `VON` | 2764115  `gVON` | 0.002764115 `LAT` |
| Ethereum    | 大型合约 | 4.45 kb  | 1282171 | 5,000,000,000 `wei` | 6410855  `Gwei` | 0.006410855 `ETH` |
| PlatON-WASM | 大型合约 | 35.9 kb  | 486274  | 5,000,000,000 `VON` | 2431370  `gVON` | 0.00243137 `LAT`  |


### 小型合约示例

#### 简单set/get合约

**EVM示例代码**

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

字节码

```
608060405234801561001057600080fd5b50610117806100206000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063262a9dff146058578063967e6e65146080578063d5dcf1271460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e1565b005b60005481565b60008054905090565b80600081905550505600a165627a7a7230582079e51340567895e1097e1c9115e778c3d982b8e71b6997c57f1ba497c56c8b3b0029
```

字节大小：`311 byte => 0.3 kb`

-------------------

**WASM示例代码**

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

字节码

[查看字节码](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/SimpleStorage_wasm.bin)

字节大小：`13882 byte => 13.55 kb`

-------------------

###### 创建&部署合约成本

PlatON-EVM

* Gas消耗: 76953
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  384765 `gVON`（0.000384765 `LAT`）

以太坊

* Gas消耗: 127173
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  635865 `Gwei`（0.000635865 `ETH`）

PlatON-WASM

* Gas消耗: 184043
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  920215 `gVON`（0.000920215 `LAT`）

-----------------------------------

### 中型合约示例

#### 微博客合约

**EVM示例代码**

[点击查看微博客账户合约](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/account.sol)


字节码

[查看字节码](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_wasm.bin)


字节大小： `2130.5 byte => 2.08 kb`

---------------

**WASM示例代码**

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

字节码

[查看字节码](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_wasm.bin)

字节大小： `30788` byte => 30.07 kb`

---------------

###### 创建&部署合约成本

PlatON-EVM

* Gas消耗: 257065
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  1285325 `gVON`（0.001285325 `LAT`）

以太坊

* Gas消耗: 621385
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  3106925 `Gwei`（0.003106925 `ETH`）

PlatON-WASM

* Gas消耗: 349713
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  1748565 `gVON`（0.001748565 `LAT`）

------------------------

### 大型合约示例

#### PRC20标准token合约

**EVM示例代码**

[点击查看PRC20标准的智能合约](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/token.sol)


字节码

[查看字节码](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_evm.bin)


字节大小： `4557.5 byte => 4.45 kb`

-----------------------------

**WASM示例代码**

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
		platon::db::Map<"balances"_n, Address, uint64_t> balances;
		platon::db::Map<"allowed"_n, std::pair<Address, Address>, uint64_t> allowed;

	public:
		CONST uint64_t balanceOf(Address _owner) {
			return balances[_owner];		
		}

		ACTION bool transfer(Address _to, uint64_t _value){
			// Default assumes totalSupply can't be over max(2^64 - 1)
			// If your token leaves out totalSupply and can issue more tokens as time goes on,
			// you need to check if it doesn't wrap.
			// Replace the if with this on instead.
			Address sender = platon_caller();
			if (balances[sender] >= _value && _value > 0) {
				balances[sender] -= _value;
				balances[_to] += _value;
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
			auto key = std::make_pair(_from, sender);
			if(balances[_from] >= _value && allowed[key] >= _value && _value > 0){
				balances[_to] += _value;
				balances[_from] -= _value;
				allowed[key] -= _value;
				PLATON_EMIT_EVENT2(Transfer, _from, _to, _value);
				return true;
			} else {
				return false;			
			}
		}

		ACTION bool approve(Address _spender, uint64_t _value){
			Address sender = platon_caller();			
			auto key = std::make_pair(sender, _spender);
			allowed[key] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			return true;		
		}

		CONST uint64_t allowance(Address _owner, Address _spender){
			auto key = std::make_pair(_owner, _spender);
			return allowed[key];		
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
			balances[sender] = _initialAmount;		// Give the creator all initial tokens.
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
			auto key = std::make_pair(sender, _spender);
			allowed[key] = _value;
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

字节码

[查看字节码](https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_wasm.bin)


字节大小： `36764 byte => 35.9 kb`

-----------------------------

###### 创建&部署合约成本

PlatON-EVM

* Gas消耗: 552823
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  2764115 `gVON`（0.002764115 `LAT`）

以太坊

* Gas消耗: 1282171
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  6410855 `Gwei`（0.006410855 `ETH`）

PlatON-WASM

* Gas消耗: 486274
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  2431370 `gVON`（0.00243137 `LAT`）

------------------------


