'use strict';

var path = require('path');
var webpack = require('webpack');

var appSettings = path.join(__dirname, 'src/js/settings/settings-dnevnik.js');

module.exports = {
	cache: true,
	entry: {
		'base-dnevnik': [
			'./src/base-js'
		],
	},
	output: {
		path: path.join(__dirname, '/production/assets/js'),
		filename: '[name].min.js',
		publicPath: path.join(__dirname, '/production/assets/js'),
		pathinfo: true
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extentions: ['', '.js'],
		alias: {
			appSettings: appSettings,
		}
	},

	module: {
		noParse: [
		],
		loaders: [
			{   test: /\.js$/, 
				loader: 'babel',
				include: [
					path.join(__dirname, '/src/base-js'),
					path.join(__dirname, '/src/js'),
				], 
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'stage-2']
				}
			},
			// { 	test: /\.js$/, 
			// 	include: [
			// 		path.join(__dirname, '/src/js'),
			// 	], 
			// 	loader: 'strip-loader?strip[]=console.log' 
			// }
		]
	},
	plugins: [     
		new webpack.DefinePlugin({
			'process.env': { 
				NODE_ENV : JSON.stringify('production') 
			}
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	minimize: true,
		// 	comments: false,
		// 	compress: {
		// 		warnings: false
		// 	}
		// })
	]
};

