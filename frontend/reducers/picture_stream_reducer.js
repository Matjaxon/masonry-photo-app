import { PictureStreamConstants } from '../actions/picture_stream_actions';
import merge from 'lodash/merge';

const defaultState = {
  pictures: {}
};

const PictureStreamReducer = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case PictureStreamConstants.RECEIVE_PICTURES:
      newState = merge({}, state);
      let existingPictures = newState.pictures.photos || [];
      let updatedPictures = existingPictures.concat(action.data.photos);
      newState.pictures.photos = updatedPictures;
      return newState;

    default:
      return state;
  }
};

export default PictureStreamReducer;
