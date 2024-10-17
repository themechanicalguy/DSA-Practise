class Stacks {
  constructor() {
    this.items = [];
  }
  //push operation
  push(data) {
    this.items.push(data);
  }
  isEmpty() {
    return this.items.length === 0;
  }
  pop() {
    //check underflow conditions
    if (this.items.length === 0) return "Undeflow";
    return this.items.pop();
  }
  printStack() {
    let sequence = " ";
    for (const element of this.items) {
      sequence += element + " ";
    }
    return sequence;
  }
}

function insertAtEnd(s, data) {
  if (s.items.length === 0) {
    s.items.push(data);
    return;
  }
  let temp = s.items[s.items?.length - 1];
  s.pop();
  insertAtEnd(s, data);
  s.push(temp);
}

const s = new Stacks();
s.push(1);
s.push(2);
s.push(3);

console.log(s, "initial");
insertAtEnd(s, 0);
console.log(s, "after");
// console.log(s.pop());
