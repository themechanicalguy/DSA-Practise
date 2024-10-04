//All common operations on doubly linked list
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    //1- Create a new node with provided argument
    const newNode = new Node(val);
    // 2- If head property is null, set head & tail to be newly created node
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 3- set next propert of tail as new node
      this.tail.next = newNode;
      // 4- set prev of newNode to be tail
      newNode.prev = this.tail;
      // 5- set tail to be newly created node
      this.tail = newNode;
    }
    //6- increase length
    this.length++;
    return this;
  }

  pop() {
    //1- If no head return undefined
    if (!this.head) return undefined;

    //2- store current tail to return
    const currentTail = this.tail;

    //3-If length is 1, set the head and tail to be null
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      //4- update tail to be prev node
      this.tail = currentTail.prev;
      this.tail.next = null;
    }
    //5- decrease the length
    this.length--;
    return currentTail;
  }

  //Shift removing a node from beginning of DLL
  shift() {
    //1- if length is 0, return undefined
    if (this.head === 0) return undefined;

    //2- Store the current head in a variable
    const oldHead = this.head;

    //3- if DLL length is 1
    if (this.length === 1) {
      //4- Make head and tail as null
      this.head = null;
      this.tail = null;
    } else {
      //5- Update the head to be next of old head
      this.head = oldHead.next;
      this.head.prev = null; //set prev of head as null
      oldHead.next = null; // set oldHead.next as null to detach
    }
    //6- decrement the length
    this.length--;
    //return the deleted node
    return oldHead;
  }

  // Unshift - adding a new node at the beginning of the DLL
  unShift(val) {
    //1- create a new node with value passed to the function
    const newNode = new Node(val);

    //2- if DLL length is 0
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      //set prev of head as newNode
      this.head.prev = newNode;
      //set newNode next as old head
      newNode.next = this.head;
      //set head as newNode
      this.head = newNode;
    }
    //increment length
    this.length++;
    return this;
  }

  //get(index) - Accessing a node in a DLL by its position -- unoptimized
  getSlow(index) {
    //If the index is less than 0 or greater or equal to the length - return null
    if (index < 0 || index >= this.length) return null;
    // init a counter variable with 0
    let count = 0;
    //store head in a variable
    let current = this.head;
    //loop untill index is reached
    while (count !== index) {
      //untill index is reached point current to next
      current = current.next;
      count++;
    }
    return current;
  }

  //get(index) - Optimized approach
  get(index) {
    //If the index is less than 0 or >= length return null
    if (index < 0 || index >= this.length) return null;

    // init a count variable
    let current, count;

    //check if the index is less than or equal to half length of DLL
    if (index <= this.length / 2) {
      //init count
      let count = 0;
      //init current with head
      current = this.head;
      //loop untill count reaches index
      while (count !== index) {
        // untill index is reached point current to its next
        current = current.next;
        count++;
      }
    } else {
      //init count with length-1
      const count = this.length - 1;
      //init current as tail
      let current = this.tail;

      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }

  // set(index, val): Replace the value of a node in a DLL
  set(index, val) {
    //check if index exist
    const foundIndex = this.get(index);
    if (foundIndex) {
      //update the data property with new val
      foundIndex.data = val;

      return true;
    }
    return false;
  }

  //Insert- adding a node is a LL by a certain position
  insert(index, val) {
    //if the index is <0 || >= length return false
    if (index < 0 || index >= this.length) return false;

    //if index is 0, then unShift
    if (index === 0) this.unShift(val);

    //If index is equal to length, then just push
    if (index === this.length) this.push(val);

    //create new node
    const newNode = new Node(val);

    //use get method to access index-1 node
    const beforeNode = this.get(index - 1);

    const afterNode = beforeNode.next;

    //Adding new node
    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode.next;
    afterNode.prev = newNode;

    //increase length
    this.length++;

    return true;
  }

  //remove(index) - remove a node in a DLL by a certain position
  remove(index) {
    //if index < 0 || >=length return false;
    if (index < 0 || index >= this.length) return false;

    //If LL has 1 node
    if (index === 0) return this.shift();

    //If index is last node
    if (index === this.length) return this.pop();

    //find the node to be removed
    const removedNode = this.get(index);

    const beforeNode = removedNode.prev;

    const afterNode = removedNode.next;

    beforeNode.next = afterNode;

    afterNode.prev = beforeNode;

    removedNode.next = null;

    removedNode.prev = null;

    this.length--;

    return removedNode;
  }
}
