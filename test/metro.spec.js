describe('Test Metro', function() {
  var sinon = require('sinon');
  var metro = require('./../index');
  var Q = require('q');

  var testPipeline = {
    send: function(key, value, units) {
      if (this.callback) {
        this.callback.apply(null, arguments);
      }
    },

    register: function(callback) {
      this.callback  = callback;
    }
  }

  var mockTestPipeline = sinon.mock(testPipeline);

  before(function() {
    metro.create('default', testPipeline);
  });

  beforeEach(function() {
    mockTestPipeline = sinon.mock(testPipeline);
  })

  afterEach(function() {
    mockTestPipeline.restore();
  })

  it('Start metro and send metric', function() {
    mockTestPipeline.expects("send").once().withArgs('test', 1, 'ms').returns();


    return metro.get('default').send('test', 1, 'ms').then(function() {
      return mockTestPipeline.verify();
    });
  })

  it('Metro with 2 piplines', function() {
    mockTestPipeline.expects("send").once().withArgs('test', 2, 'ms').returns();
    var consolePipe = metro.pipelineCreator('console', 'test.',{t:12})
    metro.create('default2', [testPipeline,consolePipe]);
    return metro.get('default2').send('test', 2, 'ms').then(function() {
      return mockTestPipeline.verify();
    });
  })

  it('Get undefined metro', function() {
    if (metro.get('test3')) {
      throw new Error('Metro should not be found');
    }
  })

  it('Metro without pipelines', function() {
    metro.create('default3');
    return metro.get('default3');
  })

  it('Metro without pipelines and then add', function() {
    var m = metro.create('default3');
    m.addPipeline(metro.pipelineCreator('console'));
    return metro.get('default3');
  })

  it('Send few times',function() {
    mockTestPipeline.expects("send").thrice().withArgs('test', 1, 'ms').returns();
    return Q.all([metro.get('default').send('test', 1, 'ms'),
                 metro.get('default').send('test', 1, 'ms'),
                 metro.get('default').send('test', 1, 'ms')]).
      then(function() {
        return mockTestPipeline.verify();
      })
  })
})