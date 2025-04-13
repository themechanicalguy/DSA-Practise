# Search in Rotated Sorted Array

## Pattern

Find a target or a specific property (e.g., minimum) in a sorted array that has been rotated at an unknown pivot.

## Key Insight

Identify which half is sorted by comparing the middle element to the endpoints, then determine which half could contain the target or property.

## Time Complexity

**O(log n)**

## Examples

1. **Search for a target** in a rotated sorted array (e.g., LeetCode: _Search in Rotated Sorted Array_).
2. **Find the minimum element** in a rotated sorted array (e.g., LeetCode: _Find Minimum in Rotated Sorted Array_).

## Conditions

- The array was originally sorted but rotated.
- No duplicates (or special handling for duplicates, as in LeetCode: _Search in Rotated Sorted Array II_).
