# Boyer-Moore Voting Algorithm Explained

The Boyer-Moore Voting Algorithm is an efficient algorithm to find the majority element in a sequence, where the majority element is defined as an element that appears more than `⌊n/2⌋` times (where `n` is the size of the sequence).

## How the Algorithm Works

The algorithm works on the principle that if you cancel out each occurrence of the majority element with all the other elements, the majority element will still remain at the end.

The intuition is based on a `voting` or `pairing` concept:

- Imagine each element in the array as a vote. The majority element has more votes than all other elements combined, because it appears more than `⌊n/2⌋` times.
- The algorithm maintains a single candidate and a count of “votes” for that candidate.
- As we traverse the array:
  - If we see the `current` candidate, we `increment` the vote `count` (reinforcing the candidate).
  - If we see a different element, we `decrement` the vote `count` (as if the non-candidate cancels out a vote for the candidate).
  - If the `count` reaches `zero`, we pick a new candidate from the current element and reset the `count` to `1`.
- At the end, the `candidate` is the majority element because the majority element’s frequency ensures it “survives” the cancellation process.

## Why It Works

The algorithm essentially pairs each majority element with a non-majority element and cancels them out. Since there are more majority elements than all other elements combined, at least one majority element will remain uncanceled.

- Since the majority element appears more than `⌊n/2⌋` times, it has more occurrences than all other elements combined.
- When we pair a majority element with a non-majority element (by decrementing the count), the majority element’s occurrences will still remain after all non-majority elements are “canceled out.”
- Even if we temporarily switch candidates when the count reaches zero, the majority element’s dominance ensures it will eventually become the candidate again and maintain a positive count by the end.

## Key Properties

- **Single Pass:** The algorithm requires only one traversal of the array, making it `O(n)` in time complexity.
- **Constant Space:** It uses only two variables (candidate and count), achieving `O(1)` space complexity.
- **Guarantee-Based:** The problem guarantees a majority element exists, so we don’t need a second pass to verify the candidate (though in variations where no majority is guaranteed, a verification step would be needed).

### Algorithm Steps:

1. **Initialize**:

   - `candidate`: Stores the current potential majority element
   - `count`: Tracks the net advantage of the candidate over other elements

2. **Iterate through the array**:

   - If `count` is 0, we choose the current element as the new `candidate`
   - If the current element is the same as `candidate`, increment `count`
   - Otherwise, decrement `count`

3. **Final result**:
   - The `candidate` at the end is guaranteed to be the majority element (given that a majority exists)

## JavaScript Implementation

```javascript
function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  // Verification step (not needed per problem statement)
  // But good practice when majority isn't guaranteed
  count = 0;
  for (const num of nums) {
    if (num === candidate) count++;
  }

  return count > nums.length / 2 ? candidate : -1;
}

// Test cases
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(majorityElement([1])); // 1
console.log(majorityElement([4, 4, 4])); // 4
console.log(majorityElement([1, 3, 1, 3, 1, 2, 1])); // 1
```

## Dry Run with 5 Examples

### Example 1: Simple Case [3, 2, 3]

```
Index: 0: 3
  count=0 → candidate=3, count=1
Index: 1: 2
  2≠3 → count=0
Index: 2: 3
  count=0 → candidate=3, count=1
Final candidate: 3
```

### Example 2: Longer Sequence [2, 2, 1, 1, 1, 2, 2]

```
Index: 0: 2
  count=0 → candidate=2, count=1
Index: 1: 2
  2=2 → count=2
Index: 2: 1
  1≠2 → count=1
Index: 3: 1
  1≠2 → count=0
Index: 4: 1
  count=0 → candidate=1, count=1
Index: 5: 2
  2≠1 → count=0
Index: 6: 2
  count=0 → candidate=2, count=1
Final candidate: 2
```

### Example 3: Single Element [1]

```
Index: 0: 1
  count=0 → candidate=1, count=1
Final candidate: 1
```

### Example 4: All Same Elements [4, 4, 4]

```
Index: 0: 4
  count=0 → candidate=4, count=1
Index: 1: 4
  4=4 → count=2
Index: 2: 4
  4=4 → count=3
Final candidate: 4
```

### Example 5: Complex Case [1, 3, 1, 3, 1, 2, 1]

```
Index: 0: 1
  count=0 → candidate=1, count=1
Index: 1: 3
  3≠1 → count=0
Index: 2: 1
  count=0 → candidate=1, count=1
Index: 3: 3
  3≠1 → count=0
Index: 4: 1
  count=0 → candidate=1, count=1
Index: 5: 2
  2≠1 → count=0
Index: 6: 1
  count=0 → candidate=1, count=1
Final candidate: 1
```

## Edge Cases Covered

1. **Single element array**: Works correctly
2. **All elements same**: Correctly identifies the majority
3. **Majority at beginning and end**: Handles changes in candidate
4. **Alternating elements**: Correctly finds the more frequent one
5. **Odd and even lengths**: Works for both cases

## Time and Space Complexity

- **Time Complexity**: O(n) - We only pass through the array once
- **Space Complexity**: O(1) - We only use two variables regardless of input size

The Boyer-Moore algorithm is particularly elegant for this problem because it finds the solution in linear time with constant space, making it the optimal solution when a majority element is guaranteed to exist.
