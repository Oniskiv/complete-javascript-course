"use strict";

const Person = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function() {
  console.log(2025 - this.birthYear);
}
Person.hey = function() {
  console.log("Hey");
}

const alex = new Person("Alex", 1990);
console.log(alex);
alex.calcAge();

Person.hey();
//alex.hey();

class PersonCl {
  constructor(firstName, birthYear) {
   this.firstName = firstName;
   this.birthYear = birthYear;
  };

  calcAge() {
    console.log(2025 - this.birthYear);
  };

  get age() {
    return 2025 - this.birthYear;
  }

  set data(data) {
    this._data = data;
  }

  static hey() {
    console.log("Hey");
  }
}

const jessica = new PersonCl("Jessica", 1980);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

jessica.data = "Hello";
console.log(jessica._data);

PersonCl.hey();
//jessica.hey();