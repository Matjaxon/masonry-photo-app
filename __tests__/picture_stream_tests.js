import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PictureStream from '../frontend/components/picture_stream/picture_stream';

describe("Picture Stream", () => {
  const toggleFavorite = jest.genMockFunction();
  const fetchPictures = jest.genMockFunction();
  const pictures = {
    photos: [
      {id: 1, image_url: "http://placehold.it/350x150", height: 350, width: 150, name: "A", times_viewed: 500},
      {id: 2, image_url: "http://placehold.it/350x500", height: 350, width: 500, name: "B", times_viewed: 510},
      {id: 3, image_url: "http://placehold.it/350x600", height: 350, width: 600, name: "C", times_viewed: 520},
      {id: 4, image_url: "http://placehold.it/100x450", height: 100, width: 450, name: "D", times_viewed: 530},
      {id: 5, image_url: "http://placehold.it/200x1000", height: 200, width: 1000, name: "E", times_viewed: 530},
      {id: 6, image_url: "http://placehold.it/800x150", height: 800, width: 150, name: "F", times_viewed: 540},
      {id: 7, image_url: "http://placehold.it/350x500", height: 350, width: 500, name: "G", times_viewed: 550},
      {id: 8, image_url: "http://placehold.it/350x600", height: 350, width: 600, name: "H", times_viewed: 560},
      {id: 9, image_url: "http://placehold.it/100x450", height: 100, width: 450, name: "I", times_viewed: 570},
      {id: 10, image_url: "http://placehold.it/200x1000", height: 200, width: 1000, name: "J", times_viewed: 580},
      {id: 11, image_url: "http://placehold.it/800x150", height: 800, width: 150, name: "K", times_viewed: 590},
      {id: 12, image_url: "http://placehold.it/350x500", height: 350, width: 500, name: "L", times_viewed: 600},
      {id: 13, image_url: "http://placehold.it/350x600", height: 350, width: 600, name: "M", times_viewed: 610},
      {id: 14, image_url: "http://placehold.it/100x450", height: 100, width: 450, name: "N", times_viewed: 620},
      {id: 15, image_url: "http://placehold.it/200x1000", height: 200, width: 1000, name: "O", times_viewed: 630},
      {id: 16, image_url: "http://placehold.it/800x150", height: 800, width: 150, name: "P", times_viewed: 640}
    ]
  };
  const favorites = {
    1: pictures.photos[0],
    2: pictures.photos[1],
    3: pictures.photos[2]
  };

  describe("Unfiltered Picture Stream", () => {
    TestUtils.renderIntoDocument(
      <div className="picture-strema-outer-container"></div>
    );
    const pictureStream = TestUtils.renderIntoDocument(
      <PictureStream
        pictures={pictures}
        favorites={favorites}
        fetchPictures={fetchPictures}
        toggleFavorite={toggleFavorite}
        onlyFavorites={false}
      />
    );

    it("generates picture tiles for every picture in props", () => {
      TestUtils.renderIntoDocument(
        <div className="picture-strema-outer-container"></div>
      );
      const filteredPictureStream = TestUtils.renderIntoDocument(
        <PictureStream
        pictures={pictures}
        favorites={favorites}
        fetchPictures={fetchPictures}
        toggleFavorite={toggleFavorite}
        onlyFavorites={true}
        />
      );
      const favoriteTiles = TestUtils
        .scryRenderedDOMComponentsWithClass(filteredPictureStream, "picture-tile");
      expect(favoriteTiles.length).toEqual(Object.keys(favorites).length);
    });
  });

  describe("Filtered Picture Stream", () => {
    it("only generates picture tiles for favorite pictures", () => {

    });
  });
});
