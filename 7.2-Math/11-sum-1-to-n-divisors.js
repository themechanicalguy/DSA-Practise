//https://www.geeksforgeeks.org/problems/sum-of-all-divisors-from-1-to-n4738/1
//Given a positive integer n, The task is to find the value of Σi F(i) where i is from 1 to n and function F(i) is defined as the sum of all divisors of i.
//Example:
//Input: n = 4
//Output: 21
//Explanation:
//For i = 1, F(1) = 1
//For i = 2, F(2) = 3
//For i = 3, F(3) = 4
//For i = 4, F(4) = 7
//Therefore, the sum of all F(i) from 1 to 4 is 1 + 3 + 4 + 7 = 15
//Therefore, the output is 15

//Approach 1 : Brute Force

function sumOfDivisors(n) {
  let totalSum = 0;

  // Function to calculate sum of divisors for a single number
  function getDivisorSum(num) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) sum += i;
    }
    return sum;
  }

  // Sum F(i) for i from 1 to n
  for (let i = 1; i <= n; i++) {
    totalSum += getDivisorSum(i);
  }

  return totalSum;
}

// Example usage
console.log(sumOfDivisors(4)); // F(1) + F(2) + F(3) + F(4) = 1 + 3 + 4 + 7 = 15

//Approach 2: Optimized Using Divisor Count Technique

function sumOfDivisorsOptimized(n) {
  let totalSum = 0;

  // For each number i, add i to the sum of divisors of its multiples
  for (let i = 1; i <= n; i++) {
    totalSum += Math.floor(n / i) * i;
  }

  return totalSum;
}

// Example usage
console.log(sumOfDivisorsOptimized(4)); // Output: 15

//Approach 4: Mathematical Approach (Using Number Theory)
function sumOfDivisorsMath(n) {
  let totalSum = 0;

  // For each number i, calculate sum of divisors using multiples
  for (let i = 1; i <= n; i++) {
    totalSum += i * Math.floor(n / i);
  }

  return totalSum;
}

// Example usage
console.log(sumOfDivisorsMath(4)); // Output: 15
