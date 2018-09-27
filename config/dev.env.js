const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STRIPE_KEY : '"pk_test_DuiBtdNFCzvAqekxoZWB1e3C"'
})
