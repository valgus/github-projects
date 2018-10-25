import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  componentDidMount() {
    if (this._subname) {
      this._subname.focus();
    }
  }

  render() {
    return (
      <div className="field">
        <div className="control">
          <input
            ref={input => {
              this._subname = input;
            }}
            value={this.props.value}
            type="text"
            className="input is-info is-rounded"
            placeholder="Start typing project name..."
            onChange={() => this.props.onChange(this._subname.value)}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Search;
