// Import swat-proxy.
var swat_proxy = require('swat-proxy');

// Add some JS to the end of the Google homepage.
var stringToBeInjected = '<script src="https://browser.sentry-cdn.com/5.4.3/bundle.min.js" crossorigin="anonymous">' +
  '<script> Sentry.init(window.__SENTRY__OPTIONS);' +
  'Sentry.configureScope(function(scope) {' +
    'if (window.__SENTRY__USER) {' +
      'scope.setUser(window.__SENTRY__USER);' +
    '}' +
    'if (window.__SENTRY__VERSION) {' +
      'scope.setTag("sentry_version", window.__SENTRY__VERSION);' +
    '}' +
    'if (window.__SENTRY_BUILD) {' +
      'scope.setContext("build", {' +
        'id: window.__SENTRY_BUILD,' +
      '});' +
    '}' +
  '});'
  '</script>';

swat_proxy.proxy('http://localhost:8000/', {
  selector: 'head',
  manipulation: swat_proxy.Manipulations.APPEND,
  content: stringToBeInjected
});

// Start the proxy server.
swat_proxy.start();
