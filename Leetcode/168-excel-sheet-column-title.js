/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    let result = '';
    let temp = columnNumber;
    // const charCodeA = 'A'.charCodeAt(0);
    const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    while (temp > 0) {
        let char = (temp-1)%26;
        temp = parseInt((temp - 1) / 26)
        result = Alphabets[char] + result;
    }
    return result;
};
