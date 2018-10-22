const path = require ('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname,'./src/js/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: 'bundle.js',
		publicPath: '/dist/js/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
		    {
		      test: /\.vue$/,
		      loader: 'vue-loader', // 'babel-loader' is also a valid name to reference
		    }
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}