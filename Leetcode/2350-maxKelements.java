// 2530. Maximal Score After Applying K Operations
// https://leetcode.com/problems/maximal-score-after-applying-k-operations/
// Difficulty: Medium

// class Solution {
//     public long maxKelements(int[] nums, int k) {
//         long ans = 0;
//         PriorityQueue<Long> pQueue = new PriorityQueue<Long>((a, b) -> Long.compare(b,a));
//         for (int i: nums) {
//             pQueue.offer((long)i);
//         }

//         for (long i=0; i<k;i++) {
//             long val = pQueue.poll();
//             ans += val;
//             pQueue.offer((long) Math.ceil((double)val/3));
//         }

//         return ans;
//     }
// }

class Solution {
    public long maxKelements(int[] nums, int k) {
      long ans = 0;
      Queue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
  
      for (final int num : nums)
        maxHeap.offer(num);
  
      for (int i = 0; i < k; ++i) {
        final int num = maxHeap.poll();
        ans += num;
        maxHeap.offer((num + 2) / 3); // num +2 is because we dont have to make a seperate typecast
      }
  
      return ans;
    }
  }