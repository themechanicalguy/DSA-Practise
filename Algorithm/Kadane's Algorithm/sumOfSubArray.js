// Find the max of subArray of an Array which might have negative numbers.
// Examples
/** 
have a empty array. [], output: null
have only one value. [-12]  or [0], output : 0
[3,-2,-2,2,-1,3,4,-5,4], output: 8
[7,-4], output 7;
[-4,7], output 7;
*/

const maxSubArray = (arr) => {
  // if Not an array or Empty Array, return null
  if (!(Array.isArray(arr) && arr.length)) return null;
  // variable for global and local Variable calculation.
  let gMax = arr[0];
  let lMax = arr[0];

  // loop array
  for (let i=1;i<arr.length;i++) {
      // if currentElement(arr[i]) is larger than sum of previousElement's(lMax+arr[i]) + currentElement(arr[i]) then make localVariable as currentElement(arr[i])
      lMax = Math.max(arr[i],lMax+arr[i]);
      // if lMax is larger than gMax then assign lMax to gMax
      gMax = Math.max(lMax,gMax);
  }
  return gMax;
}

console.log(maxSubArray([3,-2,-2,2,-1,3,4,-5,4]));