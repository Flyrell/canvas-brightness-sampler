const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const pathsTransformer = require('ts-transform-paths').default;

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => pathsTransformer()
                },
            },
        ],
    },
    output: {
        clean: true,
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'canvas-brightness-sampler',
            type: 'umd',
        },
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};