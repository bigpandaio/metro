var format = require('util').format;
var graphite = require('graphite');

module.exports = function(prefix, config) {
  var prefix = prefix || '';
  var host = config.host;
  var port = config.port || 2003;
  var client = graphite.createClient(format('plaintext://%s:%d/', host, port));
  return {
    send: function(key, value, units) {
      send(prefix+key, value, client);
    }
  }
}

function send(key, value, client) {
  var data = {};
  data[key] = value;

  return client.write(data);
}
