# LC 735. Asteroid Collision

- We have an array of integers representing `asteroids`. Each integer's absolute value represents the asteroid's size, and the sign represents its direction (positive for right, negative for left).
- All `asteroids` move at the same speed. When two `asteroids` collide (a positive one moving right meets a negative one moving left), the smaller one explodes. If they are the same size, both explode. `Asteroids` moving in the same direction never collide.

Our goal is to determine the state of the `asteroids` after all possible collisions.

Example 1:

Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
Example 2:

Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
Example 3:

Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

### Intuition

1. **Collision Conditions**:

   - A collision only happens when a positive asteroid is followed by a negative asteroid (i.e., `asteroid[i] > 0` and `asteroid[j] < 0` where `i < j`).
   - Asteroids moving in the same direction (both positive or both negative) will never collide.

2. **Stack Approach**:

   - We can use a stack to simulate the process. The stack helps us keep track of asteroids that might collide with future asteroids.
   - For each asteroid in the array, we compare it with the top of the stack to see if a collision occurs.

3. **Collision Handling**:
   - If the current asteroid is moving right (positive), it can't collide with the previous one (regardless of its direction), so we just push it to the stack.
   - If the current asteroid is moving left (negative), it can collide with previous asteroids moving right (positive). We handle these collisions by comparing sizes and popping from the stack as needed.

### Approaches

1. **Stack Simulation**:
   - Initialize an empty stack.
   - Iterate through each asteroid in the array.
   - For each asteroid, handle collisions with asteroids in the stack (if any) until no more collisions are possible.
   - Push the current asteroid onto the stack if it survives all collisions.

### Solution Code

```javascript
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
function asteroidCollision(asteroids) {
  const stack = [];

  for (const asteroid of asteroids) {
    let shouldAdd = true;
    // No collision if stack is empty or no opposite direction
    while (stack.length > 0 && asteroid < 0 && stack[stack.length - 1] > 0) {
      const topAsteroid = stack[stack.length - 1];
      const topSize = Math.abs(topAsteroid);
      const currentSize = Math.abs(asteroid);

      // If top asteroid is smaller, it explodes
      if (topSize < currentSize) {
        stack.pop();
        continue;
      }
      // If current asteroid is smaller, it explodes
      else if (topSize > currentSize) {
        shouldAdd = false;
        break;
      }
      // If both are equal, both explode
      else {
        stack.pop();
        shouldAdd = false;
        break;
      }
    }

    if (shouldAdd) {
      stack.push(asteroid);
    }
  }

  return stack;
}
```

### Explanation

1. **Initialization**: We start with an empty stack to keep track of asteroids that haven't collided yet.

2. **Iteration**: For each asteroid in the input array:

   - **Collision Check**: If the current asteroid is moving left (negative) and the top of the stack is moving right (positive), a collision is possible.
   - **Collision Handling**:
     - If the top asteroid is larger, the current asteroid explodes (`shouldAdd = false`).
     - If they are the same size, both explode (pop from stack and `shouldAdd = false`).
     - If the current asteroid is larger, the top asteroid explodes (pop from stack), and we continue checking the next asteroid in the stack.
   - **Add to Stack**: If the current asteroid survives all collisions, it's added to the stack.

3. **Result**: After processing all asteroids, the stack contains the surviving asteroids in their final state.

### Time and Space Complexity

- **Time Complexity**: O(n), where n is the number of asteroids. Each asteroid is pushed and popped from the stack at most once.
- **Space Complexity**: O(n), in the worst case, all asteroids are in the stack (no collisions).

### Dry Run with Examples

**Example 1: [5, 10, -5]**

- Stack: []
- Process 5: [5]
- Process 10: [5, 10] (no collision, both moving right)
- Process -5:
  - Collide with 10: 10 > 5 → -5 explodes
  - Stack remains [5, 10]
- Output: [5, 10]

**Example 2: [8, -8]**

- Stack: []
- Process 8: [8]
- Process -8:
  - Collide with 8: same size → both explode
  - Stack: []
- Output: []

**Example 3: [10, 2, -5]**

- Stack: []
- Process 10: [10]
- Process 2: [10, 2] (no collision)
- Process -5:
  - Collide with 2: 2 < 5 → 2 explodes, stack [10]
  - Collide with 10: 10 > 5 → -5 explodes
  - Stack: [10]
- Output: [10]

**Edge Case: [-5, 10, 5]**

- Stack: []
- Process -5: [-5] (no collision possible with empty stack)
- Process 10: [-5, 10] (no collision, same direction or opposite but no overlap)
- Process 5: [-5, 10, 5] (no collision)
- Output: [-5, 10, 5] (no collisions occur)
