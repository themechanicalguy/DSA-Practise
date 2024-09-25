//https://leetcode.com/problems/sum-of-prefix-scores-of-strings/description/
// 2416. Sum of Prefix Scores of Strings
// Difficulty level: Hard


class TreeNode {
    TreeNode[] children = new TreeNode[26];
    int count = 0;
}

class SumPrefixScores {
    public int[] sumPrefixScores(String[] words) {
        int[] ans = new int[words.length];
        for (String word: words) {
            insert(word);
        }

        for (int i=0; i<ans.length; i++) {
            ans[i] = getScore(words[i]);
        }

        return ans;
    }
    TreeNode root = new TreeNode();

    public void insert (String word) {
        TreeNode node = root;
        for (char ch: word.toCharArray()) {
            int i = ch - 'a';

            if (node.children[i] == null) node.children[i] = new TreeNode();
            node = node.children[i];
            node.count++;
        }
    }

    public int getScore (String word) {
        TreeNode node = root;
        int score = 0;
        for (char ch: word.toCharArray()) {
            int i = ch - 'a';
            node = node.children[i];
            score += node.count;
        }
        return score;
    }
}