(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{ERIh:function(e,t,n){"use strict";n.r(t);n("pNMO"),n("4Brf"),n("0oug"),n("TeQF"),n("pjDv"),n("J30X"),n("4mDm"),n("2B1R"),n("+2oP"),n("DQNa"),n("sMBO"),n("07d7"),n("JfAA"),n("PKPk"),n("3bBZ");var r=n("q1tI"),i=n.n(r),a=n("i8i4"),l=n.n(a),u=n("dAlA"),o=n.n(u),c=n("sOKU"),s=n("DCcX"),f=n("CaDr"),p=n("XAkp"),m=n("bAGh"),d=n("TKOK"),h=n("5Ves"),v=n("dAlA");function g(e,t,n){this.p=e,this.q=t,this.e=n,this.n=v(e).multiply(t);var r=v(e).minus(1),i=v(t).minus(1);this.phi=r.multiply(i)}g.encrypt=function(e,t){return e.modPow(t.e,t.n)},g.decrypt=function(e,t){return e.modPow(t.d,t.n)},g.validate=function(e,t,n){for(var r=[],i=0;i<e.length;i++)if(r.push(g.decrypt(v(e[i]),n)),r[i].toString()!==t[i])return!1;return!0},g.generateCandidate=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{e:0,n:0},n=t.e,r=t.n,i=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0,l={},u={},o={},c=0;c<e.length;c++){var s=v(e[c]),f=s.toString();l[f]=[],u[f]=[],o[f]=[];for(var p=1;l[f].length<1;p++){var m=s.multiply(p).plus(1);if(m.isDivisibleBy(n)){var d={d:m.divide(n),n:r};g.validate(i,a,d)&&(candidateBar.increment(),l[f].push(d.d.toString()))}}if(l[f].length>0)if(c>0){var h=v(l[f][0]);for(v(l[f][0]).isPrime()||l[f].pop();l[f].length<5;)h=h.plus(s),g.validate(i,a,{d:h,n:r})&&h.isOdd()&&(candidateBar.increment(),l[f].push(h.toString()))}else for(var y=0;l[f].length<5;y++){var E=v(l[f][y]).plus(s);candidateBar.increment(),l[f].push(E.toString())}for(var b=0;b<l[f].length;b++)u[f].push(v(l[f][b]).isPrime()),o[f].push(g.validate(i,a,{d:l[f][b],n:r}))}return[l,u,o]},g.prototype.getAllPhi=function(){var e,t=this.phi,n=(this.n,[]),r=t;for(e=0,temp=v(2).pow(e);n.length<5&&r.isEven();e++,temp=v(2).pow(e),r=t.divide(temp))t.isDivisibleBy(temp)&&n.push(r.toString());return n.push(r.toString()),n},g.prototype.generatePublicKey=function(){var e=this.n;return{e:this.e,n:e}};n("q4sD");function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var l,u=e[Symbol.iterator]();!(r=(l=u.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e){var t=y(Object(r.useState)(!1),2),n=t[0],a=t[1],l=y(Object(r.useState)(null),2),u=l[0],g=l[1],E=y(Object(r.useState)(1e3),2),b=E[0],S=E[1],w=y(Object(r.useState)(0),2),A=w[0],O=w[1];function B(){var e=function(e,t){for(var n=[],r=v(e);r.lt(t);r=r.plus(1))r.isPrime()&&n.push(r);return n}(A,b).filter((function(e){return function(e){var t=e.slice(-1);if("1"===t||"3"===t||"7"===t||"9"===t)return!0}(e.toString())}));return function(e,t){for(var n=[],r=v(e);r.leq(t);r=r.plus(1))(r.isDivisibleBy(10)||r.isZero())&&n.push(r.toString());return n}(A,b).map((function(t){for(var n=e.filter((function(e){return e.gt(t)&&e.lt(o()(t).plus(10))})),r=[null,null,null,null],a=0;a<4;a++)if(void 0!==n[a]){var l=n[a].toString().slice(-1);"1"===l?r[0]=n[a].toString():"3"===l?r[1]=n[a].toString():"7"===l?r[2]=n[a].toString():"9"===l&&(r[3]=n[a].toString())}var u=r.map((function(e){return i.a.createElement("td",null,e)}));return i.a.createElement("tr",null,i.a.createElement("th",{scope:"row"},t),u)}))}var j=function(){a(!n)};return Object(r.useEffect)((function(){g(B())}),[A,b,n]),i.a.createElement("div",null,i.a.createElement(c.a,{onClick:j},"Mapped Tables"),i.a.createElement(s.a,{size:"lg",isOpen:n,toggle:j},i.a.createElement(f.a,null,i.a.createElement(p.a,{bordered:!0},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"#"),i.a.createElement("th",null,"1"),i.a.createElement("th",null,"3"),i.a.createElement("th",null,"7"),i.a.createElement("th",null,"9"))),i.a.createElement("tbody",null,u)),i.a.createElement(m.a,{size:"sm"},i.a.createElement(d.a,null,i.a.createElement(h.a,{previous:!0,onClick:function(){A.gt(0)&&(O(b.minus(2e3)),S(b.minus(1e3)))}})),i.a.createElement(d.a,null,i.a.createElement("input",{type:"text",onKeyDown:function(e){var t=o()(e.target.value);13===e.keyCode&&(t.lt(1e3)?O(o.a.zero):O(t.minus(1e3)),S(t))}})),i.a.createElement(d.a,null,i.a.createElement(h.a,{next:!0,onClick:function(){O(b),S(b.plus(1e3))}}))))))}l.a.render(i.a.createElement("div",null,i.a.createElement(b,null)),document.getElementById("root")),console.log(o()(5))}},[["ERIh",14,4,13,12,0,5,8,2,10,9,15,16,1,3,7,11]]]);
//# sourceMappingURL=index.c5578ee4494e82e9610a.js.map