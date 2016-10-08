export const PictureStreamConstants = {
  FETCH_PICTURES: "FETCH_PICTURES",
  RECEIVE_PICTURES: "RECEIVE_PICTURES",
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE"
};

export const fetchPictures = (req) => ({
  type: PictureStreamConstants.FETCH_PICTURES,
  req
});

export const receivePictures = (data) => ({
  type: PictureStreamConstants.RECEIVE_PICTURES,
  data
});

export const toggleFavorite = (picture) => ({
  type: PictureStreamConstants.TOGGLE_FAVORITE,
  picture
});
