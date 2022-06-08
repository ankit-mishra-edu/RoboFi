//Install express server
const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static('./dist/robo-fi'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/robo-fi/index.html'));
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 80);
console.log(`Running on port ${process.env.PORT || 80}`);
