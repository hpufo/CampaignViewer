var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/app.js",
  module: {
    //rules replaced loaders from webpack 1
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [['es2015', { modules: false }], 'react', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', "transform-object-rest-spread"],
        }
      },
      {
        test: /\.scss$/,
        //use: allows us to use multiple loaders (Webpacks loads from the bottom up. So sass-loader will be first)
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: __dirname + "/build/",
    filename: "app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      beautify: false,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        collapse_vars: true,
        reduce_vars: true,
        booleans: true,
        evaluate: true,
        unused: true,
        unsafe: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        drop_debugger: true,
        properties: true,
        comparisons: false,
        loops: true,
        hoist_funs: true,
        cascade: true,
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require', '_'],
        keep_fnames: true,
        screw_ie8: true
      },
      output: {
        comments: false,
        ascii_only: true
      }
    }),
  ],
};
