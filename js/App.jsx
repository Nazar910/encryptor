const React = require('react');
const languages = require('./languages.js');
const ciphers = require('./ciphers');

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

    }

    onKeyChange(newKey) {
        this.setState({
            key: newKey
        })
    }

    encrypt() {
        const cipher = new ciphers[this.state.cryptType](
            this.state.message, this.state.key, this.state.lang);
        const { message, error, additional } = cipher.encrypt();

        let state;
        if (error) {
            state = {
                error
            }
        } else {
            state = {
                error: '',
                message,
                additional
            }
        }
        this.setState(state);
    }

    decrypt() {
        const cipher = new ciphers[this.state.cryptType](
            this.state.message, this.state.key, this.state.lang);

        const { message, error, additional } = cipher.decrypt();

        let state;
        if (error) {
            state = {
                error
            }
        } else {
            state = {
                error: '',
                message,
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

    copyToClip() {
        document.querySelector('#input').select();
        document.execCommand('copy');
    }

    render() {
        let cipher = components(this.onKeyChange, this.state.additional)[this.state.cryptType];

        return (
            <div className="form-group">
                <textarea
                    className="form-control"
                    id="message" onChange={this.onMessageChange}
                    value={this.state.message}
                    placeholder="Type in your message"
                    rows="5">
                </textarea>

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

                <select style={{float: 'right'}} onChange={this.onLangChange}>
                    <option>en</option>
                    <option>ru</option>
                    <option>ua</option>
                </select>

                <select style={{float: 'right'}} onChange={this.onCipherChange}>
                    <option>Stirl</option>
                    <option>Des</option>
                </select>
                <br/>{this.state.error}
            </div>
        );
    }
}

module.exports = App;
