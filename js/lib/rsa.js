const NodeRSA = require('node-rsa');

class Rsa {
    constructor(message, key) {
        this.message = message;
        this.key = new NodeRSA(key);
    }

    encrypt() {
        return this.key.encrypt(this.message, 'base64');
    }

    decrypt() {
        return this.key.decrypt(this.message, 'utf8');
    }
}

module.exports = Rsa;
