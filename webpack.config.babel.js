import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import { DefinePlugin } from 'webpack'

const entry = path.resolve(__dirname, 'src', 'index.js')
const outputPath = path.resolve(__dirname, 'dist')

const { NODE_ENV = 'development' } = process.env

const config = {
  entry,
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  target: 'node',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
  ],
}

if (NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin({ sourceMap: true }))
  config.devtool = 'source-map'
}

export default config
