// var path = require('path');

// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     user: 'mksdundermifflin',
//     password: 'greenfield25',
//     database: 'fetch_db',
//     charset: 'utf8'
//   }
// });


// var db = require('bookshelf')(knex);


// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function(user) {
//       user.increments('id').primary();
//       user.string('name');
//       user.string('password');
//       user.integer('zip');
//       user.binary('hasDog');
//     })
//   }
// });

// db.knex.schema.hasTable('dogs').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('dogs', function(dog) {
//       dog.increments('id').primary();
//       dog.integer('userId')
//         .unsigned()
//         .references('id')
//         .inTable('users');
//       dog.integer('shelterId')
//         .unsigned()
//         .references('id')
//         .inTable('shelters');
//       dog.binary('isMale');
//       dog.string('blurb');
//       dog.string('activity');
//       dog.string('photoUrl');
//       dog.string('breed');
//     })
//   }
// });

// db.knex.schema.hasTable('shelters').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('shelters', function(shelter) {
//       shelter.increments('id').primary();
//       shelter.integer('zip')
//       shelter.integer('name')
//     })
//   }
// });




// //BOOKSHELF MODEL COLLECTION ABSTRACTIONS BELOW:

// module.exports.User = db.Model.extend({
//   tableName: 'users',
//   dog: function() {
//     return this.hasOne(Dog);
//   }
// });

// module.exports.Dog = db.Model.extend({
//   tableName: 'dogs',
//   shelter: function() {
//     return this.belongsTo(Shelter);
//   },
//   user: function() {
//     return this.belongsTo(User);
//   }
// });

// module.exports.Shelter = db.Model.extend({
//   tableName: 'shelters',
//   dog: function() {
//     return this.hasMany(Dog);
//   }
// });
