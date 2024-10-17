//next smallest element in a stack
class Stack {
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

  top() {
    return this.items[this.items.length - 1];
  }
}

function nextSmallestElement(ar) {
  const st = new Stack();
  const res = [];
  st.push(-1);
  for (let i = ar.length - 1; i >= 0; i--) {
    let curr = ar[i];
    while (st.top() >= curr) {
      st.pop();
    }
    res[i] = st.top();
    st.push(ar[i]);
  }
  console.log(st);
  return res;
}

nextSmallestElement([2, 1, 4, 3]); //op -[1, -1, 3, -1]

//previous smallest element
function prevSmallestElement(ar) {
  const st = new Stack();
  const res = [];
  st.push(-1);
  for (let i = 0; i <= ar.length - 1; i++) {
    let curr = ar[i];
    while (st.top() >= curr) {
      st.pop();
    }
    res[i] = st.top();
    st.push(ar[i]);
  }
  console.log(st);
  return res;
}
