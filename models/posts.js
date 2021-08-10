// const util = require('util');
const db = require("../database_connect");

const Post = function(post) {
  this.userId= post.userId,
  this.title=post.title,
  this.message=post.message,
  this.media=post.media,
  this.createdAt=post.createdAt
}


//Middleware to create a post.
Post.createOnePost = (req, res, next) => {
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
Post.modifyOnePost = (req, res, next) => {
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
Post.deleteOnePost = (req, res, next) => {
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
Post.getOnePost = (req, res, next) => {
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

//Middleware to get all posts.
Post.getAllPost = (req, res, next) => {
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
Post.getUserPosts = (req, res, next) => {
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