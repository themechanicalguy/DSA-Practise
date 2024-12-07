class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12]; //Mock the values of a binary tree
  }
  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return 2 * i + 2;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  //insert logic with Bubble Up
  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1; //last item
    const element = this.values[idx]; //new items inserted
    while (idx > 0) {
      let parentIdx = parent(idx);
      let parent = this.values[parentIdx];
      if (element < parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  //remove from a Max Heap
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return max;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    //this is not a good way of using while loop

    while (true) {
      let leftChildIdx = this.left(Idx);
      let rightChildIdx = this.right(Idx);

      let leftChild, rightChild;

      let swap = null;

      if (leftChild < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) swap = leftChildIdx;
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];

        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        )
          swap = rightChildIdx;
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(55);
console.log(heap);
