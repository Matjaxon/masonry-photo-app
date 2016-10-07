import React from 'react';
import { Provider } from 'react-redux';

import Nav from './nav/nav';

const Root = ({ store }) => {
  return(
    <Provider store={store} >
      <div className="app">
        <Nav />
      </div>
    </Provider>
  );
};

export default Root;
