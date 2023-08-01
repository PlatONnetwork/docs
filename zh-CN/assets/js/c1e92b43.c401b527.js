"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8809],{3905:(t,e,a)=>{a.d(e,{Zo:()=>k,kt:()=>c});var r=a(7294);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function s(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},l=Object.keys(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var o=r.createContext({}),p=function(t){var e=r.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},k=function(t){var e=p(t.components);return r.createElement(o.Provider,{value:e},t.children)},u="mdxType",d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,l=t.originalType,o=t.parentName,k=s(t,["components","mdxType","originalType","parentName"]),u=p(a),m=n,c=u["".concat(o,".").concat(m)]||u[m]||d[m]||l;return a?r.createElement(c,i(i({ref:e},k),{},{components:a})):r.createElement(c,i({ref:e},k))}));function c(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=a.length,i=new Array(l);i[0]=m;var s={};for(var o in e)hasOwnProperty.call(e,o)&&(s[o]=e[o]);s.originalType=t,s[u]="string"==typeof t?t:n,i[1]=s;for(var p=2;p<l;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},2073:(t,e,a)=>{a.r(e),a.d(e,{contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>o});var r=a(7462),n=(a(7294),a(3905));const l={id:"PlaTrust_Wallet",title:"PlaTrust\u94b1\u5305",sidebar_label:"PlaTrust\u94b1\u5305"},i="PlaTrust\u94b1\u5305",s={unversionedId:"PlaTrust_Wallet",id:"PlaTrust_Wallet",isDocsHomePage:!1,title:"PlaTrust\u94b1\u5305",description:"\u524d\u8a00",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/PlaTrust\u94b1\u5305.md",sourceDirName:".",slug:"/PlaTrust_Wallet",permalink:"/docs/zh-CN/PlaTrust_Wallet",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/PlaTrust\u94b1\u5305.md",version:"current",frontMatter:{id:"PlaTrust_Wallet",title:"PlaTrust\u94b1\u5305",sidebar_label:"PlaTrust\u94b1\u5305"},sidebar:"docs",previous:{title:"PlatON-Wallet-Plugin-SDK\u63a5\u5165\u624b\u518c",permalink:"/docs/zh-CN/PlatON_wallet_plugin_sdk"},next:{title:"PlaTrust\u94b1\u5305 js-sdk\u8bf4\u660e\u5b89\u88c5\u53ca\u4f7f\u7528\u8bf4\u660e",permalink:"/docs/zh-CN/PlaTrust-wallet-js-sdk"}},o=[{value:"\u524d\u8a00",id:"\u524d\u8a00",children:[]},{value:"\u4ec0\u4e48\u662fPlaTrust\u94b1\u5305",id:"\u4ec0\u4e48\u662fplatrust\u94b1\u5305",children:[]},{value:"\u529f\u80fd\u6982\u8ff0",id:"\u529f\u80fd\u6982\u8ff0",children:[{value:"1. \u57fa\u4e8e\u9608\u503c\u7684\u591a\u91cd\u7b7e\u540d",id:"1-\u57fa\u4e8e\u9608\u503c\u7684\u591a\u91cd\u7b7e\u540d",children:[]},{value:"2. \u514d\u591a\u91cd\u7b7e\u540d session",id:"2-\u514d\u591a\u91cd\u7b7e\u540d-session",children:[]},{value:"3. \u94b1\u5305\u9501\u5b9a",id:"3-\u94b1\u5305\u9501\u5b9a",children:[]},{value:"4. \u81ea\u5b9a\u4e49\u6a21\u5757",id:"4-\u81ea\u5b9a\u4e49\u6a21\u5757",children:[]},{value:"5. \u94b1\u5305\u6062\u590d",id:"5-\u94b1\u5305\u6062\u590d",children:[]},{value:"6. \u81ea\u5b9a\u4e49\u89d2\u8272\u63a7\u5236",id:"6-\u81ea\u5b9a\u4e49\u89d2\u8272\u63a7\u5236",children:[]},{value:"7. gasless",id:"7-gasless",children:[]},{value:"8. \u94b1\u5305\u5347\u7ea7",id:"8-\u94b1\u5305\u5347\u7ea7",children:[]},{value:"9. \u5e10\u6237\u767d\u540d\u5355",id:"9-\u5e10\u6237\u767d\u540d\u5355",children:[]},{value:"10. \u6297\u5ba1\u67e5\u6027",id:"10-\u6297\u5ba1\u67e5\u6027",children:[]},{value:"11. \u591a\u94fe\u652f\u6301",id:"11-\u591a\u94fe\u652f\u6301",children:[]}]},{value:"\u53c2\u8003",id:"\u53c2\u8003",children:[]}],p={toc:o},k="wrapper";function u(t){let{components:e,...a}=t;return(0,n.kt)(k,(0,r.Z)({},p,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"platrust\u94b1\u5305"},"PlaTrust\u94b1\u5305"),(0,n.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,n.kt)("p",null,"Web3 \u65e0\u7591\u662f\u8fd1\u4e9b\u5e74\u6700\u70ed\u95e8\u7684\u7684\u6280\u672f\u8bdd\u9898\u3002\u6572\u5f00Web3\u5927\u95e8\u7684\u94a5\u5319\u5c31\u662f\u4e00\u628a\u79c1\u94a5\uff0c\u800c\u5bf9\u4e8e\u5f88\u591a\u8fd8\u505c\u7559\u5728Web2\u7684\u7528\u6237\u6765\u8bf4\uff0c\u4e60\u60ef\u4e8e\u4f7f\u7528\u8d26\u6237\u540d\u52a0\u5bc6\u7801\u7684\u5f62\u5f0f\u8fdb\u884c\u767b\u5f55Web2\uff0c\u79c1\u94a5\u5219\u662f\u963b\u788dWeb2\u7528\u6237\u8fdb\u5165Web3\u7684\u62e6\u8def\u864e\uff0c\u4e00\u957f\u4e32\u7684\u5341\u516d\u8fdb\u5236\u65e0\u89c4\u5219\u5b57\u7b26\u6216\u8005\u957f\u4f20\u65e0\u89c4\u5219\u7684\u52a9\u8bb0\u8bcd\u90fd\u4f1a\u8ba9\u4eba\u89c9\u5f97\u5934\u5927\uff0c\u800c\u79c1\u94a5\u5f15\u5165\u7684\u53e6\u4e00\u4e2a\u95ee\u9898\u5c31\u662f\u5f53\u79c1\u94a5\u4e22\u5931\u540e\u76f8\u5f53\u4e8e\u5728Web3\u4e2d\u7684\u8d44\u4ea7\u4e22\u5931\uff0c\u6545\u79c1\u94a5\u5b89\u5168\u5b58\u50a8\u5c31\u5f88\u582a\u5fe7\u3002\u6b64\u5916\uff0c\u968f\u7740\u516c\u94fe\u751f\u6001\u7684\u6269\u5927\uff0cdapp\u8d8a\u6765\u8d8a\u591a\u5bfc\u81f4gas fee\u4e5f\u8d8a\u6765\u8d8a\u9ad8\uff0c\u666e\u901a\u7528\u6237\u76f4\u63a5\u5c31\u88ab\u5de8\u989d\u7684\u624b\u7eed\u8d39\u5f53\u5728Web3\u7684\u95e8\u5916\u3002\u90a3\u4e48\u5728\u8fd9\u79cd\u573a\u666f\u4e0b\u6709\u6ca1\u6709\u4e00\u79cd\u7528\u6237\u4e0d\u9700\u8981\u8bb0\u5f55\u79c1\u94a5\u6216\u8005\u52a9\u8bb0\u8bcd (seedless) \u548c\u4e0d\u9700\u8981\u82b1\u8d39\u5de8\u989d\u624b\u7eed\u8d39 (gasless) \u7684\u94b1\u5305\u5462\uff1f\u7b54\u6848\u5c31\u662f\u59d4\u6258\u7ed9\u522b\u4eba\u53bb\u505a\u3002\u4f46\u662f\u59d4\u6258\u7ed9\u522b\u4eba\u5c31\u9884\u793a\u8fd9\u81ea\u5df1\u5728Web3\u7684\u8d44\u4ea7\u4ea7\u751f\u4e0d\u4fe1\u4efb\u5371\u673a\u3002\u8fd9\u65f6\u5019\uff0c\u57fa\u4e8e EIP-4337 \u62bd\u8c61\u8d26\u6237\u7684\u591a\u7b7e\u5408\u7ea6\u94b1\u5305\u5c31\u5b8c\u7f8e\u7684\u89e3\u51b3\u4e86\u4e0a\u8ff0\u75db\u70b9\u4e86\u3002"),(0,n.kt)("p",null,"\u4e3b\u8981\u7684\u5e94\u7528\u6709\u5982\u4e0b\u573a\u666f\uff1a"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u516c\u53f8\u548c\u5408\u7ea6\u53ef\u4ee5\u5b89\u5168\u5730\u6301\u6709\u4ed6\u4eec\u7684\u8d44\u91d1\uff0c\u5e76\u8981\u6c42\u5927\u591a\u6570\u6240\u6709\u8005\u63a5\u53d7\u8f6c\u79fb\u8d44\u91d1\u3002\u6240\u4ee5\u6ca1\u6709\u4e00\u4e2a\u6240\u6709\u8005\u53ef\u4ee5\u5e26\u7740\u94b1\u8dd1\u3002"),(0,n.kt)("li",{parentName:"ol"},"\u516c\u53f8\u53ef\u4ee5\u5728\u5927\u591a\u6570\u6240\u6709\u8005\u7684\u5171\u8bc6\u4e0b\u6267\u884c\u654f\u611f\u4ea4\u6613\u3002"),(0,n.kt)("li",{parentName:"ol"},"\u4e2a\u4eba\u53ef\u4ee5\u4f7f\u7528multisig\u6765\u62e5\u6709\u94a5\u5319\u7684\u5197\u4f59\u5ea6\u3002\u591a\u91cd\u8ba4\u8bc1\u7684\u4e00\u4e2a\u7279\u6027\u662f\uff0c\u5982\u679c\u4f60\u4e22\u5931\u4e86\u4e00\u628a\u94a5\u5319\uff0c\u4f60\u53ef\u4ee5\u7528\u5269\u4e0b\u7684\u4e24\u628a\u94a5\u5319\u6062\u590d\u94b1\u5305\u3002")),(0,n.kt)("h2",{id:"\u4ec0\u4e48\u662fplatrust\u94b1\u5305"},"\u4ec0\u4e48\u662fPlaTrust\u94b1\u5305"),(0,n.kt)("p",null,"PlaTrust\u94b1\u5305\u662f\u4e00\u79cd\u9075\u5faaEIP-4337\u89c4\u8303\u7684\u591a\u91cd\u7b7e\u540d\u5408\u7ea6\u94b1\u5305\u3002\u5b83\u964d\u4f4e\u4e86Web2\u7528\u6237\u8fdb\u5165Web3\u7684\u969c\u788d\uff0c\u5e76\u63d0\u4f9b\u4ee5\u4e0b\u4e3b\u8981\u529f\u80fd\uff1a"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#1."},(0,n.kt)("strong",{parentName:"a"},"\u57fa\u4e8e\u9608\u503c\u7684\u591a\u91cd\u7b7e\u540d\uff1a"))," \u57fa\u4e8e\u6307\u5b9a\u7684\u9608\u503c\u4ee5\u591a\u91cd\u7b7e\u540d\u5f62\u5f0f\u7ba1\u7406\u8d44\u4ea7\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#2."},(0,n.kt)("strong",{parentName:"a"},"\u514d\u591a\u91cd\u7b7e\u540dsession\uff1a"))," \u5728\u7279\u5b9a\u65f6\u95f4\u7a97\u53e3\u5185\u542f\u7528\u514d\u591a\u91cd\u7b7e\u540d\u64cd\u4f5c\uff0c\u4e3a\u7528\u6237\u94b1\u5305\u64cd\u4f5c\u63d0\u4f9b\u4fbf\u5229\u3002 "),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#3."},(0,n.kt)("strong",{parentName:"a"},"\u94b1\u5305\u9501\u5b9a\uff1a"))," \u5141\u8bb8\u5728\u6240\u6709\u8005\u6000\u7591\u5176\u8d26\u6237\uff08\u8bbe\u5907\uff09\u88ab\u7be1\u6539\uff08\u4e22\u5931\u3001\u88ab\u76d7\u7b49\uff09\u65f6\u5bf9\u94b1\u5305\u8fdb\u884c\u9501\u5b9a\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#4."},(0,n.kt)("strong",{parentName:"a"},"\u81ea\u5b9a\u4e49\u6a21\u5757\uff1a"))," \u652f\u6301\u7528\u6237\u5b9a\u4e49\u7684\u6a21\u5757\uff0c\u53ef\u6dfb\u52a0\u5230\u94b1\u5305\u4e2d\u5f15\u5165\u81ea\u5b9a\u4e49\u6269\u5c55\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#5."},(0,n.kt)("strong",{parentName:"a"},"\u94b1\u5305\u6062\u590d\uff1a"))," \u901a\u8fc7\u5176\u4ed6\u6240\u6709\u8005\u53d1\u8d77\u7684\u591a\u91cd\u7b7e\u540d\u6765\u66ff\u6362\u4e22\u5931\u7684\u79c1\u94a5\uff0c\u6062\u590d\u94b1\u5305\u7684\u6240\u6709\u6743\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#6."},(0,n.kt)("strong",{parentName:"a"},"\u81ea\u5b9a\u4e49\u89d2\u8272\u63a7\u5236\uff1a"))," \u7528\u6237\u53ef\u4ee5\u5b9a\u4e49\u4e0d\u540c\u7684\u89d2\u8272\u4fe1\u606f\uff0c\u4ee5\u63a7\u5236\u94b1\u5305\u4e2d\u7684\u8d44\u4ea7\u64cd\u4f5c\u6743\u9650\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#7."},(0,n.kt)("strong",{parentName:"a"},"\u65e0\u9700gas\uff1a"))," \u7528\u6237\u53ef\u4ee5\u5728\u65e0\u9700\u652f\u4ed8\u539f\u751f\u4ee3\u5e01\u4f5c\u4e3agas\u8d39\u7528\u7684\u60c5\u51b5\u4e0b\u64cd\u4f5c\u94b1\u5305\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#8."},(0,n.kt)("strong",{parentName:"a"},"\u94b1\u5305\u5347\u7ea7\uff1a"))," \u5f53\u51fa\u73b0\u65b0\u529f\u80fd\u6216\u91cd\u5927\u6f0f\u6d1e\u65f6\uff0c\u53ef\u4ee5\u5347\u7ea7\u94b1\u5305\u5230\u6700\u65b0\u7248\u672c\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#9."},(0,n.kt)("strong",{parentName:"a"},"\u8d26\u6237\u767d\u540d\u5355\uff1a"))," \u8bbe\u7f6e\u8d26\u6237\u767d\u540d\u5355\uff0c\u5141\u8bb8\u67d0\u4e9b\u8d26\u6237\u6267\u884c\u8de8\u8d26\u6237\u64cd\u4f5c\u6216\u8f6c\u8d26\u800c\u4e0d\u8003\u8651\u4fe1\u4efb\u95ee\u9898\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#10."},(0,n.kt)("strong",{parentName:"a"},"\u62b5\u5236\u5ba1\u67e5\uff1a"))," \u7528\u6237\u5b8c\u5168\u63a7\u5236\u5176\u8d26\u6237\uff0c\u65e0\u9700\u4f9d\u8d56\u4efb\u4f55\u7b2c\u4e09\u65b9\u670d\u52a1\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"#11."},(0,n.kt)("strong",{parentName:"a"},"\u591a\u94fe\u652f\u6301\uff1a"))," \u517c\u5bb9\u6240\u6709EVM\u517c\u5bb9\u7684\u516c\u5171\u533a\u5757\u94fe\uff0c\u786e\u4fdd\u5728\u4e0d\u540cEVM\u517c\u5bb9\u7684\u533a\u5757\u94fe\u4e0a\u5177\u6709\u76f8\u540c\u7684\u94b1\u5305\u5730\u5740\u3002")),(0,n.kt)("h2",{id:"\u529f\u80fd\u6982\u8ff0"},"\u529f\u80fd\u6982\u8ff0"),(0,n.kt)("span",{id:"1."}),(0,n.kt)("h3",{id:"1-\u57fa\u4e8e\u9608\u503c\u7684\u591a\u91cd\u7b7e\u540d"},"1. \u57fa\u4e8e\u9608\u503c\u7684\u591a\u91cd\u7b7e\u540d"),(0,n.kt)("h4",{id:"\u89e3\u91ca"},"\u89e3\u91ca"),(0,n.kt)("p",null,"PlaTrust\u94b1\u5305\u662f\u57fa\u4e8eEIP-4337\u89c4\u8303\u7684\u591a\u91cd\u7b7e\u540d\u5408\u7ea6\u94b1\u5305\u3002\u5b83\u652f\u6301\u591a\u4e2a\u6240\u6709\u8005\uff0c\u5e76\u6839\u636e\u591a\u91cd\u7b7e\u540d\u9608\u503c\u63d0\u4f9b\u5404\u79cd\u94b1\u5305\u64cd\u4f5c\u3002\u591a\u91cd\u7b7e\u540d\u7684\u6982\u5ff5\u5982\u4e0b\u6240\u793a\uff1a"),(0,n.kt)("img",{src:"/docs/img/zh-CN/PlaTrust/introduction-muti-sign.jpg",alt:""}),(0,n.kt)("p",null,"\u5bf9\u4e8e\u6bcf\u4e2a\u94b1\u5305\u64cd\u4f5c\uff08\u7279\u522b\u662f\u8d44\u4ea7\u7ba1\u7406\uff09\uff0c\u5fc5\u987b\u7531\u81f3\u5c11\u9608\u503c\u6570\u91cf\u7684\u6240\u6709\u8005\u7b7e\u540d\u3002\u53ea\u6709\u6536\u96c6\u5230\u6240\u9700\u6570\u91cf\u7684\u6240\u6709\u8005\u7b7e\u540d\uff0c\u94b1\u5305\u64cd\u4f5c\u624d\u80fd\u6210\u529f\u6267\u884c\u3002"),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u5728\u4e22\u5931\u79c1\u94a5\u65f6\u6700\u5927\u9650\u5ea6\u4fdd\u62a4\u8d44\u4ea7\uff1a")," \u901a\u8fc7\u6301\u6709\u591a\u4e2a\u79c1\u94a5\uff0c\u7528\u6237\u53ef\u4ee5\u663e\u8457\u964d\u4f4e\u7531\u4e8e\u5355\u4e2a\u79c1\u94a5\u4e22\u5931\u6216\u88ab\u76d7\u800c\u5bfc\u81f4\u8d44\u4ea7\u4e22\u5931\u7684\u98ce\u9669\u3002\u5373\u4f7f\u5176\u4e2d\u4e00\u4e2a\u79c1\u94a5\u53d7\u5230\u5a01\u80c1\uff0c\u8d44\u91d1\u4ecd\u7136\u5b89\u5168\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u901a\u8fc7\u591a\u91cd\u9a8c\u8bc1\u9632\u6b62\u9519\u8bef\u4ea4\u6613\uff1a")," \u5f53\u7528\u6237\u53d1\u8d77\u4ea4\u6613\u65f6\uff0c\u5176\u4ed6\u79c1\u94a5\u6301\u6709\u8005\u53ef\u4ee5\u901a\u8fc7\u62d2\u7edd\u7b7e\u7f72\u4ea4\u6613\u6765\u9632\u6b62\u6267\u884c\u9519\u8bef\u7684\u4ea4\u6613\u3002\u53c2\u4e0e\u9a8c\u8bc1\u8fc7\u7a0b\u7684\u4eba\u8d8a\u591a\uff0c\u53d1\u751f\u9519\u8bef\u4ea4\u6613\u7684\u53ef\u80fd\u6027\u8d8a\u4f4e\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u4fbf\u4e8e\u96c6\u4f53\u51b3\u7b56\u548c\u4ef2\u88c1\uff1a")," \u5f53\u8bb8\u591a\u8054\u7f72\u4eba\u5171\u540c\u7ef4\u62a4\u5bc6\u94a5\u65f6\uff0c\u8d44\u91d1\u63a7\u5236\u53d8\u5f97\u66f4\u52a0\u5b89\u5168\u548c\u6709\u7ec4\u7ec7\u3002\u5728\u8fd9\u79cd\u683c\u5f0f\u4e0b\uff0c\u53ea\u80fd\u5f62\u6210\u548c\u6267\u884c\u4e00\u81f4\u7684\u51b3\u7b56\uff0c\u6709\u6548\u5b9e\u65bd\u826f\u597d\u7684\u51b3\u7b56\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u5206\u6563\u7a83\u53d6\u98ce\u9669\uff1a")," \u901a\u8fc7\u5c06\u5bc6\u94a5\u5206\u5e03\u5728\u4e0d\u540c\u7684\u5730\u7406\u4f4d\u7f6e\u548c\u591a\u4e2a\u8bbe\u5907\u4e0a\uff0c\u7528\u6237\u521b\u5efa\u4e86\u4e00\u4e2a\u5b89\u5168\u7684\u73af\u5883\u3002\u9ed1\u5ba2\u65e0\u6cd5\u7834\u89e3\u591a\u4e2a\u5206\u6563\u7684\u5bc6\u94a5\uff0c\u4ece\u800c\u5c06\u52a0\u5bc6\u8d44\u4ea7\u5b89\u5168\u5730\u4fdd\u7559\u5728\u7528\u6237\u624b\u4e2d\u3002")),(0,n.kt)("span",{id:"2."}),(0,n.kt)("h3",{id:"2-\u514d\u591a\u91cd\u7b7e\u540d-session"},"2. \u514d\u591a\u91cd\u7b7e\u540d session"),(0,n.kt)("h4",{id:"\u89e3\u91ca-1"},"\u89e3\u91ca"),(0,n.kt)("p",null,"\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b\uff0c\u591a\u91cd\u7b7e\u540d\u4f1a\u4e3a\u64cd\u4f5c\u5e26\u6765\u4e0d\u4fbf\u3002\u6bcf\u6b21\u6267\u884c\u94b1\u5305\u64cd\u4f5c\u65f6\uff0c\u90fd\u9700\u8981\u6ee1\u8db3\u591a\u91cd\u7b7e\u540d\u9608\u503c\u7684\u7b7e\u540d\u624d\u80fd\u751f\u6548\u3002\u5982\u679c\u7528\u6237\u5e0c\u671b\u5728\u7279\u5b9a\u65f6\u95f4\u7a97\u53e3\u5185\u6267\u884c\u591a\u7b14\u4ea4\u6613\uff0c\u5e76\u5bfb\u6c42\u8c41\u514d\u591a\u91cd\u7b7e\u540d\u5e76\u83b7\u5f97\u5176\u4ed6\u6240\u6709\u8005\u7684\u8bb8\u53ef\uff0c\u53ef\u4ee5\u901a\u8fc7\u521b\u5efa\u514d\u591a\u91cd\u7b7e\u540d session\u6765\u5b9e\u73b0\u3002session\u5b9a\u4e49\u4e86\u7531\u7279\u5b9a\u6240\u6709\u8005\u6301\u6709\u7684\u4e34\u65f6session key\uff0c\u53ea\u8981session key\u6709\u6548\uff0c\u6301\u6709session\u7684\u6240\u6709\u8005\u5c31\u53ef\u4ee5\u4f7f\u7528\u5b83\u7ed5\u8fc7\u591a\u91cd\u7b7e\u540d\u5e76\u6267\u884c\u4efb\u4f55\u94b1\u5305\u8c03\u7528\u3002session\u7684\u6301\u7eed\u65f6\u95f4\u7531\u6240\u6709\u8005\u5728\u521b\u5efa\u65f6\u5b9a\u4e49\uff0c\u5e76\u4e14session key\u5c06\u5728session\u7ed3\u675f\u65f6\u81ea\u52a8\u8fc7\u671f\u3002"),(0,n.kt)("p",null,"\u542f\u52a8session\u9700\u8981\u6ee1\u8db3\u591a\u91cd\u7b7e\u540d\u9608\u503c\u7684\u7b7e\u540d\u3002\u94b1\u5305\u7684\u6240\u6709\u8005\u53ef\u4ee5\u5728\u5176\u8fc7\u671f\u4e4b\u524d\u968f\u65f6\u5173\u95edsession\u3002"),(0,n.kt)("img",{src:"/docs/img/zh-CN/PlaTrust/introduction-start-session.jpg",alt:""}),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-1"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u4e3a\u7279\u5b9a\u65f6\u95f4\u7a97\u53e3\u5185\u7684\u64cd\u4f5c\u63d0\u4f9b\u4fbf\u5229\uff1a")," \u5728\u6709\u6548\u65f6\u95f4\u7a97\u53e3\u5185\uff0c\u6301\u6709session\u7684\u6240\u6709\u8005\u53ef\u4ee5\u5728\u65e0\u9700\u5176\u4ed6\u6240\u6709\u8005\u53c2\u4e0e\u591a\u91cd\u7b7e\u540d\u7684\u60c5\u51b5\u4e0b\u64cd\u4f5c\u94b1\u5305\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u552f\u4e00\u6027\uff1a")," \u5728\u7ed9\u5b9a\u7684\u65f6\u95f4\u7a97\u53e3\u5185\u53ea\u80fd\u5b58\u5728\u4e00\u4e2asession\uff0c\u5e76\u4e14\u53ea\u6709\u6307\u5b9a\u7684\u6240\u6709\u8005\u53ef\u4ee5\u6301\u6709session\uff0c\u5176\u4ed6\u6240\u6709\u8005\u4e0d\u80fd\u8c41\u514d\u591a\u91cd\u7b7e\u540d\u8c03\u7528\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u65f6\u6548\u6027\uff1a")," session\u5177\u6709\u7279\u5b9a\u7684\u6709\u6548\u65f6\u95f4\u7a97\u53e3\uff0csession key\u5c06\u5728\u6709\u6548\u671f\u7ed3\u675f\u540e\u81ea\u52a8\u8fc7\u671f\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u53ef\u4e2d\u65ad\uff1a")," \u5728session\u7684\u6709\u6548\u671f\u5185\uff0c\u6301\u6709session\u7684\u6240\u6709\u8005\u53ef\u4ee5\u5728\u65e0\u9700\u591a\u91cd\u7b7e\u540d\u7684\u60c5\u51b5\u4e0b\u5173\u95edsession\uff0c\u6216\u8005\u5176\u4ed6\u6240\u6709\u8005\u53ef\u4ee5\u901a\u8fc7\u591a\u91cd\u7b7e\u540d\u5173\u95edsession\u3002")),(0,n.kt)("span",{id:"3."}),(0,n.kt)("h3",{id:"3-\u94b1\u5305\u9501\u5b9a"},"3. \u94b1\u5305\u9501\u5b9a"),(0,n.kt)("h4",{id:"\u89e3\u91ca-2"},"\u89e3\u91ca"),(0,n.kt)("p",null,"\u8be5\u94b1\u5305\u652f\u6301\u9501\u5b9a\u529f\u80fd\uff0c\u5141\u8bb8\u6240\u6709\u8005\u5728\u6000\u7591\u5176\u5e10\u6237\uff08\u8bbe\u5907\uff09\u5b58\u5728\u95ee\u9898\uff08\u4e22\u5931\u3001\u88ab\u76d7\u7b49\uff09\u65f6\u53d1\u8d77\u9501\u5b9a\u671f\u3002\u5728\u94b1\u5305\u7684\u9501\u5b9a\u671f\u95f4\uff0c\u53ea\u5141\u8bb8\u6267\u884c\u7279\u5b9a\u7684\u53d7\u9650\u64cd\u4f5c\uff0c\u5982\u89e3\u9501\u8fc7\u7a0b\u3002\u6240\u6709\u5176\u4ed6\u64cd\u4f5c\uff08\u66f4\u6539owner\u3001\u66f4\u6539\u591a\u91cd\u7b7e\u540d\u9608\u503c\u3001\u8d44\u4ea7\u8f6c\u79fb\u7b49\uff09\u90fd\u5c06\u88ab\u963b\u6b62\u3002\u5728\u5b89\u5168\u671f\u7ed3\u675f\u524d\u89e3\u9501\u94b1\u5305\uff0c\u6240\u6709\u8005\u9700\u8981\u53d1\u8d77\u591a\u91cd\u7b7e\u540d\u89e3\u9501\u4ee5\u89e6\u53d1\u94b1\u5305\u7684\u89e3\u9501\u3002"),(0,n.kt)("img",{src:"/docs/img/zh-CN/PlaTrust/introduction-lock.jpg",alt:""}),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-2"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u4fdd\u62a4\u8d44\u4ea7\u5b89\u5168\uff1a")," \u5f53\u6000\u7591\u94b1\u5305\u5b58\u5728\u5b89\u5168\u95ee\u9898\u65f6\uff0c\u53ef\u4ee5\u9501\u5b9a\u4ee5\u9632\u6b62\u6f5c\u5728\u7684\u8d44\u4ea7\u8f6c\u79fb\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u9650\u5236\u94b1\u5305\u64cd\u4f5c\uff1a")," \u5f53\u94b1\u5305\u53d7\u5230\u653b\u51fb\u65f6\uff0c\u53ef\u4ee5\u9501\u5b9a\u4ee5\u9650\u5236\u94b1\u5305\u8c03\u7528\u3002")),(0,n.kt)("span",{id:"4."}),(0,n.kt)("h3",{id:"4-\u81ea\u5b9a\u4e49\u6a21\u5757"},"4. \u81ea\u5b9a\u4e49\u6a21\u5757"),(0,n.kt)("h4",{id:"\u89e3\u91ca-3"},"\u89e3\u91ca"),(0,n.kt)("p",null,'\u5728PlaTrust\u94b1\u5305\u4e2d\uff0c\u7528\u6237\u53ef\u4ee5\u6269\u5c55\u81ea\u5b9a\u4e49\u529f\u80fd\u7ec4\u4ef6\u5230\u94b1\u5305\u4e2d\u3002\u901a\u8fc7\u90e8\u7f72\u81ea\u5b9a\u4e49\u6a21\u5757\u5408\u7ea6\uff0c\u5e76\u901a\u8fc7"enable module"\u51fd\u6570\u5728\u94b1\u5305\u4e2d\u542f\u7528\u5b83\u4eec\uff0c\u7528\u6237\u53ef\u4ee5\u4e3a\u94b1\u5305\u6fc0\u6d3b\u81ea\u5b9a\u4e49\u529f\u80fd\u7ec4\u4ef6\u3002\u7528\u6237\u53ef\u4ee5\u4ece\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u8c03\u7528\u51fd\u6570\uff0c\u5e76\u6700\u7ec8\u901a\u8fc7',(0,n.kt)("inlineCode",{parentName:"p"},"executeFromModule"),"\u51fd\u6570\u4ece\u6a21\u5757\u5bf9\u94b1\u5305\u8fdb\u884c\u8c03\u7528\u3002\u503c\u5f97\u6ce8\u610f\u7684\u662f\uff0c\u6bcf\u4e2a\u94b1\u5305\u5408\u7ea6\u5b9e\u4f8b\u5728\u521b\u5efa\u65f6\u90fd\u5c06\u8bbe\u7f6eEIP-4337\u5165\u53e3\u5408\u7ea6RelayerManager\u4e3a\u9ed8\u8ba4\u6a21\u5757\uff0c\u5e76\u4e14RelayerManager\u4e0d\u80fd\u88ab\u79fb\u9664\u3002"),(0,n.kt)("img",{src:"/docs/img/zh-CN/PlaTrust/introduction-enable-module.jpg",alt:""}),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-3"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u53ef\u6269\u5c55\u6027\uff1a")," \u7528\u6237\u53ef\u4ee5\u5411\u5176\u94b1\u5305\u9644\u52a0\u81ea\u5b9a\u4e49\u529f\u80fd\u7ec4\u4ef6\uff0c\u4e3a\u94b1\u5305\u5e26\u6765\u5404\u79cd\u6269\u5c55\u3002"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u5373\u63d2\u5373\u7528\uff1a")," \u9664\u4e86\u5185\u7f6e\u7684EIP-4337\u5165\u53e3\u5408\u7ea6RelayerManager\u4e4b\u5916\uff0c\u5176\u4ed6\u81ea\u5b9a\u4e49\u6a21\u5757\u53ef\u4ee5\u81ea\u7531\u542f\u7528\u548c\u7981\u7528\u3002")),(0,n.kt)("span",{id:"5."}),(0,n.kt)("h3",{id:"5-\u94b1\u5305\u6062\u590d"},"5. \u94b1\u5305\u6062\u590d"),(0,n.kt)("h4",{id:"\u89e3\u91ca-4"},"\u89e3\u91ca"),(0,n.kt)("p",null,"\u5408\u7ea6\u94b1\u5305\u6700\u7ec8\u4ecd\u7136\u9700\u8981\u4e00\u4e2a\u5916\u90e8\u62e5\u6709\u8d26\u6237\uff08EOA\uff09\u6765\u6267\u884c\u64cd\u4f5c\u3002\u5982\u679c\u63a7\u5236\u5408\u7ea6\u6240\u6709\u8005\u7684\u79c1\u94a5\u6ca1\u6709\u59a5\u5584\u4fdd\u5b58\uff0c\u53ef\u80fd\u5bfc\u81f4\u79c1\u94a5\u4e22\u5931\u3002\u5f53\u63a7\u5236\u5408\u7ea6\u6240\u6709\u8005\u7684\u79c1\u94a5\u4e22\u5931\u65f6\uff0c\u7528\u6237\u5931\u53bb\u5bf9\u94b1\u5305\u7684\u63a7\u5236\u6743\u3002\u4e3a\u4e86\u9632\u6b62\u8fd9\u79cd\u60c5\u51b5\u53d1\u751f\uff0c\u94b1\u5305\u5305\u542b\u4e86\u94b1\u5305\u6062\u590d\u529f\u80fd\u3002\u5f53\u6240\u6709\u8005\u7684\u79c1\u94a5\u4e22\u5931\u65f6\uff0c\u7528\u6237\u53ef\u4ee5\u53d1\u8d77\u94b1\u5305\u6062\u590d\u529f\u80fd\uff0c\u7528\u65b0\u7684\u79c1\u94a5\u66ff\u6362\u65e7\u7684\u79c1\u94a5\uff0c\u91cd\u65b0\u83b7\u5f97\u5bf9\u94b1\u5305\u7684\u63a7\u5236\u6743\u3002\u66f4\u6362\u65b0\u79c1\u94a5\u9700\u8981\u6765\u81ea\u94b1\u5305\u4e2d\u5176\u4ed6\u6240\u6709\u8005\u7684\u591a\u91cd\u7b7e\u540d\uff0c\u5e76\u4e14\u7b7e\u540d\u6570\u91cf\u5fc5\u987b\u6ee1\u8db3\u591a\u91cd\u7b7e\u540d\u9608\u503c\u3002"),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-4"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u9632\u6b62\u7528\u6237\u56e0\u4e3a\u4e22\u5931\u6240\u6709\u8005\u79c1\u94a5\u800c\u5931\u53bb\u5bf9\u94b1\u5305\u7684\u8bbf\u95ee\u3002"))),(0,n.kt)("span",{id:"6."}),(0,n.kt)("h3",{id:"6-\u81ea\u5b9a\u4e49\u89d2\u8272\u63a7\u5236"},"6. \u81ea\u5b9a\u4e49\u89d2\u8272\u63a7\u5236"),(0,n.kt)("h4",{id:"\u89e3\u91ca-5"},"\u89e3\u91ca"),(0,n.kt)("p",null,"\u5728\u8bb8\u591a\u4e1a\u52a1\u573a\u666f\u4e2d\uff0c\u9700\u8981\u6839\u636e\u4e0d\u540c\u7684\u6743\u9650\u7cbe\u7ec6\u5212\u5206\u94b1\u5305\u7684\u529f\u80fd\uff0c\u6bd4\u5982 admin\u7528\u6237\u53ef\u4ee5\u505a\u4ec0\u4e48\uff0cmanager\u7528\u6237\u53ef\u4ee5\u505a\u4ec0\u4e48\u7b49\u3002\u7ec6\u7c92\u5ea6\u7684\u529f\u80fd\u6743\u9650\u6709\u4e2a\u4f18\u70b9\uff0c\u4e0d\u540c\u89d2\u8272\u53ef\u4ee5\u6267\u884c\u4e0d\u540c\u7684\u529f\u80fd\uff0c\u786e\u4fdd\u6bcf\u4e2a\u89d2\u8272\u5c65\u884c\u81ea\u5df1\u7684\u8d23\u4efb\u3002\u5728PlaTrust\u94b1\u5305\u4e2d\uff0c\u7528\u6237\u53ef\u4ee5\u6dfb\u52a0\u5404\u79cd\u81ea\u5b9a\u4e49\u89d2\u8272\u548c\u6743\u9650\uff0c\u5e76\u6307\u5b9a\u6bcf\u4e2a\u6743\u9650\u89d2\u8272\u53ef\u4ee5\u8c03\u7528\u7684\u529f\u80fd\uff0c\u5b9e\u73b0\u7ec6\u7c92\u5ea6\u7684\u529f\u80fd\u6743\u9650\u63a7\u5236\u3002"),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-5"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u652f\u6301\u7ec6\u7c92\u5ea6\u6743\u9650\u63a7\u5236\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"\u65b9\u4fbf\u7ba1\u7406\u548c\u6269\u5c55\u6743\u9650\u3002"))),(0,n.kt)("span",{id:"7."}),(0,n.kt)("h3",{id:"7-gasless"},"7. gasless"),(0,n.kt)("h4",{id:"\u89e3\u91ca-6"},"\u89e3\u91ca"),(0,n.kt)("p",null,'PlaTrust\u94b1\u5305\u662f\u57fa\u4e8eEIP-4337\u7684\u591a\u91cd\u7b7e\u540d\u5408\u7ea6\u94b1\u5305\uff0cEIP-4337\u6807\u51c6\u539f\u751f\u652f\u6301"\u5143\u4ea4\u6613"\u3002\u5f53\u94b1\u5305\u7684\u6240\u6709\u8005\u6267\u884c\u4e0e\u94b1\u5305\u76f8\u5173\u7684\u529f\u80fd\u65f6\uff0c\u4ed6\u4eec\u4f1a\u7ec4\u88c5\u548c\u7b7e\u7f72\u6240\u8c13\u7684"UserOperation"\u6d88\u606f\uff0c\u7136\u540e\u5c06\u7528\u6237\u64cd\u4f5c\u4f20\u9012\u7ed9\u76f8\u5173\u7684"Bundler"\u670d\u52a1\u4ee5\u8fdb\u884c\u7ec4\u88c5\u548c\u63d0\u4ea4\u7528\u6237\u64cd\u4f5c\u4f5c\u4e3a\u533a\u5757\u94fe\u4ea4\u6613\u3002\u5bf9\u4e8e\u94b1\u5305\u6240\u6709\u8005\uff0c\u4ed6\u4eec\u53ea\u9700\u8981\u7528\u76f8\u5e94\u7684\u6240\u6709\u8005\u79c1\u94a5\u7b7e\u7f72"UserOperation"\u6d88\u606f\uff0c\u800c\u65e0\u9700\u53d1\u9001\u5b9e\u9645\u7684\u533a\u5757\u94fe\u4ea4\u6613\u3002\u56e0\u6b64\uff0c\u4ed6\u4eec\u4e0d\u9700\u8981\u652f\u4ed8\u4efb\u4f55gas\u8d39\u7528\u3002\u5bf9\u4e8eBundler\u670d\u52a1\uff0c\u5f53\u6536\u5230\u7528\u6237\u64cd\u4f5c\u5e76\u6536\u96c6\u5230\u6240\u9700\u7684\u591a\u91cd\u7b7e\u540d\u65f6\uff0c\u5b83\u4f1a\u5c06\u7528\u6237\u64cd\u4f5c\u548c\u591a\u91cd\u7b7e\u540d\u7ec4\u88c5\u6210\u533a\u5757\u94fe\u4ea4\u6613\uff0c\u5e76\u63d0\u4ea4\u5230\u94fe\u4e0a\uff0c\u4ece\u800c\u4ea7\u751fgas\u8d39\u7528\u3002Bundler\u63d0\u524d\u652f\u4ed8\u7684gas\u8d39\u7528\u8981\u4e48\u7531\u94b1\u5305\u672c\u8eab\u6301\u6709\u7684\u4ee3\u5e01\u652f\u4ed8\uff0c\u8981\u4e48\u7531\u4ed8\u8d39\u4eba\u586b\u5145\u3002\u56e0\u6b64\uff0c\u5bf9\u4e8e\u94b1\u5305\u7528\u6237\uff08\u6240\u6709\u8005\uff09\uff0cPlaTrust\u94b1\u5305\u5177\u6709\u65e0gas\u8d39\u7684\u7279\u6027\u3002'),(0,n.kt)("img",{src:"/docs/img/zh-CN/PlaTrust/introduction-gasless.jpg",alt:""}),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-6"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u5f53gas\u8d39\u7528\u8d8a\u6765\u8d8a\u9ad8\u65f6\uff0c\u5141\u8bb8\u7528\u6237\u7ee7\u7eed\u4f7f\u7528\u94b1\u5305\u800c\u4e0d\u53d7gas\u8d39\u7528\u5f71\u54cd\u3002"),(0,n.kt)("li",{parentName:"ol"},"\u4fc3\u8fdbMEV\uff08\u77ff\u5de5\u53ef\u63d0\u53d6\u4ef7\u503c\uff09\u7684\u516c\u5e73\u63d0\u53d6\uff0c\u9f13\u52b1\u793e\u533a\u52a0\u5165\u6784\u5efa\u7b2c\u4e8c\u5c42\u89e3\u51b3\u65b9\u6848\uff0c\u7279\u522b\u662f\u7ef4\u62a4Bundler\u7684\u8fd0\u8425\u8005\u3002"),(0,n.kt)("li",{parentName:"ol"},"\u964d\u4f4eWeb2\u7528\u6237\u4f7f\u7528\u94b1\u5305\u7684\u969c\u788d\u3002")),(0,n.kt)("span",{id:"8."}),(0,n.kt)("h3",{id:"8-\u94b1\u5305\u5347\u7ea7"},"8. \u94b1\u5305\u5347\u7ea7"),(0,n.kt)("h4",{id:"\u89e3\u91ca-7"},"\u89e3\u91ca"),(0,n.kt)("p",null,"\u5408\u7ea6\u94b1\u5305\u672c\u8eab\u662f\u4eba\u7c7b\u7f16\u5199\u7684\u667a\u80fd\u5408\u7ea6\uff0c\u7531\u4eba\u7c7b\u7f16\u5199\u7684\u4ee3\u7801\u53ef\u80fd\u5b58\u5728\u6f0f\u6d1e\u3002\u4e00\u65e6\u667a\u80fd\u5408\u7ea6\u90e8\u7f72\u5230\u94fe\u4e0a\uff0c\u5b83\u5bf9\u6240\u6709\u7528\u6237\u90fd\u662f\u900f\u660e\u7684\uff0c\u65e0\u6cd5\u8f7b\u6613\u4fee\u6539\u6216\u64a4\u9500\u3002\u56e0\u6b64\uff0c\u5728\u9047\u5230\u91cd\u5927\u7684\u5b89\u5168\u6f0f\u6d1e\u6216\u6076\u610f\u653b\u51fb\u65f6\uff0c\u5347\u7ea7\u662f\u5fc5\u8981\u7684\uff0c\u4ee5\u4fee\u590d\u7f3a\u9677\u3002\u5bf9\u4e8e\u7528\u6237\u6765\u8bf4\uff0c\u94b1\u5305\u7684\u94fe\u4e0a\u5730\u5740\u4fdd\u6301\u4e0d\u53d8\uff0c\u4f46\u529f\u80fd\u5df2\u7ecf\u5207\u6362\u5230\u5347\u7ea7\u540e\u7684\u903b\u8f91\u3002"),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-7"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u529f\u80fd\u53d8\u5316\u7684\u7075\u6d3b\u6027\u3002"),(0,n.kt)("li",{parentName:"ol"},"\u4fee\u590d\u5b89\u5168\u6f0f\u6d1e\u7684\u80fd\u529b\u3002")),(0,n.kt)("span",{id:"9."}),(0,n.kt)("h3",{id:"9-\u5e10\u6237\u767d\u540d\u5355"},"9. \u5e10\u6237\u767d\u540d\u5355"),(0,n.kt)("h4",{id:"\u89e3\u91ca-8"},"\u89e3\u91ca"),(0,n.kt)("p",null,"\u94b1\u5305\u7684\u767d\u540d\u5355\u65e8\u5728\u4fc3\u8fdb\u4e1a\u52a1\u4f7f\u7528\uff0c\u5e76\u57fa\u4e8e\u4e00\u5b9a\u7a0b\u5ea6\u7684\u4fe1\u4efb\u63d0\u4f9b\u7528\u6237\u7684\u4fbf\u5229\u3002\u767d\u540d\u5355\u8fdb\u4e00\u6b65\u5206\u4e3adapp\u767d\u540d\u5355\u548c\u5e10\u6237\u767d\u540d\u5355\u3002\u6dfb\u52a0\u5230dapp\u767d\u540d\u5355\u7684\u5408\u7ea6\u5730\u5740\u53ef\u4ee5\u76f4\u63a5\u4ee5\u4fe1\u4efb\u8c03\u7528\u3002\u540c\u6837\uff0c\u5e10\u6237\u767d\u540d\u5355\u5730\u5740\u53ef\u4ee5\u76f4\u63a5\u6267\u884c\u8f6c\u8d26\u64cd\u4f5c\u3002"),(0,n.kt)("h4",{id:"\u529f\u80fd\u548c\u7528\u4f8b-8"},"\u529f\u80fd\u548c\u7528\u4f8b"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u63d0\u4f9b\u4fbf\u5229\u6027\u3002"),(0,n.kt)("li",{parentName:"ol"},"\u57fa\u4e8e\u4fe1\u4efb\u524d\u63d0\u3002")),(0,n.kt)("span",{id:"10."}),(0,n.kt)("h3",{id:"10-\u6297\u5ba1\u67e5\u6027"},"10. \u6297\u5ba1\u67e5\u6027"),(0,n.kt)("p",null,"\u7528\u6237\u53ef\u4ee5\u901a\u8fc7SDK\u5c06\u94b1\u5305\u7684\u529f\u80fd\u76f4\u63a5\u8fde\u63a5\u5230\u81ea\u5df1\u7684\u5e94\u7528\u7a0b\u5e8f\uff0c\u65e0\u9700\u4f9d\u8d56\u4efb\u4f55\u7b2c\u4e09\u65b9\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u81ea\u5df1\u7684\u94b1\u5305\u3002"),(0,n.kt)("span",{id:"11."}),(0,n.kt)("h3",{id:"11-\u591a\u94fe\u652f\u6301"},"11. \u591a\u94fe\u652f\u6301"),(0,n.kt)("p",null,"\u94b1\u5305\u4f7f\u7528",(0,n.kt)("inlineCode",{parentName:"p"},"create2"),"\u64cd\u4f5c\u7801\u90e8\u7f72\uff0c\u5141\u8bb8\u57fa\u4e8e\u76f8\u540c\u7684\u8f93\u5165\u53c2\u6570\u521b\u5efa\u76f8\u540c\u7684\u5408\u7ea6\u5730\u5740\uff08\u4e5f\u79f0\u4e3a\u201c\u53cd\u4e8b\u5b9e\u5730\u5740\u201d\uff09\u3002\u8fd9\u6837\u7684\u597d\u5904\u662f\u5728\u94b1\u5305\u5408\u7ea6\u5b9e\u9645\u90e8\u7f72\u5728\u5404\u79cdEVM\u517c\u5bb9\u7684\u533a\u5757\u94fe\u4e0a\u4e4b\u524d\u5c31\u53ef\u4ee5\u77e5\u9053\u94b1\u5305\u5730\u5740\uff0c\u4ece\u800c\u53ef\u4ee5\u63d0\u524d\u5bf9\u94b1\u5305\u8fdb\u884c\u8d44\u91d1\u9884\u7559\u3002\u6b64\u5916\uff0c\u5728\u8bb8\u591a\u8de8\u94fe\u9879\u76ee\u4e2d\uff0c\u5728\u591a\u4e2a\u4e0d\u540c\u7684\u533a\u5757\u94fe\u4e0a\u5177\u6709\u76f8\u540c\u7684\u5408\u7ea6\u5730\u5740\u6709\u52a9\u4e8e\u5728\u4e0d\u540c\u94fe\u4e0a\u5b9e\u73b0\u94b1\u5305\u5e10\u6237\u7ba1\u7406\u3002"),(0,n.kt)("img",{src:"/docs/img/zh-CN/PlaTrust/introduction-multichain-support.jpg",alt:""}),(0,n.kt)("h2",{id:"\u53c2\u8003"},"\u53c2\u8003"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://eips.ethereum.org/EIPS/eip-4337"},"https://eips.ethereum.org/EIPS/eip-4337"))))}u.isMDXComponent=!0}}]);