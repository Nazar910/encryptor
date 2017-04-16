const expect = require('chai').expect;
const Des = require('../lib/des');

describe('Des', () => {

    describe('when key is qwertyasdfgzxcvb', () => {

        it('should encrypt and decrypt', () => {
            const message = 'Hello';
            const key = 'qwertyasdfgzxcvb';
            const cipher = new Des(message, key);

            const encrypted = cipher.encrypt();
            const decrypted = cipher.decrypt();

            expect(decrypted).to.equal(message);
        });

    });

});
