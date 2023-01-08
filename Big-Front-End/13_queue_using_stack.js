// https://bigfrontend.dev/problem/implement-a-queue-by-using-stack

/* you can use this Class which is bundled together with your code

class Stack {
  push(element) { // add element to stack }
  peek() { // get the top element }
  pop() { // remove the top element}
  size() { // count of element }
}
*/

/* Array is disabled in your code */

// you need to complete the following Class
class Queue {
  constructor() {
    this.pushStack = new Stack();
    this.popStack = new Stack();
    this.length = 0;
    // this = new Stack();
    // this.length = 0;
  }
  enqueue(element) {
    // add new element to the rare
    this.pushStack.push(element);
    // this.length++;
  }
  _move() {
    while (this.pushStack.size() > 0) {
      this.popStack.push(this.pushStack.pop());
    }
  }
  peek() {
    // get the head element
    if (this.popStack.size() > 0) {
      return this.popStack.peek();
    }

    this._move();
    return this.popStack.peek();
  }
  size() {
    // return count of element
    return this.popStack.size() + this.pushStack.size();
  }
  dequeue() {
    // remove the head element
    if (this.popStack.size() > 0) {
      return this.popStack.pop();
    }
    this._move();
    return this.popStack.pop();
  }
}

const queue = new Queue([1, 2, 3]);
queue.enqueue(1);
queue.enqueue(2);
console.log(queue);
