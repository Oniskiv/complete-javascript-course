'use strict';

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, currentPlayer, inProgress;

init();

function init() {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  inProgress = true;
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

btnRoll.addEventListener("click", () => {
  if (!inProgress) {
    return;
  }

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.src = `dice-${dice}.png`
  diceEl.classList.remove("hidden");

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", () => {
  if (!inProgress) {
    return;
  }

  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];

  if (scores[currentPlayer] >= 20) {
    inProgress = false;
    document.querySelector(`.player--${currentPlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active");
  } else {
    switchPlayer();
  }
})

btnNew.addEventListener("click", () => {
  init();
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
})