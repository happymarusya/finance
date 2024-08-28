const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "templates" },
                { from: "./src/static/images", to: "images" },
                { from: "./bootstrap-5.3.3-dist/css/bootstrap.min.css" , to: "css" },
                { from: "./bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js" , to: "js" },
                { from: "./src/components/burger.js", to: "js" },
            ],
        }),
    ]
};