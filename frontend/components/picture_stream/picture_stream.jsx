import React from 'react';
import PictureTile from './picture_tile';

const COLUMN_SIZE = 300;
const PICTURE_WIDTH = 280;

class PictureStream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 1,
      page: 1
    };
    this.minColumnHeight = 0;

    this._determineSize = this._determineSize.bind(this);
    this._determineColumns = this._determineColumns.bind(this);
    this._calcHeight = this._calcHeight.bind(this);
    this._findShortestColumn = this._findShortestColumn.bind(this);
    this._setResizeListener = this._setResizeListener.bind(this);
    this._setScrollListener = this._setScrollListener.bind(this);
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

  _setResizeListener() {
    let el = document.getElementById("picture-stream-outer-container");
    window.addEventListener("resize", this._determineColumns);
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

  _setScrollListener() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > this.minColumnHeight) {
        let page = this.state.page;
        page += 1;
        this.props.fetchPictures({page});
        this.setState({page});
      }
    });
  }

  render() {
    const pictures = this.props.pictures.photos;
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
              toggleFavorite={this.props.toggleFavorite}/>
          </li>);
        let pictureHeight = this._calcHeight(picture);
        let shortestColumn = this._findShortestColumn(columnHeights);
        columns[shortestColumn].push(pictureElement);
        columnHeights[shortestColumn] += pictureHeight;
      });
      let columnElements = [];
      columns.forEach((column, idx) => {
        columnElements.push(
          <ul className="picture-stream-column" key={`column-${idx}`}>
            {columns[idx]}
          </ul>
        );
      });

      let shortestColumn = this._findShortestColumn(columnHeights);
      this.minColumnHeight = columnHeights[shortestColumn];

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
