# redux-form-react-submitbutton

A submit button for `redux-form` that dynamically changes based on the current redux-form state.

## Demo

https://deedmob.github.io/redux-form-react-submitbutton/example/

## Installing

`yarn add redux-form-react-submitbutton`

`npm install redux-form-react-submitbutton`

## Example usage (using default Components provided)

```jsx
  import { FormSubmissionHandler, FormErrorMessage, FormSubmitButton } from 'redux-form-react-submitbutton';

  @reduxForm({
    form: 'account'
  })
  class AccountForm extends React.Component {
    render(){
      <form>
        <Field name="email" component={TextInput} />
        <FormSubmissionHandler>
          <FormSubmitButton /> {/* First Child is the submit button */}
          <FormErrorMessage /> {/* Second Child is the error message handler, optional */}
        </FormSubmissionHandler>
        <br/>
      </form>
    }
  }
```

## Custom Usage (probably what you want, although you can use the provided components as guidelines)

```jsx
  import { FormSubmissionHandler } from 'redux-form-react-submitbutton';

  const CustomSubmitButton = ({ invalid, submitting }) => {
    if(submitting)
      return <SpinnerButton/>
    if(invalid)
      return <ErrorButton/>
    return <NormalButton/>
  }
  
  const CustomErrorMessage = ({ syncErrors, error }) => {
    if(syncErrors){
      return (
        <ul>
          {Object.keys(this.props.syncErrors).map(key =>
            <li key={key}>{key}</li>
          )}
        </ul>
      )
    }
    if(error)
      return error
    return null;
  }

  @reduxForm({
    form: 'account'
  })
  class AccountForm extends React.Component {
    render(){
      <form>
        <Field name="email" component={TextInput} />
        <FormSubmissionHandler>
          <CustomSubmitButton /> {/* First Child is the submit button */}
          <CustomErrorMessage /> {/* Second Child is the error message handler, optional */}
        </FormSubmissionHandler>
        <br/>
      </form>
    }
  }
```


## Components

`import { FormSubmissionHandler, FormErrorMessage, FormSubmitButton, connectReduxFormState } from 'redux-form-react-submitbutton';`

### FormSubmissionHandler

Expects one or two `children`, the first being injectedProps the props: `submitting: bool`
`invalid: bool`. The second is injected the props `syncErrors: {[key]: value}`,
`error: null | string`.

### FormSubmitButton

Injected props:
`submitting: bool`
`invalid: bool`

Convenient props:
className: 'btn',
label: 'Submit',

### FormErrorMessage

Injected props:
`syncErrors: {[key]: value}` // keys are redux-form Field name unique identifiers, {} on no errors.
`error: null | string`

### connectReduxFormState

is a HOC that when used as :`connectReduxFormState(WrappedComponent)`
injects the following props to your component:
```
  _reduxForm: _reduxForm
  syncErrors: _reduxForm.syncErrors || {},
  error: _reduxForm.error,
  syncWarnings: _reduxForm.syncWarnings || {},
  submitting: _reduxForm.submitting,
  pristine: _reduxForm.pristine,
  dirty: _reduxForm.dirty,
  error: _reduxForm.error,
  submitSucceeded: _reduxForm.submitSucceeded,
  submitFailed: _reduxForm.submitFailed,
  invalid: _reduxForm.invalid
```

## Suggested usage

Import this library and create your own React Component that wraps it, and passes in your configuration options or internationalization library. Then export that Component and use the new Component in all your forms.
