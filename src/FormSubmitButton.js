import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormSubmitButton extends Component {
  static defaultProps = {
    className: 'btn',
    label: 'Submit',
    invalid: false,
    submitting: false
  }
  static propTypes = {
    className: PropTypes.string,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    label: PropTypes.string
  }
  render() {
    const isDisabled = this.props.submitting || this.props.invalid;
    return (
      <button
        className={`${this.props.className} ${isDisabled ? 'btn-disabled' : ''}`}
        type="submit"
        onClick={this.props.handleClick}
      >
        {this.props.label}
      </button>
    );
  }
}