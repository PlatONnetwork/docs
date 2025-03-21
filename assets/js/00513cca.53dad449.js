"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[767],{771:(e,r,t)=>{t.r(r),t.d(r,{contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>g,toc:()=>d});var l=t(8168),n=(t(6540),t(5680));const i={id:"Ledger-hardware-wallet",title:"Ledger hardware wallet",sidebar_label:"Ledger hardware wallet"},a="Ledger hardware wallet",g={unversionedId:"Ledger-hardware-wallet",id:"Ledger-hardware-wallet",isDocsHomePage:!1,title:"Ledger hardware wallet",description:"Recently, PlatON has initially integrated Ledger hardware wallet (currently in developer mode for the time being), and will subsequently provide hardware wallet services to a wide range of PlatON users.Ledger, one of the most popular hardware wallets on the market today, provides the highest level of security and reliability for PlatON\u2019s network assets through a state-of-the-art security chip that holds private keys.",source:"@site/../docs/Ledger-hardware-wallet.md",sourceDirName:".",slug:"/Ledger-hardware-wallet",permalink:"/docs/Ledger-hardware-wallet",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/Ledger-hardware-wallet.md",version:"current",frontMatter:{id:"Ledger-hardware-wallet",title:"Ledger hardware wallet",sidebar_label:"Ledger hardware wallet"},sidebar:"docs",previous:{title:"Third-party wallets",permalink:"/docs/Third_Party_Walle"},next:{title:"MetaMask",permalink:"/docs/MetaMask"}},d=[{value:"Prepare the environment for Ledger Hardware Wallets",id:"prepare-the-environment-for-ledger-hardware-wallets",children:[{value:"Initialization and program installation",id:"initialization-and-program-installation",children:[]},{value:"Install PlatON hardware Drivers (Method 1)",id:"install-platon-hardware-drivers-method-1",children:[]},{value:"Install PlatON hardware Drivers (Method 2)",id:"install-platon-hardware-drivers-method-2",children:[]}]},{value:"Use the Ledger hardware wallet signature to complete the transaction",id:"use-the-ledger-hardware-wallet-signature-to-complete-the-transaction",children:[{value:"Select PlatON hardware driver application",id:"select-platon-hardware-driver-application",children:[]},{value:"Samurai pair and unlock Ledger hardware wallet",id:"samurai-pair-and-unlock-ledger-hardware-wallet",children:[]},{value:"Ledger hardware wallet completes signature transfer transaction",id:"ledger-hardware-wallet-completes-signature-transfer-transaction",children:[]}]},{value:"Change PIN identification code and reset Ledger hardware wallet",id:"change-pin-identification-code-and-reset-ledger-hardware-wallet",children:[{value:"Change the PIN identification code in the Ledger hardware wallet",id:"change-the-pin-identification-code-in-the-ledger-hardware-wallet",children:[]},{value:"Reset Ledger hardware wallet",id:"reset-ledger-hardware-wallet",children:[]}]},{value:"Tip",id:"tip",children:[]}],s={toc:d},o="wrapper";function u(e){let{components:r,...t}=e;return(0,n.yg)(o,(0,l.A)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"ledger-hardware-wallet"},"Ledger hardware wallet"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Recently, PlatON has initially integrated Ledger hardware wallet (currently in developer mode for the time being), and will subsequently provide hardware wallet services to a wide range of PlatON users.Ledger, one of the most popular hardware wallets on the market today, provides the highest level of security and reliability for PlatON\u2019s network assets through a state-of-the-art security chip that holds private keys.",(0,n.yg)("br",null),"Samurai, PlatON\u2019s open-source web browser plug-in wallet, has completed support for the Lager hardware wallet, providing users with a more secure way to store and use their assets.",(0,n.yg)("br",null)," - Authentication and authorization of transactions",(0,n.yg)("br",null)," - Provide a cold storage option for creating wallets and storing private keys offline",(0,n.yg)("br",null),(0,n.yg)("br",null),"By using the Ledger hardware wallet to store private keys and sign transactions, the private keys will not come into contact with your software wallet, making the transaction signing process more secure and simple.",(0,n.yg)("br",null),"Note: The ATON mobile wallet will also support the Ledger hardware wallet in the future, so stay tuned!",(0,n.yg)("br",null),(0,n.yg)("br",null),"This article will guide you through the process of configuring the Ledger hardware wallet and signing Samurai transactions using the Ledger Nano hardware wallet.Here are the details of the process.",(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h2",{id:"prepare-the-environment-for-ledger-hardware-wallets"},"Prepare the environment for Ledger Hardware Wallets"),(0,n.yg)("h3",{id:"initialization-and-program-installation"},"Initialization and program installation"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Ledger hardware wallets, Ledger Live Desktop, Samurai Wallet;",(0,n.yg)("br",null),(0,n.yg)("br",null),"[Ledger Nano S and Ledger Nano X are operated basically in the same way. Here we take Ledger Nano X as an example]",(0,n.yg)("br",null)),(0,n.yg)("h4",{id:"ledger-hardware-wallet-initialization"},"Ledger hardware wallet initialization"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"[Operation instructions: press the black and white buttons respectively to switch between options. Press the black and white buttons at the same time to confirm]",(0,n.yg)("br",null),"\u2460\u3000Set the PIN identification code: Long press the black button to start the Ledger hardware wallet, enter and confirm the PIN identification code setting, as shown in Figure 1.1.1;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",width:"500",style:{width:"400px",textAlign:"center"}},"Figure1.1.1"),(0,n.yg)("br",null),(0,n.yg)("br",null),"\u2461\u3000Between the two options, [Set up as new device] and [Restore from Recovery phrase], here we choose Restore from Recovery phrase (mnemonic phrase), as shown in Figure 1.1.2;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.2.jpg",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.2"),(0,n.yg)("br",null),"\u2462\u3000In the recovery phrase (mnemonic phrase), the PlatON network can generate multiple types of mnemonic phrases. To facilitate ATON HD Wallet to import mnemonic phrase, here we choose [12 words], as shown in Figure 1.1.3;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.3.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.3"),(0,n.yg)("br",null),(0,n.yg)("br",null),"Or we can choose 24 words to restore from the recovery phrase self-generated by Ledger. Enter the Ledger hardware wallet after creating/recovering the phrase, as shown in Figure 1.1.4;You need to install Ledger hardware wallet in Ledger Live Desktop.",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.4.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.4"),(0,n.yg)("br",null),(0,n.yg)("br",null),"Note: Ledger and ATON mnemonics are not compatible with Samurai mnemonics, please use your wallet private key to import each other.",(0,n.yg)("br",null)),(0,n.yg)("h4",{id:"prepare-the-environment-for-ledger-live-desktop"},"Prepare the environment for Ledger Live Desktop"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Download Ledger Live and install it locally; download link:",(0,n.yg)("br",null),"https://www.ledger.com/ledger-live/download",(0,n.yg)("br",null),"Steps of operation and installation are as shown in Figures 1.1.5 and 1.1.6.",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.5.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.5"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.6.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.6"),(0,n.yg)("br",null)),(0,n.yg)("h4",{id:"to-prepare-the-environment-for-samurai-wallet"},"To prepare the environment for Samurai Wallet"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"\u2460\u3000Download and unpack Samurai Wallet from",(0,n.yg)("br",null)," https://github.com/AlayaNetwork/Samurai/releases",(0,n.yg)("br",null),"as shown in Figure 1.1.7;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.7.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.7"),(0,n.yg)("br",null),(0,n.yg)("br",null),"\u2461\u3000Open the Chrome browser, enter chrome://extensions/ in the address bar and press Enter to enter the page of Extensions. [Activate] developer mode, select [Load unpacked], import the directory where the Samurai plug-in wallet is unpacked, as shown in Figures 1.1.8.",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.1.8.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.1.8"),(0,n.yg)("br",null)),(0,n.yg)("h3",{id:"install-platon-hardware-drivers-method-1"},"Install PlatON hardware Drivers (Method 1)"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Use Ledger Live Desktop to add [PlatON] to the Ledger hardware wallet",(0,n.yg)("br",null),(0,n.yg)("br",null),"1) Open Ledger Live Desktop and select the corresponding Ledger hardware device, as shown in Figure 1.2.1. You need to set the PIN identification code for the first use, and the previously set options are directly synchronized to the application;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.2.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.2.1"),(0,n.yg)("br",null),(0,n.yg)("br",null),"2)To connect to the desktop program for pairing, you need to enter the PIN identification code, and authorize the pairing, as shown in Figure 1.2.2;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.2.2.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.2.2"),(0,n.yg)("br",null),(0,n.yg)("br",null),"3)Download and install the PlatON application in Ledger Live Desktop: Since the PlatON application has not been officially launched on Ledger Live, it is currently in a beta phase for professional enthusiasts/community members. So you need to manually activate the developer mode before you can search [PlatON]. Large transactions are not suggested in the current testing phase;",(0,n.yg)("br",null),"\u2460\u3000Enter Ledger Live Desktop, and activate the developer mode in the settings, as shown in Figure 1.2.3;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.2.3.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.2.3"),(0,n.yg)("br",null),(0,n.yg)("br",null),"\u2461\u3000Then find and install [PlatON] in Manager, as shown in Figure 1.2.4. After that, we need Samurai/MetaMask;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.2.4.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.2.4"),(0,n.yg)("br",null)),(0,n.yg)("h3",{id:"install-platon-hardware-drivers-method-2"},"Install PlatON hardware Drivers (Method 2)"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Adding the [PlatON] hardware driver to the Ledger Hardware Wallet \u2014 Use the Ledger live App pairing to add the [PlatON] app to the Ledger Hardware Wallet.",(0,n.yg)("br",null),(0,n.yg)("br",null),"1)Open the Ledger Live app and select the corresponding Ledger hardware device, as shown in Figure 1.3.1. You need to set the PIN identification code for the first use, and the previously set options are directly synchronized to the application;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.1"),(0,n.yg)("br",null),(0,n.yg)("br",null),"2)It is necessary to pair the Ledger hardware wallet with the Ledger Live app, as shown in Figure 1.3.1.1\uff1b",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.1.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.1.1"),(0,n.yg)("br",null),(0,n.yg)("br",null),"You need to confirm the pairing on both your Ledger hardware wallet and the Ledger Live app, as shown in Figures 1.3.2, 1.3.3, and 1.3.4.;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.2.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.2"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.3.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.3"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.4.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.4"),(0,n.yg)("br",null),(0,n.yg)("br",null),"Pairing can be successful only after confirmation, as shown in Figure 1.3.5.;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.5.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.5"),(0,n.yg)("br",null),"Before pairing, you need to make sure that the Ledger hardware wallet is unlocked and Bluetooth is turned on. Under normal circumstances, the Ledger hardware wallet remains unlocked, without the need of manual setting. Here is a precondition: the setting prescribed in [1.1] has been completed.",(0,n.yg)("br",null),(0,n.yg)("br",null),"3)In the Ledger Live app, add [PlatON] to the Ledger hardware wallet\uff1a",(0,n.yg)("br",null),"Portfolio page: Tap [Settings] in the upper right corner, as shown in Figure 1.3.6. Select [Experimental Function], and activate [Developer mode], as shown in Figure 1.3.7;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.6.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.6"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.7.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.7"),(0,n.yg)("br",null),(0,n.yg)("br",null),"Manager page: Select your Ledger hardware wallet device, and open the application catalog, as shown in Figure 1.3.8. Find and download [PlatON], as shown in Figure 1.3.9. After that, we need Samurai/MetaMask;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.8.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.8"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure1.3.9.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure1.3.9"),(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h2",{id:"use-the-ledger-hardware-wallet-signature-to-complete-the-transaction"},"Use the Ledger hardware wallet signature to complete the transaction"),(0,n.yg)("div",null,(0,n.yg)("br",null),"[Samurai Wallet and MetaMask Wallet are operated basically in the same way. Here we take Samurai Wallet as an example]",(0,n.yg)("br",null)),(0,n.yg)("h3",{id:"select-platon-hardware-driver-application"},"Select PlatON hardware driver application"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Prerequisites: Prepare the environment stated in the above [1.]; then the Ledger hardware wallet needs to enter the PlatON application, till it reads [application is ready], as shown in Figure 2.1.1;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.1.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.1.1"),(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h3",{id:"samurai-pair-and-unlock-ledger-hardware-wallet"},"Samurai pair and unlock Ledger hardware wallet"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Create an account randomly with Samurai, enter the main page of Samurai Wallet, and select [Link Hardware Wallet] to pair, as shown in Figure 2.2.1; after the link is successfully paired, select the account to unlock the hardware wallet, as shown in Figure 2.2.2;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.2.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.2.1"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.2.2.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.2.2"),(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h3",{id:"ledger-hardware-wallet-completes-signature-transfer-transaction"},"Ledger hardware wallet completes signature transfer transaction"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Now that Samurai reads and enters the hardware wallet page, you can send the transfer, as shown in Figure 2.3.1. The Ledger hardware wallet receives the signature and confirms it, as shown in Figures 2.3.2 and 2.3.3. After confirmation, the transfer is completed, as shown in Figure 2.3.4;",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.3.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.3.1"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.3.2.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.3.2"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.3.3.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.3.3"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure2.3.4.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure2.3.4"),(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h2",{id:"change-pin-identification-code-and-reset-ledger-hardware-wallet"},"Change PIN identification code and reset Ledger hardware wallet"),(0,n.yg)("h3",{id:"change-the-pin-identification-code-in-the-ledger-hardware-wallet"},"Change the PIN identification code in the Ledger hardware wallet"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Press and hold the black and white buttons at the same time for 3 seconds, select [Setting Manage device], as shown in Figure 3.1.1. Select [Security], as shown in Figure 3.1.2. Select [Change PIN] as shown in Figure 3.1.3. Finally, set a new PIN identification code.",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure3.1.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure3.1.1"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure3.1.2.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure3.1.2"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure3.1.3.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure3.1.3"),(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h3",{id:"reset-ledger-hardware-wallet"},"Reset Ledger hardware wallet"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"Press and hold the black and white buttons at the same time for 3 seconds, and select [Setting Manage device], as shown in Figure 3.1.1. Select [Security], as shown in Figure 3.1.2. Select [Reset device] as shown in Figure 3.2.1. To reset, select [Restore from Recovery phrase] (mnemonic phrase) as shown in Figure 1.1.2.",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure3.2.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure3.2.1"),(0,n.yg)("br",null),(0,n.yg)("br",null)),(0,n.yg)("h2",{id:"tip"},"Tip"),(0,n.yg)("div",null,(0,n.yg)("br",null),(0,n.yg)("br",null),"When the Ledger hardware wallet enters the PlatON application, if it is [Pending] without displaying [application is ready], as shown in Figure 4.1.1, you need to unplug the USB and plug it in again or restart it to re-enter the application, until you see [application is ready], as shown in Figure 4.1.2.",(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure4.1.1.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure4.1.1"),(0,n.yg)("br",null),(0,n.yg)("div",null,(0,n.yg)("img",{src:"/docs/en/img/zh-CN/ledger/Figure4.1.2.png",width:"500",style:{zoom:"80%"}})),(0,n.yg)("br",null),(0,n.yg)("div",{class:"text",style:{width:"400px",textAlign:"center"}},"Figure4.1.2"),(0,n.yg)("br",null)))}u.isMDXComponent=!0},5680:(e,r,t)=>{t.d(r,{xA:()=>o,yg:()=>c});var l=t(6540);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);r&&(l=l.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,l)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function g(e,r){if(null==e)return{};var t,l,n=function(e,r){if(null==e)return{};var t,l,n={},i=Object.keys(e);for(l=0;l<i.length;l++)t=i[l],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(l=0;l<i.length;l++)t=i[l],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var d=l.createContext({}),s=function(e){var r=l.useContext(d),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},o=function(e){var r=s(e.components);return l.createElement(d.Provider,{value:r},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var r=e.children;return l.createElement(l.Fragment,{},r)}},y=l.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,d=e.parentName,o=g(e,["components","mdxType","originalType","parentName"]),u=s(t),y=n,c=u["".concat(d,".").concat(y)]||u[y]||h[y]||i;return t?l.createElement(c,a(a({ref:r},o),{},{components:t})):l.createElement(c,a({ref:r},o))}));function c(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,a=new Array(i);a[0]=y;var g={};for(var d in r)hasOwnProperty.call(r,d)&&(g[d]=r[d]);g.originalType=e,g[u]="string"==typeof e?e:n,a[1]=g;for(var s=2;s<i;s++)a[s]=t[s];return l.createElement.apply(null,a)}return l.createElement.apply(null,t)}y.displayName="MDXCreateElement"}}]);