
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    let str;
    for(let i =parseInt(s.length/2); i>=1; i--) {
        str = s.substring(0,i);
        if ( s.length % i === 0) {
            const count = parseInt(s.length / i);
            if (str.repeat(count) == s) {
                return true;
            }
        }
        // str += s.charAt(i);
        // console.log(str);
    }
    return false;
};
