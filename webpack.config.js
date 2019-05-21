const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
	entry: ["./src/index.jsx"],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	mode: "production",
  bail: true,
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				exclude: /(node_modules|bower_components)/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					plugins: [
						["@babel/plugin-transform-runtime"],
						["@babel/plugin-proposal-class-properties"]
					]
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html"
		})
	]
}
