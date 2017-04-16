const React = require('react');
const Stirl = require('./Stirl.jsx');
const Des = require('./Des.jsx');

module.exports = function(onKeyChangeCallback, additional, fileChange) {
    return {
        'stirl': <Stirl onKeyChange={onKeyChangeCallback} onFileChange={fileChange}/>,
        'des': <Des onKeyChange={onKeyChangeCallback} onFileChange={fileChange}/>
    }
};
