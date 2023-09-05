/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  //   const DP = new Map();

  //   const copy = (head) => {
  //   if (head == null) return null;
  //   if (DP.has(head)) return DP.get(head);

  //   const newNode = new Node(head.val);
  //   DP.set(head, newNode);
  //   newNode.next = copyRandomList(head.next);
  //   newNode.random = copyRandomList(head.random);
  //   return newNode;
  // }

  //  return copy(head);

  let pmap = new Map(),
    dummy = {},
    curr = head,
    copy = dummy;
  while (curr) {
    let newNode = new Node(curr.val, null, null);
    pmap.set(curr, newNode);
    (copy.next = newNode), (copy = newNode), (curr = curr.next);
  }
  (curr = head), (copy = dummy.next);
  while (curr) {
    copy.random = pmap.get(curr.random);
    (curr = curr.next), (copy = copy.next);
  }
  return dummy.next;
};
