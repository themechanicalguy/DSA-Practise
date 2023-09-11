/**
There are n people that are split into some unknown number of groups. Each person is labeled with a unique ID from 0 to n - 1.

You are given an integer array groupSizes, where groupSizes[i] is the size of the group that person i is in. For example, if groupSizes[1] = 3, then person 1 must be in a group of size 3.

Return a list of groups such that each person i is in a group of size groupSizes[i].

Each person should appear in exactly one group, and every person must be in a group. If there are multiple answers, return any of them. It is guaranteed that there will be at least one valid solution for the given input.

Example 1:
Input: groupSizes = [3,3,3,3,3,1,3]
Output: [[5],[0,1,2],[3,4,6]]
Explanation: 
The first group is [5]. The size is 1, and groupSizes[5] = 1.
The second group is [0,1,2]. The size is 3, and groupSizes[0] = groupSizes[1] = groupSizes[2] = 3.
The third group is [3,4,6]. The size is 3, and groupSizes[3] = groupSizes[4] = groupSizes[6] = 3.
Other possible solutions are [[2,1,6],[5],[0,4,3]] and [[5],[0,6,2],[4,3,1]].

Example 2:
Input: groupSizes = [2,1,3,3,3,2]
Output: [[1],[0,5],[2,3,4]]
 */
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function (groupSizes) {
  const ans = {};

  const insert = (arr, size, i) => {
    // if (!arr[size]) arr[size] = [];
    let last = arr[arr.length - 1];
    if (last.length === size) {
      last = [];
      arr.push(last);
    }
    last.push(i);
    // console.log(last);
  };

  for (let i = 0; i < groupSizes.length; i++) {
    let size = groupSizes[i];
    if (!ans[size]) ans[size] = [[]];
    insert(ans[size], size, i);
    // console.log(ans)
  }
  return Object.values(ans).flat();
};

/**
  class Solution {
      public List<List<Integer>> groupThePeople(int[] groupSizes) {
          List<List<Integer>> res = new ArrayList<>();
          HashMap<Integer, ArrayList<Integer>> map = new HashMap<>();

          for (int i = 0; i < groupSizes.length; i++) {
              int g = groupSizes[i];
              if (!map.containsKey(g)) {
                  map.put(g, new ArrayList<>());
              }

              ArrayList<Integer> l = map.get(g);
              l.add(i);

              if (l.size() == g) {
                  res.add(new ArrayList<>(l));
                  l.clear();
              }
          }

          return res;
      }
  }
 */

var groupThePeople2 = function (groupSizes) {
  let res = [];
  const map = new Map();

  for (let i = 0; i < groupSizes.length; i++) {
    let g = groupSizes[i];
    if (!map.has(g)) {
      map.set(g, []);
    }

    let l = map.get(g);
    l.push(i);

    if (l.length == g) {
      res.push(l);
      map.set(g, []);
    }
  }

  return res;
};

// THis is as far my best solution
var groupThePeople3 = function (groupSizes) {
  let res = [];
  const map = {};

  for (let i = 0; i < groupSizes.length; i++) {
    let g = groupSizes[i];
    if (!map[g]) {
      map[g] = [];
    }

    let l = map[g];
    l.push(i);

    if (l.length == g) {
      res.push(l);
      map[g] = undefined;
    }
  }

  return res;
};
