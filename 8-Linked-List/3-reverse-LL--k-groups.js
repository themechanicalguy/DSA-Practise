function reverseKnodes(head, k) {
  //empty case
  if (head) return null;

  //invalid case
  if (k > this.length) return head;

  //reverse first k nodes

  let curr = head;
  head = this.tail;
  this.tail = curr;

  let prev = null;
  let count = 0;
  while (count < k) {
    const forwardNode = curr.next;
    curr.next = prev;

    prev = curr;
    curr = forwardNode;

    count++;
  }

  if (forwardNode) {
    head.next = reverseKnodes(forwardNode, k);
  }

  return prev;
}
