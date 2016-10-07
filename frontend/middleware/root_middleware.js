import { applyMiddleware } from 'redux';
import PictureStreamMiddleware from './picture_stream_middleware';

const RootMiddleware = applyMiddleware(
  PictureStreamMiddleware
);

export default RootMiddleware;
