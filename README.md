# redux-form-react-submitbutton

A submit button for `redux-form` that dynamically changes based on the current redux-form state.

## Demo

https://deedmob.github.io/redux-form-react-submitbutton/example/

## Installing

`yarn add redux-form-react-submitbutton`

`npm install redux-form-react-submitbutton`

## Example usage

```jsx
  @reduxForm({
    form: 'account'
  })
  class AccountForm extends React.Component {
    render(){
      <form>
        <Field name="email" component={TextInput} />
        <SubmitButton />
      </form>
    }
  }
```

## Props

There are no required props

```js

static defaultProps = {
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
  labelSubmitting: PropTypes.string,
  labelSubmit: PropTypes.string,
  labelUpdate: PropTypes.string,
  labelPost: PropTypes.string,
  labelCreate: PropTypes.string,
  labelInvalid: PropTypes.string,
  labelSubmitFailed: PropTypes.string,
  labelSubmitSucceeded: PropTypes.string
}

```

## Testing

`yarn run test`

## TODOS

- [ ] Handle nested object SyncErrors (for example in FieldArray examples)
- [ ] Handle syncWarnings
- [ ] Redux-Form context syncErrors and internal Redux-Form syncErrors are not in sync (only sync on Submit), however this means that the alert box shows only a subset of its last submit errors 
- [ ] Clear clicked State after submitSuccess


## Suggested usage

Import this library and create your own React Component that wraps it, and passes in your configuration options or internationalization library. Then export that Component and use the new Component in all your forms.
