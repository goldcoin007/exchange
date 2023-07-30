'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 编译时的全局常量
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
