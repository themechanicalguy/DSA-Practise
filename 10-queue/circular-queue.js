// Circular queue must have limited size otherwise circular queue cannot be created.
// Size must be passed while creating Circular Queue

class CirculatQueue {
  constructor(size) {
    this.size = size;
    this.queue = new Array(size);
    this.frontIndex = -1;
    this.backIndex = -1;
  }
  isFull() {
    return (
      (this.frontIndex === 0 && this.backIndex === this.size - 1) ||
      (this.backIndex === this.frontIndex - 1 + this.size) % this.size
    );
  }

  isEmpty() {
    return this.frontIndex === -1;
  }
  enqueue(data) {
    if (this.isFull()) return "Queue is Full";
    if (this.isEmpty()) {
      this.frontIndex = 0;
      this.backIndex = 0;
    } else {
      this.backIndex = (this.backIndex + 1) % this.size;
    }
    this.queue[this.backIndex] = data;
    return `${data} is enqueued`;
  }

  dequeue() {
    let item;
    if (this.isEmpty()) return "Queue is empty";
    if (this.frontIndex === this.backIndex) {
      item = this.queue[this.frontIndex];
      this.frontIndex = -1;
      this.backIndex = -1;
    } else {
      item = this.queue[this.frontIndex];
      this.frontIndex = (this.frontIndex + 1) % this.size;
    }
    return `${item} is dequeued`;
  }

  displayQueue() {
    if (this.isEmpty()) return "Queue is empty";
    let i = this.frontIndex;
    do {
      console.log(this.queue[i]);
      i = (i + 1) % this.size;
    } while (i !== (this.rear + 1) % this.size);
  }

  getFront() {
    if (this.isEmpty()) return "Queue is Empty";
  }

  getRear() {
    if (this.isEmpty()) return "Queue is Empty";

    return this.queue[this.rear];
  }
}
