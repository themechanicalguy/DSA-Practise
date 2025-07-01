// 354. Russian Doll Envelopes
// https://leetcode.com/problems/russian-doll-envelopes/description/
/**
 * @param {number[][]} envelopes
 * @return {number}
 */

var compareEnv = (a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] === b[0] && a[1] > b[1]) return -1;
    return 1;
}

var binarySearch = (arr, val) => {
    let start = 0;
    let end = arr.length -1; 
    while (start <= end) {
        const mid = Math.floor((end + start) / 2)
        if (arr[mid] < val) {
            start = mid+1;
        } else {
            end = mid-1;
        }
    }

    return start;
}

var maxEnvelopes = function(envelopes) {
    envelopes.sort(compareEnv);

    const heightSeq = [envelopes[0][1]];

    for (let i=0; i<envelopes.length; ++i) {
        if (envelopes[i][1] > heightSeq[heightSeq.length-1]) {
            heightSeq.push(envelopes[i][1]);
        } else {
            const repInd = binarySearch(heightSeq, envelopes[i][1]);
            heightSeq[repInd] = envelopes[i][1];
        }
    }
    return heightSeq.length;
};