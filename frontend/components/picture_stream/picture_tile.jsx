import React from 'react';

const PictureTile = ({ picture, pictureWidth, columnSize }) => {
  return(
    <div className="picture-tile" style={{width: `${columnSize}px`}}>
      <div>
        <div className="picture-box">
          <img src={`${picture.image_url}`}></img>
        </div>
        <div className="picture-details">
          <div className="picture-title">
            {picture.name}
          </div>
          <div className="picture-favorite">
            <i className="fa fa-heart-o fa-2x" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="picture-views" style={{width: `${pictureWidth}px`}}>
        {picture.times_viewed} views
      </div>
    </div>
  );
};

export default PictureTile;
