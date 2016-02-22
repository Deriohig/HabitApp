Package.describe({
  name: 'client-deps'
});

Npm.depends({
  'react-bootstrap': '0.23.3', // this library will be browserifyed later
  react : '0.13.3' // we'll also add react itself so react-bootstrap doesn't feel loneliness
});

Package.onUse(function(api) {
  api.use(['cosmos:browserify@0.3.0']); // insert the latest version here
  api.addFiles(['app.browserify.js']); // we'll create this file below
  api.export(['ReactBootstrap', 'React']); // it's exported in app.browserify.js
});
