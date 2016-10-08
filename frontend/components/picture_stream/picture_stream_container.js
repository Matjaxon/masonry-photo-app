import { connect } from 'react-redux';
import PictureStream from './picture_stream';
import { fetchPictures,
         toggleFavorite
       } from '../../actions/picture_stream_actions';

const mapStateToProps = (state) => ({
  pictures: state.pictureStream.pictures
});

const mapDispatchToProps = (dispatch) => ({
  fetchPictures: (req) => dispatch(fetchPictures(req)),
  toggleFavorite: (picture) => dispatch(toggleFavorite(picture))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureStream);
