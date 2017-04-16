const forge = require('node-forge');
const conv = require('binstring');

class Des {

    constructor(message, key) {
        this.message = conv(message,{out: 'binary'});
        this.key = key;
        this.iv = forge.random.getBytesSync(16);
    }

    encrypt() {
        const cipher = forge.cipher.createCipher('DES-CBC', this.key);
        cipher.start({iv: this.iv});
        cipher.update(forge.util.createBuffer(this.message));
        cipher.finish();
        const encrypted = cipher.output;
        this.message = encrypted;
        return encrypted.data;
    }

    decrypt() {
        const decipher = forge.cipher.createDecipher('DES-CBC', this.key);
        decipher.start({iv: this.iv});
        decipher.update(this.message);
        decipher.finish();
        this.message = conv(decipher.output.data,{out: 'binary'});
        return decipher.output.data;
    }

}

module.exports = Des;
