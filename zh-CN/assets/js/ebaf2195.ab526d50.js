"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5565],{3905:(t,e,l)=>{l.d(e,{Zo:()=>u,kt:()=>d});var n=l(7294);function a(t,e,l){return e in t?Object.defineProperty(t,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[e]=l,t}function r(t,e){var l=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),l.push.apply(l,n)}return l}function i(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?r(Object(l),!0).forEach((function(e){a(t,e,l[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}function o(t,e){if(null==t)return{};var l,n,a=function(t,e){if(null==t)return{};var l,n,a={},r=Object.keys(t);for(n=0;n<r.length;n++)l=r[n],e.indexOf(l)>=0||(a[l]=t[l]);return a}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)l=r[n],e.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(t,l)&&(a[l]=t[l])}return a}var p=n.createContext({}),c=function(t){var e=n.useContext(p),l=e;return t&&(l="function"==typeof t?t(e):i(i({},e),t)),l},u=function(t){var e=c(t.components);return n.createElement(p.Provider,{value:e},t.children)},s="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},N=n.forwardRef((function(t,e){var l=t.components,a=t.mdxType,r=t.originalType,p=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),s=c(l),N=a,d=s["".concat(p,".").concat(N)]||s[N]||m[N]||r;return l?n.createElement(d,i(i({ref:e},u),{},{components:l})):n.createElement(d,i({ref:e},u))}));function d(t,e){var l=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var r=l.length,i=new Array(r);i[0]=N;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o[s]="string"==typeof t?t:a,i[1]=o;for(var c=2;c<r;c++)i[c]=l[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,l)}N.displayName="MDXCreateElement"},8319:(t,e,l)=>{l.r(e),l.d(e,{contentTitle:()=>i,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=l(7462),a=(l(7294),l(3905));const r={id:"PlatON_wallet_plugin",title:"PlatON-Wallet - \u64cd\u4f5c\u624b\u518c",sidebar_label:"PlatON\u94b1\u5305\u63d2\u4ef6"},i="PlatON\u94b1\u5305\u63d2\u4ef6",o={unversionedId:"PlatON_wallet_plugin",id:"PlatON_wallet_plugin",isDocsHomePage:!1,title:"PlatON-Wallet - \u64cd\u4f5c\u624b\u518c",description:"\u6982\u8ff0",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/PlatON Wallet Plugin.md",sourceDirName:".",slug:"/PlatON_wallet_plugin",permalink:"/docs/zh-CN/PlatON_wallet_plugin",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/PlatON Wallet Plugin.md",version:"current",frontMatter:{id:"PlatON_wallet_plugin",title:"PlatON-Wallet - \u64cd\u4f5c\u624b\u518c",sidebar_label:"PlatON\u94b1\u5305\u63d2\u4ef6"},sidebar:"docs",previous:{title:"MetaMask",permalink:"/docs/zh-CN/MetaMask"},next:{title:"PlatON\u94b1\u5305\u63d2\u4ef6SDK",permalink:"/docs/zh-CN/PlatON_wallet_plugin_sdk"}},p=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",children:[]},{value:"\u96c6\u6210\u65b9\u5f0f",id:"\u96c6\u6210\u65b9\u5f0f",children:[]},{value:"\u4f7f\u7528\u6559\u7a0b",id:"\u4f7f\u7528\u6559\u7a0b",children:[]}],c={toc:p},u="wrapper";function s(t){let{components:e,...l}=t;return(0,a.kt)(u,(0,n.Z)({},c,l,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"platon\u94b1\u5305\u63d2\u4ef6"},"PlatON\u94b1\u5305\u63d2\u4ef6"),(0,a.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,a.kt)("p",null,"  PlatON \u94b1\u5305\u63d2\u4ef6\u96c6\u6210\u4e86\u94b1\u5305\u57fa\u7840\u529f\u80fd\u3001\u8de8\u94fe\u3001\u6cd5\u5e01\u901a\u9053\u3001Swap \u7b49\u591a\u79cd\u529f\u80fd\u3002\u672a\u6765\u8fd8\u5c06\u5b9e\u73b0\u8de8\u5e01\u79cd\u7684\u5151\u6362\u3001\u57fa\u4e8e\u5bc6\u6001\u652f\u4ed8\u7684\u4ea4\u6613\u9274\u6743\u3001\u9884\u4ed8\u8d39\u5361\u9500\u552e\u3001\u865a\u62df VISA \u5361\u7b49\u66f4\u591a\u529f\u80fd\u3002"),(0,a.kt)("p",null,"  PlatON \u94b1\u5305\u63d2\u4ef6\u517c\u5bb9\u591a\u79cd\u53bb\u4e2d\u5fc3\u5316\u94b1\u5305\uff0c\u5e94\u7528\u65b9\u901a\u8fc7\u96c6\u6210 PlatON \u94b1\u5305\u63d2\u4ef6\u540e\uff0c\u53ef\u4ee5\u4f7f\u5f97\u5176\u7528\u6237\u65b9\u4fbf\u7684\u8fdb\u884c\u8de8\u94fe\u5145\u503c\u3001\u6cd5\u5e01\u8d2d\u4e70\u7b49\u64cd\u4f5c\u3002"),(0,a.kt)("p",null,"  \u4e3a\u4e86\u6ee1\u8db3\u9879\u76ee\u65b9\u7684\u5404\u79cd\u96c6\u6210\u9700\u6c42\uff0c\u6211\u4eec\u5c06\u4e3a\u4e00\u7cfb\u5217\u8bed\u8a00\u548c\u6846\u67b6\u63d0\u4f9b SDK\uff0c\u4f7f\u5e94\u7528\u5f00\u53d1\u4eba\u5458\u53ef\u4ee5\u6839\u636e\u4e0d\u540c\u7684\u4e1a\u52a1\u573a\u666f\u5feb\u901f\u5b8c\u6210\u96c6\u6210\u3002"),(0,a.kt)("h2",{id:"\u96c6\u6210\u65b9\u5f0f"},"\u96c6\u6210\u65b9\u5f0f"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/docs/zh-CN/PlatON_Wallet_Plugin_Sdk"},"PlatON\u94b1\u5305\u63d2\u4ef6SDK"),"\uff1a\u63d0\u4f9b\u5b8c\u6574\u7684\u94b1\u5305\u529f\u80fd\u548c\u9875\u9762\uff0c\u901a\u8fc7\u7b80\u5355\u7684\u5355\u70b9\u96c6\u6210\uff0c\u53ef\u5feb\u901f\u4f7f\u7528\u94b1\u5305\u5185\u6240\u6709\u7684\u529f\u80fd\u3002"),(0,a.kt)("p",{parentName:"li"},"\u6211\u4eec\u4e5f\u5373\u5c06\u63d0\u4f9b\u66f4\u591a\u79cd\u96c6\u6210\u65b9\u5f0f\uff0c\u4ee5\u6ee1\u8db3\u5e94\u7528\u4e0d\u540c\u573a\u666f\u7684\u96c6\u6210\u9700\u6c42\u3002"))),(0,a.kt)("h2",{id:"\u4f7f\u7528\u6559\u7a0b"},"\u4f7f\u7528\u6559\u7a0b"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"\u6ce8\u610f\uff1a"),"\u7531\u4e8e PlatON \u94b1\u5305\u63d2\u4ef6\u672c\u8eab\u4e0d\u751f\u6210\u8d26\u6237\u5730\u5740\uff0c\u4f9d\u8d56\u4e8e\u5176\u4ed6\u6709\u8d26\u6237\u7b2c\u4e09\u65b9\u7684\u94b1\u5305\uff0c\u5982Metamask\u7b49\u3002\u56e0\u6b64\u6240\u6709\u7684\u4ea4\u6613\u5c06\u901a\u8fc7\u7b2c\u4e09\u65b9\u94b1\u5305\u6765\u5b8c\u6210\u3002")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"1\u3001\u8fde\u63a5\u94b1\u5305")),(0,a.kt)("p",null," \u5f53\u5e94\u7528\u96c6\u6210 PlatON \u94b1\u5305\u63d2\u4ef6\u4e4b\u540e\uff0c\u901a\u8fc7\u5e94\u7528\u8fde\u63a5Metamask\u4e4b\u540e\uff0cPlatON\u94b1\u5305\u4e5f\u4f1a\u540c\u6b65\u8fde\u63a5\u4e0aMetamask\u3002\u8fde\u63a5 Metamask \u4e4b\u540e\uff0cPlatON \u94b1\u5305\u63d2\u4ef6\u5c06\u5c55\u793a\u8be5\u8d26\u6237\u5728 PlatON \u7f51\u7edc\u4e0a\u8d44\u4ea7\u60c5\u51b5\u3002"),(0,a.kt)("img",{src:"/docs/img/zh-CN/PlatON-Wallet-imgs/connect.jpg",alt:"connect"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"2\u3001\u53d1\u9001\u4e0e\u63a5\u6536")),(0,a.kt)("p",null," \u94b1\u5305\u63d2\u4ef6\u652f\u6301\u53d1\u9001\u548c\u63a5\u6536 PlatON \u7f51\u7edc\u4e0a\u7684 Token\u3002"),(0,a.kt)("img",{src:"/docs/img/zh-CN/PlatON-Wallet-imgs/send-receive.jpg",alt:"send-receive"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"3\u3001\u5145\u503c")),(0,a.kt)("p",null,"  \u76ee\u524d\u63d0\u4f9b\u4e24\u79cd\u65b9\u5f0f\u6765\u8fdb\u884c PlatON \u7f51\u7edc\u8d44\u4ea7\u7684\u5145\u503c\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u65b9\u5f0f\u4e00\uff1a\u901a\u8fc7\u8de8\u94fe\u6865\u7684\u65b9\u5f0f\u4ece\u5176\u4ed6\u7f51\u7edc\u8de8\u5165\u8d44\u4ea7\u5230 PlatON \u7f51\u7edc"),(0,a.kt)("li",{parentName:"ul"},"\u65b9\u5f0f\u4e8c\uff1a\u901a\u8fc7\u96c6\u6210 Alchemy Pay\uff0c\u652f\u6301\u4ee5\u6cd5\u5e01\u652f\u4ed8\u7684\u65b9\u5f0f\u8d2d\u4e70 PlatON \u7f51\u7edc\u4e0a\u7684\u8d44\u4ea7\n\u672a\u6765\u6211\u4eec\u8fd8\u5c06\u652f\u6301\u66f4\u591a\u79cd\u4fbf\u6377\u7684\u5145\u503c\u65b9\u5f0f\u3002\n")),(0,a.kt)("img",{src:"/docs/img/zh-CN/PlatON-Wallet-imgs/deposit.jpg",alt:"deposit"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"4\u3001\u63d0\u53d6")),(0,a.kt)("p",null,"  \u76ee\u524d\u6211\u4eec\u6709\u4e24\u79cd\u65b9\u5f0f\u53ef\u5c06 PlatON \u4e0a\u7684\u8d44\u4ea7\u63d0\u53d6\u51fa\u53bb\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u65b9\u5f0f\u4e00\uff1a\u901a\u8fc7\u8de8\u94fe\u6865\u7684\u65b9\u5f0f\u5c06 PlatON \u7f51\u7edc\u8d44\u4ea7\u63d0\u53d6\u5230\u5176\u4ed6\u7f51\u7edc\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u65b9\u5f0f\u4e8c \uff1a\u901a\u8fc7 ",(0,a.kt)("a",{parentName:"li",href:"https://txnhub.io"},"txnhub.io")," \u8d2d\u4e70\u8d2d\u7269\u5361\u3002\n")),(0,a.kt)("img",{src:"/docs/img/zh-CN/PlatON-Wallet-imgs/withdraw.jpg",alt:"withdraw"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"5\u3001\u66f4\u591a\u529f\u80fd")),(0,a.kt)("p",null,"\u6211\u4eec\u540e\u7eed\u5c06\u652f\u6301\u66f4\u591a\u7f51\u7edc\uff0c\u66f4\u591a\u5e01\u79cd\u7684\u8de8\u94fe\uff0c\u4e0d\u540c\u5e01\u79cd\u4e4b\u95f4\u7684Swap\uff0c\u4ee5\u53ca\u57fa\u4e8e\u5bc6\u6001\u652f\u4ed8\u7684\u4ea4\u6613\u9274\u6743\u3001\u865a\u62df VISA \u5361\u7b49\u7b49\u66f4\u591a\u529f\u80fd\u3002"))}s.isMDXComponent=!0}}]);