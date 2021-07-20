//Import Bcrypt package: to hash password, use salt.
const bcrypt = require('bcrypt');
//Import JsonWebToken package: to assign a token to a user when they log in.
const jwt = require('jsonwebtoken');
//Import CryptoJS package: to encrypt mail adress.
const cryptojs = require('crypto-js');
//Import the user's model, create by mongoose.
const User = require('../models/users');
var app = require('../app.js');


//Middleware to create a new user account.
exports.signup = (req, res, next) => {
  let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(req.body.email) === false) {
    res.status(400).json({ error: 'Please insert a valid mail like userName@groupomania.fr' })
  } else {
    //Calculates a Hash-based Message Authentication Code (HMAC) using the Secure Hash Algorithm function (SHA256).
    const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          // avatar: req.body.avatar,
          email: cryptedEmail,
          password: hash
        })
        let sql = `INSERT INTO users SET ?`;
        let query = app.db.query(sql, user, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(results);
          }
        })
      })
      .catch(error => res.status(500).json({ error }));
  }
};

//Middleware to connect a user account that already exist in the DB.
exports.login = (req, res, next) => {
  //Calculates a Hash-based Message Authentication Code (HMAC) using the Secure Hash Algorithm function (SHA256).
  const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
  User.findOne({ email: cryptedEmail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(          // encode a new token 
              { userId: user._id },
              process.env.TK_JWT,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
