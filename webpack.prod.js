const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    output: {
      publicPath: "/prime-generator/"
    },
    mode: 'production',
    devtool: 'source-map'
});
