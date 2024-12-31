const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CSSLoader = {
	loader: 'css-loader',
	options: {
		modules: 'global',
		importLoaders: 1,
	},
}

const PostCSSLoader = {
	loader: 'postcss-loader',
	options: {},
}

module.exports = {
	entry: [path.join(__dirname, 'src/index.js')],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	devServer: {
		port: 7000,
		hot: true,
		static: path.join(__dirname, 'public'),
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, 'public/assets'),
		},
		client: {
			webSocketTransport: 'ws',
			overlay: true,
		},
	},
	devtool: 'source-map',
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src/index.css'),
				use: [MiniCssExtractPlugin.loader, CSSLoader, PostCSSLoader],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css',
		}),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			publicPath: '/',
		}),
	],
}
