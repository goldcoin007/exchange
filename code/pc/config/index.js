'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.


// 用户配置的入口文件 接入脚手架中的配置
const path = require('path');

module.exports = {

    // 开发相关配置
    dev: {

        // 打包资源根地址 
        assetsPublicPath: '/',

        // 静态资源目录
        assetsSubDirectory: 'static',

        newProductRoot: path.resolve(__dirname, '../dist/newProduct'),

        // 代理服务器基础配置 可在 process.env 中修改
        proxyTable: {
            '/api': {
                // target: 'http://qkladmin2.ruanmeng.top/',
                target: 'https://guanli.coin.amatak.net/',
                changeOrigin: false,
                // pathRewrite: {
                //     // 请求时 将api替换成实际的apis等
                //     // '^/api': '/api'
                // },
            },
            // bypass(req) { console.log(req) }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 6666, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: false,
        notifyOnErrors: true,
        poll: true, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,

        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: true,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: false, // default true
    },

    // 打包生产环境的配置
    build: {

        // bundle的生成地址
        assetsRoot: path.resolve(__dirname, '../dist'),

        newProductRoot: path.resolve(__dirname, '../dist/newProduct'),

        // bundle生成的文件
        index: path.resolve(__dirname, '../dist/index.html'),

        // 打包资源根地址
        assetsPublicPath: './',

        // 静态资源目录
        assetsSubDirectory: 'static',

        /**
         * Source Maps
         */
        productionSourceMap: true,

        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}