import * as path from "path";
import {opti} from "./webpack.optimizer";
import webpack, {Entry, Plugin} from "webpack";
import {rules} from "./webpack.rules";
import {Kore} from "@kirinnee/core";
import "webpack-dev-server";
import {pages} from "./pages";
import {ConvertToOption, Page} from "./Helper";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {VueLoaderPlugin} from "vue-loader";
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

const core = new Kore();
core.ExtendPrimitives();

// Load pages as HTML plugin
const htmlPages: Plugin[] = pages.pages
    .Map(s => ConvertToOption(s as Page))
    .Map(s => new HtmlWebpackPlugin(s));

// Additional Common plugin
const vuePlugin = new VueLoaderPlugin();
const cleanPlugin = new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [
        "**/*.*",
        '!.gitignore',
    ]
});

const copyPlugin = new CopyPlugin([{
    from: 'public',
    ignore: [".html"],
    to: ''
}]);

// All plugins
const commonPlugins: Plugin[] = [...htmlPages, vuePlugin, cleanPlugin, copyPlugin];

function GenerateConfig(entry: Entry, filename: string, mode: "development" | "production" | "none"): webpack.Configuration {
    const outDir = path.resolve(__dirname, "../dist");

    const globals = new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(mode === "production")
    });


    const envPlugins = mode === "production" ?
        // Production
        [
        ]

        :

        // Development
        [
            new webpack.HotModuleReplacementPlugin(), 
        ];

    const plugins = [...commonPlugins, ...envPlugins, globals];

    const config: webpack.Configuration = {
        entry,
        output: {
            path: outDir,
            filename: filename,
            libraryTarget: "umd",
            publicPath: '/',
            globalObject: "(typeof window !== 'undefined' ? window : this)"
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.vue'],
            alias: {'vue$': 'vue/dist/vue.esm.js'} 
        },
        mode,
        devtool: "source-map", 
        module: {rules: rules(mode)},
        plugins: plugins
    };
    config.target = "web";
    if (mode === "production") config.optimization = opti;
    else if (mode === "development") {
        config.devServer = {
            contentBase: path.resolve(__dirname, '../dist'),
            hot: true, 
            historyApiFallback: true, 
        }
    }
    return config;
}

export {GenerateConfig};
