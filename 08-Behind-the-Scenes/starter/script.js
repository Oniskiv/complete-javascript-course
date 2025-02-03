'use strict'

function test() {
  const age = 25;
  console.log(age);

  if (age === 25) {
    const name = "name";
    var surname = "surname";

    function say() {
      console.log(`Age is ${age}`);
    }
  }

  //console.log(name);
  console.log(surname);
  //say();
}

test();