const db = require("../database_connect");

const User = function(user) {
  this.firstname=user.firstname,
  this.lastname=user.lastname,
  this.mail=user.mail,
  this.password=user.password,
  this.createdAt=user.createdAt,
  this.isAdmin=0
}

User.create = (newUser, result) => {
  db.query(`INSERT 
            INTO users 
            SET ?`, 
            newUser, (err, res) => {
      if(err) {
          result(err, null);
          return;
      } else {
          result(null, {
              id:res.id,
              ...newUser
          })
      }
  })
};
