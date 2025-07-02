# LC - 394. Decode String

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 105.

### Problem Understanding

The problem requires us to decode a string that has been encoded using a specific pattern: `k[encoded_string]`, where `k` is a positive integer and `encoded_string` is a substring that needs to be repeated `k` times. The challenge is to handle nested patterns, such as `3[a2[c]]`, which should be decoded to `accaccacc`.

### Intuition

The key observation here is that the decoding process involves handling nested structures, which naturally suggests the use of a stack. The stack can help manage the current context (the string being built and the current multiplier) when encountering nested patterns. Alternatively, recursion can be used to handle each nested segment as a subproblem.

## Approach 1: Using Stack

- Iterate through each character in the string.
- When encountering a digit, parse the entire number (since numbers can have multiple digits).
- When encountering an opening bracket `[`, push the current string and the current number onto the stack, then reset these variables for the new context.
- When encountering a closing bracket `]`, pop the stack to get the multiplier and the previous string, then combine them with the current string.
- For letters, simply append them to the current string.

```javascript
function decodeString(s) {
  let stack = [];
  let currentString = "";
  let currentNumber = 0;

  for (let char of s) {
    if (char === "[") {
      // Push the current string and number onto the stack
      stack.push(currentString);
      stack.push(currentNumber);
      // Reset current string and number
      currentString = "";
      currentNumber = 0;
    } else if (char === "]") {
      // Pop the number and the previous string
      let num = stack.pop();
      let prevString = stack.pop();
      // Repeat the current string and append to the previous string
      currentString = prevString + currentString.repeat(num);
    } else if (isDigit(char)) {
      // Build the number digit by digit
      currentNumber = currentNumber * 10 + parseInt(char, 10);
    } else {
      // Append the character to the current string
      currentString += char;
    }
  }

  return currentString;
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}
```

## Approach 2: Recursion (DFS)

**Recursion (DFS)**:

- Use a global or passed index to keep track of the current position in the string.
- When encountering a digit, parse the number and the subsequent substring within the brackets recursively.
- Combine the results by repeating the recursively decoded substring the appropriate number of times.

```javascript
function decodeString(s) {
  let index = 0;

  function decodeHelper() {
    let result = "";
    let num = 0;

    while (index < s.length && s[index] !== "]") {
      if (isDigit(s[index])) {
        // Parse the number
        num = 0;
        while (index < s.length && isDigit(s[index])) {
          num = num * 10 + parseInt(s[index], 10);
          index++;
        }
        // The next character should be '[', skip it
        index++;
        // Decode the substring inside the brackets
        let decodedString = decodeHelper();
        // Append the decoded string repeated 'num' times
        result += decodedString.repeat(num);
        // The next character should be ']', skip it
        index++;
      } else {
        // Append the character to the result
        result += s[index];
        index++;
      }
    }

    return result;
  }

  return decodeHelper();
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}
```

## Time and Space Complexity Analysis

### Stack Approach:

- **Time Complexity**: O(n), where n is the length of the output string. Each character is processed once, and the `repeat` operation is linear in the length of the substring being repeated.
- **Space Complexity**: O(m), where m is the depth of the nested brackets. This is because the stack stores intermediate strings and numbers for each level of nesting.

### Recursion Approach:

- **Time Complexity**: O(n), similar to the stack approach, each character is processed once, and the `repeat` operation is linear.
- **Space Complexity**: O(m), where m is the depth of the nested brackets, due to the recursion stack.

## Dry Run

#### Example 1: "3[a]2[bc]"

- Stack Approach:
  - Process '3': currentNumber = 3
  - Process '[': stack = ['', 3], reset currentString and currentNumber
  - Process 'a': currentString = 'a'
  - Process ']': num = 3, prevString = '', currentString = 'aaa'
  - Process '2': currentNumber = 2
  - Process '[': stack = ['aaa', 2], reset
  - Process 'b', 'c': currentString = 'bc'
  - Process ']': num = 2, prevString = 'aaa', currentString = 'aaabcbc'
  - Result: 'aaabcbc'

#### Example 2: "3[a2[c]]"

- Stack Approach:
  - Process '3': currentNumber = 3
  - Process '[': stack = ['', 3], reset
  - Process 'a': currentString = 'a'
  - Process '2': currentNumber = 2
  - Process '[': stack = ['a', 2, '', 3], reset
  - Process 'c': currentString = 'c'
  - Process ']': num = 2, prevString = 'a', currentString = 'acc'
  - Process ']': num = 3, prevString = '', currentString = 'accaccacc'
  - Result: 'accaccacc'

#### Example 3: "2[abc]3[cd]ef"

- Stack Approach:
  - Process '2': currentNumber = 2
  - Process '[': stack = ['', 2], reset
  - Process 'a', 'b', 'c': currentString = 'abc'
  - Process ']': num = 2, prevString = '', currentString = 'abcabc'
  - Process '3': currentNumber = 3
  - Process '[': stack = ['abcabc', 3], reset
  - Process 'c', 'd': currentString = 'cd'
  - Process ']': num = 3, prevString = 'abcabc', currentString = 'abcabccdcdcd'
  - Process 'e', 'f': currentString = 'abcabccdcdcdef'
  - Result: 'abcabccdcdcdef'

These examples demonstrate how the stack approach efficiently handles nested and sequential patterns by managing context switches with a stack.
