/** LC-204
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  if (n === 0) return 0;
  let prime = new Array(n);
  prime.fill(true);
  prime[0] = false;
  // console.log(prime);
  let count = 0;

  for (let i = 2; i < n; i++) {
    //10
    if (prime[i]) {
      //true
      count++; //4
      let j = 2 * i; //14
      while (j < n) {
        //T
        prime[j] = false;
        j = j + i; //9
      }
    }
  }
  return count;
};
