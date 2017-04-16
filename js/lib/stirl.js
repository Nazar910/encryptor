const Cipher = require('./cipher');
const Random = require('random-js');
const mt = Random.engines.mt19937();

class Stirl extends Cipher {

    constructor(message, key, alphabet) {
        super(message, key, alphabet);
        this.numbers = [];
        key.split('\n').forEach((raw, i) => {

            this.numbers[i] = [];
            raw.split('').forEach((symbol, j) => {
                this.numbers[i][j] = (i + 10) + "" + (j + 10);
            })
        })
    }

    findAlCharacters(char){
        let result = [];

        this.key.split('\n').forEach((raw, i) => {

            raw.split('').forEach((symbol, j) => {
                if (char === symbol) {
                    result.push(this.numbers[i][j]);
                }
            })
        });

        return result;
    }

    getRandomNum(charSequence) {
        const length = charSequence.length;
        const r = new Random(mt.seed(length));

        let count = 0;
        for(let i = 0; i < length; i++)
            count = r.integer(0, length);

        if (count === length) {
            count--;
        }
        return charSequence[count];
    }

    getNum(char) {
        const ilength = this.key.split('\n').length;
        for(let i = 0; i < ilength; i++) {

            const split1 = this.key.split('\n')[i];
            const jlength = split1.split('').length;
            for(let j = 0; j < jlength; j++) {
                if (char === this.numbers[i][j]) {
                    const split2 = split1.split('');
                    return split2[j];
                }
            }
        }
    }

    crypt(chSequence, elemEval, num, step) {

        let result = '';

        let message = this.message, i = 0;
        while(i < message.length) {

            let elem = elemEval(message, i);
            const charSequence = chSequence(elem);
            const randomNum = num(charSequence);

            if(!randomNum) {
                return {
                    error: 'There is no such symbol'
                };
            }
            result += randomNum;
            i = step(i);
        }

        return {
            message: result
        }
    }

    encrypt() {
        return this.crypt(elem => this.findAlCharacters(elem),
                            (elem,i) => elem[i],
                            charSequence => this.getRandomNum(charSequence),
                                i => ++i);
    }

    decrypt() {
        return this.crypt(elem => elem,
                            (elem,i) => {
                                const res = elem.substr(i, 4);
                                return res;
                            },
                            charSequence => this.getNum(charSequence),
                                i => i + 4);
    }

}

module.exports = Stirl;
