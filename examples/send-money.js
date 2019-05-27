// Self contained example to get send money to an specified phone number (user).

// Import the ATHM library
const Athm = require('../lib/main');

// Before running this example configure credentials.js
const credentials = require('./credentials');

// Create a new 'ATH Móvil' object
let account = new Athm(credentials);

// Log in and get basic info with a single request
async function sendOneDollar() {
    await account.login();
    // let send = await account.sendMoney('(787) 123-4567', '1', 'Hello.');
    // console.log(send);
}

// Execute the function
sendOneDollar();