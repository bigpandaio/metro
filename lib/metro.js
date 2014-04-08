var _ = require('underscore');

function Metro(pipelines) {
  this.pipelines = pipelines;
}

Metro.prototype.send = function(key, value, units) {
  if (this.pipelines) {
    processPipelines(key, value, units, this.pipelines);
  }
}

function processPipelines(key, value, units, pipelines) {
  _.map(pipelines, function(pipeline) {
    if (pipeline.send) {
      pipeline.send(key, value, units);
    }
    else {
      // TODO log - no send function
    }
  });
}

module.exports.Metro = Metro;