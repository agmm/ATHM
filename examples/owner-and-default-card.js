// Self contained example to get the balance of the current account.

// Import the ATHM library
const Athm = require('../lib/main');

// Before running this example configure credentials.js
const credentials = require('./credentials');

// Create a new 'ATH Móvil' object
let account = new Athm(credentials);

// Log in and get balance using regular functions
async function printInfo() {
    await account.login();
    let myName = await account.getMyName();
    let defaultCard = await account.getDefaultCard();
    console.log(myName);
    console.log(defaultCard);
}

// Execute the function
printInfo();