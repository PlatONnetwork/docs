---
id: Solidity_Dev_Manual
title: 入门手册
sidebar_label: 入门手册
---



## 入门手册

### 简介

本教程主要是指导用户在PlatON上使用solidity语言创建简单的HelloWorld智能合约，通过platon-truffle编译，部署，调用此合约。如果您想使用更加丰富的API可以参考[Java SDK开发指南](/docs/zh-CN/Java_SDK) 或者 [JS SDK开发指南](/docs/zh-CN/JS_SDK)

- solidity智能合约语法请参考[Solidity官方文档](https://solidity.readthedocs.io/en/develop/)
- 在开发合约前，如果需要搭建节点连接到PlatON网络或者创建私有网络请参考：[连接 PlatON 网络](/docs/zh-CN/Join_PlatON_NetWork)

### platon-truffle开发工具介绍

platon-truffle是PlatON提供的一款能够在本地编译、部署、调用智能合约的工具，具体的安装及使用手册参见

- platon-truffle开发工具[安装参考](https://platon-truffle.readthedocs.io/en/v1.1.1/getting-started/installation.html)
- platon-truffle开发工具[使用手册](https://platon-truffle.readthedocs.io/en/v1.1.1/)


### 创建HelloWorld合约

```solidity
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

合约文件说明

- pragma solidity ^0.5.17
    -	pragma solidity：是solidity版本声明
         0.5.17：代表solidity版本
         ^ ：表示向上兼容,即可以用0.5.17以上版本编译器进行编译
- contract HelloWorld
    -	contract：合约声明的关键字
         HelloWorld：当前合约的名称
- string name
    -	name：合约的状态变量
         string：指明此状态变量的类型
- function setName(string memory _name) public returns(string memory)
    -	function：合约中函数声明关键字
         setName：此函数的名称
         memory：声明_name参数的存储位置（字符串类型的函数输入参数与输出参数必须声明为memory）
         _name：为此函数的局部变量
         public：声明此函数的可见性
         name = _name：此操作将外部传进来的局部变量赋值给状态变量
- function getName() public view returns(string memory)
    -	view:如果一个函数带有view关键字，此函数将不会改变合约中状态变量的值（主要用于查询）


### 编译HelloWorld合约

**step1.** 为HelloWorld项目创建新目录

```
mkdir HelloWorld && cd HelloWorld
```
- 以下命令如果没有特殊说明都在HelloWorld目录下进行

**step2.** 使用platon-truffle初始化一个工程

```
platon-truffle init
```
在操作完成之后，就有如下项目结构：

- contracts/: Solidity合约目录

- migrations/: 部署脚本文件目录

- test/: 测试脚本目录

- truffle-config.js: platon-truffle 配置文件

**step3.** 将之前编写好的HelloWorld合约放至HelloWorld/contracts/目录下
```
ls contracts/
```
- 将看到HelloWorld.sol

**step4.** 修改platon-truffle 配置文件truffle-config.js，将编译器版本修改对应的solidity合约中的版本号

```
vim truffle-config.js
```

truffle-config.js 修改部分内容如下：
```
compilers: {
      solc: {
            version: "^0.5.17",    // 此版本号与HelloWorld.sol中声明的版本号保持一致
      }
}
```

**step5.** 编译合约

```
platon-truffle compile
```
在操作完成之后，生成如下目录结构：

- build/: Solidity合约编译后的目录

- build/contracts/HelloWorld.json  HelloWorld.sol对应的编译文件

### 部署HelloWorld合约

**step1.** 新增合约部署脚本文件

```
cd migrations/ && touch 2_initial_helloworld.js
```
部署脚本文件名建议使用合约名称便于后面维护,如HelloWorld合约对应的部署脚本文件为2_initial_helloworld.js，内容如下所示：
```
const helloWorld = artifacts.require("HelloWorld"); //artifacts.require告诉platon-truffle需要部署哪个合约，HelloWorld即之前写的合约类名
	module.exports = function(deployer) {
       deployer.deploy(helloWorld); //helloWorld即之前定义的合约抽象（部署带参数的合约失败，请参考FAQ部署带参数合约失败说明）
};
```
**step2.** 修改truffle-config.js中链的配置信息

```
vim truffle-config.js
```
将truffle-config.js中的区块链相关配置修改成您真实连接的链配置
```
networks: {
	development: {
       host: "10.1.1.6",     // 区块链所在服务器主机
       port: 8806,            // 链端口号
       network_id: "*",       // Any network (default: none)
       from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc", //部署合约账号的钱包地址
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step3.**  解锁钱包账户

进入platon-truffle控制台
```
platon-truffle console
```

导入私钥（如果之前已导入可以跳过此步骤）
```
web3.platon.personal.importRawKey("您的钱包私钥","您的钱包密码");
```
导入成功将看到私钥对应的地址：
```
'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'
```

解锁钱包账户
```
 web3.platon.personal.unlockAccount('您的钱包地址','您的钱包密码',999999);
```
解锁成功将看到如下信息：
```
ture
```

**step4.**  部署合约

```
platon-truffle migrate
```

部署成功后，将看到类似如下信息：
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

### 调用HelloWorld合约

**step1.**  进入platon-truffle控制台

```
platon-truffle console
```
- 以下调用查询将在truffle控制台中进行

**step2.**  构建合约对象

```json
var abi = [{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"setName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]; //可以从HelloWorld/build/contracts/HelloWorld.json文件中获取到

var contractAddr = 'lat17rcz8c3uwaf3ktf0e0d8q0jw4k3dm8z22eer96';//部署合约时的获取的地址
var helloWorld = new web3.platon.Contract(abi,contractAddr); 
```

说明：
- `abi` 是合约提供给外部调用时的接口，每个合约对应的abi在编译后的文件中，如：`HelloWorld/build/contracts/HelloWorld.json` 中可以找到
- `contractAddr` 在部署合约成功后有一个contract address
- `helloWorld` 就是构建出来与链上合约交互的合约对象抽象

**step3.**  调用合约

```javascript
helloWorld.methods.setName("hello world").send({from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);
 
```

调用合约命令说明：
- `helloWorld` 是之前构建的合约对象
- `methods` 固定语法,指量后面紧跟合约的方法名
- `setName` 是我们HelloWorld合约中的一个方法，有一个String类型的入参，此处入参为`hello world`
- `from` 调用者的钱包地址
- `on` 是监听合约处理结果事件，此处如果成功将打印回执，失败输出错误日志

函数调用成功，将会看到如下信息：

```
{ blockHash:
  '0xe592a4f203ed058df7515205717f167848b1a56b8bb143f9eba512facae22aa1',
  blockNumber: 283911,
  contractAddress: null,
  cumulativeGasUsed: 44820,
  from: 'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc',
  gasUsed: 44820,
  logsBloom:
'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'lat17rcz8c3uwaf3ktf0e0d8q0jw4k3dm8z22eer96',//交易调用的合约地址
  transactionHash:
   '0x2b381a8efab4774ae029fdf2e2585b48c03c033c64d543c9c606c925689fca31',//交易hash
  transactionIndex: 0,
  events: {} }
```

**step4.**  合约查询

```javascript
helloWorld.methods.getName().call(null,function(error,result){console.log("name is:" + result);})  
```
查询合约命令说明：

- `helloWorld` 是之前构建的合约对象
- `methods` 指定将获取合约中的方法
- `getName` 是我们HelloWorld合约中的一个方法，该方法没有入参，故入参为空
- `call` 指明是查询方法
- `function` 是一个回调函数，将处理调用后的结果，此处我们通过console.log打印出执行结果

------------------

## 众筹合约

### 简介

​        在下面的例子中，我们将使用合约进行一次众筹。合约创建者发起众筹，并初始化众筹的代币数量及众筹持续的时间。如果在指定时间内众筹完成则此次众筹成功。并关闭众筹开关，根据一个固定兑换比率得到的一定数量的token会被铸造出来，并且会被计入在买方名下。否则众筹失败，把众筹的金额返还给投资者。

在合约中设置了两个角色

- 众筹者
- 投资者

### 众筹的流程

1. 创建众筹合约指受益人
2. 部署合约初始化众筹代币数量及持续时间
3. 投资者进行投资
4. 判断众筹是否结束
    - 如果众筹时间未到，众筹代币数量已完成，关闭众筹开关。给投资者按比例分配token。众筹成功
    - 如果众筹时间已到，众筹代币数量已完成，给投资者按比例分配token。众筹成功
    - 如果众筹时间已到，众筹代币数量未完成，返还投资者代币。众筹失败

### 众筹合约

```
pragma solidity ^0.5.17;

contract CrowdFunding {
    address payable public beneficiaryAddress = address(uint160(0)); //受益人地址，设置为合约创建者
    uint256 public fundingGoal = 100 lat;  //众筹目标，单位是lat
    uint256 public amountRaised = 0; //已筹集金额数量， 单位是von
    uint256 public deadline; //截止时间
    uint256 public price;  //代币价格
    bool public fundingGoalReached = false;  //达成众筹目标
    bool public crowdsaleClosed = false; //众筹关闭

    mapping(address => uint256) public balance; //保存众筹者对捐赈的金额
    
    mapping(address => uint256) public tokenMap; //保存众筹者所拥有的代币数量

    //记录已接收的LAT通知
    event GoalReached(address _beneficiaryAddress, uint _amountRaised);

    //转帐通知
    event FundTransfer(address _backer, uint _amount, bool _isContribution);
    
    //校验地址是否为空
    modifier validAddress(address _address) {
        require(_address != address(uint160(0)));
        _;
    }

    /**
     * 初始化构造函数
     *
     * @param _fundingGoalInlats 众筹LAT币总量
     * @param _durationInMinutes 众筹截止,单位是分钟
     */
    constructor (
        uint _fundingGoalInlats,
        uint _durationInMinutes
    )public {
	    beneficiaryAddress = msg.sender;
        fundingGoal = _fundingGoalInlats * 1 lat;
        deadline = now + _durationInMinutes * 1 minutes;
        price = 500 finney; //1个LAT币可以买 2 个代币
    }


    /**
     * 默认函数
     *
     * 默认函数，可以向合约直接打款
     */
    function () payable external {

        //判断是否关闭众筹
        require(!crowdsaleClosed);
        uint amount = msg.value;

        //捐款人的金额累加
        balance[msg.sender] += amount;

        //捐款总额累加
        amountRaised += amount;

        //转帐操作，转多少代币给捐款人
        tokenMap[msg.sender]  += amount / price;
        
        emit FundTransfer(msg.sender, amount, true);
    }

    /**
     * 判断是否已经过了众筹截止限期
     */
    modifier afterDeadline() { if (now >= deadline) _; }

    /**
     * 检测众筹目标是否已经达到
     */
    function checkGoalReached() public afterDeadline payable{
        if (amountRaised >= fundingGoal){
            //达成众筹目标
            fundingGoalReached = true;
            emit GoalReached(beneficiaryAddress, amountRaised);
        }

        //关闭众筹
        crowdsaleClosed = true;
    }


    /**
     * 收回资金
     *
     * 检查是否达到了目标或时间限制，如果有，并且达到了资金目标，
     * 将全部金额发送给受益人。如果没有达到目标，每个贡献者都可以退回
     * 他们贡献的金额
     */
    function safeWithdrawal() public afterDeadline {

        //如果没有达成众筹目标
        if (!fundingGoalReached) {
            //获取合约调用者已捐款余额
            uint amount = balance[msg.sender];

            if (amount > 0) {
                //返回合约发起者所有余额
                msg.sender.transfer(amount);
                emit FundTransfer(msg.sender, amount, false);
                balance[msg.sender] = 0;
            }
        }

        //如果达成众筹目标，并且合约调用者是受益人
        if (fundingGoalReached && beneficiaryAddress == msg.sender) {

            //将所有捐款从合约中给受益人
            beneficiaryAddress.transfer(amountRaised);
            
            emit FundTransfer(beneficiaryAddress, amountRaised, false);
        }
    }
}
```

**编译众筹合约：**

**step1.** 为众筹合约创建新目录

```
mkdir myCrowdFunding && cd myCrowdFunding
```
- 以下命令如果没有特殊说明都在myCrowdFunding目录下进行

**step2.** 使用platon-truffle初始化一个工程

```
platon-truffle init
```

在操作完成之后，就有这样的一个项目结构：

- contracts/: Solidity合约目录
- migrations/: 部署脚本文件目录
- test/: 测试脚本目录
- truffle-config.js: platon-truffle 配置文件

**step3.** 将编写好的众筹合约放至myCrowdFunding/contracts/目录下

```
ls myCrowdFunding/contracts/
```
- 将看到 CrowdFunding.sol

**step4.** 修改platon-truffle 配置文件truffle-config.js，将编译器版本修改对应的solidity合约中的版本号

```
vim truffle-config.js
```

truffle-config.js 修改部分内容如下
```
compilers: {
     solc: {
        version: "0.5.17",    // 此版本号与CrowdFunding.sol中声明的版本号保持一致
    }
}
```

**step5.** 编译合约

```
platon-truffle compile
```

在操作完成之后，就有这样的一个目录结构：

- build/: Solidity合约编译后的目录
- build/contracts/CrowdFunding.json CrowdFunding.sol对应的编译文件

**部署众筹合约：**

**step1.** 添加部署脚本文件

```
cd migrations/ && touch 2_initial_CrowdFunding.js
```

部署脚本文件为:2_initial_crowdFunding.js，内容如下所示：

```
const CrowdFunding = artifacts.require("CrowdFunding"); //需要部署的合约名称 
module.exports = function(deployer) {
      deployer.deploy(CrowdFunding);
};
```

**step2.** 修改truffle-config.js中链的配置信息

```
vim truffle-config.js
```

将truffle-config.js中的区块链相关配置修改成您真实连接的链配置

```
networks: {
	development: {
       host: "10.1.1.6",     // 区块链所在服务器主机
       port: 8806,            // 链端口号
       network_id: "*",       // Any network (default: none)
       from: "lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc", //部署合约账号的钱包地址
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step3.**  部署合约

```
platon-truffle migrate
```

部署成功将输出如下信息：
```
Compiling your contracts...
 Everything is up to date, there is nothing to compile.
 3_initial_CrowdFunding.js
 
    Deploying 'CrowdFunding'
     transaction hash:    0x3a6419cd4169d7cfb430a1fc5632239ac4a01845827f20df9b3229a334c5488b
     Blocks: 0            Seconds: 0
     contract address:    lat1qtgycm7jkrq8csa2rgef6enlru0u02g8u82kpt //部署后的合约地址
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


**众筹者查询众筹情况：**

**step1.**  进入platon-truffle控制台

```
platon-truffle console
```
- 以下调用查询将在truffle控制台中进行

**step2.**  构建的众筹合约对象
```
var abi = [...]; //众筹合约的ABI，从编译后的文件获取
var contractAddr = 'lat1qtgycm7jkrq8csa2rgef6enlru0u02g8u82kpt'; //众筹合约地址
var crowdFunding = new web3.platon.Contract(abi,contractAddr);  
```

**step3.**  查询已筹集金额
```
crowdFunding.methods.amountRaised().call(null,function(error,result){console.log("result:" + result);}); //查询已筹集金额
```

**step4.**  众筹者判断众筹是否成功
```
crowdFunding.methods.safeWithdrawal().send({from:'lat1wxadw8yzr6qxdw5yl3f2surp6ue6f03e07kcqc'}).on('data', function(event){ console.log(event);}).on('error', console.error); 
```

调用合约命令说明：

- `crowdFunding` 是我们之前构建的合约对象
- `methods` 固定语法，指定将获取合约中的方法
- `safeWithdrawal` 是我们众筹合约中的一个方法，用于收回资金
- `from` 调用者的钱包地址
- `on` 是监听合约处理结果事件，失败输出错误日志

--------------

## FAQ

### 编译相关

1. platon-truffle有哪些命令如何使用？

   platon-truffle开发使用手册[参考这里](https://platon-truffle.readthedocs.io/en/v0.11.1/)。

2. 合约为什么语法校验通不过？

   solidity合约0.4.x版本与0.5.x版本有重大变更，具体语法[参考这里](https://solidity.readthedocs.io/en/develop/)。

3. platon-truffle执行truffle compile 失败?

   1.确认编译的合约文件中的版本号与truffle-config.js中指定的版本号是否一致。
   2.可能语法有误，可以根据命令行提示修复后再进行编译。

4. platon-truffle执行truffle migrate部署合约失败?

1.确认truffle-config.js中连接的链的配置信息及用户的钱包地址是否正确。

5. truffle migrate部署带参数的构造函数合约失败?

以合约A.sol为例，在migrations/2_initial_A.js文件中，确认是否添加构造参数信息如：
A.sol构造函数格式如下：
  ```
  constructor(uint256 a, string memory b, string memory c) public {}
  ```

2_initial_A.js文件配置如下：
  ```
   const A = artifacts.require("A");  
   module.exports = function(deployer) {
        deployer.deploy(A,100,'PLA','PLAT');//需要传入对应构造函数参数
   };   
  ```
