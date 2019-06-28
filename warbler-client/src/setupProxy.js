const proxy = require('http-proxy-middleware');
const proxyUrl =
	process.env.NODE === 'production'
		? `http://localhost:${process.env.PORT}`
		: 'http://localhost:8081';

module.exports = function(app) {
	app.use(proxy('/api/', { target: proxyUrl }));
};
