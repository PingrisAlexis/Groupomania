var DataTypes = require("sequelize").DataTypes;
var _posts = require("./posts");

function initModels(sequelize) {
  var posts = _posts(sequelize, DataTypes);

  posts.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(posts, { as: "posts", foreignKey: "userId"});

  return {
    posts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
