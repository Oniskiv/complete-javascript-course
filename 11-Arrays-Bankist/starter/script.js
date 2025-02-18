'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

function generateUsernames() {
  accounts.forEach(account => {
    const username = account.owner
      .split(" ")
      .map(name => name[0].toLocaleLowerCase())
      .join("");
    account.username = username;
  })
}

generateUsernames();
console.table(accounts)

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  movs.forEach((movement, i) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${movement}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calcDisplayBalance(account) {
  const balance = account.movements.reduce((acc, cur) => {
    return acc + cur
  }, 0);
  account.balane = balance;
  labelBalance.textContent = `${balance}€`;
}

function calcDisplaySummary(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * 1.2 / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
}

function refreshUI(account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
}

let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts
    .find(account => account.username === inputLoginUsername.value
      && account.pin === Number(inputLoginPin.value));

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 1;

    refreshUI(currentAccount);
  }
  inputLoginPin.value = inputLoginUsername.value = "";
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(account => account.username === inputTransferTo.value);
  inputTransferTo.value = inputTransferAmount.value = "";

  if (amount > 0
    && receiverAcc
    && currentAccount.balane >= amount
    && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount);

    refreshUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    refreshUI(currentAccount)
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const indexAccount = accounts.findIndex(account => account.username === inputCloseUsername.value
      && account.pin === Number(inputClosePin.value));
    const ss = accounts.splice(indexAccount, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sortOrder = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();

  displayMovements(currentAccount, !sortOrder);
  sortOrder = !sortOrder;
})


/*const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice(1, -2);
  const dogs = dogsJuliaCopy.concat(dogsKate)
  console.log(dogs)
  dogs.forEach((dog, i, arr) => {
    const info = dog < 3 ? `still a puppy` : `an adult, and it is ${dog} years old`;
    console.log(`Dog number ${i + 1} ${info} is`);
  })
}

checkDogs(julia, kate);*/

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

/*const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

const huskyWeight = breeds.find(bread => bread.breed === "Husky").averageWeight;
console.log(huskyWeight);

const dogBothActivities = breeds
  .filter(bread => bread.activities.includes("running") && bread.activities.includes("fetch"))
  .map(bread => bread.breed);
console.log(dogBothActivities);

const allActivities = breeds.flatMap(bread => bread.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

const swimmingAdjacent = [...new Set(breeds
  .filter(breed => breed.activities.includes("swimming"))
  .flatMap(breed => breed.activities)
  .filter(act => act !== "swimming"))];
console.log(swimmingAdjacent);

breeds.forEach(breed => console.log(`${breed.breed}: ${breed.averageWeight >= 20}`));

breeds.forEach(breed => console.log(`${breed.breed}: ${breed.activities.length >= 3}`));*/