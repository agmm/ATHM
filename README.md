<h1 align="center">
    ATHM
</h1>
<h5 align="center"> 
    A simple library to interact with ATH Móvil from NodeJs.
</h5>

<p align="center">
  <img width="77%" src="./main.png" />
</p>

## Shortcuts

- [Examples](docs/examples.md)
- [API Reference](docs/api-reference.md)
- [How to Set up Credentials](docs/CredentialsHowTo.md)

## Disclaimers

- This project was developed as a quick proof of concept.
- The codebase is in dire need of a major refactoring.
- There are no guarantees that this library will always perform as advertised.
- Minor changes to the ATHM website could break the scraping functions.
- Use at your own risk.

## What is This?

This is a library that allows developers to interact with ATH Móvil from JavaScript. It can send and receive money, get current balance, past transactions, available cards, account holder information and more!

## Installation

```bash
npm install athm
```

## Example

Example to send one dollar to the specified phone number and then print the balance of the current account.

```js
const Athm = require('athm');
const credentials = require('./credentials');

const account = new Athm(credentials);

async function example() {
  await account.login();
  await account.sendMoney('(787) 123-4567', '1', 'Hello');
  const balance = await account.getBalance();
  console.log(balance);
}

example();
```

## Credentials

To set up the credentials do the following:

1. Go to the ATH Móvil [configuration page](https://www.athmovil.com/web/config.htm) and click on 'Change Security Questions'.

2. On the 'Change Security Questions' page select the questions that you want and answer them.

3. Use [this list](docs/CredentialsHowTo.md) to determine the IDs of your selected questions.

4. Use these IDs to set up your credentials object like this:

```js
const credentials = {
  username: 'example@gmail.com',
  password: 'myPassword123',
  answers: { 'Q1.8': 'Albert', 'Q1.7': 'Saphire', 'Q1.10': 'San Juan' }
};
```

## To-Do List

- More features
- Documentation
- Proper test suite
- Major refactoring
- Better error handling
- Support for multiple cards

## License

Copyright (c) 2019 Arnaldo Gabriel

This project is licensed under the [MIT License](LICENSE).
