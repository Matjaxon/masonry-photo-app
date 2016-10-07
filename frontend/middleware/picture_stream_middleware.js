import * as PictureStreamAPI from '../util/picture_stream_util';
import {
  PictureStreamConstants,
  fetchPictures,
  receivePictures
} from '../actions/picture_stream_actions';

const PictureStreamMiddleware = ({ getState, dispatch }) => next => action => {
  let req;

  switch(action.type) {
    case PictureStreamConstants.FETCH_PICTURES:
      req = action.req || {};
      let fetchSuccess = (data) => dispatch(receivePictures(data));
      PictureStreamAPI.fetchPictures(req, fetchSuccess);
      return next(action);

    default:
      return next(action);
  }
};

export default PictureStreamMiddleware;
