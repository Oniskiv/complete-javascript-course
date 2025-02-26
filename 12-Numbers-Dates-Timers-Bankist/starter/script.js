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
    '2025-02-20T14:11:59.604Z',
    '2025-02-23T17:01:17.194Z',
    '2025-02-25T10:36:17.929Z',
    '2025-02-26T10:51:36.790Z',
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
console.table(accounts);

function formatDate(movementDate) {
  const date = new Date(movementDate);
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    return "Today"
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = `${date.getMonth()}`.padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

function calcDaysPassed(date1, date2) {
  return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
}

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  movs.forEach((movement, i) => {
    const dispayDate = formatDate(account.movementsDates[i]);
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${dispayDate}</div>
        <div class="movements__value">${movement.toFixed(2)}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calcDisplayBalance(account) {
  const balance = account.movements.reduce((acc, cur) => {
    return acc + cur
  }, 0);
  account.balane = balance;
  labelBalance.textContent = `${balance.toFixed(2)}€`;
}

function calcDisplaySummary(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * 1.2 / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

function refreshUI(account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
}

function setLogOutTimer() {
  let time = 100;

  const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    labelTimer.textContent = `${min}:${sec}`;
    time--;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
  }, 1000);

  return timer;
}

let currentAccount, timer;
// currentAccount = account1;
// refreshUI(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts
    .find(account => account.username === inputLoginUsername.value
      && account.pin === Number(inputLoginPin.value));

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 1;

    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, "0");
    const month = `${now.getMonth()}`.padStart(2, "0");
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, "0");
    const min = `${now.getMinutes()}`.padStart(2, "0");
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    if (timer) {
      clearInterval(timer);
    }
    timer = setLogOutTimer();
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
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    refreshUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      refreshUI(currentAccount);
    }, 3000);
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
});
