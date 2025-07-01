// 1691. Maximum Height by Stacking Cuboids 
// https://leetcode.com/problems/maximum-height-by-stacking-cuboids/description/

var maxHeight = function(cuboids) {
    for (let i=0; i<cuboids.length; i++){
        cuboids[i].sort((a, b) => a-b);
    }
    cuboids.sort((a, b) => (a[0] - b[0] || a[1] - b[1] || a[2] - b[2]));
    const lis = Array.from({length: cuboids.length}).fill(0);
    let ans = 0;

    for (let i=0;i<cuboids.length; i++){
        lis[i] = cuboids[i][2];
        for (let j=i-1; j>=0; j--) {
            if (cuboids[i][0] >= cuboids[j][0] && cuboids[i][1] >= cuboids[j][1] && cuboids[i][2] >= cuboids[j][2]) {
                lis[i] = Math.max(lis[i], cuboids[i][2]+lis[j]);
            }
        }
        ans = Math.max(ans, lis[i]);
    }
    return ans;
};