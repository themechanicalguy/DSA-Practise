//LC-198

//Space optimization
var rob = function (nums) {
  let rob1 = 0;
  let rob2 = 0;

  for (const num of nums) {
    const temp = Math.max(num + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
};
