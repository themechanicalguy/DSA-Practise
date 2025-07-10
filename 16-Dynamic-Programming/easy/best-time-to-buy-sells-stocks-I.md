# LC 121. Best Time to Buy and Sell Stock

You are given an array `prices` where `prices[i]` is the `price` of a given stock on the `ith` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

Example 1:

- Input: prices = `[7,1,5,3,6,4]`
- Output: `5`
- Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
  Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:

- Input: prices = `[7,6,4,3,1]`
- Output: `0`
- Explanation: In this case, no transactions are done and the max profit = 0.

### Problem Understanding

The problem requires us to find the maximum profit that can be obtained by buying a stock on one day and selling it on a subsequent day. If no profit can be made (i.e., the prices are in decreasing order), we should return 0.

### Intuition

To maximize profit, we need to find the maximum difference between a selling price and a buying price, where the selling price comes after the buying price in the array.

### Approaches

1. **Brute Force Approach**: Check all possible pairs of buying and selling days to find the maximum profit. This involves nested loops where the outer loop picks the buying day and the inner loop checks all subsequent days for selling.

#### 1. Brute Force Approach

```javascript
/**
 * Brute Force Approach to find the maximum profit from buying and selling stocks.
 * This method checks every possible pair of buy and sell days to find the maximum profit.
 *
 * Time Complexity: O(n^2) - Because of nested loops where each element is compared with every other element.
 * Space Complexity: O(1) - No additional space is used apart from a few variables.
 *
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on the ith day.
 * @return {number} - Maximum profit achievable.
 */
function maxProfitBruteForce(prices) {
  let maxProfit = 0; // Initialize maximum profit to 0

  // Loop through each day as the potential buy day
  for (let buyDay = 0; buyDay < prices.length; buyDay++) {
    // Loop through each subsequent day as the potential sell day
    for (let sellDay = buyDay + 1; sellDay < prices.length; sellDay++) {
      // Calculate the profit if bought on buyDay and sold on sellDay
      const currentProfit = prices[sellDay] - prices[buyDay];

      // Update maxProfit if currentProfit is greater
      if (currentProfit > maxProfit) {
        maxProfit = currentProfit;
      }
    }
  }

  return maxProfit; // Return the maximum profit found
}
```

2. **Optimal One-Pass Approach**: Traverse the array once, keeping track of the minimum price encountered so far and calculating the potential profit if sold on the current day. Update the maximum profit whenever a higher profit is found.

```javascript
/**
 * Optimal One-Pass Approach to find the maximum profit from buying and selling stocks.
 * This method efficiently tracks the minimum price and calculates the maximum profit in a single pass.
 *
 * Time Complexity: O(n) - Only one pass through the array is needed.
 * Space Complexity: O(1) - Constant space is used regardless of the input size.
 *
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on the ith day.
 * @return {number} - Maximum profit achievable.
 */
function maxProfit(prices) {
  let minPrice = Infinity; // Initialize minPrice to a very high value to ensure any price will be smaller
  let maxProfit = 0; // Initialize maxProfit to 0

  // Loop through each price in the array
  for (let currentPrice of prices) {
    // If the current price is lower than the minPrice found so far, update minPrice
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    }
    // Otherwise, check if selling at the current price gives a better profit
    else if (currentPrice - minPrice > maxProfit) {
      maxProfit = currentPrice - minPrice; // Update maxProfit if current profit is higher
    }
  }

  return maxProfit; // Return the maximum profit found
}
```

### Explanation

- **Brute Force Approach**: This approach checks every possible pair of days (buy and sell) to compute the profit. It's straightforward but inefficient for large arrays due to its O(n^2) time complexity.
- **Optimal One-Pass Approach**: This approach efficiently tracks the minimum price encountered so far and calculates the profit if the stock is sold on the current day. By maintaining these two variables (`minPrice` and `maxProfit`), it ensures the solution is found in O(n) time with O(1) space, making it optimal.

### Dry Run with Examples

#### Example 1: prices = [7, 1, 5, 3, 6, 4]

- **Initial**: minPrice = Infinity, maxProfit = 0
- **Day 0 (7)**: minPrice = 7, maxProfit = 0
- **Day 1 (1)**: minPrice = 1, maxProfit = 0
- **Day 2 (5)**: minPrice = 1, maxProfit = 4 (5-1)
- **Day 3 (3)**: minPrice = 1, maxProfit = 4
- **Day 4 (6)**: minPrice = 1, maxProfit = 5 (6-1)
- **Day 5 (4)**: minPrice = 1, maxProfit = 5
- **Result**: 5

#### Example 2: prices = [7, 6, 4, 3, 1]

- **Initial**: minPrice = Infinity, maxProfit = 0
- **Day 0 (7)**: minPrice = 7, maxProfit = 0
- **Day 1 (6)**: minPrice = 6, maxProfit = 0
- **Day 2 (4)**: minPrice = 4, maxProfit = 0
- **Day 3 (3)**: minPrice = 3, maxProfit = 0
- **Day 4 (1)**: minPrice = 1, maxProfit = 0
- **Result**: 0 (No profit possible)

#### Example 3: prices = [2, 4, 1, 7]

- **Initial**: minPrice = Infinity, maxProfit = 0
- **Day 0 (2)**: minPrice = 2, maxProfit = 0
- **Day 1 (4)**: minPrice = 2, maxProfit = 2 (4-2)
- **Day 2 (1)**: minPrice = 1, maxProfit = 2
- **Day 3 (7)**: minPrice = 1, maxProfit = 6 (7-1)
- **Result**: 6

### Edge Cases Covered

1. **Increasing Prices**: Example 3 shows prices fluctuating but ending with a high profit.
2. **Decreasing Prices**: Example 2 shows no profit possible.
3. **Normal Case**: Example 1 shows a typical scenario where profit is achievable.

This approach efficiently handles all cases with optimal time and space complexity.
