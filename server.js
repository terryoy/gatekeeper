
var { config, app } = require('./app');

var port = process.env.PORT || config.port || 9999;

app.listen(port, null, function (err) {
  console.log('Gatekeeper, at your service: http://localhost:' + port);
  if (err) {
    console.error(err);
  }
});
