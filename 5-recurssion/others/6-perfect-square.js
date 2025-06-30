/** LC - 279
 * @param {number} n
 * @return {number}
 */
var numSquaresHelper = function(n) {

    // base
    if(n===0) return 1;
    if(n < 0) return 0;

    let ans = Infinity;
    let end = Math.floor(Math.sqrt(n));
    let i=1;
    while(i <= end){
        let perfectSquare = i * i;
        let numberOfPerfectSquares = 1 + numSquaresHelper(n - perfectSquare);
        // console.log(numberOfPerfectSquares)
        if(numberOfPerfectSquares < ans){
            ans = numberOfPerfectSquares;
        }
        i++;
        
    }
    return ans;
    
};

var numSquares = function(n){
    return numSquaresHelper(n) - 1;
}