const path = require("path");
const merge = require("webpack-merge");
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devConfig = require("./cfg/webpack.config.dev");
const buildConfig = require("./cfg/webpack.config.build");

function CompilerPlugin(options) { }
CompilerPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
        console.log('\n\nCompilation completed! ~~> ', Date())
    });
};
var plugins = []

plugins.push(new WebpackShellPlugin({
  onBuildStart: ['echo "Starting"'],
  onBuildEnd: ['node dist/app.js']
}));

plugins.push(new HtmlWebpackPlugin({
  template: 'src/index.html'
}));

plugins.push(new CompilerPlugin({}));

const commonConfig = {
  //entry: "./src/scripts/index.js",
  //filename: "scripts/bundle.[hash].js"
  entry: "./src/shorten.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  plugins: plugins,
  target: 'node',
  node: {
      console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
  },  
  module: {
    rules: [
      { test: /\.js$/, use: ["babel-loader", "eslint-loader"], exclude: /node_modules/ },
    ]
  }
};

module.exports = merge(commonConfig, (process.env.NODE_ENV === "production") ? buildConfig : devConfig);
