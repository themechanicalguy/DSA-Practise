class Solution {

    public int solveMemoisation(String word1, String word2, int m, int n) {
        if (m==0) return n;
        if (n==0) return m;
        
        if (dp[m][n] != -1) return dp[m][n];

        if (word1.charAt(m-1) == word2.charAt(n-1)) {
            return dp[m][n] = solve (word1, word2, m-1, n-1, dp);
        }
        int minVal = solve(word1, word2, m-1, n, dp);
        minVal = Math.min(minVal, solve(word1, word2, m-1, n-1, dp));
        minVal = Math.min(minVal, solve(word1, word2, m, n-1, dp));
        return dp[m][n] = (1+minVal);
    }

    public int solveRecursive(String word1, String word2, int m, int n) {
        if (m==0) return n;
        if (n==0) return m;

        if (word1.charAt(m-1) == word2.charAt(n-1)) {
            return solveRecursive (word1, word2, m-1, n-1);
        }
        int minVal = solveRecursive(word1, word2, m-1, n);
        minVal = Math.min(minVal, solveRecursive(word1, word2, m-1, n-1));
        minVal = Math.min(minVal, solveRecursive(word1, word2, m, n-1));
        return 1+minVal;
    }

    public int minDistance(String word1, String word2) {
        // Recursive way of the call
        // return solveRecursive(word1, word2, word1.length(), word2.length());

        // Memoization way of call
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int[] row : dp)
        Arrays.fill(row, -1);
        return solveMemoisation(word1, word2, word1.length(), word2.length(), dp);
    }
}