# LC - 6 Zigzag Conversion

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P A H N
A P L S I I G
Y I R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P I N
A L S I G
Y A H R
P I
Example 3:

Input: s = "A", numRows = 1
Output: "A"

### Intuition and Approaches

The zigzag pattern is a way of writing a string in a diagonal manner on a given number of rows and then reading it row by row. The key observation is to determine the order in which characters are placed in each row during the zigzag traversal.

## Approaches:

1. **Simulate Zigzag Movement**:

   - Use an array of strings, where each element represents a row in the zigzag pattern.
   - Traverse the input string while moving down and up the rows, placing each character in the appropriate row.
   - Finally, concatenate all rows to get the result.

```javascript
/**
 * Approach 1: Simulate Zigzag Movement
 * Time Complexity: O(n), where n is the length of the string.
 * Space Complexity: O(n), for storing rows.
 */
function convert(s, numRows) {
  if (numRows === 1) return s; // Edge case: no zigzag needed

  const rows = new Array(numRows).fill("");
  let currentRow = 0;
  let goingDown = false;

  for (const char of s) {
    rows[currentRow] += char;
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown; // Change direction
    }
    currentRow += goingDown ? 1 : -1;
  }

  return rows.join("");
}
```

2. **Calculate Positions Mathematically**:
   - For each row, determine the indices of characters in the original string that belong to that row in the zigzag pattern.
   - The main idea is to find a pattern or cycle in the indices that can be used to directly access the characters for each row.

```javascript
/**
 * Approach 2: Visit by Row (Mathematical Pattern)
 * Time Complexity: O(n), where n is the length of the string.
 * Space Complexity: O(n), for the result string.
 */
function convert(s, numRows) {
  if (numRows === 1) return s;

  const result = [];
  const n = s.length;
  const cycleLen = 2 * numRows - 2;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j + i < n; j += cycleLen) {
      result.push(s[j + i]);
      if (i !== 0 && i !== numRows - 1 && j + cycleLen - i < n) {
        result.push(s[j + cycleLen - i]);
      }
    }
  }

  return result.join("");
}
```

### Explanation

#### Approach 1: Simulate Zigzag Movement

1. **Initialization**: Create an array of strings (`rows`) to hold characters for each row.
2. **Direction Handling**: Use `currentRow` to track the current row and `goingDown` to manage the direction of movement (down or up).
3. **Character Placement**: For each character in the string, place it in the current row. Change direction when reaching the top or bottom row.
4. **Result Construction**: Concatenate all rows to form the final string.

#### Approach 2: Visit by Row (Mathematical Pattern)

1. **Cycle Length**: The zigzag pattern repeats every `2 * numRows - 2` characters (cycle length).
2. **Row Processing**: For each row, characters are placed at positions `i + k * cycleLen` (for the vertical part) and `(k + 1) * cycleLen - i` (for the diagonal part), where `k` is an integer.
3. **Edge Rows**: The first and last rows only have characters in the vertical part.
4. **Result Construction**: Collect characters in order by processing each row and concatenate them.

### Dry Run

#### Example 1: s = "PAYPALISHIRING", numRows = 3

**Approach 1**:

- Rows: ["", "", ""]
- Traversal:
  - P (row 0), A (row 1), Y (row 2) → direction up
  - P (row 1), A (row 0), L (row 1), I (row 2), S (row 1), H (row 0), I (row 1), R (row 2), etc.
- Final rows: ["PAHN", "APLSIIG", "YIR"]
- Output: "PAHNAPLSIIGYIR"

**Approach 2**:

- Cycle length: 4
- Row 0: 0, 4, 8, 12 → P, A, H, N
- Row 1: 1, 3, 5, 7, 9, 11, 13 → A, P, L, S, I, I, G
- Row 2: 2, 6, 10 → Y, I, R
- Output: "PAHNAPLSIIGYIR"

#### Example 2: s = "PAYPALISHIRING", numRows = 4

**Approach 1**:

- Rows: ["", "", "", ""]
- Traversal:
  - P (row 0), A (row 1), Y (row 2), P (row 3) → direction up
  - A (row 2), L (row 1), I (row 0), S (row 1), H (row 2), I (row 3), etc.
- Final rows: ["PIN", "ALSIG", "YAHR", "PI"]
- Output: "PINALSIGYAHRPI"

**Approach 2**:

- Cycle length: 6
- Row 0: 0, 6, 12 → P, I, N
- Row 1: 1, 5, 7, 11, 13 → A, L, S, I, G
- Row 2: 2, 4, 8, 10 → Y, A, H, R
- Row 3: 3, 9 → P, I
- Output: "PINALSIGYAHRPI"

#### Example 3: s = "A", numRows = 1

**Both Approaches**:

- Directly return "A" as no zigzag is possible.

### Edge Cases

- **Single Row**: Returns the string as-is.
- **String Length <= numRows**: The zigzag pattern is straightforward, often just vertical.
- **Empty String**: Returns an empty string.

Both approaches efficiently handle these cases with O(n) time and space complexity.
