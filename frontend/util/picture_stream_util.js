export const fetchPictures = (req, success, failure) => {
  const consumerKey = 'Us3if5x2sr6hN4TfWIMfJodwOdAa6sGgcsXzhoZ7';
  let data = req || {};
  data['consumer_key'] = consumerKey;
  data['feature'] = 'popular';
  data['image_size'] = 31;
  data['rpp'] = 40;
  $.ajax({
    method: "GET",
    url: `https://api.500px.com/v1/photos`,
    data,
    success
  });
};
