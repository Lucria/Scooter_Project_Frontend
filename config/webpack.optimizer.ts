import {Options} from "webpack";

const TerserPlugin = require('terser-webpack-plugin'); 

let opti: Options.Optimization = {};

opti = {
	minimizer: [
		new TerserPlugin({
			terserOptions: {
				compress: {
					drop_console: false, 
					unsafe: true 
				},
				output: {comments: false}, 
				toplevel: true 
			}
		})
	]
};

opti.splitChunks = {
	name: true,
	cacheGroups: {
		commons: {
			test: /[\\/]node_modules[\\/]/,
			name: 'vendors',
			chunks: 'all'
		}
	}
};

export {opti};