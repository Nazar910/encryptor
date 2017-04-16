const React = require('react');

class Des extends React.Component {

    constructor(props) {
        super(props);

        this.onKeyChange = this.onKeyChange.bind(this)
    }

    onKeyChange(event) {
        const key = event.target.value;
        this.props.onKeyChange(key)
    }

    render() {
        return (
            <div>
                <textarea
                    className="form-control"
                    onChange={this.onKeyChange} name="key"
                    placeholder="Type in your key"
                    rows="5">
                </textarea>
            </div>
        );
    }
}

module.exports = Des;
