

function upperBound(arr, x) {
    for (let i=0; i< arr.length; i++) {
        if (arr[i] > x) return i
    }
    return arr.length + 1;
}

function upperBoundOptimized(arr, x) {
    let ans = arr.length;
    let left = 0, right = arr.length-1;

    while(left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] > x) {
            ans = mid;
            right = mid-1;
        } else {
            left = mid+1;
        }
    }
    return ans;
}



const arr = [3, 5, 8, 9, 15, 19]; // ans: 4
const x = 9;
console.log("where x is 9: ",upperBoundOptimized(arr, x));
console.log("where x is 21: ",upperBoundOptimized(arr, 21));
