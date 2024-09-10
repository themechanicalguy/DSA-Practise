// https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/submissions/

class ListNode {
  int val;
  ListNode next;

  public ListNode(int val, ListNode next) {
    this.val = val;
    this.next = next;
  }
}

class InsertGCDLinkedList {
  public ListNode insertGreatestCommonDivisors(ListNode head) {
    for (ListNode pre = head, cur = head.next; cur != null; cur = cur.next) {
      int x = gcd(pre.val, cur.val);
      pre.next = new ListNode(x, cur);
      pre = cur;
    }
    return head;
  }

  private int gcd(int a, int b) {
    if (b == 0) {
      return a;
    }
    return gcd(b, a % b);
  }
}