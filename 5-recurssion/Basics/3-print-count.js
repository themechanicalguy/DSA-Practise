//Write a function return the count of all number from N
/**
 * 5 => 5, 4, 3, 2, 1
 * 7 => 7,6,5,4,3,2,1
 */

function printCount(N) {
  //base case
  if (N == 0) return;

  //recursive relation
  printCount(N - 1);
  console.log(N);
  return;
}

printCount(5);
