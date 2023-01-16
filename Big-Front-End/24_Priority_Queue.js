// complete the implementation
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.compare = compare;
    this.arr = [];
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.arr.length;
  }

  /**
   * returns the head element
   */
  peek() {
    return this.arr[0];
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    // if (this.size() === 0) {
    //   this.arr.push(element)
    // }
    for (let i = 0; i < this.size(); i++) {
      if (this.compare(element, this.arr[i]) < 0) {
        this.arr = [...this.arr.slice(0, i), element, ...this.arr.slice(i)];
        return;
      }
    }
    this.arr.push(element);
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    return this.arr.shift();
  }
}

const pq = new PriorityQueue((a, b) => a - b);
pq.add(5);
pq.add(3);
pq.add(1);
pq.add(4);
pq.add(2);
const result = [];
while (pq.size() > 0) {
  result.push(pq.poll());
}

console.log(result);

/**
 * Below the Priority Queue is executed with Linked list
 */

class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}

// complete the implementation
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.compare = compare;
    this.queue = null;
    this.length = 0;
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.length;
  }

  /**
   * returns the head element
   */
  peek() {
    if (this.queue === null) {
      return undefined;
    }
    return this.queue.val;
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    if (this.queue === null) {
      this.queue = new Node(element);
    } else {
      let currNode = this.queue;
      let prevNode = null;
      while (currNode !== null && this.compare(element, currNode.val) > 0) {
        prevNode = currNode;
        currNode = currNode.next;
      }
      if (prevNode === null) {
        this.queue = new Node(element, this.queue);
      } else {
        prevNode.next = new Node(element, prevNode.next);
      }
    }

    this.length += 1;
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    if (this.queue === null) {
      return undefined;
    }
    const elem = this.queue.val;
    this.queue = this.queue.next;
    this.length--;
    return elem;
  }
}

const printQueue = (q) => {
  let cNode = q;
  const a = [];
  while (cNode !== null) {
    a.push(cNode.val);
    cNode = cNode.next;
  }
  return a;
};
