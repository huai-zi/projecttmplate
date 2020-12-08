'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
let baseUrl = ''
switch (params) {
  case '--env=test':
    baseUrl = '"/test"'
    break
  case '--env=prod':
    baseUrl = '"/api"'
    break
  default:
    baseUrl = '""'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: baseUrl,
  MOCK: 'true'
})
