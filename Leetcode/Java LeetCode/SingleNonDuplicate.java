// 540. Single Element in a Sorted Array
// https://leetcode.com/problems/single-element-in-a-sorted-array/

class SingleNonDuplicate {
    public int singleNonDuplicate(int[] nums) {
        int left = 0;
        int right = nums.length -1;
        int mid = (int) ((left + right) / 2);

        while (left < mid && mid < right) {
            if(nums[left]==nums[mid]) {
                return nums[right];
            }    
            else if (nums[mid] == nums[right]) {
                return nums[left];
            }

            if ( (mid + left) %2 == 0) mid += 1;

            if (nums[mid] == nums[mid-1]) left = mid+1;
            else right = mid-1;
            mid = (int) ((left + right) / 2);
        }
            return nums[mid];
    }
}