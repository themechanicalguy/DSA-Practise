/**
 * '1', first number is 1
'11', since previous number has One(1) 1
'21', since previous number has Two(2) 1s
'1211', since previous number has One(1) 2 and One(1) 1
'111221', since previous number has One(1) 1, One(1) 2, Two(2) 1s
'312211', since previous number has Three(3) 1s, Two(2) 2s, One(1) 1
....
 */
function getNthNum(n) {
  let currentSeq = '1';
  for (let i = 1; i < n; i++) {
    let j = 0;
    let nextSeq = '';
    while (j < currentSeq.length) {
      let currentChar = currentSeq[j];
      let count = 1;
      j++;
      while (currentChar === currentSeq[j]) {
        count++;
        j++;
      }
      nextSeq = nextSeq + count + currentChar;
    }
    currentSeq = nextSeq;
  }
  console.log(currentSeq);
}

getNthNum(6);
