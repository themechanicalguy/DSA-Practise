/** Author: Venkat @ Zesova */
const val = [2,2,1];
function _findAllUniqueSubset(arr, index, tempArr, subsetArr) {
    // console.log(index,'index')
    subsetArr.push(tempArr);
    for(let i = index; i<arr.length;i++) {
        if (i!=index && (arr[i] == arr[i-1])) continue; 
        _findAllUniqueSubset(arr, i+1, [...tempArr,arr[i]], subsetArr);
    }
}

function findAllUniqueSubset (arr) {
    const result = [];
    arr.sort((a,b) => a - b)
    _findAllUniqueSubset(arr, 0, [], result);
    return result
}

console.log(findAllUniqueSubset(val),' Value is this')