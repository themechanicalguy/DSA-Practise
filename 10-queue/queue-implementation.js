//Queue is a data structure that follows FIFO principle.
//To implement a queue we need following methods.
// enqueue, dequeue, peek, isEmpty, printQueue

class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item + "inserted";
  }

  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
  peek() {
    return this.items[this.frontIndex];
  }
  get printQueue() {
    return this.items;
  }
}

const queue = new Queue();
console.log(queue.enqueue(0));
console.log(queue.enqueue(1));
console.log(queue.enqueue(2));
console.log(queue.enqueue(3));
console.log(queue.enqueue(4));
console.log(queue.enqueue(5));
console.log(queue.enqueue(6));
console.log(queue.peek());

let str = queue.printQueue;
