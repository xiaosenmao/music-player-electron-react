const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, '../src/index.tsx')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	},
	resolve: {
		modules: [path.resolve('../src'), 'node_modules'],
		extensions:	['.ts',	'.tsx',	'.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name]_[hash:7].[ext]',
						outputPath: 'images/',
						limit: 10240  //10kb
					}
				}
			},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				use: [ 'file-loader' ]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: true,
			verbose: true,  // Write Logs to Console. (Always enabled when dry is true)
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html')
		})
	],
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
			chunks: 'all'
		}
	}
};
