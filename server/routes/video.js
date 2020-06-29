const express = require('express');
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

const { Video } = require("../models/Video");
const { Subscriber} = require("../models/Subscriber");
const { auth } = require("../middleware/auth");

// Storage Multer Config
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');   // All video uploaded from the client will be stored in 'uploads' dir
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4') {
            return cb(res.status(400).end('ERROR: Only mp4 file is allowed.'), false);
        }
        cb(null, true)
    }
});

const upload = multer({storage: storage}).single("file");


//=================================
//             Video
//=================================


router.post('/uploadfiles', (req, res) => {
    // Store the requested video in the server from the client
    // npm install multer --save
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })

    })
});

router.post('/getVideoDetail', (req, res) => {

    // Read video details data in the server and send it to the client
    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, videoDetail) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, videoDetail })
    })
});

router.post('/uploadvideo', (req, res) => {
    // Store video info data in the videoSchema
    const video = new Video(req.body)
    
    video.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.get('/getVideos', (req, res) => {
    // Read a video data in the server and then send it to the client.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})

router.post("/getSubscriptionVideos", (req, res) => {
    
    //Need to find all of the Users that I am subscribing to From Subscriber Collection 
    
    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo)
        })


        //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
    })
});


// Create a thumbnail and display video duration info
// Reference: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
router.post("/thumbnail", (req, res) => {

    let filePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    });


    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration })
        })
        .on('error', function(err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});

module.exports = router;
