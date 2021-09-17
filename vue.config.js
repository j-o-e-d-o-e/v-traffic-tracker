// module.exports = {
//     devServer: {
//         proxy: {
//             '^/api': {
//                 target: 'https://traffic-tracker.herokuapp.com',
//                 changeOrigin: true,
//                 logLevel: 'debug',
//                 pathRewrite: {'^/api': '/'}
//             }
//         }
//     }
// }
// vue.config.js file to be place in the root of your repository

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/my-project/'
        : '/'
}
