const NodeRSA = require('node-rsa');

class Rsa {
    constructor(message, key) {
        this.message = message;
        this.key = new NodeRSA(key);
    }

    //expects key to be public
    encrypt() {
        return this.key.encrypt(this.message, 'base64');
    }

    //expects ket to be private
    decrypt() {
        return this.key.decrypt(this.message, 'utf8');
    }
}

module.exports = Rsa;
