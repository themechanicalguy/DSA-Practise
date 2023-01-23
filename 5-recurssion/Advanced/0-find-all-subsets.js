/**
 Given an integer array nums of unique elements, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (arr) {
  function getSubsets(arr, output, index, ans) {
    if (index >= arr.length) {
      ans.push([...output]);
      return;
    }
    //excluding call
    getSubsets(arr, [...output], index + 1, ans);
    //Including call
    output.push(arr[index]);
    getSubsets(arr, [...output], index + 1, ans);
  }
  let ans = [];
  let output = [];
  getSubsets(arr, output, 0, ans);
  return ans;
};
