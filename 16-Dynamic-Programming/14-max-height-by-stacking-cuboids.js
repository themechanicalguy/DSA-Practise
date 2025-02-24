//LC-1691 Maximum Height by Stacking Cuboids

var maxHeight = function (cuboids) {
  //1- sort all items of cuboids
  cuboids.forEach((cuboid) => cuboid.sort((a, b) => a - b));

  // //2- sort sorted cuboids bases of width
  cuboids.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  const n = cuboids.length;
  const dp = cuboids.map((c) => c[2]);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (
        cuboids[i][0] >= cuboids[j][0] &&
        cuboids[i][1] >= cuboids[j][1] &&
        cuboids[i][2] >= cuboids[j][2]
      ) {
        dp[i] = Math.max(dp[i], dp[j] + cuboids[i][2]);
      }
    }
  }
  return Math.max(...dp);
};
