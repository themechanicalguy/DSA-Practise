# Finding All Subsequences of a String

https://www.geeksforgeeks.org/print-subsequences-string/

### **Intuition**

A **subsequence** of a string is formed by deleting zero or more characters while maintaining the relative order of the remaining characters.

- For a string of length `n`, there are **2ⁿ** possible subsequences.
- This is because each character has **two choices**:
  - **Include** it in the subsequence.
  - **Exclude** it.

This problem is analogous to finding all subsets of an array.

### **Approach**

We use **recursion** to explore all possible combinations:

1. **Base Case:**

   - When we reach the end of the string (`index === str.length`), we add the current subsequence to the result.

2. **Recursive Steps:**
   - **Exclude** the current character → Recurse without adding it.
   - **Include** the current character → Recurse after appending it.

Since strings are immutable in JavaScript, we avoid backtracking by passing new strings in recursive calls.

---

## **JavaScript Solution**

```javascript
/**
 * Generates all possible subsequences of a given string.
 * @param {string} str - Input string
 * @return {string[]} - Array of all subsequences
 */
function subsequences(str) {
  const result = []; // Stores all subsequences

  /**
   * Recursive helper to generate subsequences.
   * @param {string} str - Input string
   * @param {number} index - Current position in the string
   * @param {string} current - Current subsequence being built
   */
  function generateSubsequences(str, index, current) {
    // Base case: Add the current subsequence when we reach the end
    if (index === str.length) {
      result.push(current);
      return;
    }

    // Exclude the current character
    generateSubsequences(str, index + 1, current);

    // Include the current character
    generateSubsequences(str, index + 1, current + str[index]);
  }

  // Start recursion from index 0 with an empty subsequence
  generateSubsequences(str, 0, "");
  return result;
}

// Test Cases
console.log(subsequences("ab")); // ["", "b", "a", "ab"]
console.log(subsequences("a")); // ["", "a"]
console.log(subsequences("")); // [""]
```

---

### **Time & Space Complexity**

| Complexity | Explanation                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Time**   | **O(n · 2ⁿ)** <br> - There are **2ⁿ** subsequences. <br> - Each subsequence takes **O(n)** time to copy into the result. |
| **Space**  | **O(n)** (excluding output) <br> - **Recursion stack depth** = `n`. <br> - **Current subsequence storage** = `O(n)`.     |

---

## **Dry Run with Examples**

### **Example 1: `str = "ab"`**

| Step | Action        | Current Subsequence | Result                 |
| ---- | ------------- | ------------------- | ---------------------- |
| 1    | Start         | `""`                | `[]`                   |
| 2    | Exclude `'a'` | `""`                | `[""]`                 |
| 3    | Exclude `'b'` | `""`                | `[""]`                 |
| 4    | Include `'b'` | `"b"`               | `["", "b"]`            |
| 5    | Include `'a'` | `"a"`               | `["", "b", "a"]`       |
| 6    | Exclude `'b'` | `"a"`               | `["", "b", "a"]`       |
| 7    | Include `'b'` | `"ab"`              | `["", "b", "a", "ab"]` |

**Final Output:** `["", "b", "a", "ab"]`

---

### **Example 2: `str = "a"`**

| Step | Action        | Current Subsequence | Result      |
| ---- | ------------- | ------------------- | ----------- |
| 1    | Start         | `""`                | `[]`        |
| 2    | Exclude `'a'` | `""`                | `[""]`      |
| 3    | Include `'a'` | `"a"`               | `["", "a"]` |

**Final Output:** `["", "a"]`

---

### **Example 3: `str = ""` (Edge Case)**

| Step | Action | Current Subsequence | Result |
| ---- | ------ | ------------------- | ------ |
| 1    | Start  | `""`                | `[""]` |

**Final Output:** `[""]`

---

### **Key Takeaways**

✅ **Recursion** elegantly handles inclusion/exclusion of characters.  
✅ **Immutability** in JavaScript avoids explicit backtracking.  
✅ **Order of subsequences** is naturally maintained by processing excludes first.  
✅ **Edge cases** (empty string, single character) are handled seamlessly.

This solution efficiently generates **all possible subsequences** while maintaining clarity and correctness. 🚀
