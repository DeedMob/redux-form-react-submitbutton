import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SubmitButton from 'redux-form-react-submitbutton';

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h1>Redux-form SubmitButton component demo</h1>
      <div>
        <div>
          <Field
            name="first_name"
            component="input"
            type="text"
            placeholder="first name"
            validate={value => {
              if(!value || value.length === 0) return "must not be empty";
              return undefined;
            }}
          />
          <Field
            name="last_name"
            component="input"
            type="text"
            placeholder="last name"
            validate={value => {
              if(!value || value.length === 0) return "must not be empty";
              return undefined;
            }}
          />
        <Field
          name="should_fail"
          component="input"
          type="checkbox"
        /> <span>Should throw async SubmissionError?</span>
        </div>
      </div>
      <div>
        <SubmitButton
          translateKeys={key => key.toUpperCase()}
        />
        <br/>
        <button className="btn" type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values (not included in library)
        </button>
      </div>
      <h3>Form state</h3>
      <p style={{whiteSpace: "pre-wrap", marginTop: "30px"}}>
        {JSON.stringify(props).replace(/,/g, ',\n')}
      </p>
    </form>
  )
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)
