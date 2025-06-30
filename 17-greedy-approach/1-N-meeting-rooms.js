//https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1
/*
    You are given timings of n meetings in the form of (start[i], end[i]) where start[i] is the start time of 
    meeting i and end[i] is the finish time of meeting i. Return the maximum number of meetings that can be 
    accommodated in a single meeting room, when only one meeting can be held in the meeting room at a particular time. 
*/

function maxMeetings(start, end) {
  let intervals = [];
  for (let i = 0; i < start.length; i++) {
    intervals.push([start[i], end[i]]);
  }

  intervals.sort((a, b) => a[1] - b[1]);
  let prev = intervals[0];
  let count = 1;
  for (let i = 1; i < intervals.length; i++) {
    let curr = intervals[i];
    if (prev[1] < curr[0]) {
      count++;
      prev = curr;
    }
  }
  return count;
}
