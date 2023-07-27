const { readline } = require('./utils');

const getUserCount = async () => {
  let usersCount;
  while (isNaN(usersCount)) {
    usersCount = await readline('Enter the number of new users: ');
    if (isNaN(usersCount)) {
      console.log('Please enter a valid number...\n');
    }
  }
  return usersCount;
};

const getUserDetail = async () => {
  const name = await readline('Enter user Name: ');
  const age = await readline('Enter user Age: ');
  const role = await readline('Enter user Role: ');

  return { name, age, role };
};

async function main() {
  let users = []; // new users

  // get the count from the user
  const entriesCount = await getUserCount();

  // get user details for all the user
  for (let i = 0; i < entriesCount; i++) {
    //get User Detail and add it
    users.push(await getUserDetail());
  }

  console.log('users: ', users);
}

main();
