import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class SubmitButton extends Component {
  static defaultProps = {
    className: 'btn',
    disabledClassName: 'btn-outline',
    successClassName: 'btn-success',
    errorClassName: 'btn-danger',
    okClassName: 'btn-primary',
    submittingClassName: 'btn-default',
    invalidClassName: 'btn-warning',
    styles: {},
    iconStyles: { marginRight: '5px' },
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
    disabledClassName: PropTypes.string,
    successClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    okClassName: PropTypes.string,
    invalidClassName: PropTypes.string,
    submittingClassName: PropTypes.string,
    styles: PropTypes.object,
    iconStyles: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
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
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
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
  mouseOver() {
    this.setState({ hover: true });
  }
  mouseOut() {
    this.setState({ hover: false });
  }
  render() {
    const { className, styles, showIcons, iconStyles, disabledClassName, okClassName,
       successClassName, errorClassName, invalidClassName, submittingClassName } = this.props;
    const defaultLabel = this.props[`label${this.props.type}`];
    const defaultPristineLabel = this.props[`labelPristine${this.props.type}`];

    const classNames = [className];
    let buttonIcon = null;
    let buttonText = null;
    let isDisabled = false;

    if (this.props.submitFailed && this.state.showSubmitState) {
      isDisabled = true;
      classNames.push(errorClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-times" /></span>);
      }
      buttonText = (this.props.labelSubmitFailed);
    } else if (this.props.submitSucceeded && this.state.showSubmitState) {
      isDisabled = true;
      classNames.push(successClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-check" /></span>);
      }
      buttonText = (this.props.labelSubmitSucceeded);
    } else if (this.props.submitting) {
      isDisabled = true;
      classNames.push(submittingClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-spinner fa-pulse fa-fw" /></span>);
      }
      buttonText = (this.props.labelSubmitting);
    } else if (this.props.invalid && !this.props.pristine) {
      isDisabled = true;
      classNames.push(invalidClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-warning" /></span>);
      }
      if (this.state.hover) {
        buttonText = (this.props.labelInvalid);
      } else {
        buttonText = (defaultLabel);
      }
    } else if (this.props.invalid && this.props.pristine) {
      isDisabled = true;
      classNames.push(invalidClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-warning" /></span>);
      }
      if (this.state.hover) {
        buttonText = defaultPristineLabel;
      } else {
        buttonText = (defaultLabel);
      }
    } else if (!this.props.submitting && !this.props.pristine) {
      isDisabled = false;
      classNames.push(okClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-paper-plane-o" /></span>);
      }
      buttonText = (defaultLabel);
    } else if (!this.props.submitting && this.props.pristine) {
      isDisabled = true;
      classNames.push(okClassName);
      if (showIcons) {
        buttonIcon = (<span><i style={iconStyles} className="fa fa-paper-plane-o" /></span>);
      }
      if (this.state.hover) {
        buttonText = (defaultPristineLabel);
      } else {
        buttonText = (defaultLabel);
      }
    }
    if (isDisabled) {
      classNames.push(disabledClassName);
    }
    return (
      <button
        style={Object.assign(styles, isDisabled ? { cursor: 'pointer' } : {})}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        className={classNames.join(' ')}
        type="submit"
      >
        {buttonIcon}{buttonText}
      </button>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { _reduxForm } = ownProps;

  return {
    submitting: _reduxForm.submitting,
    pristine: _reduxForm.pristine,
    dirty: _reduxForm.dirty,
    submitSucceeded: _reduxForm.submitSucceeded,
    submitFailed: _reduxForm.submitFailed,
    invalid: _reduxForm.invalid
  };
};


const connectSubmitButton = (WrappedComponent) => {
  const ConnectedWrappedComponent = connect(mapStateToProps)(WrappedComponent);
  const connectContext = (props, context) => // eslint-disable-next-line
    <ConnectedWrappedComponent {...props} _reduxForm={context._reduxForm} />
  connectContext.contextTypes = {
    _reduxForm: PropTypes.object.isRequired
  };
  return connectContext;
};


export default connectSubmitButton(SubmitButton);
