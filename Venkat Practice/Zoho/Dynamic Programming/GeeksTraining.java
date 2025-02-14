//{ Driver Code Starts
// Initial Template for Java

import java.io.*;
import java.lang.*;
import java.util.*;

class GFG {
    public static void main(String args[]) throws IOException {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int N = sc.nextInt();
            int[][] arr = new int[N][3];
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < 3; j++) {
                    arr[i][j] = sc.nextInt();
                }
            }
            Solution obj = new Solution();
            int res = obj.maximumPoints(arr);
            System.out.println(res);

            System.out.println("~");
        }
    }
}
// } Driver Code Ends


// User function Template for Java

class MemoizationGeeksTriaining {
    
    public int solve(int points[][], int day, int last, int dp[][]) {
        // index to go through each element
        // last position to know where the last ninja worked on
        if(dp[day][last] != -1) return dp[day][last];
        
        // base case
        if (day == 0) {
            int maxVal=0;
            for (int i=0; i<=2; i++) {
                if (i != last) {
                    maxVal = Math.max(points[0][i], maxVal);
                }
            }
            return dp[day][last] = maxVal;
        }
        
        int maxVal=0;
        for (int i=0;i<=2; i++) {
            if (i != last) {
                int val = points[day][i] + solve(points, day-1, i, dp);
                maxVal = Math.max(val, maxVal);
            }
        }
        return dp[day][last] = maxVal;
    }
    
    public int maximumPoints(int arr[][]) {
        // code here
        int dp[][] = new int[arr.length][4];
        for(int[]row : dp) {
            Arrays.fill(row, -1);
        }
            
        return solve(arr, arr.length-1, 3, dp);
    }
}

class SpaceOpGeeksTraining {
    public int maximumPoints(int arr[][]) {
        // code here
        int n = arr.length;
        int dp[][] = new int[n][4];
        
        dp[0][0] = Math.max(arr[0][1], arr[0][2]);
        dp[0][1] = Math.max(arr[0][0], arr[0][2]);
        dp[0][2] = Math.max(arr[0][0], arr[0][1]);
        dp[0][3] = Math.max(dp[0][0], dp[0][1]);
        
        for (int day=1; day<n; day++) {
            for (int last=0; last<4; last++) {
              dp[day][last] = 0;
              for (int task=0; task<=2; task++) {
                  if (task != last) {
                      int activity = arr[day][task] + dp[day-1][task];
                      dp[day][last] = Math.max(dp[day][last], activity);
                  }
              }
            }
        }
        
        return dp[n-1][3];
    }
}

class Solution {
    public int maximumPoints(int arr[][]) {
        // code here
        int n = arr.length;
        // int dp[][] = new int[n][4];
        int[] prev = new int[4];
        
        prev[0] = Math.max(arr[0][1], arr[0][2]);
        prev[1] = Math.max(arr[0][0], arr[0][2]);
        prev[2] = Math.max(arr[0][0], arr[0][1]);
        prev[3] = Math.max(prev[0], prev[1]);
        
        
        
        for (int day=1; day<n; day++) {
            int[] cur=new int[4];
            for (int last=0; last<4; last++) {
              cur[last] = 0;
              for (int task=0; task<=2; task++) {
                  if (task != last) {
                      int activity = arr[day][task] + prev[task];
                      cur[last] = Math.max(cur[last], activity);
                  }
              }
            }
            prev = cur;
        }
        
        return prev[3];
    }
}