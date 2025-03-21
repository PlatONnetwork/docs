"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8401],{6287:(e,t,a)=>{a.d(t,{e:()=>d,A:()=>m});var n=a(8168),l=a(6540),r=a(53),i=a(4798),s=a(3155);const o="enhancedAnchor_WiXH",c="h1Heading_dC7a",d=function(e){let{...t}=e;return l.createElement("header",null,l.createElement("h1",(0,n.A)({},t,{id:void 0,className:c}),t.children))},m=e=>{return"h1"===e?d:(t=e,function(e){let{id:a,...n}=e;const{navbar:{hideOnScroll:c}}=(0,s.pN)();return a?l.createElement(t,n,l.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,r.A)("anchor",{[o]:!c}),id:a}),n.children,l.createElement("a",{className:"hash-link",href:`#${a}`,title:(0,i.T)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):l.createElement(t,n)});var t}},7436:(e,t,a)=>{a.r(t),a.d(t,{default:()=>I});var n=a(6540),l=a(4676),r=a(4798);const i=function(e){const{metadata:t}=e;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,r.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},n.createElement("div",{className:"pagination-nav__item"},t.previous&&n.createElement(l.A,{className:"pagination-nav__link",to:t.previous.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(r.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")),n.createElement("div",{className:"pagination-nav__label"},"\xab ",t.previous.title))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t.next&&n.createElement(l.A,{className:"pagination-nav__link",to:t.next.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(r.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next")),n.createElement("div",{className:"pagination-nav__label"},t.next.title," \xbb"))))};var s=a(4586),o=a(4098),c=a(3155);const d={unreleased:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(r.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(r.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function m(e){const t=d[e.versionMetadata.banner];return n.createElement(t,e)}function u(e){let{versionLabel:t,to:a,onClick:i}=e;return n.createElement(r.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(l.A,{to:a,onClick:i},n.createElement(r.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function v(e){let{versionMetadata:t}=e;const{siteConfig:{title:a}}=(0,s.A)(),{pluginId:l}=(0,o.vT)({failfast:!0}),{savePreferredVersionName:r}=(0,c.g1)(l),{latestDocSuggestion:i,latestVersionSuggestion:d}=(0,o.HW)(l),v=i??(h=d).docs.find((e=>e.id===h.mainDocId));var h;return n.createElement("div",{className:"alert alert--warning margin-bottom--md",role:"alert"},n.createElement("div",null,n.createElement(m,{siteTitle:a,versionMetadata:t})),n.createElement("div",{className:"margin-top--md"},n.createElement(u,{versionLabel:d.label,to:v.path,onClick:()=>r(d.name)})))}const h=function(e){let{versionMetadata:t}=e;return"none"===t.banner?n.createElement(n.Fragment,null):n.createElement(v,{versionMetadata:t})};var p=a(8139);function E(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:a}=e;return n.createElement(r.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function g(e){let{lastUpdatedBy:t}=e;return n.createElement(r.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function b(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:a,lastUpdatedBy:l}=e;return n.createElement(n.Fragment,null,n.createElement(r.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(E,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:l?n.createElement(g,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}var f=a(53);const A=function(e,t,a){const[l,r]=(0,n.useState)(void 0);(0,n.useEffect)((()=>{function n(){const n=function(){const e=Array.from(document.getElementsByClassName("anchor")),t=e.find((e=>{const{top:t}=e.getBoundingClientRect();return t>=a}));if(t){if(t.getBoundingClientRect().top>=a){return e[e.indexOf(t)-1]??t}return t}return e[e.length-1]}();if(n){let a=0,i=!1;const s=document.getElementsByClassName(e);for(;a<s.length&&!i;){const e=s[a],{href:o}=e,c=decodeURIComponent(o.substring(o.indexOf("#")+1));n.id===c&&(l&&l.classList.remove(t),e.classList.add(t),r(e),i=!0),a+=1}}}return document.addEventListener("scroll",n),document.addEventListener("resize",n),n(),()=>{document.removeEventListener("scroll",n),document.removeEventListener("resize",n)}}))},_="tableOfContents_vrFS",N="table-of-contents__link";function L(e){let{toc:t,isChild:a}=e;return t.length?n.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((e=>n.createElement("li",{key:e.id},n.createElement("a",{href:`#${e.id}`,className:N,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(L,{isChild:!0,toc:e.children}))))):null}const T=function(e){let{toc:t}=e;return A(N,"table-of-contents__link--active",100),n.createElement("div",{className:(0,f.A)(_,"thin-scrollbar")},n.createElement(L,{toc:t}))};var k=a(8168);const U="iconEdit_mS5F",y=e=>{let{className:t,...a}=e;return n.createElement("svg",(0,k.A)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,f.A)(U,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function w(e){let{editUrl:t}=e;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener"},n.createElement(y,null),n.createElement(r.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var C=a(6287);const x="docItemContainer_oiyr",B="lastUpdated_wj+Z",M="docItemCol_zHA2";const I=function(e){const{content:t,versionMetadata:a}=e,{metadata:l,frontMatter:r}=t,{image:s,keywords:c,hide_title:d,hide_table_of_contents:m}=r,{description:u,title:v,editUrl:E,lastUpdatedAt:g,formattedLastUpdatedAt:A,lastUpdatedBy:_}=l,{pluginId:N}=(0,o.vT)({failfast:!0}),L=(0,o.jh)(N).length>1,k=!d&&void 0===t.contentTitle;return n.createElement(n.Fragment,null,n.createElement(p.A,{title:v,description:u,keywords:c,image:s}),n.createElement("div",{className:"row"},n.createElement("div",{className:(0,f.A)("col",{[M]:!m})},n.createElement(h,{versionMetadata:a}),n.createElement("div",{className:x},n.createElement("article",null,L&&n.createElement("span",{className:"badge badge--secondary"},"Version: ",a.label),n.createElement("div",{className:"markdown"},k&&n.createElement(C.e,null,v),n.createElement(t,null)),(E||g||_)&&n.createElement("footer",{className:"row docusaurus-mt-lg"},n.createElement("div",{className:"col"},E&&n.createElement(w,{editUrl:E})),n.createElement("div",{className:(0,f.A)("col",B)},(g||_)&&n.createElement(b,{lastUpdatedAt:g,formattedLastUpdatedAt:A,lastUpdatedBy:_})))),n.createElement(i,{metadata:l}))),!m&&t.toc&&n.createElement("div",{className:"col col--3"},n.createElement(T,{toc:t.toc}))))}}}]);