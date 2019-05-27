// Import the ATHM library
const Athm = require('../lib/main');

// Before running this example configure credentials.js
const credentials = require('./credentials');

// Create a new 'ATH Móvil' object
let account = new Athm(credentials);

async function fullExample() {
    let login = await account.login();
    log('Login', login)

    let info = await account.getBasicInfo();
    log('Basic Information', info);

    let cardName = await account.getFirstCardName();
    log('Card Name', cardName);

    let phone = await account.getMyPhone();
    log('Phone Number', phone);

    let email = await account.getMyEmail();
    log('Email', email);

    let receivedTransactions = await account.getReceivedTransactions();
    log('Received Transactions', receivedTransactions);

    let sentTransactions = await account.getSentTransactions();
    log('Sent Transactions', sentTransactions);

    let name = await account.getMyName();
    log('Name', name);

    let balance = await account.getBalance();
    log('Balance', balance);

    let defaultCard = await account.getDefaultCard();
    log('Default Card', defaultCard);

    // let send = await account.sendMoney('(787) 123-4567', '1', 'Hello.');
    // log('Sending Money', send);

    let logout = await account.logout();
    log('Logout', logout);

}

// Utility function to log the information in a 'pretty' way
function log(name, object) {
    let separator = '----------------------'
    console.log(name + ':');
    console.log(separator);
    console.log(object)
    console.log(separator);
    console.log('\n\n\n')
}

fullExample();