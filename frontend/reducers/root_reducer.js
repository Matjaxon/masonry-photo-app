import { combineReducers } from "redux";
import PictureStreamReducer from './picture_stream_reducer';

const RootReducer = combineReducers({
    pictureStream: PictureStreamReducer
});

export default RootReducer;
