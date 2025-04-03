//Given 2 strings, one long string and a small string.
//your task is to find the number of occurence of the small string in long string.
// i.e wowomgzomg , omg
// output 2

//make one pointer j = 0, for small string
//variable to store the lenght of small string
//start a loop fro the 1st string
//if char of 1st string === char of string 2 , then increment j

console.log(stringSearch("wowomgzomg", "omg"));
function stringSearch(str1, str2) {
  // let j = 0;
  // let count = 0;
  // let M = str1.length;
  // let N = str2.length;
  // for (let i = 0; i < M; i++) {
  //   if (str1[i] === str2[j]) {
  //     j++;
  //   }
  //   if (j === N) {
  //     count++;
  //     j = 0;
  //   }
  // }
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1[i + j] !== str2[j]) {
        break;
      }
      if (j === str2.length - 1) {
        count++;
      }
    }
  }
  return count;
}

//KMP String search algorithm
