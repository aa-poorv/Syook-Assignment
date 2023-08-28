// Solution of Medium Q2
// Hide that PIN!

let num = prompt("Enter the number ");

let binary = Number(num).toString(2);

const table = {
  1: "pop",
  2: "double rip",
  3: "hide your mints",
  4: "fall",
};

let n = binary.length;
let finalAnswer = [];
for (let i = n - 1; i >= 0; i--) {
  if (binary[i] == 1) {
    if (n - i == 5) {
      finalAnswer.reverse();
      continue;
    }
    finalAnswer = [...finalAnswer, table[n - i]];
  }
}

console.log(finalAnswer);
