---
id: Solidity_Contract_Migrate
title: Migration tutorial
sidebar_label: Migration tutorial
---



### Introduction

The highest solidity version number supported by PlatON is (0.4.26 0.5.17 0.6.12 0.7.6 0.8.6). If you migrate contracts of other versions, you need to modify it to the corresponding version number and adjust the related syntax.

If you want to migrate Ethereum's smart contract to PlatON, you can do this with the `platon-truffle` development tool. First, to make sure have `platon-truffle` installed correctly, just follow these steps.

The migration of Ethereum's ERC200513Token contract to PlatON is demonstrated below, `ERC200513Token.sol` contract are as follows:
```
pragma solidity 0.5.13;

contract ERC200513Token {
    string public name; 
    string public symbol; 
    uint8 public decimals = 18;  //18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply = 10000000000000000000 ether; 

    // This creates an array with all balances
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    //This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This notifies clients about the amount burnt
    event Burn(address indexed from, uint256 value);

    /**
     * Constructor function
     */
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals); // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply; // Give the creator all initial tokens
        name = tokenName; // Set the name for display purposes    
        symbol = tokenSymbol; 
    }
    /**
     * get the name for display purposes
     */
    function getName() view public returns (string memory){
        return name;
    }

    /**
     * get token symbol
     */
    function getSymbol() view public returns (string memory){
        return symbol;
    }
 
    function getDecimals() public view returns (uint8){
        return decimals;
    }

    function getTotalSupply() public view returns (uint256 theTotalSupply) {
        theTotalSupply = totalSupply;
        return theTotalSupply;
    }

    function getBalanceOf(address _owner) public view returns (uint256 balance) {
        //get _owner's balance
        return balanceOf[_owner];
    }
    /**
     * Transfer tokens from other address
     */
    function _transfer(address _from, address _to, uint _value) internal returns (bool success){
        // Make sure the destination address is not 0x0, Because address 0x0 represents destruction
        require(_to != address(uint160(0)));
        // Check the sender balance
        require(balanceOf[_from] >= _value);
        // Make sure _value>0
        require(balanceOf[_to] + _value > balanceOf[_to]);

        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);

        return (balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     *  Transfer tokens from other address
	 *
     *  Send `_value` tokens to `_to` on behalf of `_from`
	 *
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transfer(address _to, uint256 _value) public returns (bool success){
        return _transfer(msg.sender, _to, _value);
    }

    /**
     * Transfer tokens from other address
     *
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);
        // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf
     * 
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    function approve(address _spender, uint256 _value) public
    returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }


    /**
     *
     * Gets the remaining number of tokens that _spender can issue from account _owner
     */
    function getAllowance(address _owner, address _spender) public view returns (uint remaining){
        return allowance[_owner][_spender];
    }

    /**
	 * Destroy tokens
	 *
     * Remove `_value` tokens from the system irreversibly
     *
     */
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        // Check if the sender has enough
        balanceOf[msg.sender] -= _value;
        // Subtract from the sender
        totalSupply -= _value;
        // Updates totalSupply
        emit Burn(msg.sender, _value);
        return true;
    }

    /**
     * Destroy tokens from other account
     *
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);
        // Check allowance
        balanceOf[_from] -= _value;
        // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;
        // Subtract from the sender's allowance
        totalSupply -= _value;
        // Update totalSupply
        emit Burn(_from, _value);
        return true;
    }
}
```

### Operation Procedure

**Step1.** Create new directory for example project

```
mkdir example && cd example
```

> After the command is executed,project directory structure is as follows:

**Step2.**  Init project

```
platon-truffle init
```

After the command is executed,project directory structure is as follows:

- `contracts/`: solidity contract directory

- `migrations/`: depoly file directory

- `test/`: test script directory

- `truffle-config.js`: platon-truffle config

**Step3.** Move ERC200513Token contract compiled in to example/contracts

```
ls contracts/
```

- ERC200513Token.sol
- PlatON's smart contract unit is LAT, VON. To migrate the Ethereum smart contract to PlatON,please change the Ethereum denomination to PlatON denomination.also note the ether /LAT market rate（for this contract, we assume the market exchange rate1:1,uint256 public totalSupply = 10000000000000000000 ether; change to uint256 public totalSupply = 10000000000000000000 LAT;）
- PlatON's smart contract block.timestamp is current block timestamp as milliseconds since unix epoch, and Ethereum smart contract is seconds.

**Step4.** Modify the compilation version number and chain-dependent configuration in truffle-config.js

```
module.exports = {
  networks: {
     development: {
      host: "10.1.1.6",     // chain address
      port: 8806,            // chain rpc port
      network_id: "*",       // Any network (default: none)
      from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc", // the wallet address of deployment contract 
      gas: 999999,
      gasPrice: 50000000004,	     
     },
  },

  compilers: {
    solc: {
       version: "0.5.13",    // the version number used in compiling the contract is the same as the contract definition
       docker: false,        // Use "0.5.1" you've installed locally with docker
    }
  }
}
```

**Step5.** Compile contract

```
platon-truffle compile
```
The following is the output of the successful compilation：
```
Compiling your contracts...
Compiling ./contracts/ERC200513Token.sol
Compiling ./contracts/Migrations.sol
  compilation warnings encountered:

Warning: This is a pre-release compiler version, please do not use it in production.
Artifacts written to /home/guest/example/build/contracts
Compiled successfully using: 
  solc: 0.5.13-develop.2020.1.2+commit.9ff23752.mod.Emscripten.clang
```

**Step6.** Create deploy script

```
cd migrations && touch 2_initial_ERC200513Token.js
```

Deploy script 2_initial_ERC200513Token.js content is as follows：
```
const ERC200513Token = artifacts.require("ERC200513Token"); //contract class name
module.exports = function(deployer) {
  deployer.deploy(ERC200513Token,100,'PLA','PLAT'); //ERC200513Token abstract and constructor params
};  
```

**Step7.** Deploy contract

```
platon-truffle migrate
```

After deploying successfully, you will see log info as follows:

```
Compiling your contracts...
Everything is up to date, there is nothing to compile.
2_initial_ERC200513Token.js
   Deploying 'ERC200513Token'
     transaction hash:    0xa1770aecf4cffb0e75a172e06e75a9e9cb2d36bf89291b57d504e8c054985e99
     Blocks: 0            Seconds: 0
     contract address:    lat1uetshtp4tp6l067tl02e4x435py9ajrfdhsrd4//new contract address
     block number:        265657
     block timestamp:     1581742216965
     account:             lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc
     balance:             90000000.826385379994114416
     gas used:            638876
     gas price:           50.000000004 gVON
     value sent:          0 LAT
     total cost:          0.031943800002555504 LAT
     Saving migration to chain.
     Saving artifacts
     Total cost:     0.031943800002555504 LAT
Summary
 Total deployments:   2
 Final cost:          0.037844150003027532 LAT
```
---------
