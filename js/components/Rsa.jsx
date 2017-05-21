const React = require('react');
const fileDownload = require('react-file-download');

const keypair = require('keypair');
const Q = require('q');

const Des = require('./Des.jsx');

class Rsa extends React.Component {

    constructor(props) {
        super(props);

        this.onKeyChange = this.onKeyChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onKeyChange(key) {
        this.props.onKeyChange(key);
    }

    generateKeyPair() {
        function generateKeys() {
            return keypair();
        }

        Q.fcall(generateKeys)
            .then(data => {
                fileDownload(data.public, 'public-key.pub');
                fileDownload(data.private, 'private-key');
            });
    }

    onFileChange(...args) {
        this.props.onFileChange(...args);
    }

    render() {
        return (
            <div>
                <Des onKeyChange={this.onKeyChange} onFileChange={this.onFileChange}/>
                <button onClick={this.generateKeyPair}>Generate key pair</button>
            </div>
        );
    }
}

module.exports = Rsa;
