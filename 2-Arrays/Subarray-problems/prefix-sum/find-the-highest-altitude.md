# LC 1732. Find the Highest Altitude

```javascript
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  // Given an array of altitutue  saying bike start at 0 -> [-5,1,5,0,7] cover this altitude
  // return the highest altitude , integer

  // [-5,1,5,0,-7]
  // [0,-5,-4,1,1,-6]
  // Max of above array is ans
  let maxAlt = 0;
  let currSum = 0;
  // let altArr =[0];
  for (let i = 0; i < gain.length; i++) {
    currSum += gain[i];
    // altArr.push(currSum)
    maxAlt = Math.max(currSum, maxAlt);
  }

  // return Math.max(...altArr)
  return maxAlt;
};
```
