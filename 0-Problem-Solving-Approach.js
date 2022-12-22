// Problem Statement - Write a function which takes a string and returns counts of each alphanumeric character in the string.
// Consider lowercase characters for the string

/**
 *
 * @problem solving approach
 * 1 - Can I restate the Problem on my own words?
 * 2- What are the Inputs that go into the problem
 * 3- What are the Outputs that should come from the soln to the problem?
 * 4 - Can the Output be determined from the inputs ? In other words, do I have enough information to solve the problem.
 * 5- How should I label the important piece of data that are part of the problem?
 */
function charCount(str) {
  // make an obj to return at end
  const storageObj = {};
  // loop over string
  for (let char of str) {
    let code = char.toLowerCase();
    // if (storageObj[code] > 0) {    ----//Need to refactor
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
    // Check if char is alphanumeric or not
    if (isAlphaNumeric(code)) {
      // if it is alphanumeric increment it by 1
      storageObj[code] = (storageObj[code] || 0) + 1; // ------Reafctored code
    }
  }
  return storageObj;
}
//H1Ellooi
function isAlphaNumeric(code) {
  let code = strng.charCodeAt(0);
  if (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  ) {
    return true;
  } else {
    return false;
  }
}
