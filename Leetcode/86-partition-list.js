/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  // console.log(head);
  // while (head != null) {
  //     console.log(head.val, 'head')
  //     head = head.next;
  // }
  // return head;
  let xPointer = head;
  let prev = null;
  // part to find the first position of where the val is greater than x
  while (xPointer?.val < x) {
    prev = xPointer;
    xPointer = xPointer.next;
  }
  // console.log(xPointer.val)
  // return head;

  let itprev = xPointer;
  let iterate = itprev?.next ?? null;
  while (iterate !== null) {
    if (iterate.val < x) {
      if (prev == null) {
        prev = iterate;
        head = prev;
      }

      itprev.next = itprev.next.next;
      prev.next = iterate;
      prev = iterate;
      iterate.next = xPointer;
      iterate = itprev.next;
    } else {
      itprev = iterate;
      iterate = itprev.next;
    }
  }
  return head;
};

const head = [1, 4, 3, 2, 5, 2],
  x = 3;
// Output: [1,2,2,4,3,5]
partition(head, x);

// Example 2:
const head2 = [2, 1],
  x1 = 2;
// Output: [1,2]
partition(head2, x1);
