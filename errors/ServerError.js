const { SERVER_ERROR } = require('../utils/server-err');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERROR;
  }
}

module.exports = ServerError;
