const React = require('react');
const languages = require('./languages.js');
const ciphers = require('./ciphers');
const utf8 = require('utf8');

const components = require('./components');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lang: languages['en'],
            message: '',
            cryptType: 'stirl',
            error: '',
            key: ''
        };

        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onCipherChange = this.onCipherChange.bind(this);
        this.onKeyChange = this.onKeyChange.bind(this);
        this.onMessageFileChange = this.onMessageFileChange.bind(this);

    }

    onKeyChange(newKey) {
        this.setState({
            key: newKey
        })
    }

    encrypt() {
        const cryptType = this.state.cryptType;

        const message = utf8.encode(this.state.message);
        const key = utf8.encode(this.state.key);
        const lang = utf8.encode(this.state.lang);

        const cipher = new ciphers[cryptType](message, key, lang, cryptType);

        const { message: encryptedMessage, error, additional } = cipher.encrypt();

        let state;
        if (error) {
            state = {
                error
            }
        } else {
            state = {
                error: '',
                message: encryptedMessage,
                additional
            }
        }
        this.setState(state);
    }

    decrypt() {
        const cryptType = this.state.cryptType;

        const message = this.state.message;
        const key = utf8.encode(this.state.key);
        const lang = utf8.encode(this.state.lang);

        const cipher = new ciphers[cryptType](message, key, lang, cryptType);

        const { message: decryptedMessage, error, additional } = cipher.decrypt();

        let state;
        if (error) {
            state = {
                error
            }
        } else {
            state = {
                error: '',
                message: utf8.decode(decryptedMessage),
                additional
            }
        }
        this.setState(state)
    }

    onMessageChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    onCipherChange(event) {
        this.setState({
            cryptType: event.target.value.toLowerCase()
        },() => this.render());
    }

    fileChange(event, callback) {
        const file = event.target.files[0];
        const fr = new FileReader();

        fr.onload = () => {
            callback(fr.result.slice(0, -1));
        };
        fr.readAsText(file);
    }

    onMessageFileChange(event) {
        this.fileChange(event, (message) => this.setState({ message }))
    }

    render() {
        let cipher = components(
            this.onKeyChange,
            this.state.additional,
            this.fileChange)[this.state.cryptType];

        return (
            <div className="form-group">
                <textarea
                    className="form-control"
                    id="message" onChange={this.onMessageChange}
                    value={this.state.message}
                    placeholder="Type in your message"
                    rows="5">
                </textarea>
                <input type="file" id="messageFile" onChange={this.onMessageFileChange} accept="text/txt"/>

                {cipher}

                <h6 className="pull-right" id="count_message">
                </h6><br/>
                <button
                    className="btn btn-info"
                    type="submit"
                    onClick={this.encrypt}>
                    Encrypt
                </button>&nbsp;
                <button
                    className="btn btn-info"
                    type="submit"
                    onClick={this.decrypt}>
                    Decrypt
                </button>

                <select style={{float: 'right'}} onChange={this.onCipherChange}>
                    <option>Stirl</option>
                    <option>DES-CBC</option>
                    <option>DES-ECB</option>
                </select>
                <br/>{this.state.error}
            </div>
        );
    }
}

module.exports = App;
