function replaceStr(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i].charCodeAt() === 32) {
      newStr += "@";
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}
const res = replaceStr("I am a hero");
console.log(res);
