//Import the database connection.
const db = require("../database_connect");

//Middleware to create a comment.
exports.createOneComment = (req, res, next) => {
  db.query(`INSERT INTO comments VALUES (NULL,'${req.body.message}','${req.body.postId}','${req.body.userId}')`,
    (error, result) => {
      if (error) {
        res.status(400).json(error);
      }
      else {
        res.status(201).json(result);
      }
    });
};

//Middleware to modify a comment.
exports.modifyOneComment = (req, res, next) => {
  db.query(`UPDATE comments SET message = '${req.body.message}', WHERE comments.id = '${req.params.id}'`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};

//Middleware to delete a comment.
exports.deleteOneComment = (req, res, next) => {
  db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};

//Middleware to get all comment.
exports.getAllcomment = (req, res, next) => {
  db.query(`SELECT * FROM comments ORDER BY id DESC`,
    (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      else {
        res.status(200).json(result);
      }
    });
};
