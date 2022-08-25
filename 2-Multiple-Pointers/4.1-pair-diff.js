/**
 * Given an integer array and a positive integer k, count all distinct pairs with differences equal to k. 

Examples: 

Input: arr[] = {1, 5, 3, 4, 2}, k = 3
Output: 2
There are 2 pairs with difference 3, the pairs are {1, 4} and {5, 2} 

Input: arr[] = {8, 12, 16, 4, 0, 20}, k = 4
Output: 5
There are 5 pairs with difference 4, the pairs are {0, 4}, {4, 8}, 
{8, 12}, {12, 16} and {16, 20} 
 */

//Approach
// 1- Sort the array
// pair = 0
// 2- [1,2,3,4,5] 
// Iter -1 
//  l=0, r= 1
//  diff = arr[r] - arr[l]  --> 2 - 1 = 1 (< k)
// if diff == k, add 1 to the pair , l++, r--
// if diff < k , r++  => r = 2
//  diff = 3- 1 = 2 < k, r++; r= 3
//  diff = 4-1 = 3 == k, pair++, r++, r= 4
//  diff = 5-1 = 4 > k,l++ l=1,
// diff = 5-2 =3 == k 
// if diff > k, r--

function pairDiff(arr,k){
    arr.sort((a,b)=>a-b);
    let l = 0;
    let r = 1;
    let pair = 0;
    while(r<arr.length){
        let diff = arr[r] - arr[l];
        if(diff === k){
            pair++;
            r++;
        }else if(diff < k){
            r++;
        }else{
            l++;
        }
    }
}