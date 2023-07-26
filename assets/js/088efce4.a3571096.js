"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3521],{3905:(e,t,l)=>{l.d(t,{Zo:()=>u,kt:()=>k});var n=l(7294);function a(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function r(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function o(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?r(Object(l),!0).forEach((function(t){a(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function i(e,t){if(null==e)return{};var l,n,a=function(e,t){if(null==e)return{};var l,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)l=r[n],t.indexOf(l)>=0||(a[l]=e[l]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)l=r[n],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(a[l]=e[l])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),l=t;return e&&(l="function"==typeof e?e(t):o(o({},t),e)),l},u=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var l=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=s(l),m=a,k=c["".concat(p,".").concat(m)]||c[m]||d[m]||r;return l?n.createElement(k,o(o({ref:t},u),{},{components:l})):n.createElement(k,o({ref:t},u))}));function k(e,t){var l=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=l.length,o=new Array(r);o[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<r;s++)o[s]=l[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,l)}m.displayName="MDXCreateElement"},3899:(e,t,l)=>{l.r(t),l.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var n=l(7462),a=(l(7294),l(3905));const r={id:"PlatON_wallet_plugin_sdk",title:"PlatON-Wallet-Plugin-SDK - Access Manual",sidebar_label:"PlatON wallet plugin SDK"},o="INTEGRATE PlatON Wallet Plugin SDK",i={unversionedId:"PlatON_wallet_plugin_sdk",id:"PlatON_wallet_plugin_sdk",isDocsHomePage:!1,title:"PlatON-Wallet-Plugin-SDK - Access Manual",description:"Install PlatON Wallet Plugin SDK",source:"@site/../docs/PlatON Wallet Plugin SDK.md",sourceDirName:".",slug:"/PlatON_wallet_plugin_sdk",permalink:"/docs/PlatON_wallet_plugin_sdk",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/PlatON Wallet Plugin SDK.md",version:"current",frontMatter:{id:"PlatON_wallet_plugin_sdk",title:"PlatON-Wallet-Plugin-SDK - Access Manual",sidebar_label:"PlatON wallet plugin SDK"},sidebar:"docs",previous:{title:"PlatON wallet plugin",permalink:"/docs/PlatON_wallet_plugin"},next:{title:"PlaTrust Wallet",permalink:"/docs/PlaTrust_Wallet"}},p=[{value:"Install PlatON Wallet Plugin SDK",id:"install-platon-wallet-plugin-sdk",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Set up the SDK",id:"set-up-the-sdk",children:[{value:"Initialize and use PlatON-Wallet",id:"initialize-and-use-platon-wallet",children:[]},{value:"Switch wallets",id:"switch-wallets",children:[]}]},{value:"Example usage",id:"example-usage",children:[]}],s={toc:p},u="wrapper";function c(e){let{components:t,...l}=e;return(0,a.kt)(u,(0,n.Z)({},s,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"integrate-platon-wallet-plugin-sdk"},"INTEGRATE PlatON Wallet Plugin SDK"),(0,a.kt)("h2",{id:"install-platon-wallet-plugin-sdk"},"Install PlatON Wallet Plugin SDK"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Integrate our SDK to your dApp/Wallet/swap UI.")),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,"We recommend installing the SDK via npm\u3001yarn or pnpm."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"npm install '@platonnetwork/platon-wallet-sdk'\n")),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"yarn add '@platonnetwork/platon-wallet-sdk'\n")),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"pnpm add '@platonnetwork/platon-wallet-sdk'\n")),(0,a.kt)("h2",{id:"set-up-the-sdk"},"Set up the SDK"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"After you have installed the SDK, you first need to set it up.")),(0,a.kt)("p",null,"To get started, you have to instantiate and configure the Platon-Wallet SDK:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"import PlatOWallet from '@platonnetwork/platon-wallet-sdk';\n\n// Definition PlatONWallet SDK\nconst walletSDK = new PlatONWallet(config);\n")),(0,a.kt)("p",null,"The optional config parameter can be used to pass custom configuration to the SDK:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"type ConfigUpdate = {\n    env: 'PROD', // 'TEST' or 'PROD'\n    // This parameter is optional. The value can be \"METAMASK\" \"and other third-party wallet plug-in names. \n    // Currently, only \"METAMASK\" is supported\n    walletType: ''  \n};\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"env")," defines which environment should be access, and can be selected as ",(0,a.kt)("inlineCode",{parentName:"p"},"TEST")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"PROD"),". This requires that\nthe corresponding environment be determined at initialization time."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"TEST")," Corresponding test environment, which corresponds to PlatON's development network;"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"PROD")," Corresponds to the production environment, which corresponds to the main network of PlatON;")),(0,a.kt)("p",null,"The 'walletType' is the wallet type connected to the current user. This parameter is optional. The initial\nvalue can be set to empty string(''), indicating that the wallet is not connected."),(0,a.kt)("p",null,"Parameter values:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"''"),": Indicates that the wallet is not connected;"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"'<Wallet Name>'"),": The name of the wallet connected to the current user, such as 'METAMASK';")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Note: After the user connects the wallet and switches the wallet each time, the parameter needs to be set in the following ways:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"walletSDK.setWalletType('Wallet Plugin Name')\n")),(0,a.kt)("h3",{id:"initialize-and-use-platon-wallet"},"Initialize and use PlatON-Wallet"),(0,a.kt)("p",null,"Once the PlatON-Wallet definition is complete, the 'init()' function needs to be called to complete the initialization:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"// Initialize PlatONWallet SDK\nwalletSDK.init();\n")),(0,a.kt)("p",null,"After initialization, need to call the 'setWalletType()' function to set the wallet type of the current connection:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"// Setup wallet plugin\nwalletSDK.setWalletType('METAMASK');\n")),(0,a.kt)("p",null,"After setting the wallet type, call 'show()' to display the PlatON-Wallet page:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"// Show wallet\nwalletSDK.show();\n")),(0,a.kt)("h3",{id:"switch-wallets"},"Switch wallets"),(0,a.kt)("p",null,"Called when switching from metamask wallet to connect to another wallet\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"walletSDK.setWalletType('other wallet name')\n")),(0,a.kt)("p",null,"Called when switching back to the connected metamask wallet from another wallet:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"walletSDK.setWalletType('METAMASK')\n")),(0,a.kt)("p",null,"Called when not connecting to any wallet or exiting wallet: "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"walletSDK.setWalletType('')\n")),(0,a.kt)("p",null,"or "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"walletSDK.destroy()\n")),(0,a.kt)("h2",{id:"example-usage"},"Example usage"),(0,a.kt)("p",null,"When the project is rendered for the client, use the following import methods:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import PlatOWallet from '@platonnetwork/platon-wallet-sdk';\n\n// Definition PlatONWallet SDK\nconst walletSDK = new PlatONWallet({\n    env: 'PROD', // 'TEST' or 'PROD'\n    walletType: 'METAMASK'\n});\n\n// Initialization PlatONWallet SDK\nwalletSDK.init();\n\n// Set wallet type\nwalletSDK.setWalletType('METAMASK')\n\n// Hide Platon-Wallet.\nwalletSDK.hide();\n\n// Show Platon-Wallet.\nwalletSDK.show();\n\n// Destroy Platon-Wallet\nwalletSDK.destroy();\n")),(0,a.kt)("p",null,"When the project is rendered for the server (e.g. using next.js, etc.), use the following import method:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-next.js"},"let walletSDK = null\n\nimport('@platonnetwork/platon-wallet-sdk').then(module => {\n\xa0 walletSDK = new module.default({ env: 'PROD', walletType: 'METAMASK' })\n})\n")))}c.isMDXComponent=!0}}]);