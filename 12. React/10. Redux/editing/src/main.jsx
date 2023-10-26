import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
)
