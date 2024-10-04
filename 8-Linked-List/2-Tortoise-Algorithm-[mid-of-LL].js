//boiler plate code

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
  //Finding the middle of a linked list
  getMiddle() {
    if (!this.length) return 0;
    if ((this.length / 2) % 2 === 0) {
      return this.length / 2;
    } else {
      return this.length / 2 + 1;
    }
  }

  //Tortoise Algo - return the middle node
  tortoiseAlgo() {
    //check for empty LL
    if (this.head === null) return this.head;
    if (this.head.next === null) return 1;

    //creation of pointers
    let slow = this.head;
    let fast = this.head;

    //slow and fast both are valid
    while (slow !== null && fast !== null) {
      fast = fast.next;
      //check for null
      console.log(fast);
      //below condition is giving error
      if (fast && fast.next) {
        fast = fast.next;
        slow = slow.next;
      }
    }

    return slow;//new updates
  }
}

//boiler plate code
const LL = new SinglyLinkedList();
LL.push(1);
LL.push(2);
LL.push(3);
LL.push(4);

// console.log(LL.getMiddle());
console.log(LL.tortoiseAlgo());

//get the length of the ll, divide by 2
// length is even, middle = n/2 node
// length is odd, mid = n/2 + 1 node

1 2 3 4 5

1 2 3 4
