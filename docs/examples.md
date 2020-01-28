## 📓 Examples

### Getting Balance

Self contained example to get the balance of the current account.

```js
const { Athm } = require('athm');

const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};

const account = new Athm(credentials);

async function printBalance() {
  await account.login();
  const balance = await account.getBalance();
  console.log(balance);
}

printBalance();
```

### Sending Money

Self contained example to send one dollar to the specified phone number using the default debit card.

```js
const { Athm } = require('athm');

const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};

const account = new Athm(credentials);

async function sendOneDollar() {
  await account.login();
  const send = await account.sendMoney('(787) 123-4567', '1', 'Hello.');
  console.log(send);
}

sendOneDollar();
```

### Getting Account Holder and Default Card

Self contained example to get the name of the owner of the current account and the default card associated with it.

```js
const { Athm } = require('athm');

const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};

const account = new Athm(credentials);

async function printInfo() {
  await account.login();
  const myName = await account.getMyName();
  const defaultCard = await account.getDefaultCard();
  console.log(myName);
  console.log(defaultCard);
}

printInfo();
```

### Getting Basic Info

Self contained example to get the name, balance and first card associated with the current account. This method, in contrast to using the other methods separately, obtains the information with a single `GET` request.

```js
const { Athm } = require('athm');

const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};

const account = new Athm(credentials);

async function printInfo() {
  await account.login();
  const info = await account.getBasicInfo();
  console.log(info);
  console.log(info.name);
}

printInfo();
```

### Getting Balance Using Arrow Function

Self contained example to get the balance of the current account. This example uses an anonymous arrow function.

```js
const { Athm } = require('athm');

const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};

const account = new Athm(credentials);

(async () => {
  await account.login();
  const balance = await account.getBalance();
  console.log(balance);
})();
```

### Full Example

Example on how to use most of the available methods.

```js
const { Athm } = require('athm');

const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};

const account = new Athm(credentials);
const log = console.log;

async function fullExample() {
  const login = await account.login();
  log('Login', login);

  const info = await account.getBasicInfo();
  log('Basic Information', info);

  const cardName = await account.getFirstCardName();
  log('Card Name', cardName);

  const phone = await account.getMyPhone();
  log('Phone Number', phone);

  const email = await account.getMyEmail();
  log('Email', email);

  const receivedTransactions = await account.getReceivedTransactions();
  log('Received Transactions', receivedTransactions);

  const sentTransactions = await account.getSentTransactions();
  log('Sent Transactions', sentTransactions);

  const name = await account.getMyName();
  log('Name', name);

  const balance = await account.getBalance();
  log('Balance', balance);

  const defaultCard = await account.getDefaultCard();
  log('Default Card', defaultCard);

  // const send = await account.sendMoney('(787) 123-4567', '1', 'Hello.');
  // log('Sending Money', send);

  const logout = await account.logout();
  log('Logout', logout);
}

fullExample();
```
