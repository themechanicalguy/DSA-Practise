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

console.log(validate('('));
