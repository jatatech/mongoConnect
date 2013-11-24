var mongoConnect = require('./index');

exports.getData = function(callback) {

  // Execute a find command against the startup_log
  // collection in the database. Feel free to change
  // it to use a different collection or a totally
  // different command. 
  mongoConnect.execute(function(err, db) {

    var collection = db.collection('startup_log');
    collection.find().limit(5).toArray(function(err, docs) {

      if(err) {
        callback(err);
      }
      else {
        callback(null, docs);
      }

    });

  });

};

