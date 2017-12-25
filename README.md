metro
=====

Node module for sending metrics to graphite time series DB

How to use metro in your repo:
==============================

1. `npm install metro -s`

2. As part of the setup process create factory for graphite pipeline. The recommended way to do this is in a dedicated file. E.g:

    const config = require('config');
    const metro = require('metro');

    module.exports = function setupMetro() {

      let metroClient = null;
      metro.create('default');
      if (config.graphite.host) {
        metroClient = metro.get('default');
        metroClient.addPipeline(metro.pipelineCreator('graphite', config.graphite.prefix, {
          host: config.graphite.host,
          port: config.graphite.port
        }));
      }

      return metroClient;
    };

3. init metro in your app.js, example:

    const metro = require('setup/metro');

    const app = bootleg();
    app.phase('metro', metro, config);

4. send data, example:

    const metro = require('metro');
    const metroSender = metro.get('latency_route');
    if (metroSender !== null) {

        metroSender.send(`latencies.<appname>.response_time`,
            now.diff(beforeQuery);,
            'ms');
    }
