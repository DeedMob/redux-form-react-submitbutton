# redux-form-react-submitbutton

A submit button for `redux-form` that dynamically changes based on the current redux-form state.
Could be used without `redux-form`, but is intended for use with `redux-form`'s props.

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
        <Field name="email" component={TextInput}/>
        <SubmitButton type="Update" />
      </form>
    }
  }
```

## Props

```js

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

```

## Testing

`yarn run test`

## TODOS

- [ ] Add a box above submit button which displays the errors - look at trainline.com
