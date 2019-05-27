const $ = require('cheerio');

const scrape = {

    question: (html) => {
        const question = $("[for='answer']", html).text();
        const questionId = $("[name='questionId']", html).attr('value');
        return { id: questionId, question: question }
    },

    myName: (html) => {
        let myName = $('#main h2', html).first().text();
        let pat = '\ (.*)\.';
        myName = myName.match(pat)[1];
        return myName;
    },

    myPhone: (html) => {
        let phone = $('.phone-item > p', html).text();
        phone = phone.match(/\d+/g).map(Number).join("");
        return phone;
    },

    balance: (html) => {
        let balance = $('#5a199b4be0482223b046267f2bda9460', html).first().text();
        let pat = '[0-9]+(\.[0-9][0-9]?)?';
        balance = Number(balance.match(pat)[0]);
        return balance;
    },

    firstCardName: (html) => {
        let cardName = $('b.block_small', html).first().text();
        return cardName;
    },

    myEmail: (html) => {
        let email = $('#email', html).attr('value');
        return email;
    },

    transactions: (html, type) => {
        let transactions = $('.transaction.status_complete.' + type, html).map((i, r) => {
            let phone = $('td.right u > a', r).attr('href').replace('tel:', '');
            let amount = $('td.right > b', r).text();

            let dateRule = '[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]'
            let date = $('td', r).first().text().match(dateRule)[0];

            let amountRule = '[0-9]+(\.[0-9][0-9]?)?';
            amount = Number(amount.match(amountRule)[0]).toFixed(2);

            return { date, phone, amount }
        }).get();

        return transactions;
    },

    receivedTransactions: (html) => {
        return this.scrape.transactions(html, 'received');
    },

    sentTransactions: (html) => {
        return this.scrape.transactions(html, 'sent');
    },

    defaultCard: (html) => {
        let card = $('.account.special.radio.checked', html);
        let name = $(card).text().split(':')[0];
        let hash = $(card).attr('for').replace('fromCardHash_', '');
        let balance = Number($(card).text().split(':')[1].replace(' $', ''));
        return { name, hash, balance };
    },

    cards: () => {

    },

    // Infer if we are in the Questions page
    isQuestionsPage: (html) => {
        let val = $("[for='answer']", html).text();
        if (!val) {
            return false;
        } else {
            return true;
        }
    },

    // Infer if we are in the Password page
    isPasswordPage: (html) => {
        let val = $("[for='password']", html).text();
        if (!val) {
            return false;
        } else {
            return true;
        }
    },

    // Infer if we are already logged in
    isLoggedIn: (html) => {
        // Use the signout button as a signal
        let val = $(".signout.hide_mobile", html).text();
        if (!val) {
            return false;
        } else {
            return true;
        }
    },

    // Infer if the transaction was successful
    sentSuccessfully: (html) => {
        if (html.search('Detalles de la transferencia') != -1) {
            return true;
        } else {
            return false;
        }
    },

    test: () => {
        console.log('This is a simple test.');
    },

}

module.exports = scrape;