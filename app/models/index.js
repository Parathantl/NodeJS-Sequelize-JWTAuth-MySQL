'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Here we can connect author and books base on author'id
db.author.hasMany(db.book, { foreignKey: 'author_id', sourceKey: 'author_id' });
db.book.belongsTo(db.author, { foreignKey: 'author_id', targetKey: 'author_id' });

db.user.belongsToMany(db.book, { through: 'borrow',foreignKey: 'user_id' });
db.book.belongsToMany(db.user, { through: 'borrow',foreignKey: 'book_id' });

module.exports = db;