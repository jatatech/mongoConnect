// ==> Make sure you install mongoConnect first via
//
// npm install mongoConnect
//
var mongoConnect = require('./index');
var dbAccess = require('./sampleDbAccess');

var http = require('http');

// Setup the database 
// ==> Update this with your specific database URL
mongoConnect.setup('mongodb://localhost:27017/local');

// Start the web server
console.log('Listening at http://localhost:8000');
console.log('Visit http://localhost:8000/data to test database access')
http.createServer( function(req, res) {

  timestamp = new Date();
  console.log('Request for URL ' + req.url + ' received at ' + timestamp);

  if (req.url === '/data') {
    // dbAccess does not need to worry about 
    // setting up the database connection, 
    // opening it, or reopening if it gets
    // closed by the mongo server.
    dbAccess.getData(function(err, data) {
      if(err) {
        res.end('ERROR: ' + err);
      } 
      else {
        res.end(JSON.stringify(data));
      }
    }); 
    return;
  }

  res.end('<p>Hello World ' + timestamp + '</p>');

}).listen(8000, 'localhost');


