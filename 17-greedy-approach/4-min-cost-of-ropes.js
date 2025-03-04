//https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1

function minCostBruteForce(arr) {
  let cost = 0;

  while (arr.length > 1) {
    arr.sort((a, b) => a - b); // Sort array to get smallest two ropes
    let newRope = arr[0] + arr[1]; // Merge the two smallest
    cost += newRope;
    arr.splice(0, 2); // Remove the two merged ropes
    arr.push(newRope); // Insert the new rope back
  }

  return cost;
}

//Optimized Approach using Min-Heap (O(n log n))
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}

function minCostHeap(arr) {
  let minHeap = new MinHeap();
  let cost = 0;

  for (let num of arr) {
    minHeap.insert(num);
  }

  while (minHeap.size() > 1) {
    let first = minHeap.extractMin();
    let second = minHeap.extractMin();
    let newRope = first + second;
    cost += newRope;
    minHeap.insert(newRope);
  }

  return cost;
}

// Test Case
console.log(minCostHeap([4, 3, 2, 6])); // Output: 29
