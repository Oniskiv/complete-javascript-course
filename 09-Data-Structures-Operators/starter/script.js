'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*let [first, , second] = restaurant.categories;
console.log(first, second);

[first, second = "Test"] = [second, first];
console.log(first, second);

let {name, categories} = restaurant;
console.log(name, categories);

let {name: restaurantName, categories: restaurantCategories} = restaurant;
console.log(restaurantName, restaurantCategories);

let {name: name2 = [], tags: restaurantTags = []} = restaurant;
console.log(name2, restaurantTags);

({name, categories} = restaurant);
console.log(name, categories);

const {fri: {open: o, close: c}} = restaurant.openingHours;
console.log(o, c);*/

/*const arr = [3, 4, 5];
const arr2 = [1, 2, arr[0], arr[1], arr[3]];
console.log(arr2);

const arr3 = [1, 2, ...arr];
console.log(arr3);
console.log(...arr3);

const s1 = "asd";
console.log(...s1)

console.log({...restaurant})

const a1 = [1, 2, 3, 4, 5, 6, 7];
const [a, , b, ...other] = a1;
console.log(a, b, other);*/

/*console.log(restaurant.numGuest);
console.log(restaurant.numGuest ? restaurant.numGuest : 10);
console.log(restaurant.numGuest || 10);

restaurant.numGuest = 0;
console.log(restaurant.numGuest ? restaurant.numGuest : 10);
console.log(restaurant.numGuest || 10);

console.log(restaurant.numGuest ?? 10);*/

/*const rest1 = {
  name: "name1",
  numGuest: 0
}
const rest2 = {
  name: "name2"
}

rest1.numGuest = rest1.numGuest ?? 10;
rest2.numGuest ||= 10;

console.log(rest1);
console.log(rest2);*/

/*let a1 = [1, 2, 3, 4, 5, 6, 7];
for (const item of a1) {
  console.log(item);
}
for (const item of a1.entries()) {
  console.log(item);
}
for (const [i, el] of a1.entries()) {
  console.log(`${i}: ${el}`);
}*/

/*.log(restaurant.openingHours.mon?.open);

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day} we open at ${open}`);
}*/

/*for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day);
}
for (const el of Object.values(restaurant.openingHours)) {
  console.log(`Open from ${el.open} to ${el.close}`);
}
for (const [key, {open, close}] of Object.entries(restaurant.openingHours)) {
  console.log(`${key}: open from ${open} to ${close}`);
}*/

/*const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}*/

/*const s1 = new Set(["Alex", "Vlad", "Alex"]);
console.log(s1);
const s2 = new Set("Alex");
console.log(s2);*/

/*const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);
console.log(italianFoods, mexicanFoods);

const commonFoods = italianFoods.intersection(mexicanFoods);
console.log(commonFoods);

const unionFoods = italianFoods.union(mexicanFoods);
console.log(unionFoods);

const differenceItalianFoods = italianFoods.difference(mexicanFoods);
console.log(differenceItalianFoods);

const symmetricDifferenceItalianFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log(symmetricDifferenceItalianFoods);

console.log(italianFoods.isDisjointFrom(mexicanFoods));*/

/*const map = new Map();
map.set("a", "b");
map.set(1, 2);
console.log(map)

map
  .set(2, 3)
  .set(4, 5);
console.log(map)

console.log(map.get("a"));
console.log(map.get(2));

const newMap = new Map([
  ["a", "b"],
  [1, 4]
]);
console.log(newMap);

const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);*/

/*const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

//const average = 90 / [...gameEvents.keys()].length;
const average = 90 / gameEvents.size;
console.log(`An event happened, on average, every ${average} minutes`);

for (const [key, value] of gameEvents) {
  const period = key <= 45 ? "[FIRST HALF]" : "[SECOND HALF]";
  console.log(`${period} ${key}: ${value}`);
}*/