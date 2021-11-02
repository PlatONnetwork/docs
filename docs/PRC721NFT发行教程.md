---
id: qianqian_prc721_tutorial
title: PRC721 NFT Release Tutorial
sidebar_label: PRC721 NFT Release Tutorial
---

### Foreword

The QianQian community has many businesses that require entitlement authentication through NFT, so QianQian set out to practice the creation of NFT based on the PRC721 standard. The focus here is to thank the support of the community's technical students such as Orange, Shing, Boney and Bing, without their help, QianQian's path of exploration would have been much more difficult.


Well, with this tutorial, readers can publish their NFTs on the PlatON development network, but to display them on the ATON wallet, they need to submit an application to the ATON team and have it approved.

Without further ado, let's get started.

### Environment configuration

Still that one low configuration Ali cloud server.

CPU: 1 core 2G
Hard drive: 40GSSD
System: Ubuntu 16.04
Remote connection tool: MobaXterm

### Software preparation

Remote connection tool: MobaXterm
Local host IDE: VScode, Notepad++

Prepare an account for the PlatON development network and request a test LAT from [tap](https://faucet.platon.network/faucet/), the test account on my side is `lat1ex4ue95ap7tjcrxqnfjp8j479nn0927vuug2l7` 

### Coding preparation

As PRC721 is ERC721 compatible, this tutorial encodes using the open source OpenZeppelin source code and strips out the source files we need from it. The specific files required are shown below.

![image|690x388](https://forum.latticex.foundation/uploads/default/original/2X/2/290291103364aca66ae9f74e98261ef3d8498cda.png) 

My file tree is shown below.

![image|257x328](https://forum.latticex.foundation/uploads/default/original/2X/2/2f4f70d875368920a5a15c9efc7ccd18f0b054ec.png) 

Then there are some modifications that need to be made, taking ERC721Full.sol as an example, please see the comments for an example.

```
pragma solidity 0.5.17; //Here you need to change to a solidity version supported by PlatON, e.g. 0.5.17, 0.6.12, 0.7.6, 0.8.2

/*The import directive here needs to be modified to include a reference to the file code*/
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

OK, please note these two points for all subsequent .sol files, and then I have the code ready according to the brain diagram and the file directory tree layout.

Now let's write an example to instantiate the contract [i.e. NFT_example.sol in the directory tree] with the following code.

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

Instructions: 

**Token name**: please fill in the name you want (full name);
**Token abbreviation**: please fill in the corresponding abbreviation (short name)

---

With all this preparation done, let's start making bla!

### Compile NFT_example contract [here is Ali cloud server oh]

#### Step1. Create a new directory for the NFT_example project

```
mkdir NFT_example && cd NFT_example
```

- The following commands are carried out in the NFT_example directory if not otherwise specified

#### Step2. Initialise a project with platon-truffle

```
platon-truffle init
```

Once the operation has been completed, the following project structure will appear.

- **contracts** : Contracts directory
- **migrations**: directory of script files for deploying contracts
- **test**: directory of test scripts
- **truffle-config.js** : the platon-truffle configuration file

#### Step3. Place all previously written NFT_example contracts in the NFT_example /contracts/ directory and archive the file directory

#### Step4. Modify the platon-truffle configuration file, truffle-config.js, to include the following changes.

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

#### Step5. Compilation contracts

```
platon-truffle compile
```

Once compiled, a **build** folder will appear with a **contracts** folder inside as shown below.

![image|251x500](https://forum.latticex.foundation/uploads/default/original/2X/3/3b4e85d28ded7d407286a43a82f9bd1180254e23.png) 

[The json file in the red box will be used later].

### Deploying the NFT_example contract

#### Step1. New contract deployment script file

```
cd migrations/ && touch 2_initial_migration.js
```

It reads as follows.

```
const NFT_example = artifacts.require("NFT_example"); //括号中为迁移合约类名
module.exports = function(deployer) {
    deployer.deploy(NFT_example); 
};  
```

#### Step2. Unlock your wallet account

Access to the platon-truffle console
```
platon-truffle console
```
Import the private key (if it has already been imported then you can skip this step)

```
web3.platon.personal.importRawKey("Your wallet private key", "Your wallet password");
```

Unlock your wallet account

```
 web3.platon.personal.unlockAccount('your wallet address','your wallet password',99999999);
```

A successful unlock will return `true`.

#### Step3. Deployment contracts

```
platon-truffle migrate
```

After successful deployment, you will see a message containing your contract address `contract address`, which you will need to save for later.

### Calling the NFT_example contract

#### Step1. Access to the platon-truffle console

```
platon-truffle console
```

#### Step2. Constructing contract objects

```
var abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintWithTokenURI","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]; //can be obtained from the HelloWorld/build/contracts/HelloWorld.json file

var contractAddr = 'lat152f3ve4l6ly44k5v98e3lvfps6dfqeeshwpsht';//Addresses obtained when deploying the contract
var nftExample = new web3.platon.Contract(abi,contractAddr);
```

Here's where `abi` comes from, remember the NFT_example.json I circled in red earlier? The abi file is in there.

#### Step3. Calling the contract

```
nftExample.methods.mintWithTokenURI("Your test wallet address",1,'ipfs uri').send({from: 'Your test wallet address',gasPrice: '0x' + parseInt(80000000000).toString(16), gas: '0x' + parseInt(4999999).toString(16), value: '0x' + (0).toString(16)}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);
```

As a note, the second parameter `1` indicates that the token number is 1, followed by `ipfs uri` in this post ["Uploading Matedata to IPFS Networks"](https://devdocs.platon.network/docs/zh-CN/PRC721_contract#%E4%B8%8A%E4%BC%A0metadata%E5%88%B0ipfs%E7%BD%91%E7%BB%9C)

As for how to get online on the mainnet, you just need to find a node or deploy a mainnet node yourself and change the host of truffle-config.js to the corresponding ip.

This tutorial was contributed by @[LeQianQian](https://github.com/LeQianQian)
