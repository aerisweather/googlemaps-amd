require.config({
  baseUrl: '../src',

  paths: {
    async: '../bower_components/requirejs-plugins/async',
    sinon: '../bower_components/sinon/index',
    jasmine: '../bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': '../bower_components/jasmine/lib/jasmine-core/jasmine-html',
    spec: '../test/spec',
    mock: '../test/mock'
  },

  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    sinon: {
      exports: 'sinon'
    }
  }
});
require([
  'jasmine',
  'jasmine-html'
], function(jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var reporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(reporter);

  jasmineEnv.specFilter = function(spec) {
    return reporter.specFilter(spec);
  };

  require([
    // Test specs go here
  ], function() {
    jasmineEnv.execute();
  });
});
