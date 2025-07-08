# LC 1636. Sort Array by Increasing Frequency

### Problem Understanding

The problem requires us to sort an array of integers based on the frequency of each value. The sorting should be in increasing order of frequency. If multiple values have the same frequency, they should be sorted in decreasing order of their values.

### Intuition

1. **Frequency Counting**: First, we need to count how many times each number appears in the array. This can be done using a hash map (or an object in JavaScript) where keys are the numbers and values are their frequencies.
2. **Custom Sorting**: Once we have the frequencies, we can sort the array based on the frequencies. If two numbers have the same frequency, we sort them in descending order of their values; otherwise, we sort them in ascending order of their frequencies.

### Approaches

1. **Frequency Map and Custom Sort**:
   - Create a frequency map to count occurrences of each number.
   - Sort the array based on the frequency of each number. If frequencies are the same, sort by the number itself in descending order.

### Solution Code

```javascript
/**
 * Sorts the array based on frequency of values. If frequencies are same, sorts by value in descending order.
 * @param {number[]} nums - The input array of integers.
 * @return {number[]} - The sorted array.
 */
function frequencySort(nums) {
  // Create a frequency map to count occurrences of each number
  const frequencyMap = {};
  for (const num of nums) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  }

  // Custom sort based on frequency and value
  nums.sort((a, b) => {
    if (frequencyMap[a] !== frequencyMap[b]) {
      return frequencyMap[a] - frequencyMap[b]; // Sort by frequency in ascending order
    } else {
      return b - a; // If frequencies are same, sort by value in descending order
    }
  });

  return nums;
}

// Example usage:
console.log(frequencySort([1, 1, 2, 2, 2, 3])); // Output: [3, 1, 1, 2, 2, 2]
console.log(frequencySort([2, 3, 1, 3, 2])); // Output: [1, 3, 3, 2, 2]
console.log(frequencySort([-1, 1, -6, 4, 5, -6, 1, 4, 1])); // Output: [5, -1, 4, 4, -6, -6, 1, 1, 1]
```

### Explanation

1. **Frequency Map Creation**: We iterate through the array and populate an object (`frequencyMap`) where each key is a number from the array and the corresponding value is its frequency (count of occurrences).
2. **Custom Sorting**: The array is sorted using a custom comparator function. The comparator first checks the frequencies of the two elements. If the frequencies are different, it sorts them in ascending order of frequency. If the frequencies are the same, it sorts the elements in descending order of their values.
3. **Return Sorted Array**: The sorted array is returned as the result.

### Time and Space Complexity Analysis

- **Time Complexity**:
  - **Frequency Map Creation**: O(n), where n is the number of elements in the array, as we traverse the array once.
  - **Sorting**: O(n log n), as the sort operation in JavaScript is typically O(n log n).
  - **Overall Time Complexity**: O(n log n), dominated by the sorting step.
- **Space Complexity**:
  - **Frequency Map**: O(n), in the worst case where all elements are unique, we store all elements in the map.
  - **Overall Space Complexity**: O(n), due to the storage required for the frequency map.

### Dry Run with Examples

**Example 1:**
Input: `[1,1,2,2,2,3]`

- Frequency Map: `{1: 2, 2: 3, 3: 1}`
- Sort:
  - Compare 1 and 1: same frequency, no change.
  - Compare 3 (freq 1) and 1 (freq 2): 3 comes first.
  - Compare 2 (freq 3) and others: 2 comes last.
- Sorted Array: `[3, 1, 1, 2, 2, 2]`

**Example 2:**
Input: `[2,3,1,3,2]`

- Frequency Map: `{2: 2, 3: 2, 1: 1}`
- Sort:
  - 1 has frequency 1, comes first.
  - 3 and 2 both have frequency 2: sort in descending order (3, 2).
- Sorted Array: `[1, 3, 3, 2, 2]`

**Example 3:**
Input: `[-1,1,-6,4,5,-6,1,4,1]`

- Frequency Map: `{-1: 1, 1: 3, -6: 2, 4: 2, 5: 1}`
- Sort:
  - 5 and -1 have frequency 1: sort in descending order (5, -1).
  - -6 and 4 have frequency 2: sort in descending order (4, -6).
  - 1 has frequency 3: comes last.
- Sorted Array: `[5, -1, 4, 4, -6, -6, 1, 1, 1]`

This approach efficiently handles the sorting based on the given criteria, ensuring optimal performance and correctness.
