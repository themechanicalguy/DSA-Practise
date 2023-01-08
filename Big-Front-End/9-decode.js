// This is a JavaScript coding problem from BFE.dev

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  // your code here
  const height = message.length;
  const width = message?.[0]?.length;
  let moveDown = false;
  let decodedString = '';

  for (let i = 0, j = 0; i < width; i++) {
    if (j === height - 1 || j === 0) {
      moveDown = !moveDown;
    }

    if (moveDown) {
      decodedString += message[j++][i];
      continue;
    }

    decodedString += message[j--][i];
  }

  return decodedString;
}

const input = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D'],
];

decode(input);
