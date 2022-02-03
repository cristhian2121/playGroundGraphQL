'use strict'

const mutation = require('./mutation')
const query = require('./query')
const types = require('./types')

module.exports = {
  Query: query,
  Mutation: mutation,
  ...types
}
