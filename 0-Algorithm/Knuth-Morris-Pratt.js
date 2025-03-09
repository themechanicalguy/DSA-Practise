const formLPS = (pattern) => {
  const lps = [-1, 0];
  let i = 1,
    patternPointer = 0;
  while (i < pattern.length) {
    if (pattern[patternPointer] === pattern[i]) {
      i++;
      patternPointer++;
      lps[i] = patternPointer;
    } else if (patternPointer > 0) {
      patternPointer = lps[patternPointer];
    } else {
      i++;
      lps[i] = patternPointer;
    }
  }
  console.log(lps, 'Venkat is this');
  return lps;
};

const kmpAlgo = (string, pattern) => {
  const lps = formLPS(pattern);
  let noOfMatches = 0;
  let patInd = 0,
    i = 0;
  while (i < string.length) {
    if (string[i] === pattern[patInd]) {
      patInd++;
      i++;
      if (patInd === pattern.length) {
        console.log('Hola is the name of the game and pattern is matched');
        noOfMatches++;
      }
    } else if (patInd > 0) {
      patInd = lps[patInd];
    } else {
      i++;
    }
  }
  return noOfMatches;
};

console.log(kmpAlgo('aaababaababacdef', 'aba'), 'no of matches found are');
