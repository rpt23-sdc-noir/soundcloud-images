const express = require('express');
const app = express();
const path = require('path');
const port = 2000;
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const routes = require('./routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/bundle.js'));
});
app.use('/:songId', express.static(path.join(__dirname, '../client')));

app.use('/', expressStaticGzip(path.join(__dirname, '../client'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "client, max-age=31536000");
  }
}));

/* ----- EXPRESS ROUTER ----- */
app.use('/bands', routes);

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(chalk.magenta(`Listening on port http://localhost:${port}`));
});

module.exports = app;
