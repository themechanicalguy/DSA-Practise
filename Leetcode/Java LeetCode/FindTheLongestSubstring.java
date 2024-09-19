// 1371. Find the Longest Substring Containing Vowels in Even Counts


class FindTheLongestSubstring {
    public int findTheLongestSubstring(String s) {
        String vowels = "aeiou";

        Map<Integer, Integer> prefixToIndex = new HashMap<>();
        prefixToIndex.put(0, -1);
        int prefix = 0;
        int ans = 0;
        for (int i=0;i<s.length(); i++) {
            int curVowelPosition = vowels.indexOf(s.charAt(i));
            if (curVowelPosition != -1) {
                prefix ^= 1 << curVowelPosition;
                prefixToIndex.putIfAbsent(prefix, i);
            }
            ans = Math.max(ans, i-prefixToIndex.get(prefix));
        }
        return ans;
    }
}
