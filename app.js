const express = require('express');
const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');

Bugsnag.start({
  apiKey: 'YOUR_BUGSNAG_API_KEY',  // Replace with your actual key
  plugins: [BugsnagPluginExpress]
});

const app = express();
const middleware = Bugsnag.getPlugin('express');

app.use(middleware.requestHandler);

app.get('/', (req, res) => {
  res.send('Hello from DevOps App!');
});

app.get('/error', (req, res) => {
  throw new Error('Test error for Bugsnag!');
});

app.use(middleware.errorHandler);

app.listen(3000, () => console.log('Server started on port 3000'));
