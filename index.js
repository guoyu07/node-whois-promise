// Generated by CoffeeScript 2.0.0-beta1
(function() {
  var Net;

  Net = require('net');

  module.exports = function(domain, server, options = {}) {
    var port;
    port = options.port || 43;
    return new Promise(function(resolve, reject) {
      var buf, client;
      buf = '';
      client = Net.connect(port, server, function() {
        return client.write(`${domain}\r\n`);
      });
      if (options.timeout !== void 0) {
        client.setTimeout(options.timeout, function(err) {
          return reject('Socket timeout.');
        });
      }
      client.on('error', function(err) {
        return reject(err);
      });
      client.on('data', function(data) {
        return buf += data.toString();
      });
      return client.on('end', function() {
        return resolve(buf);
      });
    });
  };

}).call(this);