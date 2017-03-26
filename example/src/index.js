import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
const SimpleForm = require('./SimpleForm').default;

const dest = document.getElementById('content');
const output = document.getElementById('output');
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

const showResults = (data) => {
  ReactDOM.render(
    <div>{JSON.stringify(data)}</div>,
    output
  )
}

ReactDOM.render(
  <Provider store={store}>
    <SimpleForm onSubmit={showResults}/>
  </Provider>,
  dest
)
