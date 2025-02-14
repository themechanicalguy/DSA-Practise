/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// Our Recurssive Solution
var coinChange = function(coins, amount) {
    const _coinChange = (amount) => {
        if (amount == 0) return 0;

        let res = Infinity;
        for (let i=0; i<coins.length; i++) {
            if ((amount - coins[i]) >= 0) {
                res = Math.min(res, 1 + _coinChange(amount - coins[i]))
            }
        }
        return res;
    }
    const solution = _coinChange(amount)
    return solution === Infinity ? -1 : solution;
};

// Recursive solution with striver code
var coinChangeRec = (coins, amount) => {
    const _coinChange = (ind, amount, coins) => {
        if (ind === 0) {
            if (amount % coins[0] === 0) return amount / coins[0];
            return Infinity;
        }

        const notPick = 0 + _coinChange(ind-1, amount, coins);
        let pick = Infinity;
        if ((amount - coins[ind]) >= 0) {
            pick = 1 + _coinChange(ind, amount-coins[ind], coins)
        }
        return Math.min(pick, notPick);
    }
    const sol = _coinChange(coins.length, amount, coins);
    return sol === Infinity ? -1 : sol;
} 