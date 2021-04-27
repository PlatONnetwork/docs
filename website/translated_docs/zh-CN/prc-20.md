---
id: PRC20_contract
title: PRC-20合约
sidebar_label: PRC-20合约
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


---------------------------
列出每个接口，佩带一些说明,参考波场
---------------------------

### 示例

PRC-20标准与ERC-20完全兼容，示例可参考[这里](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20).

### 查看

可以通过PlatON[浏览器](https://scan.platon.network/tokens/tokensTranfer/prc20)查看，也可以通过[ATON](https://devdocs.platon.network/docs/zh-CN/ATON-user-manual/)查看PRC-20合约交易。

### 合约发行

最好以truffle工具为例：

- 编译说明

- 部署说明

### 调用方法

----------------------------
请刘星补充
---------------------------
