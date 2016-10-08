import React from 'react';
import PictureTile from './picture_tile';

const ColumnSize = 250;
const PictureWidth = 230;

class PictureStream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 3,
      page: 1
    };

    this._determineSize = this._determineSize.bind(this);
    this._determineColumns = this._determineColumns.bind(this);
    this._calcHeight = this._calcHeight.bind(this);
    this._findShortestColumn = this._findShortestColumn.bind(this);
    this._setResizeListener = this._setResizeListener.bind(this);
  }

  componentWillMount() {
    this.props.fetchPictures({page: 1});
  }

  componentWillUpdate() {
    this._determineColumns();
  }

  componentDidMount() {
    this._setResizeListener();
  }

  _determineColumns() {
    let componentSize = this._determineSize();
    let columnCount = parseInt(componentSize / ColumnSize);
    if (columnCount !== this.state.columnCount) {
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
    let pictureHeight = PictureWidth * ratio;
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
        let pictureElement = (<li key={picture.id}><PictureTile
          picture={picture} /></li>);
        let pictureHeight = this._calcHeight(picture);
        let shortestColumn = this._findShortestColumn(columnHeights);
        columns[shortestColumn].push(pictureElement);
        columnHeights[shortestColumn] += pictureHeight;
      });
      let columnElements = [];
      columns.forEach((column, idx) => {
        columnElements.push(
          <ul key={`column-${idx}`}>
            {columns[idx]}
          </ul>
        );
      });
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
