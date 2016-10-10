# Masonry Photo App

[Live on Github Pages](https://matjaxon.github.io/masonry-photo-app/)

This application leverages the 500px API and displays photos from the
"popular" category in a masonry layout.  This application also features
infinite scroll and fetches additional pictures as the user scrolls down
the page.  Additionally, clicking on a photo marks it as favorited.  A
count of the user's favorites is maintained in the header bar and a toggle
has been included to only show favorited pictures.

![](http://res.cloudinary.com/dbwkodu79/image/upload/v1476080022/masonry_photo_app/Screen_Shot_2016-10-09_at_11.12.04_PM.png)

## Redux Implementation

This application was constructed following the Redux pattern.  A central data is maintained and specific components are subscribed to the store, listening for specific state changes.  When any of those states change, new props are fed to the components and they re-render as needed.

## Bonuses

In addition to initial specs the following bonuses items have been included:
* Filtering to only show favorited photos (See Topbar section)
* Tests

## Features

### Photostream

#### Masonry Layout
Pictures pulled from the 500px API all maintain their
original aspect ratio; however, they are displayed in
a tile with a fixed width.  The heights adjust to maintain the aspect ratio and yield tiles of varied heights giving the application the masonry layout.

When the component is mounted, it determines the size of the container `<div>` that is wrapped around the `PictureStream` component and calculates the number of columns.

```
// picture_stream.jsx

_determineColumns() {
  let componentSize = this._determineSize();
  let columnCount = parseInt(componentSize / COLUMN_SIZE);
  if (columnCount !== this.state.columnCount && columnCount > 0) {
    this.setState({columnCount});
  }
}

_determineSize() {
  let el = document.getElementById("picture-stream-outer-container");
  return el.offsetWidth;
}
```
Once the application determines how many columns fit into the window, an object tracking the heights of the columns is initialized.  As the application iterates through the pictures to display, a new `PictureTile` component is instantiated, the shortest column is determined, the new tile is added to that column, and the column's height is updated in the column heights object.  This approach prevents the layout from becoming off balanced from some pictures being significantly taller than others.  

```
// picture_stream.jsx

_findShortestColumn(heights) {
  let keys = Object.keys(heights);
  let shortestColumn = null;
  let shortestColumnHeight = Infinity;

  keys.forEach(key => {
    if (heights[key] < shortestColumnHeight) {
      shortestColumn = key;
      shortestColumnHeight = heights[key];
    }
  });

  return shortestColumn;
}

render() {
  ...
  pictures.forEach(picture => {
    let pictureElement = (<li key={picture.id}>
        <PictureTile picture={picture}
          pictureWidth={PICTURE_WIDTH}
          columnSize={COLUMN_SIZE}
          toggleFavorite={this.props.toggleFavorite}
          isFavorite={(this.props.favorites[picture.id]) ? true : false}/>
      </li>);

    let shortestColumn = this._findShortestColumn(columnHeights);
    let pictureHeight = this._calcHeight(picture);
    columns[shortestColumn].push(pictureElement);
    columnHeights[shortestColumn] += pictureHeight;
  });
  ...
}
```

#### Dynamic Resizing

Whenever the window is resized, a method listening for the event fires to see if the number of columns needs to change.  With the way that the masonry layout was implemented tracking the shortest columns, when the window is resized, the order of the tiles is maintained.  When the column count changes, the component re-renders and follows the same distribution process.

```
// picture_stream.jsx

// Called after component has mounted
_setResizeListener() {
  let el = document.getElementById("picture-stream-outer-container");
  window.addEventListener("resize", this._determineColumns);
}
```

#### Infinite Scroll

When the user scrolls, an event listener is checking the window offset against the height of the shortest tile column, which is maintained as an attribute on the ```PictureStream``` object and is reassigned at the end of the render method after all the tiles have been distributed.  Once, the user scrolls to the assigned height, a callback fires to retrieve the next page of photos from the 500px API.  

```
// picture_stream.jsx

_getMorePictures() {
  let page = this.state.page;
  page += 1;
  this.props.fetchPictures({page});
  this.setState({page});
}

// Called after component has mounted
_setScrollListener() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > this.minColumnHeight) {
      this._getMorePictures();
    }
  });
}
```

#### Favoriting

Clicking on a tile updates the state of the tile to be favorited and fires a callback to update the object tracking favorited photos in the central store.

```
// picture_stream_reducer.js

const PictureStreamReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
  ...
  case PictureStreamConstants.TOGGLE_FAVORITE:
    newState = merge({}, state);
    if (newState.favorites[action.picture.id]) { //already favorited
      delete newState.favorites[action.picture.id];
    } else {
      newState.favorites[action.picture.id] = action.picture;
    }
    return newState;
    ...
  }
};
```

### Topbar

The top of the application features a sticky nav bar that tracks the number of photos the user has favorited.

#### Favorites Filter Toggle

A user can click the filter toggle on the topbar to only show pictures that they have favorited.  When this is toggled, it changes the state of the `Nav`, causing it to re-render and passes in new props to `PictureStream`, specifically whether or not to show filtered pictures.

```
// picture_stream.jsx

_getFavoritePictures() {
  let favorites = this.props.favorites;
  let keys = Object.keys(favorites);
  return keys.map(key => favorites[key]);
}

render() {
  const pictures = (this.props.onlyFavorites) ?
    this._getFavoritePictures() : this.props.pictures.photos;
  ...
}
```

## Testing

Tests were performed using `jest` and `enzyme`.
