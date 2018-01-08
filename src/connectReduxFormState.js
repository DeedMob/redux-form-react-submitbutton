import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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


const connectReduxFormState = (WrappedComponent) => {
  const ConnectedWrappedComponent = connect(mapStateToProps)(WrappedComponent);
  const connectContext = (props, context) => // eslint-disable-next-line
    <ConnectedWrappedComponent {...props} _reduxForm={context._reduxForm} />
  connectContext.contextTypes = {
    _reduxForm: PropTypes.object.isRequired
  };
  return connectContext;
};


export default connectReduxFormState;
