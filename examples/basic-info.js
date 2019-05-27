// Self contained example to get the balance of the current account.

// Import the ATHM library
const { Athm } = require('../lib/main');

// Before running this example configure credentials.js
const { credentials } = require('./credentials')

// Create a new 'ATH Móvil' object
let account = new Athm(credentials);

// Log in and get basic info with a single request
async function printInfo() {
    await account.login();
    let info = await account.getBasicInfo();
    console.log(info);
    console.log(info.name);
}

// Execute the function
printInfo();