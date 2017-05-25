const React = require('react');
const fileDownload = require('react-file-download');

const keypair = require('keypair');
const Q = require('q');

const Des = require('./Des.jsx');

class Rsa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            byteCount: 2048,
            loading: false
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

        that.setState({ loading: true });

        function generateKeys() {
            return keypair(that.state.byteCount);
        }

        Q.fcall(generateKeys)
            .then(data => {
                that.setState({ loading: false });
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
                { this.state.loading ? <h3>Generating...</h3> : '' }
            </div>
        );
    }
}

module.exports = Rsa;
