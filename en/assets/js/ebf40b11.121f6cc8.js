"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1736],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>y});var a=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),c=p(n),g=o,y=c["".concat(s,".").concat(g)]||c[g]||u[g]||l;return n?a.createElement(y,i(i({ref:t},d),{},{components:n})):a.createElement(y,i({ref:t},d))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=g;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[c]="string"==typeof e?e:o,i[1]=r;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},6233:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>r,toc:()=>s});var a=n(8168),o=(n(6540),n(5680));const l={id:"Become_PlatON_Main_Verification",title:"Run a validator node",sidebar_label:"Run a validator node"},i=void 0,r={unversionedId:"Become_PlatON_Main_Verification",id:"Become_PlatON_Main_Verification",isDocsHomePage:!1,title:"Run a validator node",description:"This guide demonstrates how to install the PlatON Node software on Linux.",source:"@site/../docs/\u6210\u4e3a\u4e3b\u7f51\u9a8c\u8bc1\u8282\u70b9.md",sourceDirName:".",slug:"/Become_PlatON_Main_Verification",permalink:"/docs/en/Become_PlatON_Main_Verification",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/\u6210\u4e3a\u4e3b\u7f51\u9a8c\u8bc1\u8282\u70b9.md",version:"current",frontMatter:{id:"Become_PlatON_Main_Verification",title:"Run a validator node",sidebar_label:"Run a validator node"},sidebar:"docs",previous:{title:"Intro to validator",permalink:"/docs/en/PlatON_Validation_Introduce"},next:{title:"MTool online tutorial",permalink:"/docs/en/OnLine_MTool_Manual"}},s=[{value:"System Requirements",id:"system-requirements",children:[]},{value:"Installation Overview",id:"installation-overview",children:[]},{value:"Installing on Ubuntu",id:"installing-on-ubuntu",children:[]},{value:"Generate keys",id:"generate-keys",children:[]},{value:"Join the PlatON main network",id:"join-the-platon-main-network",children:[{value:"Join the Main Network",id:"join-the-main-network",children:[]},{value:"View node status",id:"view-node-status",children:[]}]},{value:"Upgrade to Validator Node",id:"upgrade-to-validator-node",children:[{value:"Install PlatON MTool",id:"install-platon-mtool",children:[]},{value:"Configure PlatON MTool",id:"configure-platon-mtool",children:[]},{value:"Initiate a staking operation",id:"initiate-a-staking-operation",children:[]}]}],p={toc:s},d="wrapper";function c(e){let{components:t,...n}=e;return(0,o.yg)(d,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"This guide demonstrates how to install the PlatON Node software on Linux."),(0,o.yg)("h3",{id:"system-requirements"},"System Requirements"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Server: Server and backup server running PlatON software (both have a firewall)"),(0,o.yg)("li",{parentName:"ul"},"Memory: 16GB RAM"),(0,o.yg)("li",{parentName:"ul"},"Local storage: 100GB system disk, 200GB data disk (can be expanded online)"),(0,o.yg)("li",{parentName:"ul"},"Processor: 64-bit 4 cores (each core above 2.4 GHz)"),(0,o.yg)("li",{parentName:"ul"},"Bandwidth: 5 MB/sec (can be expanded online)")),(0,o.yg)("h3",{id:"installation-overview"},"Installation Overview"),(0,o.yg)("p",null,"It takes three or four steps to install a new node, which depends on the operating system used. The detailed procedures are list below."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Installing on Ubuntu (18.04)")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("strong",{parentName:"p"},"Note: Use the normal user to execute the following command."))),(0,o.yg)("h3",{id:"installing-on-ubuntu"},"Installing on Ubuntu"),(0,o.yg)("h4",{id:"install-and-run-ntp-service"},"Install and run NTP service"),(0,o.yg)("h5",{id:"open-a-terminal-and-run-the-following-commands"},"Open a terminal and run the following commands"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"sudo apt-get update &&\nsudo apt-get install -y gnupg2 curl software-properties-common ntp &&\nsudo systemctl enable ntp && sudo systemctl start ntp\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Notes:"),(0,o.yg)("p",{parentName:"blockquote"},"NTP service is used for time synchronization, incorrect system time will affect the normal operation of PlatON")),(0,o.yg)("h5",{id:"validate-the-ntp-time-synchronization"},"Validate the NTP time synchronization"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"ntpq -4c rv | grep leap_none\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Notes:"),(0,o.yg)("p",{parentName:"blockquote"},"Display ",(0,o.yg)("strong",{parentName:"p"},"associd=0 status=0615 ",(0,o.yg)("font",{color:"red"},"leap_none"),", sync_ntp, 1 event, clock_sync,")," where ",(0,o.yg)("inlineCode",{parentName:"p"},"leap_none")," is red, indicating that the NTP time synchronization is normal.")),(0,o.yg)("h4",{id:"install-platon"},"Install PlatON"),(0,o.yg)("p",null,"Ubuntu 18.04\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"sudo wget https://download.platon.network/platon/platon/1.4.4/platon -O /usr/bin/platon\nsudo wget https://download.platon.network/platon/platon/1.4.2/platonkey -O /usr/bin/platonkey\n")),(0,o.yg)("p",null,"Ubuntu 20.04\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"sudo wget https://download.platon.network/platon/platon/ubuntu20.04/1.4.4/platon -O /usr/bin/platon\nsudo wget https://download.platon.network/platon/platon/ubuntu20.04/1.4.2/platonkey -O /usr/bin/platonkey\n")),(0,o.yg)("p",null,"Ubuntu 22.04\uff1a"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"sudo wget https://download.platon.network/platon/platon/ubuntu22.04/1.4.4/platon -O /usr/bin/platon\nsudo wget https://download.platon.network/platon/platon/ubuntu22.04/1.4.2/platonkey -O /usr/bin/platonkey\n")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"sudo chmod +x /usr/bin/platon  /usr/bin/platonkey\nplaton version\n")),(0,o.yg)("p",null,"After executing the commands above,  ",(0,o.yg)("inlineCode",{parentName:"p"},"platon")," and",(0,o.yg)("inlineCode",{parentName:"p"}," platonkey")," binary should be successfully installed in the ",(0,o.yg)("inlineCode",{parentName:"p"},"/usr/bin")," directory on your system. You can execute corresponding commands in any directory."),(0,o.yg)("p",null,"After you execute the platon version, please double check whether your Git Commit value is consistent with the following, if it is consistent, it means that it has been installed correctly:"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"PlatON",(0,o.yg)("br",null),"\nVersion: 1.4.4-unstable",(0,o.yg)("br",null),"\nGit Commit: ",(0,o.yg)("font",{color:"red"},"af1168d0b62febf53913cb1ceebaa6413d3ba9b3"),(0,o.yg)("br",null),"\nGit Commit Date: 20230719",(0,o.yg)("br",null),"\nArchitecture: amd64",(0,o.yg)("br",null),"\nGo Version: go1.22.8",(0,o.yg)("br",null),"\nOperating System: linux",(0,o.yg)("br",null),"\n...",(0,o.yg)("br",null))),(0,o.yg)("h3",{id:"generate-keys"},"Generate keys"),(0,o.yg)("h4",{id:"public-and-private-keys"},"Public and private keys"),(0,o.yg)("p",null,"Each node in the network has an unique identity to distinguish it from others. This identity is a public and private key pair, generated in the node's working directory ( ",(0,o.yg)("inlineCode",{parentName:"p"},"~/platon-node"),") by the following command:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"mkdir -p ~/platon-node/data && platonkey genkeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ~/platon-node/data/nodekey) >(grep \"PublicKey\" | awk '{print $3}' > ~/platon-node/data/nodeid)\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Remark:"),(0,o.yg)("p",{parentName:"blockquote"},"Displays the following, indicating that the key pair has been successfully generated (x stands for number or letter) :"),(0,o.yg)("p",{parentName:"blockquote"},"PrivateKey:  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),(0,o.yg)("p",{parentName:"blockquote"},"PublicKey: :  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")),(0,o.yg)("p",null," ",(0,o.yg)("inlineCode",{parentName:"p"},"PrivateKey")," is the private key of the node, and",(0,o.yg)("inlineCode",{parentName:"p"}," PublicKey")," is the public key of the node. The public key is used to identify the identity of the node and can be made public."),(0,o.yg)("p",null,"Two files will be generated in the subdirectory ",(0,o.yg)("inlineCode",{parentName:"p"},"data")," under the working directory of the node\uff1a"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"nodeid: node public key (ID) file,  which holds the node's public key"),(0,o.yg)("li",{parentName:"ul"},"nodekey: node private key file, which holds the node's private key")),(0,o.yg)("h4",{id:"bls-public-and-private-key"},"BLS public and private key"),(0,o.yg)("p",null,"In addition to the public and private keys of the node, the PlatON node also needs a key pair called the BLS public and private key. This key pair will be used in the consensus protocol. The key pair can be generated in the node's working directory (such as ",(0,o.yg)("inlineCode",{parentName:"p"},"~/platon-node"),")  by the following command:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"mkdir -p ~/platon-node/data && platonkey genblskeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ~/platon-node/data/blskey) >(grep \"PublicKey\" | awk '{print $3}' > ~/platon-node/data/blspub)\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"PrivateKey:  f22a785c80bd1095beff1f356811268eae6c94abf0b2b4e2d64918957b74783e\nPublicKey :  4bf873a66df92ada50a8c6bacb132ffd63437bcde7fd338d2d8696170034a6332e404ac3abb50326ee517ec5f63caf12891ce794ed14f8528fa7c54bc0ded7c5291f708116bb8ee8adadf1e88588866325d764230f4a45929d267a9e8f264402")),(0,o.yg)("p",null," ",(0,o.yg)("inlineCode",{parentName:"p"},"PrivateKey")," is the BLS private key of the node, and",(0,o.yg)("inlineCode",{parentName:"p"}," PublicKey")," is the BLS public key of the node. The BLS public key is used to quickly verify the signature in the consensus protocol and can be published. The BLS private key cannot be made public and needs to be backed up."),(0,o.yg)("p",null,"Two files will be generated in the subdirectory ",(0,o.yg)("inlineCode",{parentName:"p"},"data")," under the working directory of the node:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"blspub: Node BLS public key file, which holds the node's BLS public key")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"blskey: Node BLS private key file, which holds the node's BLS private key"))),(0,o.yg)("h2",{id:"join-the-platon-main-network"},"Join the PlatON main network"),(0,o.yg)("p",null,"PlatON mainnet launch date to be determined, Chainid to be determined."),(0,o.yg)("p",null,"This section assumes that the server is Ubuntu 18.04, and the working directory of the executable file is ",(0,o.yg)("inlineCode",{parentName:"p"},"~/platon-node"),". Note that all subsequent commands should be run under the same working directory."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"cd ~/platon-node\n")),(0,o.yg)("h3",{id:"join-the-main-network"},"Join the Main Network"),(0,o.yg)("p",null,"Anyone or any organization can join PlatON main network."),(0,o.yg)("h4",{id:"start-as-a-validator-node"},"Start as a validator node"),(0,o.yg)("p",null,"Execute the following command to start the verification node to join the main network of Platon (please access it after the main network is online)"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},'nohup platon --identity platon --datadir ./data --port 16789 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --http.addr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &\n')),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Prompt:")),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:null},(0,o.yg)("strong",{parentName:"th"},"Parameters")),(0,o.yg)("th",{parentName:"tr",align:null},(0,o.yg)("strong",{parentName:"th"},"Description")))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--identity"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify the network name")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--datadir"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify the data directory path")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--port"),(0,o.yg)("td",{parentName:"tr",align:null},"Specifying the P2P port number, TCP and UDP protocol corresponding ports need to be open to all hosts on the host firewall")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--http.addr"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify rpc server address")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--http.port"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify the RPC protocol communication port, and open the TCP protocol corresponding port on the host firewall where MTool is located")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--http.api"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify the rpcapi name open by the node")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--http"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify http-rpc communication method")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--nodekey"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify the node private key file")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--cbft.blskey"),(0,o.yg)("td",{parentName:"tr",align:null},"Specify the node bls private key file")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--verbosity"),(0,o.yg)("td",{parentName:"tr",align:null},"The level of logging, 0: CRIT;  1: ERROR; 2: WARN;  3: INFO;  4: DEBUG; 5: TRACE")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--syncmode"),(0,o.yg)("td",{parentName:"tr",align:null},"fast: Fast synchronization mode, full: All synchronous mode")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--db.nogc"),(0,o.yg)("td",{parentName:"tr",align:null},"Enable archive mode")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"--allow-insecure-unlock"),(0,o.yg)("td",{parentName:"tr",align:null},"Enable unlockAccount function")))),(0,o.yg)("p",null,"See more parameters with the command ",(0,o.yg)("inlineCode",{parentName:"p"},"platon --help")),(0,o.yg)("h3",{id:"view-node-status"},"View node status"),(0,o.yg)("p",null,"When PlatON is successfully started, under normal circumstances, it will automatically establish a connection with the node closest to it through the node discovery protocol. After the connection is successful, block synchronization will be started. You can determine whether joining the network successfully by looking at the peers of the node and confirming whether the block height of the node is increasing."),(0,o.yg)("p",null,"If the key is not generated in advance, the node is automatically generated in the node's data directory at startup. If it is automatically generated, only the node private key and BLS private key will be generated, and the relevant public key will not be automatically generated."),(0,o.yg)("h4",{id:"enter-platon--console"},"Enter ",(0,o.yg)("inlineCode",{parentName:"h4"},"PlatON ")," console"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"platon attach http://localhost:6789\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Print ",(0,o.yg)("inlineCode",{parentName:"p"},"Welcome to the Platon JavaScript Console!")," Relevant information, indicating successful access to the console, otherwise it will be deemed as failure to access the console, if there is any problem, you can contact the official customer service personnel.")),(0,o.yg)("h4",{id:"view-peers-of-a-node"},"View peers of a node"),(0,o.yg)("p",null,"View the connection node information by executing the following command in the Platon console."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"admin.peers\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"If the related Peers information is printed, it means that the connected node is successful, as follows:"),(0,o.yg)("p",{parentName:"blockquote"},"[{\ncaps: ",'["cbft/1", "platon/66"]',',\nid: "c72a4d2cb8228ca6f9072daa66566bcafa17bec6a9e53765c85c389434488c393357c5c7c5d18cf9b26ceda46aca4da20755cd01bcc1478fff891a201042ba84",\nname: "PlatONnetwork/alaya-47.241.93.189/v1.0.0-unstable-62b9a900/linux-amd64/go1.13.4",\nnetwork: {\nconsensus: false,\ninbound: false,\nlocalAddress: "192.168.2.128:55572",\nremoteAddress: "47.241.93.189:16789",\nstatic: false,\ntrusted: false\n},\nprotocols: {\ncbft: {\ncommitBn: 1404934,\nhighestQCBn: 1407304,\nlockedBn: 1404935,\nprotocolVersion: 1\n},\nplaton: {\nhead: "0xf31395262f876935c94e33b1d9f3314b2cb6effc33fcffa3b17b725678fd525f",\nnumber: 1407295,\nversion: 63\n}\n}\n}'),(0,o.yg)("p",{parentName:"blockquote"},"...]"),(0,o.yg)("p",{parentName:"blockquote"},"If the printed information is empty, it means that the connection node failed. If there is any problem, you can contact the official customer service personnel.")),(0,o.yg)("h4",{id:"view-the-current-block-height"},"View the current block height"),(0,o.yg)("p",null,"View the block height of the current node by executing the following command in the Platon console."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"platon.blockNumber\n")),(0,o.yg)("blockquote",null,(0,o.yg)("ul",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Execute this command several times, if the block height value increases continuously, then the connection is successful;")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"If it is a new node and the block height is always 0, it means that the node is in the synchronous block and there may be delay. You can use the command:"),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"platon.syncing\n")),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"If ",(0,o.yg)("inlineCode",{parentName:"p"},"false")," is printed, the node is not in a synchronous block state.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"If the following message is printed, the node is in a synchronous block state;"),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-json"},"{\n  currentBlock: 1412416,\n  highestBlock: 1416699,\n  knownStates: 522,\n  pulledStates: 522,\n  startingBlock: 1408247\n}\n"))))))),(0,o.yg)("h4",{id:"exit-console"},"Exit console"),(0,o.yg)("p",null,"Type Exit to exit the console."),(0,o.yg)("h2",{id:"upgrade-to-validator-node"},"Upgrade to Validator Node"),(0,o.yg)("p",null,"PlatON is a blockchain project that implements democratic governance. Verification nodes are jointly selected by all LAT holders to maintain and develop the PlatON network. The 201 nodes with the most votes will become candidate nodes, from which 43 verification nodes will be randomly selected using VRF to participate in the management of the entire PlatON network."),(0,o.yg)("p",null,"This section describes how to operate as a validator node."),(0,o.yg)("h3",{id:"install-platon-mtool"},"Install PlatON MTool"),(0,o.yg)("p",null,"Proceed as follows:"),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Step1. Download PlatON MTool toolkit")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"cd ~ && wget https://download.platon.network/platon/mtool/linux/1.1.1/platon_mtool.zip\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Step2. Extract the PlatON MTool toolkit")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip platon_mtool.zip && cd platon_mtool\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Step3. Download script")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"The script is downloaded to the ",(0,o.yg)("font",{color:"red"},"platon_mtool")," directory, otherwise the script cannot find the path of the new version of mtool.")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"wget https://download.platon.network/platon/scripts/mtool_install.sh\n")),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Step4. Execute command")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"chmod +x mtool_install.sh && ./mtool_install.sh\n")),(0,o.yg)("blockquote",null,(0,o.yg)("ul",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ul"},"When the message ",(0,o.yg)("font",{color:"red"},"Install platon mtool succeed.")," is displayed, PlatON MTool is successfully installed. If it is not successfully installed, please contact our official customer service to provide feedback on specific issues."))),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Step5. Restart the session window")),(0,o.yg)("p",null,"After installation is complete, you need to ",(0,o.yg)("font",{color:"red"},"restart the session window (do not restart the server, close the session window or SSH tool to reopen the window)")," for the newly added environment variables to take effect."),(0,o.yg)("h3",{id:"configure-platon-mtool"},"Configure PlatON MTool"),(0,o.yg)("h4",{id:"generate-wallet"},"Generate wallet"),(0,o.yg)("p",null,"To participate in the verification node to produce blocks, two wallets must be created. ",(0,o.yg)("font",{color:"red"}," If you want to create a node using an existing wallet, rename the wallet file for the mortgaging account to ",(0,o.yg)("inlineCode",{parentName:"p"},"staking.json"),", rename the wallet file for the income account to ",(0,o.yg)("inlineCode",{parentName:"p"},"reward.json"),", and copy the wallet file to the ",(0,o.yg)("inlineCode",{parentName:"p"},"$PLATON_MTOOLDIR/keystore")," directory to")," ",(0,o.yg)("a",{parentName:"p",href:"#configure-verification-node-information"},"skip this step"),"."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Staking wallet: The staking wallet is used to stake tokens. To become a candidate node, you must stake successfully. Run the following command to create a staking wallet:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"platon_mtool account new staking\n")),(0,o.yg)("p",null,"Enter the password once and confirm the password again to create a wallet file. After the creation is successful, a staking wallet file ",(0,o.yg)("inlineCode",{parentName:"p"},"staking.json")," will be generated in the directory",(0,o.yg)("inlineCode",{parentName:"p"}," $PLATON_MTOOLDIR/keystore"),"."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Reward wallet: It is used to collect block rewards and staking rewards. Staking rewards are uniformly distributed to verification nodes, which are distributed by the verification nodes themselves. Run the following command to create a reward wallet")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"platon_mtool account new reward\n")),(0,o.yg)("p",null,"Enter the password once and confirm the password again to create the wallet file. After the creation is successful, the staking wallet file ",(0,o.yg)("inlineCode",{parentName:"p"},"reward.json")," will be generated in the directory",(0,o.yg)("inlineCode",{parentName:"p"}," $PLATON_MTOOLDIR/keystore"),"."),(0,o.yg)("h4",{id:"configure-verification-node-information"},"Configure verification node information"),(0,o.yg)("h5",{id:"download-the-script"},"Download the script"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"cd $PLATON_MTOOLDIR && wget https://download.platon.network/platon/scripts/validator_conf.sh\n")),(0,o.yg)("h5",{id:"run-the-script-configuration"},"Run the script configuration"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"chmod +x validator_conf.sh && ./validator_conf.sh\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("strong",{parentName:"p"},"Note:")),(0,o.yg)("ul",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ul"},'When  the prompt shows "Please enter the platon node IP address:", please enter the PlatON node server ip address.'),(0,o.yg)("li",{parentName:"ul"},'When  the prompt shows "validator conf success",  and when the validator_config.json content printed at the end is normal, it means that the script is executed successfully. If the script is not executed successfully, please contact our official customer service to feedback specific questions.'))),(0,o.yg)("h5",{id:"validator-node-information-configuration-file-description"},"Validator node information configuration file description"),(0,o.yg)("p",null,"After the configuration of the validator node information is completed, the validator node information file validator_config.json will be generated in the validator subdirectory of the PlatON MTool installation directory. The file content is as follows:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "nodePublicKey": "0abaf3219f454f3d07b6cbcf3c10b6b4ccf605202868e2043b6f5db12b745df0604ef01ef4cb523adc6d9e14b83a76dd09f862e3fe77205d8ac83df707969b47",\n    "blsPubKey": "82d740cbc0314ec558c5426f88fdad6f07a07f9846c6be4e40cd628b74b9f641ddad01e4c281a2c3693f8ff2a73a410297aff379ee0575127d51de99b97acc9a1b7bc8ca132ef6f0379a3ec9d76a603d623176e49e1c53e87fead36317895099",\n    "nodeAddress": "http://192.168.120.146",\n    "nodePort": "16789",\n    "nodeRpcPort": "6789"\n}\n')),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("strong",{parentName:"p"},"Parameter description:")),(0,o.yg)("ul",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ul"},"nodePublicKey: Node ID, which can be viewed in the nodeid file under the node data directory data"),(0,o.yg)("li",{parentName:"ul"},"blsPubKey: BLS public key, which can be viewed in the blspub file under the node data directory data."),(0,o.yg)("li",{parentName:"ul"},"nodeAddress: If PlatON MTool and the node are on the same machine or in the same local area network, you can use the intranet IP, otherwise use the public IP whose format is: ",(0,o.yg)("inlineCode",{parentName:"li"},"http://18.238.183.12"),"."),(0,o.yg)("li",{parentName:"ul"},"nodePort: Node P2P port, default is 16789."),(0,o.yg)("li",{parentName:"ul"},"nodeRpcPort: rpc port, the default port is 6789."))),(0,o.yg)("h5",{id:"custom-platscan-avatar"},"Custom PlatScan avatar"),(0,o.yg)("p",null,"If users do not need to display their specified avatar on PlatScan, they can skip this step. Otherwise, the following operations are required:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Register a keybase account")),(0,o.yg)("p",{parentName:"li"},"Users first need to register on the official website of  ",(0,o.yg)("a",{parentName:"p",href:"https://keybase.io/"},"keybase.io")," . If they have already registered, they can log on the official website of keybase.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Upload specified avatar")),(0,o.yg)("p",{parentName:"li"},"Click the user avatar to upload the avatar.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Generate PGP key")),(0,o.yg)("p",{parentName:"li"},"If the user has a ",(0,o.yg)("inlineCode",{parentName:"p"},"PGP key"),", after a successful login, a series of 16-bit public keys will be displayed next to the user's avatar, such as: ",(0,o.yg)("inlineCode",{parentName:"p"},"EB621920A48D0699"),"; if the user does not already have a ",(0,o.yg)("inlineCode",{parentName:"p"},"PGP key"),", click ",(0,o.yg)("inlineCode",{parentName:"p"},"add a PGP key")," next to the user's avatar to generate.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Specify the externalId value")),(0,o.yg)("p",{parentName:"li"},"When issuing the staking operation, specify the ",(0,o.yg)("inlineCode",{parentName:"p"},"--external_id")," parameter to be the PGP key generated in the previous step."))),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: After the user completes the staking operation, the avatar customized by the user can be displayed on PlatScan.")),(0,o.yg)("h3",{id:"initiate-a-staking-operation"},"Initiate a staking operation"),(0,o.yg)("p",null,"If the consensus node deployment is complete and is catching up the blocknumber of ",(0,o.yg)("a",{parentName:"p",href:"https://scan.platon.network/?lang=en"},"Platscan"),", you can use PlatON MTool for staking operations. Please ensure that the balance of the staking account is sufficient before staking. The minimum threshold for staking is one hundred thousand LAT. "),(0,o.yg)("p",null,"Note: "),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Please keep at least 1 LAT in the staking account, so that the transactions initiated by the subsequent node management have sufficient transaction fees, such as voting for upgrade proposals, and unsecured transactions.")),(0,o.yg)("p",null,"Excuting command"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"platon_mtool staking --config $PLATON_MTOOLDIR/validator/validator_config.json --keystore $PLATON_MTOOLDIR/keystore/staking.json --autoamount 100000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 5000 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312\n")),(0,o.yg)("p",null,"Enter the password of the staking wallet and press Enter. If the following information is displayed, the staking is successful:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"operation finished\ntransaction hash:\n0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b\nSUCCESS\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("strong",{parentName:"p"},"Parameter description:")),(0,o.yg)("ul",{parentName:"blockquote"},(0,o.yg)("li",{parentName:"ul"},"config\uff1anode configuration file"),(0,o.yg)("li",{parentName:"ul"},"keystore: staking wallet file"),(0,o.yg)("li",{parentName:"ul"},"amount: staking amount, not less than 100000LAT-staking threshold, no more than 8 decimal places"),(0,o.yg)("li",{parentName:"ul"},"restrictedamount: not less than 100000LAT - staking threshold, no more than 8 decimal points (staking using locked balance)"),(0,o.yg)("li",{parentName:"ul"},"autoamount: Not less than 10000LAT-Priority to use the lock-up balance staking, if the lock-up balance is not enough for the staking deposit, then use free amount staking"),(0,o.yg)("li",{parentName:"ul"},"benefit_address: benefit account to receive block-packing reward and staking reward"),(0,o.yg)("li",{parentName:"ul"},"delegated_reward_rate\uff1aDelegated bonus ratio, type is integer range is ","[","0,10000","]",", unit: ten thousand percent, e.g. enter 5000, it means the bonus ratio is 50%"),(0,o.yg)("li",{parentName:"ul"},"node",(0,o.yg)("em",{parentName:"li"},"name\uff1anode name\uff0c30 bytes(beginning with a letter, including alphabet, number, space, "),", -, #)"),(0,o.yg)("li",{parentName:"ul"},"website\uff1anode website, 30 bytes"),(0,o.yg)("li",{parentName:"ul"},"details\uff1anode description, 280 bytes"),(0,o.yg)("li",{parentName:"ul"},"external_id\uff1anode Icon ID of ",(0,o.yg)("a",{parentName:"li",href:"https://keybase.io"},"keybase.io"),", or identity authentication ID"))))}c.isMDXComponent=!0}}]);