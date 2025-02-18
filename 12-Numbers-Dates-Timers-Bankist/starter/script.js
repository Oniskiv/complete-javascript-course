'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
