var Metro = require('./lib/metro').Metro;

module.exports = {
  cache: {},
  create: function(name, piplines, force) {
    if (!this.cache[name] || force) {
      this.cache[name] = new Metro(piplines);
    }

    return this.cache[name];

  },
  retrieve: function(name) {
    if (!name || !this.cache[name]) {
      return null;
    }

    return this.cache[name];
  }
}