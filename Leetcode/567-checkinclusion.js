
// 567. Permutation in String
// https://leetcode.com/problems/permutation-in-string/
// diff: medium
// sliding window && constant moving window

// Solution I have tried
var checkInclusion = function(s1, s2) {
    let freq = {};
    const ori = {};
    let len = s1.length;

    for (const i of s1) {
        freq[i] = (freq[i] ?? 0) + 1;
        ori[i] = (ori[i] ?? 0) + 1;
    }

    for (let i=0; i<s2.length; ) {
        if (!freq[s2[i]]) {
            i = i-(s1.length-len)+1;
            len = s1.length;
            freq = structuredClone(ori);
        } else {
            freq[s2[i]]--;
            len--;
            i++;
        }
        if (len <= 0) return true;
    }
    return false;
};


// Solution that I learnt from link: https://walkccc.me/LeetCode/problems/567/#__tabbed_2_2
var checkInclusion = function(s1, s2) {
    const A = 'a'.charCodeAt(0);
    const count = new Array(26).fill(0);
    let req = s1.length;

    for (const i of s1) {
        count[i.charCodeAt(0)-A]++;
    }

    for (let l=0,r=0; r<s2.length; r++) {
        if (--count[s2.charCodeAt(r)-A] >= 0) {
            --req;
        }

        while (req == 0) {
            if (s1.length == r-l+1) return true;
            if (++count[s2.charCodeAt(l++)-A] > 0 ) req++;

        }
    }
    return false;
};