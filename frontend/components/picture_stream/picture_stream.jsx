import React from 'react';

class PictureStream extends React.Component {
  componentWillMount() {
    this.props.fetchPictures();
  }

  render() {
    const pictures = this.props.pictures.photos;
    if (pictures) {
      console.log(pictures);
      return (
        <div>
          <div className="picture-tile">
            <div className="picture-box">
              <img src={`${pictures[0].image_url}`}></img>
            </div>
          </div>
          <div className="picture-tile">
            <div className="picture-box">
              <img src={`${pictures[1].image_url}`}></img>
            </div>
          </div>
          <div className="picture-tile">
            <div className="picture-box">
              <img src={`${pictures[2].image_url}`}></img>
            </div>
          </div>
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
