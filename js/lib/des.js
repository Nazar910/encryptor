const forge = require('node-forge');

const Cipher = require('./cipher');

class Des extends Cipher{

    constructor(message, key, alphabet, type) {
        super(message, key, alphabet);
        this.iv = alphabet || forge.random.getBytesSync(16);
        this.type = type;
    }

    encrypt() {
        const cipher = forge.cipher.createCipher(this.type, this.key);

        cipher.start({iv: this.iv});
        cipher.update(forge.util.createBuffer(this.message));
        cipher.finish();

        const encrypted = cipher.output;
        this.message = encrypted;

        return {
            message: encrypted.data,
        }

    }

    decrypt() {
        const decipher = forge.cipher.createDecipher(this.type, this.key);

        decipher.start({iv: this.iv});
        decipher.update(forge.util.createBuffer(this.message));
        decipher.finish();

        this.message = decipher.output;

        return {
            message: decipher.output.data
        };
    }

}

module.exports = Des;
