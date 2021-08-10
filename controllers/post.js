//Import the database connection.
const db = require("../database_connect");

//Middleware to create a post.
exports.createOnePost = (req, res, next) => {
  let  media = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
  db.query(`INSERT INTO posts VALUES (NULL,'${req.body.userId}','${req.body.title}','${req.body.message}','${media}', NOW())`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(201).json(result);
      }
    });
};

//Middleware to modify a post.
exports.modifyOnePost = (req, res, next) => {
  db.query(`UPDATE posts SET message = '${req.body.message}', media = '${req.body.media}' WHERE posts.id = '${req.params.id}'`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};

//Middleware to delete a post.
exports.deleteOnePost = (req, res, next) => {
  db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};

//Middleware to get one post.
exports.getOnePost = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};

// INNER JOIN users ON posts.userId = users.id 
//Middleware to get all posts.
exports.getAllPost = (req, res, next) => {
  db.query('SELECT users.lastname, users.firstname, users.avatar, posts.id, posts.userId, posts.title, posts.message, posts.media, posts.createdAt  FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY id DESC',
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};

//Middleware to get an user's posts.
exports.getUserPosts = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`,
  (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }
    else {
      res.status(200).json(result);
    }
  });
};