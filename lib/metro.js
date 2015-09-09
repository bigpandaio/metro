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
  if (!this.pipelines) {
    this.pipelines  = [];
  }
  this.pipelines.push(pipeline);
}

Metro.prototype.send = function(key, value, units, metadata) {
  var deferred = Q.defer();
  if (this.pipelines && this.pipelines.length != 0) {
    var self = this;
    var key = key.replace('/','_').replace('-','_').toLowerCase();
    setTimeout(function() {
      processPipelines(key, value, units, metadata, self.pipelines);
      deferred.resolve();
    });
  }
  return deferred.promise;
}

function processPipelines(key, value, units, metadata, pipelines) {
  _.map(pipelines, function(pipeline) {
    if (pipeline && pipeline.send) {
      pipeline.send(key, value, units, metadata);
    }
    else {
      // TODO log - no send function
    }
  });
}

module.exports.Metro = Metro;