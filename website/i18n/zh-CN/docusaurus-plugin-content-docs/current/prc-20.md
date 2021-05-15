---
id: PRC20_contract
title: PRC-20
sidebar_label: PRC-20
---

## PRC-20合约

PRC-20是在PlatON上通过智能合约实现代币API的一套标准，它提供的功能包括代币转账、查询代币余额以及网络上可用的代币总供应量等接口，与[ERC-20](https://eips.ethereum.org/EIPS/eip-20)完全兼容。

### 协议标准

PRC-20协议是对可兑换同质代币（Fungible Tokens）定义的标准，同质代币每个Token与另外Token具有完全相同的类型和价值，该合约标准中规定了合约定义的函数、事件等，所有遵守这一标准编写的合约都被认为是一个PRC-20合约。

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

#### 必须实现的接口

- totalSupply

该方法返回令牌总的发行量。

- balanceOf

该方法返回查询账户的令牌余额。

- transfer

该方法用来从智能合约地址里转账令牌到指定账户。

- approve

该方法用来授权第三方（例如Dapp）从令牌拥有者账户转账令牌。

- transferFrom

该方法可供第三方从令牌拥有者账户转账令牌。需要配合approve()方法使用。

- allowance

该方法用来查询可供第三方转账的查询账户的令牌余额。

#### 可选实现的接口

- name

返回令牌名称

- symbol

返回令牌符号

- decimals

返回令牌精度

#### 事件

- Transfer

当通证被成功转账后，会触发Transfer转账事件，在链上记录转账信息日志。

- Approval

当approve()方法被成功调用后，会触发Approval事件，在链上记录授权信息日志。

### 示例

PRC-20标准与ERC-20完全兼容，示例可参考[这里](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20)。

### 查看

可以通过PlatON[浏览器](https://scan.platon.network/tokens/tokensTranfer/prc20)查看，也可以通过[ATON](https://devdocs.platon.network/docs/zh-CN/ATON-user-manual/)查看PRC-20合约交易。

### 合约发行

请参考[Solidity合约入门手册](/docs/zh-CN/Solidity_Dev_Manual#入门手册)。

### 调用方法

以python为例：

#### 安装依赖

使用下列命令，安装PlatON python library，建议 Python 版本3.7.5+:

``` shell
pip install client-sdk-python
```

在安装过程中，部分依赖包会需要c++14 编译，请在看到相关提示后，下载[cppbuildtools](http://go.microsoft.com/fwlink/?LinkId=691126)，使用默认值安装后，重新执行pip安装命令即可。

#### 实例化合约

以下为python代码示例：

``` python
from client_sdk_python import Web3, HTTPProvider

rpc, chain_id, hrp = 'http://127.0.0.1:6789', 100, 'lat'
w3 = Web3(HTTPProvider(rpc), chain_id=chain_id, hrp_type=hrp)
abi = [
  {
    "inputs":[
      {"internalType":"uint256", "name":"initialSupply", "type":"uint256"},
      {"internalType":"string", "name":"tokenName", "type":"string"},
      {"internalType":"string", "name":"tokenSymbol", "type":"string"}
	],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "inputs":[],
    "name":"totalSupply",
    "outputs":[{"internalType":"uint256", "name":"", "type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address", "name":"", "type":"address"}],
    "name":"balanceOf",
    "outputs":[{"internalType":"uint256", "name":"", "type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[
      {"internalType":"address", "name":"_to", "type":"address"},
      {"internalType":"uint256", "name":"_value", "type":"uint256"}
	],
    "name":"transfer",
    "outputs":[{"internalType":"bool", "name":"success", "type":"bool"}],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "anonymous":false,
    "inputs":[
      {"indexed":true, "internalType":"address", "name":"from", "type":"address"},
      {"indexed":true, "internalType":"address", "name":"to", "type":"address"},
      {"indexed":false, "internalType":"uint256", "name":"value", "type":"uint256"}
	],
    "name":"Transfer",
    "type":"event"
  }
]								# 合约abi内容
prc20 = w3.eth.contract(address='contract address', abi=abi)
# 查看合约所有的function 和 event
print([func for func in prc20.functions])
print([event for event in prc20.events])
```

#### 查询合约信息
以totalSupply、balanceOf示例，其他查询方法与此类似：

``` python
# 查询令牌的总发行量
prc20.functions.totalSupply().call()
# 查询账户的令牌余额
prc20.functions.balanceOf('your address').call()
```

#### 发送合约交易
以transfer示例，其他交易方法与此类似：

``` python
# 转账令牌到指定账户
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

#### 获取合约事件
以transfer交易事件示例，其他事件获取方法与此类似：

``` python
events = prc20.events.Transfer().processReceipt(receipt)
```


