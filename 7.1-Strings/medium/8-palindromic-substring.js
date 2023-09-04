// LC - 647 - Palindromic substring

function expandAroundIndex(str, left, right) {
  let count = 0;
  //jab tak match karega, tak tak increment karte raho, left-- aur right++
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    count++;
    left--;
    right++;
  }
  return count;
}

function countSubstring(str) {
  let count = 0;
  let n = str.length;

  for (let center = 0; center < n; center++) {
    //odd
    let oddAns = expandAroundIndex(str, center, center);
    count += oddAns;
    let evenAns = expandAroundIndex(str, center, center + 1);
    count += evenAns;
  }
  return count;
}
