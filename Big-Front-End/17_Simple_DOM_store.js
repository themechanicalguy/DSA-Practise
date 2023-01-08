class NodeStore {
  constructor() {
    this.store = [];
  }
  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    const index = this._getIndex(node);

    if (index >= 0) this.store[index][1] = value;
    else this.store.push([node, value]);

    return this;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    const index = this._getIndex(node);

    if (index < 0) return undefined;
    return this.store[index][1];
  }

  _getIndex(node) {
    return this.store.findIndex((storeVal) => storeVal[0] === node);
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    if (this._getIndex(node) >= 0) return true;
    return false;
  }
}

const node = document.createElement('p');
const store = new NodeStore();
console.log(store.get(node), 'venkat');
store.set(node, 1);

store.set(node, 2);
console.log(store.get(node));

const node2 = document.createElement('p');
store.set(node2, 3);
console.log(store.get(node2));
