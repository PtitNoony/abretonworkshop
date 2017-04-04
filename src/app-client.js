'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://localhost:3000'
});

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
