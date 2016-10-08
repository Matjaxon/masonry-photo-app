import { applyMiddleware } from 'redux';
import PictureStreamMiddleware from './picture_stream_middleware';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

// Move "loggerMiddleware" into the RootMiddleware object to show state changes

const RootMiddleware = applyMiddleware(
  loggerMiddleware,
  PictureStreamMiddleware
);

export default RootMiddleware;
