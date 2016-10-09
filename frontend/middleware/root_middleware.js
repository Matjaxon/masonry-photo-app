import { applyMiddleware } from 'redux';
import PictureStreamMiddleware from './picture_stream_middleware';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

// Move "loggerMiddleware" into the RootMiddleware object to show state changes
// loggerMiddleware,

const RootMiddleware = applyMiddleware(
  PictureStreamMiddleware
);

export default RootMiddleware;
