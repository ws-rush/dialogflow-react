(function(e,l){typeof exports=="object"&&typeof module<"u"?l(exports,require("react/jsx-runtime"),require("react")):typeof define=="function"&&define.amd?define(["exports","react/jsx-runtime","react"],l):(e=typeof globalThis<"u"?globalThis:e||self,l(e.DialogflowReact={},e.jsxRuntime,e.react))})(this,function(e,l,u){"use strict";function S(c){let t=c;const o=new Set;return{getSnapshot:()=>t,setState:s=>{t={...t,...s};for(const a of o)a(t)},subscribe:s=>(o.add(s),()=>o.delete(s))}}function y(){let c=0;const t=new Map,o=S({dialogs:[]}),s=(r,d={})=>{let n,i;if(typeof r=="string"){if(i=r,n=t.get(i),!n)return Promise.reject(new Error(`No dialog registered with ID "${i}".`))}else if(typeof r=="function")n=r,i=`dialog_${c++}`;else return Promise.reject(new Error("Invalid dialog identifier."));return new Promise(g=>{const f={id:i,Component:n,resolver:g,props:{...d,close:x=>{a(i,x)}}},{dialogs:w}=o.getSnapshot();o.setState({dialogs:[...w,f]})})},a=(r,d)=>{const{dialogs:n}=o.getSnapshot(),i=n.findIndex(g=>g.id===r);if(i!==-1){n[i].resolver(d);const f=[...n];f.splice(i,1),o.setState({dialogs:f})}};return{open:s,...o}}const p=u.createContext({open:async()=>null}),D=()=>u.useContext(p);function h({children:c,manager:t}){const{dialogs:o}=u.useSyncExternalStore(t.subscribe,t.getSnapshot,t.getSnapshot),s=u.useMemo(()=>({open:t.open}),[t.open]);return l.jsxs(p.Provider,{value:s,children:[c,o.map(a=>{const{Component:r,props:d,id:n}=a;return l.jsx(r,{...d},n)})]})}e.DialogContext=p,e.DialogProvider=h,e.createDialogflow=y,e.createStore=S,e.useDialog=D,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
