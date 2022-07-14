const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        clean: true,
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        watchFiles: [
            'src/**/*',
            'styles.css'
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'JavaScript Image Converter',
            inject: 'body',
        }),
        new HtmlWebpackTagsPlugin({
            links: [
                'styles.css',
            ],
        }),
        new CopyPlugin({
            patterns: [
                'styles.css',
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};