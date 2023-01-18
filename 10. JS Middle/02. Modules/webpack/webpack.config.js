const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output:  {
        path: path.resolve(__dirname, "src"),
        filename: "./js/app.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        }),

        new HtmlWebPackPlugin({
            title: 'Webpack',
            template: './src/index.html',
            filename: './main.html'
        }),
    ]
}