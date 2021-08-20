//Import the database connection.
const db = require("../models");
const Post = db.post;
const Comment = db.comment;

//Middleware to create a comment.
exports.createOneComment = (req, res, next) => {
  const newComment = {
    comment: req.body.comment,
    postId: req.body.postId,
    userId: req.body.userId,
    createdAt: req.body.createdAt
  };
  Comment.create(newComment)
  .then (
    (data) => {res.send(data)}
  )
  .catch (
    (error) => {res.status(404).send({ error })}
  )
};

//Middleware to modify a comment.
// exports.modifyOneComment = (req, res, next) => {
//   Comment.findOne({ where: { id: req.params.id } })
//   .then(comment => {
//     let userId = req.headers.authorization.split(' ')[3];
//     if (comment.userId == userId) {
//     Comment.update({ message: req.body.message}, { where: { id: req.params.id } })
//     .then ( 
//       () => {res.status(201).json({ message: 'Comment has been modified.' })}
//     )
//     .catch (
//       (error) => {res.status(404).json({ error: error });}
//     )} 
//     else {
// 			res.status(403).json({error })
//     }
//   })
//   .catch (
//     (error) => res.status(500).json({ error }));
// };

//Middleware to delete a comment.
// exports.deleteOneComment = (req, res, next) => {
//   Comment.delete({ where: { id: req.params.id } }, 
//     (err, data) => {
//     if(err) {
//       return res.status(400).json({ message: 'Comment has not been deleted' });
//     } 
//     res.status(200).json({ message: 'Comment has been deleted'})
//   })
// };

//Middleware to get all comments.
exports.getAllComments = (req, res, next) => {
  Comment.findAll({ where: { postId : req.params.id}, order: [['id', 'DESC']]})
  .then (
    (comment) => {res.status(200).json( comment )}
  )
  .catch (
    (error) => {res.status(400).json({ error })}
  )
};