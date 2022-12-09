"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9706],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,y=u["".concat(c,".").concat(m)]||u[m]||p[m]||l;return n?r.createElement(y,o(o({ref:t},d),{},{components:n})):r.createElement(y,o({ref:t},d))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},614:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const l={id:"Solidity_Inner_Contract",title:"Call Inner Contract",sidebar_label:"Call Inner Contract"},o=void 0,i={unversionedId:"Solidity_Inner_Contract",id:"Solidity_Inner_Contract",isDocsHomePage:!1,title:"Call Inner Contract",description:"Introduction",source:"@site/../docs/solidity\u5408\u7ea6\u8c03\u7528\u5185\u7f6e\u5408\u7ea6.md",sourceDirName:".",slug:"/Solidity_Inner_Contract",permalink:"/docs/Solidity_Inner_Contract",editUrl:"https://github.com/PlatONnetwork/docs/tree/master/docs/solidity\u5408\u7ea6\u8c03\u7528\u5185\u7f6e\u5408\u7ea6.md",version:"current",frontMatter:{id:"Solidity_Inner_Contract",title:"Call Inner Contract",sidebar_label:"Call Inner Contract"},sidebar:"docs",previous:{title:"Contract security",permalink:"/docs/Solidity_Contract_Security_Dev_Guide"},next:{title:"Getting started",permalink:"/docs/Wasm_Dev_Manual"}},c=[{value:"Introduction",id:"introduction",children:[]},{value:"Code example",id:"code-example",children:[]}],s={toc:c};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"Platon has a built-in ",(0,a.kt)("a",{parentName:"p",href:"/docs/PlatON_system_contract"},"system contract"),",Support for SOLIDITY cross-contract calls, can be called by the following method:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"<address>.call(...) returns (bool)"),":\n\xa0  Low-level functions ",(0,a.kt)("inlineCode",{parentName:"p"}," Call"),", return ",(0,a.kt)("inlineCode",{parentName:"p"}," false"),", send all available GAS, adjustable."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"<address>.callcode(...) returns (bool)"),"\uff1a\n\xa0 Low-level functions ",(0,a.kt)("inlineCode",{parentName:"p"}," Callcode"),", return ",(0,a.kt)("inlineCode",{parentName:"p"}," false"),", send all available GAS, adjustable."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"<address>.delegatecall(...) returns (bool)"),":\n\xa0 Emit a low-level function ",(0,a.kt)("inlineCode",{parentName:"p"}," delegateCall"),", return ",(0,a.kt)("inlineCode",{parentName:"p"}," false"),", send all available GAS, adjustable."),(0,a.kt)("p",null,"Or call the Call operating code by inline assembly."),(0,a.kt)("h3",{id:"code-example"},"Code example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"pragma solidity ^0.5.13;\n\ncontract PlatonInner {\n\n    bytes returnValue;\n\n    function assemblyCallppos(bytes memory data,address addr) public {\n        uint256 len = data.length;\n        uint retsize;\n        bytes memory resval;\n        assembly {\n            if iszero(call(gas, addr, 0,  add(data, 0x20), len, 0, 0)) {\n                invalid()\n            }\n            retsize := returndatasize()\n        }\n        resval = new bytes(retsize);\n        assembly {\n            returndatacopy(add(resval, 0x20), 0, returndatasize())\n        }\n        returnValue = resval;\n    }\n\n    function getReturnValue() public view returns(bytes memory ){\n        return returnValue;\n    }\n\n}\n")),(0,a.kt)("p",null,"Note: The RLP codes are required for the parameters of the system contract, so it is recommended to complete it under the chain."))}d.isMDXComponent=!0}}]);