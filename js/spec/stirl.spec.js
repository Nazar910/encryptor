const expect = require('chai').expect;
const Stirl = require('../lib/stirl');
const english = require('../languages')['en'];

const keys = {
    'poorGhost': 'From the other world I come back to you,\n'+
                  'My locks are uncurled with dripping drenching dew.\n'+
                  'You know the old, whilst I know the new:\n'+
                  'But tomorrow you shall know this too.'
};

describe('Stirl', () => {

    describe('when key is poorGhost', () => {

        it('encrypt should return 101013311111', () => {
            const message = 'Fly';
            const key = keys['poorGhost'];
            const cipher = new Stirl(message, key, english);

            const actual = cipher.encrypt();

            expect(actual).to.equal('101013311111');
        });

        it('decrypt should return Fly', () => {
            const message = '101013311111';
            const key = keys['poorGhost'];
            const cipher = new Stirl(message, key, english);

            const actual = cipher.decrypt();

            expect(actual).to.equal('Fly');
        });

    });

});
