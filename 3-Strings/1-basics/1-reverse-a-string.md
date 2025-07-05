# Reversing a String in JavaScript: All Possible Approaches

Here are all the possible approaches to reverse a string in JavaScript, along with their time and space complexity analysis.

## 1. Using Built-in Methods (Most Straightforward)

```javascript
/**
 * Reverses a string using built-in JavaScript methods
 * @param {string} originalString - The string to be reversed
 * @return {string} The reversed string
 */
function reverseWithBuiltInMethods(originalString) {
  // Split the string into an array of characters, reverse the array, then join back to string
  return originalString.split("").reverse().join("");
}

// Time Complexity: O(n) - split, reverse, and join all operate in linear time
// Space Complexity: O(n) - creates new arrays and strings
```

## 2. Using a For Loop (Backwards Iteration)

```javascript
/**
 * Reverses a string by iterating backwards
 * @param {string} originalString - The string to be reversed
 * @return {string} The reversed string
 */
function reverseWithForLoop(originalString) {
  let reversedString = "";

  // Start from the end of the string and move backwards
  for (let i = originalString.length - 1; i >= 0; i--) {
    reversedString += originalString[i];
  }

  return reversedString;
}

// Time Complexity: O(n) - single loop through the string
// Space Complexity: O(n) - builds a new string
```

## 3. Using Recursion

```javascript
/**
 * Reverses a string using recursion
 * @param {string} originalString - The string to be reversed
 * @return {string} The reversed string
 */
function reverseWithRecursion(originalString) {
  // Base case: if string is empty or has one character
  if (originalString.length <= 1) {
    return originalString;
  }

  // Take the last character and put it at the beginning of the reversed substring
  return (
    originalString.slice(-1) + reverseWithRecursion(originalString.slice(0, -1))
  );
}

// Time Complexity: O(n) - makes n recursive calls
// Space Complexity: O(n) - call stack grows with string length
```

## 4. Using Array.reduce()

```javascript
/**
 * Reverses a string using Array.reduce()
 * @param {string} originalString - The string to be reversed
 * @return {string} The reversed string
 */
function reverseWithReduce(originalString) {
  // Split to array, then use reduce to build reversed string
  return originalString
    .split("")
    .reduce((reversed, character) => character + reversed, "");
}

// Time Complexity: O(n) - split and reduce both operate in linear time
// Space Complexity: O(n) - creates intermediate arrays
```

## 5. Using ES6 Spread Operator

```javascript
/**
 * Reverses a string using ES6 spread operator
 * @param {string} originalString - The string to be reversed
 * @return {string} The reversed string
 */
function reverseWithSpread(originalString) {
  // Spread string into array, reverse, then join
  return [...originalString].reverse().join("");
}

// Time Complexity: O(n) - spread, reverse, and join all operate in linear time
// Space Complexity: O(n) - creates intermediate arrays
```

## 6. Using Pointers (Optimal for some languages, less relevant in JS)

```javascript
/**
 * Reverses a string using a two-pointer approach (simulated in JS)
 * @param {string} originalString - The string to be reversed
 * @return {string} The reversed string
 */
function reverseWithPointers(originalString) {
  const characters = originalString.split("");
  let left = 0;
  let right = characters.length - 1;

  while (left < right) {
    // Swap characters at left and right pointers
    [characters[left], characters[right]] = [
      characters[right],
      characters[left],
    ];
    left++;
    right--;
  }

  return characters.join("");
}

// Time Complexity: O(n) - processes half the string (n/2 swaps)
// Space Complexity: O(n) - creates an array for swapping
```

## Optimal Approach Analysis

The most optimal approach in JavaScript is typically the built-in method approach (`split().reverse().join()`) because:

1. It's the most readable and maintainable
2. JavaScript engines optimize these built-in methods very well
3. It has the same time and space complexity as other approaches (O(n))

## Dry Run of Optimal Approach

Let's dry run the built-in method approach with 3 examples:

### Example 1: "Geeks"

1. `split('')` → ['G', 'e', 'e', 'k', 's']
2. `reverse()` → ['s', 'k', 'e', 'e', 'G']
3. `join('')` → "skeeG"
   Output: "skeeG"

### Example 2: "for"

1. `split('')` → ['f', 'o', 'r']
2. `reverse()` → ['r', 'o', 'f']
3. `join('')` → "rof"
   Output: "rof"

### Example 3: "a" (Edge case: single character)

1. `split('')` → ['a']
2. `reverse()` → ['a'] (no change)
3. `join('')` → "a"
   Output: "a"

### Example 4: "" (Edge case: empty string)

1. `split('')` → []
2. `reverse()` → [] (no change)
3. `join('')` → ""
   Output: "" (correctly handles empty string)

All approaches will work correctly, but the built-in method is generally preferred for its clarity unless you have specific performance constraints that require optimization.
