//LC - 2588 Count the Number of Beautiful Subarrays

//Brute Force
// Function to count subarrays with XOR equal to 0 (beautiful subarrays) using brute force
function countBeautifulSubarraysBruteForce(arr) {
  const arrayLength = arr.length;
  let beautifulCount = 0;

  // Generate all possible subarrays using two nested loops
  for (let startIndex = 0; startIndex < arrayLength; startIndex++) {
    let currentXOR = 0;
    // Compute XOR for each subarray starting at startIndex
    for (let endIndex = startIndex; endIndex < arrayLength; endIndex++) {
      currentXOR ^= arr[endIndex];
      // If XOR equals 0, it's a beautiful subarray
      if (currentXOR === 0) {
        beautifulCount++;
      }
    }
  }

  return beautifulCount;
}

// Example usage
const arrBrute = [4, 2, 2, 6, 4];
console.log("Brute Force Output:", countBeautifulSubarraysBruteForce(arrBrute));

// 2. Optimized Approach Using Prefix XOR and HashMap
// Function to count subarrays with XOR equal to 0 using prefix XOR and HashMap
function countBeautifulSubarraysWithHashMap(arr) {
  const arrayLength = arr.length;
  let beautifulCount = 0;
  let currentPrefixXOR = 0;

  // HashMap to store frequency of prefix XOR values
  const prefixXORFrequency = new Map();
  // Initialize with 0 XOR having frequency 1 (for cases where entire subarray XOR equals 0)
  prefixXORFrequency.set(0, 1);

  // Iterate through the array
  for (let index = 0; index < arrayLength; index++) {
    // Compute prefix XOR up to current index
    currentPrefixXOR ^= arr[index];

    // If currentPrefixXOR exists in HashMap, add its frequency to count
    // Because currentPrefixXOR ^ previousXOR = 0 implies a subarray with XOR 0
    if (prefixXORFrequency.has(currentPrefixXOR)) {
      beautifulCount += prefixXORFrequency.get(currentPrefixXOR);
    }

    // Update the frequency of currentPrefixXOR in HashMap
    prefixXORFrequency.set(
      currentPrefixXOR,
      (prefixXORFrequency.get(currentPrefixXOR) || 0) + 1
    );
  }

  return beautifulCount;
}

// Example usage
const arrHashMap = [4, 2, 2, 6, 4];
console.log("HashMap Output:", countBeautifulSubarraysWithHashMap(arrHashMap));

//3. Variation Using Cumulative XOR (Simplified HashMap)

// Function to count subarrays with XOR equal to 0 using cumulative XOR
function countBeautifulSubarraysCumulativeXOR(arr) {
  let beautifulCount = 0;
  let cumulativeXOR = 0;
  // Map to store the frequency of cumulative XOR values
  const xorFrequencyMap = new Map();
  xorFrequencyMap.set(0, 1); // Initialize for subarrays starting from index 0

  // Iterate through the array
  for (let num of arr) {
    // Compute cumulative XOR
    cumulativeXOR ^= num;

    // If cumulativeXOR exists in Map, add its frequency to count
    if (xorFrequencyMap.has(cumulativeXOR)) {
      beautifulCount += xorFrequencyMap.get(cumulativeXOR);
    }

    // Update frequency of current cumulative XOR
    xorFrequencyMap.set(
      cumulativeXOR,
      (xorFrequencyMap.get(cumulativeXOR) || 0) + 1
    );
  }

  return beautifulCount;
}

// Example usage
const arrCumulative = [4, 2, 2, 6, 4];
console.log(
  "Cumulative XOR Output:",
  countBeautifulSubarraysCumulativeXOR(arrCumulative)
);
