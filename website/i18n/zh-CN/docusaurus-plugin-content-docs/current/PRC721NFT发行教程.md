---
id: qianqian_prc721_tutorial
title: PRC721NFT发行教程
sidebar_label: PRC721NFT发行教程
---

### 前言

浅浅社区有很多业务需要通过NFT进行权益认证，因此浅浅开始着手实践基于PRC721标准的NFT创建。这里重点感谢社区的橙子、Shing、Boney、Bing等技术同学的支持，如果没有他们的帮助，浅浅的探索之路会更加艰难。

好啦，通过本教程，读者可以在 PlatON 开发网络上发布自己的 NFT，但如果要在ATON钱包上进行显示，需向ATON团队提交申请，审核通过即可。

废话就不多说了，我们开始吧。

### 环境配置

仍然是那一台低配置阿里云服务器。

中央处理器：1核2G
硬盘：40GSSD
系统：Ubuntu16.04
远程连接工具：MobaXterm

### 软件准备

远程连接工具：MobaXterm
本地主机IDE：VScode、Notepad++

准备一个PlatON开发网络的账号，并且向[水龙头](https://faucet.platon.network/faucet/)申请测试LAT，我这边的测试账号是 `lat1ex4ue95ap7tjcrxqnfjp8j479nn0927vuug2l7` 

### 编码准备

由于PRC721兼容ERC721，因此本教程编码使用开源的 OpenZeppelin 源码，并从中剥离出我们需要的源文件。具体需要的文件如下图所示：

![image|690x388](https://forum.latticex.foundation/uploads/default/original/2X/2/290291103364aca66ae9f74e98261ef3d8498cda.png) 

我的文件树如下图所示：

![image|257x328](https://forum.latticex.foundation/uploads/default/original/2X/2/2f4f70d875368920a5a15c9efc7ccd18f0b054ec.png) 

然后有些地方需要修改，拿其中的 ERC721Full.sol 作为说明示例，示例请看中文注释，这些编码过程都在本地主机的VScode中完成：

```
pragma solidity 0.5.17; //这里需要修改为PlatON支持的 solidity 版本，例如 0.5.17，0.6.12，0.7.6，0.8.2

/*此处的 import 指令需要做好文件代码的引用路径修改*/
import "./ERC721.sol";
import "./ERC721Enumberable.sol";
import "./ERC721Metadata.sol";

/**
 * @title Full ERC721 Token
 * @dev This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology.
 *
 * See https://eips.ethereum.org/EIPS/eip-721
 */
contract ERC721Full is ERC721, ERC721Enumerable, ERC721Metadata {
    constructor (string memory name, string memory symbol) public ERC721Metadata(name, symbol) {
        // solhint-disable-previous-line no-empty-blocks
    }
}

function awardItem(address recipient, string memory hash, string memory metadata)  
      public  
      returns (uint256){  

      require(hashes[hash] != 1);  
      hashes[hash] = 1;  
     _tokenIds.increment();  
      uint256 newItemId =_tokenIds.current();  
     _mint(recipient, newItemId);  
     _setTokenURI(newItemId, metadata);  
      return newItemId;  

    }  
```

好啦，之后的所有 .sol 文件都请注意这两点，然后依照脑图和文件目录树的布置，我已经把代码准备好了。

现在来写一个实例，用以实例化该合约【也就是目录树中的 NFT_example.sol 】，代码如下：

```
pragma solidity 0.5.17;

import "./ERC721/ERC721Full.sol";
import "./ERC721/ERC721Pausable.sol";
import "./ERC721/ERC721Mintable.sol";
import "./ERC721/ERC721MetadataMintable.sol";
import "./ownship/Ownable.sol";

contract NFT_example is ERC721Full, ERC721Pausable, ERC721Mintable, ERC721MetadataMintable, Ownable {
  using SafeMath for uint256;
	constructor () public ERC721Full("令牌名称", "令牌缩写") {}
}

```

说明：**令牌名称**：请填写你想要的名字（全称）；**令牌缩写**：请填写对应的缩写（简称）

---

这些准备工作都做完了，让我们开始制作叭！

### 编译NFT_example 合约【这里是阿里云服务器哦】

#### Step1. 为 NFT_example 项目新建目录

```
mkdir NFT_example && cd NFT_example
```

- 以下命令如果没有特殊说明都在 NFT_example 目录下进行

#### Step2. 使用 platon-truffle 初始化一个工程

```
platon-truffle init
```

在操作完成之后，就会出现如下项目结构：

- **contracts** ：合约目录
- **migrations**：部署合约的脚本文件目录
- **test**：测试脚本目录
- **truffle-config.js**：platon-truffle 配置文件

#### Step3. 将之前编写好的 NFT_example 全部合约放至 NFT_example /contracts/目录下，做好文件目录归档

#### Step4. 修改 platon-truffle 配置文件 truffle-config.js ，需要修改的地方如下所示：

```
networks: {
    development: {
      host: "35.247.155.162",     // Localhost (default: none)
      port: 6789,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      from: "lat1ex4ue95ap7tjcrxqnfjp8j479nn0927vuug2l7",        // Account to send txs from (default: accounts[0])
    },
},
compilers: {
    solc: {
      version: "0.5.17",    // Fetch exact version from solc-bin (default: 0.6.12)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      //  evmVersion: "byzantium"
      }
    }
  }

```

#### Step5. 编译合约

```
platon-truffle compile
```

编译完成之后，会出现一个 **build** 文件夹，里面的 **contracts** 文件夹里面如下图所示：

![image|251x500](https://forum.latticex.foundation/uploads/default/original/2X/3/3b4e85d28ded7d407286a43a82f9bd1180254e23.png) 

【红色框出来的 json 文件待会我们要用到】

### 部署 NFT_example 合约

#### Step1. 新增合约部署脚本文件

```
cd migrations/ && touch 2_initial_migration.js
```

内容如下：

```
const NFT_example = artifacts.require("NFT_example"); //括号中为迁移合约类名
module.exports = function(deployer) {
    deployer.deploy(NFT_example); 
};  
```

#### Step2. 解锁钱包账户

进入 platon-truffle 控制台
```
platon-truffle console
```
导入私钥（如果之前已经导入过了那么可以跳过这个步骤）

```
web3.platon.personal.importRawKey("您的钱包私钥","您的钱包密码");
```

解锁钱包账户

```
 web3.platon.personal.unlockAccount('您的钱包地址','您的钱包密码',999999);
```

解锁成功将会返回 `true`

#### Step3. 部署合约

```
platon-truffle migrate
```

部署成功后，会看到一段信息，其中包含着您的合约地址 `contract address`，这个地址内容做好保存，待会要用。

### 调用 NFT_example 合约

#### Step1. 进入 platon-truffle 控制台

```
platon-truffle console
```

#### Step2. 构建合约对象

```
var abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintWithTokenURI","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]; //可以从HelloWorld/build/contracts/HelloWorld.json文件中获取到

var contractAddr = 'lat152f3ve4l6ly44k5v98e3lvfps6dfqeeshwpsht';//部署合约时的获取的地址
var nftExample = new web3.platon.Contract(abi,contractAddr);
```

这里说一下 `abi` 从哪里来，还记得之前我用红框圈出来的 NFT_example.json 吗？ abi文件就在里面。

#### Step3. 调用合约

```
nftExample.methods.mintWithTokenURI("您的测试钱包地址",1,'ipfs的uri').send({from: '您的测试钱包地址',gasPrice: '0x' + parseInt(80000000000).toString(16), gas: '0x' + parseInt(4999999).toString(16), value: '0x' + (0).toString(16)}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);
```

这里做个说明，其中第二个参数 `1` 表示这个令牌编号是 1 ，后面的 `ipfs的uri` 可以参考本贴[《上传Matedata到IPFS网络》](https://devdocs.platon.network/docs/zh-CN/PRC721_contract#%E4%B8%8A%E4%BC%A0metadata%E5%88%B0ipfs%E7%BD%91%E7%BB%9C)

综上所述，一步步走下来，你就能拥有一个属于自己的开发网 NFT 啦，至于如何在主网上线，你只需要找到一个节点或者自己部署一个主网节点，然后把 truffle-config.js 的host修改成对应的ip就可以啦。

本教程贡献者 @[乐浅浅](https://github.com/LeQianQian)
