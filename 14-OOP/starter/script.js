"use strict";

console.log("   --- Constructor function ---");
const Person = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function() {
  console.log(2025 - this.birthYear);
};
Person.hey = function() {
  console.log("Hey");
};

const alex = new Person("Alex", 1990);
console.log(alex);
alex.calcAge();

Person.hey();
//alex.hey();

const Student = function(firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function() {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
Student.prototype.constructor = Student;

const mike = new Student("Mike", 1995, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();


console.log("   --- Class ---");

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

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }
}

const martha = new StudentCl("Martha", 1995, "Computer Science");
console.log(martha);
martha.introduce();
martha.calcAge();


console.log("   --- Object.create ---");
const PersonProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
};

const steven = Object.create(PersonProto);
steven.init("Steven", 1990);
steven.calcAge();
console.log(steven);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
const jay = Object.create(StudentProto);
jay.init("Jay", 1995, "Computer Science");
console.log(jay);
jay.calcAge();