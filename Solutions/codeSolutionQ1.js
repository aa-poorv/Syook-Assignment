// Solution of Easy Q1
// Am I Perfect ?

let num = prompt("Enter the number");
let sum = 0;
for (let i = 1; i < num; i++) {
  if (num % i === 0) {
    sum += i;
  }
}
console.log(sum);
if (sum == num) {
  console.log("Perfect");
} else if (sum > num) {
  console.log("Abundant");
} else {
  console.log("Deficient");
}
