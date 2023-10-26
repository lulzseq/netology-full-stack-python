import ReactDOM from 'react-dom/client'

import { Provider } from "react-redux";
import { store } from "./redux/store/";

import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
