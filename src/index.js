const webpack = require("webpack");
const config = require("../webpack.config");
const WebpackDevServer = require("webpack-dev-server");

const server = new WebpackDevServer(webpack(config), {
	hot: true,
	contentBase: 'public'
});
server.listen(4000);