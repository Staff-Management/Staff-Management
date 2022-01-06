import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { MaterialUIControllerProvider } from "context";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
