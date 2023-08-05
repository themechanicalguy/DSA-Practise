/**
 * @param {string} str
 * @return {boolean}
 */
function validate(str) {
  // your code here
  const stack = [];
  const openBraces = new Set(['[', '{', '(']);
  const closeBraces = {
    '}': '{',
    ']': '[',
    ')': '(',
  };

  for (let i = 0; i < str.length; i++) {
    if (openBraces.has(str[i])) {
      stack.push(str[i]);
    } else if (closeBraces[str[i]]) {
      const prevTag = stack.pop();
      if (prevTag !== closeBraces[str[i]]) {
        return false;
      }
    }
  }
  if (stack.length === 0) return true;
  else return false;
}

//most optimised as only one map ds is use and the code is so clean
/**
 * @param {string} str
 * @return {boolean}
 */
const map = {
  '(': ')',
  '[': ']',
  '{': '}',
};

function validatev2(str) {
  const stack = [];
  for (let char of str) {
    if (map[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();

      if (!top) return false;

      if (map[top] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(validate('('));
