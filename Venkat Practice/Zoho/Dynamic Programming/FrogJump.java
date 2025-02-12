// https://www.naukri.com/code360/problems/frog-jump_3621012?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf&leftPanelTabValue=SUBMISSION

import java.util.* ;
import java.io.*; 
public class Solution {
    public static int frogJump(int n, int heights[]) {
        return solve(n-1, heights);
    }

    public static int solve(int n, int heights[]) {
        int firstJump, secondJump=0;
        // Write your code here..
        if (n == 0) return 0;
        firstJump = Math.abs(heights[n] - heights[n-1]) + solve(n-1, heights);
        if (n > 1) {
            secondJump = Math.abs(heights[n] - heights[n-2]) + solve(n-2, heights);
        } else secondJump = Integer.MAX_VALUE;

        return Math.min(firstJump, secondJump);
    }

}


// Memoization
public class MemoizationSolution {
    public static int frogJump(int n, int heights[]) {
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return solve(n-1, heights, dp);
    }

    public static int solve(int n, int heights[], int dp[]) {
        int firstJump, secondJump=Integer.MAX_VALUE;
        // Write your code here..
        if (n == 0) return 0;
        if (dp[n] != -1) return dp[n];

        firstJump = Math.abs(heights[n] - heights[n-1]) + solve(n-1, heights, dp);
        
        if (n > 1) {
            secondJump = Math.abs(heights[n] - heights[n-2]) + solve(n-2, heights, dp);
        }

        return dp[n] = Math.min(firstJump, secondJump);
    }

}

// Tabulation
public class TabulationSolution {
    public static int frogJump(int n, int heights[]) {
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int i= 1; i<n; i++) {
            int secondJump=Integer.MAX_VALUE;
            int firstJump = Math.abs(heights[i] - heights[i-1]) + dp[i-1];
            
            if (i > 1) {
                secondJump = Math.abs(heights[i] - heights[i-2]) + dp[i-2];
            }
            dp[i] = Math.min(firstJump, secondJump);
        }
        return dp[n-1];
    }
}

// Space Optimization