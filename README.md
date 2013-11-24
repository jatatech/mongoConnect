mongoConnect
============
A wrapper for MongoDB's MongoClient that handles keeping the connection open and dealing with reconnections.

In Node.js applications MongoDB connections are meant to be opened once and kept opened while the Node.js app is running (http://stackoverflow.com/a/15688610/446681).

This module encapsulates the logic required to
do this.  


Installation
============
    cd yourApp
    npm install mongoconnect


Typical usage is
================
In your main server.js

    var mongoConnect = require('./mongoConnect');
    mongoConnect.setup('mongodb://localhost:27017/yourDB');


In your database access code (say dbTest.js)

    var mongoConnect = require('./mongoConnect');
    mongoConnect.execute(function(err, db) {
      // Your code to do something with the db goes here
      // e.g. db.collection('xxx').find(...)
    })



Limitations
===========
Be aware that currently only one database can be handled through this code. As such, only the first call to setup is honored, subsequent calls are ignored.

