class Stacks {
  constructor() {
    this.items = [];
  }
  //push operation
  push(data) {
    this.items.push(data);
  }
  pop() {
    //check underflow conditions
    if (this.items.length === 0) return "Undeflow";
    return this.items.pop();
  }
  //peek
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  printStack() {
    let sequence = " ";
    for (const element of this.items) {
      sequence += element + " ";
    }
    return sequence;
  }
}
