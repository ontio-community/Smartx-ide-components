'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"https://localhost/"',
  API_URL: '"https://localhost/api/v1/"',
  BC_URL: '"https://localhost:10443/api/v1/"',

  PYTHON_URL: '"http://172.168.3.48:8080/api/v1.0/python/compile"',
  CSHARP_URL: '"https://smartxcompiler.ont.io/api/beta/csharp/compile"',
  NODE_URL:'"https://dappnode1.ont.io:10334"',

  PROJECT_LIBRARY_URL: '"https://devapibeta.ont.io/api/v1"',

  GITHUB_CLIENT_ID: '"b603d248fc646222eb59"',
  GITHUB_CLIENT_SECRET: '"e2459913a4ba7ea1e5d0d126f93d4a11a801d259"',
  GITHUB_GET_CODE: '"https://github.com/login/oauth/authorize?client_id=b603d248fc646222eb59&scope=user,public_repo"',
  GITHUB_GET_ACCESS_TOKEN: '"https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?"',
  GITHUB_GET_USER_INFO :'"https://api.github.com/user?"',

  RESTFUL_SERVER_TEST:'"http://polaris1.ont.io:20334"',
  RESTFUL_SERVER_MAIN:'"https://dappnode1.ont.io:10334"',
  FORWARD_SERVER:'"https://cors-anywhere.herokuapp.com/"',
})
