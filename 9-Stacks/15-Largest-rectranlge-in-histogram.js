//LC=84

var largestRectangleArea = function (heights) {
  heights.push(0);
  let stack = [];
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    let heightStart = i;
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      let [pos, height] = stack.pop();
      res = Math.max(res, (i - pos) * height);
      heightStart = pos;
    }
    stack.push([heightStart, heights[i]]);
  }
  return res;
};

largestRectangleArea([2, 1, 5, 6, 2, 3]); //10 revise again
