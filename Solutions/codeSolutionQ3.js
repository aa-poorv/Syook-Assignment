// Solution of Easy Q3
// How many trails to 1 ?

let num = prompt("Enter the number ");
let count = 0;
while (num != 1) {
  if (num % 2 == 0) {
    num = num / 2;
  } else {
    num = num * 3 + 1;
  }
  count++;
}

console.log(count);
