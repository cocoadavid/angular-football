const express = require('express');

const app = express();

app.use(express.static('./dist/angular-football'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/angular-football/'}),
);

app.listen(process.env.PORT || 8080);
