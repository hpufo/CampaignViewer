import React from 'react';
import ReactDOM from 'react-dom';
import store from "./js/store"
import { Provider } from "react-redux"
import Layout from "./js/components/Layout"
import "./sass/all-styles.scss"
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}>
  <Layout />
</Provider>, document.getElementById('root'));
registerServiceWorker();
