# LC 78. Subsets

Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.
Example 1:
Input: nums = `[1,2,3]`
Output: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

### Problem Understanding

- The problem requires us to generate all possible subsets (also known as the power set) of a given array of unique integers.
- The power set includes all combinations of the elements, ranging from the empty set to the set containing all elements.
- The order of subsets in the result doesn't matter, and there should be no duplicate subsets.

### Intuition

1. The power set of a set is the collection of all possible subsets, including the empty set and the set itself.
2. For an array of n elements, there are 2^n subsets because each element can either be included or excluded from a subset (2 choices per element).
3. A recursive approach is natural here: for each element, we can decide to either include it in the current subset or exclude it, building all possible combinations.
4. By processing elements one by one, we can construct subsets incrementally, ensuring no duplicates since the input array contains unique elements.

### Approach: Recursive Backtracking

One effective way to generate all subsets is using recursive backtracking. The idea is to explore all possible combinations by recursively deciding at each step whether to include the current element or not. Here's how it works:

1. **Start with an empty subset**: Initially, the subset is empty.
2. **For each element in the array**:
   - **Include the current element** in the subset and recursively process the next elements.
   - **Exclude the current element** from the subset and recursively process the next elements.
3. **Base case**: When all elements have been processed, add the current subset to the result.

This approach ensures that all possible combinations are explored, and since the elements are unique, there will be no duplicate subsets.

### Solution Code

```javascript
/**
 * Generates all possible subsets (power set) of the given array.
 * @param {number[]} nums - Input array of unique integers
 * @return {number[][]} - Array containing all subsets
 */
var subsets = function (arr) {
  // Initialize ans to store all subsets
  let ans = [];
  // Initialize output as an empty array for the current subset
  let output = [];
  // Helper function to generate subsets recursively
  // @param {number[]} arr - Input array
  // @param {number[]} output - Current subset being built
  // @param {number} index - Current index in the input array
  // @param {number[][]} ans - Array to store all subsets
  function getSubsets(arr, output, index, ans) {
    // Base case: if index reaches or exceeds array length, add current subset to ans
    if (index >= arr.length) {
      ans.push([...output]); // Create a copy of output to avoid mutation
      return;
    }

    // Exclude call: skip the current element and recurse with the next index
    // Pass a new copy of output to avoid modifying the current subset
    getSubsets(arr, [...output], index + 1, ans);

    // Include call: add the current element to output and recurse with the next index
    // Pass a new copy of output with the current element included
    output.push(arr[index]);
    getSubsets(arr, [...output], index + 1, ans);
    // Note: No explicit backtracking (pop) is needed because we pass a new copy of output
  }

  // Start recursion from index 0
  getSubsets(arr, output, 0, ans);

  return ans;
};
```

### **Detailed Explanation of the Code**

#### **Function Signature**

- **Purpose**: The main function `subsets` takes an input array `arr` (aliased from `nums`) of unique integers and returns its power set (all possible subsets).
- **Parameters**:
  - `arr`: An array of unique integers for which subsets are to be generated.
- **Returns**: An array of arrays, where each inner array represents a subset of `arr`.

---

#### **Helper Function `getSubsets`**

- **Purpose**: A recursive helper function that generates subsets by including or excluding elements from `arr`.
- **Parameters**:
  - `arr`: The original input array (remains unchanged throughout recursion).
  - `output`: The current subset being constructed.
  - `index`: The current position in `arr` being processed.
  - `ans`: The result array that accumulates all subsets.

---

#### **Base Case**

```javascript
if (index >= arr.length) {
  ans.push([...output]);
  return;
}
```

- **Purpose**: When `index` reaches or exceeds the length of `arr`, it means all elements have been processed, and the current `output` represents a complete subset.
- **Action**:
  - A **copy** of `output` (`[...output]`) is pushed into `ans` to avoid mutation issues (since arrays are passed by reference in JavaScript).
  - The function returns to terminate the current recursive branch.

