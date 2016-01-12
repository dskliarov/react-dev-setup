// For info about this file refer to webpack and webpack-hot-middleware documentation
// Rather than having hard coded webpack.config.js for each environment, this
// file generates a webpack config for the environment passed to the getConfig method.
var webpack = require('webpack');
var path = require('path');

var getPlugins = function(env) {
  var plugins = [new webpack.optimize.OccurenceOrderPlugin()];

  switch(env) {
    case 'production':
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true}));
      break;
    case 'development':
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }

  return plugins;
};

var getLoaders = function(env) {
  var loaders = [
    { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint'] },
    /*{ test: /(\.css|\.scss)$/, include: path.join(__dirname, 'src'), loaders: ['style', 'css', 'sass'] },*/
    {
       test: /\.css?$/,
       loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
    }
  ];

  return loaders;
};

var getEntry = function(env) {
  var entry = [];

  if (env == 'development') { //only want hot reloading when in dev.
    entry.push('webpack-hot-middleware/client');
  }

  entry.push('./src/index');
  return entry;
};

var getPostCSS = function(env) {

  var postCSS = [
    /* autoprefix for different browser vendors */
    require('autoprefixer'),
    /* enable css @imports like Sass/Less */
    //require("postcss-import"),
    /* enable mixins like Sass/Less
    require('postcss-mixins')({
        mixins: require('git-styles-repo/src/mixins')
    }),*/
    /* enable nested css selectors like Sass/Less */
    require('postcss-nested'),
    require('postcss-simple-vars')
    /* require global variables
    require('postcss-simple-vars')({
        variables: function () {
            return require('git-styles-repo/src/variables');
        }
    }),
    */
  ];

  return postCSS;
};

module.exports = function getConfig(env) {
  return {
    debug: true,
    devtool: env == 'production' ? 'source-map' : 'eval-source-map', //more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, //set to false to see a list of every file being bundled.
    entry: getEntry(env),
    target: env == 'test' ? 'node' : 'web', //necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
      path: __dirname + '/dist/js',
      publicPath: '/js/',
      filename: 'bundle.js'
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env)
    },
    postcss: getPostCSS(env)
  }
};
