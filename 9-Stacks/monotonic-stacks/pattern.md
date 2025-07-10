# **Pattern 5: Monotonic Stack**

### **What is a Monotonic Stack?**

A **monotonic stack** is a stack that maintains elements in either:

- **Strictly increasing order** (each element is > the one below it)
- **Strictly decreasing order** (each element is < the one below it)

This helps efficiently solve problems where we need to find:  
✅ Next/previous **greater/smaller** element  
✅ Maximum/minimum in a sliding window  
✅ Problems requiring maintaining elements in a certain order

---

## **How to Identify a Monotonic Stack Problem?**

Look for these **keywords** in the problem statement:  
🔹 **"Next Greater Element"**  
🔹 **"Previous Smaller Element"**  
🔹 **"Daily Temperatures"** (finding the next warmer day)  
🔹 **"Largest Rectangle in Histogram"** (using increasing stack)  
🔹 **"Sliding Window Maximum"** (decreasing stack)

---

## **Approach to Solve Monotonic Stack Problems**

### **1. Choose the Stack Order**

- **Increasing Stack** → Used to find **next/previous smaller** elements
- **Decreasing Stack** → Used to find **next/previous greater** elements

### **2. Decide What to Store in the Stack**

- **Indices** (for array-based problems)
- **Values** (if direct comparison is needed)

### **3. Process Elements**

- **Push** elements onto the stack while maintaining order.
- **Pop** elements when the current element violates the order (and process them).

### **4. Time Complexity**

- **O(n)** → Each element is pushed and popped at most once.

---

## **Use Cases & Examples**

### **1. Next Greater Element (LeetCode 496)**

**Problem**: Given an array, find the **next greater element** for every element.

**Solution (Decreasing Stack)**:

```javascript
function nextGreaterElement(nums) {
  const stack = [];
  const result = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop();
      result[idx] = nums[i]; // Current num is next greater for stack top
    }
    stack.push(i);
  }

  return result;
}

console.log(nextGreaterElement([4, 2, 5, 8])); // [5, 5, 8, -1]
```

**Explanation**:

- **Stack keeps indices in decreasing order**.
- When a larger number is found, it becomes the **next greater** for popped elements.

---

### **2. Daily Temperatures (LeetCode 739)**

**Problem**: For each day, find how many days until a **warmer temperature**.

**Solution (Decreasing Stack)**:

```javascript
function dailyTemperatures(T) {
  const stack = [];
  const result = new Array(T.length).fill(0);

  for (let i = 0; i < T.length; i++) {
    while (stack.length && T[stack[stack.length - 1]] < T[i]) {
      const idx = stack.pop();
      result[idx] = i - idx; // Days until warmer temp
    }
    stack.push(i);
  }

  return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

**Explanation**:

- **Stack stores indices of decreasing temperatures**.
- When a warmer day is found, calculate the **days difference**.

---

### **3. Largest Rectangle in Histogram (LeetCode 84)**

**Problem**: Find the largest rectangle area in a histogram.

**Solution (Increasing Stack)**:

```javascript
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // Output: 10
```

**Explanation**:

- **Stack keeps indices of increasing heights**.
- When a smaller bar is found, **calculate area** of rectangles formed by popped bars.

---

## **When to Use Monotonic Stack?**

| **Problem Type**              | **Stack Order** | **Example**                    |
| ----------------------------- | --------------- | ------------------------------ |
| Next/Previous Greater Element | Decreasing      | Next Greater Element           |
| Next/Previous Smaller Element | Increasing      | Largest Rectangle in Histogram |
| Sliding Window Max/Min        | Decreasing      | Sliding Window Maximum         |
| Temperature/Waiting Problems  | Decreasing      | Daily Temperatures             |

---

## **Key Takeaways**

✔ **Monotonic stacks help efficiently track next/previous greater/smaller elements.**  
✔ **Use decreasing stack for "next greater" problems.**  
✔ **Use increasing stack for "next smaller" problems.**  
✔ **Time complexity is O(n) since each element is pushed & popped once.**

Would you like more examples or variations of monotonic stack problems? 🚀
