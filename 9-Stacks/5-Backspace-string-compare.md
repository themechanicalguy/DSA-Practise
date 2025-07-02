# 844. Backspace String Compare

### Problem Understanding

We need to determine if two strings `s` and `t` are equal after processing all the backspace characters (`'#'`) in them. A backspace character removes the preceding character in the string. For example:

- `"ab#c"` becomes `"ac"` (the `'b'` is removed).
- `"a##c"` becomes `"c"` (both `'a'` and the first `'#'` remove the `'a'`, then the second `'#'` has nothing to remove).

### Approaches

There are several ways to solve this problem:

1. **Stack-Based Approach**: Process each string by using a stack to handle backspaces.
2. **Two-Pointer Approach**: Process the strings from the end to the beginning, skipping characters as needed by backspaces.
3. **String Builder Approach**: Build the result strings by iterating and handling backspaces directly.

We'll explore all three approaches in JavaScript.

### 1. Stack-Based Approach

**Intuition**: Use a stack to build the final string. For each character in the input string, if it's not a `'#'`, push it onto the stack. If it is a `'#'`, pop the last character from the stack (if the stack is not empty).

**Steps**:

1. Define a helper function to process a string using a stack.
2. Process both `s` and `t` using this helper.
3. Compare the results.

**Solution Code**:

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function backspaceCompare(s, t) {
  return processString(s) === processString(t);
}

function processString(str) {
  const stack = [];
  for (const char of str) {
    if (char === "#") {
      stack.pop(); // Remove the last character if stack is not empty
    } else {
      stack.push(char); // Add character to the stack
    }
  }
  return stack.join("");
}
```

**Time Complexity**: O(n + m), where n and m are the lengths of `s` and `t`. We process each string once.
**Space Complexity**: O(n + m), for the stacks used to process the strings.

### 2. Two-Pointer Approach

**Intuition**: Process the strings from the end to the beginning, skipping characters that are backspaced. This avoids using extra space for stacks.

**Steps**:

1. Use two pointers starting at the end of both strings.
2. For each string, skip characters that are backspaced (`'#'` counts as a backspace, so skip the next non-backspace character).
3. Compare the remaining characters.

**Solution Code**:

```javascript
function backspaceCompare(s, t) {
  let i = s.length - 1,
    j = t.length - 1;
  let skipS = 0,
    skipT = 0;

  while (i >= 0 || j >= 0) {
    // Find the next valid character in s
    while (i >= 0) {
      if (s[i] === "#") {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else {
        break;
      }
    }

    // Find the next valid character in t
    while (j >= 0) {
      if (t[j] === "#") {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else {
        break;
      }
    }

    // Compare the valid characters
    if (i >= 0 && j >= 0 && s[i] !== t[j]) {
      return false;
    }

    // If one is done and the other isn't
    if (i >= 0 !== j >= 0) {
      return false;
    }

    i--;
    j--;
  }

  return true;
}
```

**Time Complexity**: O(n + m), each string is processed once.
**Space Complexity**: O(1), no extra space is used apart from pointers.

### 3. String Builder Approach

**Intuition**: Similar to the stack approach, but instead of using a stack, build the string directly by keeping track of the backspaces.

**Steps**:

1. Iterate through each string, counting backspaces and skipping characters accordingly.
2. Build the result strings by including only the characters that are not backspaced.

**Solution Code**:

```javascript
function backspaceCompare(s, t) {
  return buildString(s) === buildString(t);
}

function buildString(str) {
  let result = "";
  let backspaceCount = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === "#") {
      backspaceCount++;
    } else {
      if (backspaceCount > 0) {
        backspaceCount--;
      } else {
        result = str[i] + result;
      }
    }
  }

  return result;
}
```

**Time Complexity**: O(n + m), each string is processed once.
**Space Complexity**: O(n + m), for the resulting strings.

### Dry Run of Optimal Approach (Two-Pointer)

Let's dry run the two-pointer approach with the provided examples.

**Example 1**:

- `s = "ab#c"`, `t = "ad#c"`
  - Start at `i = 3` (s[3] = 'c'), `j = 3` (t[3] = 'c').
  - Both are valid, compare 'c' == 'c' → continue.
  - Move to `i = 2` (s[2] = '#'), `j = 2` (t[2] = '#').
  - Both are backspaces, increment skip counts and move left.
  - Now `i = 1` (s[1] = 'b'), skipS = 1 → skip 'b', decrement skipS, move to `i = 0`.
  - Similarly for `t`, skip 'd', move to `j = 0`.
  - Now `i = 0` (s[0] = 'a'), `j = 0` (t[0] = 'a').
  - Compare 'a' == 'a' → true.

**Example 2**:

- `s = "ab##"`, `t = "c#d#"`
  - Process `s`:
    - Start at `i = 3` (s[3] = '#'), skipS = 1, move to `i = 2`.
    - s[2] = '#', skipS = 2, move to `i = 1`.
    - s[1] = 'b', skipS = 2 → skip, decrement skipS, move to `i = 0`.
    - s[0] = 'a', skipS = 1 → skip, decrement skipS, move to `i = -1`.
  - Process `t` similarly, both result in empty strings → true.

**Example 3**:

- `s = "a#c"`, `t = "b"`
  - Process `s`:
    - `i = 2` (s[2] = 'c'), valid.
    - `i = 1` (s[1] = '#'), skipS = 1, move to `i = 0`.
    - s[0] = 'a', skipS = 1 → skip, move to `i = -1`.
    - Final character in `s`: 'c'.
  - `t` is 'b' → 'c' != 'b' → false.

### Edge Cases

- Both strings are empty → true.
- One string is empty, the other becomes empty after backspaces → true.
- Multiple consecutive backspaces (e.g., `"a###b"` becomes "b").

### Final Answer

The optimal approach is the two-pointer method due to its O(1) space complexity. Here's the final implementation:

```javascript
function backspaceCompare(s, t) {
  let i = s.length - 1,
    j = t.length - 1;
  let skipS = 0,
    skipT = 0;

  while (i >= 0 || j >= 0) {
    // Find the next valid character in s
    while (i >= 0) {
      if (s[i] === "#") {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else {
        break;
      }
    }

    // Find the next valid character in t
    while (j >= 0) {
      if (t[j] === "#") {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else {
        break;
      }
    }

    // Compare the valid characters
    if (i >= 0 && j >= 0 && s[i] !== t[j]) {
      return false;
    }

    // If one is done and the other isn't
    if (i >= 0 !== j >= 0) {
      return false;
    }

    i--;
    j--;
  }

  return true;
}
```

**Time Complexity**: O(n + m), where n and m are the lengths of `s` and `t`.
**Space Complexity**: O(1), as we only use a constant amount of extra space.
