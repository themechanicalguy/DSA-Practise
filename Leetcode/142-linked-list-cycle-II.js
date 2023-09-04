/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// O(1) Space complexity problem
var detectCycle = function (head) {
  let tor = head;
  let slow = head;

  while (tor?.next?.next) {
    tor = tor.next.next;
    slow = slow.next;
    if (tor === slow) {
      slow = head;
      while (slow != tor) {
        slow = slow.next;
        tor = tor.next;
      }
      return tor;
    }
  }
  return null;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// O(N) time complexity problem
var detectCycle1 = function (head) {
  let tor = head;
  const pathTrack = new Set();

  while (tor) {
    if (pathTrack.has(tor)) return tor;
    pathTrack.add(tor);
    tor = tor.next;
  }
  return null;
};
