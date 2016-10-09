import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PictureTile from '../frontend/components/picture_stream/picture_tile';

describe("PictureTile", () => {
  const toggleFavorite = jest.genMockFunction();
  const favoritedPictureTile = TestUtils.renderIntoDocument(
    <PictureTile
    isFavorite={true}
    picture={{image_url: "http://www.example.com"}}
    toggleFavorite={toggleFavorite}/>
  );

  const pictureTile = TestUtils.renderIntoDocument(
    <PictureTile
    isFavorite={false}
    picture={{image_url: "http://www.example.com"}}
    toggleFavorite={toggleFavorite}/>
  );

  it('sets isFavorite prop as state', () => {
    expect(favoritedPictureTile.state.isFavorite).toBeTruthy();
    expect(pictureTile.state.isFavorite).toBeFalsy();
  });

  it("toggles the isFavorite state after click", () => {
    const pictureTileNode = ReactDOM.findDOMNode(pictureTile);
    TestUtils.Simulate.click(pictureTileNode);
    expect(pictureTile.state.isFavorite).toBeTruthy();

    TestUtils.Simulate.click(pictureTileNode);
    expect(pictureTile.state.isFavorite).toBeFalsy();
  });
});
