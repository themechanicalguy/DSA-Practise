# LC-151 Reverse Words in a String

### Problem Understanding

We need to reverse the order of words in a given string `s`. A word is defined as a sequence of non-space characters, and words are separated by one or more spaces. The resulting string should have words in reverse order, separated by a single space, with no leading or trailing spaces.

### Intuition

1. **Trim and Split**: First, we need to trim any leading or trailing spaces from the string and then split the string into an array of words, handling multiple spaces between words by treating them as a single delimiter.
2. **Reverse the Array**: Once we have the array of words, reversing the array will give us the words in the desired order.
3. **Join with Single Space**: Finally, we join the reversed array into a string with each word separated by a single space.

### Approaches

#### Approach 1: Using Built-in Methods

- Trim the string to remove leading and trailing spaces.
- Split the string into an array of words using a regular expression to handle multiple spaces.
- Reverse the array.
- Join the array back into a string with single spaces.

1. **Trim and Split**: The `trim()` method removes leading and trailing spaces. The `split(/\s+/)` splits the string into an array of words, where `\s+` matches one or more spaces.
2. **Reverse and Join**: The `reverse()` method reverses the array, and `join(' ')` combines the words into a string with single spaces.

#### Approach 1: Using Built-in Methods

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  // Trim leading and trailing spaces, then split by one or more spaces
  const words = s.trim().split(/\s+/);
  // Reverse the array of words and join with a single space
  return words.reverse().join(" ");
};

//Without using regex

var reverseWords = function (inputString) {
  // Trim leading/trailing spaces and split by single space
  const wordsWithSpaces = inputString.trim().split(" ");

  // Filter out empty strings caused by multiple spaces
  const wordsArray = wordsWithSpaces.filter((word) => word !== "");

  // Reverse the array of words
  const reversedWords = wordsArray.reverse();

  // Join words with a single space
  return reversedWords.join(" ");
};
```

- **Time Complexity**: O(n), where n is the length of the string. Trimming, splitting, reversing, and joining all operate in linear time.
- **Space Complexity**: O(n), for storing the array of words.

### Dry Run with Examples

**Example 1: s = "the sky is blue"**

- Trim: "the sky is blue"
- Split: ["the", "sky", "is", "blue"]
- Reverse: ["blue", "is", "sky", "the"]
- Join: "blue is sky the"

**Example 2: s = " hello world "**

- Trim: "hello world"
- Split: ["hello", "world"]
- Reverse: ["world", "hello"]
- Join: "world hello"

**Example 3: s = "a good example"**

- Trim: "a good example"
- Split: ["a", "good", "example"]
- Reverse: ["example", "good", "a"]
- Join: "example good a"

### Alternative Approaches

1. **Using Stack**:

   - Split the string into words and push them onto a stack, then pop them to reverse the order.

   ```javascript
   var reverseWords = function (s) {
     const stack = [];
     const words = s.trim().split(/\s+/);
     for (const word of words) {
       stack.push(word);
     }
     let result = [];
     while (stack.length) {
       result.push(stack.pop());
     }
     return result.join(" ");
   };
   ```

   - **Complexity**: Same as built-in methods.

2. **Two-Pointer Technique**:
   - Use two pointers to identify words in the string from the end to the start, collecting them in reverse order.
   ```javascript
   var reverseWords = function (s) {
     let result = "";
     let i = s.length - 1;
     while (i >= 0) {
       while (i >= 0 && s[i] === " ") i--;
       if (i < 0) break;
       let j = i;
       while (j >= 0 && s[j] !== " ") j--;
       if (result.length > 0) result += " ";
       result += s.substring(j + 1, i + 1);
       i = j;
     }
     return result;
   };
   ```
   - **Complexity**: O(n) time, O(n) space for the result string.

### Conclusion

The built-in methods approach is concise and leverages JavaScript's powerful string and array manipulation functions. The manual approach provides more control and avoids regular expressions, which might be preferred in certain contexts. Both approaches efficiently solve the problem with linear time and space complexity.
