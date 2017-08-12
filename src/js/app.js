import React from "react"
import ReactDOM from "react-dom"
import store from "./store"
import { Provider } from "react-redux"
import Layout from "./components/Layout"
import "../sass/styles.scss"

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
  <Layout />
</Provider>, app);
