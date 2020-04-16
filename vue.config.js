module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.21.178:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};