// Solution of Hard Q2
// n-Chai

let n = prompt("Enter number of chai bags ");
let k = prompt("Enter maximum times a row ");
let g = prompt("Enter number of green bags ");
let b = prompt("Enter number of black bags ");

let result;
let Consec = 0;
while (1 == 1) {
  if (k >= Math.abs(g - b)) {
    result = true;
    break;
  } else {
    if (g == 0 || b == 0) {
      result = false;
      break;
    }

    if (g > b) {
      g = g - k;
      b = b - 1;
    } else {
      b = b - k;
      g = g - 1;
    }
  }
}

console.log(result);
