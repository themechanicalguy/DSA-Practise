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
  for (let i=1;i<arr.length;i++) {
      // if currentElement(arr[i]) is larger than sum of previousElement's(lMax+arr[i]) + currentElement(arr[i]) then make localVariable as currentElement(arr[i])
      // lMax = Math.max(arr[i],lMax+arr[i]);
      let sum = lMax+arr[i];
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
      if (lMax>gMax) {
          gMax = lMax;
          gLeft = lLeft;
          gRight = lRight;
      }
      // gMax = Math.max(lMax,gMax);
  }
  return arr.slice(gLeft,gRight+1);
}

console.log(maxSubArray([7,-4,5]));