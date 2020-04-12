const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: '../dist',
		// open: true,
		port: 8080,
		hot: true
		// proxy: {
    //   '/api': 'http://localhost:3000'
		// }
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							// modules: true
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = merge(commonConfig, devConfig);
