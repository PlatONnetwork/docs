"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6181],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>k});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var i=a.createContext({}),p=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(i.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(t),m=l,k=d["".concat(i,".").concat(m)]||d[m]||u[m]||r;return t?a.createElement(k,o(o({ref:n},c),{},{components:t})):a.createElement(k,o({ref:n},c))}));function k(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,o=new Array(r);o[0]=m;var s={};for(var i in n)hasOwnProperty.call(n,i)&&(s[i]=n[i]);s.originalType=e,s[d]="string"==typeof e?e:l,o[1]=s;for(var p=2;p<r;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3223:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>i});var a=t(7462),l=(t(7294),t(3905));const r={id:"WASM_Contract_1",title:"PlatON WASM\u5408\u7ea6\u5f00\u53d1\uff08\u4e00\uff09 - \u5408\u7ea6\u5f00\u53d1\u5165\u95e8",sidebar_label:"WASM\u5408\u7ea6\u5f00\u53d1\u5165\u95e8"},o=void 0,s={unversionedId:"WASM_Contract_1",id:"WASM_Contract_1",isDocsHomePage:!1,title:"PlatON WASM\u5408\u7ea6\u5f00\u53d1\uff08\u4e00\uff09 - \u5408\u7ea6\u5f00\u53d1\u5165\u95e8",description:"PlatON\u9690\u79c1AI\u7f51\u7edc\u662f\u9762\u5411\u672a\u6765\u7684\u5168\u7403\u9690\u79c1\u8ba1\u7b97\u7f51\u7edc\uff0c\u662f\u5168\u6570\u5b57\u7ecf\u6d4e\u65f6\u4ee3\u7684\u516c\u5171\u57fa\u7840\u8bbe\u65bd\u3002\u533a\u5757\u94fe\u751f\u6001\u7684\u5efa\u8bbe\u4e3b\u8981\u5efa\u7acb\u5728\u667a\u80fd\u5408\u7ea6\u4e4b\u4e0a\uff0cPlatON\u9690\u79c1\u8ba1\u7b97\u57fa\u7840\u8bbe\u65bd\uff0c\u80fd\u591f\u89e3\u51b3\u533a\u5757\u94fe\u751f\u6001\u53d1\u5c55\u7684\u6280\u672f\u74f6\u9888\uff0c\u4f7f\u94fe\u4e0a\u532e\u4e4f\u7684\u7b97\u529b\u80fd\u591f\u9769\u547d\u6027\u7684\u63d0\u5347\uff0c\u4f7f\u88ab\u4f20\u7edf\u4e92\u8054\u7f51\u6f20\u89c6\u7684\u9690\u79c1\u4fdd\u62a4\u80fd\u591f\u5f97\u5230\u6709\u6548\u7684\u5c0a\u91cd\uff0c\u4f7f\u4e0d\u53ef\u4fe1\u73af\u5883\u4e2d\u7684\u53c2\u4e0e\u8005\u80fd\u591f\u53ef\u4fe1\u7684\u534f\u540c\uff0c\u771f\u6b63\u6210\u4e3a\u6570\u5b57\u7ecf\u6d4e\u7684\u5e95\u5c42\u52a8\u80fd\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/PlatON WASM\u4e00-\u5408\u7ea6\u5f00\u53d1\u5165\u95e8.md",sourceDirName:".",slug:"/WASM_Contract_1",permalink:"/docs/zh-CN/WASM_Contract_1",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/PlatON WASM\u4e00-\u5408\u7ea6\u5f00\u53d1\u5165\u95e8.md",version:"current",frontMatter:{id:"WASM_Contract_1",title:"PlatON WASM\u5408\u7ea6\u5f00\u53d1\uff08\u4e00\uff09 - \u5408\u7ea6\u5f00\u53d1\u5165\u95e8",sidebar_label:"WASM\u5408\u7ea6\u5f00\u53d1\u5165\u95e8"},sidebar:"docs",previous:{title:"PRC721NFT\u53d1\u884c\u6559\u7a0b",permalink:"/docs/zh-CN/qianqian_prc721_tutorial"},next:{title:"WASM\u8de8\u5408\u7ea6\u8c03\u7528",permalink:"/docs/zh-CN/WASM_Contract_2"}},i=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",children:[]},{value:"\u73af\u5883",id:"\u73af\u5883",children:[]},{value:"\u5f00\u53d1\u8bed\u8a00",id:"\u5f00\u53d1\u8bed\u8a00",children:[]},{value:"\u6784\u5efa\u5de5\u5177",id:"\u6784\u5efa\u5de5\u5177",children:[]},{value:"\u5b89\u88c5\u65b9\u5f0f",id:"\u5b89\u88c5\u65b9\u5f0f",children:[]},{value:"\u4f7f\u7528\u624b\u518c",id:"\u4f7f\u7528\u624b\u518c",children:[]},{value:"\u5408\u7ea6\u5f00\u53d1",id:"\u5408\u7ea6\u5f00\u53d1",children:[]},{value:"\u521b\u5efa\u9879\u76ee",id:"\u521b\u5efa\u9879\u76ee",children:[{value:"1.\u521b\u5efa\u65b0\u76ee\u5f55",id:"1\u521b\u5efa\u65b0\u76ee\u5f55",children:[]},{value:"2.\u521d\u59cb\u5316\u5de5\u7a0b",id:"2\u521d\u59cb\u5316\u5de5\u7a0b",children:[]}]},{value:"\u7f16\u5199\u5408\u7ea6",id:"\u7f16\u5199\u5408\u7ea6",children:[{value:"\u4ee3\u7801",id:"\u4ee3\u7801",children:[]},{value:"\u4ee3\u7801\u8bf4\u660e",id:"\u4ee3\u7801\u8bf4\u660e",children:[]},{value:"1.\u4fee\u6539\u914d\u7f6e",id:"1\u4fee\u6539\u914d\u7f6e",children:[]},{value:"2.\u7f16\u8bd1",id:"2\u7f16\u8bd1",children:[]}]},{value:"\u90e8\u7f72",id:"\u90e8\u7f72",children:[{value:"1.\u4fee\u6539\u914d\u7f6e",id:"1\u4fee\u6539\u914d\u7f6e-1",children:[]},{value:"2.\u89e3\u9501\u94b1\u5305\u8d26\u6237",id:"2\u89e3\u9501\u94b1\u5305\u8d26\u6237",children:[]},{value:"3.\xa0\u90e8\u7f72\u5408\u7ea6",id:"3\u90e8\u7f72\u5408\u7ea6",children:[]}]},{value:"\u6d4b\u8bd5",id:"\u6d4b\u8bd5",children:[{value:"1.\xa0\u8fdb\u5165platon-truffle\u63a7\u5236\u53f0",id:"1\u8fdb\u5165platon-truffle\u63a7\u5236\u53f0",children:[]},{value:"2.\xa0\u6784\u5efa\u5408\u7ea6\u5bf9\u8c61",id:"2\u6784\u5efa\u5408\u7ea6\u5bf9\u8c61",children:[]},{value:"3.\xa0\u8c03\u7528\u5408\u7ea6",id:"3\u8c03\u7528\u5408\u7ea6",children:[]},{value:"4.\xa0\u67e5\u8be2\u5408\u7ea6",id:"4\u67e5\u8be2\u5408\u7ea6",children:[]},{value:"5.\u5176\u4ed6",id:"5\u5176\u4ed6",children:[]}]}],p={toc:i};function c(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"PlatON\u9690\u79c1AI\u7f51\u7edc\u662f\u9762\u5411\u672a\u6765\u7684\u5168\u7403\u9690\u79c1\u8ba1\u7b97\u7f51\u7edc\uff0c\u662f\u5168\u6570\u5b57\u7ecf\u6d4e\u65f6\u4ee3\u7684\u516c\u5171\u57fa\u7840\u8bbe\u65bd\u3002\u533a\u5757\u94fe\u751f\u6001\u7684\u5efa\u8bbe\u4e3b\u8981\u5efa\u7acb\u5728\u667a\u80fd\u5408\u7ea6\u4e4b\u4e0a\uff0cPlatON\u9690\u79c1\u8ba1\u7b97\u57fa\u7840\u8bbe\u65bd\uff0c\u80fd\u591f\u89e3\u51b3\u533a\u5757\u94fe\u751f\u6001\u53d1\u5c55\u7684\u6280\u672f\u74f6\u9888\uff0c\u4f7f\u94fe\u4e0a\u532e\u4e4f\u7684\u7b97\u529b\u80fd\u591f\u9769\u547d\u6027\u7684\u63d0\u5347\uff0c\u4f7f\u88ab\u4f20\u7edf\u4e92\u8054\u7f51\u6f20\u89c6\u7684\u9690\u79c1\u4fdd\u62a4\u80fd\u591f\u5f97\u5230\u6709\u6548\u7684\u5c0a\u91cd\uff0c\u4f7f\u4e0d\u53ef\u4fe1\u73af\u5883\u4e2d\u7684\u53c2\u4e0e\u8005\u80fd\u591f\u53ef\u4fe1\u7684\u534f\u540c\uff0c\u771f\u6b63\u6210\u4e3a\u6570\u5b57\u7ecf\u6d4e\u7684\u5e95\u5c42\u52a8\u80fd\u3002"),(0,l.kt)("p",null,"\u76ee\u524dPlatON\u4e3b\u7f51\u4e0a\u7ebf\u5728\u5373\uff0c\u540e\u671f\u9664\u4e86\u9879\u76ee\u7684\u6301\u7eed\u5f00\u53d1\u4e4b\u5916\uff0c\u8fd8\u4f1a\u6709\u5927\u91cf\u56f4\u7ed5PlatON\u7684\u751f\u6001\u5efa\u8bbe\u3002\u8003\u8651\u5230\u751f\u6001\u5efa\u8bbe\u79bb\u4e0d\u5f00\u667a\u80fd\u5408\u7ea6\u7684\u5f00\u53d1\uff0c\u6211\u4eec\u7279\u6b64\u63a8\u51fa\u4e86\u667a\u80fd\u5408\u7ea6\u5f00\u53d1\u76f8\u5173\u7cfb\u5217\u6559\u7a0b\uff0c\u5e0c\u671b\u80fd\u591f\u5e2e\u52a9\u5927\u5bb6\u66f4\u597d\u5730\u52a0\u5165\u5230PlatON\u751f\u6001\uff0c\u5728PlatON\u4e0a\u6784\u5efa\u81ea\u5df1\u7684\u5e94\u7528\u3002"),(0,l.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,l.kt)("p",null,"PlatON\u652f\u6301EVM\u548cWASM\u4e24\u79cd\u667a\u80fd\u5408\u7ea6\uff0c\u672c\u6559\u7a0b\u4e3b\u8981\u4ecb\u7ecd\u5982\u4f55\u5728PlatON\u4e0a\u4f7f\u7528C++\u8bed\u8a00\u5f00\u53d1WASM\u667a\u80fd\u5408\u7ea6\u3002"),(0,l.kt)("h2",{id:"\u73af\u5883"},"\u73af\u5883"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u7cfb\u7edf\uff1a"),"ubuntu18.04"),(0,l.kt)("h2",{id:"\u5f00\u53d1\u8bed\u8a00"},"\u5f00\u53d1\u8bed\u8a00"),(0,l.kt)("p",null,"PlatON\u9690\u79c1\u8ba1\u7b97\u7684\u57fa\u7840\u8bbe\u65bd\u4e0e\u5bc6\u7801\u5b66\u7ed3\u5408\u7684\u975e\u5e38\u7d27\u5bc6\uff0c\u5bf9\u8ba1\u7b97\u6548\u7387\u8981\u6c42\u975e\u5e38\u9ad8\uff0c\u56e0\u6b64\u73b0\u9636\u6bb5\u5e95\u5c42\u4e3b\u8981\u4ee5C++\u4e3a\u4e3b\u3002C++\u662f\u4e00\u6b3e\u9ad8\u6548\u7684\u8bed\u8a00\u3002\u5f53\u7136\uff0c\u5f88\u591a\u8bed\u8a00\u90fd\u53ef\u4ee5\u7528\u4e8eWASM\u5408\u7ea6\u5f00\u53d1\uff0c\u76f8\u4fe1\u5b98\u65b9\u672a\u6765\u4f1a\u9010\u6b65\u5b8c\u5584\u548c\u63a8\u51fa\u5176\u4ed6\u8bed\u8a00\u7684\u7248\u672c\u3002"),(0,l.kt)("h2",{id:"\u6784\u5efa\u5de5\u5177"},"\u6784\u5efa\u5de5\u5177"),(0,l.kt)("p",null,"platon-truffle\uff0c\u53ef\u4ee5\u5e2e\u52a9\u5f00\u53d1\u4eba\u5458\u5b8c\u6210\u7f16\u8bd1\u3001\u90e8\u7f72\u548c\u8c03\u8bd5\u5408\u7ea6\u3002"),(0,l.kt)("h2",{id:"\u5b89\u88c5\u65b9\u5f0f"},"\u5b89\u88c5\u65b9\u5f0f"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"wget http://111.231.58.192/install-platon-truffle.sh && sudo bash install-platon-truffle.sh\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6ce8\u610f"),"\n\u4f1a\u8f93\u51fa\u9519\u8bef\u4fe1\u606f\uff0c\u4f46\u662fplaton-truffle --version\u80fd\u591f\u6b63\u5e38\u8f93\u51fa\u5373\u53ef"),(0,l.kt)("h2",{id:"\u4f7f\u7528\u624b\u518c"},"\u4f7f\u7528\u624b\u518c"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://platon-truffle.readthedocs.io/en/v0.13.1/"},"https://platon-truffle.readthedocs.io/en/v0.13.1/")),(0,l.kt)("h2",{id:"\u5408\u7ea6\u5f00\u53d1"},"\u5408\u7ea6\u5f00\u53d1"),(0,l.kt)("h2",{id:"\u521b\u5efa\u9879\u76ee"},"\u521b\u5efa\u9879\u76ee"),(0,l.kt)("h3",{id:"1\u521b\u5efa\u65b0\u76ee\u5f55"},"1.\u521b\u5efa\u65b0\u76ee\u5f55"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"mkdir HelloWorld && cd HelloWorld\n")),(0,l.kt)("h3",{id:"2\u521d\u59cb\u5316\u5de5\u7a0b"},"2.\u521d\u59cb\u5316\u5de5\u7a0b"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"platon-truffle init\n")),(0,l.kt)("h2",{id:"\u7f16\u5199\u5408\u7ea6"},"\u7f16\u5199\u5408\u7ea6"),(0,l.kt)("h3",{id:"\u4ee3\u7801"},"\u4ee3\u7801"),(0,l.kt)("p",null,"\u5220\u9664contracts\u76ee\u5f55\u4e0b\u7684Migrations.sol\u6587\u4ef6\u3002"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6ce8\u610f**"),"\uff1a<platon/platon.hpp>\u662f\u5f00\u53d1\u548c\u4f7f\u7528\u9690\u79c1\u8ba1\u7b97\u57fa\u7840\u8bbe\u65bd\u7684\u5173\u952e\u3002**"),(0,l.kt)("p",null,"\u5728contracts\u76ee\u5f55\u4e0b\u65b0\u5efa\u6587\u4ef6HelloWorld.cpp\uff0c\u5408\u7ea6\u5185\u5bb9\u5982\u4e0b"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},'#include <platon/platon.hpp>\n#include <string>\nusing namespace platon;\n\nclass message {\n\xa0 \xa0public:\n\xa0 \xa0 \xa0 std::string head;\n\xa0 \xa0 \xa0 PLATON_SERIALIZE(message, (head))\n};\n\nclass my_message : public message {\n\xa0 \xa0public:\n\xa0 \xa0 \xa0 std::string body;\n\xa0 \xa0 \xa0 std::string end;\n\xa0 \xa0 \xa0 PLATON_SERIALIZE_DERIVED(my_message, message, (body)(end))\n};\n\nCONTRACT HelloWorld : public platon::Contract{\n\xa0 \xa0public:\n\xa0 \xa0 \xa0 ACTION void init(const my_message &one_message){\n\xa0 \xa0 \xa0 \xa0 info.self().push_back(one_message);\n\xa0 \xa0 \xa0 }\n\n\xa0 \xa0 \xa0 ACTION void add_message(const my_message &one_message){\n\xa0 \xa0 \xa0 \xa0 \xa0 info.self().push_back(one_message);\n\xa0 \xa0 \xa0 }\n\n\xa0 \xa0 \xa0 CONST uint8_t get_message_size(){\n\xa0 \xa0 \xa0 \xa0 \xa0 return info.self().size();\n\xa0 \xa0 \xa0 }\n\n\xa0 \xa0 \xa0 CONST std::string get_message_body(const uint8_t index){\n\xa0 \xa0 \xa0 \xa0 \xa0 return info.self()[index].body;\n\xa0 \xa0 \xa0 }\n\n\xa0 \xa0private:\n\xa0 \xa0 \xa0 platon::StorageType<"myvector"_n, std::vector<my_message>> info;\n};\n\nPLATON_DISPATCH(HelloWorld, (init)(add_message)(get_message_size)(get_message_body))\n')),(0,l.kt)("h3",{id:"\u4ee3\u7801\u8bf4\u660e"},"\u4ee3\u7801\u8bf4\u660e"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6bcf\u4e00\u4e2a\u5408\u7ea6\u6587\u4ef6\u53ea\u6709\u4e00\u4e2a\u5408\u7ea6\u7c7b\uff0c\u5408\u7ea6\u7c7b\u7528 CONTRACT \u4fee\u9970, \u5fc5\u987b\u516c\u6709\u7ee7\u627f platon::Contract\uff0c\u5fc5\u987b\u8981\u6709 init \u51fd\u6570\u3002"),(0,l.kt)("li",{parentName:"ul"},"ACTION \u548c CONST \u4fee\u9970\u7684\u6210\u5458\u51fd\u6570\u8868\u793a\u53ef\u8c03\u7528\u51fd\u6570\uff0c\u6b64\u7c7b\u6210\u5458\u51fd\u6570\u4e0d\u53ef\u4ee5\u91cd\u8f7d\u3002ACTION \u51fd\u6570\u4f1a\u4fee\u6539\u94fe\u4e0a\u6570\u636e\uff0cCONST \u51fd\u6570\u53ea\u662f\u67e5\u8be2\u5c5e\u6027\u4e0d\u4f1a\u4fee\u6539\u94fe\u4e0a\u6570\u636e\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u53ef\u8c03\u7528\u51fd\u6570\u53c2\u6570\u5217\u8868\u4e2d\u7684\u7c7b\u578b\u4e3a\u81ea\u5b9a\u4e49\u7c7b\u578b\uff0c\u6b64\u7c7b\u578b\u5b9a\u4e49\u4e2d\u9700\u52a0\u4e0a PLATON_SERIALIZE \u5b8f\u58f0\u660e\u5e8f\u5217\u5316\u51fd\u6570\uff0c\u6b64\u7c7b\u578b\u7ee7\u627f\u81ea\u5176\u4ed6\u7c7b\u578b\uff0c\u9700\u52a0\u4e0a PLATON_SERIALIZE_DERIVED \u5b8f\u58f0\u660e\u5e8f\u5217\u5316\u51fd\u6570\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u53ef\u8c03\u7528\u51fd\u6570\u53ea\u6709\u5728PLATON_DISPATCH \u5b8f\u5b9a\u4e49\u7edf\u4e00\u5165\u53e3\u51fd\u6570\uff0c\u624d\u80fd\u591f\u88ab\u5916\u90e8\u8c03\u7528\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u76ee\u524d platon \u4f1a\u5c06\u5408\u7ea6\u7c7b\u7684\u6210\u5458\u53d8\u91cf\u6301\u4e45\u5316\u5b58\u50a8\uff0c\u6210\u5458\u53d8\u91cf\u5fc5\u987b\u662f platon::StorageType \u7c7b\u578b\uff0cplaton::StorageType\u6a21\u677f\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\u5b57\u7b26\u4e32\u540e\u9762\u52a0\u4e0a_n\uff0c\u5b57\u7b26\u4e32\u5fc5\u987b\u4e3a.12345abcdefghijklmnopqrstuvwxyz\u8fd932\u5b57\u7b26\u4e2d\u7684\u5b57\u7b26\u3002\u7b2c\u4e8c\u4e2a\u53c2\u6570\u4e3a\u5b9e\u9645\u5b58\u50a8\u7684\u5177\u4f53\u7c7b\u578b\u3002\u6210\u5458\u51fd\u6570\u4fee\u6539\u6210\u5458\u53d8\u91cf\u9700\u8981\u901a\u8fc7 self() \u51fd\u6570\u83b7\u53d6\u5177\u4f53\u7c7b\u578b\u7684\u5b9e\u4f8b\uff0c\u7136\u540e\u6267\u884c\u76f8\u5e94\u7684\u5b9e\u4f8b\u51fd\u6570\u3002"),(0,l.kt)("li",{parentName:"ul"},"platon::StorageType \u6a21\u677f\u7684\u7b2c\u4e8c\u4e2a\u53c2\u6570\u7c7b\u578b\u4e3a\u81ea\u5b9a\u4e49\u7c7b\u578b\uff0c\u6b64\u7c7b\u578b\u5b9a\u4e49\u4e2d\u9700\u52a0\u4e0a PLATON_SERIALIZE \u5b8f\u58f0\u660e\u5e8f\u5217\u5316\u51fd\u6570\uff0c\u6b64\u7c7b\u578b\u7ee7\u627f\u81ea\u5176\u4ed6\u7c7b\u578b\uff0c\u9700\u52a0\u4e0a PLATON_SERIALIZE_DERIVED \u5b8f\u58f0\u660e\u5e8f\u5217\u5316\u51fd\u6570\u3002")),(0,l.kt)("h1",{id:"\u7f16\u8bd1"},"\u7f16\u8bd1"),(0,l.kt)("h3",{id:"1\u4fee\u6539\u914d\u7f6e"},"1.\u4fee\u6539\u914d\u7f6e"),(0,l.kt)("p",null,"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6truffle-config.js\u4e2dwasm\u7f16\u8bd1\u5668\u7248\u672c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},'compilers: {\n  wasm: {\n    version: "v0.13.2", \n  }\n}\n')),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6ce8\u610f"),"\n\u5b98\u65b9\u76ee\u524d\u53ea\u53d1\u5e03\u4e86alaya\u7248\u672c\u7684wasm\u7f16\u8bd1\u5668\uff0c\u5728\u6d89\u53ca\u5230\u8de8\u5408\u7ea6\u8c03\u7528\u7684\u65f6\u5019\uff0c\u4f1a\u51fa\u73b0\u5730\u5740\u7f16\u7801\u95ee\u9898\uff0c\u56e0\u6b64\u9700\u8981\u624b\u52a8\u7f16\u8bd1\u548c\u5b89\u88c5platon\u7248\u672c\u7684",(0,l.kt)("a",{parentName:"p",href:"https://github.com/PlatONnetwork/PlatON-CDT/tree/feature/wasm"},"wasm\u7f16\u8bd1\u5668"),"\u3002"),(0,l.kt)("p",null,"\u6211\u4eec\u5df2\u7ecf\u7f16\u8bd1\u4e86\u6700\u65b0\u7248\u672c\u7684platon\u7248\u672c\u7684wasm\u7f16\u8bd1\u5668\uff0c\u6709\u9700\u8981\u7684\u670b\u53cb\u53ef\u4ee5",(0,l.kt)("a",{parentName:"p",href:"http://111.231.58.192/platon-cdt.zip"},"\u4e0b\u8f7d"),"\u5e76\u89e3\u538b\u5230~/.config/truffle/compilers\u76ee\u5f55\u4e0b\u3002"),(0,l.kt)("h3",{id:"2\u7f16\u8bd1"},"2.\u7f16\u8bd1"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"platon-truffle compile\n")),(0,l.kt)("h2",{id:"\u90e8\u7f72"},"\u90e8\u7f72"),(0,l.kt)("h3",{id:"1\u4fee\u6539\u914d\u7f6e-1"},"1.\u4fee\u6539\u914d\u7f6e"),(0,l.kt)("p",null,"\u4fee\u6539\u914d\u7f6e\u6587\u4ef6truffle-config.js\uff0c\u5c06\u8fde\u63a5\u914d\u7f6e\u4fee\u6539\u6210\u771f\u5b9e\u8fde\u63a5"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},'networks: {\n\xa0 \xa0 development: {\n\xa0 \xa0 \xa0 \xa0host: "127.0.0.1",\xa0 \xa0 \xa0// \u533a\u5757\u94fe\u6240\u5728\u670d\u52a1\u5668\u4e3b\u673a\n\xa0 \xa0 \xa0 \xa0port: 6789,\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 // \u94fe\u7aef\u53e3\u53f7\n\xa0 \xa0 \xa0 \xa0network_id: "*",\xa0 \xa0 \xa0 \xa0// Any network (default: none)\n\xa0 \xa0 \xa0 \xa0from: "lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n", //\u90e8\u7f72\u5408\u7ea6\u8d26\u53f7\u7684\u94b1\u5305\u5730\u5740\n\xa0 \xa0 \xa0 \xa0gas: 9000000,\n\xa0 \xa0 \xa0 \xa0gasPrice: 50000000004,\n\xa0 \xa0 },\n}\n')),(0,l.kt)("h3",{id:"2\u89e3\u9501\u94b1\u5305\u8d26\u6237"},"2.\u89e3\u9501\u94b1\u5305\u8d26\u6237"),(0,l.kt)("p",null,"\u8fdb\u5165platon-truffle\u63a7\u5236\u53f0"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"platon-truffle console\n")),(0,l.kt)("p",null,"\u5bfc\u5165\u79c1\u94a5\uff08\u5982\u679c\u4e4b\u524d\u5df2\u5bfc\u5165\u53ef\u4ee5\u8df3\u8fc7\u6b64\u6b65\u9aa4\uff09"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},'web3.platon.personal.importRawKey("\u60a8\u7684\u94b1\u5305\u79c1\u94a5","\u60a8\u7684\u94b1\u5305\u5bc6\u7801");\n')),(0,l.kt)("p",null,"\u5bfc\u5165\u6210\u529f\u5c06\u770b\u5230\u79c1\u94a5\u5bf9\u5e94\u7684\u5730\u5740\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n'\n")),(0,l.kt)("p",null,"\u89e3\u9501\u94b1\u5305\u8d26\u6237"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"web3.platon.personal.unlockAccount('\u60a8\u7684\u94b1\u5305\u5730\u5740','\u60a8\u7684\u94b1\u5305\u5bc6\u7801',999999);\n")),(0,l.kt)("p",null,"\u89e3\u9501\u6210\u529f\u5c06\u770b\u5230\u5982\u4e0b\u4fe1\u606f"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"true\n")),(0,l.kt)("p",null,"\u89e3\u9501\n\u5982\u679c\u662f\u4f7f\u7528mtool\u521b\u5efa\u7684keystore\uff0c\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u83b7\u5f97\u79c1\u94a5\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"platonkey inspect --private PATH\n")),(0,l.kt)("p",null,"\u5982\u679c\u662fATON\u94b1\u5305\u521b\u5efa\u7684\u8d26\u53f7\uff0c\u5728\u94b1\u5305\u4e2d\u5bfc\u51fa\u79c1\u94a5"),(0,l.kt)("h3",{id:"3\u90e8\u7f72\u5408\u7ea6"},"3.\xa0\u90e8\u7f72\u5408\u7ea6"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},'platon-truffle deploy --wasm --contract-name HelloWorld --params \'[[["1"], "2", "3"]]\'\n')),(0,l.kt)("p",null," \u90e8\u7f72\u6210\u529f\u540e\uff0c\u5c06\u770b\u5230\u7c7b\u4f3c\u5982\u4e0b\u4fe1\u606f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"receipt:\xa0 { blockHash:\n\xa0 \xa0'0x3dd0f13fbc1771c412ea91456fe084edc3ccc2331597782904d5008cb86c2424',\n\xa0 blockNumber: 3950026,\n\xa0 contractAddress: 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h',\n\xa0 cumulativeGasUsed: 197615,\n\xa0 from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',\n\xa0 gasUsed: 197615,\n\xa0 logs: [],\n\xa0 logsBloom:\n\xa0 \xa0'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',\n\xa0 status: true,\n\xa0 to: null,\n\xa0 transactionHash:\n\xa0 \xa0'0xd276365d362a43c0caccc4ce74c72d2b2b27a751e22cbd8a5467ca365e638002',\n\xa0 transactionIndex: 0 }\ncontract HelloWorld deployed successfully\n======================\n\n\xa0 \xa0> transactionHash:\xa0 \xa0 \xa00xd276365d362a43c0caccc4ce74c72d2b2b27a751e22cbd8a5467ca365e638002\n\xa0 \xa0> contract address:\xa0 \xa0 lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h\n\xa0 \xa0> block number:\xa0 \xa0 \xa0 \xa0 3950026\n\xa0 \xa0> block timestamp:\xa0 \xa0 \xa01619596398292\n\xa0 \xa0> account:\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n\n\xa0 \xa0> balance:\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa07199525199077690925044\n\xa0 \xa0> gas limit:\xa0 \xa0 \xa0 \xa0 \xa0 \xa09424776\n\xa0 \xa0> gas used:\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 197615\n\xa0 \xa0> gas price:\xa0 \xa0 \xa0 \xa0 \xa0 \xa00.00000002 LAT\n\xa0 \xa0> total cost:\xa0 \xa0 \xa0 \xa0 \xa0 0.0039523 LAT\n")),(0,l.kt)("h2",{id:"\u6d4b\u8bd5"},"\u6d4b\u8bd5"),(0,l.kt)("h3",{id:"1\u8fdb\u5165platon-truffle\u63a7\u5236\u53f0"},"1.\xa0\u8fdb\u5165platon-truffle\u63a7\u5236\u53f0"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"platon-truffle console\n")),(0,l.kt)("p",null,"*\u4ee5\u4e0b\u8c03\u7528\u67e5\u8be2\u5c06\u5728truffle\u63a7\u5236\u53f0\u4e2d\u8fdb\u884c"),(0,l.kt)("h3",{id:"2\u6784\u5efa\u5408\u7ea6\u5bf9\u8c61"},"2.\xa0\u6784\u5efa\u5408\u7ea6\u5bf9\u8c61"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},'var abi = [{"baseclass":[],"fields":[{"name":"head","type":"string"}],"name":"message","type":"struct"},{"baseclass":["message"],"fields":[{"name":"body","type":"string"},{"name":"end","type":"string"}],"name":"my_message","type":"struct"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];\n\nvar contractAddr = \'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h\';\n \nvar helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 });\n')),(0,l.kt)("p",null,"\u8bf4\u660e\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"abi"),"\xa0\u662f\u5408\u7ea6\u63d0\u4f9b\u7ed9\u5916\u90e8\u8c03\u7528\u65f6\u7684\u63a5\u53e3\uff0c\u6bcf\u4e2a\u5408\u7ea6\u5bf9\u5e94\u7684abi\u5728\u7f16\u8bd1\u540e\u7684\u6587\u4ef6\u4e2d\uff0c\u5982\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"HelloWorld/build/contracts/HelloWorld.abi.json"),"\u4e2d\u53ef\u4ee5\u627e\u5230"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"contractAddr"),"\xa0\u5728\u90e8\u7f72\u5408\u7ea6\u6210\u529f\u540e\u6709\u4e00\u4e2acontract address"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"helloWorld"),"\u5c31\u662f\u6784\u5efa\u51fa\u6765\u4e0e\u94fe\u4e0a\u5408\u7ea6\u4ea4\u4e92\u7684\u5408\u7ea6\u5bf9\u8c61\u62bd\u8c61")),(0,l.kt)("h3",{id:"3\u8c03\u7528\u5408\u7ea6"},"3.\xa0\u8c03\u7528\u5408\u7ea6"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"helloworld.methods.add_message([[\"5\"], \"6\", \"7\"]).send({\n    from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',gas: 999999\n}).on('receipt', function(receipt) {\n    console.log(receipt);\n}).on('error', console.error);\n")),(0,l.kt)("p",null,"\u8c03\u7528\u5408\u7ea6\u547d\u4ee4\u8bf4\u660e\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"helloWorld"),"\u662f\u4e4b\u524d\u6784\u5efa\u7684\u5408\u7ea6\u5bf9\u8c61"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"methods"),"\u56fa\u5b9a\u8bed\u6cd5,\u540e\u9762\u7d27\u8ddf\u5408\u7ea6\u7684\u65b9\u6cd5\u540d"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"add_message"),"\u662f\u6211\u4eecHelloWorld\u5408\u7ea6\u4e2d\u7684\u4e00\u4e2a\u65b9\u6cd5\uff0c\u6709\u4e00\u4e2a\u81ea\u5b9a\u4e49my_message\u7c7b\u578b\u7684\u5165\u53c2"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"from"),"\u8c03\u7528\u8005\u7684\u94b1\u5305\u5730\u5740"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"gas"),"gas\u503c"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"on"),"\u662f\u76d1\u542c\u5408\u7ea6\u5904\u7406\u7ed3\u679c\u4e8b\u4ef6\uff0c\u6b64\u5904\u5982\u679c\u6210\u529f\u5c06\u6253\u5370\u56de\u6267\uff0c\u5931\u8d25\u8f93\u51fa\u9519\u8bef\u65e5\u5fd7\n\u51fd\u6570\u8c03\u7528\u6210\u529f\uff0c\u5c06\u4f1a\u770b\u5230\u5982\u4e0b\u4fe1\u606f\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"{ blockHash:\n\xa0 \xa0'0x179193fcd13e44dd5d5e491ae6bc514052d3cf290e5e1f47fecf8aafc61d9da1',\n\xa0 blockNumber: 3950299,\n\xa0 contractAddress: null,\n\xa0 cumulativeGasUsed: 68359,\n\xa0 from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',\n\xa0 gasUsed: 68359,\n\xa0 logsBloom:\n\xa0 \xa0'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',\n\xa0 status: true,\n\xa0 to: 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h',\n\xa0 transactionHash:\n\xa0 \xa0'0x31113fc77fb2f917891f24ac90f115262fd2d925268da2c4ee4d073e7c4dcd73',\n\xa0 transactionIndex: 0,\n\xa0 events: {} }\n{ blockHash:\n\xa0 \xa0'0x179193fcd13e44dd5d5e491ae6bc514052d3cf290e5e1f47fecf8aafc61d9da1',\n\xa0 blockNumber: 3950299,\n\xa0 contractAddress: null,\n\xa0 cumulativeGasUsed: 68359,\n\xa0 from: 'lat1ar0s6re3qpe3rt39523qw4jars6s4sdhak459n',\n\xa0 gasUsed: 68359,\n\xa0 logsBloom:\n\xa0 \xa0'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',\n\xa0 status: true,\n\xa0 to: 'lat150nn0efn0de86mw2pcdyhlnmucln89m93sr49h',\n\xa0 transactionHash:\n\xa0 \xa0'0x31113fc77fb2f917891f24ac90f115262fd2d925268da2c4ee4d073e7c4dcd73',\n\xa0 transactionIndex: 0,\n\xa0 events: {} }\n")),(0,l.kt)("h3",{id:"4\u67e5\u8be2\u5408\u7ea6"},"4.\xa0\u67e5\u8be2\u5408\u7ea6"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plain"},"helloworld.methods.get_message_body(0).call() \n")),(0,l.kt)("p",null,"\u67e5\u8be2\u5408\u7ea6\u547d\u4ee4\u8bf4\u660e\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"helloWorld"),"\u662f\u4e4b\u524d\u6784\u5efa\u7684\u5408\u7ea6\u5bf9\u8c61"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"methods"),"\u6307\u5b9a\u5c06\u83b7\u53d6\u5408\u7ea6\u4e2d\u7684\u65b9\u6cd5"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"get_message_body"),"\u662f\u6211\u4eecHelloWorld\u5408\u7ea6\u4e2d\u7684\u4e00\u4e2a\u65b9\u6cd5\uff0c\u8be5\u65b9\u6cd5\u6709\u4e00\u4e2aint\u7c7b\u578b\u7684\u5165\u53c2"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"call"),"\u6307\u660e\u662f\u67e5\u8be2\u65b9\u6cd5")),(0,l.kt)("h3",{id:"5\u5176\u4ed6"},"5.\u5176\u4ed6"),(0,l.kt)("p",null,"\u8fd9\u4e2a\u53ea\u662f\u4e00\u4e2a\u975e\u5e38\u7b80\u5355\u7684\u5408\u7ea6\uff0c\u76ee\u7684\u662f\u8ba9\u5927\u5bb6\u5bf9PlatON\u7684WASM\u5408\u7ea6\u6709\u4e2a\u57fa\u672c\u7684\u8ba4\u8bc6\uff0c\u540e\u9762\u5c06\u4f1a\u4e3a\u5927\u5bb6\u8bb2\u89e3\u5982\u4f55\u8fdb\u884c\u8de8\u5408\u7ea6\u8c03\u7528\uff0c\u656c\u8bf7\u671f\u5f85\u3002"),(0,l.kt)("p",null,"\u60f3\u8981\u83b7\u5f97\u66f4\u591a\u5173\u4e8e\u5408\u7ea6\u5f00\u53d1\u7684\u8d44\u6599\uff0c\u8bf7\u524d\u5f80",(0,l.kt)("a",{parentName:"p",href:"https://devdocs.platon.network/docs/zh-CN/WASM_Smart_Contract/"},"\u5b98\u7f51\u6587\u6863"),"\u3002"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"\u672c\u6559\u7a0b\u8d21\u732e\u8005 @",(0,l.kt)("a",{parentName:"em",href:"https://github.com/xiyu1984"},"xiyu"))))}c.isMDXComponent=!0}}]);