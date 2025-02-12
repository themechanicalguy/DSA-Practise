// JavaScript program for Painting
// Fence using recursion

// Returns count of ways to color k posts
// Recursion Solution
function countWays(n, k) {
    
    // base cases
    if (n === 1) return k;
    if (n === 2) return k * k;
    
    // Ways in which last fence 
    // is of different color.
    let cnt1 = countWays(n - 1, k) * (k - 1);
    
    // Ways in which last 2 fences
    // are of same color.
    let cnt2 = countWays(n - 2, k) * (k - 1);
    
    return cnt1 + cnt2;
}

// Memoization
function countWaysMemo(n, k) {
    
    const dp = new Array(n).fill(-1);
    const _countWays = (n, k, dp) => {
        if (n === 1) return k;
        if (n === 2) return k * k;
        if (dp[n] != -1) return dp[n];
        // Ways in which last fence 
        // is of different color.
        let cnt1 = countWays(n - 1, k) * (k - 1);
        
        // Ways in which last 2 fences
        // are of same color.
        let cnt2 = countWays(n - 2, k) * (k - 1);
        
        return dp[n] = cnt1 + cnt2;
    }

    // base cases
    return _countWays(n, k, dp);
}

let n = 3, k = 2;
console.log(countWays(n, k));