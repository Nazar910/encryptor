const forge = require('node-forge');

const Cipher = require('./cipher')

class Des extends Cipher{

    constructor(message, key, alphabet, desType) {
        super(message, key, alphabet);
        this.iv = alphabet || forge.random.getBytesSync(16);
        this.desType = desType || 'DES-CBC';
    }

    encrypt() {
        const cipher = forge.cipher.createCipher(this.desType, this.key);

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
        const decipher = forge.cipher.createDecipher(this.desType, this.key);

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
