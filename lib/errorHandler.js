'use strict'

function errorHandler(error) {
   console.log('error: ', error);
   throw new Error("Error in server")
}

module.exports = errorHandler