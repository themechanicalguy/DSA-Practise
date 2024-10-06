//reverse singly LL

//boilerplate for SLL
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(data) {
    // Create a new node using value passed to the function
    let newNode = new Node(data);
    // if no head
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  //write your code here...
  reverse() {
    let curr = this.head;
    let prev = null;

    while (curr) {
      let forwardNode = curr.next;
      curr.next = prev;

      prev = curr;
      curr = forwardNode;
    }

    //-- JS LL head tail swap
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    //return prev; //the new head --

    return this;
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }
}

let list = new SinglyLinkedList();
list.push(10);
list.push("hello");
list.push(true);
list.push(10n);
list.push(100);
list.traverse();
list.reverse();

list.traverse();

// reverse DLL
