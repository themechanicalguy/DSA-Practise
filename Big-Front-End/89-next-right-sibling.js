/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
  // your code here
  if (root === null || target === null) return null;

  let res = [root];
  let i = 0;
  while (i < res.length) {
    if (res[i] === target) {
      if (!res[i + 1]) return res[i].children?.[0] ?? null;
      return res[i + 1] ?? null;
    }
    if (res[i].children) {
      res = [...res, ...res[i].children];
    }
    i++;
  }
  return null;
}
