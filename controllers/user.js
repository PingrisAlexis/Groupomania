//Import Bcrypt package: to hash password, use salt.
const bcrypt = require('bcrypt');
//Import JsonWebToken package: to assign a token to a user when they log in.
const jwt = require('jsonwebtoken');
//Import CryptoJS package: to encrypt mail adress.
const cryptojs = require('crypto-js');
//Import package File System: To manage download and upload images.
const fs = require('fs');
//Import the database connection.
const db = require("../models");

const User = db.user;

//Middleware to create a new user account.
exports.signupOneUser = (req, res) => {
  let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexName = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
  if (!regexEmail.test(req.body.email)) {
    res.status(400).json({ error: 'A correct email format (example@email.com) is required.' })
  } else if  (!regexName.test(req.body.firstname)) {
    res.status(400).json({ error: 'A correct firstname format is required.' })
  } else if  (!regexName.test(req.body.lastname)) {
    res.status(400).json({ error: 'A correct lastname format is required.' })
  }
  else {
    const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
      User.findOne({ where: { email: cryptedEmail } })
      .then(user => {
        if (user) {
          return res.status(404).json({ error: 'E-mail is already used.' });
        }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            avatar: req.body.avatar,
            email: cryptedEmail,
            password: hash,
            admin: 0
          };
        User.create(newUser)
        .then ( 
          () => res.status(201).json({ message: 'Your account has beed created' })
        )
        .catch (
          (error) => res.status(400).json({ error }) 
        )
        })
      })
    .catch (
      (error) => res.status(500).json({ error })
    )
  }
};

//Middleware to connect a user account that already exist in the DB.
exports.loginOneUser = (req, res, next) => {
  const cryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.CRPT_MAIL).toString();
  User.findOne({ where : { email: cryptedEmail} })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Account not found.' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar,
            token: jwt.sign(
              { userId: user._id },
              process.env.TK_JWT,
              { expiresIn: '24h' }
            )
          });
        })
        .catch (
          (error) => res.status(500).json({ error })
        )
      })
    .catch (
      (error) => res.status(500).json({ error })
    );
};

// //Middleware to delete a user account.
exports.deleteOneUser = (req, res, next) => {
  User.findOne ({ where: { id: req.params.id }  })
    .then(user => {
      if (user.avatar !== null) {
        const filename = user.avatar.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          User.destroy({ where: { id: req.params.id}  })
            .then (() => 
              res.status(200).json({ message: 'User account has been deleted.' })
            )
            .catch (
              (error) => {res.status(404).json({ error })}
            )
        })
      } else {
        User.destroy({ where: { id: req.params.id}  })
        res.status(200).json({ message: 'User account has been deleted.' })
      }
    })
  .catch (
    (error) => res.status(500).json({ error })
  );
};

//Middleware to modify a user account.
exports.modifyOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
  .then(user => {
    if (user.avatar !== null)  {
      let img = user.avatar.split('/images/')[1];
      fs.unlink("images/"+ img, () => {
        User.update({ avatar: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename},
        { where: { id: req.params.id } })
          .then ( 
            () => {res.status(201).json({ message: 'Avatar updated.' })}
          )
          .catch (
            (error) => {res.status(404).json({ error })}
          )
        })
    } else {
      User.update({ avatar: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename},
        { where: { id: req.params.id } })
    }
  })
  .catch ( 
    (error) => res.status(500).json({ error })
  );
};

//Middleware to get a user account.
exports.getOneUser = (req, res, next) => {
  User.findOne({where: { id: req.params.id} }) 
  .then (
    (user) => {res.status(200).json(user)}
  )
  .catch (
    (error) => {res.status(404).json({error})}
  )
};

//Middleware to get all user's accounts.
exports.getAllUsers = (req, res, next) => {
  User.findAll({attributes: ["id", "firstname", "lastname", "avatar"]})
  .then (
    (users) => {res.status(200).json(users)}
  )
  .catch (
    (error) => {res.status(400).json({error})}
  );
};