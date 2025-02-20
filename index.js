// A wrapper for MongoDB's MongoClient that 
// handles keeping the connection open and
// dealing with reconnections.
//
// More info: https://github.com/hectorcorrea/mongoConnect
//
var MongoClient = require('mongodb').MongoClient;
var dbUrl = null; 
var isConnected = false;
var db = null;
var dbOptions = {
  autoReconnect: true
};
var log = function() {}; // by default don't log


var connectAndExecute = function(callback) {

  log('Connecting...');
  MongoClient.connect(dbUrl, dbOptions, function(err, dbConn) {
    //lfms_data?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
    if(err) {
      log('Cannot connect: ' + err);
      callback(err);
      return;
    } 
    
    log('Connected!');
    isConnected = true;
    db = dbConn.db('lfms_data');

    // http://stackoverflow.com/a/18715857/446681
    db.on('close', function() {
      log('Connection was closed!!!');
      isConnected = false;
    });

    log('Executing...');
    callback(null, db);
  
  });

}


exports.execute = function(callback) {

  if(isConnected) {
    log('Executing...');
    callback(null, db);
  }
  else {
    connectAndExecute(callback);
  }

};


exports.setup = function(mongoUrl, mongoOptions, verbose) {
  
  if(dbUrl != null) {
    return;
  }

  dbUrl = mongoUrl;

  if(mongoOptions) {
    dbOptions = mongoOptions;
  }

  if(verbose === true) {
    log = function(msg) {
      console.log('mongoConnect: ' + msg); 
    };
    log('Verbose mode is on');
  }

};


