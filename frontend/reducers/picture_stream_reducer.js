import { PictureStreamConstants } from '../actions/picture_stream_actions';
import merge from 'lodash/merge';

const defaultState = {
  pictures: {},
  favorites: {}
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

    case PictureStreamConstants.TOGGLE_FAVORITE:
      newState = merge({}, state);
      if (newState.favorites[action.picture.id]) { //alread favorited
        delete newState.favorites[action.picture.id];
      } else {
        newState.favorites[action.picture.id] = action.picture;
      }
      return newState;

    default:
      return state;
  }
};

export default PictureStreamReducer;
