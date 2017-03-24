import React, { Component, PropTypes } from 'react';

export class SubmitButton extends Component {
  static defaultProps = {
    submitting: false,
    submitFailed: false,
    submitSucceeded: false,
    invalid: false,
    pristine: false,
    className: 'btn',
    styles: {},
    type: 'Submit',
    showIcons: true,
    timeout: 3000,
    labelSubmitting: '...Submitting',
    // start OK button messages
    labelSubmit: 'Submit',
    labelUpdate: 'Save Changes',
    labelPost: 'Post',
    labelCreate: 'Create',
    // start pristine button messages
    labelPristineSubmit: 'Incomplete',
    labelPristineUpdate: 'No Changes to Save',
    labelPristinePost: 'Incomplete',
    labelPristineCreate: 'Fill in required fields',
    // end pristine button messages
    labelInvalid: 'Invalid',
    labelSubmitFailed: 'Submission error',
    labelSubmitSucceeded: 'Success!'
  }
  static propTypes = {
    timeout: PropTypes.number,
    type: PropTypes.oneOf(['Create', 'Post', 'Update', 'Submit']),
    showIcons: PropTypes.bool,
    className: PropTypes.string,
    styles: PropTypes.object,
    submitting: PropTypes.bool,
    submitFailed: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    labelSubmitting: PropTypes.string,
    labelSubmit: PropTypes.string,
    labelUpdate: PropTypes.string,
    labelPost: PropTypes.string,
    labelCreate: PropTypes.string,
    labelPristineSubmit: PropTypes.string,
    labelPristineUpdate: PropTypes.string,
    labelPristinePost: PropTypes.string,
    labelPristineCreate: PropTypes.string,
    labelInvalid: PropTypes.string,
    labelSubmitFailed: PropTypes.string,
    labelSubmitSucceeded: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      lastActionWasSubmit: false,
      showSubmitState: false,
      hover: false,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitting) {
      this.setState({ lastActionWasSubmit: true });
    }
    if ((nextProps.submitFailed || nextProps.submitSucceeded) && this.state.lastActionWasSubmit) {
      this.setState({ showSubmitState: true, lastActionWasSubmit: false });
      setTimeout(() => this.setState({ showSubmitState: false }), this.props.timeout);
    }
  }
  onMouseOver() {
    this.setState({ hover: true });
  }
  onMouseOut() {
    this.setState({ hover: false });
  }
  render() {
    const { className, styles, showIcons } = this.props;
    const defaultLabel = this.props[`label${this.props.type}`];
    const defaultPristineLabel = this.props[`labelPristine${this.props.type}`];

    if (this.props.submitFailed && this.state.showSubmitState) {
      return (
        <button
          style={styles}
          className={`${className} btn-danger btn-outline`}
          disabled
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {showIcons && <span><i className="fa fa-times" /></span>}
          {this.props.labelSubmitFailed}
        </button>
      );
    } else if (this.props.submitSucceeded && this.state.showSubmitState) {
      return (
        <button
          style={styles}
          className={`${className} btn-success btn-outline`}
          disabled
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {showIcons && <span><i className="fa fa-check" /></span>}
          {this.props.labelSubmitSucceeded}
        </button>
      );
    } else if (this.props.submitting) {
      return (
        <button
          style={styles}
          className={`${className} btn-default btn-outline`}
          disabled
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {showIcons && <span><i className="fa fa-spinner fa-pulse fa-fw" /></span>} {this.props.labelSubmitting}
        </button>
      );
    } else if (this.props.invalid && !this.props.pristine) {
      return (
        <button
          style={styles}
          className={`${className} btn-default btn-outline`}
          disabled
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {this.state.hover ? this.props.labelInvalid : defaultLabel}
        </button>
      );
    } else if (!this.props.submitting && !this.props.pristine) {
      return (
        <button
          style={styles}
          className={`${className} btn-primary`}
          type="submit"
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {showIcons && <span><i className="fa fa-paper-plane-o" /></span>}
          {defaultLabel}
        </button>
      );
    } else if (!this.props.submitting && this.props.pristine) {
      return (
        <button
          style={styles}
          className={`${className} btn-primary btn-outline`}
          disabled
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {showIcons && <span><i className="fa fa-paper-plane-o" /></span>}
          {this.state.hover ? defaultPristineLabel : defaultLabel }
        </button>
      );
    }
    return (
      <button
        style={styles}
        className={`${className} btn-primary`}
        type="submit"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {showIcons && <span><i className="fa fa-paper-plane-o" /></span>}
        {defaultLabel}
      </button>
    );
  }
}

export default SubmitButton;
