//LC- 796 Rotate String
// Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
// A shift on s consists of moving the leftmost character of s to the rightmost position.
// For example, if s = "abcde", then it will be "bcdea" after one shift.
//  Example 1:
// Input: s = "abcde", goal = "cdeab"
// Output: true

//Approach 1: Using Modular Arithmetic -partially similar to the right rotate array
//space-efficient (O(1) extra space) and time-efficient (O(n²) worst case).
/**
 * Checks character positions using modular arithmetic to simulate shifts.
 * @param {string} s - The original string
 * @param {string} goal - The target string to match after shifts
 * @return {boolean} - True if 's' can become 'goal' after shifts
 */
function rotateStringWithModulo(s, goal) {
  if (s.length !== goal.length) {
    return false;
  }
  const n = s.length;
  // Check for all possible shift amounts
  for (let shift = 0; shift < n; shift++) {
    let match = true;

    // Verify each character matches after this shift
    for (let i = 0; i < n; i++) {
      // The shifted position is (i + shift) % n
      //Modulo Handles Circular Shifts: (i + shift) % n ensures we wrap around correctly. -- to get confused in this condition
      if (s[(i + shift) % n] !== goal[i]) {
        match = false;
        break;
      }
    }

    if (match) {
      return true;
    }
  }

  return false;
}

//Approach 2: Concatenation Check
/**
 * Checks if goal is a rotation of s by checking if goal exists in s+s
 * Time Complexity: O(n^2) - includes is O(n) in JS, concatenation is O(n)
 * Space Complexity: O(n) - creates concatenated string of size 2n
 */
function isRotationConcatenation(s, goal) {
  if (s.length !== goal.length) return false;
  return (s + s).includes(goal);
}

//Approach 3: Queue Simulation

/**
 * Simulates rotation using queue operations
 * Time Complexity: O(n^2) - shift operation is O(n) in JS array
 * Space Complexity: O(n) - converts string to array
 */

/**
 * Simulates rotation using queue operations
 * Time Complexity: O(n^2) - shift operation is O(n) in JS array
 * Space Complexity: O(n) - converts string to array
 */
function isRotationQueue(s, goal) {
  if (s.length !== goal.length) return false;
  if (s === goal) return true;

  const originalArray = s.split("");
  for (let i = 0; i < originalArray.length; i++) {
    // Rotate by moving first element to end
    const firstChar = originalArray.shift();
    originalArray.push(firstChar);

    // Compare arrays
    if (originalArray.join("") === goal) return true;
  }

  return false;
}

// Approach 4: Using String Indexing (Most Efficient) - Fails for duplicate characters
/**
 * Most efficient approach using modulo indexing
 * Time Complexity: O(n) - single pass through the string
 * Space Complexity: O(1) - constant space
 */
function isRotationEfficient(s, goal) {
  if (s.length !== goal.length) return false;
  if (s === goal) return true;
  const n = s.length;
  let rotationPoint = -1;
  // Find the rotation point
  for (let i = 0; i < n; i++) {
    if (s[i] === goal[0]) {
      rotationPoint = i;
      break;
    }
  }
  if (rotationPoint === -1) return false;
  // Verify the rotation
  for (let i = 0; i < n; i++) {
    if (s[(rotationPoint + i) % n] !== goal[i]) {
      return false;
    }
  }

  return true;
}
// This does not work in case there are duplicate characters in the string
// For the input:
// s = "defdefdefabcabc"
// goal = "defdefabcabcdef"
// This Approach fails because:
// It only checks the first occurrence where s[i] === goal[0] (looking for 'd' at position 0)
// It assumes this is the correct rotation point without verifying if there might be multiple candidates
// In this case, there are multiple 'd's in the string, and the first one isn't the correct rotation point

//Approach 5: Using KMP Algorithm

/**
 * Checks if s can become goal by performing shifts.
 * Uses KMP algorithm to find goal in s + s.
 * @param {string} s - The initial string s.
 * @param {string} goal - The goal string.
 * @returns {boolean} True if s can become goal after some shifts.
 */
function rotateStringKMP(s, goal) {
  // Check if lengths are equal and non-zero
  if (s.length !== goal.length || s.length === 0) {
    return false;
  }

  // Create text as s + s
  const text = s + s;
  const pattern = goal;

  // Compute LPS array for pattern
  const lps = computeLPSArray(pattern);

  let textIndex = 0; // Index for text
  let patternIndex = 0; // Index for pattern

  // Perform KMP search
  while (textIndex < text.length) {
    if (pattern[patternIndex] === text[textIndex]) {
      patternIndex++;
      textIndex++;
    }
    if (patternIndex === pattern.length) {
      return true; // Pattern found
    }
    if (textIndex < text.length && pattern[patternIndex] !== text[textIndex]) {
      if (patternIndex !== 0) {
        patternIndex = lps[patternIndex - 1];
      } else {
        textIndex++;
      }
    }
  }

  return false;
}

/**
 * Computes the Longest Prefix Suffix (LPS) array for KMP algorithm.
 * @param {string} pattern - The pattern string.
 * @returns {number[]} LPS array.
 */
function computeLPSArray(pattern) {
  const length = pattern.length;
  const lps = new Array(length).fill(0);
  let prefixLength = 0; // Length of previous longest prefix suffix
  let index = 1;

  while (index < length) {
    if (pattern[index] === pattern[prefixLength]) {
      prefixLength++;
      lps[index] = prefixLength;
      index++;
    } else {
      if (prefixLength !== 0) {
        prefixLength = lps[prefixLength - 1];
      } else {
        lps[index] = 0;
        index++;
      }
    }
  }

  return lps;
}
