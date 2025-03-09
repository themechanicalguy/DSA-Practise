//https://www.geeksforgeeks.org/problems/find-all-factorial-numbers-less-than-or-equal-to-n3548/0
//A number n is called a factorial number if it is the factorial of a positive integer. For example, the first few factorial numbers are 1, 2, 6, 24, 120,
//Given a number n, the task is to return the list/vector of the factorial numbers smaller than or equal to n.

// Approach 1: Recursive
function factorialNumbers(n) {
  const result = [];
  const getFactorialNumbers = (n, fact = 1, i = 1) => {
    if (fact > n) return result; // Base case: stop when factorial exceeds n

    result.push(fact); // Add the factorial to the result list

    if (fact * (i + 1) > n) return result; // Ensure the next factorial does not exceed n

    return getFactorialNumbers(n, fact * (i + 1), i + 1); // Recursive call
  };

  return getFactorialNumbers(n);
}

// Approach 2: Iterative
function getFactorialNumbersIterative(n) {
  let result = [],
    fact = 1,
    i = 1;
  while (fact <= n) {
    result.push(fact);
    i++;
    fact *= i;
  }
  return result;
}
