// https://leetcode.com/problems/uncommon-words-from-two-sentences/submissions/1393548708/

class UnCommonFromSentences {
    public String[] uncommonFromSentences(String s1, String s2) {
        String[] str = (s1 + " "+ s2).split(" ");
        Map<String, Integer> map = new HashMap();
        ArrayList<String> ans = new ArrayList();

        for (final String s : str) {
            map.merge(s, 1, Integer::sum);
        }

        for (final String w: map.keySet()) {
            if (map.get(w) == 1) ans.add(w);
        }

        return ans.toArray(new String[0]);
    }
}