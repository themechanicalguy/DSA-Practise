// Time complexity of this kind of question is 2^(n-1) leading to 2^n

const findAllSubArrayGroup = (arr) => {
    const ans = [];

    function _findAllSubArrayGroup(arr, sol, ind) {
        if (ind==arr.length) {
            ans.push([...sol]);
            return;
        }
        let val = '';
        for (let i=ind; i<arr.length; i++) {
            val += arr[i];
            sol.push(val);
            _findAllSubArrayGroup(arr, sol, i+1);
            sol.pop();
        }

        return;
    }
    _findAllSubArrayGroup(arr, [], 0)
    return ans;
    
}

const arr = [1, 2, 3, 4, 5]
findAllSubArrayGroup(arr);