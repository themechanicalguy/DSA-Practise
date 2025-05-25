function encode(strs) {
  let res = "";
  for (let str of strs) res += str.length + "#" + str;
  return res;
}

function decode(str) {
  let res = [];
  let i = 0;
  while (i < str.length) {
    let j = i;
    while (str[j] !== "#") j++;

    let length = parseInt(str.substring(i, j));
    i = j + 1;
    j = i + length;
    res.push(str.substring(i, j));
    i = j;
  }
  return res;
}

const Inp = ["neet", "code", "love", "you"];
decode(encode(Inp));
