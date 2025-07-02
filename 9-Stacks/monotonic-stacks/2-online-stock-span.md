# LC 901. Online Stock Span

Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

- For example, if the prices of the stock in the last four days is `[7,2,1,2]` and the price of the stock today is `2`, then the span of today is `4` because starting from today, the price of the stock was less than or equal `2` for `4` consecutive days.
- Also, if the prices of the stock in the last four days is `[7,34,1,2]` and the price of the stock today is `8`, then the span of today is `3` because starting from today, the price of the stock was less than or equal `8` for `3` consecutive days.

Implement the StockSpanner class:

- `StockSpanner()` Initializes the object of the class.
- `int next(int price)` Returns the span of the stock's price given that today's price is price.

Example 1:

Input- `["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]`
`[[], [100], [80], [60], [70], [60], [75], [85]]`
Output - `[null, 1, 1, 1, 2, 1, 4, 6]`

### Problem Understanding

- The problem requires us to design a `StockSpanner` class that can efficiently compute the "span" of a stock's price for each day.
- The span is defined as the maximum number of consecutive days (including the current day) where the stock price was less than or equal to the current day's price, looking backward.

The goal is to track daily stock prices and, for each new price, compute how many consecutive days (including today) have prices less than or equal to today’s price. For example, if today’s price is `75`, and the previous prices are `[60, 70, 60, 75]`, the span is 4 because all four days (including today) have `prices ≤ 75`.

### Intuition

- To solve this problem, we need a way to keep track of previous prices and their spans so that when a new price comes in, we can efficiently determine how many previous consecutive days had prices less than or equal to the current price.
- A naive approach would be, for each new price, to look back day by day until we find a price greater than the current price. This would result in O(n) time per `next` call in the worst case, where n is the number of prices processed so far. For n calls, this would be O(n^2) time overall, which is inefficient for large n.

A more optimal approach uses a **monotonic stack** to keep track of prices and their spans. The idea is to maintain a stack where each element is a pair `(price, span)`, and the stack is maintained in decreasing order of price. When a new price is added, we pop elements from the stack while their price is less than or equal to the current price, accumulating their spans. This way, we efficiently compute the span for the current price by leveraging previously computed spans.

### Approaches

## Approach 1: Naive Approach (Array Storage with Linear Scan)

**Idea:**

- Store all prices in an array.
- For each new price, iterate backward through the array, counting days until a price greater than today’s is found or we reach the beginning.

```javascript
class StockSpanner {
  constructor() {
    // Initialize an array to store all prices
    this.prices = [];
  }

  next(price) {
    // Add today's price to the array
    this.prices.push(price);
    let span = 1; // Include today

    // Iterate backward from the second-to-last price
    for (let i = this.prices.length - 2; i >= 0; i--) {
      if (this.prices[i] <= price) {
        span++; // Count day if price is <= today's price
      } else {
        break; // Stop at first price > today's price
      }
    }

    return span;
  }
}
```

**Time Complexity:**

- **Constructor:** `O(1)` for initializing an empty array.
- next(price): O(n) in the worst case, where n is the number of days (if all previous prices are ≤ today’s price).
- Overall: For N calls to next, O(N²) in the worst case (e.g., prices in non-decreasing order).

## Approach 2: Monotonic Stack:

- **Initialization**: Initialize a stack to keep track of prices and their corresponding spans.
- **next(price)**:
  - Initialize the current span to 1.
  - While the stack is not empty and the top of the stack's price is less than or equal to the current price, pop the top element and add its span to the current span.
  - Push the current price and its computed span onto the stack.
  - Return the current span.

### Solution Code

```javascript
class StockSpanner {
  constructor() {
    this.stack = []; // Stack to hold pairs of [price, span]
  }

  next(price) {
    let span = 1;
    // While the stack is not empty and the top price is <= current price
    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1][0] <= price
    ) {
      const [prevPrice, prevSpan] = this.stack.pop();
      span += prevSpan;
    }
    this.stack.push([price, span]);
    return span;
  }
}

// Example usage:
const stockSpanner = new StockSpanner();
console.log(stockSpanner.next(100)); // 1
console.log(stockSpanner.next(80)); // 1
console.log(stockSpanner.next(60)); // 1
console.log(stockSpanner.next(70)); // 2
console.log(stockSpanner.next(60)); // 1
console.log(stockSpanner.next(75)); // 4
console.log(stockSpanner.next(85)); // 6
```

