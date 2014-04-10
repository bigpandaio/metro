var _ = require('underscore');
var Q = require('q');

function Metro(pipelines) {
  if (!pipelines) {
    this.pipelines = null;
    return;
  }

  if(!_.isArray(pipelines)) {
    this.pipelines = [pipelines];
  }
  else {
    this.pipelines = pipelines;
  }
}

Metro.prototype.addPipeline = function(pipeline) {
  this.pipelines.push(pipeline);
}

Metro.prototype.send = function(key, value, units) {
  var deferred = Q.defer();
  if (this.pipelines) {
    var self = this;
    var key = key.replace('/','_').replace('-','_').toLowerCase();
    setTimeout(function() {
      processPipelines(key, value, units, self.pipelines);
      deferred.resolve();
    });
  }
  return deferred.promise;
}

function processPipelines(key, value, units, pipelines) {
  _.map(pipelines, function(pipeline) {
    if (pipeline && pipeline.send) {
      pipeline.send(key, value, units);
    }
    else {
      // TODO log - no send function
    }
  });
}

module.exports.Metro = Metro;