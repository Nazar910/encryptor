const React = require('react');
const languages = require('./languages.js');
const ciphers = require('./ciphers');

const components = require('./components');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cryptType: 'stirl',
            lang: languages['en'],
            message: ''
        };
        console.log(this);

        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);

    }

    encrypt() {
        const key = document.getElementById('key').value;

        const message = ciphers[this.state.cryptType]
                            .encrypt(this.state.message, key);

        this.setState({
            message
        })
    }

    decrypt() {
        const key = document.getElementById('key').value;

        const message = ciphers[this.state.cryptType]
                            .decrypt(this.state.message, key);

        this.setState({
            message
        })
    }

    onMessageChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    render() {
        let cipher = components[this.state.cryptType];

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
            </div>
        );
    }
}

module.exports = App;