---

#### **Exclude Call**

```javascript
getSubsets(arr, [...output], index + 1, ans);
```

- **Purpose**: Explores the subset that **excludes** the current element at `arr[index]`.
- **Action**:
  - A **new copy** of `output` (`[...output]`) is passed to ensure immutability (the original `output` remains unchanged for the next recursive call).
  - The recursion proceeds to the next index (`index + 1`).

---

#### **Include Call**

```javascript
output.push(arr[index]);
getSubsets(arr, [...output], index + 1, ans);
```

- **Purpose**: Explores the subset that **includes** the current element at `arr[index]`.
- **Action**:
  - The current element (`arr[index]`) is added to `output`.
  - A **new copy** of the updated `output` (`[...output]`) is passed to the next recursive call.
  - The recursion proceeds to the next index (`index + 1`).

---

#### **Initialization**

```javascript
let ans = [];
let output = [];
getSubsets(arr, output, 0, ans);
```

- **Purpose**: Initializes the recursion.
- **Action**:
  - `ans`: An empty array to store all subsets.
  - `output`: An empty array to build subsets during recursion.
  - `getSubsets(arr, output, 0, ans)`: Starts the recursion from `index = 0`.

### **Key Observations**

1. **Immutability**:
   - By passing `[...output]` (a new copy) in each recursive call, we avoid modifying the original `output` array, eliminating the need for backtracking (`pop()`).
2. **Time Complexity**:

   - **O(2ⁿ)**: Each element has two choices (include/exclude), leading to 2ⁿ subsets for an array of size `n`.

3. **Space Complexity**:

   - **O(n)**: The recursion stack depth is `n` (the length of `arr`).
   - **O(2ⁿ)**: The total space required to store all subsets.

4. **Edge Cases**:
   - **Empty Input (`arr = []`)**: Returns `[[]]` (only the empty subset).
   - **Single Element (`arr = [0]`)**: Returns `[[], [0]]`.

---

### **Example Walkthrough**

#### **Input**: `[1, 2, 3]`

1. **Start**: `output = []`, `index = 0`.
2. **Exclude 1**:
   - Recurse with `output = []`, `index = 1`.
     - Exclude 2 → Recurse with `output = []`, `index = 2`.
       - Exclude 3 → `ans = [[]]`.
       - Include 3 → `ans = [[], [3]]`.
     - Include 2 → Recurse with `output = [2]`, `index = 2`.
       - Exclude 3 → `ans = [[], [3], [2]]`.
       - Include 3 → `ans = [[], [3], [2], [2, 3]]`.
3. **Include 1**:
   - `output = [1]`, `index = 1`.
     - Exclude 2 → Recurse with `output = [1]`, `index = 2`.
       - Exclude 3 → `ans = [[], [3], [2], [2, 3], [1]]`.
       - Include 3 → `ans = [[], [3], [2], [2, 3], [1], [1, 3]]`.
     - Include 2 → Recurse with `output = [1, 2]`, `index = 2`.
       - Exclude 3 → `ans = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2]]`.
       - Include 3 → `ans = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]`.
4. **Final Result**: `[[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]`.

### **Summary**

- **Recursive Backtracking**: Explores all subsets by including/excluding each element.
- **Immutability**: Uses `[...output]` to avoid mutation and backtracking.
- **Efficiency**: Generates all 2ⁿ subsets in O(2ⁿ) time and space.
- **Edge Cases**: Handles empty and single-element inputs correctly.

### Time and Space Complexity

- **Time Complexity**: \(O(2^n)\), where \(n\) is the number of elements in `nums`. This is because each element has two choices (include or exclude), leading to \(2^n\) total subsets.
- **Space Complexity**: \(O(n)\) for the recursion stack (maximum depth of recursion is \(n\)), and \(O(2^n)\) to store all subsets. Thus, the total space complexity is \(O(2^n)\).
