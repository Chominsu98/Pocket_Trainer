const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
	// auth 포함 하위 route에 대해서는 localhost:5000/v1을 domain으로 하여 proxy설정
  app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://openapi.foodsafetykorea.go.kr',
			changeOrigin: true,
		}));
	// dummy 포함 하위 route에 대해서는 localhost:6000/v1을 domain으로 하여 proxy설정
  app.use(
		'/admin',
		createProxyMiddleware({
			target: 'http://remote.test.com',
			changeOrigin: true,
		}));

    app.use(
        '/accounts',
        createProxyMiddleware({
            target: 'http://remote.test.com',
            changeOrigin: true,
        }));

    app.use(
        '/user',
        createProxyMiddleware({
            target: 'http://remote.test.com',
            changeOrigin: true,
        }));    

    app.use(
        '/workout',
        createProxyMiddleware({
            target: 'http://remote.test.com',
            changeOrigin: true,
        }));
    app.use(
        '/history',
        createProxyMiddleware({
            target: 'http://remote.test.com',
            changeOrigin: true,
        })); 

    app.use(
        '/diet',
        createProxyMiddleware({
            target: 'http://remote.test.com',
            changeOrigin: true,
        }));          
}