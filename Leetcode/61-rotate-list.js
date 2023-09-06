/**
Given the head of a linked list, rotate the list to the right by k places.
Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

Example 2:
Input: head = [0,1,2], k = 4
Output: [2,0,1]

 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!(head && head.next)) return head;
  if (k == 0) return head;

  const getLenTail = (tail) => {
    let len = 1;
    while (tail.next) {
      tail = tail.next;
      len++;
    }
    return [len, tail];
  };

  const [length, tail] = getLenTail(head);
  if (k % length == 0) return head;
  const steps = k % length;

  let newTail = head;
  for (let i = steps; i < length - 1; i++) {
    newTail = newTail.next;
  }

  tail.next = head;
  head = newTail.next;
  newTail.next = null;
  return head;
};
