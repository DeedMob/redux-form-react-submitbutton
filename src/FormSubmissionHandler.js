import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectReduxFormState from './connectReduxFormState';

class FormSubmissionHandler extends Component {
  static defaultProps = {
    asyncStatusDuration: 2000,
    invalid: false
  }
  static propTypes = {
    asyncStatusDuration: PropTypes.number,
    syncErrors: PropTypes.object.isRequired,
    syncWarnings: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    _reduxForm: PropTypes.any.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      lastActionWasSubmit: false,
      showSubmitState: false,
      clicked: false,
    };
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
  handleClick = () => this.setState({ clicked: true });
  render() {
    const {
      children, submitting, invalid, syncErrors, asyncStatusDuration,
      submitFailed, submitSucceeded, pristine, dirty, syncWarnings,
      _reduxForm, dispatch,
      ...rest
    } = this.props;
    const childrenArray = React.Children.toArray(children);

    return (
      <div {...rest}>
        {(submitFailed || this.state.clicked) &&
          (Object.keys(syncErrors).length > 0) && childrenArray.length >= 2 &&
          React.cloneElement(childrenArray[1],
            { syncErrors })
        }
        {React.cloneElement(childrenArray[0], { submitting, invalid })}
      </div>
    );
  }
}

export default connectReduxFormState(FormSubmissionHandler);