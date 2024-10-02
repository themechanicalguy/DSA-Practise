// https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/description/
// 1497. Check If Array Pairs Are Divisible by k
// Difficulty: Medium

class ArrayPairsDivisibleByK {
  public boolean canArrange(int[] arr, int k) {
    int[] count = new int[k];

    for (int a : arr) {
      a %= k;
      ++count[a < 0 ? a + k : a];
    }

    if (count[0] % 2 != 0)
      return false;

    for (int i = 1; i <= k / 2; i++)
      if (count[i] != count[k - i])
        return false;

    return true;
  }
}