module.exports = {
    assetsDir: '.',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.21.187:6012',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
