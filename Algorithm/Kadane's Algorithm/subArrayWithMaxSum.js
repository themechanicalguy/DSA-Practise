// Find the subArray of an Array which sums to maximum value,note: array might have negative numbers.
// Examples
/** 
have a empty array. [], output: null
have only one value. [-12]  or [0], output : [0]
[3,-2,-2,2,-1,3,4,-5,4], output: [2,-1,3,4]
[7,-4,5], output :[7,-4,5]
[-4,7], output : [7];
*/

const maxSubArray = (arr) => {
  // if Not an array or Empty Array, return null
  if (!(Array.isArray(arr) && arr.length)) return null;
  // variable for global and local Variable calculation.
  let gMax = arr[0];
  let lMax = arr[0];
  let lLeft = 0;
  let lRight = 0;
  let gLeft = 0;
  let gRight = 0;

  // loop array
  for (let i = 1; i < arr.length; i++) {
    // if currentElement(arr[i]) is larger than sum of previousElement's(lMax+arr[i]) + currentElement(arr[i]) then make localVariable as currentElement(arr[i])
    // lMax = Math.max(arr[i],lMax+arr[i]);
    let sum = lMax + arr[i];
    if (arr[i] < sum) {
      lMax = sum;
      lRight = i;
    } else {
      lMax = arr[i];
      // assign lLeft as the new max begins from a new value.
      lLeft = i;
      lRight = i;
    }
    // if lMax is larger than gMax then assign lMax to gMax and assign gLeft and gRight.
    if (lMax > gMax) {
      gMax = lMax;
      gLeft = lLeft;
      gRight = lRight;
    }
    // gMax = Math.max(lMax,gMax);
  }
  return arr.slice(gLeft, gRight + 1);
};

console.log(maxSubArray([7, -4, 5]));

//soln saurav - same approach - remember the approach to slide window

function maxSubArraySum(arr) {
  let globalMax = arr[0];
  let currMax = arr[0];
  let initialLeftIndex = 0,
    initialRightIndex = 0,
    start = 0,
    end = 0;

  for (let i = 1; i < arr.length; i++) {
    let sum = currMax + arr[i];
    if (arr[i] < sum) {
      //extending the window
      currMax = sum;
      initialRightIndex = i;
    } else {
      //creating a new window
      currMax = arr[i];
      initialLeftIndex = i;
      initialRightIndex = i;
    }

    //if you find a maxSum then the below code is executed
    if (currMax > globalMax) {
      //update to globalMax for further comparision
      globalMax = currMax;
      //remember the maxSum window
      start = initialLeftIndex;
      end = initialRightIndex;
    }
  }
  return arr.slice(start, end + 1);
}

maxSubArray([3, -2, -2, 2, -1, 3, 4, -5, 4]);
