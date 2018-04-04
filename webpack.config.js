const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dev = process.env.NODE_ENV === 'dev'

let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1, minimize: !dev } }
]

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                }),
            ]
        }
    })
}

let configFront = {
    entry: {
        app: './assets/webpack-config/front.config.js',
    },
    mode: dev ? 'development' : 'production',
    watch: dev,
    output: {
        path: path.resolve('./public/build/front'),
        filename: '[name].js',
        publicPath: "/build/",
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,//'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [...cssLoaders, 'sass-loader']
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
        filename: '[name].css',
    // disable: dev /* Enable extract dev or prod :) */
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
}

let configBack = {
    entry: {
        app: './assets/webpack-config/back.config.js',
    },
    mode: dev ? 'development' : 'production',
    watch: dev,
    output: {
        path: path.resolve('./public/build/back'),
        filename: '[name].js',
        publicPath: "/build/",
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,//'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [...cssLoaders, 'sass-loader']
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            // disable: dev /* Enable extract dev or prod :) */
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
}

if (!dev) {
    configFront.plugins.push(new UglifyJsPlugin({
        sourceMap: false
    }))
}

if (!dev) {
    configBack.plugins.push(new UglifyJsPlugin({
        sourceMap: false
    }))
}

module.exports = [configFront, configBack];