# Recursion

Recursion is a programming concept where a function calls itself in order to solve a problem.
Invoke the same function with a different input until you reach your base case!
Base Case: The condition when the recursion ends.

## Used in :

1. JSON.parse / JSON.stringify
2. document.getElementById and DOM traversal algorithms
3. Object traversal
4. Very common with more complex algorithms
5. It's sometimes a cleaner alternative to iteration

## Key Components of Recursion:

1. **Base Case**: The condition that stops the recursion (without this, you'd get infinite recursion)
2. **Recursive Case**: The part where the function calls itself with a modified input

## Simple Example:

```javascript
function factorial(n) {
  // Base case: factorial of 0 or 1 is 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: n! = n * (n-1)!
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120 (5! = 5*4*3*2*1 = 120)

function countdown(n) {
  // Base case: stop when we reach 0
  if (n <= 0) {
    console.log("Blastoff!");
    return;
  }

  // Recursive case
  console.log(n);
  countdown(n - 1);
}

countdown(5);
```

## Important Notes About Recursion:

- Each recursive call adds a new layer to the call stack
- Too many recursive calls can lead to a stack overflow error.
- Your recursive functions should always have a base case and be invoked with different input each time
- When using recursion, it's often essential to return values from one function to another to extract data from each function call
- Some problems are naturally recursive (like tree traversals)
- Recursive solutions can often be more elegant but may be less efficient than iterative solutions
