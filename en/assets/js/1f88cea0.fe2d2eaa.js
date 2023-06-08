"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8863],{3905:(e,t,a)=>{a.d(t,{Zo:()=>k,kt:()=>m});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},k=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,k=s(e,["components","mdxType","originalType","parentName"]),p=c(a),u=o,m=p["".concat(l,".").concat(u)]||p[u]||d[u]||r;return a?n.createElement(m,i(i({ref:t},k),{},{components:a})):n.createElement(m,i({ref:t},k))}));function m(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<r;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},2709:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var n=a(7462),o=(a(7294),a(3905));const r={id:"MetaMask",title:"MetaMask Configure PlatON/Alaya Network",sidebar_label:"MetaMask"},i=void 0,s={unversionedId:"MetaMask",id:"MetaMask",isDocsHomePage:!1,title:"MetaMask Configure PlatON/Alaya Network",description:"What is MetaMask",source:"@site/../docs/MetaMask_Configure.md",sourceDirName:".",slug:"/MetaMask",permalink:"/docs/en/MetaMask",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/MetaMask_Configure.md",version:"current",frontMatter:{id:"MetaMask",title:"MetaMask Configure PlatON/Alaya Network",sidebar_label:"MetaMask"},sidebar:"docs",previous:{title:"Ledger hardware wallet",permalink:"/docs/en/Ledger-hardware-wallet"},next:{title:"PlatON wallet plugin",permalink:"/docs/en/PlatON_Wallet_Operation_Manual"}},l=[{value:"What is MetaMask",id:"what-is-metamask",children:[]},{value:"Why PlatON|Alaya uses MetaMask",id:"why-platonalaya-uses-metamask",children:[{value:"Notices",id:"notices",children:[]}]},{value:"MetaMask installation and use",id:"metamask-installation-and-use",children:[]},{value:"How to manually add PlatON network",id:"how-to-manually-add-platon-network",children:[{value:"PlatON MainNet",id:"platon-mainnet",children:[]},{value:"PlatON DevNet",id:"platon-devnet",children:[]},{value:"Alaya MainNet",id:"alaya-mainnet",children:[]},{value:"Alaya DevNet",id:"alaya-devnet",children:[]}]},{value:"Add a network using ChainList",id:"add-a-network-using-chainlist",children:[]},{value:"A quick way to add MetaMask to Blockchain Explorer",id:"a-quick-way-to-add-metamask-to-blockchain-explorer",children:[{value:"Connect with MetaMask in the web browser",id:"connect-with-metamask-in-the-web-browser",children:[]},{value:"Add network configuration to MetaMask",id:"add-network-configuration-to-metamask",children:[]}]}],c={toc:l},k="wrapper";function p(e){let{components:t,...a}=e;return(0,o.kt)(k,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"what-is-metamask"},"What is MetaMask"),(0,o.kt)("p",null,"MetaMask is a wallet extension application embedded in the browser, which helps you interact with decentralized applications (dApps). "),(0,o.kt)("p",null,"MetaMask allows you to easily access the Ethereum network and add other public chains compatible with the EVM. "),(0,o.kt)("h2",{id:"why-platonalaya-uses-metamask"},"Why PlatON|Alaya uses MetaMask"),(0,o.kt)("p",null,"MetaMask, the most widely used browser plug-in wallet on the market, is well-received in the community. "),(0,o.kt)("p",null,"To lower the threshold for community users, PlatON | Alaya is compatible with the core tools of the Ethereum ecosystem, including MetaMask, after its upgrade to the Ethereum-compatible version. "),(0,o.kt)("p",null,"MetaMask makes operations such as transfer, signing, and contract interaction more convenient. "),(0,o.kt)("h3",{id:"notices"},"Notices"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"The address generated via MetaMask starts with 0x, that is, one in the Ethereum format. To view the address in the PlatON|Alaya format, please check in PlatON|Alaya. "),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},"PlatON MainNet\uff1a",(0,o.kt)("a",{parentName:"p",href:"https://scan.platon.network/"},"https://scan.platon.network/"),"  "),(0,o.kt)("p",{parentName:"blockquote"},"PlatON DevNet2: ",(0,o.kt)("a",{parentName:"p",href:"https://devnet2scan.platon.network/"},"https://devnet2scan.platon.network/")),(0,o.kt)("p",{parentName:"blockquote"},"Alaya MainNet\uff1a",(0,o.kt)("a",{parentName:"p",href:"https://scan.alaya.network/"},"https://scan.alaya.network/")," "),(0,o.kt)("p",{parentName:"blockquote"},"Alaya DevNet: ",(0,o.kt)("a",{parentName:"p",href:"https://devnetscan.alaya.network/"},"https://devnetscan.alaya.network/")))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Mnemonics of ATON and those of MetaMask are incompatible with each other as they are generated through different paths. Private keys are compatible. ")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"MetaMask cannot be called by WASM contracts, but EVM contracts only. ")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"Starting from PlatON version 1.3.0 (effective time 2022.11.9\uff0cFor details see\uff1a",(0,o.kt)("a",{parentName:"strong",href:"https://forum.latticex.foundation/t/topic/6548"},"https://forum.latticex.foundation/t/topic/6548")," ), PlatON MainNet has been completely switched to ChainID: 210425, the original ChainID: 100 is no longer supported!")," "))),(0,o.kt)("p",null,"This document will guide you through PlatON | Alaya network configuration using MetaMask. "),(0,o.kt)("h2",{id:"metamask-installation-and-use"},"MetaMask installation and use"),(0,o.kt)("p",null,"There are many detailed introductions about the installation and use of MetaMask on the Internet, hence no need of further elaboration. "),(0,o.kt)("p",null,"You may refer to:"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("a",{parentName:"p",href:"https://archive.docs.chain.link/docs/install-metamask#config"},"Installation, configuration and use of MetaMask")," "),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=ZIGUC9JAAw8"},"How To Use MetaMask: Ethereum Wallet in your Browser"))),(0,o.kt)("p",null,"After creating a wallet using MetaMask, you're advised to back up the private key of the wallet so that it can be imported into ATON for later use. "),(0,o.kt)("p",null,"Steps of backup:"),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112183347293.png",alt:"image-20220112183347293"}),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112183413762.png",alt:"image-20220112183413762"}),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112183659326.png",alt:"image-20220112183659326"}),(0,o.kt)("h2",{id:"how-to-manually-add-platon-network"},"How to manually add PlatON network"),(0,o.kt)("h3",{id:"platon-mainnet"},"PlatON MainNet"),(0,o.kt)("p",null,"First, you need to install a MetaMask plugin on your Chrome browser. "),(0,o.kt)("p",null,"Then register the wallet and save your mnemonics and private key. "),(0,o.kt)("p",null,"Then click the drop-down menu in the upper right corner. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112183808168.png",alt:"image-20220112183808168"}),(0,o.kt)("p",null,'Then scroll to the end and click "Add Network" '),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112183837332.png",alt:"image-20220112183837332"}),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112183901268.png",alt:"image-20220112183901268"}),(0,o.kt)("p",null,"Fill in the above information one by one. The configuration content is as follows: "),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"PlatON ChainID:210425 Configuration Information ( Recommended )")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Network Name: PlatON MainNetwork\nNew RPC URL: https://openapi2.platon.network/rpc\nChain ID\uff1a210425\nCurrency Symbol\uff1aLAT\nBlock Explorer URL: https://scan.platon.network/\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"PlatON ChainID:100 Configuration information -- ",(0,o.kt)("strong",{parentName:"li"},"Disabled"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Network Name: PlatON MainNetwork\nNew RPC URL: https://openapi.platon.network/rpc\nChain ID\uff1a100\nCurrency Symbol\uff1aLAT\nBlock Explorer URL: https://scan.platon.network/\n")),(0,o.kt)("p",null,"Then click Save and wait for it to finish. "),(0,o.kt)("p",null,"Now, the PlatON MainNet has been successfully added to MetaMask."),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112184025579.png",alt:"image-20220112184025579"}),(0,o.kt)("p",null,"You can also transfer assets as usual. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112184503864.png",alt:"image-20220112184503864"}),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112184532084.png",alt:"image-20220112184532084"}),(0,o.kt)("p",null,"Done! It is worth mentioning that only Hex addresses are supported on the mainnet. In other words, you have a LAT Address and Hex Address in your ATON wallet, and the one that starts with 0x is your Hex address! "),(0,o.kt)("h3",{id:"platon-devnet"},"PlatON DevNet"),(0,o.kt)("p",null,"Similarly, you can add and configure the PlatON DevNet2 according to the following information: "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Network Name: PlatON Dev2 Network\nNew RPC URL: https://devnet2openapi.platon.network/rpc   OR wss://devnet2openapi.platon.network/ws\nChain ID\uff1a2206132\nCurrency Symbol\uff1aLAT\nBlock Explorer URL: https://devnet2scan.platon.network/\n")),(0,o.kt)("p",null,"After the settings are saved, it will automatically jump to PlatON DevNet, and the following will appear: "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112184723277.png",alt:"image-20220112184723277"}),(0,o.kt)("p",null,"Next, we can apply for test tokens on the PlatON DevNet faucet (",(0,o.kt)("a",{parentName:"p",href:"https://devnet2faucet.platon.network/faucet"},"https://devnet2faucet.platon.network/faucet"),") to test the transfer operation. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112184859903.png",alt:"image-20220112184859903"}),(0,o.kt)("p",null,"First, we create the No.2 test wallet: "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112185037936.png",alt:"image-20220112185037936"}),(0,o.kt)("p",null,"After it is saved, we will see:"),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112185056331.png",alt:"image-20220112185056331"}),(0,o.kt)("p",null,"Then we use the No. 1 test wallet to transfer 50 LAT to the No. 2 wallet: "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112185347872.png",alt:"image-20220112185347872"}),(0,o.kt)("p",null,'Click "Confirm" '),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112185403356.png",alt:"image-20220112185403356"}),(0,o.kt)("p",null,"Transferring..."),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112185439816.png",alt:"image-20220112185439816"}),(0,o.kt)("p",null,"Done!  50 LATs have been transferred through the testnet. We can also see a contract interaction below, which is the interaction with the showme application. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112185459908.png",alt:"image-20220112185459908"}),(0,o.kt)("h3",{id:"alaya-mainnet"},"Alaya MainNet"),(0,o.kt)("p",null," By the same token, let's fill in the following information to add the network to MetaMask. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Network Name: Alaya MainNetwork\nNew RPC URL: https://openapi.alaya.network/rpc\nChain ID\uff1a201018 \nCurrency Symbol\uff1aATP\nBlock Explorer URL: https://scan.alaya.network/\n")),(0,o.kt)("p",null,"Other available RPC nodes on the Alaya MainNet: "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"}," ",(0,o.kt)("a",{parentName:"p",href:"https://rpc.alayascan.com"},"https://rpc.alayascan.com")," (provided by itokenpool)")),(0,o.kt)("p",null,"Successfully added:"),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112190053868.png",alt:"image-20220112190053868"}),(0,o.kt)("p",null,"Transfer succeeds as well."),(0,o.kt)("h3",{id:"alaya-devnet"},"Alaya DevNet"),(0,o.kt)("p",null,"Fill out the form with the following information in order: "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Network Name: Alaya Dev Network\nNew RPC URL: https://devnetopenapi.alaya.network/rpc\nChain ID\uff1a201030\nCurrency Symbol\uff1aATP\nBlock Explorer URL: https://devnetscan.alaya.network/\n")),(0,o.kt)("p",null,"After the information is added, create a new Alaya test wallet, and then apply for test tokens on the Alaya DevNet faucet (",(0,o.kt)("a",{parentName:"p",href:"https://faucet.alaya.network/faucet/"},"https://faucet.alaya.network/faucet/"),") to test the transfer operation. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112191841275.png",alt:"image-20220112191841275"}),(0,o.kt)("p",null,"After receiving the test ATP from the faucet, we can start testing transfer: "),(0,o.kt)("p",null,"Start transferring"),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112192819523.png",alt:"image-20220112192819523"}),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112192843056.png",alt:"image-20220112192843056"}),(0,o.kt)("p",null,"Transferring..."),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112192856706.png",alt:"image-20220112192856706"}),(0,o.kt)("p",null,"Done. Now we can see 5 ATP has been received by the Alaya DevNet-2."),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112192930266.png",alt:"image-20220112192930266"}),(0,o.kt)("h2",{id:"add-a-network-using-chainlist"},"Add a network using ChainList"),(0,o.kt)("p",null,"First, open ",(0,o.kt)("a",{parentName:"p",href:"https://chainlist.org/"},"ChainList"),' and click "Connect Wallet" to authorize the connection to MetaMask. '),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/e27a930f30709e719b147ac64dcaaacaf904b93a_2_690x338.png",alt:"e27a930f30709e719b147ac64dcaaacaf904b93a_2_690x338"}),(0,o.kt)("p",null,"Then, enter ",(0,o.kt)("strong",{parentName:"p"},"PlatON")," in the input box to search, "),(0,o.kt)("p",null,"and we can see:"),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/9800bbe80cff52b23b102f36b0eae9e0c05a7bbd_2_690x338.png",alt:"9800bbe80cff52b23b102f36b0eae9e0c05a7bbd_2_690x338"}),(0,o.kt)("p",null,'Next, click "Add tTo MetaMask" to add the network. '),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/0acc9a52bb0d63ed11f2fb9063a12e059c754298_2_690x338.png",alt:"0acc9a52bb0d63ed11f2fb9063a12e059c754298_2_690x338"}),(0,o.kt)("p",null,"Then click ",(0,o.kt)("strong",{parentName:"p"},"switch network")," to jump to the PlatON DevNet! "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/image-20220112193135951.png",alt:"image-20220112193135951"}),(0,o.kt)("p",null,"Now let's add the Alaya Dev Testnet to MetaMask in the same way."),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/e67da043d7028ad99c9f1048a37b65d13a1f8ad9_2_690x338.png",alt:"e67da043d7028ad99c9f1048a37b65d13a1f8ad9_2_690x338"}),(0,o.kt)("p",null,"Similarly, click ",(0,o.kt)("strong",{parentName:"p"},"Approve")," and then ",(0,o.kt)("strong",{parentName:"p"},"switch network"),". The Alaya Dev Testnet has been added."),(0,o.kt)("h2",{id:"a-quick-way-to-add-metamask-to-blockchain-explorer"},"A quick way to add MetaMask to Blockchain Explorer"),(0,o.kt)("p",null,"Enter the PlatON or Alaya blockchain explorer, find ","[MORE]"," in the navigation menu, click ","[Add to Extension]",", and select the network to be configured: "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Blockchain explorer on the PlatON MainNet: ",(0,o.kt)("a",{parentName:"p",href:"https://scan.platon.network/add-to-extension"},"https://scan.platon.network/add-to-extension")," "),(0,o.kt)("p",{parentName:"blockquote"},"Blockchain explorer on the PlatON DevNet: ",(0,o.kt)("a",{parentName:"p",href:"https://devnetscan.platon.network/add-to-extension"},"https://devnetscan.platon.network/add-to-extension")),(0,o.kt)("p",{parentName:"blockquote"},"Blockchain explorer on the Alaya MainNet: ",(0,o.kt)("a",{parentName:"p",href:"https://scan.alaya.network/add-to-extension"},"https://scan.alaya.network/add-to-extension")," "),(0,o.kt)("p",{parentName:"blockquote"},"Blockchain explorer on the Alaya DevNet: ",(0,o.kt)("a",{parentName:"p",href:"https://devnetscan.alaya.network/add-to-extension"},"https://devnetscan.alaya.network/add-to-extension")," ")),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.1].png",alt:"[Figure-4.1.1]"}),(0,o.kt)("h3",{id:"connect-with-metamask-in-the-web-browser"},"Connect with MetaMask in the web browser"),(0,o.kt)("p",null,"1) After entering the Add to Extension page in the blockchain explorer, click ","[Connect MetaMask]",". "),(0,o.kt)("p",null," ","[Prerequisite: MetaMask needs to be installed in the explorer in advance]"," "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.2.1].png",alt:"[Figure-4.1.2.1]"}),(0,o.kt)("p",null,"2) Click ","[Next]"," in MetaMask, and then click ","[Connect]"," to establish communication with MetaMask. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.2.2].png",alt:"[Figure-4.1.2.2]"}),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.2.3].png",alt:"[Figure-4.1.2.3]"}),(0,o.kt)("h3",{id:"add-network-configuration-to-metamask"},"Add network configuration to MetaMask"),(0,o.kt)("p",null,"1) After the connection is successful, ","[Connect MetaMask]"," turns into ","[Add to MetaMask]",". Click ","[Add to MetaMask]",". "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.3.1].png",alt:"[Figure-4.1.3.1]"}),(0,o.kt)("p",null,"2) Click ","[Approve]"," to add the network configuration to MetaMask. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.3.2].png",alt:"[Figure-4.1.3.2]"}),(0,o.kt)("p",null,"3) The plug-in wallet will prompt you to switch to this network. Click ","[Switch Network]"," to switch the corresponding network for later use. "),(0,o.kt)("img",{src:"/docs/img/en/MetaMask_Configure.assets/[Figure-4.1.3.3].png",alt:"[Figure-4.1.3.3]"}),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"This tutorial is contributed by @",(0,o.kt)("a",{parentName:"em",href:"https://github.com/LeQianQian"},"LeQianQian")," @",(0,o.kt)("a",{parentName:"em",href:"https://github.com/Dengxin46"},"Dengxin46"))))}p.isMDXComponent=!0}}]);