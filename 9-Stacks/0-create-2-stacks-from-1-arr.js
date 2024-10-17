//Create 2 Stacks from given array
class TwoStacks {
  constructor() {
    this.items = new Array(100).fill(0);
    this.top1 = -1;
    this.top2 = 100;
  }
  push1(x) {
    if (this.top1 !== this.top2) {
      this.top1++;
      this.items[this.top1] = x;
    } else {
      return;
    }
  }
  push2(x) {
    if (this.top1 !== this.top2) {
      this.top2--;
      this.items[this.top2] = x;
    } else {
      return;
    }
  }
  pop1() {
    if (this.top1 !== -1) {
      const res = this.items[this.top1];
      this.top1--;
      return res;
    } else {
      return -1;
    }
  }
  pop2() {
    if (this.top2 !== 100) {
      const res = this.items[this.top2];
      this.top2++;
      return res;
    } else {
      return -1;
    }
  }
}
