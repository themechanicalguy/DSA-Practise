function firstDuplicate(str) {
  // your code here
  const collectStr = new Set();
  collectStr.add(str[0]);

  for (let i = 1; i < str.length; i++) {
    if (collectStr.has(str[i])) return str[i];
    collectStr.add(str[i]);
  }

  return null;
}

console.log(firstDuplicate('abca'));
// 'a'

console.log(firstDuplicate('abcdefe'));
// 'e'

console.log(firstDuplicate('abcdef'));
// null
