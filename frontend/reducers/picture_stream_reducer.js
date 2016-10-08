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
      let existingPictures = newState.pictures;
      let updatedPictures = merge({}, existingPictures, action.data);
      newState.pictures = updatedPictures;
      return newState;

    default:
      return state;
  }
};

export default PictureStreamReducer;
