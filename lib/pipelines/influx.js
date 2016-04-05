var format = require('util').format;
var influx = require('influx')

module.exports = function(prefix, config) {
  var hosts = config.hosts;
  var port = config.port || 8086;

  var client = influx({

    //cluster configuration
    hosts: hosts.map(function(host) {
      return {
        host: host,
        port: port
      }
    }),
    username : config.username,
    password : config.password,
    database : config.database
  })


  return {
    send: function(key, value, units, metadata) {
      send(key, value, units, metadata);
    }
  }

  function send(key, value, units, metadata) {
    return client.writePoint(key, value, metadata, function(err, response) { });
  }
}