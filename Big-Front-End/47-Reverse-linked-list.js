class Node {
  val;
  next;
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {Node} list
 * @return {Node}
 */
const reverseLinkedList = (list) => {
  // your code
  let prev = null;
  let next;
  let current = list;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  list = prev;
  return list;
};

const Four = new Node(4, null);
const Three = new Node(3, Four);
const Two = new Node(2, Three);
const One = new Node(1, Two);

/**
 * class Node {
 *  new(val: number, next: Node);
 *    val: number
 *    next: Node
 * }
 */

/**
 * @param {Node} list
 * @return {Node}
 */
const reverseLinkedListRecursive = (list) => {
  if (!list || !list.next) return list;

  let newHead = reverseLinkedList(list.next);

  list.next.next = list;
  list.next = null;

  return newHead;
};

const reverseLinkedListCool = (list) => {
  let node = list,
    prev = null;
  while (node !== null) {
    [node.next, node, prev] = [prev, node.next, node];
  }
  return prev;
};

reverseLinkedList(One); // ONe is the head of the list so reversing one

console.log(Four); // Four will be the head after the reversal so consoling Four
