import React from 'react';
import PictureTile from './picture_tile';

const COLUMN_SIZE = 250;
const PICTURE_WIDTH = 230;

class PictureStream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 1,
      page: 1
    };
    this.minColumnHeight = 0;

    // Bind class methods
    this._determineSize = this._determineSize.bind(this);
    this._determineColumns = this._determineColumns.bind(this);
    this._calcHeight = this._calcHeight.bind(this);
    this._findShortestColumn = this._findShortestColumn.bind(this);
    this._setResizeListener = this._setResizeListener.bind(this);
    this._setScrollListener = this._setScrollListener.bind(this);
    this._getMorePictures = this._getMorePictures.bind(this);
    this._getFavoritePictures = this._getFavoritePictures.bind(this);
  }

  componentWillMount() {
    this.props.fetchPictures({page: this.state.page});
  }

  componentDidMount() {
    this._setResizeListener();
    this._setScrollListener();
  }

  componentWillUpdate() {
    this._determineColumns();
  }

  _getMorePictures() {
    let page = this.state.page;
    page += 1;
    this.props.fetchPictures({page});
    this.setState({page});
  }

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

  _calcHeight(picture) {
    let ratio = picture.height / picture.width;
    let pictureHeight = PICTURE_WIDTH * ratio;
    return pictureHeight;
  }

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

  // Assign event listeners.  Call methods after component is mounted.
  _setResizeListener() {
    let el = document.getElementById("picture-stream-outer-container");
    window.addEventListener("resize", this._determineColumns);
  }

  _setScrollListener() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > this.minColumnHeight) {
        this._getMorePictures();
      }
    });
  }

  _getFavoritePictures() {
    let favorites = this.props.favorites;
    let keys = Object.keys(favorites);
    return keys.map(key => favorites[key]);
  }

  render() {
    const pictures = (this.props.onlyFavorites) ?
      this._getFavoritePictures() : this.props.pictures.photos;
    if (pictures) {
      let columns = [];
      let columnHeights = {};

      for(let i = 0; i < this.state.columnCount; i++) {
        columns[i] = [];
        columnHeights[i] = 0;
      }
      pictures.forEach(picture => {
        let pictureElement = (<li key={picture.id}>
            <PictureTile picture={picture}
              pictureWidth={PICTURE_WIDTH}
              columnSize={COLUMN_SIZE}
              toggleFavorite={this.props.toggleFavorite}
              isFavorite={(this.props.favorites[picture.id]) ? true : false}/>
          </li>);

        /*
        Approximate which column is the shortest currently based on the height
        of the pictures in that column (title text isn't taken into account).
        Then, determine picture's visible height after filling available width.
        Add the height to the hash and update the minimum column variable.
        Can be optimized with a priority queue if performance becomes sluggish
        from iterations but since column count should be minimal it shouldn't be
        necessary.
        */
        let shortestColumn = this._findShortestColumn(columnHeights);
        let pictureHeight = this._calcHeight(picture);
        columns[shortestColumn].push(pictureElement);
        columnHeights[shortestColumn] += pictureHeight;
      });

      // Turn the column arrays into unordered lists to be rendered.
      let columnElements = [];
      columns.forEach((column, idx) => {
        columnElements.push(
          <ul className="picture-stream-column" key={`column-${idx}`}>
            {columns[idx]}
          </ul>
        );
      });

      /*
      For inifite scroll to trigger when zoomed out, the minColumnHeight
      is reduced by a factor that will trigger the picture call sooner.
      */
      let heightReductionFactor = 0.6;
      let shortestColumn = this._findShortestColumn(columnHeights);
      this.minColumnHeight = columnHeights[shortestColumn] * heightReductionFactor;
      return (
        <div className="picture-stream-container" id="picture-stream">
          {columnElements}
        </div>
      );
    } else {
      return(
        <div>Loading...</div>
      );
    }
  }
}

export default PictureStream;
