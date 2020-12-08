'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./dev.env')
let params = process.argv[2]
let baseUrl = ''
switch (params) {
  case 'test':
    baseUrl = '"/test"'
    break
  case 'prod':
    baseUrl = '"/api"'
    break
  default:
    baseUrl = '""'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  baseUrl: baseUrl,
  MOCK: 'false'
})
