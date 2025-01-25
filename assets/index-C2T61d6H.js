(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class b{calculateRowSums(e){const t=Array(e[0].length).fill(0).map(()=>({sumValue:0,sumVoltorb:0})),o=Array(e[0].length).fill(0).map(()=>({sumValue:0,sumVoltorb:0}));for(let s=0;s<e.length;s++)for(let r=0;r<e[s].length;r++)o[s].sumValue+=e[s][r].value,t[r].sumValue+=e[s][r].value,e[s][r].voltorb&&(o[s].sumVoltorb++,t[r].sumVoltorb++);return[o,t]}calculateNum2s3s(e){let t=0;for(let o=0;o<e.length;o++)for(let s=0;s<e[o].length;s++)e[o][s].value>1&&t++;return t}}class v{generateBoard(e,t){const[o,s,r]=e,i=t*t-o-s-r,n=[...this.createTileArray(r,0),...this.createTileArray(i,1),...this.createTileArray(o,2),...this.createTileArray(s,3)];for(let d=n.length-1;d>=0;d--){const m=Math.floor(Math.random()*(d+1));[n[d],n[m]]=[n[m],n[d]]}const h=[];for(let d=0;d<t;d++)h.push(n.slice(d*t,(d+1)*t));return console.log(h),h}createTileArray(e,t){return Array(e).fill(t).map(o=>this.createTile(o))}createTile(e){return{voltorb:e===0,value:e,revealed:!1,marks:new Set}}}var c=(a=>(a[a.Up=0]="Up",a[a.Down=1]="Down",a[a.Left=2]="Left",a[a.Right=3]="Right",a))(c||{});class S{constructor(e){this.boardState=e}gameTileMarkListener(e){this.boardState.toggleMark(e)}gameTileRevealListener(e,t,o){this.boardState.gameOver||this.boardState.gameWon?this.boardState.resetBoard():this.boardState.memoMode?this.boardState.toggleSelectedTile(e,t,o):(this.boardState.toggleSelectedTile(e,t,o),this.boardState.revealTile(e))}keyPressListener(e){switch(e.key){case"ArrowUp":e.preventDefault(),this.boardState.moveSelectedTile(c.Up);break;case"ArrowDown":e.preventDefault(),this.boardState.moveSelectedTile(c.Down);break;case"ArrowLeft":e.preventDefault(),this.boardState.moveSelectedTile(c.Left);break;case"ArrowRight":e.preventDefault(),this.boardState.moveSelectedTile(c.Right);break;case"Enter":this.gameTileRevealListener(this.boardState.selectedTile,this.boardState.selectedRow,this.boardState.selectedCol);break;case"x":case"X":this.boardState.toggleMemoMode();break;case"0":case"1":case"2":case"3":{const t=parseInt(e.key);this.boardState.toggleMark(t);break}}}}const l=5;class L{constructor(e,t){this.boardListener=e,this.boardState=t}firstRenderGame(){this.renderInfo(),this.renderBoard(),this.renderMemoButton(),this.addEventListeners()}renderGame(){this.renderGameAlert(),this.renderInfo(),this.renderBoard(),this.renderMemoButton()}renderGameAlert(){this.boardState.gameWon?alert("You won!"):this.boardState.gameOver&&alert("Game over!")}renderInfo(){const e=document.getElementById("info-level");e.textContent=`Level: 
${this.boardState.level}`;const t=document.getElementById("info-coins");t.textContent=`Total coins: 
${this.boardState.totalCoins}`;const o=document.getElementById("info-coins-level");o.textContent=`Coins this level: 
${this.boardState.coinsThisLevel}`}renderBoard(){const e=document.getElementById("game-board");e.innerHTML="";const t=this.boardState.grid,o=this.boardState.rowSums,s=this.boardState.colSums;for(let r=0;r<=l;r++)for(let i=0;i<=l;i++){const n=document.createElement("div");r===l&&i===l?n.className="empty-tile":r===l||i===l?this.renderInfoTile(n,o,s,r,i):this.renderGameTile(n,t[r][i],r,i),e==null||e.appendChild(n)}}renderInfoTile(e,t,o,s,r){e.className="info-tile",s===l?e.textContent=`Sum: 0${o[r].sumValue}
💣:${o[r].sumVoltorb}`:r===l&&(e.textContent=`Sum: 0${t[s].sumValue}
💣:${t[s].sumVoltorb}`)}renderGameTile(e,t,o,s){e.className="game-tile",t==this.boardState.selectedTile&&this.boardState.memoMode?e.classList.add("selected-memo"):t==this.boardState.selectedTile&&e.classList.add("selected");const r=Array.from(t.marks).sort(),i=r.length>0?`[${r.join(",")}]`:"";e.textContent=t.revealed?t.voltorb?"💣":t.value.toString()+`
`+i:""+i,e.addEventListener("click",()=>{this.boardListener.gameTileRevealListener(t,o,s),this.renderGame()})}renderMemoButton(){const e=document.getElementById("memo-button-toggle");e.textContent=this.boardState.memoMode?"Memo Mode: ON":"Memo Mode: OFF"}addEventListeners(){document.addEventListener("keydown",i=>{this.boardListener.keyPressListener(i),this.renderGame()});const e=document.getElementById("memo-button-toggle");e.textContent=this.boardState.memoMode?"Memo Mode: ON":"Memo Mode: OFF",e==null||e.addEventListener("click",()=>{this.boardState.toggleMemoMode(),this.renderGame()});const t=document.getElementById("memo-button-0");t==null||t.addEventListener("click",()=>{this.boardListener.gameTileMarkListener(0),this.renderGame()});const o=document.getElementById("memo-button-1");o==null||o.addEventListener("click",()=>{this.boardListener.gameTileMarkListener(1),this.renderGame()});const s=document.getElementById("memo-button-2");s==null||s.addEventListener("click",()=>{this.boardListener.gameTileMarkListener(2),this.renderGame()});const r=document.getElementById("memo-button-3");r==null||r.addEventListener("click",()=>{this.boardListener.gameTileMarkListener(3),this.renderGame()})}}const u=5,g={1:[[5,0,6],[4,1,6],[3,1,6],[2,2,6],[0,3,6]],2:[[6,0,7],[5,1,7],[3,2,7],[1,3,7],[0,4,7]],3:[[7,0,8],[6,1,8],[4,2,8],[2,3,8],[1,4,8]],4:[[8,0,10],[5,2,10],[3,3,8],[2,4,10],[0,5,8]],5:[[9,0,10],[7,1,10],[6,2,10],[4,3,10],[1,5,10]],6:[[8,1,10],[5,3,10],[3,4,10],[2,5,10],[0,6,10]],7:[[9,1,13],[7,2,10],[6,3,10],[4,4,10],[1,6,13]],8:[[0,7,10],[8,2,10],[5,4,10],[2,6,10],[7,3,10]]};class T{constructor(e,t){this.boardGenerator=e,this.boardCalculator=t,this.level=1,this.gameOver=!1,this.gameWon=!1,this.memoMode=!1,this.totalCoins=0,this.coinsThisLevel=0;const o=g[this.level.toString()][Math.floor(Math.random()*u)];this.grid=this.boardGenerator.generateBoard(o,l),this.selectedTile=this.grid[0][0],this.selectedRow=0,this.selectedCol=0,[this.rowSums,this.colSums]=this.boardCalculator.calculateRowSums(this.grid),this.num2s3s=this.boardCalculator.calculateNum2s3s(this.grid)}resetBoard(){this.gameOver=!1,this.gameWon=!1;const e=g[this.level.toString()][Math.floor(Math.random()*u)];this.grid=this.boardGenerator.generateBoard(e,l),this.selectedTile=this.grid[0][0],this.selectedRow=0,this.selectedCol=0,[this.rowSums,this.colSums]=this.boardCalculator.calculateRowSums(this.grid),this.num2s3s=this.boardCalculator.calculateNum2s3s(this.grid)}toggleMemoMode(){this.memoMode=!this.memoMode}toggleSelectedTile(e,t,o){this.selectedTile=e,this.selectedRow=t,this.selectedCol=o}moveSelectedTile(e){switch(e){case c.Up:this.selectedRow>0&&(this.selectedRow--,this.selectedTile=this.grid[this.selectedRow][this.selectedCol]);break;case c.Down:this.selectedRow<l-1&&(this.selectedRow++,this.selectedTile=this.grid[this.selectedRow][this.selectedCol]);break;case c.Left:this.selectedCol>0&&(this.selectedCol--,this.selectedTile=this.grid[this.selectedRow][this.selectedCol]);break;case c.Right:this.selectedCol<l-1&&(this.selectedCol++,this.selectedTile=this.grid[this.selectedRow][this.selectedCol]);break}}toggleMark(e){const t=this.selectedTile;t&&(t.marks.has(e)?t.marks.delete(e):t.marks.add(e))}isGamecomplete(){return this.num2s3s===0}revealTile(e){e.revealed=!0,e.voltorb?this.triggerGameOver():(e.value>1&&this.num2s3s--,this.coinsThisLevel=this.coinsThisLevel>0?this.coinsThisLevel*e.value:e.value),this.isGamecomplete()&&this.triggerGameWon()}flipBoard(){this.grid.forEach(t=>{t.forEach(o=>{o.revealed=!0})})}triggerGameOver(){this.gameOver=!0,this.flipBoard(),this.coinsThisLevel=0,this.level=this.level>1?this.level-1:1}triggerGameWon(){this.gameWon=!0,this.flipBoard(),this.totalCoins+=this.coinsThisLevel,this.coinsThisLevel=0,this.level++}}const M=new v,w=new b,f=new T(M,w),p=new S(f),y=new L(p,f);y.firstRenderGame();
