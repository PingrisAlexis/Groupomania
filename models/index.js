//Import dotenv 
require('dotenv').config();
//Import Sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize( 'groupomania',  'OpenClassroomsUser','Pzejg589AlzpZ', {
  host: 'localhost',
  dialect: "mysql",
  operatorsAliases: false,
  port: 3307,
  define: {
    timestamps: false
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.post = require("./posts.js")(sequelize, Sequelize);
db.comment = require("./comments.js")(sequelize, Sequelize);


module.exports = db;