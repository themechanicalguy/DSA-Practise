/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    const n = ratings.length;

    let ans = 0;
    const l = new Array(n).fill(1);
    const r = new Array(n).fill(1);

    for (let i = 1; i < n; ++i)
      if (ratings[i] > ratings[i - 1])
        l[i] = l[i - 1] + 1;

    for (let i = n - 2; i >= 0; --i)
      if (ratings[i] > ratings[i + 1])
        r[i] = r[i + 1] + 1;

    for (let i = 0; i < n; ++i)
      ans += Math.max(l[i], r[i]);

    return ans;
};


// Good Optimized solution
var candy1 = function(ratings) {
        if(ratings == null || ratings.length == 0) return 0;
        const count = new Array(ratings.length);
        count[0] = 1;
        for(let i=1;i<ratings.length;i++){
            if(ratings[i] > ratings[i-1]){
                count[i] = count[i-1] + 1;
            }else{
                count[i] = 1;
            }
        }
        let res = count[ratings.length-1];

        for(let i=ratings.length-1; i >0;i--){
            if(ratings[i-1] > ratings[i] && count[i-1] <= count[i]){
                count[i-1] = count[i] + 1;
            }
            res += count[i-1];
        }

        return res;
};
