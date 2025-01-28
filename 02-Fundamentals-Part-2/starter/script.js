'use strict';

function logger() {
    console.log("Hello World!");
}
logger();

function process(name) {
    return `My name is ${name}`;
}
console.log(process("Alex"));

const processValue = function (name) {
    return `My name is ${name}`;
}
console.log(processValue("Vlad"));

const processName = name => `My name is ${name}`;
console.log(processName("Ihar"));

const names = ["Alex", "Vlad"];
console.log(typeof names);
console.log(names);
console.log(names.length);

names.push("Ihar");
console.log(names);
names.unshift("Max");
console.log(names);
names.pop();
console.log(names);
names.shift();
console.log(names);

const user = {
    name: "Alex",
    birthYear: 1995,
    calcAge: function () {
        return 2025 - this.birthYear;
    }
};
console.log(user);
console.log(user.name);
console.log(user["name"]);
console.log(user.calcAge());
console.log(user["calcAge"]());

for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}