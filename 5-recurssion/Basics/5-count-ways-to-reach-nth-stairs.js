/**
 * You have been given a no. of stairs. Initially, you are at the 0th stair,
 * and you need to reach the Nth stair. Each time you can either climb one step
 * or two steps. you are supposed to return the no. of distinct ways in which
 * you can climb from 0th step to Nth step.
 */

function countDistinctWayToClimb(N) {
  //base case
  if (N < 0) return 0;
  if (N == 0) return 1;

  //recurence relation
  return countDistinctWayToClimb(N - 1) + countDistinctWayToClimb(N - 2);
}

console.log(countDistinctWayToClimb(4));
