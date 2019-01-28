const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { 
                    presets: ["@babel/env",'@babel/preset-react'],
                    plugins: [
                        'react-hot-loader/babel',
                        '@babel/plugin-proposal-class-properties'
                      ]
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};