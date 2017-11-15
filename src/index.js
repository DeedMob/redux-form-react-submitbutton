import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class SubmitButton extends Component {
  static defaultProps = {
    // Button class names
    className: 'btn',
    componentClassName: 'submit-button',
    disabledClassName: 'btn-outline',
    successClassName: 'btn-success',
    errorClassName: 'btn-danger',
    okClassName: 'btn-primary',
    submittingClassName: 'btn-default',
    invalidClassName: 'btn-warning',
    // added to outer div wrapper of error alert box
    syncErrorClassName: 'alert alert-warning',
    // Header text to add to the error alert box
    labelErrorAlert: 'Please double-check following fields:',
    buttonStyles: {},
    // Lets you pass a function that maps from Field `name` to something
    // to field name to show in list of errors in box
    translateKeys: key => key,
    // Should the box describing submission errors be shown on submitFailed?
    showErrors: true,
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
    componentClassName: PropTypes.string.isRequired,
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
    submitErrors: PropTypes.object,
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
    labelSubmitSucceeded: PropTypes.string,
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
      componentClassName
     } = this.props;
    const defaultLabel = this.props[`label${this.props.type}`];
    const defaultIcon = this.props[`icon${this.props.type}`];

    let dynamicClassName = '';
    let buttonIcon = null;
    let buttonText = null;
    const isDisabled = this.props.submitting || this.props.invalid;

    dynamicClassName = okClassName;
    buttonIcon = (<span><i style={iconStyles} className={defaultIcon} /></span>);
    buttonText = defaultLabel;
    const syncErrorsRay = Object.keys(Object.assign({}, this.props.submitErrors, this.props.syncErrors));
    return (
      <div className={componentClassName}>
        {this.props.showErrors && (this.props.submitFailed || this.state.clicked) &&
          Object.keys(this.props.syncErrors).length > 0 &&
          <div className={this.props.syncErrorClassName} style={{ marginBottom: '14px' }} role="alert">
            <i className="fa fa-exclamation" style={{ padding: '0 10px 0 0' }} />
            {this.props.labelErrorAlert}
            {syncErrorsRay.map((key, i) =>
              <span key={key}>
                {' '}{this.props.translateKeys(key)}
                {i === syncErrorsRay.length - 1 ? '' : ','}
              </span>
            )}
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
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { _reduxForm } = ownProps;

  return {
    syncErrors: _reduxForm.syncErrors || {},
    submitErrors: _reduxForm.submitErrors || {},
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
