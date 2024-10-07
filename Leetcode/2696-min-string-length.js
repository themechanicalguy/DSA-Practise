// 2696. Minimum String Length After Removing Substrings
// https://leetcode.com/problems/minimum-string-length-after-removing-substrings/
// Diff: Easy
// Stack gives optimal solution
/**
 * @param {string} s
 * @return {number}
 */
var minLength = function(s) {
    let i = 0;
    while (s.length > i+1) {

        const consectiveStr = s[i]+s[i+1];
        if ( consectiveStr === "AB" || consectiveStr === "CD" ) {
            s = s.substr(0,i) + s.substr(i+2);
            if (i>0) i--;
            continue;
        }
        i++;

    }
    return s.length;
};


//Optimal Solution
var minLength = function(s) {
    const stack=[];
    for (const j of s) {
        if (j==='B' && stack[stack.length-1] === 'A') {
            stack.pop();
        } else if (j==='D' && stack[stack.length-1] === 'C') {
            stack.pop();
        } else {
            stack.push(j);
        }

    }
    return stack.length;
};