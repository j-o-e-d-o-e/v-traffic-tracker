module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://traffic-tracker.herokuapp.com',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/api': '/'}
            }
        }
    }
}
