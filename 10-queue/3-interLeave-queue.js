//Interleaf first and second half of the queue.

//boilerplate code
class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    // return item + "inserted";
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
  isEmpty() {
    return this.frontIndex === this.backIndex;
  }
  get printQueue() {
    // return this.items?.map((item) => console.log(item));
    return Object.values(this.items).map((item) => console.log(item));
  }
}

function interLeafQueue(qu, size) {
  //empty check
  if (qu.isEmpty()) return;
  let k = Math.floor(size / 2);
  let count = 0;
  let newQu = new Queue();

  //push 1st half element of qu to newQu
  while (!qu.isEmpty()) {
    newQu.enqueue(qu.dequeue());
    count++;

    if (count === k) {
      break;
    }
  }

  //start interleafing
  while (!qu.isEmpty() && !newQu.isEmpty()) {
    //push from newQu to qu
    qu.enqueue(newQu.dequeue());
    //push from qu to newQu
    qu.enqueue(qu.dequeue());
  }

  if (!size % 2 === 0) qu.enqueue(qu.dequeue());

  return qu;
}

const qu = new Queue();
qu.enqueue(10);
qu.enqueue(20);
qu.enqueue(30);
qu.enqueue(40);
qu.enqueue(50);
qu.enqueue(60);
qu.enqueue(70);
qu.enqueue(80);
qu.enqueue(90);
// qu.enqueue(100);
// console.log(qu);

let res = interLeafQueue(qu, 9);
console.log(res);
