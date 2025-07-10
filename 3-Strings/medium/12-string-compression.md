# LC- 443. String Compression

Given an array of characters `chars`, compress it using the following algorithm:
Begin with an empty string `s`. For each group of consecutive repeating characters in chars:

- If the group's length is `1`, append the character to `s`.
- Otherwise, append the character followed by the group's length.

The compressed string `s` should not be returned separately, but instead, be stored in the input character array `chars`.
Note that group lengths that are `10` or longer will be split into multiple characters in `chars`.
After you are done `modifying the input array`, return the new length of the array.
You must write an algorithm that uses only `constant extra space`.

Example 1:

- Input: chars = `["a","a","b","b","c","c","c"]`
- Output: Return `6`, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
- Explanation: The groups are "aa", "bb", and "ccc". This compresses to `a2b2c3`.

### Problem Understanding

- The problem requires us to compress an array of characters in-place by replacing consecutive repeating characters with the character followed by the count of its consecutive occurrences.
- If the count is 1, we only include the character.
- The compressed array should be stored in the original array, and we need to return the new length of the compressed array.

### Intuition

- The task resembles `Run-Length Encoding (RLE)`, where we count consecutive occurrences of a character and represent them compactly.
- Since we modify the array in-place, we need two pointers:
  - One to `read the input array` (tracking groups of characters).
  - One to `write the compressed result` back into the array.
- For each group of consecutive characters:
  - If the count is 1, write only the character.
  - If the `count > 1`, write the character followed by the count (as individual digits for counts ≥ 10).
- We must handle edge cases:
  - Single character (no compression needed).
  - Large groups (`counts ≥ 10`, requiring multiple digits).
  - Array with multiple groups or all identical characters.

**Key Challenges:**

- Modifying the array in-place without overwriting unprocessed characters.
- Converting numbers to individual digits for `counts ≥ 10`.
- Ensuring `O(1)` extra space, limiting us to a few variables.

### Approaches

1. **Two-pointer Technique**:
   - Use one pointer (`writePtr`) to keep track of where to write the compressed characters in the array.
   - Use another pointer (`readPtr`) to traverse the array and count consecutive characters.
   - For each group of consecutive characters, write the character and its count (if greater than 1) at the `writePtr` position, then move the `writePtr` forward accordingly.

### Solution Code

```javascript
/**
 * Compresses the character array in-place and returns the new length.
 * @param {character[]} chars
 * @return {number}
 */
function compress(chars) {
  let writePtr = 0; // Pointer to write the compressed characters
  let readPtr = 0; // Pointer to read the original characters

  while (readPtr < chars.length) {
    const currentChar = chars[readPtr];
    let count = 0;

    // Count the number of consecutive currentChar
    while (readPtr < chars.length && chars[readPtr] === currentChar) {
      readPtr++;
      count++;
    }

    // Write the currentChar to the writePtr position
    chars[writePtr++] = currentChar;

    // If count > 1, write the digits of the count
    if (count > 1) {
      const countStr = count.toString();
      for (let i = 0; i < countStr.length; i++) {
        chars[writePtr++] = countStr[i];
      }
    }
  }

  return writePtr;
}

// Example usage:
console.log(compress(["a", "a", "b", "b", "c", "c", "c"])); // Output: 6
console.log(compress(["a"])); // Output: 1
console.log(
  compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"])
); // Output: 4
```

### Explanation

1. **Initialization**: We start with two pointers, `writePtr` and `readPtr`, both set to 0.
2. **Traversal**: The `readPtr` traverses the array to count consecutive characters. For each new character encountered, it counts how many times it appears consecutively.
3. **Writing Compressed Data**:
   - The current character is written at the `writePtr` position.
   - If the count of consecutive characters is more than 1, the count is converted to a string and each digit is written sequentially at the `writePtr` position.
4. **Return Result**: The `writePtr` at the end of the process gives the new length of the compressed array.

### Time and Space Complexity

- **Time Complexity**: O(n), where n is the length of the input array. We traverse the array once with the `readPtr`.
- **Space Complexity**: O(1), as we are modifying the array in-place without using any additional space except for a few variables.

### Dry Run with Examples

**Example 1: ["a","a","b","b","c","c","c"]**

1. Initial: writePtr = 0, readPtr = 0
2. readPtr finds 'a' at 0, count = 2 (positions 0,1)
   - Write 'a' at writePtr 0, writePtr = 1
   - Write '2' at writePtr 1, writePtr = 2
3. readPtr moves to 2 ('b'), count = 2 (positions 2,3)
   - Write 'b' at writePtr 2, writePtr = 3
   - Write '2' at writePtr 3, writePtr = 4
4. readPtr moves to 4 ('c'), count = 3 (positions 4,5,6)
   - Write 'c' at writePtr 4, writePtr = 5
   - Write '3' at writePtr 5, writePtr = 6
5. readPtr reaches end, return 6
   - Compressed array: ["a","2","b","2","c","3"]

**Example 2: ["a"]**

1. Initial: writePtr = 0, readPtr = 0
2. readPtr finds 'a' at 0, count = 1
   - Write 'a' at writePtr 0, writePtr = 1
3. readPtr reaches end, return 1
   - Compressed array: ["a"]

**Example 3: ["a","b","b","b",...,"b"] (12 'b's)**

1. Initial: writePtr = 0, readPtr = 0
2. readPtr finds 'a' at 0, count = 1
   - Write 'a' at writePtr 0, writePtr = 1
3. readPtr moves to 1 ('b'), count = 12
   - Write 'b' at writePtr 1, writePtr = 2
   - Write '1' at writePtr 2, writePtr = 3
   - Write '2' at writePtr 3, writePtr = 4
4. readPtr reaches end, return 4
   - Compressed array: ["a","b","1","2"]

This approach efficiently compresses the array in-place while handling all edge cases, including single-character groups and multi-digit counts.
