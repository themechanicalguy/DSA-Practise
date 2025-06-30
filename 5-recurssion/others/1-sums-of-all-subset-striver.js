/** Author: Venkat @ Zesova */

const val = [5,2,1];

function findSubsetSum(arr, index, sum, subsetSum) {
    if (arr.length === index) {
        subsetSum.push(sum);
        return;
    }
    //Unpick
    findSubsetSum(arr, index+1, sum, subsetSum);
    //Pick
    findSubsetSum(arr, index+1, sum+arr[index], subsetSum);
}

function Helper (arr) {
    const result = [];
    findSubsetSum(arr, 0, 0, result);
    // console.log(result);
    return result
}

console.log(Helper(val))