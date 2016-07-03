var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/passport_tutorial';
var db = pgp(connectionString);

module.exports.findOne = function (fields, callback) {
  var username = fields.username;
  db.one('select * from users where username = $1', username)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function (err) {
      return callback(err, null);
    });
};

module.exports.findById = function(id, callback) {
  db.one('select * from users where id = $1', id)
    .then(function(data) {
      callback(null, data);
    })
    .catch(function (err) {
      return callback(err, null);
    });
};
