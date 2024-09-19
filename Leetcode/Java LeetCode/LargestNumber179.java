//179. Largest Number
// https://leetcode.com/problems/largest-number/

class LargestNumber179 {
  public String largestNumber(int[] nums) {
    final String s = Arrays.stream(nums)
                         .mapToObj(String::valueOf)
                         .sorted((a, b) -> (b + a).compareTo(a + b))
                         .collect(Collectors.joining(""));
    return s.startsWith("00") ? "0" : s;
  }
};