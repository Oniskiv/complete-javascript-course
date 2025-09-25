import {addToCart, totalPrice as price, tq} from './shoppingCart.js';

console.log('Hello from script.js');
addToCart('Apple', 3);
console.log(price);
console.log(tq);

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('Banana', 2);
console.log(ShoppingCart.totalPrice);
console.log(ShoppingCart.tq);

import add from './shoppingCart.js';
add('Orange', 1);

const scores = [34, 52, 23, 45, 34, 15];
console.log(scores);
console.log(scores.filter(score => score > 30));