// Self contained example to get the balance of the current account.

// Import the ATHM library
const { Athm } = require('../lib/main');

// Before running this example configure credentials.js
const { credentials } = require('./credentials')

// Create a new 'ATH Móvil' object
let account = new Athm(credentials);

// Log in and get balance using an anonymous arrow function
(async () => {
    await account.login();
    let balance = await account.getBalance();
    console.log(balance);
})();