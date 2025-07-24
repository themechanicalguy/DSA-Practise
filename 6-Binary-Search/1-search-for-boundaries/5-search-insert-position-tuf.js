/*
You are given a sorted array arr of distinct values and a target value x. You need to search for the index of the target value in the array.

If the value is present in the array, then return its index. Otherwise, determine the index where it would be inserted in the array while maintaining the sorted order.

Example 1:
Input Format: arr[] = {1,2,4,7}, x = 6
Result: 3
Explanation: 6 is not present in the array. So, if we will insert 6 in the 3rd index(0-based indexing), the array will still be sorted. {1,2,4,6,7}.

Example 2:
Input Format: arr[] = {1,2,4,7}, x = 2
Result: 1
Explanation: 2 is present in the array and so we will return its index i.e. 1.
*/


const searchInsertPositionBrute = (arr, x) => {
    for (let i=0; i<arr.length; i++) {
        if (arr[i] >= x) {
            return i;
        }
    }
    return arr.length;
}


// Same as lower bound
const searchInsertPositionOpti = (arr, x) => {

    let left =0, right = arr.length-1, ans =arr.length;
    while (left <= right) {
        const mid = Math.floor((left +right) /2);
        if (arr[mid] >=x) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

const arr = [1,2,4,7], x = 6;
console.log("For x - 6",searchInsertPositionOpti(arr, x));
console.log("For x - 2",searchInsertPositionOpti(arr, 2));