function gasStation(gas, cost) {
  //deficit of gas
  let deficit = 0;
  //balance gas
  let balance = 0;
  //starting point to complete route
  let start = 0;

  //traversing the gas stations
  for (let i = 0; i < gas.length; i++) {
    balance += gas[i] - cost[i];

    //balance is negative
    if (balance < 0) {
      deficit += Math.abs(balance);

      //optimized approach - start fresh from next point where you got deficit
      start += i + 1;
      balance = 0;
    }
  }
  if (balance >= deficit) return start;
  return -1;
}
