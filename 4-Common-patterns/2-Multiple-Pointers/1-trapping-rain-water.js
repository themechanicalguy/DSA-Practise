//lC-42

//Brute Force- O(n2)
function trap(height) {
  if (!height.length) return 0;

  let n = height.length;
  let res = 0;

  for (let i = 0; i < n; i++) {
    let leftMax = height[i];
    let rightMax = height[i];

    for (let j = 0; j < i; j++) {
      leftMax = Math.max(leftMax, height[j]);
    }

    for (let j = i; j < n; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }

    res += Math.min(leftMax, rightMax) - height[i];
  }
  return res;
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);

//Most efficinent soln
//Two pointer Approach

function trap(height) {
  if (!height || height.length === 0) {
    return 0;
  }
  let l = 0;
  let r = height.length - 1;
  let leftMax = height[l];
  let rightMax = height[r];
  let res = 0;
  while (l < r) {
    if (leftMax < rightMax) {
      l++;
      leftMax = Math.max(leftMax, height[l]);
      res += leftMax - height[l];
    } else {
      r--;
      rightMax = Math.max(rightMax, height[r]);
      res += rightMax - height[r];
    }
  }
  return res;
}

trap([1, 0, 2, 1, 1, 3, 2]);
