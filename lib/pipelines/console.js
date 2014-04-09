module.exports = function(prefix, tt) {
  var prefix = prefix || '';
  return {
    send: function(key, value, units) {
      var units = units || '';
      console.log(prefix + key + ' = ' + value + ' ' + units);
    }
  }
}
