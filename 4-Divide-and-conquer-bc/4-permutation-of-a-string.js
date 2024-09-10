function swap(str, i, j) {
  return ([str[i], str[j]] = [str[j], str[i]]);
}
function permutation(str, i) {
  //base case
  if (i >= str.length) {
    console.log(str);
    return str;
  }
  for (let j = i; j < str.length; j++) {
    swap(str, i, j);
    permutation(str, i + 1);
    //backtracking
    swap(str, i, j);
  }
}
permutation(["a", "b", "c"], 0);
