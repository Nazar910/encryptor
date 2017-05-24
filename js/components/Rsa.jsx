const React = require('react');
const fileDownload = require('react-file-download');

const keypair = require('keypair');
const Q = require('q');

const Des = require('./Des.jsx');

class Rsa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            byteCount: 2048
        };

        this.onKeyChange = this.onKeyChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.generateKeyPair = this.generateKeyPair.bind(this);
        this.onByteCountChange = this.onByteCountChange.bind(this);
    }

    onKeyChange(key) {
        this.props.onKeyChange(key);
    }

    generateKeyPair() {
        const that = this;

        function generateKeys() {
            return keypair(that.state.byteCount);
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

    onByteCountChange({ target }) {
        const { value: byteCount } = target;
        this.setState({ byteCount });
    }

    render() {
        return (
            <div>
                <Des onKeyChange={this.onKeyChange} onFileChange={this.onFileChange}/>
                <button onClick={this.generateKeyPair}>Generate key pair</button>
                <select onChange={this.onByteCountChange} value={this.state.byteCount}>
                    <option>512</option>
                    <option>1024</option>
                    <option>2048</option>
                    <option>4096</option>
                </select>
            </div>
        );
    }
}

module.exports = Rsa;
