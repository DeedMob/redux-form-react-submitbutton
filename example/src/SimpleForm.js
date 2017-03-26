import React from 'react';
import SubmitButton from 'redux-form-react-submitbutton';
import { Field, reduxForm } from 'redux-form';

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="first_name"
            component="input"
            type="text"
            placeholder="enter here"
            validate={(value) => value.length !== 0}
          />
        </div>
      </div>
      <div>
        <SubmitButton />
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)
