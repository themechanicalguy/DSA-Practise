// https://leetcode.com/problems/next-permutation/description/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    const n = nums.length; 
 
     // Find the pivot index
     let pivot = -1; 
     for (let i = n - 2; i >= 0; i--) {
         if (nums[i] < nums[i + 1]) {
             pivot = i;
             break;
         }
     }
 
     // If pivot point does not exist, reverse the
     // whole numsay
     if (pivot === -1) {
         nums.reverse();
         return;
     }
 
     // find the element from the right that
     // is greater than pivot
     for (let i = n - 1; i > pivot; i--) {
         if (nums[i] > nums[pivot]) {
             [nums[i], nums[pivot]] = [nums[pivot], nums[i]];
             break;
         }
     }
 
     // Reverse the elements from pivot + 1 to the 
     // end to get the next permutation in place
     let left = pivot + 1;
     let right = n - 1;
     while (left < right) {
         [nums[left], nums[right]] = [nums[right], nums[left]];
         left++;
         right--;
     }
     
 };