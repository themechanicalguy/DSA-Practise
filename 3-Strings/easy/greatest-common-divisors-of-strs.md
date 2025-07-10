# LC 1071. Greatest Common Divisor of Strings

### Problem Understanding

We need to find the largest string `x` that can divide both `str1` and `str2`. By "divide," we mean that both `str1` and `str2` can be formed by concatenating `x` multiple times. For example:

- If `str1 = "ABCABC"` and `str2 = "ABC"`, then `x = "ABC"` because `"ABCABC" = "ABC" + "ABC"` and `"ABC" = "ABC"`.
- If `str1 = "ABABAB"` and `str2 = "ABAB"`, then `x = "AB"` because `"ABABAB" = "AB" + "AB" + "AB"` and `"ABAB" = "AB" + "AB"`.

### Intuition

1. **Common Divisor**: The solution must be a string that is a common divisor of both `str1` and `str2`. This means it must be a prefix of both strings and must be able to divide both strings when repeated.
2. **Greatest Common Divisor (GCD)**: The length of the largest possible `x` must be the GCD of the lengths of `str1` and `str2`. This is because the GCD represents the largest length that can evenly divide both lengths.
3. **Verification**: After finding a candidate `x` of length equal to the GCD, we need to verify that this `x` can indeed divide both `str1` and `str2` by checking if concatenating `x` multiple times reconstructs the original strings.

### Approaches

1. **Brute Force**:

   - Iterate over all possible prefix lengths from 1 to the minimum of the lengths of `str1` and `str2`.
   - For each prefix length, check if the prefix can divide both strings.
   - Return the longest such prefix.

```javascript
/**
 * Finds the largest string x that divides both str1 and str2.
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
function gcdOfStringsBruteForce(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const minLen = Math.min(len1, len2);

  for (let l = minLen; l > 0; l--) {
    if (len1 % l !== 0 || len2 % l !== 0) continue;

    const candidate = str1.substring(0, l);
    let isDivisor = true;

    // Check if candidate divides str1
    for (let i = 0; i < len1; i += l) {
      if (str1.substring(i, i + l) !== candidate) {
        isDivisor = false;
        break;
      }
    }
    if (!isDivisor) continue;

    // Check if candidate divides str2
    for (let i = 0; i < len2; i += l) {
      if (str2.substring(i, i + l) !== candidate) {
        isDivisor = false;
        break;
      }
    }
    if (isDivisor) {
      return candidate;
    }
  }
  return "";
}
```

- **Time Complexity**: `O(min(m, n) * (m + n))`, where m and n are the lengths of `str1` and `str2`. We check up to min(m, n) lengths, and for each, we potentially scan both strings.
- **Space Complexity**: O(min(m, n)), for storing the candidate substring.

#### Approach 2: Optimal Using GCD

- Compute the GCD of the lengths of `str1` and `str2`.
- The candidate `x` is the prefix of this length.
- Verify if this `x` can divide both strings.

```javascript
/**
 * Computes the GCD of two numbers using Euclidean algorithm.
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function computeGCD(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;

  while (a > 0 && b > 0) {
    if (a > b) a = a - b;
    else b = b - a;
  }
  return a === 0 ? b : a;
}

/**
 * Finds the largest string x that divides both str1 and str2 using GCD.
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
function gcdOfStrings(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const gcdLength = computeGCD(len1, len2);
  const candidate = str1.slice(0, gcdLength);

  // Check if candidate divides str1
  for (let i = 0; i < len1; i += gcdLength)
    if (str1.slice(i, i + gcdLength) !== candidate) return "";

  // Check if candidate divides str2
  for (let i = 0; i < len2; i += gcdLength)
    if (str2.slice(i, i + gcdLength) !== candidate) return "";

  return candidate;
}
```

- **Time Complexity**: O(m + n), as we compute the GCD in O(log(min(m, n))) time and then scan both strings once.
- **Space Complexity**: O(min(m, n)), for storing the candidate substring.

### Dry Run of Optimal Approach

#### Example 1:

- `str1 = "ABCABC"`, `str2 = "ABC"`
- Lengths: 6 and 3. GCD is 3.
- Candidate: "ABC".
- Check "ABC" divides "ABCABC": "ABC" + "ABC" = "ABCABC" ✔
- Check "ABC" divides "ABC": "ABC" = "ABC" ✔
- Output: "ABC"

#### Example 2:

- `str1 = "ABABAB"`, `str2 = "ABAB"`
- Lengths: 6 and 4. GCD is 2.
- Candidate: "AB".
- Check "AB" divides "ABABAB": "AB" + "AB" + "AB" = "ABABAB" ✔
- Check "AB" divides "ABAB": "AB" + "AB" = "ABAB" ✔
- Output: "AB"

#### Example 3:

- `str1 = "LEET"`, `str2 = "CODE"`
- Lengths: 4 and 4. GCD is 4.
- Candidate: "LEET".
- Check "LEET" divides "CODE": First character 'L' ≠ 'C' ✖
- Output: ""

This covers all edge cases, including when no common divisor exists.
