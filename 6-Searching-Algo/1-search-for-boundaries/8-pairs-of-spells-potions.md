# 2300. Successful Pairs of Spells and Potions

### **Problem Understanding**

We are given two arrays:

- `spells`: Array of positive integers representing spell strengths.
- `potions`: Array of positive integers representing potion strengths.

We need to find, for each spell, how many potions can form a successful pair with it. A pair is successful if the product of the spell and potion strengths is at least `success`.

### **Intuition**

1. **Brute Force Approach**: For each spell, iterate through all potions and count how many potions satisfy `spell * potion >= success`. This approach is straightforward but inefficient for large arrays (O(n\*m) time complexity).
2. **Optimized Approach Using Sorting and Binary Search**:
   - Sort the `potions` array in ascending order.
   - For each spell, compute the minimum potion strength required to achieve `success`: `minPotion = ceil(success / spell)`.
   - Use binary search to find the first potion in the sorted array that is >= `minPotion`. All potions from this index to the end will satisfy the condition.
   - The count of successful potions is `m - index`, where `m` is the length of `potions`.

### **Approaches**

#### **1. Brute Force Approach**

- **Time Complexity**: O(n \* m), where n is the length of `spells` and m is the length of `potions`.
- **Space Complexity**: O(1) (excluding the output array).

```javascript
/**
 * Brute force approach: For each spell, check all potions.
 * @param {number[]} spells - Array of spell strengths.
 * @param {number[]} potions - Array of potion strengths.
 * @param {number} success - Threshold for a successful pair.
 * @return {number[]} - Array where each element represents the count of successful potions for the corresponding spell.
 */
function successfulPairsBruteForce(spells, potions, success) {
  const n = spells.length; // Number of spells
  const m = potions.length; // Number of potions
  const pairs = new Array(n).fill(0); // Initialize result array with zeros

  for (let i = 0; i < n; i++) {
    // Iterate over each spell
    const spell = spells[i]; // Current spell strength
    let count = 0; // Counter for successful potions

    for (let j = 0; j < m; j++) {
      // Iterate over each potion
      if (spell * potions[j] >= success) {
        // Check if product meets success threshold
        count++; // Increment count if successful
      }
    }

    pairs[i] = count; // Store the count for the current spell
  }

  return pairs; // Return the result array
}
```

#### **2. Optimized Approach (Sorting + Binary Search)**

- **Time Complexity**: O(m log m + n log m), where m is the length of `potions` (for sorting) and n is the length of `spells` (for binary search for each spell).
- **Space Complexity**: O(log m) (for sorting, due to recursion stack in the sorting algorithm).

```javascript
/**
 * Optimized approach: Sort potions and use binary search for each spell.
 * @param {number[]} spells - Array of spell strengths.
 * @param {number[]} potions - Array of potion strengths.
 * @param {number} success - Threshold for a successful pair.
 * @return {number[]} - Array where each element represents the count of successful potions for the corresponding spell.
 */
function successfulPairs(spells, potions, success) {
  const n = spells.length; // Number of spells
  const m = potions.length; // Number of potions
  const pairs = new Array(n).fill(0); // Initialize result array with zeros

  potions.sort((a, b) => a - b); // Sort potions in ascending order

  for (let i = 0; i < n; i++) {
    // Iterate over each spell
    const spell = spells[i]; // Current spell strength
    // Calculate the minimum potion strength needed for success
    const minPotion = Math.ceil(success / spell);

    // Binary search to find the first potion >= minPotion
    let left = 0; // Start of search range
    let right = m - 1; // End of search range
    let firstSuccessfulIndex = m; // Default to m (no successful potions)

    while (left <= right) {
      // Binary search loop
      const mid = Math.floor((left + right) / 2); // Midpoint
      if (potions[mid] >= minPotion) {
        // If mid potion is sufficient
        firstSuccessfulIndex = mid; // Update first successful index
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }

    // Number of successful potions is total potions - first successful index
    pairs[i] = m - firstSuccessfulIndex;
  }

  return pairs; // Return the result array
}
```

### **Dry Run of Optimal Approach**

#### **Example 1:**

- `spells = [5, 1, 3]`, `potions = [1, 2, 3, 4, 5]`, `success = 7`

1. Sort `potions`: Already sorted `[1, 2, 3, 4, 5]`.
2. For `spell = 5`:
   - `minPotion = ceil(7 / 5) = 2`.
   - Binary search for first `potion >= 2`: index `1` (value `2`).
   - Successful potions: `5 - 1 = 4` (`[2, 3, 4, 5]`).
3. For `spell = 1`:
   - `minPotion = ceil(7 / 1) = 7`.
   - Binary search for first `potion >= 7`: index `5` (no such potion).
   - Successful potions: `5 - 5 = 0`.
4. For `spell = 3`:
   - `minPotion = ceil(7 / 3) = 3`.
   - Binary search for first `potion >= 3`: index `2` (value `3`).
   - Successful potions: `5 - 2 = 3` (`[3, 4, 5]`).

- **Output**: `[4, 0, 3]`.

#### **Example 2:**

- `spells = [3, 1, 2]`, `potions = [8, 5, 8]`, `success = 16`

1. Sort `potions`: `[5, 8, 8]`.
2. For `spell = 3`:
   - `minPotion = ceil(16 / 3) = 6`.
   - Binary search for first `potion >= 6`: index `1` (value `8`).
   - Successful potions: `3 - 1 = 2` (`[8, 8]`).
3. For `spell = 1`:
   - `minPotion = ceil(16 / 1) = 16`.
   - Binary search for first `potion >= 16`: index `3` (no such potion).
   - Successful potions: `3 - 3 = 0`.
4. For `spell = 2`:
   - `minPotion = ceil(16 / 2) = 8`.
   - Binary search for first `potion >= 8`: index `1` (value `8`).
   - Successful potions: `3 - 1 = 2` (`[8, 8]`).

- **Output**: `[2, 0, 2]`.

#### **Example 3 (Edge Case - All Successful):**

- `spells = [10]`, `potions = [1, 1, 1]`, `success = 5`

1. Sort `potions`: `[1, 1, 1]`.
2. For `spell = 10`:
   - `minPotion = ceil(5 / 10) = 1`.
   - Binary search for first `potion >= 1`: index `0` (value `1`).
   - Successful potions: `3 - 0 = 3` (`[1, 1, 1]`).

- **Output**: `[3]`.

#### **Example 4 (Edge Case - None Successful):**

- `spells = [2]`, `potions = [1, 2, 3]`, `success = 10`

1. Sort `potions`: `[1, 2, 3]`.
2. For `spell = 2`:
   - `minPotion = ceil(10 / 2) = 5`.
   - Binary search for first `potion >= 5`: index `3` (no such potion).
   - Successful potions: `3 - 3 = 0`.

- **Output**: `[0]`.

### **Conclusion**

- The **brute force** approach is simple but inefficient for large inputs.
- The **optimized approach** using sorting and binary search significantly reduces the time complexity and is suitable for large inputs.
- The optimal approach leverages the fact that sorting allows us to use binary search, which is much faster than linear search for each spell.
