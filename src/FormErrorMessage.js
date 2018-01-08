import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormErrorMessage extends Component {
  static defaultProps = {
    syncErrors: {}
  }
  static propTypes = {
    syncErrors: PropTypes.object
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
    return null;
  }
}