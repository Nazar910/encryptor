"use strict";
describe('rsa', () => {

    const expect = require('chai').expect;

    const Rsa = require('../lib/rsa');
    const pair = require('./keypair.json');

    it('should encrypt and decrypt successfully', (done) => {
        const original = 'Hello';
        const encryptor = new Rsa(original, pair.public);

        const encrypted = encryptor.encrypt();

        const decryptor = new Rsa(encrypted, pair.private);

        const decrypted = decryptor.decrypt();

        expect(decrypted).to.equal(original);

        done();
    });

});
