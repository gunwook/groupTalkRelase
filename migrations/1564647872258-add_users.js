'use strict';
const Bluebird = require('bluebird')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url = process.env.MIGRATE_dbConnectionUri
Bluebird.promisifyAll(MongoClient)

/**
 * Make any changes you need to make to the database here
 */
exports.up = function up (next) {
  let mClient = null
  return MongoClient.connect(url)
  .then(client => {
    mClient = client
    return client.db();
  })
  .then(db => {
    const User = db.collection('chatmodel')
    return User.updateMany({} , {$set : {name : ""}})
  })
  .then(() => {
    mClient.close()
    return next()
  })
   .catch(err => next(err))
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down(done) {
  done();
};
