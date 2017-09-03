/* 
    ./webpack.config.js
*/
/* global __dirname */

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: "./src/client/index.html",
	filename: "index.html",
	inject: "body"
});

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react"]
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	node: {
		fs: "empty"
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [HtmlWebpackPluginConfig]
};
