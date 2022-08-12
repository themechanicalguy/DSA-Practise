// Write a function which takes a string and returns counts of each alphanumeric character in the string.
// Consider lowercase characters for the string
function charCount(str) {
  const storageObj = {};
  for (let char of str) {
    let code = char.toLowerCase();
    // if (storageObj[code] > 0) {
    //   storageObj[code]++;
    // } else {
    //   storageObj[code] = 1;
    // }

    // check if the char is alphanumeric or not -- exception for  ' ', symbols
    //using regex
    // if ("/[0-9a-b]/".check(code)) {
    //   if (storageObj[code] > 0) {
    //     storageObj[code]++;
    //   } else {
    //     storageObj[code] = 1;
    //   }
    // }
    if (isAlphaNumeric(code)) {
      storageObj[code] = storageObj[code]++ || 1;
    }
  }
  return storageObj;
}

function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && //numeric
    !(code > 64 && code < 91) && //A-Z
    !(code > 96 && code < 123) //a-z
  )
    return false;
  else return true;
}
