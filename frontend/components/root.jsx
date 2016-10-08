import React from 'react';
import { Provider } from 'react-redux';

import NavContainer from './nav/nav_container';

const Root = ({ store }) => {
  return(
    <Provider store={store} >
      <div className="app">
        <NavContainer />
      </div>
    </Provider>
  );
};

export default Root;
