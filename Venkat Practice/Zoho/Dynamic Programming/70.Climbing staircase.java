// Recursion
class Recursion {
    public int climbStairs(int n, int[] dp) {
        if (n == 0 || n == 1) return 1;

        return climbStairs(n-1) + climbStairs(n-2);
    }
    public int climbStairs(int n) {
        return climbStairs(n, dp);
    }
}

// Memoization
class Memoization {
    public int climbStairs(int n, int[] dp) {
        if (n == 0 || n == 1) return 1;
        if (dp[n] != -1) return dp[n];

        return dp[n] = climbStairs(n-1) + climbStairs(n-2);
    }
    public int climbStairs(int n) {
        int[] dp = new int[n+1];
        Arrays.fill(dp, -1);
        return climbStairs(n, dp);
    }
}

//TAbulation
class Tabulation {
    public int climbStairs(int n) {
        int[] dp = new int[n+1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i=2; i<=n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
}

// Space Optimization
class SpaceOptimization {
    public int climbStairs(int n) {
        // int[] dp = new int[n+1];
        int prev2 = 1;
        int prev = 1;
        for (int i=2; i<=n; i++) {
            int cur = prev+prev2;
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }
}