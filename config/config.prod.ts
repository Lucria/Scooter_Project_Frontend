import {RuleSetQuery} from "webpack";

const prodFileOpts: RuleSetQuery = {
	name: '[path][name].[ext]',
	publicPath: 'var~rimage.publicPath~',
	context: './src'
};

export {
	prodFileOpts
}
