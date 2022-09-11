/**
 * Diffk
medium
36.2% Success
Asked In:
Facebook

Given an array ‘A’ of sorted integers and another non negative integer k, 
find if there exists 2 indices i and j such that A[i] - A[j] = k, i != j.

    Example:

    Input :

    A : [1 3 5] 
    k : 4

    Output : YES

    as 5 - 1 = 4

Return 0 / 1 ( 0 for false, 1 for true ) for this problem

Try doing this in less than linear space complexity.

 */

diffPossible : function(A, B){
        // const map = new Map();
        let left = 0;
        let right = 1;
        while(right < A.length){
            let diff = A[right] - A[left];
            if( diff === B ){
                return 1;
            }
            if(diff < B){
                right++;
            }else{
                left++;
                if(left === right) right++;
            }
        }
        return 0;
        
        

	}
