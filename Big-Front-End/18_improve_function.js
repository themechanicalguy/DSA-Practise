/**
 * @param {object[]} items
 * @excludes { Array< {k: string, v: any} >} excludes
 */

/**
 * @param {object[]} items
 * @param { Array< {k: string, v: any} >} excludes
 * @return {object[]}
 */
/**function excludeItems(items, excludes) {
    excludes.forEach( pair => { 
    items = items.filter(item => item[pair.k] !== pair.v)
  })
 
  return items 
}*/

function excludeItems(items, excludes) {
  //Fix for existing function
  //excludes.forEach( pair => {
  //  items = items.filter(item => item[pair.k] !== pair.v)
  //  })

  // Create a Map to store keys with set of values
  const excludeMap = new Map();

  excludes.forEach(({ k, v }) => {
    if (!excludeMap.has(k)) {
      excludeMap.set(k, new Set());
    }
    // Add all possible values for a property in the map with the help of set
    excludeMap.get(k).add(v);
  });

  // Filter the items array
  return items.filter((item) => {
    // For every key check if the key exists in map and the value of that key in the map has item value
    // filter need to return true to include in the return array.
    return Object.keys(item).every(
      (key) => !excludeMap.has(key) || !excludeMap.get(key).has(item[key])
    );
  });
}

let items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'blue', type: 'book', age: 17 },
];

const excludes = [
  { k: 'color', v: 'silver' },
  { k: 'type', v: 'tv' },
];
excludeItems(items, excludes);
