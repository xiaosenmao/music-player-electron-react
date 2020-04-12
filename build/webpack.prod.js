const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].chunk.js'
	},
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
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
			},

			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'postcss-loader',
					'css-loader'
				]
			}
		]
	},
	optimization: {
    minimizer: [
			new OptimizeCSSAssetsPlugin({})
		]
  },
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css',
			ignoreOrder: false // Enable to remove warnings about conflicting order
		})
	]
};

module.exports = merge(commonConfig, prodConfig);
