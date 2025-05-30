//https://www.geeksforgeeks.org/number-substrings-string/
// Find total number of non-empty substrings of a string with N characters.
// Input : str = “abc”
// Output : 6
// Every substring of the given string : “a”, “b”, “c”, “ab”, “bc”, “abc”
// Input : str = “abcd”
// Output : 10
// Every substring of the given string : “a”, “b”, “c”, “d”, “ab”, “bc”, “cd”, “abc”, “bcd” and “abcd”

//Intuition:
// Count of non-empty substrings is n*(n+1)/2
// If we include empty string also as substring, the count becomes n*(n+1)/2 + 1

// How does above formula work?
// Number of substrings of length one is n (We can choose any of the n characters)
// Number of substrings of length two is n-1 (We can choose any of the n-1 pairs formed by adjacent)
// Number of substrings of length three is n-2
// (We can choose any of the n-2 triplets formed by adjacent)
// In general, number of substrings of length k is n-k+1 where 1 <= k <= n

function countNonEmptySubstr(str) {
  let n = str.length;
  return (n * (n + 1)) / 2;
}

countNonEmptySubstr("abcd"); // 10

//generate all substrings of a string
function generateAllSubstrings(str) {
  let substrings = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.substring(i, j));
    }
  }
  return substrings;
}
console.log(generateAllSubstrings("abc")); // ["a", "ab", "abc", "b", "bc", "c"]
