const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts'],
        alias: {
            '@app': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json'
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
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        watchFiles: ['src/**/*'],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};