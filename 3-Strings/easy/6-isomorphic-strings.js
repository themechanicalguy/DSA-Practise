//LC 205 Isomorphic Strings
// Given two strings s and t, determine if they are isomorphic.
// Two strings s and t are isomorphic if the characters in s can be replaced to get t.
// All occurrences of a character must be replaced with another character while preserving the order of characters.
// No two characters may map to the same character, but a character may map to itself.

//Approach 1: Using Single Loop with Object (Alternative to Hash Maps)
/**
 * Checks if two strings are isomorphic using two plain objects.
 * @param {string} s - The first string
 * @param {string} t - The second string
 * @return {boolean} - True if isomorphic, false otherwise
 */
function isIsomorphicObject(s, t) {
  if (s.length !== t.length) return false;

  const map1 = {}; // s to t mapping
  const map2 = {}; // t to s mapping

  for (let i = 0; i < s.length; i++) {
    const char1 = s[i];
    const char2 = t[i];

    if (!map1[char1] && !map2[char2]) {
      // If both characters are not mapped, create a new mapping
      map1[char1] = char2;
      map2[char2] = char1;
    } else if (map1[char1] !== char2) {
      // If char1 exists in map1 but doesn't map to char2
      return false;
    } else if (map2[char2] !== char1) {
      // If char2 exists in map2 but doesn't map to char1
      return false;
    }
  }

  return true;
}

// Time Complexity: O(n) - Single pass through the strings
// Space Complexity: O(1) - Objects store at most the number of unique characters

//Approach 2: Using Index Comparison (No Hash Maps)
/**
 * Checks if two strings are isomorphic by comparing character indices.
 * @param {string} s - The first string
 * @param {string} t - The second string
 * @return {boolean} - True if isomorphic, false otherwise
 */
function isIsomorphicIndexComparison(s, t) {
  if (s.length !== t.length) return false;

  // For each character, check if the first occurrence indices match
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false;
    }
  }

  return true;
}

// Time Complexity: O(n^2) - indexOf is O(n) and we call it n times
// Space Complexity: O(1) - No additional space used

//Approach 3: Using Two Hash Maps
/**
 * Checks if two strings are isomorphic using two hash maps.
 * @param {string} s - The first string
 * @param {string} t - The second string
 * @return {boolean} - True if isomorphic, false otherwise
 */
function isIsomorphicHashMap(s, t) {
  // If lengths are different, they can't be isomorphic
  if (s.length !== t.length) return false;

  // Create two maps to store character mappings
  const sTot = new Map(); // Maps characters from s to t
  const tTos = new Map(); // Maps characters from t to s

  for (let i = 0; i < s.length; i++) {
    const char1 = s[i];
    const char2 = t[i];

    // Check if char1 is already mapped to a different char2
    if (sTot.has(char1)) {
      if (sTot.get(char1) !== char2) {
        return false;
      }
    } else {
      // Check if char2 is already mapped to a different char1
      if (tTos.has(char2)) {
        return false;
      }
      // Create new mapping in both directions
      sTot.set(char1, char2);
      tTos.set(char2, char1);
    }
  }

  return true;
}

// Time Complexity: O(n) - We iterate through the strings once
// Space Complexity: O(1) - Maps store at most the number of unique characters (fixed size for ASCII)
