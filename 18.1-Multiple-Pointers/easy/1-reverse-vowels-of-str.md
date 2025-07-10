### Problem Understanding

The problem requires us to reverse only the vowels in a given string while keeping all other characters in their original positions. Vowels are defined as 'a', 'e', 'i', 'o', 'u' and their uppercase counterparts.

### Intuition

To reverse the vowels in the string, we can follow these steps:

1. **Identify all vowels** in the string and store them in order.
2. **Reverse the stored vowels**.
3. **Reconstruct the string** by placing the reversed vowels back into their original positions, replacing the original vowels in reverse order.

### Approaches

1. **Two-pointer Approach**:

   - Use two pointers, one starting at the beginning (`left`) and one at the end (`right`) of the string.
   - Move the `left` pointer forward until a vowel is found.
   - Move the `right` pointer backward until a vowel is found.
   - Swap the vowels at `left` and `right`.
   - Continue until the pointers meet or cross each other.

2. **Collect and Replace Approach**:
   - Collect all the vowels from the string in order.
   - Reverse the collected vowels.
   - Iterate through the original string and replace each vowel with the next vowel from the reversed list.

### Solution Code

#### Approach 1: Two-pointer Approach

```javascript
function reverseVowels(s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  let left = 0;
  let right = s.length - 1;
  const arr = s.split(""); // Convert string to array for easy manipulation

  while (left < right) {
    // Move left pointer to the next vowel
    while (left < right && !vowels.has(arr[left])) {
      left++;
    }
    // Move right pointer to the previous vowel
    while (left < right && !vowels.has(arr[right])) {
      right--;
    }
    // Swap the vowels
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr.join("");
}
```

#### Approach 2: Collect and Replace Approach

```javascript
function reverseVowels(s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const vowelIndices = [];
  const vowelChars = [];

  // Collect vowels and their indices
  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i])) {
      vowelIndices.push(i);
      vowelChars.push(s[i]);
    }
  }

  // Reverse the vowel characters
  vowelChars.reverse();

  // Reconstruct the string with reversed vowels
  const arr = s.split("");
  for (let i = 0; i < vowelIndices.length; i++) {
    arr[vowelIndices[i]] = vowelChars[i];
  }

  return arr.join("");
}
```

### Time and Space Complexity Analysis

#### Two-pointer Approach

- **Time Complexity**: O(n), where n is the length of the string. Each character is checked at most twice (once by each pointer).
- **Space Complexity**: O(n), due to the conversion of the string to an array for manipulation. In some languages, strings are immutable, so this is necessary.

#### Collect and Replace Approach

- **Time Complexity**: O(n), where n is the length of the string. We iterate through the string twice (once to collect vowels and once to replace them) and reverse the vowels (O(k), where k is the number of vowels, which is at most n).
- **Space Complexity**: O(n), for storing the array and the list of vowels and their indices.

### Dry Run of Optimal Approach (Two-pointer)

#### Example 1: s = "IceCreAm"

1. Initial array: ['I', 'c', 'e', 'C', 'r', 'e', 'A', 'm']
2. left = 0 ('I' is a vowel), right = 7 ('m' is not), move right to 6 ('A' is a vowel)
3. Swap 'I' and 'A': ['A', 'c', 'e', 'C', 'r', 'e', 'I', 'm']
4. left = 1, right = 5
5. left moves to 2 ('e'), right moves to 5 ('e')
6. Swap 'e' and 'e': no change
7. left = 3, right = 4 (pointers cross, stop)
8. Final string: "AceCreIm"

#### Example 2: s = "leetcode"

1. Initial array: ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e']
2. left = 1 ('e'), right = 7 ('e')
3. Swap 'e' and 'e': no change
4. left = 2, right = 6
5. left = 2 ('e'), right = 5 ('o')
6. Swap 'e' and 'o': ['l', 'e', 'o', 't', 'c', 'e', 'd', 'e']
7. left = 3, right = 4 (pointers cross, stop)
8. Final string: "leotcede"

#### Example 3: s = "aA" (Edge case with different cases)

1. Initial array: ['a', 'A']
2. left = 0 ('a'), right = 1 ('A')
3. Swap 'a' and 'A': ['A', 'a']
4. left = 1, right = 0 (pointers cross, stop)
5. Final string: "Aa"

This approach efficiently handles all cases, including edge cases with no vowels, all vowels, and mixed cases.
