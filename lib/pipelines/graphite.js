var format = require('util').format;
var graphite = require('graphite');
var StatsD = require('node-statsd'),

module.exports = function(prefix, config) {
  var prefix = prefix || '';
  var host = config.host;
  var port = config.port || 2003;
  // var gclient = graphite.createClient(format('plaintext://%s:%d/', host, port));
  var statsd = new StatsD({
    host: 'localhost',
    port: 8125,
    prefix,
    global_tags: ['org_sla=null']
  });
  return {
    send: function(key, value, units) {
      send(prefix+key, value, statsd);
    }
  }
}

function send(key, value, statsd) {
  // var data = {};
  // data[key] = value;

  // return client.write(data);

  statsd.gauge(key, value)
}
