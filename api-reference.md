# 📚 API Reference

## Basic Methods

### .login()

Logs into the account. Returns `true` if successful.

### .logout()

Logs out of the current account. Returns `true` if successful.

## Methods prefixed with 'get'

All the methods prefixed with 'get' are used to fetch a page from _ATH Móvil_, scrape it and then return the desired content. All of these methods are asynchronous.

### .getMyName()

Returns a `string` with the name of the account owner.

### .getBalance()

Returns a `number` with the current account balance (for now only only for the first/default card)

### .getMyPhone()

Returns a `string` with the phone number associated with the current account.

### .getMyEmail()

Returns a `string` with the email associated with the current account.

### .getBasicInfo()

Returns an `object` with the name, balance and first card associated with the current account. The advantage of this method is that it gets all of this information with a single `GET` request. The structure of the returned object is as follows: `{ name, balance, firstCard }`.

### .getReceivedTransactions()

Returns an `object` with all the received transactions. The individual transactions are returned as objects with the following structure: `{ date, phone, amount }`.

### .getSentTransactions()

Returns an `object` with all the sent transactions. The individual transactions are returned as objects with the following structure: `{ date, phone, amount }`.

### .getFirstCardName()

Returns a `string` with the name of the first card.

### .getDefaultCard()

Return an `object` with the name, hash and balance of the main card. The object structure is as follows: `{ name, hash, balance }`.

### .getCards() - Work in progress

Returns an `object` with all the available cards in the account and their respective hashes. The individual cards are returned as objects with the following structure: `{ cardName, cardHash }`.

## Method for sending money

### .sendMoney(phone, amount, message, cardHash)

Returns `true` if successful and `false` if something went wrong.

<!-- Returns an `object` with the transactions details if successful. Returns `false` if something went wrong. -->

_Required parameters:_

- **phone:** The number of the person to whom you want to send the money.

- **amount:** The amount of money that you want to send.

_Optional parameters:_

- **message:** The message that will be attached to the transaction. By default it is an empty string.

- **cardHash:** This parameter is used to specify the card from which the transaction will be initiated. By default `cardHash` is the same as the hash from the main card.

## Utilitiy Methods

**.fetchPage(route)**

Will make a `GET` request to the given route/resource and return the response. The complete path will be: `https://www.athmovil.com/web/ + route`

**.fetchMainPage()**

Will make a `GET` request to `https://www.athmovil.com/web/mainMenu.htm` and return the response.

**.postData(data, route)**

Will make a `POST` request with the given `data` to the specified `endpoint` and return the response. The complete path will be: `https://www.athmovil.com/web/ + endpoint`.
