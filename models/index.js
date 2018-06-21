'use strict';
//AAN 2018.05.05 Added dotenv in for windows developers with passwords

require('dotenv').config();
//console.log(process.env);

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

//AAN 2018.05.05 Added dotenv in for windows developers with passwords
//For apple as long as you don't define DBPWD in your .env file. Should be fine
console.log('CHECK THIS OUT');
//comment
if(process.env.DBPWD){  
  config.password=process.env.DBPWD;
}
if(process.env.JAWSDB_URL){
  config.database = process.env.JAWSDB_DB;
  config.username = process.env.JAWSDB_USER;
  config.password= process.env.JAWSDB_PWD;
  config.host = process.env.JAWSDB_HOST
  config.dialect='mysql';
  
}
if (1===2) {
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
 
  //db['user'].belongsTo(db.user);
  //db.contents.belongsTo(db.user, {foreignKey: 'fk_UsersContent', targetKey: 'userId'});  
  
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//AAN 2018.05.05 ForeignKey creation here becaues db model is built.



db.contents.belongsTo(db.users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
