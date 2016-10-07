export const PictureStreamConstants = {
  FETCH_PICTURES: "FETCH_PICTURES",
  RECEIVE_PICTURES: "RECEIVE_PICTURES"
};

export const fetchPictures = (req) => ({
  type: PictureStreamConstants.FETCH_PICTURES,
  req
});

export const receivePictures = (data) => ({
  type: PictureStreamConstants.RECEIVE_PICTURES,
  data
});
