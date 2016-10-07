import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

import configureStore from './store/store';

import { fetchPictures } from './util/picture_stream_util.js';

document.addEventListener("DOMContentLoaded", ()=> {
  const root = document.getElementById("root");
  const store = window.store = configureStore();

  ReactDOM.render(<Root store={store} />, root);
});
