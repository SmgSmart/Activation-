import {PRODUCTS} from '../data/demo-products.js';
const K={p:'na_products',c:'na_cart',o:'na_orders',d:'na_codes',x:'na_code'};
const get=(k,f)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}};
const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
export const db={
 init(){if(!localStorage.getItem(K.p))set(K.p,PRODUCTS);if(!localStorage.getItem(K.d))set(K.d,{NOVA10:10,WELCOME5:5})},
 products:()=>get(K.p,PRODUCTS),cart:()=>get(K.c,[]),saveCart:c=>set(K.c,c),
 orders:()=>get(K.o,[]),addOrder:o=>set(K.o,[o,...get(K.o,[])]),
 codes:()=>get(K.d,{}),code:()=>get(K.x,''),setCode:c=>set(K.x,c),
 reset(){Object.values(K).forEach(k=>localStorage.removeItem(k));this.init()}};
