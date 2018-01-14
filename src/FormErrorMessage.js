import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormErrorMessage extends Component {
  static defaultProps = {
    syncErrors: {},
    error: null
  }
  static propTypes = {
    syncErrors: PropTypes.object,
    error: PropTypes.any
  }
  render() {
    if (Object.keys(this.props.syncErrors).length > 0) {
      return (
        <div className="alert alert-danger" role="alert">
          {'Please double-check that these fields are correct and try again'}
          <ul>
            {Object.keys(this.props.syncErrors).map(key =>
              <li key={key}>{key}</li>
            )}
          </ul>
        </div>
      );
    }
    if (this.props.error) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.props.error}
        </div>
      );
    }
    return null;
  }
}