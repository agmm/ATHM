const axios = {
    withCredentials: true,

    headers: {

        'Host': 'www.athmovil.com',

        'Connection': 'keep-alive',

        'Pragma': 'no-cache',

        'Cache-Control': 'no-cache',

        'Origin': 'https://www.athmovil.com',

        'Upgrade-Insecure-Requests': '1',

        'DNT': '1',

        'Content-Type': 'application/x-www-form-urlencoded',

        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',

        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',

        'Accept-Encoding': 'gzip, deflate, br',

        'Accept-Language': 'en-US,en;q=0.9,es;q=0.8,fr;q=0.7',

    }
}

exports.axios = axios;