const axios = require('axios');
const qs = require('querystring');
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support').default;
const globalConfig = require('./config');
const { scrape } = require('./scrapers');

// Code to enable cookies
axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();

// Main class
class Athm {
    constructor(credentials) {
        this.username = credentials.username;
        this.password = credentials.password;
        this.credentials = this.cloneObject(credentials);;
        this.version = 'v0.0.1';
    }

    // An utility method to clone the given object
    cloneObject(object) {
        return JSON.parse(JSON.stringify(object))
    }

    // Makes a GET request in order to obtain the cookies
    async getCookies() {
        const url = 'https://www.athmovil.com/web/login.htm';
        globalConfig.axios.jar = cookieJar;
        const response = await axios.get(url, globalConfig.axios);
        return response;
    }

    // Posts the given data to the specified endpoint
    async postData(data, endpoint) {
        const url = 'https://www.athmovil.com/web/' + endpoint;
        const response = await axios.post(url, qs.stringify(data), globalConfig.axios);
        return response;
    }

    // Will make a `GET` request to the given endpoint and return the response
    async fetchPage(endpoint) {
        let url = 'https://www.athmovil.com/web/' + endpoint;
        const response = await axios.get(url, globalConfig.axios);
        return response;
    }

    // Will make a `GET` request to 'mainMenu' and return the response
    async fetchMainPage() {
        const url = 'https://www.athmovil.com/web/mainMenu.htm';
        const response = await axios.get(url, globalConfig.axios);
        return response;
    }

    // Gets the name of the owner of the current account
    async getMyName() {
        const response = await this.fetchMainPage();
        const myName = scrape.myName(response.data);
        return myName;
    }

    // Gets the email of the owner of the current account
    async getMyEmail() {
        const response = await this.fetchPage('editEmail.htm');
        let email = scrape.myEmail(response.data);
        return email;
    }

    // Gets the phone number of the owner of the current account
    async getMyPhone() {
        const response = await this.fetchPage('mySourcePhones.htm');
        const phone = scrape.myPhone(response.data);
        return phone;
    }

    // Gets balance of the first card (for now)
    async getBalance() {
        const response = await this.fetchMainPage();
        const balance = scrape.balance(response.data);
        return balance;
    }

    // Gets name of the first card
    async getFirstCardName() {
        const response = await this.fetchMainPage();
        let cardName = scrape.firstCardName(response.data);
        return cardName;
    }

    // Gets name, email, balance and first card name with a single GET request
    async getBasicInfo() {
        const response = await this.fetchMainPage();
        const myName = scrape.myName(response.data);
        const balance = scrape.balance(response.data);
        const firstCardName = scrape.firstCardName(response.data);
        return { name: myName, balance: balance, firstCard: firstCardName };
    }

    // Gets a list of all the received transactions
    async getReceivedTransactions() {
        const response = await this.fetchPage('myGlobalTransfers.htm');
        const transactions = scrape.receivedTransactions(response.data);
        return transactions;
    }

    // Gets a list of all the sent transactions
    async getSentTransactions() {
        const response = await this.fetchPage('myGlobalTransfers.htm');
        const transactions = scrape.sentTransactions(response.data);
        return transactions;
    }

    // Gets the name, hash, and balance of the default card
    async getDefaultCard() {
        let response = await this.fetchPage('anyUserTransfer.htm');
        let card = scrape.defaultCard(response.data)
        return card;
    }

    // Returns all the available cards in the account and their respective hashes
    // Work in progress.
    async getCards() {
        return false;
    }

    // Logs out of the current account. Returns `true` if successful
    async logout() {
        const response = await this.fetchPage('appLogout.htm');
        if (scrape.isLoggedIn(response.data)) {
            return false;
        } else {
            return true;
        }
    }

    // Needs refactoring
    async login() {

        let postUsername = async () => {
            const requestBody = {
                username: this.username,
                connect: 'Log+in+%E2%86%92'
            }

            const response = await this.postData(requestBody, 'login.htm');
            return response;
        };

        let postAnswer = async (id) => {
            const answer = this.credentials.answers[id];

            const requestBody = {
                answer: answer,
                questionId: id,
                connect: 'Continue+%E2%86%92'
            }

            const response = await this.postData(requestBody, 'question.htm');
            return response;
        }

        let postPassword = async () => {
            const requestBody = {
                password: this.password,
                connect: 'Continue+%E2%86%92',
            }

            const response = await this.postData(requestBody, 'password.htm');
            return response;
        }

        await this.getCookies();

        const response = await postUsername();

        // Continue only if the returned page is the Questions Page
        if (scrape.isQuestionsPage(response.data)) {
            let question = scrape.question(response.data);
            let answer = await postAnswer(question.id);

            // Continue only if the returned page is the Password Page
            if (scrape.isPasswordPage(answer.data)) {
                let password = await postPassword();

                if (scrape.isLoggedIn(password.data)) {
                    return true;

                } else {
                    return false;
                }

            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    // Needs refactoring. Work in progress.
    async sendMoney(phone, amount, message = '', cardHash = '') {

        if (cardHash == '') {
            let defaultCard = await this.getDefaultCard();
            cardHash = defaultCard.hash;
        } else {
            await this.fetchPage('anyUserTransfer.htm');
        }

        let postTransfer = async () => {
            const requestBody = {
                fromCardHash: cardHash,
                toPhone: phone,
                amount: amount,
                message: message,
                _target2: 'Enviar+%E2%86%92'
            }

            const response = await this.postData(requestBody, 'anyUserTransfer.htm');
            return response;
        }

        let confirmTransaction = async () => {
            const requestBody = {
                _finish: 'Enviar+%E2%86%92'
            }

            const response = await this.postData(requestBody, 'anyUserTransfer.htm');
            return response;
        }

        const response = await postTransfer();

        if (scrape.sentSuccessfully(response.data)) {
            await confirmTransaction();
            return true;
        } else {
            return false;
        }
    }
}

exports.Athm = Athm;