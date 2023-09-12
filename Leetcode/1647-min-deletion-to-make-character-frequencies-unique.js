/**
 * @param {string} s
 * @return {number}
 */
var minDeletions = function(s) {
    const arr = new Array(26).fill(0);
    const freq = new Set();
    for (let i=0; i< s.length; i++) {
        arr[s.charCodeAt(i) - 97]++;
    }
    let ans =0;
    // console.log(arr)
    for (let i=0; i<26; i++) {
        while(arr[i]!=0 && freq.has(arr[i])) {
            arr[i]--;
            ans++;
        }
        freq.add(arr[i])
    }
    return ans;
};
