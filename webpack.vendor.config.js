'use strict';
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.NODE_ENV;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'production';
/**
 * OS Platform
 * Decide browser name for open browser automatic
 */
var isWin = /^win/.test(process.platform);
var isOSX = /^darwin/.test(process.platform);
var browserName = isWin ? 'chrome' : isOSX ? 'google chrome' : 'google-chrome';

var basePlugins = [
    new ExtractTextPlugin({
        filename: isProd
            ? 'css/[name].[contenthash].bundle.css'
            : 'css/[name].bundle.css',
        allChunks: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DllPlugin({
        path: path.resolve('dll/', '[name]-manifest.json'),
        name: '[name]_[hash]',
    }),
];

var devPlugins = [];

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
];

var vendorLibs = [
    'react',
    'history',
    'loglevel',
    'react-dom',
    'react-router-dom',
    'react-redux',
    'react-router-redux',
    'redux',
    'redux-saga',
];

var webpackConfig = {
    entry: {
        vendor: vendorLibs,
    },
    output: {
        path: __dirname + '/dll/',
        publicPath: '../',
        filename: isProd ? '[name].[hash].bundle.js' : '[name].bundle.js',
        sourceMapFilename: '[file].map',
        library: '[name]_[hash]',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                // All files with a '.js' or '.jsx' extension will be handled by 'awesome-typescript-loader'.
                test: /\.jsx?$/,
                use: ['cache-loader', 'babel-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js
                //
                // Reference: https://github.com/postcss/postcss-loader
                // Postprocess your css with PostCSS plugins
                test: /\.css$/,
                use: isTest
                    ? 'null'
                    : ExtractTextPlugin.extract({
                          fallback: 'style-loader',
                          use: ['cache-loader', 'css-loader?sourceMap'],
                          publicPath: '../',
                      }),
            },
            {
                // ASSET LOADER
                // Reference: https://github.com/webpack/url-loader
                // Copy png, jpg, jpeg, gif, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|otf|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: isProd
                                ? '[path][name].[hash].[ext]'
                                : '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                // optimize svg load
                test: /\.svg$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: isProd
                                ? '[path][name].[hash].[ext]'
                                : '[path][name].[ext]',
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
                // SCSS LOADER
                test: /\.scss$/,
                use: isTest
                    ? ExtractTextPlugin.extract({
                          fallback: 'style-loader',
                          use: [
                              'cache-loader',
                              {
                                  loader: 'css-loader',
                                  options: {
                                      importLoaders: 1,
                                      modules: true,
                                      localIdentName: '[path]__[name]__[local]',
                                  },
                              },
                              { loader: 'sass-loader' },
                          ],
                          publicPath: '../',
                      })
                    : ExtractTextPlugin.extract({
                          fallback: 'style-loader',
                          use: [
                              'cache-loader',
                              {
                                  loader: 'css-loader',
                                  options: {
                                      importLoaders: 1,
                                      modules: true,
                                      localIdentName:
                                          '[path]__[name]__[local]__[hash:base64:5]',
                                  },
                              },
                              { loader: 'sass-loader' },
                          ],
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
        ? basePlugins.concat(prodPlugins)
        : basePlugins.concat(devPlugins),
};
module.exports = webpackConfig;
