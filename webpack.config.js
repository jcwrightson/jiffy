const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require("path")
const fs = require("fs")
const url = require("url")

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

const ensureSlash = (path, needsSlash) => {
	const hasSlash = path.endsWith("/")
	if (hasSlash && !needsSlash) {
		return path.substr(path, path.length - 1)
	} else if (!hasSlash && needsSlash) {
		return `${path}/`
	} else {
		return path
	}
}

const getPublicUrl = appPackageJson =>
	envPublicUrl || require(appPackageJson).homepage

const getServedPath = appPackageJson => {
	const publicUrl = getPublicUrl(appPackageJson)
	const servedUrl =
		envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/")
	return ensureSlash(servedUrl, true)
}

const servedPath = getServedPath(resolveApp("package.json"))

const publicPath = servedPath
const publicUrl = publicPath.slice(0, -1)

module.exports = {
	entry: ["./src/index.jsx"],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	mode: "production",
  bail: true,
  output:{
    publicPath: publicPath
  },
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
