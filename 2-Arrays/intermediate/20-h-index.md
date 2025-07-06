# 274. H-Index

Given an array of integers `citations` where `citations[i]` is the number of `citations` a researcher received for their ith paper, return the researcher's h-index.

According to the definition of `h-index` on Wikipedia: The `h-index` is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least h times.

**Example 1:**

- Input: citations = `[3,0,6,1,5]`
- Output: `3`
- Explanation: `[3,0,6,1,5]` means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
  Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.

**Example 2:**

- Input: citations = `[1,3,1]`
- Output: 1

### Understanding the H-Index

- The **h-index** is a metric that measures a researcher's productivity and citation impact.
- It is defined as the maximum value `h` such that the researcher has at least `h` papers, each with at least `h` citations.
- For example, an **h-index** of 3 means the researcher has at least 3 papers with at least 3 citations each, and the remaining papers have no more than 3 citations.

### Intuition

- The `H-Index` lies somewhere between `0` and the `number of papers` (n).
- If we sort the citations array, we can evaluate potential `H-Index` values by checking if there are at least `h` papers with citations greater than or equal to `h`.
- Alternatively, we can use the fact that the `H-Index` can be found by counting how many papers have citations greater than or equal to their position in a sorted array (in descending order).
- For optimization, we can use a counting sort or binary search approach to avoid full sorting for large arrays.

**Key Insight:**

- Sorting the array in descending order allows us to iterate and find the largest `h` where the number of papers with at least `h` citations is at least `h`.
- Alternatively, we can use a frequency-based approach (like counting sort) since citation values are non-negative integers, which can be more efficient for large datasets.

### Approaches

1. **Brute Force Approach**:

- For each possible h from `1 to N` (where N is the number of papers), count how many papers have at least `h` citations.
- The largest `h` for which this count is at least `h` is the h-index.

```javascript
/**
 * Calculate the h-index using brute force.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * @param {number[]} citations
 * @return {number}
 */
function hIndexBruteForce(citations) {
  const n = citations.length;
  for (let h = n; h >= 1; h--) {
    let count = 0;
    for (const citation of citations) {
      if (citation >= h) {
        count++;
      }
    }
    if (count >= h) {
      return h;
    }
  }
  return 0;
}
```

- **Time Complexity**: O(n^2) - For each h, we iterate through all citations.
- **Space Complexity**: O(1) - No additional space is used.

2. **Sorting Approach**:

- Sort the citations array in descending order.
- Iterate through the sorted array and find the largest index i where citations[i] >= i + 1 (since array indices start at 0).
- The h-index is the largest such i + 1.

```javascript
/**
 * Calculate the h-index by sorting the citations in descending order.
 * Time Complexity: O(n log n) due to sorting.
 * Space Complexity: O(1) if sorted in-place, O(n) if not.
 * @param {number[]} citations
 * @return {number}
 */
function hIndexSorting(citations) {
  citations.sort((a, b) => b - a); // Sort in descending order
  let h = 0;
  while (h < citations.length && citations[h] > h) {
    h++;
  }
  return h;
}
```

- **Time Complexity**: O(n log n) - Due to the sorting step.
- **Space Complexity**: O(1) or O(n) - Depending on whether the sort is in-place.

3. **Counting Sort Approach (Optimal for large N)**:

- Use a counting array to count the number of papers with each citation count.
- Modify the counting array to accumulate the number of papers with at least i citations.
- Find the largest h where the count of papers with at least h citations is >= h.

```javascript
/**
 * Calculates the H-Index using a counting sort approach.
 * @param {number[]} citations - Array of citation counts for each paper.
 * @return {number} - The H-Index of the researcher.
 */
function hIndexCountingSort(citations) {
  const numPapers = citations.length;
  // Create a count array, size limited to numPapers + 1 since h-index can't exceed numPapers
  const citationCounts = new Array(numPapers + 1).fill(0);

  // Count frequency of citations, capping at numPapers
  for (let citation of citations) {
    const index = Math.min(citation, numPapers); // Cap citations at numPapers
    citationCounts[index]++;
  }

  let hIndex = 0;
  let papersWithAtLeastH = 0;
  // Iterate from highest possible h to 0
  for (let h = numPapers; h >= 0; h--) {
    papersWithAtLeastH += citationCounts[h]; // Add papers with >= h citations
    if (papersWithAtLeastH >= h) {
      hIndex = h; // Found valid h-index
      break;
    }
  }

  return hIndex;
}
```

- **Time Complexity**: O(n) - We pass through the citations array twice.
- **Space Complexity**: O(n) - We use an additional array of size n+1.

### Dry Run of Optimal Approach (Counting Sort)

#### Example 1: citations = [3, 0, 6, 1, 5]

1. Initialize `numPapers` = 5, `citationCounts` array of size 6 (n=5) with zeros: [0, 0, 0, 0, 0, 0]
2. Update `citationCounts`:
   - citation=3 → citationCounts[3]++ → [0,0,0,1,0,0]
   - citation=0 → citationCounts[0]++ → [1,0,0,1,0,0]
   - citation=6 → citationCounts[5]++ → [1,0,0,1,0,1]
   - citation=1 → citationCounts[1]++ → [1,1,0,1,0,1]
   - citation=5 → citationCounts[5]++ → [1,1,0,1,0,2]
3. Iterate from h=5 to h=0:
   - h=5: total += citationCounts[5]=2 → total=2 → 2 >= 5? No
   - h=4: total += citationCounts[4]=0 → total=2 → 2 >= 4? No
   - h=3: total += citationCounts[3]=1 → total=3 → 3 >= 3? Yes → return 3

**Output:** 3

#### Example 2: citations = [1, 3, 1]

1. Initialize `count` array of size 4 (n=3) with zeros: [0,0,0,0]
2. Update `count`:
   - citation=1 → count[1]++ → [0,1,0,0]
   - citation=3 → count[3]++ → [0,1,0,1]
   - citation=1 → count[1]++ → [0,2,0,1]
3. Iterate from h=3 to h=0:
   - h=3: total += count[3]=1 → total=1 → 1 >= 3? No
   - h=2: total += count[2]=0 → total=1 → 1 >= 2? No
   - h=1: total += count[1]=2 → total=3 → 3 >= 1? Yes → return 1

**Output:** 1

#### Example 3: citations = [100] (Edge Case: Single Paper with High Citations)

1. Initialize `count` array of size 2 (n=1) with zeros: [0,0]
2. Update `count`:
   - citation=100 → count[1]++ → [0,1]
3. Iterate from h=1 to h=0:
   - h=1: total += count[1]=1 → total=1 → 1 >= 1? Yes → return 1

**Output:** 1
