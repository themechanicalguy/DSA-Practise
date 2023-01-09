class Solution {
  public:
    // Program for zig-zag conversion of array
    void zigZag(int arr[], int n) {
        // code here
        for (int i=0; i<n-1; i++) {
            bool doSwap = false;
            if (i % 2 == 0) {
                if (arr[i] > arr[i+1]) {
                    doSwap = true;
                }
            } else {
                if (arr[i] < arr[i+1]) {
                    doSwap = true;
                }
            }
            
            if (doSwap) {
                int temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
            
        }
    }
};