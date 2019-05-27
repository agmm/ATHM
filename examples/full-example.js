// Import the ATHM library
const { Athm } = require('../lib/main');

// Before running this example configure credentials.js
const { credentials } = require('./credentials')

// Create a new 'ATH Móvil' object
let account = new Athm(credentials, { keepAlive: false });

async function fullExample() {

    let login = await account.login();

    let info = await account.getBasicInfo();
    console.log(info);

    let name = await account.getMyName()
    let balance = await account.getBalance();
    let cardName = await account.getFirstCardName();
    let phone = await account.getMyPhone();
    let email = await account.getMyEmail();
    let receivedTransactions = await account.getReceivedTransactions();
    let sentTransactions = await account.getSentTransactions();
    let defaultCard = await account.getDefaultCard();

    console.log({
        login,
        name,
        balance,
        cardName,
        phone,
        email,
        receivedTransactions,
        sentTransactions,
        defaultCard
    });

    // let send = await account.sendMoney('(787) 123-4567', '1', 'Hello.');
    // console.log(send);

}

fullExample();