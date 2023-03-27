const { resolve } = require('path');
const readline = require('readline');

const stdIn = (query) => {
  const ques = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    ques.question(query, (ans) => {
      resolve(ans);
      // ques.close();
    });
  });
};

// async function main() {
//   const name = await stdIn('what is your name');
//   console.log(name, 'names');
// }

// main();

const read = require('readline');

const getInput = async () => {
  const question = read.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    question.question('Where are you: ', (ans) => {
      resolve(ans);
      question.close();
    });
  });
};

async function main() {
  const val = await getInput();
  console.log('value is ', val);
}

main();
