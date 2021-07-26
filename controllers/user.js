//Import Bcrypt package: to hash password, use salt.
const bcrypt = require('bcrypt');
//Import JsonWebToken package: to assign a token to a user when they log in.
const jwt = require('jsonwebtoken');
//Import CryptoJS package: to encrypt mail adress.
const cryptojs = require('crypto-js');
//Import the database connection.
const db = require("../database_connect");

//Middleware to create a new user account.
exports.signup = (req, res) => {
  let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexName = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
  if (regexEmail.test(req.body.email) === false) {
    res.status(400).json({ error: 'A correct email format (example@email.com) is required.' })
  } else if  (regexName.test(req.body.firstname) === false) {
    res.status(400).json({ error: 'A correct firstname format is required.' })
  } else if  (regexName.test(req.body.lastname) === false) {
    res.status(400).json({ error: 'A correct lastname format is required.' })
  }
  else {
    const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
    const lastname = req.body.lastname.toUpperCase();
    const firstname = req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.toLowerCase().slice(1);
    db.query(`SELECT * FROM users WHERE email='${cryptedEmail}'`,
      (error, results, rows) => {
        if (results.length > 0) {
          res.status(401).json({ error: 'Email is already used.' });
        } else {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              db.query(`INSERT INTO users VALUES (NULL, '${firstname}','${lastname}','${cryptedEmail}','${hash}', 0)`,
                (error, results) => {
                  if (error) {
                    res.status(400).json({ error })
                  }
                  else {
                    res.status(201).json(results);
                  }
                });
            })
            .catch(error => res.status(500).json({ error }));
        }
      });
  };
};

//Middleware to login a user account.
exports.login = (req, res, next) => {
  const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
  db.query(`SELECT * FROM users WHERE email='${cryptedEmail}'`,
    (error, result, rows) => {
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Incorrect password.' });
            }
            res.status(200).json({
              userId: result[0].id,
              firstname: result[0].firstname,
              lastname: result[0].lastname,
              admin: result[0].admin,
              token: jwt.sign(
                { userId: result[0].id, },
                process.env.TK_JWT,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      } else {
        res.status(404).json({ error: 'Incorrect E-mail.' });
      }
    }
  );
};

//Middleware to delete a user account.
exports.delete = (req, res, next) => {
  db.query(`DELETE FROM users WHERE users.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error })
      }
      else {
        res.status(200).json(result);
      }
    });
};

//Middleware to search  usern account.
exports.search = (req, res, next) => {
  db.query(`SELECT * FROM users WHERE users.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error })
      }
      else {
        res.status(200).json(result);
      }
    });
};