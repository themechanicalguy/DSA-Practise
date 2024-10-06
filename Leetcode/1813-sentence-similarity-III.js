// 1813. Sentence Similarity III
// URL: https://leetcode.com/problems/sentence-similarity-iii/?envType=daily-question&envId=2024-10-06
// Diff: Medium

/**
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */
var areSentencesSimilar = function(sentence1, sentence2) {
    let pref = 0, suf = sentence1.length - 1;
    const diff = sentence1.length - sentence2.length;

    while (sentence1[pref] && sentence1[pref] == sentence2[pref]) pref++;
    while (sentence1[pref] && sentence1[pref] !== " ") pref--;
    while (sentence2[pref] && sentence2[pref] !== " ") pref--;
    while (sentence1[suf] && sentence1[suf] == sentence2[suf-diff]) suf--;
    while (sentence1[suf] && sentence1[suf] !== " ") suf++;
    while (sentence2[suf-diff] && sentence2[suf-diff] !== " ") suf++;

    if (pref >= suf-diff || pref >= suf) {
        return true;
    }

    return false;
};

// Best solution: 
/*
class Solution {
    public boolean areSentencesSimilar(String sentence1, String sentence2) {
      if (sentence1.length() == sentence2.length())
        return sentence1.equals(sentence2);
  
      String[] words1 = sentence1.split(" ");
      String[] words2 = sentence2.split(" ");
      final int m = words1.length;
      final int n = words2.length;
      if (m > n)
        return areSentencesSimilar(sentence2, sentence1);
  
      int i = 0; // words1's index
      while (i < m && words1[i].equals(words2[i]))
        ++i;
      while (i < m && words1[i].equals(words2[i + n - m]))
        ++i;
  
      return i == m;
    }
  }
*/