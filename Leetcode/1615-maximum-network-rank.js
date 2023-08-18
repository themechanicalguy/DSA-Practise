/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximalNetworkRank = function (n, roads) {
  if (roads.length < 2) return roads.length;

  // const findifCityConnected = (a,b) => {
  //     for (let i=0; i<roads.length; i++) {
  //         if (a === roads[i][0] && b === roads[i][1]) return 1
  //         if (a === roads[i][1] && b === roads[i][0]) return 1
  //     }
  //     return 0;
  // }
  // count number of roads a city has
  const connectedCity = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill(false));
  const cityR = new Array(n).fill(0);
  // since we are checking 2 roads we can use 2 variables to store first max and 2nd max index position

  for (let i = 0; i < roads.length; i++) {
    cityR[roads[i][0]]++;
    cityR[roads[i][1]]++;
    connectedCity[roads[i][0]][roads[i][1]] = true;
    connectedCity[roads[i][1]][roads[i][0]] = true;
  }

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      res = Math.max(res, cityR[i] + cityR[j] - (connectedCity[i][j] ? 1 : 0));
    }
  }
  // console.log(cityR, city)
  return res;
};
