const h2=document.querySelector("h1"),containertitle=document.querySelector(".title-container"),titleLayout=document.querySelector(".layout-title"),input=e=>{const t=h2.firstElementChild.tagName,n=h2.innerText.length;if(1!==n)n>1&&"SPAN"===t&&h2.firstElementChild.remove();else{const e='<span class="placeholder-title" placeholder = "Title"></span>';titleLayout.insertAdjacentHTML("afterbegin",e)}},stopDefault=e=>{const t=h2.innerText.valueOf().length;("Backspace"==e.key||"Delete"==e.key)&&t<2&&e.preventDefault()},blockCretChange=e=>{"Enter"===e.key&&document.querySelector("#block_one").focus()};function getCaretCoordinates(){let e=0,t=0;width=0;if(void 0!==window.getSelection){const n=window.getSelection();if(0!==n.rangeCount){const o=n.getRangeAt(0).cloneRange().getClientRects()[0];o&&(e=o.left,t=o.top,width=o.width)}}return{x:e,y:t,width:width}}function toggleTooltip(){const e=document.getElementById("tooltip");if(window.getSelection().toString().length>0){let t=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;const{x:n,y:o,width:i}=getCaretCoordinates();e.setAttribute("aria-hidden","false"),e.setAttribute("style",`display: inline-block; \n            left:${n+i/2-32}px; \n            top: ${o+t-36}px;\n            `)}else e.setAttribute("aria-hidden","true"),e.setAttribute("style","display: none;")}containertitle.addEventListener("input",input),containertitle.addEventListener("keydown",stopDefault),containertitle.addEventListener("keydown",blockCretChange),document.addEventListener("mouseup",(e=>toggleTooltip()));
//# sourceMappingURL=index.js.map