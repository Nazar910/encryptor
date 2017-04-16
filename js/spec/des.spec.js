const expect = require('chai').expect;
const Des = require('../lib/des');
const langs = require('../languages');
const utf8 = require('utf8');

describe('Des', () => {

    describe('when key is qwertyasdfgzxcvb', () => {
        let encrypted;
        let decrypted;
        let iv = langs['en'];

        const message = utf8.encode('Hello');
        const key = 'qwertyasdfgzxcvb';

        it('should encrypt', () => {
            const cipher = new Des(message, key, iv);

            encrypted = cipher.encrypt().message;
            expect(encrypted).to.equal('jÞôÐçøý°');
        });

        it('should decrypt', () => {
            const cipher = new Des(encrypted, key, iv);

            decrypted = cipher.decrypt().message;
            console.log(utf8.decode(decrypted));
            expect(decrypted).to.equal('Hello');
        });

    });

    describe('when language is ru', () => {
        const lang = langs['ru'];

        describe('when key is qwerty', () => {
            const key = 'qwerty';
            const message = utf8.encode('Привет');

            let encrypted;

            it('encrypt', () => {

                const cipher = new Des(message, key, lang);

                encrypted = cipher.encrypt().message;

                expect(encrypted).to.equal('<NÊ¢íâ/u²Lþü.');
            });

            it('encrypt', () => {

                const cipher = new Des(encrypted, key, lang);

                const decrypted = cipher.decrypt().message;

                expect(decrypted).to.equal(message);
            })
        })

    });

});
