// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/utils/bundle/toBundle.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "public/css/*.css",
					to: "../../dist",
				},
				{
					from: "public/js/*.js",
					to: "../../dist",
				},
			],
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		fallback: {
			buffer: require.resolve("buffer"),
		},
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public", "js"),
	},
};
