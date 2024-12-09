//LC-50.Given two integers x and n, write a function to compute x to the power n.

// Naive iterative solution to calculate pow(x, n)
//below code will not work for negative power (2, -2)
function power(x, n) {
  // Initialize result to 1
  let pow = 1;

  // Multiply x for n times
  for (let i = 0; i < n; i++) {
    pow = pow * x;
  }

  return pow;
}

function powerRecurssive(base, pow) {
  //base case
  if (pow === 0) return 1;

  //edge case
  if (base === 0) return 0;

  //recurssive relation
  return base * powerRecurssive(base, pow - 1);
}

//TC for above both soln - O(n)

//Optized Approach -- Works for negative base and float pow
function powerOf(base, pow) {
  var temp;

  //base case
  if (pow === 0) return 1;

  temp = powerOf(base, parseInt(pow / 2));

  if (pow % 2 == 0) return temp * temp;
  else {
    if (pow > 0) return base * temp * temp;
    else return (temp * temp) / base;
  }
}

//Time Complexity: O(log |n|)
// Auxiliary Space: O(log |n|) , for recursive call stack

//Using library function
function power(x, n) {
  // Math.pow() is a function that
  // return floating number
  return parseInt(Math.pow(x, n));
}

//Time Complexity: O(log n)
// Auxiliary Space: O(1), for recursive call stack
