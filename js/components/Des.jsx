const React = require('react');

class Des extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea
                    className="form-control"
                    id="key" name="key"
                    placeholder="Type in your key"
                    rows="5">
                </textarea>
            </div>
        );
    }
}

module.exports = Des;
