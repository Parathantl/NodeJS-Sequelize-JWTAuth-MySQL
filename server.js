var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./app/config/config.js'); // get our config file
app.set('superSecret', config.secret); // secret variable
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


const db = require('./app/models/index.js');
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync with { force: true }');
});

require('./app/route/routes.js')(app);


// Create a Server
var server = app.listen(8000, ()=> {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})