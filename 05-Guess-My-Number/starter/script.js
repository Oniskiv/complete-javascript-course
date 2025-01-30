'use strict';

/*
console.log(document.querySelector(".message").textContent);

console.log(document.querySelector(".number").textContent);
document.querySelector(".number").textContent = 14;
console.log(document.querySelector(".number").textContent);

console.log(document.querySelector(".guess").value);
document.querySelector(".guess").value = 23.
console.log(document.querySelector(".guess").value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let currentScore = 20;
let bestScore = 0;
let inProgress = true;

function checkGuess() {
    const guess = Number(document.querySelector(".guess").value);

    if (inProgress && currentScore > 0) {
        if (!guess) {
            displayMessage("Not number")
            currentScore--;
        } else if (guess === secretNumber) {
            inProgress = false;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                document.querySelector(".highscore").textContent = bestScore;
            }
            displayMessage("Correct")
            document.querySelector("body").style.backgroundColor = "#50AC54FF";
        } else {
            displayMessage(guess > secretNumber ? "Too high" : "Too low");
            currentScore--;
        }
        document.querySelector(".score").textContent = currentScore;
        if (currentScore === 0) {
            inProgress = false;
            displayMessage("You lose")
            document.querySelector("body").style.backgroundColor = "#d15050";
        }
    }
}

function displayMessage(message) {
    document.querySelector(".message").textContent = message;
}

function refresh() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    currentScore = 20;
    inProgress = true;
    displayMessage("Start guessing...")
    document.querySelector(".score").textContent = currentScore;
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
}

document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", refresh);