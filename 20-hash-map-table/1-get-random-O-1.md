# LC 380. Insert Delete GetRandom O(1)

## Problem Understanding

We need to design a data structure that supports insertion, removal, and random element retrieval in average O(1) time complexity. The challenge is maintaining constant time operations for all three functions simultaneously.

## Intuition

Intuition for Optimal Approach

## Hash Map:

- Stores `value -> index` mappings, allowing `O(1)` lookup to check if a value exists (for insert and remove) and to find its index in the array.
- **Array:** Stores values in order, enabling `O(1)` access for _getRandom_ by picking a random index. The array also maintains contiguity for uniform random selection.
- **Remove Trick:** To achieve `O(1)` removal, swap the element to be removed with the last element in the array, update the last element’s index in the hash map, and pop the last element. This avoids shifting elements, which would be `O(n)`.

## Approaches

### Approach 1: Using Object and Array (Optimal)

```javascript
class RandomizedSet {
  constructor() {
    // Hash map to store value-to-index mappings
    this.valueToIndex = new Map();
    // Array to store values for random access
    this.values = [];
  }

  /**
   * Inserts a value into the set if not present.
   * @param {number} val - The value to insert
   * @returns {boolean} - True if inserted, false if already present
   */
  insert(val) {
    // If value exists, return false
    if (this.valueToIndex.has(val)) {
      return false;
    }
    // Add value to array and store its index in map
    this.valueToIndex.set(val, this.values.length);
    this.values.push(val);
    return true;
  }

  /**
   * Removes a value from the set if present.
   * @param {number} val - The value to remove
   * @returns {boolean} - True if removed, false if not present
   */
  remove(val) {
    // If value doesn't exist, return false
    if (!this.valueToIndex.has(val)) {
      return false;
    }
    // Get index of value to remove
    const index = this.valueToIndex.get(val);
    // Get last value in array
    const lastValue = this.values[this.values.length - 1];
    // Move last value to the index of the value to remove
    this.values[index] = lastValue;
    // Update last value's index in map
    this.valueToIndex.set(lastValue, index);
    // Remove the value from map and pop last element from array
    this.valueToIndex.delete(val);
    this.values.pop();
    return true;
  }

  /**
   * Returns a random element from the set.
   * @returns {number} - A random element
   */
  getRandom() {
    // Generate random index between 0 and array length - 1
    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex];
  }
}
```

## Complexity Analysis

- **Time Complexity**:

Insert: `O(1)` average (hash map set and array push are `O(1)`).
Remove: `O(1)` average (hash map get/delete and array pop are `O(1)`; swapping is `O(1)`).
GetRandom: `O(1)` (array access by random index is `O(1)`).

- **Space Complexity**: O(n), where n is the number of elements (stored in both the hash map and array).
