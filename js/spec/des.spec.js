const expect = require('chai').expect;
const Des = require('../lib/des');

describe('Des', () => {

    describe('when key is qwertyasdfgzxcvb', () => {
        let encrypted;
        let decrypted;
        let iv = require('../languages')['en'];

        const message = 'Hello';
        const key = 'qwertyasdfgzxcvb';

        it('should encrypt', () => {
            const cipher = new Des(message, key, iv);

            encrypted = cipher.encrypt().message;
            iv = cipher.iv;
            expect(encrypted).to.equal('jÞôÐçøý°');
        });

        it('should decrypt', () => {
            const cipher = new Des(encrypted, key, iv);

            decrypted = cipher.decrypt().message;
            expect(iv).to.equal(cipher.iv);
            expect(decrypted).to.equal('Hello');
        });

    });

});
