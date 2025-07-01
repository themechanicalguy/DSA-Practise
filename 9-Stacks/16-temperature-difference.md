# LC 739. Daily Temperatures

Given an array of integers `temperatures` represents the daily `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `ith` day to get a warmer temperature.
If there is no future day for which this is possible, keep `answer[i] == 0` instead.

Example 1:

- Input: `temperatures` = `[73,74,75,71,69,72,76,73]`
- Output: `[1,1,4,2,1,1,0,0]`

### **Problem Understanding**

The problem requires us to find, for each day, how many days we have to wait until a warmer temperature occurs. If no warmer temperature occurs in the future, we should mark it as `0`.

### **Intuition**

- The problem requires finding, for each day’s `temperature`, how many days we must wait until a day with a higher `temperature` occurs.
- If no such day exists in the future, we return `0` for that index.
- The key is to efficiently compare each `temperature` with future temperatures while avoiding redundant computations.

**Key Observations:**

- For each day `i`, we need to find the smallest index `j` (where `j > i`) such that `temperatures[j] > temperatures[i]`.
- The answer for index `i` is `j - i` (the number of days to wait) or 0 if no such j exists.
- Temperatures are integers, and the array is non-empty, so we don’t need to handle empty arrays or invalid inputs.
- The problem suggests a pattern where we can optimize by leveraging the fact that we’re looking for the next warmer day, hinting at a stack-based or iterative approach to avoid checking every future day naively.

## 1. **Brute Force Approach**:

- For each day, iterate through all subsequent days until a warmer temperature is found.
- **Time Complexity**: O(n²) in the worst case (when `temperatures` are in descending order).
- **Space Complexity**: O(1) (excluding the output array).

```javascript
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperaturesBruteForce(temperatures) {
  const answer = new Array(temperatures.length).fill(0);

  for (let currentDay = 0; currentDay < temperatures.length; currentDay++) {
    for (
      let futureDay = currentDay + 1;
      futureDay < temperatures.length;
      futureDay++
    ) {
      if (temperatures[futureDay] > temperatures[currentDay]) {
        answer[currentDay] = futureDay - currentDay;
        break;
      }
    }
  }

  return answer;
}
```

**Time Complexity**: O(n²)  
**Space Complexity**: O(1) (excluding output array).

## **Optimal Approach (Using Monotonic Stack)**:

- Use a stack to keep track of indices of `temperatures` for which we haven't found a warmer day yet.
- For each new temperature, compare it with the `temperatures` at the indices stored in the stack. If the current temperature is warmer, update the answer for those indices and pop them from the stack.
- **Time Complexity**: O(n) (each element is pushed and popped from the stack at most once).
- **Space Complexity**: O(n) (for the stack in the worst case).

```javascript
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = []; // Stores indices of days with unresolved warmer days

  for (let currentDay = 0; currentDay < temperatures.length; currentDay++) {
    const currentTemp = temperatures[currentDay];

    // Check if currentTemp resolves any unresolved days in the stack
    while (
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < currentTemp
    ) {
      const unresolvedDay = stack.pop();
      answer[unresolvedDay] = currentDay - unresolvedDay;
    }

    stack.push(currentDay); // Push current day to stack (unresolved for now)
  }

  return answer;
}
```

**Time Complexity**: O(n) (each day is pushed and popped once).  
**Space Complexity**: O(n) (worst case when temperatures are in descending order).

### **Dry Run of Optimal Approach**

#### **Example 1**:

Input: `[73,74,75,71,69,72,76,73]`  
Output: `[1,1,4,2,1,1,0,0]`

| Day | Temp | Stack (indices) | Action                       | Answer Updates             |
| --- | ---- | --------------- | ---------------------------- | -------------------------- |
| 0   | 73   | [0]             | Push                         | []                         |
| 1   | 74   | []              | Pop 0, answer[0] = 1 - 0 = 1 | answer = [1,0,0,0,0,0,0,0] |
|     |      | [1]             | Push                         |                            |
| 2   | 75   | []              | Pop 1, answer[1] = 2 - 1 = 1 | answer = [1,1,0,0,0,0,0,0] |
|     |      | [2]             | Push                         |                            |
| 3   | 71   | [2, 3]          | Push                         |                            |
| 4   | 69   | [2, 3, 4]       | Push                         |                            |
| 5   | 72   | [2, 3]          | Pop 4, answer[4] = 5 - 4 = 1 | answer = [1,1,0,0,1,0,0,0] |
|     |      | [2]             | Pop 3, answer[3] = 5 - 3 = 2 | answer = [1,1,0,2,1,0,0,0] |
|     |      | [2, 5]          | Push                         |                            |
| 6   | 76   | []              | Pop 5, answer[5] = 6 - 5 = 1 | answer = [1,1,0,2,1,1,0,0] |
|     |      | []              | Pop 2, answer[2] = 6 - 2 = 4 | answer = [1,1,4,2,1,1,0,0] |
|     |      | [6]             | Push                         |                            |
| 7   | 73   | [6, 7]          | Push                         |                            |

Final Answer: `[1,1,4,2,1,1,0,0]`

#### **Example 2**:

Input: `[30,40,50,60]`  
Output: `[1,1,1,0]`

| Day | Temp | Stack (indices) | Action                       | Answer Updates     |
| --- | ---- | --------------- | ---------------------------- | ------------------ |
| 0   | 30   | [0]             | Push                         | []                 |
| 1   | 40   | []              | Pop 0, answer[0] = 1 - 0 = 1 | answer = [1,0,0,0] |
|     |      | [1]             | Push                         |                    |
| 2   | 50   | []              | Pop 1, answer[1] = 2 - 1 = 1 | answer = [1,1,0,0] |
|     |      | [2]             | Push                         |                    |
| 3   | 60   | []              | Pop 2, answer[2] = 3 - 2 = 1 | answer = [1,1,1,0] |
|     |      | [3]             | Push                         |                    |

Final Answer: `[1,1,1,0]`

#### **Example 3**:

Input: `[30,60,90]`  
Output: `[1,1,0]`

| Day | Temp | Stack (indices) | Action                       | Answer Updates   |
| --- | ---- | --------------- | ---------------------------- | ---------------- |
| 0   | 30   | [0]             | Push                         | []               |
| 1   | 60   | []              | Pop 0, answer[0] = 1 - 0 = 1 | answer = [1,0,0] |
|     |      | [1]             | Push                         |                  |
| 2   | 90   | []              | Pop 1, answer[1] = 2 - 1 = 1 | answer = [1,1,0] |
|     |      | [2]             | Push                         |                  |

Final Answer: `[1,1,0]`

### **Edge Cases Covered**

1. **All Increasing Temperatures** (Example 2): Every day has a warmer day the next day.
2. **All Decreasing Temperatures**: Answer is all `0`s.
3. **Mixed Temperatures** (Example 1): Some days require waiting multiple days.
4. **Single Day**: Answer is `[0]`.

The **Monotonic Stack** approach efficiently solves the problem in linear time by leveraging the stack to defer unresolved days until a warmer day is encountered.
