//https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1
//Brute force
function findLeadersBruteForce(numbers) {
  const leaders = [];
  const arrayLength = numbers.length;

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    let isLeader = true;
    const currentNumber = numbers[currentIndex];
    // Check all elements to the right
    for (
      let rightIndex = currentIndex + 1;
      rightIndex < arrayLength;
      rightIndex++
    ) {
      if (currentNumber < numbers[rightIndex]) {
        isLeader = false;
        break;
      }
    }
    if (isLeader) {
      leaders.push(currentNumber);
    }
  }
  return leaders;
}

// Test
const testArray1 = [16, 17, 4, 3, 5, 2];
console.log(findLeadersBruteForce(testArray1)); // [17, 5, 2]

//Optimal Approach
function leaders(arr) {
  // code here
  let n = arr.length;
  let leader = [];
  let right = n - 1;
  leader.push(arr[right]);
  let max = arr[right];
  while (right > 0) {
    if (arr[right - 1] >= arr[right] && arr[right - 1] >= max) {
      leader.push(arr[right - 1]);
      max = Math.max(max, arr[right - 1]);
    }
    right--;
  }
  return leader.reverse();
}
