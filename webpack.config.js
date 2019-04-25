var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.NODE_ENV;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'production';
console.log('env: ' + ENV);
/**
 * Detect if run with webpack-dev-server or only do webpack build
 */
var isDevServer = false;
var argvs = process.argv;
if (argvs !== undefined && argvs !== null) {
  for (var i = 0; i < argvs.length; i++) {
    if (argvs[i].includes('webpack-dev-server')) {
      isDevServer = true;
      break;
    }
  }
}
/**
 * OS Platform
 * Decide browser name for open browser automatic
 */
var isWin = /^win/.test(process.platform);
var isOSX = /^darwin/.test(process.platform);
var browserName = isWin ? 'chrome' : isOSX ? 'google chrome' : 'google-chrome';

var basePlugins = [
  new webpack.DllReferencePlugin({
    manifest: require(__dirname + '/dll/vendor-manifest.json'),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: isProd
      ? 'scripts/common.[hash].bundle.js'
      : 'scripts/common.bundle.js',
    minChunks(module, count) {
      var context = module.context;
      return (context && context.indexOf('node_modules') >= 0) || count >= 2;
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),
  new AddAssetHtmlPlugin({
    filepath: path.resolve(__dirname, './dll/*.js'),
    outputPath: './scripts',
    publicPath: './scripts',
    includeSourcemap: false,
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: isProd
      ? {
          removeComments: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          preserveLineBreaks: true,
        }
      : {},
    inject: false,
  }),
  new ExtractTextPlugin({
    filename: isProd
      ? 'css/[name].[contenthash].bundle.css'
      : 'css/[name].bundle.css',
    allChunks: true,
  }),
  new CopyWebpackPlugin([
    { from: './src/mock', to: 'mock' },
    { from: './src/image', to: 'image' },
    // { from: './src/lib', to: 'lib' },
  ]),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
];

var devPlugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
  }),
];

var devPluginsForWebpackDevServer = [
  new webpack.HotModuleReplacementPlugin(),
  // new OpenBrowserPlugin({
  //     url: 'http://localhost:8384/www/',
  //     browser: browserName,
  // }),
];

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: {
      comments: false,
    },
    exclude: [/\.min\.js$/gi], // skip pre-minified libs
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
];
// var prodPluginsForWebpackDevServer = [
//     new OpenBrowserPlugin({
//         url: 'http://localhost:8384/www/',
//         browser: browserName,
//     }),
// ];
console.log('config is completed');
var webpackConfig = {
  entry: isProd
    ? {
        app: ['babel-polyfill', './src/app.jsx'],
      }
    : {
        app: ['babel-polyfill', 'react-hot-loader/patch', './src/app.jsx'],
      },
  output: {
    path: __dirname + '/www',
    publicPath: './',
    filename: isProd
      ? 'scripts/[name].[hash].bundle.js'
      : 'scripts/[name].bundle.js',
    chunkFilename: isProd
      ? 'scripts/[id].[name].[chunkhash].chunk.js'
      : 'scripts/[id].[name].chunk.js',
    sourceMapFilename: '[file].map',
    pathinfo: isProd ? false : true,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isProd ? 'nosources-source-map' : 'cheap-module-eval-source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.jsx?$/,
        // loaders: ['babel-loader', 'ts-loader'],
        use: ['cache-loader', 'babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.jsx$/, loader: 'source-map-loader' },
      {
        // CSS LOADER
        // Reference: https://github.com/webpack/css-loader
        // Allow loading css through js
        test: /\.css$/,
        use: isTest
          ? 'null'
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader?sourceMap'],
              publicPath: '../',
            }),
      },
      {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|otf|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: isProd ? '[path][name].[hash].[ext]' : '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'cache-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: isProd ? '[path][name].[hash].[ext]' : '[path][name].[ext]',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeEditorsNSData: true },
                { removeUnknownsAndDefaults: true },
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
          publicPath: '../',
        }),
      },
      {
        // JSON LOADER
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: isProd
    ? isDevServer
      ? basePlugins.concat(prodPlugins)
      : // .concat(prodPluginsForWebpackDevServer)
        basePlugins.concat(prodPlugins)
    : isDevServer
    ? basePlugins.concat(devPlugins).concat(devPluginsForWebpackDevServer)
    : basePlugins.concat(devPlugins),
  devServer: {
    publicPath: '/www/',
    compress: true,
    port: 8385,
    historyApiFallback: {
      index: '/www/index.html',
    },
    hot: isProd ? false : true,
    stats: {
      colors: true,
    },
    quiet: process.env.WEBPACK_DEV_SERVER_QUITE ? true : false,
    host: '0.0.0.0',
  },
};
if (isDevServer) {
  webpackConfig.devServer.proxy = {
    '/api': {
      secure: false,
      changeOrigin: true,
      // 我们自己的环境   不需要讲 api 转换 ''
      //  target: 'http://www.succtime.com:8092/',
      pathRewrite: { '^/api': '' },
      // 研究院环境
      target: 'http://eba.backyard.test.colourlife.com/',
    },
  };
}
module.exports = webpackConfig;
