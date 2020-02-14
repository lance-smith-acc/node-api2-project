const express = require('express');
const Posts = require('./db.js')
const router = express.Router();

// Endpoints
// Gets all posts
router.get("/", (req,res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
    .catch(err => {
        console.log(err);
        rse.status(500).json({
            message:"The posts information could not be retrieved."
        })
    }
    )
})

// Gets posts by id
router.get("/:id", (req,res) => {
    const {id} = req.params;
    Posts.findById(id)
    .then(post => {
        if (post.length > 0) {
          console.log(post)
          res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage:'The posts information could not be retrieved.' })
        });
})

// gets comments by post id
router.get("/:id/comments", (req,res) => {
    const {id} = req.params;
    Posts.findPostComments(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } 
      else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage:'The comments information could not be retrieved.' })
        });
})

// Posts new post
router.post("/", (req,res) => {
    const postInfo = req.body;

    if(!postInfo.title || !postInfo.contents){
        res.status(400).json({errorMessage:"Please provide title and contents for the post."})
    }
    else {
      Posts.insert(postInfo)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:'There was an error while saving the post to the database' })
        });
    }
    
})

// Posts new comment by post id
router.post("/:id/comments", (req,res) => {
    const commentInfo = req.body;

    if(!commentInfo.text){
        res.status(400).json({errorMessage:"Please provide text for the comment."})
    }
    else {
      Posts.insertComment(commentInfo)
        .then(post => {
          if(!post){
            res.status(404).json({errorMessage:"The post with the specified ID does not exist."})
          }
          else {
            res.status(201).json(post);
          }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:'There was an error while saving the comment to the database' })
        });
    }
    
})

// deletes post by id
router.delete("/:id", (req,res) => {
  const {id} = req.params;

  Posts.remove(id)
      .then(post => {
          if (post > 0) {
              res.status(200).json({ message: "The post has been removed" });
          } else {
              res.status(404).json({ message: "The post with the specified ID does not exist." });
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({errMessage:'The post could not be removed' })
      });
})

// updates post by id
router.put("/:id", (req,res) => {
  const {id} = req.params;
  const postInfo = req.body;

    if(!postInfo.title || !postInfo.contents){
        res.status(400).json({errorMessage:"Please provide title and contents for the post."})
    }
    else {
      Posts.update(id, postInfo)
        .then(post => {
          if(!post){
            res.status(404).json({errorMessage:"The post with the specified ID does not exist."})
          }
          else {
            res.status(201).json(post);
          }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:'There was an error while saving the post to the database' })
        });
    }
  })


module.exports = router;
// export default server; ES2015 Modules

