class Solution {
    public String removeDuplicateLetters(String s) {
        int [] res = new int[26];
        boolean [] vis = new boolean [26];
        char[] chars = s.toCharArray();
        Stack<Character> st = new Stack<>();
        for(char c: chars){
            res[c - 'a']++;
        }
        int index = -1;
        for (char c: chars){
            index = c - 'a';
            res[index] --;
            if (vis[index])
                continue;
            while (!st.isEmpty() && c < st.peek() && res[st.peek() - 'a']!= 0){
                char top = st.pop();
                vis[top - 'a'] = false;
            }
            st.push(c);
            vis[index] = true;

        }

        StringBuilder sb = new StringBuilder();
        while (!st.isEmpty()){
            sb.insert(0, st.pop());
        }
        return sb.toString();
    }
}
