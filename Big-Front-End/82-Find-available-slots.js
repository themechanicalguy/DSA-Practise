// type Interval = [number, number]

/**
 * @param {Interval[][]} schedules
 * @return {Interval[]}
 */

const findMeetingSlots = (meetings) => {
  const allMeetings = meetings.flat();
  allMeetings.sort((a, b) => {
    if (a[0] - b[0]) return a[0] - b[0];
    return b[1] - a[1];
  });
  let start = 0;
  const freeSlots = [];
  allMeetings.forEach(([mStart, mEnd]) => {
    if (start >= mStart) {
      if (start < mEnd) {
        start = mEnd;
      }
    } else {
      freeSlots.push([start, mStart]);
      start = mEnd;
    }
  });
  if (start !== 24) {
    freeSlots.push([start, 24]);
  }
  return freeSlots;
};

const meetings = [
  [
    [13, 15],
    [11, 12],
    [10, 13],
  ], //schedule for member 1
  [[8, 9]], // schedule for member 2
  [[13, 18]], // schedule for member 3
];

findMeetingSlots(meetings);

///////////////////////////////////////BELOW ARE SOME OF THE INSPIRATION FROM THE CODES THAT I HAVE GONE THROUGH IN THE DISCUSSION
// n = total number of meetings. a = number of free slots (answer)

// Solution 1 - Sort the flattened array
// Time complexity: O(nlogn)
// Space complexity: O(n)
function findMeetingSlotsV2(schedules) {
  const sorted = schedules.flat().sort((a, b) => a[0] - b[0]);
  const result = [];
  let maxEnd = 0;

  for (const [start, end] of sorted) {
    if (start > maxEnd) {
      result.push([maxEnd, start]);
    }
    maxEnd = Math.max(maxEnd, end);
  }

  if (24 > maxEnd) {
    result.push([maxEnd, 24]);
  }

  return result;
}

// Solution 2 - Record net change per hour
// Time complexity: O(n)
// Space complexity: O(a)
function findMeetingSlotsV3(schedules) {
  const busy = new Array(25).fill(0);
  for (const schedule of schedules) {
    for (const [start, end] of schedule) {
      busy[start]++;
      busy[end]--;
    }
  }

  const ans = [];
  let prev = null;
  let curBusy = 0;
  for (let i = 0; i <= 24; i++) {
    if (curBusy === 0 && busy[i]) {
      if (prev !== null) {
        ans.push([prev, i]);
        prev = null;
      }
    } else if (prev === null && curBusy + busy[i] === 0) {
      prev = i;
    }
    curBusy += busy[i];
  }
  if (prev !== null && prev < 24) ans.push([prev, 24]);
  return ans;
}
