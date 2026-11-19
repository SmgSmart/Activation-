import {db} from './storage.js';
import {money,esc} from './notifications.js';
import {lines,totals,summary,refresh} from './cart.js';
export function checkout(){
 const app=document.getElementById('app'),L=lines();
 if(!L.length){app.innerHTML='<h1>Checkout</h1><p class="muted">Your cart is empty.</p><a class="btn" href="shop.html">Browse marketplace</a>';return}
 app.innerHTML=`<h1>Checkout</h1><p class="notice">DEMO PAYMENT — No actual money has been transferred.</p><div class="split"><form id="f" novalidate><label>Full name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Phone<input name="phone" type="tel" required></label><label>Country<input name="country" value="Ghana" required></label><fieldset><legend>Payment method (simulation only)</legend><label class="opt"><input type="radio" name="pay" value="Mobile Money - Demo" checked> Mobile Money — Demo</label><label class="opt"><input type="radio" name="pay" value="Card Payment - Demo"> Card Payment — Demo</label><label class="opt"><input type="radio" name="pay" value="Manual Payment - Demo"> Manual Payment — Demo</label><p class="muted sm">Do not enter any real payment details.</p></fieldset><p class="err" id="err"></p><button class="btn block" id="go">Complete Demo Purchase</button></form><aside class="panel"><h2>Order summary</h2>${L.map(l=>`<div class="row"><span>${esc(l.p.name)} × ${l.qty}</span><span>${money(l.p.price*l.qty)}</span></div>`).join('')}${summary()}</aside></div>`;
 const f=document.getElementById('f');let busy=false;
 f.addEventListener('submit',e=>{e.preventDefault();if(busy)return;const d=Object.fromEntries(new FormData(f)),err=document.getElementById('err');
  if(d.name.trim().length<2)return err.textContent='Enter your full name.';
  if(!/^\S+@\S+\.\S+$/.test(d.email))return err.textContent='Enter a valid email address.';
  if(d.phone.replace(/\D/g,'').length<9)return err.textContent='Enter a valid phone number.';
  if(!d.country.trim())return err.textContent='Enter your country.';
  err.textContent='';busy=true;const b=document.getElementById('go');b.disabled=true;b.textContent='Processing demo payment…';
  setTimeout(()=>{const t=totals(),id='DEMO-'+Date.now().toString(36).toUpperCase();
   db.addOrder({id,date:new Date().toISOString(),customer:{name:d.name.trim(),email:d.email,phone:d.phone,country:d.country},payment:d.pay,items:L.map(l=>({name:l.p.name,qty:l.qty,price:l.p.price})),total:t.total,status:'Pending',activationRef:'DEMO-REF-'+Math.random().toString(36).slice(2,8).toUpperCase()});
   db.saveCart([]);db.setCode('');refresh();location.href='confirmation.html?o='+id},1800)})}
export function confirmation(){
 const o=db.orders().find(x=>x.id===new URLSearchParams(location.search).get('o')),app=document.getElementById('app');
 if(!o){app.innerHTML='<h1>Order not found</h1><a class="btn" href="shop.html">Back to marketplace</a>';return}
 app.innerHTML=`<p class="notice">DEMO PAYMENT — No actual money has been transferred.</p><h1>Demo order placed</h1><p>Thank you, ${esc(o.customer.name)}.</p><dl><dt>Order number</dt><dd>${o.id}</dd><dt>Date</dt><dd>${new Date(o.date).toLocaleString()}</dd><dt>Payment method</dt><dd>${esc(o.payment)} (DEMO)</dd><dt>Activation status</dt><dd>${o.status}</dd><dt>Demo activation reference</dt><dd>${o.activationRef} (fictional)</dd></dl><div class="panel">${o.items.map(i=>`<div class="row"><span>${esc(i.name)} × ${i.qty}</span><span>${money(i.price*i.qty)}</span></div>`).join('')}<div class="row total"><span>Total</span><span class="gold">${money(o.total)}</span></div></div><br><a class="btn" href="shop.html">Continue shopping</a>`}
