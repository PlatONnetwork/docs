---
id: PRC20_contract
title: PRC-20
sidebar_label: PRC-20
---

## PRC-20 Contract

PRC-20 is a set of standards for implementing token APIs on PlatON through smart contracts. It provides functions including interfaces for token transfers, querying token balances, and the total supply of tokens available on the network, and is fully compatible with [ERC-20](https://eips.ethereum.org/EIPS/eip-20).

### Standards

The PRC-20 introduces a standard for Fungible Tokens, in other words, they have a property that makes each Token be exactly the same (in type and value) of another Token. For example, an PRC-20 Token acts just like the ETH, meaning that 1 Token is and will always be equal to all the other Tokens.
If a Smart Contract implements the following methods and events it can be called an PRC-20 Token Contract and, once deployed, it will be responsible to keep track of the created tokens on PlatON.

``` solidity
contract PRC20 {

	//required
    function totalSupply() constant returns (uint theTotalSupply);
    function balanceOf(address _owner) constant returns (uint balance);
    function transfer(address _to, uint _value) returns (bool success);
    function transferFrom(address _from, address _to, uint _value) returns (bool success);
    function approve(address _spender, uint _value) returns (bool success);
    function allowance(address _owner, address _spender) constant returns (uint remaining);
	
	//optional
	function name() public view returns (string);
	function symbol() public view returns (string);
	function decimals() public view returns (uint8);
	
	//events
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}
```

#### Required APIs

- totalSupply

Returns the total token supply.

- balanceOf

Returns the account balance of another account with address _owner.

- transfer

Transfers _value amount of tokens to address _to, and MUST fire the Transfer event. The function SHOULD throw if the message caller's account balance does not have enough tokens to spend.

Note Transfers of 0 values MUST be treated as normal transfers and fire the Transfer event.

- approve

Allows _spender to withdraw from your account multiple times, up to the _value amount. If this function is called again it overwrites the current allowance with _value..

- transferFrom

Transfers _value amount of tokens from address _from to address _to, and MUST fire the Transfer event.

The transferFrom method is used for a withdraw workflow, allowing contracts to transfer tokens on your behalf. This can be used for example to allow a contract to transfer tokens on your behalf and/or to charge fees in sub-currencies. The function SHOULD throw unless the _from account has deliberately authorized the sender of the message via some mechanism.

Note Transfers of 0 values MUST be treated as normal transfers and fire the Transfer event.

- allowance

Returns the amount which _spender is still allowed to withdraw from _owner.

#### Optional APIs

- name

Returns the name of the token - e.g. "MyToken".

- symbol

Returns the symbol of the token. E.g. "HAHA".

- decimals

Returns the number of decimals the token uses - e.g. 8, means to divide the token amount by 100000000 to get its user representation.

#### Events

- Transfer

MUST trigger when tokens are transferred, including zero value transfers.

A token contract which creates new tokens SHOULD trigger a Transfer event with the _from address set to 0x0 when tokens are created.

- Approval

MUST trigger on any successful call to approve(address _spender, uint256 _value).

### Implementation

Refer [OpenZeppelin implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20).

### View

It can be viewed via PlatON [browser](https://scan.platon.network/tokens/tokensTranfer/prc20) and also via [ATON](/docs/en/ATON-user-manual/) to view the PRC-20 contract transactions.

### Deploy

please refer to [Solidity Contracts Getting Started Manual](/docs/en/Solidity_Dev_Manual#introduction)

### Invoking functions

Using python as an example:

#### Installing Dependencies

Use the following command to install the PlatON python library,Python version 3.7.5+ is recommended:

``` shell
pip install client-sdk-python
```

During the installation process, some dependency packages will require c++14 compilation, please download [cppbuildtools](http://go.microsoft.com/fwlink/?LinkId=691126) after you see the relevant prompt, use the default value to install, and then re-execute the pip install command.

#### Instantiation

``` python
from client_sdk_python import Web3, HTTPProvider

rpc, chain_id, hrp = 'http://127.0.0.1:6789', 100, 'lat'
w3 = Web3(HTTPProvider(rpc), chain_id=chain_id, hrp_type=hrp)
abi = []			# ABI
prc20 = w3.eth.contract(address='contract address', abi=abi)
# View all functions and events of the contract
print([func for func in prc20.functions])
print([event for event in prc20.events])
```

#### Query the total number of tokens issued
``` python
prc20.functions.totalSupply().call()
```

#### Check the token balance of your account
``` python
prc20.functions.balanceOf('you address').call()
```

#### Transfer
``` python
tx = {
    'chainId': w3.chain_id,
    'nonce': w3.eth.getTransactionCount('your address'),
    'gas': 4012388,
    'value': 0,
    'gasPrice': 1000000000,
}
txn = prc20.functions.transfer(to='to address', value=1 * 10 ** 18).buildTransaction(tx)
signed_txn = w3.eth.account.signTransaction(txn, private_key='your private key')
tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction).hex()
receipt = w3.eth.waitForTransactionReceipt(tx_hash)
```
#### Get contract events

As an example of transfer transaction events, other events can be obtained in a similar way.

``` python
events = prc20.events.Transfer().processReceipt(receipt)
```