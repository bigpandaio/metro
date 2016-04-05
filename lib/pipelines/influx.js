var format = require('util').format;
var influx = require('influx')

module.exports = function(prefix, config) {
  var host = config.host;
  var port = config.port || 8086;

  var client = influx({

    //cluster configuration
    hosts : [
      {
        host : host,
        port : port, //optional. default 8086
        protocol : 'http' //optional. default 'http'
      }
    ],

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