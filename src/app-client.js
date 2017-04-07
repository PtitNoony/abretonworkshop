/* global window document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import axios from 'axios';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const AppClient = () => (
  <Router history={ history }>
    <App />
  </Router>
);

window.onload = () => {
  render(<AppClient />, document.getElementById('main'));
};