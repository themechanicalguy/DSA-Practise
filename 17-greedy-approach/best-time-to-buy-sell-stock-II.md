# 122. Best Time to Buy and Sell Stock II

You are given an integer array prices where `prices[i]` is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

Example 1:

- Input: prices = [7,1,5,3,6,4]
- Output: 7
- Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
  Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
  Total profit is 4 + 3 = 7.

### Problem Understanding

We are given an array `prices` where each element represents the stock price on a given day. We can buy and sell the stock multiple times, but we can only hold at most one share at any time. The goal is to maximize the total profit from these transactions.

### Key Observations

1. **Multiple Transactions Allowed**: Unlike the version where only one transaction is allowed, here we can perform as many buy-sell pairs as we want, as long as we don't hold more than one share at any time.
2. **Immediate Transactions**: We can buy and sell on the same day, which effectively means we can choose to do nothing on that day.
3. **Profit from Rising Prices**: The maximum profit is obtained by capturing every possible upward movement in the stock price. In other words, we buy at the start of an upward trend and sell at the peak, repeating this for every such trend.

### Intuition

The goal is to maximize profit by buying and selling stocks based on daily price changes. Since you can buy and sell on the same day and hold at most one share, the key is to capitalize on every price increase. The intuition lies in recognizing that:

- **Profit comes from price differences:** If the price increases from one day to the next, you can buy at the lower price and sell at the higher price to capture the difference.
- **Greedy approach works:** Since you can’t hold multiple shares and can buy/sell on the same day, you can greedily collect profit from every consecutive day where the price increases, as these transactions are independent.
- **No profit when prices only decrease:** If prices are always decreasing, no profit is possible, as buying at a higher price and selling at a lower price yields negative profit.

The optimal strategy is to sum up all positive price differences between consecutive days, as this captures every opportunity to profit without missing any valid transaction.

## Approach 1: Peak Valley Approach | Greedy Approach

**Intuition**: The idea is to identify consecutive valleys (local minima) and peaks (local maxima) and sum the profits from each valley-peak pair.

- **Steps**:
  1. Initialize `maxProfit` to 0.
  2. Iterate through the prices starting from the second day.
  3. If the current price is higher than the previous day's price, add the difference to `maxProfit`.
- **Time Complexity**: O(n) - We pass through the array once.
- **Space Complexity**: O(1) - We use a constant amount of space.

```javascript
/**
 * Calculates the maximum profit from buying and selling stocks multiple times.
 * This approach captures every upward trend in the stock prices.
 * @param {number[]} prices - Array where prices[i] is the stock price on the ith day.
 * @return {number} - Maximum profit achievable.
 */
function maxProfit(prices) {
  let maxProfit = 0; // Initialize the maximum profit to 0.

  // Loop through the prices starting from the second day.
  for (let day = 1; day < prices.length; day++) {
    // If the current day's price is higher than the previous day's price,
    // it means there's a profit to be made by buying the previous day and selling today.
    if (prices[day] > prices[day - 1]) {
      // Add the difference (profit) to the total maximum profit.
      maxProfit += prices[day] - prices[day - 1];
    }
  }

  return maxProfit; // Return the total maximum profit.
}

// Example Usage:
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // Output: 7
console.log(maxProfit([1, 2, 3, 4, 5])); // Output: 4
console.log(maxProfit([7, 6, 4, 3, 1])); // Output: 0
```

### Dry Run of Optimal Approach (Peak Valley)

#### Example 1: [7, 1, 5, 3, 6, 4]

- Day 1: Price = 7
- Day 2: Price = 1 (Decrease, no action)
- Day 3: Price = 5 (Increase from 1 to 5, profit += 4)
- Day 4: Price = 3 (Decrease from 5 to 3, no action)
- Day 5: Price = 6 (Increase from 3 to 6, profit += 3)
- Day 6: Price = 4 (Decrease from 6 to 4, no action)
- Total Profit: 4 + 3 = 7

#### Example 2: [1, 2, 3, 4, 5]

- Day 1: Price = 1
- Day 2: Price = 2 (Increase from 1 to 2, profit += 1)
- Day 3: Price = 3 (Increase from 2 to 3, profit += 1)
- Day 4: Price = 4 (Increase from 3 to 4, profit += 1)
- Day 5: Price = 5 (Increase from 4 to 5, profit += 1)
- Total Profit: 1 + 1 + 1 + 1 = 4

#### Example 3: [7, 6, 4, 3, 1]

- All prices are decreasing, so no profitable transactions.
- Total Profit: 0

### Edge Cases Considered

1. **Increasing Prices**: Continuous increase leads to buying once and selling at the end (or multiple buys and sells for the same profit).
2. **Decreasing Prices**: No transactions result in zero profit.
3. **Mixed Prices**: Multiple buy-sell pairs capture all upward trends.

## Approach 2: Dynamic Programming Approach

**Intuition**: This approach tracks the maximum profit at each day considering whether we hold a stock or not.

- **Steps**:
  1. Use two variables, `hold` and `notHold`, to represent the maximum profit when holding a stock and not holding a stock, respectively.
  2. Update these variables as we iterate through each day.
- **Time Complexity**: O(n) - Single pass through the array.
- **Space Complexity**: O(1) - Only a few variables are used.

```javascript
/**
 * Calculates the maximum profit using dynamic programming.
 * @param {number[]} prices - Array where prices[i] is the stock price on the ith day.
 * @return {number} - Maximum profit achievable.
 */
function maxProfitDP(prices) {
  let hold = -prices[0]; // Max profit when holding a stock on day 0.
  let notHold = 0; // Max profit when not holding a stock on day 0.

  for (let day = 1; day < prices.length; day++) {
    let prevHold = hold;
    hold = Math.max(hold, notHold - prices[day]); // Either continue holding or buy today.
    notHold = Math.max(notHold, prevHold + prices[day]); // Either continue not holding or sell today.
  }

  return notHold; // Maximum profit is when we don't hold any stock at the end.
}

// Example Usage:
console.log(maxProfitDP([7, 1, 5, 3, 6, 4])); // Output: 7
console.log(maxProfitDP([1, 2, 3, 4, 5])); // Output: 4
console.log(maxProfitDP([7, 6, 4, 3, 1])); // Output: 0
```

### Conclusion

The Peak Valley approach is intuitive and efficient, capturing all possible profits from rising prices. The Dynamic Programming approach, while also efficient, is slightly more complex but offers a different perspective on the problem. Both approaches have O(n) time complexity and O(1) space complexity, making them optimal for this problem.
