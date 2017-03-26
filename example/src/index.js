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
//
// if (module.hot) {
//   // Support hot reloading of components
//   // and display an overlay for runtime errors
//   const renderApp = render
//   const renderError = (error) => {
//     const RedBox = require('redbox-react');
//     ReactDOM.render(
//       <RedBox error={error} className="redbox"/>,
//       dest
//     )
//   }
//   render = () => {
//     try {
//       renderApp()
//     } catch (error) {
//       renderError(error)
//     }
//   }
//   const rerender = () => {
//     setTimeout(render)
//   }
//   module.hot.accept('./SimpleForm', rerender)
//   module.hot.accept('!!raw-loader!./SimpleForm', rerender)
// }

render()
