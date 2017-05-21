const NodeRSA = require('node-rsa');

class Rsa {
    constructor(message, key) {
        this.message = message;
        this.key = new NodeRSA(key);
    }

    //expects key to be public
    encrypt() {
        const message = this.key.encrypt(this.message, 'base64');
        return {
            message
        };
    }

    //expects ket to be private
    decrypt() {
        const message = this.key.decrypt(this.message, 'utf8');
        return {
            message
        };
    }
}

module.exports = Rsa;
