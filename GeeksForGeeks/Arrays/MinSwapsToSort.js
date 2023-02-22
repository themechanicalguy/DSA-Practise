// The Below Approarch is working fine but it has time complexity of O(n^2) but required is 0(n*logn)
class Solution {
  //Function to find the minimum number of swaps required to sort the array.
  minSwaps(nums) {
    //1. create an array from nums that has value and index
    const arrWI = nums.map((num, i) => {
      return { value: num, index: i };
    });
    arrWI.sort((a, b) => a.value - b.value);

    const doSwap = (arr, i, j, arrWI) => {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      const tempObj = arrWI.find((a) => a.value === temp);
      tempObj.index = j;
    };
    // console.log(arrWI,'arr')
    //2. var to store no of count
    let swapCount = 0;

    //3. loop 0 => arr.length-1
    for (let i = 0; i < nums.length; i++) {
      // 4. if arrWI[i].value != arr[i] then do step 5
      if (arrWI[i].value !== nums[i]) {
        // 5. doSwap (arr, arrWI[i].index, i)
        doSwap(nums, i, arrWI[i].index, arrWI);
        // 6. increment counter(swapsCount)
        swapCount++;
      }
    }
    return swapCount;
    // code here
  }
}

/// OPtimized solution

/**
 * @param {number[]} nums
 * @returns {number}
 */
class Solution {
  //Function to find the minimum number of swaps required to sort the array.
  minSwaps(arr) {
    let n = arr.length;

    // Create two arrays and
    // use as pairs where first
    // array is element and second array
    // is position of first element
    let arrpos = [];
    for (let i = 0; i < n; i++) arrpos.push([arr[i], i]);

    // Sort the array by array element values to
    // get right position of every element as the
    // elements of second array.
    arrpos.sort(function (a, b) {
      return a[0] - b[0];
    });

    // To keep track of visited elements. Initialize
    // all elements as not visited or false.
    let vis = new Array(n);
    for (let i = 0; i < n; i++) {
      vis[i] = false;
    }

    // Initialize result
    let ans = 0;

    // Traverse array elements
    for (let i = 0; i < n; i++) {
      // already swapped and corrected or
      // already present at correct pos
      if (vis[i] || arrpos[i][1] == i) continue;

      // find out the number of  node in
      // this cycle and add in ans
      let cycle_size = 0;
      let j = i;
      while (!vis[j]) {
        vis[j] = true;

        // move to next node

        j = arrpos[j][1];

        cycle_size++;
      }

      // Update answer by adding current cycle.
      if (cycle_size > 0) {
        ans += cycle_size - 1;
      }
    }

    // Return result
    return ans;
  }
}
