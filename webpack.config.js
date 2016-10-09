
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/app.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015","react"]
        }
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=8192' },
      { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=font/" },
      { test: /\.svg$/, loader: "file" }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
