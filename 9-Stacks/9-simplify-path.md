# LC 71. Simplify Path

## Problem Understanding

We need to simplify an absolute path in a Unix-style file system according to specific rules. The canonical path should be the shortest string representing the same location in the file system.

## Intuition

The key observation is that we need to process the path component by component, handling special cases ('.' and '..') while maintaining the current directory structure. A stack is perfect for this because:

- When we see a regular directory, we push it onto the stack
- When we see '..', we pop from the stack (go up one directory)
- When we see '.', we ignore it (stay in current directory)

## Approaches

### Approach 1: Using Stack

1. Split the path by '/' to get all components
2. Process each component:
   - Ignore empty strings and '.'
   - For '..', pop from stack if not empty
   - For other names, push to stack
3. Join the stack with '/' to form the canonical path

### Approach 2: Using Array as Stack

Similar to the first approach but uses JavaScript array methods more directly.

### Approach 3: Using Regular Expressions

First clean up multiple slashes, then process components similarly.

## Solution Code

### Approach 1: Stack Solution

```javascript
/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
  const stack = [];
  const components = path.split("/");

  for (const component of components) {
    if (component === "" || component === ".") {
      continue; // Skip empty or current directory
    } else if (component === "..") {
      if (stack.length > 0) {
        stack.pop(); // Go up one directory if possible
      }
    } else {
      stack.push(component); // Valid directory name
    }
  }

  return "/" + stack.join("/");
}
```

### Approach 2: Array as Stack

```javascript
function simplifyPath(path) {
  const parts = path.split("/").filter((part) => part !== "" && part !== ".");
  const result = [];

  for (const part of parts) {
    if (part === "..") {
      if (result.length > 0) {
        result.pop();
      }
    } else {
      result.push(part);
    }
  }

  return "/" + result.join("/");
}
```

### Approach 3: Using Regular Expressions

```javascript
function simplifyPath(path) {
  // First replace multiple slashes with single slash
  path = path.replace(/\/+/g, "/");
  // Remove trailing slash except for root
  path = path.replace(/\/+$/, "") || "/";

  const stack = [];
  const components = path.split("/").filter((c) => c !== "");

  for (const component of components) {
    if (component === "..") {
      if (stack.length > 0) stack.pop();
    } else if (component !== ".") {
      stack.push(component);
    }
  }

  return "/" + stack.join("/");
}
```

## Complexity Analysis

All approaches have similar time and space complexity:

- **Time Complexity**: O(n), where n is the length of the path. We process each character once when splitting and then each component once.
- **Space Complexity**: O(n), for storing the components and the stack.

## Dry Run Examples

### Example 1: "/home//foo/"

1. Split: ["", "home", "", "foo", ""]
2. Process:
   - Skip ""
   - Push "home"
   - Skip ""
   - Push "foo"
   - Skip ""
3. Join: "/home/foo"

### Example 2: "/../"

1. Split: ["", "..", ""]
2. Process:
   - Skip ""
   - ".." with empty stack does nothing
   - Skip ""
3. Result: "/"

### Example 3: "/.../a/../b/c/../d/./"

1. Split: ["", "...", "a", "..", "b", "c", "..", "d", ".", ""]
2. Process:
   - Skip ""
   - Push "..."
   - Push "a"
   - ".." pops "a"
   - Push "b"
   - Push "c"
   - ".." pops "c"
   - Push "d"
   - Skip "."
   - Skip ""
3. Join: "/.../b/d"

The stack approach efficiently handles all edge cases by systematically processing each path component according to the rules.
