
// https://leetcode.com/problems/count-the-number-of-consistent-strings/description/
import java.util.ArrayList;

public class CountConsistentString {
  public int countConsistentStrings(String allowed, String[] words) {
    // String name = "venkat";
    boolean[] list = new boolean[26];
    ArrayList<String> result = new ArrayList<String>();
    for (int i = 0; i < allowed.length(); i++) {
      list[allowed.charAt(i) - 97] = true;
    }

    for (int i = 0; i < words.length; i++) {
      String cur = words[i];

      boolean good = true;
      for (int j = 0; j < cur.length() && good; j++) {
        if (!list[cur.charAt(j) - 97])
          good = false;
      }
      if (good)
        result.add(cur);
    }
    return result.size();

  }
}