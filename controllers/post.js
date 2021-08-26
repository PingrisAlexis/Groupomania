//Import package File System: To manage download and upload images.
const fs = require("fs");
//Import the database connection.
const db = require("../models");

const Post = db.post;

//Middleware to create a post.
exports.createOnePost = (req, res, next) => {
  const newPost = {
    userId: req.body.userId,
    title: req.body.title,
    message: req.body.message,
		media: req.protocol + "://" + req.get("host") + "/images/" + req.file.filename,
    createdAt: req.body.createdAt,
  };
  Post.create(newPost)
  .then (
    (data) => {res.send(data)}
  )
  .catch (
    (error) => {res.status(404).send({ error })}
  );
};

//Middleware to get all posts.
exports.getAllPosts = (req, res, next) => {
  Post.findAll({order: [["id", "DESC"]]})
  .then (
    (post) => {res.status(200).json(post)}
  )
  .catch (
    (error) => {res.status(400).json({error})}
  );
};

//Middleware to get one post.
exports.getOnePost = (req, res, next) => {
  Post.findOne({where: { id: req.params.id} }) 
  .then (
    (post) => {res.status(200).json(post)}
  )
  .catch (
    (error) => {res.status(404).json({error})}
  )
};

//Middleware to modify a post.
exports.modifyOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
  .then(post => {
      let filename = post.media.split("/images/")[1];
      fs.unlink("images/"+ filename, () => {
        Post.update({ title: req.body.title, message: req.body.message, media: req.protocol + "://" + req.get("host") + "/images/" + req.file.filename},
        { where: { id: req.params.id } })
          .then( 
            () => {res.status(201).json({ message: "Media is update." })}
          )
          .catch (
            (error) => {res.status(404).json({ error })}
          )
        })
  })
  .catch ( 
    (error) => res.status(500).json({ error })
  );
};

//Middleware to delete a post.
exports.deleteOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then (post => {
      let filename = post.media.split('/images/')[1];
      fs.unlink("images/"+ filename, 
      () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(
            () => res.status(200).json({ message: 'The post has been deleted !' })
          )
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch (
      (error) => res.status(500).json({ error })
    );
};
