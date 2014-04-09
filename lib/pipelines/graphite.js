module.exports = function(prefix, config) {
  var prefix = prefix || '';
  return {
    send: function(key, value, units) {
      var units = units || '';
      console.log(prefix + key + ' = ' + value + ' ' + units);
    }
  }
}

function send(key,value, config) {
  var graphite = require('graphite');
  var host = config.host;
  var port = config.port || 2003;
  var client = graphite.createClient(format('plaintext://%s:%d/', host, port));

  //log.info("Establishing connection to Graphite", {host: host, port: port});

  var data = {};
  data[key] = value;

  return client.write(data, function(err) {
    console.log('err  ' + err)
    //todo log
  });


}
