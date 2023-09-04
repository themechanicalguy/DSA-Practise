/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let tor = head;
  let rab = head;

  while (rab?.next?.next) {
    rab = rab.next.next;
    tor = tor.next;
    if (rab === tor) return true;
  }
  return false;
};
