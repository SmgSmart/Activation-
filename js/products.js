import {db} from './storage.js';
import {money,art,esc,toast} from './notifications.js';
import {add} from './cart.js';
export const card=p=>`<article class="card"><a href="product.html?id=${p.id}"><img loading="lazy" src="${art(p)}" alt="${esc(p.name)}"></a><div class="body"><span class="muted sm">${esc(p.category)}</span><h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3><div class="row"><span class="gold">${money(p.price)}</span>${p.available?`<button class="btn sm" data-add="${p.id}">Add to cart</button>`:'<span class="muted sm">Out of stock</span>'}</div></div></article>`;
document.addEventListener('click',e=>{const id=e.target.dataset?.add;if(id){add(+id);toast('Added to cart')}});
export function home(){const P=db.products();
 document.getElementById('featured').innerHTML=P.filter(p=>p.featured&&p.available).slice(0,4).map(card).join('');
 document.getElementById('recent').innerHTML=[...P].sort((a,b)=>b.added-a.added).slice(0,4).map(card).join('')}
export function shop(){
 const app=document.getElementById('app'),q=new URLSearchParams(location.search).get('q')||'',cats=[...new Set(db.products().map(p=>p.category))];
 app.innerHTML=`<h1>Marketplace</h1><p class="muted">All listings are demonstration products.</p><div class="filters"><input id="q" type="search" placeholder="Search products" value="${esc(q)}"><select id="cat"><option value="">All categories</option>${cats.map(c=>`<option>${esc(c)}</option>`).join('')}</select><select id="sort"><option value="">Featured first</option><option value="pa">Price: low to high</option><option value="pd">Price: high to low</option><option value="az">Name A-Z</option></select><label><input type="checkbox" id="av"> In stock only</label></div><div class="grid" id="list"></div>`;
 const draw=()=>{const s=document.getElementById('q').value.toLowerCase(),c=document.getElementById('cat').value,o=document.getElementById('sort').value,a=document.getElementById('av').checked;
  let L=db.products().filter(p=>(!s||(p.name+p.description+p.category).toLowerCase().includes(s))&&(!c||p.category===c)&&(!a||p.available));
  L.sort((x,y)=>o==='pa'?x.price-y.price:o==='pd'?y.price-x.price:o==='az'?x.name.localeCompare(y.name):y.featured-x.featured);
  document.getElementById('list').innerHTML=L.map(card).join('')||'<p class="muted">No products match.</p>'};
 app.addEventListener('input',draw);app.addEventListener('change',draw);draw()}
export function product(){
 const p=db.products().find(x=>x.id==new URLSearchParams(location.search).get('id')),app=document.getElementById('app');
 if(!p){app.innerHTML='<h1>Product not found</h1><a class="btn" href="shop.html">Back to marketplace</a>';return}
 app.innerHTML=`<div class="split"><img class="hero-img" src="${art(p)}" alt="${esc(p.name)}"><div><span class="badge">Demo listing</span><h1>${esc(p.name)}</h1><p class="gold big">${money(p.price)}</p><p>${esc(p.description)}</p><dl><dt>Licence duration</dt><dd>${esc(p.duration)}</dd><dt>Compatibility</dt><dd>${esc(p.compat)}</dd><dt>Delivery</dt><dd>${esc(p.delivery)}</dd><dt>Activation</dt><dd>${esc(p.activation)}</dd></dl>${p.available?`<button class="btn" id="add">Add to cart</button> <button class="btn ghost" id="buy">Buy now</button>`:'<p class="muted">Currently unavailable</p>'} <a class="link" href="shop.html">Continue shopping</a></div></div>`;
 document.getElementById('add')?.addEventListener('click',()=>{add(p.id);toast('Added to cart')});
 document.getElementById('buy')?.addEventListener('click',()=>{add(p.id);location.href='checkout.html'})}
