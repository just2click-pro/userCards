const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: "./scripts/index.js",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },

    module: {
    	rules: [
    		{
    			test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
    		},
    		{
    			test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						use: ["css-loader", "sass-loader"]
					})
    		}
    	]
  	},
  	plugins: [new HtmlWebpackPlugin({
  			template: "index.html"
  		}),
  		new ExtractTextPlugin("styles.css"),
  	],

  	devtool: "source-map"
};
