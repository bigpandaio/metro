module.exports = function(prefix) {
  var prefix = prefix || '';
  return {
    send: function(key, value, units) {
      console.log(prefix + key + ' = ' + value + ' ' + units);
    }
  }
}
