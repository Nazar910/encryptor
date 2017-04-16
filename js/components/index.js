const React = require('react');
const Stirl = require('./Stirl.jsx');
const Des = require('./Des.jsx');

module.exports = function(onKeyChangeCallback, additional) {
    return {
        'stirl': <Stirl onKeyChange={onKeyChangeCallback}/>,
        'des': <Des onKeyChange={onKeyChangeCallback} iv={additional}/>
    }
};
