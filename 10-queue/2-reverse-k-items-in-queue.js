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

function reverseKQueue(qu, k, size) {
  if (k === 0 || k > size) return;
  //create stack
  let st = [];
  let count = 0;

  while (!qu.isEmpty()) {
    //dequeue it
    let el = qu.dequeue();
    st.push(el);
    count++;
    if (count === k) break;
  }

  //push elements from stack to queue
  while (st.length !== 0) {
    qu.enqueue(st.pop());
  }

  //main logic --try dry run again
  count = 0;
  while (!qu.isEmpty() && size - k !== 0) {
    let el = qu.dequeue();
    qu.enqueue(el);
    count++;
    if (count === size - k) break;
  }
  //   return qu;
}

const qu = new Queue();
qu.enqueue(3);
qu.enqueue(5);
qu.enqueue(9);
qu.enqueue(12);
qu.enqueue(19);
console.log(qu);
reverseKQueue(qu, 3, 5);
console.log(qu);
