// https://neetcode.io/problems/products-of-array-discluding-self
// Products of Array Except Self
// Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        let hasZero=1;
        let div = 1;
        for (let num of nums) {
            
            if (num == 0) {
                if (!hasZero) return new Array(nums.length).fill(0);
                hasZero = 0;
            } else {
                div *= num;
            }

        }
        return nums.map((num) => num == 0 ? div : (div * hasZero)/num);
    }
}

// Optimized Solution
class Solution1 {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {

        let sol = new Array(nums.length);
        sol[0] = 1;

        let prefix = 1;
        for (let i=0; i<nums.length-1; i++) {
            prefix *= nums[i];
            sol[i+1] = prefix;
        }

        let postfix = 1;
        for (let i=nums.length-1; i>0; i--) {
            postfix *= nums[i];
            sol[i-1] *= postfix;
        }

        return sol;
    }
}
