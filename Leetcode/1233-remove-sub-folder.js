// 1233. Remove Sub-Folders from the Filesystem
// https://leetcode.com/problems/remove-sub-folders-from-the-filesystem
// Diff: Medium

/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function (folder) {
  folder.sort();
  const res = [folder[0]];
  for (let i = 1; i < folder.length; i++) {
    if (!folder[i].startsWith(res[res.length - 1] + '/')) {
      res.push(folder[i]);
    }
  }
  return res;
};
