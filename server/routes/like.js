const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
const { auth } = require("../middleware/auth");

//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
    
    let variable = { };

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    
    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
});

router.post('/upLike', (req, res) => {
        
    let variable = { };

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    // Put Likes info into Like Collection
    const like = new Like(variable)
    like.save((err, likeResult) => {
        if(err) return res.json({ success: false, err })

        // If Dislikes is clicked already, substract the number of dislikes by 1
        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
});

router.post('/downLike', (req, res) => {

    let variable = { };

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true})
        })

});


//=================================
//             Dislike
//=================================

router.post('/getDislikes', (req, res) => {
    
    let variable = { };

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })
});

router.post('/upDislike', (req, res) => {
        
    let variable = { };

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    // Put Dislikes info into Dislike Collection
    const like = new Dislike(variable)
    like.save((err, dislikeResult) => {
        if(err) return res.json({ success: false, err })

        // If Likes is clicked already, substract the number of likes by 1
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
});

router.post('/downDislike', (req, res) => {

    let variable = { };

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true})
        })

});

module.exports = router;