### Explanation

- **Initialization**: The `StockSpanner` class initializes an empty stack to keep track of prices and their spans.
- **next(price)**:
  - **span** starts at 1 because the current day is always counted.
  - The while loop checks if the stack's top price is less than or equal to the current price. If so, it pops that price and adds its span to the current span. This process continues until a higher price is encountered or the stack is empty.
  - The current price and its computed span are then pushed onto the stack.
  - The computed span is returned, representing the number of consecutive days with prices less than or equal to the current day's price.

### Why This is Optimal:

- The monotonic stack ensures each price is processed only once (pushed and popped), leading to efficient span calculations.
- It handles all edge cases (increasing prices, repeated prices, mixed patterns) correctly.
- The code is concise and maintainable.

### Time and Space Complexity

- **Time Complexity**: Each price is pushed and popped from the stack at most once. Thus, for n calls to `next`, the total time complexity is O(n), averaging O(1) per call.
- **Space Complexity**: The stack can grow up to O(n) in the worst case if prices are in decreasing order, as no elements are ever popped.

### Dry Run with Examples

**Example 1:**
Input: [100, 80, 60, 70, 60, 75, 85]

- next(100):
  - Stack: [], span = 1
  - Stack after push: [[100, 1]]
  - Return 1
- next(80):
  - Stack top [100,1] > 80 → push [80,1]
  - Stack: [[100,1], [80,1]]
  - Return 1
- next(60):
  - Stack top [80,1] > 60 → push [60,1]
  - Stack: [[100,1], [80,1], [60,1]]
  - Return 1
- next(70):
  - Stack top [60,1] ≤ 70 → pop, span = 1 + 1 = 2
  - Stack top [80,1] > 70 → push [70,2]
  - Stack: [[100,1], [80,1], [70,2]]
  - Return 2
- next(60):
  - Stack top [70,2] > 60 → push [60,1]
  - Stack: [[100,1], [80,1], [70,2], [60,1]]
  - Return 1
- next(75):
  - Stack top [60,1] ≤ 75 → pop, span = 1 + 1 = 2
  - Stack top [70,2] ≤ 75 → pop, span = 2 + 2 = 4
  - Stack top [80,1] > 75 → push [75,4]
  - Stack: [[100,1], [80,1], [75,4]]
  - Return 4
- next(85):
  - Stack top [75,4] ≤ 85 → pop, span = 1 + 4 = 5
  - Stack top [80,1] ≤ 85 → pop, span = 5 + 1 = 6
  - Stack top [100,1] > 85 → push [85,6]
  - Stack: [[100,1], [85,6]]
  - Return 6

**Example 2:**
Input: [7, 2, 1, 2]

- next(7): span = 1, stack: [[7,1]] → 1
- next(2): 7 > 2 → push [2,1], stack: [[7,1], [2,1]] → 1
- next(1): 2 > 1 → push [1,1], stack: [[7,1], [2,1], [1,1]] → 1
- next(2):
  - 1 ≤ 2 → pop, span = 1 + 1 = 2
  - 2 ≤ 2 → pop, span = 2 + 1 = 3
  - 7 > 2 → push [2,3], stack: [[7,1], [2,3]] → 3

**Example 3:**
Input: [7, 34, 1, 2, 8]

- next(7): stack: [[7,1]] → 1
- next(34): 7 ≤ 34 → pop, span = 1 + 1 = 2, stack: [[34,2]] → 2
- next(1): 34 > 1 → push [1,1], stack: [[34,2], [1,1]] → 1
- next(2):
  - 1 ≤ 2 → pop, span = 1 + 1 = 2
  - 34 > 2 → push [2,2], stack: [[34,2], [2,2]] → 2
- next(8):
  - 2 ≤ 8 → pop, span = 1 + 2 = 3
  - 34 > 8 → push [8,3], stack: [[34,2], [8,3]] → 3

These examples demonstrate how the algorithm efficiently computes spans by leveraging the stack to avoid reprocessing the same elements multiple times.
