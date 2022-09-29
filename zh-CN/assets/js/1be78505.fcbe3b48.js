(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9514,5748,8056],{3905:(e,t,n)=>{"use strict";n.d(t,{Zo:()=>u,kt:()=>p});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),i=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=i(e.components);return a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=i(n),p=r,h=m["".concat(c,".").concat(p)]||m[p]||d[p]||o;return n?a.createElement(h,l(l({ref:t},u),{},{components:n})):a.createElement(h,l({ref:t},u))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var i=2;i<o;i++)l[i]=n[i];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1992:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>ge});var a=n(7294),r=n(3905),o=n(2263),l=n(6291),s=n(4986),c=n(7462),i=n(6010),u=n(9306),d=n(1839),m=n(3783),p=n(7898),h=n(6742),f=n(3919),b=n(5537);const g=e=>a.createElement("svg",(0,c.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})));var y=n(4478),v=n(8617),k=n(4973);const E="sidebar_a3j0",C="sidebarWithHideableNavbar_VlPv",_="sidebarHidden_OqfG",N="sidebarLogo_hmkv",Z="menu_cyFh",S="menuLinkText_lRH+",T="menuWithAnnouncementBar_+O1J",O="collapseSidebarButton_eoK2",P="collapseSidebarButtonIcon_e+kA",w="sidebarMenuIcon_iZzd",x="sidebarMenuCloseIcon_6kU2",I=(e,t)=>"link"===e.type?(0,u.Mg)(e.href,t):"category"===e.type&&e.items.some((e=>I(e,t))),j=(0,a.memo)((function(e){let{items:t,...n}=e;return t.map(((e,t)=>a.createElement(L,(0,c.Z)({key:t,item:e},n))))}));function L(e){return"category"===e.item.type?a.createElement(B,e):a.createElement(A,e)}function B(e){let{item:t,onItemClick:n,collapsible:r,activePath:o,...l}=e;const{items:s,label:d}=t,m=I(t,o),p=(0,u.D9)(m),[h,f]=(0,a.useState)((()=>!!r&&(!m&&t.collapsed))),b=(0,a.useRef)(null),[g,y]=(0,a.useState)(void 0),v=function(e){var t;void 0===e&&(e=!0),y(e?`${null==(t=b.current)?void 0:t.scrollHeight}px`:void 0)};(0,a.useEffect)((()=>{m&&!p&&h&&f(!1)}),[m,p,h]);const k=(0,a.useCallback)((e=>{e.preventDefault(),g||v(),setTimeout((()=>f((e=>!e))),100)}),[g]);return 0===s.length?null:a.createElement("li",{className:(0,i.Z)("menu__list-item",{"menu__list-item--collapsed":h})},a.createElement("a",(0,c.Z)({className:(0,i.Z)("menu__link",{"menu__link--sublist":r,"menu__link--active":r&&m,[S]:!r}),onClick:r?k:void 0,href:r?"#":void 0},l),d),a.createElement("ul",{className:"menu__list",ref:b,style:{height:g},onTransitionEnd:()=>{h||v(!1)}},a.createElement(j,{items:s,tabIndex:h?"-1":"0",onItemClick:n,collapsible:r,activePath:o})))}function A(e){let{item:t,onItemClick:n,activePath:r,collapsible:o,...l}=e;const{href:s,label:u}=t,d=I(t,r);return a.createElement("li",{className:"menu__list-item",key:u},a.createElement(h.Z,(0,c.Z)({className:(0,i.Z)("menu__link",{"menu__link--active":d}),to:s},(0,f.Z)(s)&&{isNavLink:!0,exact:!0,onClick:n},l),(0,f.Z)(s)?u:a.createElement("span",null,u,a.createElement(v.Z,null))))}function D(e){let{onClick:t}=e;return a.createElement("button",{type:"button",title:(0,k.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,k.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,i.Z)("button button--secondary button--outline",O),onClick:t},a.createElement(g,{className:P}))}function R(e){let{responsiveSidebarOpened:t,onClick:n}=e;return a.createElement("button",{"aria-label":t?(0,k.I)({id:"theme.docs.sidebar.responsiveCloseButtonLabel",message:"Close menu",description:"The ARIA label for close button of mobile doc sidebar"}):(0,k.I)({id:"theme.docs.sidebar.responsiveOpenButtonLabel",message:"Open menu",description:"The ARIA label for open button of mobile doc sidebar"}),"aria-haspopup":"true",className:"button button--secondary button--sm menu__button",type:"button",onClick:n},t?a.createElement("span",{className:(0,i.Z)(w,x)},"\xd7"):a.createElement(y.Z,{className:w,height:24,width:24}))}const $=function(e){let{path:t,sidebar:n,sidebarCollapsible:r=!0,onCollapse:o,isHidden:l}=e;const s=function(){const{isClosed:e}=(0,u.nT)(),[t,n]=(0,a.useState)(!e);return(0,p.Z)((t=>{let{scrollY:a}=t;e||n(0===a)})),t}(),{navbar:{hideOnScroll:c},hideableSidebar:h}=(0,u.LU)(),{isClosed:f}=(0,u.nT)(),{showResponsiveSidebar:g,closeResponsiveSidebar:y,toggleResponsiveSidebar:v}=function(){const[e,t]=(0,a.useState)(!1);(0,d.Z)(e);const n=(0,m.Z)();return(0,a.useEffect)((()=>{n===m.D.desktop&&t(!1)}),[n]),{showResponsiveSidebar:e,closeResponsiveSidebar:(0,a.useCallback)((e=>{e.target.blur(),t(!1)}),[t]),toggleResponsiveSidebar:(0,a.useCallback)((()=>{t((e=>!e))}),[t])}}();return a.createElement("div",{className:(0,i.Z)(E,{[C]:c,[_]:l})},c&&a.createElement(b.Z,{tabIndex:-1,className:N}),a.createElement("nav",{className:(0,i.Z)("menu","menu--responsive","thin-scrollbar",Z,{"menu--show":g,[T]:!f&&s}),"aria-label":(0,k.I)({id:"theme.docs.sidebar.navAriaLabel",message:"Sidebar navigation",description:"The ARIA label for documentation menu"})},a.createElement(R,{responsiveSidebarOpened:g,onClick:v}),a.createElement("ul",{className:"menu__list"},a.createElement(j,{items:n,onItemClick:y,collapsible:r,activePath:t}))),h&&a.createElement(D,{onClick:o}))};const M={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var H={Prism:n(7410).Z,theme:M};function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function F(){return F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},F.apply(this,arguments)}var U=/\r\n|\r|\n/,W=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},V=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},Q=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=F({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=F({},n,{backgroundColor:null}),r};function G(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}const Y=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),z(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?Q(e.theme,e.language):void 0;return t.themeDict=n})),z(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,o=F({},G(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==r&&(o.style=void 0!==o.style?F({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),z(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return o[n[0]];var l=a?{display:"inline-block"}:{},s=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(s))}})),z(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,o=e.token,l=F({},G(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?F({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),z(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var o=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],o=0,l=0,s=[],c=[s];l>-1;){for(;(o=a[l]++)<r[l];){var i=void 0,u=t[l],d=n[l][o];if("string"==typeof d?(u=l>0?u:["plain"],i=d):(u=V(u,d.type),d.alias&&(u=V(u,d.alias)),i=d.content),"string"==typeof i){var m=i.split(U),p=m.length;s.push({types:u,content:m[0]});for(var h=1;h<p;h++)W(s),c.push(s=[]),s.push({types:u,content:m[h]})}else l++,t.push(u),n.push(i),a.push(0),r.push(i.length)}l--,t.pop(),n.pop(),a.pop(),r.pop()}return W(s),c}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(a.Component);var q=n(7594),J=n.n(q);const X={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]};var K=n(5350);const ee=()=>{const{prism:e}=(0,u.LU)(),{isDarkTheme:t}=(0,K.Z)(),n=e.theme||X,a=e.darkTheme||n;return t?a:n},te="codeBlockContainer_J+bg",ne="codeBlockContent_csEI",ae="codeBlockTitle_oQzk",re="codeBlock_rtdJ",oe="codeBlockWithTitle_ZT05",le="copyButton_M3SB",se="codeBlockLines_1zSZ",ce=/{([\d,-]+)}/,ie=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);const t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},n=["highlight-next-line","highlight-start","highlight-end"].join("|"),a=e.map((e=>`(?:${t[e].start}\\s*(${n})\\s*${t[e].end})`)).join("|");return new RegExp(`^\\s*(?:${a})\\s*$`)};function ue(e){let{children:t,className:n,metastring:r,title:o}=e;const{prism:l}=(0,u.LU)(),[s,d]=(0,a.useState)(!1),[m,p]=(0,a.useState)(!1);(0,a.useEffect)((()=>{p(!0)}),[]);const h=(0,u.bc)(r)||o,f=(0,a.useRef)(null);let b=[];const g=ee(),y=Array.isArray(t)?t.join(""):t;if(r&&ce.test(r)){const e=r.match(ce)[1];b=J()(e).filter((e=>e>0))}let v=n&&n.replace(/language-/,"");!v&&l.defaultLanguage&&(v=l.defaultLanguage);let E=y.replace(/\n$/,"");if(0===b.length&&void 0!==v){let e="";const t=(e=>{switch(e){case"js":case"javascript":case"ts":case"typescript":return ie(["js","jsBlock"]);case"jsx":case"tsx":return ie(["js","jsBlock","jsx"]);case"html":return ie(["js","jsBlock","html"]);case"python":case"py":return ie(["python"]);default:return ie()}})(v),n=y.replace(/\n$/,"").split("\n");let a;for(let r=0;r<n.length;){const o=r+1,l=n[r].match(t);if(null!==l){switch(l.slice(1).reduce(((e,t)=>e||t),void 0)){case"highlight-next-line":e+=`${o},`;break;case"highlight-start":a=o;break;case"highlight-end":e+=`${a}-${o-1},`}n.splice(r,1)}else r+=1}b=J()(e),E=n.join("\n")}const C=()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;const a=document.createElement("textarea"),r=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";const o=document.getSelection();let l=!1;o.rangeCount>0&&(l=o.getRangeAt(0)),n.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;let s=!1;try{s=document.execCommand("copy")}catch{}a.remove(),l&&(o.removeAllRanges(),o.addRange(l)),r&&r.focus()}(E),d(!0),setTimeout((()=>d(!1)),2e3)};return a.createElement(Y,(0,c.Z)({},H,{key:String(m),theme:g,code:E,language:v}),(e=>{let{className:t,style:n,tokens:r,getLineProps:o,getTokenProps:l}=e;return a.createElement("div",{className:te},h&&a.createElement("div",{style:n,className:ae},h),a.createElement("div",{className:(0,i.Z)(ne,v)},a.createElement("pre",{tabIndex:0,className:(0,i.Z)(t,re,"thin-scrollbar",{[oe]:h}),style:n},a.createElement("code",{className:se},r.map(((e,t)=>{1===e.length&&""===e[0].content&&(e[0].content="\n");const n=o({line:e,key:t});return b.includes(t+1)&&(n.className+=" docusaurus-highlight-code-line"),a.createElement("span",(0,c.Z)({key:t},n),e.map(((e,t)=>a.createElement("span",(0,c.Z)({key:t},l({token:e,key:t}))))))})))),a.createElement("button",{ref:f,type:"button","aria-label":(0,k.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,i.Z)(le,"clean-btn"),onClick:C},s?a.createElement(k.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):a.createElement(k.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var de=n(6159);const me={code:e=>{const{children:t}=e;return(0,a.isValidElement)(t)?t:t.includes("\n")?a.createElement(ue,e):a.createElement("code",e)},a:e=>a.createElement(h.Z,e),pre:e=>{var t;const{children:n}=e;return(0,a.isValidElement)(null==n||null==(t=n.props)?void 0:t.children)?null==n?void 0:n.props.children:a.createElement(ue,(0,a.isValidElement)(n)?null==n?void 0:n.props:{children:n})},h1:(0,de.Z)("h1"),h2:(0,de.Z)("h2"),h3:(0,de.Z)("h3"),h4:(0,de.Z)("h4"),h5:(0,de.Z)("h5"),h6:(0,de.Z)("h6")};var pe=n(4608),he=n(5977);const fe={docPage:"docPage_lDyR",docMainContainer:"docMainContainer_r8cw",docMainContainerEnhanced:"docMainContainerEnhanced_SOUu",docSidebarContainer:"docSidebarContainer_0YBq",docSidebarContainerHidden:"docSidebarContainerHidden_Qlt2",collapsedDocSidebar:"collapsedDocSidebar_zZpm",expandSidebarButtonIcon:"expandSidebarButtonIcon_cxi8",docItemWrapperEnhanced:"docItemWrapperEnhanced_aT5H"};function be(e){var t;let{currentDocRoute:n,versionMetadata:l,children:c}=e;const{siteConfig:d,isClient:m}=(0,o.Z)(),{pluginId:p,version:h}=l,{sidebarName:f,sidebar:b}=function(e){let{versionMetadata:t,currentDocRoute:n}=e;const{permalinkToSidebar:a,docsSidebars:r}=t,o=a[n.path]||a[(l=n.path,l.endsWith("/")?l:`${l}/`)]||a[function(e){return e.endsWith("/")?e.slice(0,-1):e}(n.path)];var l;return{sidebar:r[o],sidebarName:o}}({versionMetadata:l,currentDocRoute:n}),[y,v]=(0,a.useState)(!1),[E,C]=(0,a.useState)(!1),_=(0,a.useCallback)((()=>{E&&C(!1),v(!y)}),[E]);return a.createElement(s.Z,{key:m,wrapperClassName:u.kM.wrapper.docPages,pageClassName:u.kM.page.docPage,searchMetadatas:{version:h,tag:(0,u.os)(p,h)}},a.createElement("div",{className:fe.docPage},b&&a.createElement("aside",{className:(0,i.Z)(fe.docSidebarContainer,{[fe.docSidebarContainerHidden]:y}),onTransitionEnd:e=>{e.currentTarget.classList.contains(fe.docSidebarContainer)&&y&&C(!0)}},a.createElement($,{key:f,sidebar:b,path:n.path,sidebarCollapsible:(null==(t=d.themeConfig)?void 0:t.sidebarCollapsible)??!0,onCollapse:_,isHidden:E}),E&&a.createElement("div",{className:fe.collapsedDocSidebar,title:(0,k.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,k.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:_,onClick:_},a.createElement(g,{className:fe.expandSidebarButtonIcon}))),a.createElement("main",{className:(0,i.Z)(fe.docMainContainer,{[fe.docMainContainerEnhanced]:y||!b})},a.createElement("div",{className:(0,i.Z)("container padding-top--md padding-bottom--lg",fe.docItemWrapper,{[fe.docItemWrapperEnhanced]:y})},a.createElement(r.Zo,{components:me},c)))))}const ge=function(e){const{route:{routes:t},versionMetadata:n,location:r}=e,o=t.find((e=>(0,he.LX)(r.pathname,e)));return o?a.createElement(be,{currentDocRoute:o,versionMetadata:n},(0,l.Z)(t,{versionMetadata:n})):a.createElement(pe.default,e)}},6159:(e,t,n)=>{"use strict";n.d(t,{N:()=>u,Z:()=>d});var a=n(7462),r=n(7294),o=n(6010),l=n(4973),s=n(9306);const c="enhancedAnchor_WiXH",i="h1Heading_dC7a",u=function(e){let{...t}=e;return r.createElement("header",null,r.createElement("h1",(0,a.Z)({},t,{id:void 0,className:i}),t.children))},d=e=>{return"h1"===e?u:(t=e,function(e){let{id:n,...a}=e;const{navbar:{hideOnScroll:i}}=(0,s.LU)();return n?r.createElement(t,a,r.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,o.Z)("anchor",{[c]:!i}),id:n}),a.children,r.createElement("a",{className:"hash-link",href:`#${n}`,title:(0,l.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):r.createElement(t,a)});var t}},4608:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>l});var a=n(7294),r=n(4986),o=n(4973);const l=function(){return a.createElement(r.Z,{title:(0,o.I)({id:"theme.NotFound.title",message:"Page Not Found"})},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(o.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},546:(e,t,n)=>{"use strict";n.d(t,{Z:()=>b});var a=n(7462),r=n(7294),o=n(6010),l=n(6742),s=n(9306),c=n(2263),i=n(4996);const u="footerLogoLink_94kH";var d=n(8465);function m(e){let{to:t,href:n,label:o,prependBaseUrlToHref:s,...c}=e;const u=(0,i.Z)(t),d=(0,i.Z)(n,{forcePrependBaseUrl:!0});return r.createElement(l.Z,(0,a.Z)({className:"footer__link-item"},n?{href:s?d:n}:{to:u},c),o)}const p=e=>{let{sources:t,alt:n}=e;return r.createElement(d.Z,{className:"footer__logo",alt:n,sources:t})};let h=!1;function f(){return(0,r.useEffect)((()=>{if(!h){let e=document.createElement("script");e.src="https://buttons.github.io/buttons.js",document.body.appendChild(e),h=!0}}),[]),r.createElement("div",{className:"gitstar"},r.createElement("a",{className:"github-button",href:"https://github.com/PlatONnetwork/PlatON-Go","data-color-scheme":"no-preference: light; light: light; dark: light;","data-icon":"octicon-star","data-size":"small","data-show-count":"true","aria-label":"Star PlatONnetwork/PlatON-Go on GitHub"},"Star"))}const b=function(){const{footer:e}=(0,s.LU)(),{copyright:t,links:n=[],logo:a={}}=e||{},{i18n:d}=(0,c.Z)(),h={light:(0,i.Z)(a.src),dark:(0,i.Z)(a.srcDark||a.src)};return e?("en"!==d.currentLocale&&n.map((e=>{e.items.map((e=>{e.hrefzh&&(e.href=e.hrefzh)}))})),r.createElement("footer",{className:(0,o.Z)("footer",{"footer--dark":"dark"===e.style})},r.createElement("div",{className:"container"},n&&n.length>0&&r.createElement("div",{className:"row footer__links"},n.map(((e,t)=>r.createElement("div",{key:t,className:"col footer__col"},null!=e.title?r.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?r.createElement("ul",{className:"footer__items"},e.items.map(((e,t)=>e.html?r.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):e.img?r.createElement("li",{key:e.href||e.to,className:"footer__item"},r.createElement("a",{href:e.href,target:"_blank",className:"footer-logo-home",rel:"noreferrer noopener"},r.createElement("img",{src:(0,i.Z)(e.img),width:"66",height:"58"}))):r.createElement("li",{key:e.href||e.to,className:"footer__item"},r.createElement(m,e))))):null))),r.createElement(f,null)),(a||t)&&r.createElement("div",{className:"footer__bottom text--center"},a&&(a.src||a.srcDark)&&r.createElement("div",{className:"margin-bottom--sm"},a.href?r.createElement(l.Z,{href:a.href,className:u},r.createElement(p,{alt:a.alt,sources:h})):r.createElement(p,{alt:a.alt,sources:h})),t?r.createElement("div",{className:"footer__copyright",dangerouslySetInnerHTML:{__html:t}}):null)))):null}},532:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(7462),r=n(7294),o=n(5525),l=(n(3264),n(2263)),s=n(5977);const c=function(){const{siteConfig:{baseUrl:e,url:t},i18n:{defaultLocale:n,currentLocale:a}}=(0,l.Z)(),{pathname:r}=(0,s.TH)(),o=a===n?e:e.replace(`/${a}/`,`/${n}/`),c=r.replace(e,"");return{createUrl:function(e){let{locale:a,fullyQualified:r}=e;return`${r?t:""}${function(e){return e===n?`${o}`:`${o.replace(`/${n}/`,`/${e}/`)}`}(a)}${c}`}}};function i(e){let{mobile:t,dropdownItemsBefore:n,dropdownItemsAfter:s,...i}=e;const{i18n:{currentLocale:u,locales:d,localeConfigs:m}}=(0,l.Z)(),p=c();function h(e){return m[e].label}const f=[...n,...d.map((e=>{const t=`pathname://${p.createUrl({locale:e,fullyQualified:!1})}`;return{isNavLink:!0,label:h(e),to:t,target:"_self",autoAddBaseUrl:!1,className:e===u?"dropdown__link--active":"",style:{textTransform:"capitalize"}}})),...s],b=t?"Languages":h(u);return r.createElement(o.Z,(0,a.Z)({},i,{href:"#",mobile:t,label:r.createElement("span",null,b),items:f}))}},6979:(e,t,n)=>{"use strict";n.d(t,{Z:()=>v});var a=n(7462),r=n(7294),o=n(3935),l=n(2263),s=n(5977),c=(n(4996),n(6742)),i=n(9105),u=n(6397),d=n(7052),m=n(6747),p=n(5613),h=n(4973);let f=null;function b(e){let{hit:t,children:n}=e;return r.createElement(c.Z,{to:t.url,autoAddBaseUrl:!1,target:"_self"},n)}function g(e){let{state:t,onClose:n}=e;const{generateSearchPageLink:a}=(0,u.Z)();return r.createElement(c.Z,{to:a(t.query),onClick:n},"See all ",t.context.nbHits," results")}function y(e){var t;let{contextualSearch:c,...u}=e;const{siteMetadata:y}=(0,l.Z)(),v=(0,p.Z)(),k=(null==(t=u.searchParameters)?void 0:t.facetFilters)??[],E=c?[...v,...k]:k,C={...u.searchParameters,facetFilters:E},_=((0,s.k6)(),(0,r.useRef)(null)),N=(0,r.useRef)(null),[Z,S]=(0,r.useState)(!1),[T,O]=(0,r.useState)(null),P=(0,r.useCallback)((()=>f?Promise.resolve():Promise.all([n.e(2431).then(n.bind(n,2431)),Promise.all([n.e(532),n.e(6945)]).then(n.bind(n,6945)),Promise.all([n.e(532),n.e(9846)]).then(n.bind(n,9846))]).then((e=>{let[{DocSearchModal:t}]=e;f=t}))),[]),w=(0,r.useCallback)((()=>{P().then((()=>{_.current=document.createElement("div"),document.body.insertBefore(_.current,document.body.firstChild),S(!0)}))}),[P,S]),x=(0,r.useCallback)((()=>{S(!1),_.current.remove()}),[S]),I=(0,r.useCallback)((e=>{P().then((()=>{S(!0),O(e.key)}))}),[P,S,O]),j=(0,r.useRef)({navigate(e){let{itemUrl:t}=e;window.location.assign(t)}}).current,L=(0,r.useRef)((e=>e.map((e=>{const t=document.createElement("a");return t.href=e.url,{...e,url:`${window.location.origin}${t.pathname}${t.hash}`}})))).current,B=(0,r.useMemo)((()=>e=>r.createElement(g,(0,a.Z)({},e,{onClose:x}))),[x]),A=(0,r.useCallback)((e=>(e.addAlgoliaAgent("docusaurus",y.docusaurusVersion),e)),[y.docusaurusVersion]);(0,d.D)({isOpen:Z,onOpen:w,onClose:x,onInput:I,searchButtonRef:N});const D=(0,h.I)({id:"theme.SearchBar.label",message:"Search",description:"The ARIA label and placeholder for search button"});return r.createElement(r.Fragment,null,r.createElement(i.Z,null,r.createElement("link",{rel:"preconnect",href:`https://${u.appId}-dsn.algolia.net`,crossOrigin:"anonymous"})),r.createElement(m.a,{onTouchStart:P,onFocus:P,onMouseOver:P,onClick:w,ref:N,translations:{buttonText:D,buttonAriaLabel:D}}),Z&&(0,o.createPortal)(r.createElement(f,(0,a.Z)({onClose:x,initialScrollY:window.scrollY,initialQuery:T,navigator:j,transformItems:L,hitComponent:b,resultsFooterComponent:B,transformSearchClient:A},u,{searchParameters:C})),_.current))}const v=function(){const{siteConfig:e}=(0,l.Z)();return r.createElement(y,e.themeConfig.algolia)}},7594:(e,t)=>{function n(e){let t,n=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))n.push(parseInt(a,10));else if(t=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,r,o]=t;if(a&&o){a=parseInt(a),o=parseInt(o);const e=a<o?1:-1;"-"!==r&&".."!==r&&"\u2025"!==r||(o+=e);for(let t=a;t!==o;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);