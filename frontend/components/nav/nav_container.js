import { connect } from 'react-redux';
import Nav from './nav';

const mapStateToProps = (state) => ({
  favorites: state.pictureStream.favorites
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
