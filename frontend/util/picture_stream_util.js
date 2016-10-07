export const fetchPictures = (req, success, failure) => {
  const consumerKey = 'Us3if5x2sr6hN4TfWIMfJodwOdAa6sGgcsXzhoZ7';
  $.ajax({
    method: "GET",
    url: `https://api.500px.com/v1/photos?feature=popular&consumer_key=${consumerKey}&image_size=31`,
    success
  });
};
