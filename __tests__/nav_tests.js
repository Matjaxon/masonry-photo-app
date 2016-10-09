import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import Nav from '../frontend/components/nav/nav';

describe("Navbar", () => {
  const nav = shallow(<Nav favorites={{}} />);

  it("starts out unfiltered", () => {
    expect(nav.state('onlyFavorites')).toBeFalsy();
  });

  const toggle = nav.find('.favorites-toggle');
  it("toggles filtered state when favorites toggle is clicked", () => {
    toggle.simulate("click");
    expect(nav.state('onlyFavorites')).toBeTruthy();

    toggle.simulate("click");
    expect(nav.state('onlyFavorites')).toBeFalsy();
  });
});
