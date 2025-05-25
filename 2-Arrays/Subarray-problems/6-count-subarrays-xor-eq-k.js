//https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1
// Given an array of integers arr[] and a number k, count the number of subarrays having XOR of their elements as k.

// Examples:
// Input: arr[] = [4, 2, 2, 6, 4], k = 6
// Output: 4
// Explanation: The subarrays having XOR of their elements as 6 are [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], and [6]. Hence, the answer is 4.

// Function to count subarrays with XOR equal to k using brute force
function countSubarraysBruteForce(arr, k) {
  const arrayLength = arr.length;
  let subarrayCount = 0;

  // Generate all possible subarrays using two nested loops
  for (let startIndex = 0; startIndex < arrayLength; startIndex++) {
    let currentXOR = 0;
    // Compute XOR for each subarray starting at startIndex
    for (let endIndex = startIndex; endIndex < arrayLength; endIndex++) {
      currentXOR ^= arr[endIndex];
      // If XOR equals k, increment the counter
      if (currentXOR === k) {
        subarrayCount++;
      }
    }
  }

  return subarrayCount;
}

// Example usage
const arrBrute = [4, 2, 2, 6, 4];
const targetXORBrute = 6;
console.log(
  "Brute Force Output:",
  countSubarraysBruteForce(arrBrute, targetXORBrute)
);

// Function to count subarrays with XOR equal to k using prefix XOR and HashMap
function countSubarraysWithHashMap(arr, k) {
  const arrayLength = arr.length;
  let subarrayCount = 0;
  let currentPrefixXOR = 0;

  // HashMap to store frequency of prefix XOR values
  const prefixXORFrequency = new Map();
  // Initialize with 0 XOR having frequency 1 (for cases where entire subarray XOR equals k)
  prefixXORFrequency.set(0, 1);

  // Iterate through the array
  for (let index = 0; index < arrayLength; index++) {
    // Compute prefix XOR up to current index
    currentPrefixXOR ^= arr[index];

    // If (currentPrefixXOR ^ k) exists in HashMap, add its frequency to count
    // Because currentPrefixXOR ^ somePreviousXOR = k implies a subarray with XOR k
    const requiredXOR = currentPrefixXOR ^ k;
    if (prefixXORFrequency.has(requiredXOR)) {
      subarrayCount += prefixXORFrequency.get(requiredXOR);
    }

    // Update the frequency of currentPrefixXOR in HashMap
    prefixXORFrequency.set(
      currentPrefixXOR,
      (prefixXORFrequency.get(currentPrefixXOR) || 0) + 1
    );
  }

  return subarrayCount;
}

// Example usage
const arrHashMap = [4, 2, 2, 6, 4];
const targetXORHashMap = 6;
console.log(
  "HashMap Output:",
  countSubarraysWithHashMap(arrHashMap, targetXORHashMap)
);
