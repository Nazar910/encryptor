const React = require('react');
const Stirl = require('./Stirl.jsx');
const Des = require('./Des.jsx');
const Rsa = require('./Rsa.jsx');

module.exports = function(onKeyChangeCallback, additional, fileChange) {
    return {
        'stirl': <Stirl onKeyChange={onKeyChangeCallback} onFileChange={fileChange}/>,
        'des-cbc': <Des onKeyChange={onKeyChangeCallback} onFileChange={fileChange}/>,
        'des-ecb': <Des onKeyChange={onKeyChangeCallback} onFileChange={fileChange}/>,
        'rsa': <Rsa onKeyChange={onKeyChangeCallback} onFileChange={fileChange}/>
    }
};
