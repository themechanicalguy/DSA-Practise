// https://leetcode.com/problems/candy/submissions/1652008424/?envType=daily-question&envId=2025-06-02
// 135. Candy
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    const candies = new Array(ratings.length).fill(1);
    for(let i=1; i< candies.length; i++) {
        if (ratings[i] > ratings[i-1]) 
            candies[i]= candies[i-1]+1;
    }
    for(let i=candies.length-1; i>0; i--) {
        if (ratings[i-1] > ratings[i]) {
            candies[i-1] = Math.max(candies[i]+1, candies[i-1]);
        }
    }
    return candies.reduce((a, b) => a+b, 0);
};
