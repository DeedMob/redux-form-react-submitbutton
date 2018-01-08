import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer, SubmissionError } from 'redux-form';
import SimpleForm from './SimpleForm';

const dest = document.getElementById('content');
const output = document.getElementById('output');
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

const ShowOutput = (props) => (<div>{JSON.stringify(props.data)}</div>);

const showResults = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ReactDOM.render(
        <ShowOutput data={data}/>,
        output
      );
      if (data.should_fail) {
        reject(new SubmissionError({should_fail: "is true"}));
      }
      resolve();
    }, 1000)
  })
}

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <center style={{paddingTop: "100px"}}>
        <SimpleForm onSubmit={showResults} />
      </center>
    </Provider>,
    dest
  )
}

render()
