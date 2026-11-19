import {db} from './storage.js';
import {money,art,toast,esc} from './notifications.js';
export const lines=()=>db.cart().map(i=>({...i,p:db.products().find(p=>p.id===i.id)})).filter(l=>l.p);
export const count=()=>db.cart().reduce((n,i)=>n+i.qty,0);
export function totals(){const sub=lines().reduce((s,l)=>s+l.p.price*l.qty,0);const pct=db.codes()[db.code()]||0;const disc=sub*pct/100;return{sub,pct,disc,total:sub-disc}}
export function add(id){const c=db.cart(),i=c.find(x=>x.id===id);i?i.qty++:c.push({id,qty:1});db.saveCart(c);refresh()}
export function refresh(){document.querySelectorAll('[data-count]').forEach(e=>e.textContent=count())}
export function summary(){const t=totals();return `<div class="row"><span>Subtotal</span><span>${money(t.sub)}</span></div><div class="row"><span>Discount${t.pct?` (${t.pct}%)`:''}</span><span>- ${money(t.disc)}</span></div><div class="row total"><span>Total</span><span class="gold">${money(t.total)}</span></div>`}
export function cartPage(){
 const app=document.getElementById('app');
 const draw=()=>{const L=lines();
  if(!L.length){app.innerHTML='<h1>Your cart</h1><p class="muted">Your cart is empty.</p><a class="btn" href="shop.html">Browse marketplace</a>';return}
  app.innerHTML=`<h1>Your cart</h1><div class="split"><div>${L.map(l=>`<div class="line"><img src="${art(l.p)}" alt=""><div><a href="product.html?id=${l.p.id}">${esc(l.p.name)}</a><div class="muted">${esc(l.p.duration)} · ${money(l.p.price)}</div></div><div class="qty"><button data-d="${l.id}" data-n="-1" aria-label="Decrease">-</button><span>${l.qty}</span><button data-d="${l.id}" data-n="1" aria-label="Increase">+</button></div><button class="link" data-rm="${l.id}">Remove</button></div>`).join('')}<p><a class="link" href="shop.html">Continue shopping</a></p></div>
  <aside class="panel"><h2>Order summary</h2>${summary()}<div class="code"><input id="code" placeholder="Demo code (NOVA10)" value="${esc(db.code())}"><button class="btn ghost" id="apply">Apply</button></div><a class="btn block" href="checkout.html">Proceed to checkout</a></aside></div>`};
 draw();
 app.addEventListener('click',e=>{const t=e.target;let c=db.cart();
  if(t.dataset.rm){c=c.filter(i=>i.id!=t.dataset.rm)}
  else if(t.dataset.d){const i=c.find(x=>x.id==t.dataset.d);i.qty=Math.max(1,i.qty+ +t.dataset.n)}
  else if(t.id==='apply'){const v=document.getElementById('code').value.trim().toUpperCase();if(!v||db.codes()[v]){db.setCode(v);toast(v?'Code applied':'Code removed')}else return toast('Invalid demo code',1)}
  else return;
  db.saveCart(c);draw();refresh()})}
