"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8764],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),y=o,m=d["".concat(s,".").concat(y)]||d[y]||c[y]||r;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},6263:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var a=n(7462),o=(n(7294),n(3905));const r={id:"qianqian_prc721_tutorial",title:"PRC721 NFT Release Tutorial",sidebar_label:"PRC721 NFT Release Tutorial"},i=void 0,l={unversionedId:"qianqian_prc721_tutorial",id:"qianqian_prc721_tutorial",isDocsHomePage:!1,title:"PRC721 NFT Release Tutorial",description:"Foreword",source:"@site/../docs/PRC721NFT\u53d1\u884c\u6559\u7a0b.md",sourceDirName:".",slug:"/qianqian_prc721_tutorial",permalink:"/docs/en/qianqian_prc721_tutorial",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/PRC721NFT\u53d1\u884c\u6559\u7a0b.md",version:"current",frontMatter:{id:"qianqian_prc721_tutorial",title:"PRC721 NFT Release Tutorial",sidebar_label:"PRC721 NFT Release Tutorial"},sidebar:"docs",previous:{title:"DApp Quick Migration Tutorial",permalink:"/docs/en/DApp_migrate"},next:{title:"WASM\u2014Introduction",permalink:"/docs/en/WASM_Contract_1"}},s=[{value:"Foreword",id:"foreword",children:[]},{value:"Environment configuration",id:"environment-configuration",children:[]},{value:"Software preparation",id:"software-preparation",children:[]},{value:"Coding preparation",id:"coding-preparation",children:[]},{value:"Compile NFT_example contract here is Ali cloud server oh",id:"compile-nft_example-contract-here-is-ali-cloud-server-oh",children:[]},{value:"Deploying the NFT_example contract",id:"deploying-the-nft_example-contract",children:[]},{value:"Calling the NFT_example contract",id:"calling-the-nft_example-contract",children:[]}],p={toc:s};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"foreword"},"Foreword"),(0,o.kt)("p",null,"The QianQian community has many businesses that require entitlement authentication through NFT, so QianQian set out to practice the creation of NFT based on the PRC721 standard. The focus here is to thank the support of the community's technical students such as Orange, Shing, Boney and Bing, without their help, QianQian's path of exploration would have been much more difficult."),(0,o.kt)("p",null,"Well, with this tutorial, readers can publish their NFTs on the PlatON development network, but to display them on the ATON wallet, they need to submit an application to the ATON team and have it approved."),(0,o.kt)("p",null,"Without further ado, let's get started."),(0,o.kt)("h3",{id:"environment-configuration"},"Environment configuration"),(0,o.kt)("p",null,"Still that one low configuration Ali cloud server."),(0,o.kt)("p",null,"CPU: 1 core 2G\nHard drive: 40GSSD\nSystem: Ubuntu 16.04\nRemote connection tool: MobaXterm"),(0,o.kt)("h3",{id:"software-preparation"},"Software preparation"),(0,o.kt)("p",null,"Remote connection tool: MobaXterm\nLocal host IDE: VScode, Notepad++"),(0,o.kt)("p",null,"Prepare an account for the PlatON development network and request a test LAT from ",(0,o.kt)("a",{parentName:"p",href:"https://faucet.platon.network/faucet/"},"tap"),", the test account on my side is ",(0,o.kt)("inlineCode",{parentName:"p"},"lat1ex4ue95ap7tjcrxqnfjp8j479nn0927vuug2l7")," "),(0,o.kt)("h3",{id:"coding-preparation"},"Coding preparation"),(0,o.kt)("p",null,"As PRC721 is ERC721 compatible, this tutorial encodes using the open source OpenZeppelin source code and strips out the source files we need from it. The specific files required are shown below."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://forum.latticex.foundation/uploads/default/original/2X/2/290291103364aca66ae9f74e98261ef3d8498cda.png",alt:"image|690x388"})," "),(0,o.kt)("p",null,"My file tree is shown below."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://forum.latticex.foundation/uploads/default/original/2X/2/2f4f70d875368920a5a15c9efc7ccd18f0b054ec.png",alt:"image|257x328"})," "),(0,o.kt)("p",null,"Then there are some modifications that need to be made, taking ERC721Full.sol as an example, please see the comments for an example."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'pragma solidity 0.5.17; //Here you need to change to a solidity version supported by PlatON, e.g. 0.5.17, 0.6.12, 0.7.6, 0.8.2\n\n/*The import directive here needs to be modified to include a reference to the file code*/\nimport "./ERC721.sol";\nimport "./ERC721Enumberable.sol";\nimport "./ERC721Metadata.sol";\n\n/**\n * @title Full ERC721 Token\n * @dev This implementation includes all the required and some optional functionality of the ERC721 standard\n * Moreover, it includes approve all functionality using operator terminology.\n *\n * See https://eips.ethereum.org/EIPS/eip-721\n */\ncontract ERC721Full is ERC721, ERC721Enumerable, ERC721Metadata {\n    constructor (string memory name, string memory symbol) public ERC721Metadata(name, symbol) {\n        // solhint-disable-previous-line no-empty-blocks\n    }\n}\n\nfunction awardItem(address recipient, string memory hash, string memory metadata)  \n      public  \n      returns (uint256){  \n\n      require(hashes[hash] != 1);  \n      hashes[hash] = 1;  \n     _tokenIds.increment();  \n      uint256 newItemId =_tokenIds.current();  \n     _mint(recipient, newItemId);  \n     _setTokenURI(newItemId, metadata);  \n      return newItemId;  \n\n    }  \n')),(0,o.kt)("p",null,"OK, please note these two points for all subsequent .sol files, and then I have the code ready according to the brain diagram and the file directory tree layout."),(0,o.kt)("p",null,"Now let's write an example to instantiate the contract ","[i.e. NFT_example.sol in the directory tree]"," with the following code."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'pragma solidity 0.5.17;\n\nimport "./ERC721/ERC721Full.sol";\nimport "./ERC721/ERC721Pausable.sol";\nimport "./ERC721/ERC721Mintable.sol";\nimport "./ERC721/ERC721MetadataMintable.sol";\nimport "./ownship/Ownable.sol";\n\ncontract NFT_example is ERC721Full, ERC721Pausable, ERC721Mintable, ERC721MetadataMintable, Ownable {\n  using SafeMath for uint256;\n    constructor () public ERC721Full("\u4ee4\u724c\u540d\u79f0", "\u4ee4\u724c\u7f29\u5199") {}\n}\n\n')),(0,o.kt)("p",null,"Instructions: "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Token name"),": please fill in the name you want (full name);\n",(0,o.kt)("strong",{parentName:"p"},"Token abbreviation"),": please fill in the corresponding abbreviation (short name)"),(0,o.kt)("hr",null),(0,o.kt)("p",null,"With all this preparation done, let's start making bla!"),(0,o.kt)("h3",{id:"compile-nft_example-contract-here-is-ali-cloud-server-oh"},"Compile NFT_example contract ","[here is Ali cloud server oh]"),(0,o.kt)("h4",{id:"step1-create-a-new-directory-for-the-nft_example-project"},"Step1. Create a new directory for the NFT_example project"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"mkdir NFT_example && cd NFT_example\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The following commands are carried out in the NFT_example directory if not otherwise specified")),(0,o.kt)("h4",{id:"step2-initialise-a-project-with-platon-truffle"},"Step2. Initialise a project with platon-truffle"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"platon-truffle init\n")),(0,o.kt)("p",null,"Once the operation has been completed, the following project structure will appear."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"contracts")," : Contracts directory"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"migrations"),": directory of script files for deploying contracts"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"test"),": directory of test scripts"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"truffle-config.js")," : the platon-truffle configuration file")),(0,o.kt)("h4",{id:"step3-place-all-previously-written-nft_example-contracts-in-the-nft_example-contracts-directory-and-archive-the-file-directory"},"Step3. Place all previously written NFT_example contracts in the NFT_example /contracts/ directory and archive the file directory"),(0,o.kt)("h4",{id:"step4-modify-the-platon-truffle-configuration-file-truffle-configjs-to-include-the-following-changes"},"Step4. Modify the platon-truffle configuration file, truffle-config.js, to include the following changes."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'networks: {\n    development: {\n      host: "35.247.155.162",     // Localhost (default: none)\n      port: 6789,            // Standard Ethereum port (default: none)\n      network_id: "*",       // Any network (default: none)\n      from: "lat1ex4ue95ap7tjcrxqnfjp8j479nn0927vuug2l7",        // Account to send txs from (default: accounts[0])\n    },\n},\ncompilers: {\n    solc: {\n      version: "0.5.17",    // Fetch exact version from solc-bin (default: 0.6.12)\n      // docker: true,        // Use "0.5.1" you\'ve installed locally with docker (default: false)\n      settings: {          // See the solidity docs for advice about optimization and evmVersion\n        optimizer: {\n          enabled: true,\n          runs: 200\n        },\n      //  evmVersion: "byzantium"\n      }\n    }\n  }\n\n')),(0,o.kt)("h4",{id:"step5-compilation-contracts"},"Step5. Compilation contracts"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"platon-truffle compile\n")),(0,o.kt)("p",null,"Once compiled, a ",(0,o.kt)("strong",{parentName:"p"},"build")," folder will appear with a ",(0,o.kt)("strong",{parentName:"p"},"contracts")," folder inside as shown below."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://forum.latticex.foundation/uploads/default/original/2X/3/3b4e85d28ded7d407286a43a82f9bd1180254e23.png",alt:"image|251x500"})," "),(0,o.kt)("p",null,"[The json file in the red box will be used later]","."),(0,o.kt)("h3",{id:"deploying-the-nft_example-contract"},"Deploying the NFT_example contract"),(0,o.kt)("h4",{id:"step1-new-contract-deployment-script-file"},"Step1. New contract deployment script file"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd migrations/ && touch 2_initial_migration.js\n")),(0,o.kt)("p",null,"It reads as follows."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'const NFT_example = artifacts.require("NFT_example"); //\u62ec\u53f7\u4e2d\u4e3a\u8fc1\u79fb\u5408\u7ea6\u7c7b\u540d\nmodule.exports = function(deployer) {\n    deployer.deploy(NFT_example); \n};  \n')),(0,o.kt)("h4",{id:"step2-unlock-your-wallet-account"},"Step2. Unlock your wallet account"),(0,o.kt)("p",null,"Access to the platon-truffle console"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"platon-truffle console\n")),(0,o.kt)("p",null,"Import the private key (if it has already been imported then you can skip this step)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'web3.platon.personal.importRawKey("Your wallet private key", "Your wallet password");\n')),(0,o.kt)("p",null,"Unlock your wallet account"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"}," web3.platon.personal.unlockAccount('your wallet address','your wallet password',99999999);\n")),(0,o.kt)("p",null,"A successful unlock will return ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)("h4",{id:"step3-deployment-contracts"},"Step3. Deployment contracts"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"platon-truffle migrate\n")),(0,o.kt)("p",null,"After successful deployment, you will see a message containing your contract address ",(0,o.kt)("inlineCode",{parentName:"p"},"contract address"),", which you will need to save for later."),(0,o.kt)("h3",{id:"calling-the-nft_example-contract"},"Calling the NFT_example contract"),(0,o.kt)("h4",{id:"step1-access-to-the-platon-truffle-console"},"Step1. Access to the platon-truffle console"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"platon-truffle console\n")),(0,o.kt)("h4",{id:"step2-constructing-contract-objects"},"Step2. Constructing contract objects"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'var abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintWithTokenURI","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]; //can be obtained from the HelloWorld/build/contracts/HelloWorld.json file\n\nvar contractAddr = \'lat152f3ve4l6ly44k5v98e3lvfps6dfqeeshwpsht\';//Addresses obtained when deploying the contract\nvar nftExample = new web3.platon.Contract(abi,contractAddr);\n')),(0,o.kt)("p",null,"Here's where ",(0,o.kt)("inlineCode",{parentName:"p"},"abi")," comes from, remember the NFT_example.json I circled in red earlier? The abi file is in there."),(0,o.kt)("h4",{id:"step3-calling-the-contract"},"Step3. Calling the contract"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"nftExample.methods.mintWithTokenURI(\"Your test wallet address\",1,'ipfs uri').send({from: 'Your test wallet address',gasPrice: '0x' + parseInt(80000000000).toString(16), gas: '0x' + parseInt(4999999).toString(16), value: '0x' + (0).toString(16)}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);\n")),(0,o.kt)("p",null,"As a note, the second parameter ",(0,o.kt)("inlineCode",{parentName:"p"},"1")," indicates that the token number is 1, followed by ",(0,o.kt)("inlineCode",{parentName:"p"},"ipfs uri")," in this post ",(0,o.kt)("a",{parentName:"p",href:"https://devdocs.platon.network/docs/zh-CN/PRC721_contract#%E4%B8%8A%E4%BC%A0metadata%E5%88%B0ipfs%E7%BD%91%E7%BB%9C"},'"Uploading Matedata to IPFS Networks"')),(0,o.kt)("p",null,"As for how to get online on the mainnet, you just need to find a node or deploy a mainnet node yourself and change the host of truffle-config.js to the corresponding ip."),(0,o.kt)("p",null,"This tutorial was contributed by @",(0,o.kt)("a",{parentName:"p",href:"https://github.com/LeQianQian"},"LeQianQian")))}u.isMDXComponent=!0}}]);