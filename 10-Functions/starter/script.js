'use strict';

/*function info(name = "MyName", age = 25) {
  console.log(name, age);
}

info("Alex", 30);
info("Alex");
info(undefined, 30);*/

/*const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const message = `${this.question}\n${this.options.join("\n")}\n(Write option number)`;
    const answer = new Number(prompt(message));
    if (answer >= 0 && answer <= 3) {
      this.answers[answer]++;
    }
    this.displayResults();
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log("Poll results: " + this.answers.join(" "));
    }
  }
};

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));*/


(function () {
  console.log("It runs only once!");
})();