const React = require('react');

class Stirl extends React.Component {

    constructor(props) {
        super(props);

        this.onKeyChange = this.onKeyChange.bind(this)
    }

    onKeyChange(event) {
        const key = event.target.value;
        this.props.onKeyChange(key);
    }

    render() {
        return (
            <div>
                <textarea
                    className="form-control"
                    id="key" name="key"
                    placeholder="Type in your key"
                    rows="5" onChange={this.onKeyChange}>
                </textarea>
            </div>
        );
    }
}

module.exports = Stirl;
