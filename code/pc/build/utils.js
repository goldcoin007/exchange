'use strict'
const path = require('path')
const config = require('../config')

const packageConfig = require('../package.json')

// 将构建时内嵌的css 提取为一个独立文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 配置资源文件路径
exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 加载各型css loader的封装函数
 * { usePostCSS, sourceMap,  extract }
 * 
 */
exports.cssLoaders = function(options) {
    options = options || {}

    // 
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                // 接入自定义的选项
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else { // 最后加载vue-style-loader 解析.vue中的css代码
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),

        less: generateLoaders('less'),

        // 给scss文件增加loader以支持全局导入文件，
        // 所有扩展的loader通过concat写入
        // resource-loader确保变量、混入类和函数在每个文件中都有效
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass').concat({
            loader: 'style-resources-loader',
            options: {
                patterns: [
                    // 全局配置函数 此处的_不能省略
                    path.resolve(__dirname, "../src/assets/scss/_settings.scss"),

                    path.resolve(__dirname, "../src/assets/scss/_mixin.scss"),

                    // 加载基础样式
                    // path.resolve(__dirname, '../src/assets/scss/base/_base.scss'),

                    // 加载布局样式
                    path.resolve(__dirname, '../src/assets/scss/layout/_layout.scss'),

                    // 加载模块样式
                    // path.resolve(__dirname, '../src/assets/scss/module/_module.scss'),

                    // 加载主题样式
                    path.resolve(__dirname, '../src/assets/scss/theme/_theme.scss'),
                ]
            }
        }),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}