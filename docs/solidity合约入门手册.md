---
id: Solidity_Dev_Manual
title: Getting started
sidebar_label: Getting started
---



### Introduction

This tutorial is mainly to guide users to create a simple HelloWorld smart contract using solidity language on PlatON, compile, deploy, and call this contract through platon-truffle. If you want to use a richer API you can refer to [Java SDK](/docs/en/Java_SDK) and  [JS SDK](/docs/en/JS_SDK).

### Platon-truffle Introduction

Platon-truffle is a tool provided by PlatON that can compile, deploy, and invoke smart contracts locally. For specific installation and usage manuals, refer to:

- Platon-truffle develop tools [specific installation](https://platon-truffle.readthedocs.io/en/v1.1.1/getting-started/installation.html)
- Platon-truffle develop tools [usage manuals](https://platon-truffle.readthedocs.io/en/v1.1.1/)

### Create HelloWorld Contract

```
pragma solidity ^0.5.17;

contract HelloWorld {
    
    string name;
    
    function setName(string memory _name) public returns(string memory){
        name = _name;
        return name;
    }
    
    function getName() public view returns(string memory){
        return name;
    }
}
```

Contract Files Description:

- pragma solidity ^0.5.17
    -	`pragma solidity`: solidity version description
         `0.5.17`：solidity version
         `^` ：Indicates upward compatibility, that is, it can be compiled with a compiler above 0.5.17
- contract HelloWorld
    -	`contract`：contract keyword
         `HelloWorld`：contract name
- string name
    -	`name`：contract state variables
         `string`：the type of contract state variables
- function setName(string memory _name) public returns(string memory)
    -	`function`：function keyword
         `setName`：function name
         `memory`：declare the storage location of param name（ function input parameters and output parameters  must be declared as memory when the parameters type is string）
         `_name`：the  local variables
         `public`：declare the visibility of the function
         `name` = _name：Assignment the local variable to state variable
- function getName() public view returns(string memory)
    -	`view`: this keyword means the function cannot change the blockchain state, which mainly used for query

### Compile HelloWorld Contract

**Step1.**  Creat new directory for HelloWorld project

```
mkdir HelloWorld && cd HelloWorld
```

**Step2.**  Init project

```
platon-truffle init
```
After the command is executed, project directory structure is as follows:

- `Contracts/`: solidity contract directory

- `Migrations/`:  depoly file directory

- `Test/`: test script directory

- `Truffle-config.js`: platon-truffle config

**Step3.**  Move HelloWorld contract compiled in to HelloWorld/contracts/

```
ls contracts/
```
- HelloWorld.sol

**Step4.**  Fix compile version same as the version setted  in truffle-config.js

```
vim truffle-config.js
```

Truffle-config.js content is  as follows:
```
compilers: {
      solc: {
            version: "^0.5.17",    // same as the version declared in HelloWorld.sol
      }
}
```

**Step5.**  Compile contract

```
platon-truffle compile
```
After the command is executed, project directory structure is as follows:

- `Build/`: solidity contract directory after compiled

- `Build/contracts/HelloWorld.json`:the compiled file corresponding with HelloWorld.sol


### Deploly HelloWorld Contract

**Step1.** Create deploy script

```
cd migrations/ && touch 2_initial_helloworld.js
```
Suggest replacing script  name  with contract name, for example the deploy script  of HelloWorld contract :2_initial_helloworld.js,content is as follows：
```
const helloWorld = artifacts.require("HelloWorld"); //artifacts.require specify deployment contract
	module.exports = function(deployer) {
       deployer.deploy(helloWorld); //Failed to deploy contract with parameters, please refer to FAQ
};
```

**Step2.** Setting config  information for blockchain in truffle-config.js

```
vim truffle-config.js
```
Set blockchain network info
```
networks: {
	development: {
       host: "10.1.1.6",     // blockchain server address
       port: 8806,            // server port
       network_id: "*",       // Any network (default: none)
       from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc", //the accout address of deploying contract
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step3.**  Unlock wallet account

Enter the platon-truffle console

```
platon-truffle console
```

Import the private key (you can skip this step if you have already imported it)
```
web3.platon.personal.importRawKey("Your wallet private key","Your wallet password");
```
After importing successfully, you will see the address corresponding to the private key as follows：
```
'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'
```

Unlock wallet account
```
 web3.platon.personal.unlockAccount('Your wallet address','Your wallet password',999999);
```
After unlocking successfully, you will see the following information：
```
ture
```

**Step4.**  Deploy contract

```
platon-truffle migrate
```

After deploying successfully, you will see log info as follows:
```
2_initial_helloworld.js
======================

   Deploying 'HelloWorld'
   ----------------------
   > transaction hash:    0x87cd48cc467f9bc943fd096c57c8a7e7b7fa941380538d9e59797800c6c4292c
   > Blocks: 0            Seconds: 0
   > contract address:    lat17rcz8c3uwaf3ktf0e0d8q0jw4k3dm8z22eer96
   > block number:        282520
   > block timestamp:     1585535169200
   > account:             lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc
   > balance:             16447231233352977496646259638377769924557918764752765436645.336513079692286014
   > gas used:            145569
   > gas price:           50.000000004 gvon
   > value sent:          0 LAT
   > total cost:          0.000145569 LAT


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.000145569 LAT

Summary
=======
> Total deployments:   2
> Final cost:          0.000259892 LAT
```

### Call HelloWorld Contract

**Step1.**  Enter the platon-truffle console

```
platon-truffle console
```
- You can execute command in platon-truffle console

**Step2.**  Create contract object

```json
var abi = [{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"setName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]; //you can refet to HelloWorld/build/contracts/HelloWorld.json

var contractAddr = 'lat17rcz8c3uwaf3ktf0e0d8q0jw4k3dm8z22eer96';//contract address
var helloWorld = new web3.platon.Contract(abi,contractAddr);  
```

Description：

- `abi` the interface provided by the contract to external calls, the abi  in the file compiled ：`HelloWorld/build/contracts/HelloWorld.json`
- `contractAddr` contract address
- `helloWorld`  contract object created

**Step3.**  Call contract

```javascript
helloWorld.methods.setName("hello world").send({from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);

```

Description：

- `helloWorld` the contract object created
- `methods`  specify the call method
- `setName` the function of the HelloWorld contract, which has a parameter as `hello world`
- `from` the address of caller
- `on` listen to the result of the contract method executed. If failed, it will print the error info. If succeeds ,the console will print the receipt as belows:

```
{ 
  blockHash:'0x3ae287d1e745e30d0d6c95d5220cc7816cda955e7b2f013c6a531ed95028a794', //the hash of block the transaction located
  blockNumber: 159726, 
  contractAddress: null,
  cumulativeGasUsed: 44820,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc', //the address of caller
  gasUsed: 44820, //gas cost
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat17rcz8c3uwaf3ktf0e0d8q0jw4k3dm8z22eer96', //contract address
  transactionHash:'0xb7a41f72d555d4a2d9f2954fbdc5bbbb4c5ce89c836f8704276419ed416b3866', 
  transactionIndex: 0,
  events: {} 
}
```

**Step4.**  Query contract

```javascript
helloWorld.methods.getName().call(null,function(error,result){console.log("name is:" + result);})  
```
Description：

- `helloWorld` the contract object created
- `methods` specify the call method
- `getName` the function of the HelloWorld contract, which has no  parameter
- `call` specify query method
- `function` callback result,we can use console.log to print info.

------------------

## Crowdfunding Contract

### Introduction

In the following example, we will use smart contract for a crowdfunding campaign. The creator of the contract started crowdfunding, and initialized the number of tokens and the duration of the crowdfunding. If the crowdfunding is completed within a specified time, the crowdfunding will be successful. If the crowdfunding switch is turned off, a certain number of tokens based on a fixed exchange rate will be cast and credited to the name of the investor. Otherwise, the crowdfunding fails and the amount of the crowdfunding is returned to the investors.

There are two roles in the contract

- Crowdfunder
- Investor

### Crowdfunding Process

1. Creating a crowdfunding contract refers to the beneficiary.
2. Deployment crowdfunding contract initializes the number and duration of crowdfunding tokens.
3. Investors invest.
4. Determine if crowdfunding is over.
    - If the crowdfunding time is not up and the number of crowdfunding tokens has been completed, turn off the crowdfunding switch, investors will be allocated tokens in proportion. Crowdfunding success.
    - If the crowdfunding time is up and the amount of crowdfunding tokens has been completed, investors will be allocated tokens in proportion. Crowdfunding success.
    - If the crowdfunding time is up and the number of crowdfunding tokens is not completed, the investor tokens will be returned. Crowdfunding failure.

### Crowdfunding Contract

```
pragma solidity ^0.5.17;

contract CrowdFunding {
    address payable public beneficiaryAddress = address(uint160(0)); //Beneficiary address, set as contract creator
    uint256 public fundingGoal = 100 lat;  //Crowdfunding target, unit is lat
    uint256 public amountRaised = 0; //The amount of money raised,the unit is von
    uint256 public deadline; 
    uint256 public price;  //token price
    bool public fundingGoalReached = false;  //Achieving crowdfunding goals flag
    bool public crowdsaleClosed = false; //Crowdfunding closed

    mapping(address => uint256) public balance; //Save the amount raised by the investor
    
    mapping(address => uint256) public tokenMap; //Save the number of tokens owned by the investor

    //Record received LAT notifications
    event GoalReached(address _beneficiaryAddress, uint _amountRaised);

    //Transfer notice
    event FundTransfer(address _backer, uint _amount, bool _isContribution);
    
    //Check if the address is empty
    modifier validAddress(address _address) {
        require(_address != address(uint160(0)));
        _;
    }

    /**
     * Initialization constructor
     *
     * @param _fundingGoalInlats: Total crowdfunding LAT coin
     * @param _durationInMinutes: Crowdfunding deadline, unit is minute
     */
    constructor (
        uint _fundingGoalInlats,
        uint _durationInMinutes
    )public {
	    beneficiaryAddress = msg.sender;
        fundingGoal = _fundingGoalInlats * 1 lat;
        deadline = now + _durationInMinutes * 1 minutes;
        price = 500 finney; //buy 2 tokens with 1 LAT
    }


    /**
     * fallback functioin
     *
     * you can send money directly to the contract
     */
    function () payable external {

        //check whether to close crowdfunding
        require(!crowdsaleClosed);
        uint amount = msg.value;

        //investor amount accumulated
        balance[msg.sender] += amount;

        //Total invest accumulated
        amountRaised += amount;

        //Transfer operation, how many tokens are transferred to the investor
        tokenMap[msg.sender]  += amount / price;
        
        emit FundTransfer(msg.sender, amount, true);
    }

    /**
     * Determine if the crowdfunding deadline has passed
     */
    modifier afterDeadline() { if (now >= deadline) _; }

    /**
     * Check if the crowdfunding goal has been reached
     */
    function checkGoalReached() public afterDeadline payable{
        if (amountRaised >= fundingGoal){
            //crowdfunding goal has been reached
            fundingGoalReached = true;
            emit GoalReached(beneficiaryAddress, amountRaised);
        }

        //Closing crowdfunding
        crowdsaleClosed = true;
    }


    /**
     * Recover funds
     *
	 * Check if the target or time limit has been reached, and if so, send the full amount to the beneficiary.
     * If the goal is not reached, each investor can return the amount they invested
     */
    function safeWithdrawal() public afterDeadline {

        //If the crowdfunding goal is not reached
        if (!fundingGoalReached) {
            //Get the contracted caller's donated balance
            uint amount = balance[msg.sender];

            if (amount > 0) {
                //Returns all balances of the contract initiator
                msg.sender.transfer(amount);
                emit FundTransfer(msg.sender, amount, false);
                balance[msg.sender] = 0;
            }
        }

        //f the crowdfunding goal is achieved and the contract caller is the beneficiary
        if (fundingGoalReached && beneficiaryAddress == msg.sender) {

            //Give all donations from the contract to the beneficiary
            beneficiaryAddress.transfer(amountRaised);
            
            emit FundTransfer(beneficiaryAddress, amountRaised, false);
        }
    }
}
```

**Compile Crowdfunding Contract**

**Step1.** Create new directory for Crowdfunding project

```
mkdir myCrowdFunding && cd myCrowdFunding
```

> The following commands are performed in the myCrowdFunding directory without special instructions.

**Step2.** Init project

```
platon-truffle init
```

After the command is executed, project directory structure is as follows:

- `contracts/`: solidity contract directory
- `migrations/`: depoly file directory
- `test/`: test script directory
- `truffle-config.js`: platon-truffle config

**Step3.** Move crowdfunding contract compiled in to `myCrowdFunding/contracts/`

```
ls myCrowdFunding/contracts/
```
> Files in the directory: `crowdFunding.sol`.

**Step4.** Fix compile version same as the version setted  in truffle-config.js

```
vim truffle-config.js
```

Truffle-config.js content is  as follows:
```
compilers: {
     solc: {
        version: "0.5.17",    //same as the version declared in CrowdFunding.sol
    }
}
```

**Step5.** Compile contract

```
platon-truffle compile
```

After the command is executed, project directory structure is as follows:

- `build/`: solidity contract directory after compiled
- `build/contracts/CrowdFunding.json`: the compiled file corresponding with CrowdFunding.sol

**Deploly crowdfunding Contract**

**Step1.** Create deploy script

```
cd migrations/ && touch 2_initial_CrowdFunding.js
```

Deploy script 2_initial_crowdFunding.js,content is as follows：

```
const CrowdFunding = artifacts.require("CrowdFunding"); //deployment contract class name
module.exports = function(deployer) {
      deployer.deploy(CrowdFunding);
};
```

**Step2.** Setting config  information for blockchain in truffle-config.js

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
       from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc", //the accout address of deploying contract
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**Step3.** Deploy contract

```
platon-truffle migrate
```

After deploying successfully, you will see log info as follows:
```
Compiling your contracts...
 Everything is up to date, there is nothing to compile.
 3_initial_CrowdFunding.js
 
    Deploying 'CrowdFunding'
     transaction hash:    0x3a6419cd4169d7cfb430a1fc5632239ac4a01845827f20df9b3229a334c5488b
     Blocks: 0            Seconds: 0
     contract address:    lat1qtgycm7jkrq8csa2rgef6enlru0u02g8u82kpt //contract address
     block number:        280532
     block timestamp:     1581751224032
     account:             lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc
     balance:             90000000.806077629992489796
     gas used:            379154
     gas price:           50.000000004 gVON
     value sent:          0 LAT
     total cost:          0.018957700001516616 LAT
 
     Saving migration to chain.
     Saving artifacts
     Total cost:     0.018957700001516616 LAT
```


**Crowdfounding Query：**

**Step1.**  Enter the platon-truffle console

```
platon-truffle console
```

> You can execute command in platon-truffle console

**Step2.**  Create contract object

```
var abi = [...]; //ABI of CrowdFunding contract,can get from build/contracts/CrowdFunding.json
var contractAddr = 'lat1qtgycm7jkrq8csa2rgef6enlru0u02g8u82kpt'; //CrowdFundsing contract address
var crowdFunding = new web3.platon.Contract(abi,contractAddr);
```

**Step3.**  Query the amount raised

```
crowdFunding.methods.amountRaised().call(null,function(error,result){console.log("result:" + result);}); //query the amount raised
```

**Step4.**  Crowdfunder judge the success of crowdfunding

```
crowdFunding.methods.safeWithdrawal().send({from:'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'}).on('data', function(event){ console.log(event);}).on('error', console.error); 
```

Call contract command description:

- `crowdFunding` is the contract object we built earlier
- `methods` fixed syntax specifying that methods in the contract will be obtained
- `safeWithdrawal` is a method in our crowdfunding contract to recover funds
- `from` caller's wallet address
- `on` listen for contract processing result events, and output error logs for failures

--------------

## FAQ

### About Compile

1. How many commands in platon-truffle？

   Refer to  platon-truffle develop guide [Reference here](https://platon-truffle.readthedocs.io/en/v0.11.1/).

2. Why contract syntax cannot be verified?

   Solidity 0.4.x has a great different with 0.5.x, detail info refer to [Reference here](https://solidity.readthedocs.io/en/develop/).

3. Why truffle doesn't compile?

   Confirm the contract version same as the version specified in the truffle-config.js.
   Contract syntax be writed in a wrong way.

4. Why the contract can not be deployed by truffle migrate?

   Confrim the blockchain network info be configured correctly.
   Confirm the account address be configured correctly.

5. Deploying a contract with a parameter constructor using the command `truffle migrate` failed.

   For example, A.sol
    ```
    Constructor(uint256 a, string memory b, string memory c) public {}
    ```
   2_initial_A.js configured as follow：
    ```
    const A = artifacts.require("A");  
    module.exports = function(deployer) {
            deployer.deploy(A,100,'PLA','PLAT');//pass the corresponding construction parameters
    };
    ```
