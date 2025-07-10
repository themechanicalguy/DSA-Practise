# LC 134. Gas Station

There are `n` gas stations along a circular route, where the amount of gas at the `ith` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `ith` station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

Example 1:

- Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
- Output: 3

**Explanation:**

- Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
- Travel to station 4. Your tank = 4 - 1 + 5 = 8
- Travel to station 0. Your tank = 8 - 2 + 1 = 7
- Travel to station 1. Your tank = 7 - 3 + 2 = 6
- Travel to station 2. Your tank = 6 - 4 + 3 = 5
- Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
- Therefore, return 3 as the starting index.

## Problem Understanding

We have a circular route with `n` gas stations. Each station `i` provides `gas[i]` amount of gas. Traveling from station `i` to the next station `(i + 1) % n` consumes `cost[i]` amount of gas. We start with an empty tank at one of the stations and need to determine if we can complete a full circuit around the route, returning to the starting station without running out of gas at any point. If a solution exists, it's guaranteed to be unique; otherwise, we return `-1`.

### Intuition

1. **Total Gas vs Total Cost**: If the total amount of gas available at all stations is less than the total cost to travel between all stations, it's impossible to complete the circuit, and we can immediately return `-1`.
2. **Local Deficits**: Even if total gas is sufficient, we need to find a starting station where, if we start, we never run out of gas at any point in the journey. This involves tracking the cumulative gas balance as we traverse the stations.

### Approaches

1. **Brute Force**: For each station, simulate the journey to check if we can complete the circuit. This approach has a time complexity of O(n^2), which is inefficient for large `n`.

```javascript
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuitBruteForce(gas, cost) {
  const n = gas.length;
  for (let start = 0; start < n; start++) {
    let tank = 0;
    let canComplete = true;
    for (let i = 0; i < n; i++) {
      const current = (start + i) % n;
      tank += gas[current] - cost[current];
      if (tank < 0) {
        canComplete = false;
        break;
      }
    }
    if (canComplete) {
      return start;
    }
  }
  return -1;
}
```

**Time Complexity**: O(n^2) - For each of the `n` starting stations, we check up to `n` stations.
**Space Complexity**: O(1) - Only a few variables are used.

#### Approach 2: Optimized Greedy

- **Total Balance Check**: First, check if the total gas is at least the total cost. If not, return `-1`.
- **Single Pass**: Traverse the stations once, keeping track of the current gas balance. If at any point the balance becomes negative, reset the starting station to the next station and reset the balance. The station where we can traverse the entire array without the balance going negative is our answer.

```javascript
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
  let totalTank = 0;
  let currentTank = 0;
  let startingStation = 0;
  const n = gas.length;

  for (let i = 0; i < n; i++) {
    totalTank += gas[i] - cost[i];
    currentTank += gas[i] - cost[i];
    // If current tank is negative, reset starting station
    if (currentTank < 0) {
      startingStation = i + 1;
      currentTank = 0;
    }
  }

  return totalTank >= 0 ? startingStation : -1;
}
```

**Time Complexity**: O(n) - We traverse the array only once.
**Space Complexity**: O(1) - Constant space is used.

### Dry Run of Optimal Approach

#### Example 1:

**Input**: gas = [1,2,3,4,5], cost = [3,4,5,1,2]

- **Initialization**: totalTank = 0, currentTank = 0, startingStation = 0
- **i = 0**:
  - totalTank = 1 - 3 = -2
  - currentTank = -2 (< 0) => startingStation = 1, currentTank = 0
- **i = 1**:
  - totalTank = -2 + (2 - 4) = -4
  - currentTank = 0 + (2 - 4) = -2 (< 0) => startingStation = 2, currentTank = 0
- **i = 2**:
  - totalTank = -4 + (3 - 5) = -6
  - currentTank = 0 + (3 - 5) = -2 (< 0) => startingStation = 3, currentTank = 0
- **i = 3**:
  - totalTank = -6 + (4 - 1) = -3
  - currentTank = 0 + (4 - 1) = 3
- **i = 4**:
  - totalTank = -3 + (5 - 2) = 0
  - currentTank = 3 + (5 - 2) = 6
- **Result**: totalTank (0) >= 0 => startingStation = 3

#### Example 2:

**Input**: gas = [2,3,4], cost = [3,4,3]

- **Initialization**: totalTank = 0, currentTank = 0, startingStation = 0
- **i = 0**:
  - totalTank = 2 - 3 = -1
  - currentTank = -1 (< 0) => startingStation = 1, currentTank = 0
- **i = 1**:
  - totalTank = -1 + (3 - 4) = -2
  - currentTank = 0 + (3 - 4) = -1 (< 0) => startingStation = 2, currentTank = 0
- **i = 2**:
  - totalTank = -2 + (4 - 3) = -1
  - currentTank = 0 + (4 - 3) = 1
- **Result**: totalTank (-1) < 0 => -1

#### Example 3 (Edge Case: Single Station):

**Input**: gas = [5], cost = [4]

- **Initialization**: totalTank = 0, currentTank = 0, startingStation = 0
- **i = 0**:
  - totalTank = 5 - 4 = 1
  - currentTank = 5 - 4 = 1
- **Result**: totalTank (1) >= 0 => startingStation = 0

### Explanation

- **Brute Force**: Checks every possible starting station by simulating the journey from each, which is straightforward but inefficient.
- **Optimized Greedy**: Efficiently determines the starting station by leveraging the insight that if the total gas is sufficient, there must be a unique starting point where the cumulative gas never drops below zero. This approach avoids the O(n^2) complexity by making a single pass through the array.

The optimal approach is preferred due to its linear time complexity and constant space usage, making it scalable for large input sizes.
