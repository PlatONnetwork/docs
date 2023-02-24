"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2317],{6747:(e,t,n)=>{n.d(t,{a:()=>d});var a=n(7294);function r(){return a.createElement("svg",{width:"15",height:"15",className:"DocSearch-Control-Key-Icon"},a.createElement("path",{d:"M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953",strokeWidth:"1.2",stroke:"currentColor",fill:"none",strokeLinecap:"square"}))}var o=n(830),c=["translations"];function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l.apply(this,arguments)}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],c=!0,l=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);c=!0);}catch(s){l=!0,r=s}finally{try{c||null==n.return||n.return()}finally{if(l)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function u(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var m="Ctrl";var d=a.forwardRef((function(e,t){var n=e.translations,i=void 0===n?{}:n,d=u(e,c),h=i.buttonText,f=void 0===h?"Search":h,v=i.buttonAriaLabel,g=void 0===v?"Search":v,b=s((0,a.useState)(null),2),p=b[0],E=b[1];return(0,a.useEffect)((function(){"undefined"!=typeof navigator&&(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)?E("\u2318"):E(m))}),[]),a.createElement("button",l({type:"button",className:"DocSearch DocSearch-Button","aria-label":g},d,{ref:t}),a.createElement("span",{className:"DocSearch-Button-Container"},a.createElement(o.W,null),a.createElement("span",{className:"DocSearch-Button-Placeholder"},f)),a.createElement("span",{className:"DocSearch-Button-Keys"},null!==p&&a.createElement(a.Fragment,null,a.createElement("kbd",{className:"DocSearch-Button-Key"},p===m?a.createElement(r,null):p),a.createElement("kbd",{className:"DocSearch-Button-Key"},"K"))))}))},830:(e,t,n)=>{n.d(t,{W:()=>r});var a=n(7294);function r(){return a.createElement("svg",{width:"20",height:"20",className:"DocSearch-Search-Icon",viewBox:"0 0 20 20"},a.createElement("path",{d:"M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"}))}},7052:(e,t,n)=>{n.d(t,{D:()=>r});var a=n(7294);function r(e){var t=e.isOpen,n=e.onOpen,r=e.onClose,o=e.onInput,c=e.searchButtonRef;a.useEffect((function(){function e(e){(27===e.keyCode&&t||"k"===e.key.toLowerCase()&&(e.metaKey||e.ctrlKey)||!function(e){var t=e.target,n=t.tagName;return t.isContentEditable||"INPUT"===n||"SELECT"===n||"TEXTAREA"===n}(e)&&"/"===e.key&&!t)&&(e.preventDefault(),t?r():document.body.classList.contains("DocSearch--active")||document.body.classList.contains("DocSearch--active")||n()),c&&c.current===document.activeElement&&o&&/[a-zA-Z0-9]/.test(String.fromCharCode(e.keyCode))&&o(e)}return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[t,n,r,o,c])}},8617:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294);const r="iconExternalLink_wgqa",o=e=>{let{width:t=13.5,height:n=13.5}=e;return a.createElement("svg",{width:t,height:n,"aria-hidden":"true",viewBox:"0 0 24 24",className:r},a.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))}},3264:(e,t,n)=>{n(7294)},4478:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7462),r=n(7294);const o=e=>{let{width:t=30,height:n=30,className:o,...c}=e;return r.createElement("svg",(0,a.Z)({className:o,width:t,height:n,viewBox:"0 0 30 30","aria-hidden":"true"},c),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))}},4986:(e,t,n)=>{n.d(t,{Z:()=>ce});var a=n(7294),r=n(6010),o=n(6550),c=n(4973),l=n(9306);const s={skipToContent:"skipToContent_OuoZ"};function i(e){e.setAttribute("tabindex","-1"),e.focus(),e.removeAttribute("tabindex")}const u=function(){const e=(0,a.useRef)(null),{action:t}=(0,o.k6)();return(0,l.SL)((n=>{let{location:a}=n;e.current&&!a.hash&&"POP"!==t&&i(e.current)})),a.createElement("div",{ref:e},a.createElement("a",{href:"#",className:s.skipToContent,onClick:e=>{e.preventDefault();const t=document.querySelector("main:first-of-type")||document.querySelector(".main-wrapper");t&&i(t)}},a.createElement(c.Z,{id:"theme.common.skipToMainContent",description:"The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation"},"Skip to main content")))},m={announcementBar:"announcementBar_axC9",announcementBarClose:"announcementBarClose_A3A1",announcementBarContent:"announcementBarContent_6uhP",announcementBarCloseable:"announcementBarCloseable_y4cp"};const d=function(){const{isClosed:e,close:t}=(0,l.nT)(),{announcementBar:n}=(0,l.LU)();if(!n)return null;const{content:o,backgroundColor:s,textColor:i,isCloseable:u}=n;return!o||u&&e?null:a.createElement("div",{className:m.announcementBar,style:{backgroundColor:s,color:i},role:"banner"},a.createElement("div",{className:(0,r.Z)(m.announcementBarContent,{[m.announcementBarCloseable]:u}),dangerouslySetInnerHTML:{__html:o}}),u?a.createElement("button",{type:"button",className:(0,r.Z)(m.announcementBarClose,"clean-btn"),onClick:t,"aria-label":(0,c.I)({id:"theme.AnnouncementBar.closeButtonAriaLabel",message:"Close",description:"The ARIA label for close button of announcement bar"})},a.createElement("span",{"aria-hidden":"true"},"\xd7")):null)};var h=n(7462),f=n(6979),v=n(2263);const g={toggle:"toggle_iYfV"},b=e=>{let{icon:t,style:n}=e;return a.createElement("span",{className:(0,r.Z)(g.toggle,g.dark),style:n},t)},p=e=>{let{icon:t,style:n}=e;return a.createElement("span",{className:(0,r.Z)(g.toggle,g.light),style:n},t)},E=(0,a.memo)((e=>{let{className:t,icons:n,checked:o,disabled:c,onChange:l}=e;const[s,i]=(0,a.useState)(o),[u,m]=(0,a.useState)(!1),d=(0,a.useRef)(null);return a.createElement("div",{className:(0,r.Z)("react-toggle",t,{"react-toggle--checked":s,"react-toggle--focus":u,"react-toggle--disabled":c})},a.createElement("div",{className:"react-toggle-track",role:"button",tabIndex:-1,onClick:()=>d.current?.click()},a.createElement("div",{className:"react-toggle-track-check"},n.checked),a.createElement("div",{className:"react-toggle-track-x"},n.unchecked),a.createElement("div",{className:"react-toggle-thumb"})),a.createElement("input",{ref:d,checked:s,type:"checkbox",className:"react-toggle-screenreader-only","aria-label":"Switch between dark and light mode",onChange:l,onClick:()=>i(!s),onFocus:()=>m(!0),onBlur:()=>m(!1)}))}));function k(e){const{colorMode:{switchConfig:{darkIcon:t,darkIconStyle:n,lightIcon:r,lightIconStyle:o}}}=(0,l.LU)(),{isClient:c}=(0,v.Z)();return a.createElement(E,(0,h.Z)({disabled:!c,icons:{checked:a.createElement(b,{icon:t,style:n}),unchecked:a.createElement(p,{icon:r,style:o})}},e))}var y=n(5350),Z=n(7898);const w=e=>{const t=(0,o.TH)(),[n,r]=(0,a.useState)(e),c=(0,a.useRef)(!1),[s,i]=(0,a.useState)(0),u=(0,a.useCallback)((e=>{null!==e&&i(e.getBoundingClientRect().height)}),[]);return(0,Z.Z)(((t,n)=>{let{scrollY:a}=t,{scrollY:o}=n;if(!e)return;if(a<s)return void r(!0);if(c.current)return c.current=!1,void r(!1);o&&0===a&&r(!0);const l=document.documentElement.scrollHeight-s,i=window.innerHeight;o&&a>=o?r(!1):a+i<l&&r(!0)}),[s,c]),(0,l.SL)((t=>{e&&!t.location.hash&&r(!0)})),(0,a.useEffect)((()=>{e&&t.hash&&(c.current=!0)}),[t.hash]),{navbarRef:u,isNavbarVisible:n}};var C=n(1839),N=n(3783),_=n(5525),L=n(532);function S(e){let{mobile:t}=e;return t?null:a.createElement(f.Z,null)}const D={default:()=>_.Z,localeDropdown:()=>L.Z,search:()=>S,docsVersion:()=>n(7250).Z,docsVersionDropdown:()=>n(9308).Z,doc:()=>n(6400).Z},I=function(e){void 0===e&&(e="default");const t=D[e];if(!t)throw new Error(`No NavbarItem component found for type "${e}".`);return t()};function T(e){let{type:t,...n}=e;const r=I(t);return a.createElement(r,n)}var B=n(5537),M=n(4478);const O={displayOnlyInLargeViewport:"displayOnlyInLargeViewport_cxYs",navbarHideable:"navbarHideable_RReh",navbarHidden:"navbarHidden_FBwS"},A="right";const x=function(){const{navbar:{items:e,hideOnScroll:t,style:n},colorMode:{disableSwitch:o}}=(0,l.LU)(),[c,s]=(0,a.useState)(!1),{isDarkTheme:i,setLightTheme:u,setDarkTheme:m}=(0,y.Z)(),{navbarRef:d,isNavbarVisible:v}=w(t);(0,C.Z)(c);const g=(0,a.useCallback)((()=>{s(!0)}),[s]),b=(0,a.useCallback)((()=>{s(!1)}),[s]),p=(0,a.useCallback)((e=>e.target.checked?m():u()),[u,m]),E=(0,N.Z)();(0,a.useEffect)((()=>{E===N.D.desktop&&s(!1)}),[E]);const Z=e.some((e=>"search"===e.type)),{leftItems:_,rightItems:L}=function(e){return{leftItems:e.filter((e=>"left"===(e.position??A))),rightItems:e.filter((e=>"right"===(e.position??A)))}}(e);return a.createElement("nav",{ref:d,className:(0,r.Z)("navbar","navbar--fixed-top",{"navbar--dark":"dark"===n,"navbar--primary":"primary"===n,"navbar-sidebar--show":c,[O.navbarHideable]:t,[O.navbarHidden]:t&&!v})},a.createElement("div",{className:"navbar__inner"},a.createElement("div",{className:"navbar__items"},null!=e&&0!==e.length&&a.createElement("button",{"aria-label":"Navigation bar toggle",className:"navbar__toggle clean-btn",type:"button",tabIndex:0,onClick:g,onKeyDown:g},a.createElement(M.Z,null)),a.createElement(B.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title"}),_.map(((e,t)=>a.createElement(T,(0,h.Z)({},e,{key:t}))))),a.createElement("div",{className:"navbar__items navbar__items--right"},L.map(((e,t)=>a.createElement(T,(0,h.Z)({},e,{key:t})))),!o&&a.createElement(k,{className:O.displayOnlyInLargeViewport,checked:i,onChange:p}),!Z&&a.createElement(f.Z,null))),a.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:b}),a.createElement("div",{className:"navbar-sidebar"},a.createElement("div",{className:"navbar-sidebar__brand"},a.createElement(B.Z,{className:"navbar__brand",imageClassName:"navbar__logo",titleClassName:"navbar__title",onClick:b}),!o&&c&&a.createElement(k,{checked:i,onChange:p})),a.createElement("div",{className:"navbar-sidebar__items"},a.createElement("div",{className:"menu"},a.createElement("ul",{className:"menu__list"},e.map(((e,t)=>a.createElement(T,(0,h.Z)({mobile:!0},e,{onClick:b,key:t})))))))))};var P=n(546),R=n(412);const V=(0,l.WA)("theme"),U="light",H="dark",$=e=>e===H?H:U,W=e=>{(0,l.WA)("theme").set($(e))},j=()=>{const{colorMode:{defaultMode:e,disableSwitch:t,respectPrefersColorScheme:n}}=(0,l.LU)(),[r,o]=(0,a.useState)((e=>R.Z.canUseDOM?$(document.documentElement.getAttribute("data-theme")):$(e))(e)),c=(0,a.useCallback)((()=>{o(U),W(U)}),[]),s=(0,a.useCallback)((()=>{o(H),W(H)}),[]);return(0,a.useEffect)((()=>{document.documentElement.setAttribute("data-theme",$(r))}),[r]),(0,a.useEffect)((()=>{if(!t)try{const e=V.get();null!==e&&o($(e))}catch(e){console.error(e)}}),[o]),(0,a.useEffect)((()=>{t&&!n||window.matchMedia("(prefers-color-scheme: dark)").addListener((e=>{let{matches:t}=e;o(t?H:U)}))}),[]),{isDarkTheme:r===H,setLightTheme:c,setDarkTheme:s}};var K=n(2924);const z=function(e){const{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}=j();return a.createElement(K.Z.Provider,{value:{isDarkTheme:t,setLightTheme:n,setDarkTheme:r}},e.children)},q="docusaurus.tab.",F=()=>{const[e,t]=(0,a.useState)({}),n=(0,a.useCallback)(((e,t)=>{(0,l.WA)(`${q}${e}`).set(t)}),[]);return(0,a.useEffect)((()=>{try{const e={};(0,l._f)().forEach((t=>{if(t.startsWith(q)){const n=t.substring(q.length);e[n]=(0,l.WA)(t).get()}})),t(e)}catch(e){console.error(e)}}),[]),{tabGroupChoices:e,setTabGroupChoices:(e,a)=>{t((t=>({...t,[e]:a}))),n(e,a)}}},G=(0,a.createContext)(void 0);const Y=function(e){const{tabGroupChoices:t,setTabGroupChoices:n}=F();return a.createElement(G.Provider,{value:{tabGroupChoices:t,setTabGroupChoices:n}},e.children)};function X(e){let{children:t}=e;return a.createElement(z,null,a.createElement(l.pl,null,a.createElement(Y,null,a.createElement(l.L5,null,t))))}var J=n(9105),Q=n(4996);function ee(e){let{locale:t,version:n,tag:r}=e;const o=t;return a.createElement(J.Z,null,o&&a.createElement("meta",{name:"docsearch:language",content:o}),n&&a.createElement("meta",{name:"docsearch:version",content:n}),r&&a.createElement("meta",{name:"docsearch:docusaurus_tag",content:r}))}var te=n(1217);function ne(){const{i18n:{defaultLocale:e,locales:t}}=(0,v.Z)(),n=(0,l.l5)();return a.createElement(J.Z,null,t.map((e=>a.createElement("link",{key:e,rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:e}))),a.createElement("link",{rel:"alternate",href:n.createUrl({locale:e,fullyQualified:!0}),hrefLang:"x-default"}))}function ae(e){let{permalink:t}=e;const{siteConfig:{url:n}}=(0,v.Z)(),r=function(){const{siteConfig:{url:e}}=(0,v.Z)(),{pathname:t}=(0,o.TH)();return e+(0,Q.Z)(t)}(),c=t?`${n}${t}`:r;return a.createElement(J.Z,null,a.createElement("meta",{property:"og:url",content:c}),a.createElement("link",{rel:"canonical",href:c}))}function re(e){const{siteConfig:{favicon:t,themeConfig:{metadatas:n,image:r}},i18n:{currentLocale:o,localeConfigs:c}}=(0,v.Z)(),{title:s,description:i,image:u,keywords:m,searchMetadatas:d}=e,f=(0,Q.Z)(t),g=(0,l.pe)(s),b=o,p=c[o].direction;return a.createElement(a.Fragment,null,a.createElement(J.Z,null,a.createElement("html",{lang:b,dir:p}),t&&a.createElement("link",{rel:"shortcut icon",href:f}),a.createElement("title",null,g),a.createElement("meta",{property:"og:title",content:g}),u||r&&a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),a.createElement(te.Z,{description:i,keywords:m,image:u}),a.createElement(ae,null),a.createElement(ne,null),a.createElement(ee,(0,h.Z)({tag:l.HX,locale:o},d)),a.createElement(J.Z,null,n.map(((e,t)=>a.createElement("meta",(0,h.Z)({key:`metadata_${t}`},e))))))}const oe=function(){(0,a.useEffect)((()=>{const e="navigation-with-keyboard";function t(t){"keydown"===t.type&&"Tab"===t.key&&document.body.classList.add(e),"mousedown"===t.type&&document.body.classList.remove(e)}return document.addEventListener("keydown",t),document.addEventListener("mousedown",t),()=>{document.body.classList.remove(e),document.removeEventListener("keydown",t),document.removeEventListener("mousedown",t)}}),[])};const ce=function(e){const{children:t,noFooter:n,wrapperClassName:o,pageClassName:c}=e;return oe(),a.createElement(X,null,a.createElement(re,e),a.createElement(u,null),a.createElement(d,null),a.createElement(x,null),a.createElement("div",{className:(0,r.Z)(l.kM.wrapper.main,o,c)},t),!n&&a.createElement(P.Z,null))}},5537:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7462),r=n(7294),o=n(6742),c=n(8465),l=n(4996),s=n(2263);const i=e=>{const{siteConfig:{title:t,themeConfig:{navbar:{title:n,logo:i={src:""}}}},isClient:u}=(0,s.Z)(),{imageClassName:m,titleClassName:d,...h}=e,f=(0,l.Z)(i.href||"/"),v={light:(0,l.Z)(i.src),dark:(0,l.Z)(i.srcDark||i.src)};return r.createElement(o.Z,(0,a.Z)({to:f},h,i.target&&{target:i.target}),i.src&&r.createElement(c.Z,{key:u,className:m,sources:v,alt:i.alt||n||t}),null!=n&&r.createElement("b",{className:d},n))}},5525:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(7462),r=n(7294),o=n(6010),c=n(6742),l=n(4996),s=n(6550),i=n(9306),u=n(8617),m=n(3919);const d="dropdown__link--active";function h(e){let{activeBasePath:t,activeBaseRegex:n,to:o,href:s,label:i,activeClassName:h="navbar__link--active",prependBaseUrlToHref:f,...v}=e;const g=(0,l.Z)(o),b=(0,l.Z)(t),p=(0,l.Z)(s,{forcePrependBaseUrl:!0}),E=i&&s&&!(0,m.Z)(s),k=h===d;return r.createElement(c.Z,(0,a.Z)({},s?{href:f?p:s}:{isNavLink:!0,activeClassName:h,to:g,...t||n?{isActive:(e,t)=>n?new RegExp(n).test(t.pathname):t.pathname.startsWith(b)}:null},v),E?r.createElement("span",null,i,r.createElement(u.Z,k&&{width:12,height:12})):i)}function f(e){let{items:t,position:n,className:c,...l}=e;const s=(0,r.useRef)(null),i=(0,r.useRef)(null),[u,m]=(0,r.useState)(!1);(0,r.useEffect)((()=>{const e=e=>{s.current&&!s.current.contains(e.target)&&m(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[s]);const f=function(e,t){return void 0===t&&(t=!1),(0,o.Z)({"navbar__item navbar__link":!t,dropdown__link:t},e)};return t?r.createElement("div",{ref:s,className:(0,o.Z)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===n,"dropdown--right":"right"===n,"dropdown--show":u})},r.createElement(h,(0,a.Z)({className:f(c)},l,{onClick:l.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),m(!u))}}),l.children??l.label),r.createElement("ul",{ref:i,className:"dropdown__menu"},t.map(((e,n)=>{let{className:o,...c}=e;return r.createElement("li",{key:n},r.createElement(h,(0,a.Z)({onKeyDown:e=>{if(n===t.length-1&&"Tab"===e.key){e.preventDefault(),m(!1);const t=s.current.nextElementSibling;t&&t.focus()}},activeClassName:d,className:f(o,!0)},c)))})))):r.createElement(h,(0,a.Z)({className:f(c)},l))}function v(e){let{items:t,className:n,position:c,...l}=e;const u=(0,r.useRef)(null),{pathname:m}=(0,s.TH)(),[d,f]=(0,r.useState)((()=>!t?.some((e=>(0,i.Mg)(e.to,m)))??!0)),v=function(e,t){return void 0===t&&(t=!1),(0,o.Z)("menu__link",{"menu__link--sublist":t},e)};if(!t)return r.createElement("li",{className:"menu__list-item"},r.createElement(h,(0,a.Z)({className:v(n)},l)));const g=u.current?.scrollHeight?`${u.current?.scrollHeight}px`:void 0;return r.createElement("li",{className:(0,o.Z)("menu__list-item",{"menu__list-item--collapsed":d})},r.createElement(h,(0,a.Z)({role:"button",className:v(n,!0)},l,{onClick:e=>{e.preventDefault(),f((e=>!e))}}),l.children??l.label),r.createElement("ul",{className:"menu__list",ref:u,style:{height:d?void 0:g}},t.map(((e,t)=>{let{className:n,...o}=e;return r.createElement("li",{className:"menu__list-item",key:t},r.createElement(h,(0,a.Z)({activeClassName:"menu__link--active",className:v(n)},o,{onClick:l.onClick})))}))))}const g=function(e){let{mobile:t=!1,...n}=e;const a=t?v:f;return r.createElement(a,n)}},6400:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(7462),r=n(7294),o=n(5525),c=n(907),l=n(6010),s=n(9306),i=n(8780);function u(e){let{docId:t,activeSidebarClassName:n,label:u,docsPluginId:m,...d}=e;const{activeVersion:h,activeDoc:f}=(0,c.Iw)(m),{preferredVersion:v}=(0,s.J)(m),g=(0,c.yW)(m),b=function(e,t){const n=[].concat(...e.map((e=>e.docs))),a=n.find((e=>e.id===t));if(!a){const a=n.map((e=>e.id)).join("\n- ");throw new Error(`DocNavbarItem: couldn't find any doc with id "${t}" in version${e.length?"s":""} ${e.map((e=>e.name)).join(", ")}".\nAvailable doc ids are:\n- ${a}`)}return a}((0,i.uniq)([h,v,g].filter(Boolean)),t);return r.createElement(o.Z,(0,a.Z)({exact:!0},d,{className:(0,l.Z)(d.className,{[n]:f&&f.sidebar===b.sidebar}),label:u??b.id,to:b.path}))}},9308:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7462),r=n(7294),o=n(5525),c=n(907),l=n(9306);const s=e=>e.docs.find((t=>t.id===e.mainDocId));function i(e){let{mobile:t,docsPluginId:n,dropdownActiveClassDisabled:i,dropdownItemsBefore:u,dropdownItemsAfter:m,...d}=e;const h=(0,c.Iw)(n),f=(0,c.gB)(n),v=(0,c.yW)(n),{preferredVersion:g,savePreferredVersionName:b}=(0,l.J)(n);const p=function(){const e=f.map((e=>{const t=h?.alternateDocVersions[e.name]||s(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:()=>e===h?.activeVersion,onClick:()=>{b(e.name)}}})),t=[...u,...e,...m];if(!(t.length<=1))return t}(),E=h.activeVersion??g??v,k=t&&p?"Versions":E.label,y=t&&p?void 0:s(E).path;return r.createElement(o.Z,(0,a.Z)({},d,{mobile:t,label:k,to:y,items:p,isActive:i?()=>!1:void 0}))}},7250:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7462),r=n(7294),o=n(5525),c=n(907),l=n(9306);const s=e=>e.docs.find((t=>t.id===e.mainDocId));function i(e){let{label:t,to:n,docsPluginId:i,...u}=e;const m=(0,c.zu)(i),{preferredVersion:d}=(0,l.J)(i),h=(0,c.yW)(i),f=m??d??h,v=t??f.label,g=n??s(f).path;return r.createElement(o.Z,(0,a.Z)({},u,{label:v,to:g}))}},2924:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n(7294).createContext(void 0)},8465:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7462),r=n(7294),o=n(6010),c=n(2263),l=n(5350);const s={themedImage:"themedImage_TMUO","themedImage--light":"themedImage--light_4Vu1","themedImage--dark":"themedImage--dark_uzRr"},i=e=>{const{isClient:t}=(0,c.Z)(),{isDarkTheme:n}=(0,l.Z)(),{sources:i,className:u,alt:m="",...d}=e,h=t?n?["dark"]:["light"]:["light","dark"];return r.createElement(r.Fragment,null,h.map((e=>r.createElement("img",(0,a.Z)({key:e,src:i[e],alt:m,className:(0,o.Z)(s.themedImage,s[`themedImage--${e}`],u)},d)))))}},1839:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294);const r=function(e){void 0===e&&(e=!0),(0,a.useEffect)((()=>(document.body.style.overflow=e?"hidden":"visible",()=>{document.body.style.overflow="visible"})),[e])}},7898:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(7294),r=n(412);const o=()=>({scrollX:r.Z.canUseDOM?window.pageXOffset:0,scrollY:r.Z.canUseDOM?window.pageYOffset:0}),c=function(e,t){void 0===t&&(t=[]);const n=(0,a.useRef)(o()),r=()=>{const t=o();e&&e(t,n.current),n.current=t};(0,a.useEffect)((()=>{const e={passive:!0};return r(),window.addEventListener("scroll",r,e),()=>window.removeEventListener("scroll",r,e)}),t)}},5350:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),r=n(2924);const o=function(){const e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.');return e}},3783:(e,t,n)=>{n.d(t,{D:()=>c,Z:()=>l});var a=n(7294),r=n(412);const o=996,c={desktop:"desktop",mobile:"mobile"};const l=function(){const e=r.Z.canUseDOM;function t(){if(e)return window.innerWidth>o?c.desktop:c.mobile}const[n,l]=(0,a.useState)(t);return(0,a.useEffect)((()=>{if(e)return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n);function n(){l(t())}}),[]),n}},5613:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(907),r=n(9306),o=n(2263);function c(){const{locale:e,tags:t}=function(){const{i18n:e}=(0,o.Z)(),t=(0,a._r)(),n=(0,a.WS)(),c=(0,r.Oh)(),l=[r.HX,...Object.keys(t).map((function(e){const a=n?.activePlugin?.pluginId===e?n.activeVersion:void 0,o=c[e],l=t[e].versions.find((e=>e.isLast)),s=a??o??l;return(0,r.os)(e,s.name)}))];return{locale:e.currentLocale,tags:l}}();return[`language:${e}`,t.map((e=>`docusaurus_tag:${e}`))]}},6397:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(6550),r=n(412),o=n(2263);const c="q";const l=function(){const e=(0,a.k6)(),t=(0,a.TH)(),{siteConfig:{baseUrl:n}={}}=(0,o.Z)();return{searchValue:r.Z.canUseDOM&&new URLSearchParams(t.search).get(c)||"",updateSearchPath:n=>{const a=new URLSearchParams(t.search);n?a.set(c,n):a.delete(c),e.replace({search:a.toString()})},generateSearchPageLink:e=>`${n}search?q=${encodeURIComponent(e)}`}}}}]);