(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();const R=6,h=4,v=12;function x(e,t){let n={colors:[]};for(let i=0;i<e;i++)n.colors.push(D(t));return console.log(n),n}function D(e){return Math.floor(Math.random()*e)}function S(e,t){let n=G(e,t);return n.result.won===!1&&b(n),n.result}function G(e,t){let n={goal:[],set:[],result:{rightColorAndPos:0,rightColorOnly:0,won:!1}},i={color:0,checkDone:!1},o={color:0,checkDone:!1};return e.colors.forEach((c,s)=>{i.color=c,o.color=t[s],i.color===o.color?(i.checkDone=!0,o.checkDone=!0,n.result.rightColorAndPos++):(i.checkDone=!1,o.checkDone=!1),n.goal.push({color:i.color,checkDone:i.checkDone}),n.set.push({color:o.color,checkDone:o.checkDone})}),n.result.rightColorAndPos===e.colors.length&&(n.result.won=!0),n}function b(e){let t=!1;return e.goal.forEach(n=>{n.checkDone===!1&&(t=!1,e.set.forEach(i=>{i.checkDone===!1&&t===!1&&n.color===i.color&&(e.result.rightColorOnly++,n.checkDone=!0,i.checkDone=!0,t=!0)}))}),e}let d=0,a=0,l=[],r=0;function J(e){const t=document.getElementById("goalPins");let n=t==null?void 0:t.getElementsByClassName("pinSet");e.colors.forEach((i,o)=>{var s;let c="pinColor"+JSON.stringify(i);(s=n==null?void 0:n.item(o))==null||s.classList.add(c)})}function U(){var t;let e=document.getElementsByClassName("pinSel");for(let n=0;n<e.length;n++)(t=e.item(n))==null||t.addEventListener("click",()=>{q(e.item(n))})}function M(){let e=document.getElementById("undo");e==null||e.addEventListener("click",()=>{N()})}function W(){let e=document.getElementById("check");e==null||e.addEventListener("click",async()=>{await O()})}function H(){let e=document.getElementById("newGame");e==null||e.addEventListener("click",async()=>{T()})}function K(){let e=document.getElementById("header");e==null||e.addEventListener("click",async()=>{oe()})}function Y(e){const t=document.getElementById("gameRound1"),n=document.getElementById("board");for(let i=2;i<=e;i++){let o=t==null?void 0:t.cloneNode(!0);o.id="gameRound"+JSON.stringify(i);let c=o.getElementsByClassName("round");for(let s=0;s<c.length;s++)c.item(s).innerHTML=JSON.stringify(i);n==null||n.appendChild(o)}}async function q(e){await z()===!0&&await j(e)}async function I(){await L(),await f(),await m(),d++,a=0,l=[],r=0}async function w(e){const t=document.getElementById(e);return(t==null?void 0:t.classList.contains("disabled"))!==!0}async function p(e){let t=document.getElementById(e);t==null||t.classList.remove("disabled")}async function E(e){let t=document.getElementById(e);(t==null?void 0:t.classList.contains("disabled"))!==!0&&(t==null||t.classList.add("disabled"))}async function z(){return await w("colorPins")}async function L(){await p("colorPins")}async function y(){await E("colorPins")}async function F(){await p("undo")}async function f(){await E("undo")}async function P(){return await w("undo")}async function V(){await p("check")}async function m(){await E("check")}async function B(){return await w("check")}async function j(e){a++,r=Q(e),l.push(r),X(),await F(),a===h&&(await y(),await V())}async function N(){await P()&&(Z(),a--,l.pop(),l.length>0?r=l[l.length-1]:r=0),a===0&&await f(),a===h-1&&(await L(),await m())}function Q(e){let t="",n,i;return e.classList.forEach(o=>{o.startsWith("pinColor")&&(t=o)}),n=t.split("pinColor").pop(),i=parseInt(n),i}function X(){var o;let e="gameRound"+JSON.stringify(d),t=document.getElementById(e),n=t==null?void 0:t.getElementsByClassName("pinSet"),i="pinColor"+JSON.stringify(r);(o=n==null?void 0:n.item(a-1))==null||o.classList.add(i)}function Z(){var o;let e="gameRound"+JSON.stringify(d),t=document.getElementById(e),n=t==null?void 0:t.getElementsByClassName("pinSet"),i="pinColor"+JSON.stringify(r);(o=n==null?void 0:n.item(a-1))==null||o.classList.remove(i)}async function O(){let e;await B()&&(e=S(ae(),l),_(e),e.won===!0?(await m(),await f(),await y(),await k(),await ee()):d<v?await I():(await m(),await f(),await y(),await k(),await $()))}async function _(e){var c,s;let t="gameRound"+JSON.stringify(d),n=document.getElementById(t),i=n==null?void 0:n.getElementsByClassName("pinResult"),o=-1;if(e.rightColorAndPos>0)for(let u=1;u<=e.rightColorAndPos;u++)o++,(c=i==null?void 0:i.item(o))==null||c.classList.add("pinColorRightColorAndPos");if(e.rightColorOnly>0)for(let u=1;u<=e.rightColorOnly;u++)o++,(s=i==null?void 0:i.item(o))==null||s.classList.add("pinColorRightColorOnly")}async function C(e){let t=document.getElementById(e);t==null||t.classList.remove("hidden")}async function $(){await C("lost"),setTimeout(()=>{te()},5e3)}async function ee(){await C("won"),setTimeout(()=>{ne()},5e3)}async function k(){await C("goalPins")}async function A(e){let t=document.getElementById(e);(t==null?void 0:t.classList.contains("hidden"))!==!0&&(t==null||t.classList.add("hidden"))}async function te(){await A("lost")}async function ne(){await A("won")}function T(){location.reload()}function oe(){window.location.href="https://github.com/fmabap/Mastermind"}async function ie(){document.addEventListener("keydown",async e=>{if(e.key==="z"&&e.ctrlKey===!0||e.key==="Backspace"){await P()&&await N(),e.preventDefault();return}if(e.key==="n"){T(),e.preventDefault();return}if(e.key==="Enter"||e.code==="Space"){await B()&&await O(),e.preventDefault();return}switch(e.key){case"1":case"2":case"3":case"4":case"5":case"6":let t="pinColor"+(parseInt(e.key)-1).toString();document.getElementsByClassName(t).item(0).click(),e.preventDefault();return}},!1)}let g;window.addEventListener("load",()=>{ce()});function ce(){U(),M(),W(),H(),K(),ie(),Y(v),g=x(h,R),J(g),I(),se()}function se(){const e=document.getElementById("undo"),t=document.getElementById("check"),n=document.getElementById("newGame"),i=document.getElementById("won"),o=document.getElementById("lost");navigator.language.indexOf("de")>-1?(window.innerWidth>=640?e.innerText="Rückgängig":e.innerText="Rück-gängig",t.innerText="Prüfen",n.innerText="Neues Spiel",i.innerText="Du hast gewonnen",o.innerText="Du hast verloren"):(e.innerText="Undo",t.innerText="Check",n.innerText="New Game",i.innerText="You won",o.innerText="You lost")}function ae(){return g}