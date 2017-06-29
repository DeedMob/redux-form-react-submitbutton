import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class SubmitButton extends Component {
  static defaultProps = {
    // Component class name
    submitButtonClassName: 'submit-button'
    // Button class names
    className: 'btn',
    disabledClassName: 'btn-outline',
    successClassName: 'btn-success',
    errorClassName: 'btn-danger',
    okClassName: 'btn-primary',
    submittingClassName: 'btn-default',
    invalidClassName: 'btn-warning',
    // added to outer div wrapper of error alert box
    syncErrorClassName: 'alert alert-danger',
    // Header text to add to the error alert box
    labelErrorAlert: 'Please double-check that these fields are correct and try again',
    buttonStyles: {},
    // Lets you pass a function that maps from Field `name` to something
    // to field name to show in list of errors in box
    translateKeys: key => key,
    // Should the box describing submission errors be shown on submitFailed?
    showErrors: true,
    alertListView: true,
    // How long should a Submission Error or Success be shown before reseting?
    asyncStatusDuration: 2000,
    // Button type, for quicker start, but could be removed from this library
    type: 'Submit',
    // Button text labels
    labelSubmitting: '...Submitting',
    labelSubmitFailed: 'Submission error',
    labelSubmitSucceeded: 'Success!',
    labelInvalid: 'Invalid',
    // Button labels, used based on which prop `type` this button has
    labelSubmit: 'Submit',
    labelUpdate: 'Save Changes',
    labelPost: 'Post',
    labelCreate: 'Create',
    // Icons set is by default font-awesome icons, and are added as classNames for an <i> element
    iconStyles: { marginRight: '5px' },
    showIcons: true,
    iconSubmit: 'fa fa-paper-plane-o',
    iconUpdate: 'fa fa-floppy-o',
    iconPost: 'fa fa-rocket',
    iconCreate: 'fa fa-plus',
    iconError: 'fa fa-times',
    iconWarning: 'fa fa-warning',
    iconSubmitting: 'fa fa-spinner fa-pulse fa-fw',
    iconSuccess: 'fa fa-check'
  }
  static propTypes = {
    asyncStatusDuration: PropTypes.number,
    type: PropTypes.oneOf(['Create', 'Post', 'Update', 'Submit']),
    showIcons: PropTypes.bool,
    iconSubmit: PropTypes.string,
    iconUpdate: PropTypes.string,
    iconPost: PropTypes.string,
    iconCreate: PropTypes.string,
    iconError: PropTypes.string,
    iconWarning: PropTypes.string,
    iconSubmitting: PropTypes.string,
    iconSuccess: PropTypes.string,
    translateKeys: PropTypes.func,
    labelErrorAlert: PropTypes.string,
    alertListView: PropTypes.bool,
    showErrors: PropTypes.bool,
    className: PropTypes.string,
    syncErrorClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    successClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    okClassName: PropTypes.string,
    invalidClassName: PropTypes.string,
    submittingClassName: PropTypes.string,
    buttonStyles: PropTypes.object,
    iconStyles: PropTypes.object,
    syncErrors: PropTypes.object.isRequired,
    syncWarnings: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    labelSubmitting: PropTypes.string,
    labelSubmit: PropTypes.string,
    labelUpdate: PropTypes.string,
    labelPost: PropTypes.string,
    labelCreate: PropTypes.string,
    labelInvalid: PropTypes.string,
    labelSubmitFailed: PropTypes.string,
    labelSubmitSucceeded: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      lastActionWasSubmit: false,
      showSubmitState: false,
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pristine) {
      this.setState({ clicked: false });
    }
    if (nextProps.submitting) {
      this.setState({ lastActionWasSubmit: true });
    }
    if ((nextProps.submitFailed || nextProps.submitSucceeded) && this.state.lastActionWasSubmit) {
      this.setState({ showSubmitState: true, lastActionWasSubmit: false });
      setTimeout(() => this.setState({ showSubmitState: false }), this.props.asyncStatusDuration);
    }
  }
  handleClick() {
    this.setState({ clicked: true });
  }
  render() {
    const { className, buttonStyles, showIcons, iconStyles, disabledClassName, okClassName,
       successClassName, errorClassName, alertListView, invalidClassName, submittingClassName } = this.props;
    const defaultLabel = this.props[`label${this.props.type}`];
    const defaultIcon = this.props[`icon${this.props.type}`];

    let dynamicClassName = '';
    let buttonIcon = null;
    let buttonText = null;
    const isDisabled = this.props.submitting || this.props.invalid;

    dynamicClassName = okClassName;
    buttonIcon = (<span><i style={iconStyles} className={defaultIcon} /></span>);
    buttonText = defaultLabel;

    if (this.props.submitFailed && this.state.showSubmitState) {
      dynamicClassName = errorClassName;
      buttonIcon = (<span><i style={iconStyles} className={this.props.iconError} /></span>);
      buttonText = this.props.labelSubmitFailed;
    } else if (this.props.submitSucceeded && this.state.showSubmitState) {
      dynamicClassName = successClassName;
      buttonIcon = (<span><i style={iconStyles} className={this.props.iconSuccess} /></span>);
      buttonText = this.props.labelSubmitSucceeded;
    } else if (this.props.submitting) {
      dynamicClassName = submittingClassName;
      buttonIcon = (<span><i style={iconStyles} className={this.props.iconSubmitting} /></span>);
      buttonText = this.props.labelSubmitting;
    } else if (this.props.invalid && this.state.clicked) {
      dynamicClassName = (invalidClassName);
      buttonIcon = (<span><i style={iconStyles} className={this.props.iconWarning} /></span>);
      buttonText = this.props.labelInvalid;
    }

    return (
      <div className={this.props.submitAndError}>
        {this.props.showErrors && (this.props.submitFailed || this.state.clicked) &&
          Object.keys(this.props.syncErrors).length > 0 &&
          <div className={this.props.syncErrorClassName} role="alert">
            {this.props.labelErrorAlert}
            <div>
              {alertListView && {Object.keys(this.props.syncErrors).map(key =>
                <li key={key}>{this.props.translateKeys(key)}</li>
              )}}
              {!alertListView && <p>{Object.keys(this.props.syncErros).join(", ")}</p>}
            </div>
          </div>
        }
        <button
          style={Object.assign({}, buttonStyles, isDisabled ? { cursor: 'pointer' } : {})}
          className={`${className} ${dynamicClassName} ${isDisabled ? disabledClassName : ''}`}
          type="submit"
          onClick={this.handleClick}
          >
          {showIcons && buttonIcon}{buttonText}
        </button>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { _reduxForm } = ownProps;

  return {
    syncErrors: _reduxForm.syncErrors || {},
    syncWarnings: _reduxForm.syncWarnings || {},
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
