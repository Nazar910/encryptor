class Cipher {

    constructor(message, key, alphabet) {
        this.message = message;
        this.key = key;
        this.alphabet = alphabet;
    }

    encrypt() {
        return this.message;
    }

    decrypt() {
        return this.message;
    }

}

module.exports = Cipher;
