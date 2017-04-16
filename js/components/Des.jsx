const React = require('react');

class Des extends React.Component {

    constructor(props) {
        super(props);

        this.onKeyChange = this.onKeyChange.bind(this);
        this.onKeyFileChange = this.onKeyFileChange.bind(this);
    }

    onKeyChange(event) {
        const key = event.target.value;
        this.props.onKeyChange(key)
    }

    onKeyFileChange(event) {
        this.props.onFileChange(event, (key) => {
            this.refs.key.value = key;
            this.onKeyChange({ target: { value: key } });
        })
    }

    render() {
        return (
            <div>
                <textarea
                    className="form-control" ref="key"
                    onChange={this.onKeyChange} name="key"
                    placeholder="Type in your key"
                    rows="5">
                </textarea>
                <input type="file" id="keyFile" onChange={this.onKeyFileChange} accept="text/txt"/>
            </div>
        );
    }
}

module.exports = Des;
