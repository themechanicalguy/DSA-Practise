const reader = require('readline');

const readline = async (question) => {
  const promptInterface = reader.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    promptInterface.question(question, (answer) => {
      resolve(answer);
      promptInterface.close();
    });
  });
};

module.exports = { readline };
