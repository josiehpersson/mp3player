const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
/* const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null, 'uploads/')
    }
});

const upload = multer({storage: storage});
 */
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost/mp3';

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = Promise;


//MODELS
const mp3Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    artist: {
        type: String,
    },
    path: {
        type: String,
    },
    favorite: {
        type: Boolean,
    },
    playlists: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
    }
    ],
});

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mp3s: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mp3',
        }
    ],
});

const Mp3 = mongoose.model('Mp3', mp3Schema);
const Playlist = mongoose.model('Playlist', playlistSchema);

//ROUTES

//GET ALL
app.get('/mp3s', async (req, res) => {
    const getMp3s = await Mp3.find(req.query);
    if(!getMp3s) {
        res.status(404).json({error: 'Mp3s not found'});
    } else {
        let sum = 0; 
        for(let i = 0; i < 1000000; i++) {
            for(let j = 0; i < 1000000; i++) {
                sum += 100*i/j;
            }
        }
        res.status(200).json(getMp3s);
    }
});
//FUNKAR I POSTMAN

app.get('/playlists', async (req, res) => {
    const getPlaylists = await Playlist.find(req.query);
    if(!getPlaylists) {
        res.status(404).json({error: 'Playlists not found'});
    } else {
        res.status(200).json(getPlaylists);
    }
});
//FUNKAR I POSTMAN

//GET ONE

app.get('/mp3s/:id', async(req,res) => {
    const getMp3 = await Mp3.findOne({_id: req.params.id});
    if(!getMp3) {
        res.status(404).json({error: 'Mp3 not found'});
    } else {
        res.status(200).json(getMp3);
    }
});
//FUNKAR I POSTMAN

app.get('/playlists/:id', async (req,res) => {
    const getPlaylist = await Playlist.findOne({_id: req.params.id});
    if(!getPlaylist) {
        res.status(404).json({error: 'Playlist not found'});
    } else {
        res.status(200).json(getPlaylist);
    }
});
//FUNKAR I POSTMAN

//POST

app.post('/mp3s', async (req, res) => {
    try {
        const newMp3 = new Mp3({
            title: req.body.title,
            artist: req.body.artist,
            path: req.body.path,
            favorite: false,
        });
        await newMp3.save();
        const getMp3s = await Mp3.find(req.query);
        res.status(200).json(getMp3s);

    } catch(err) {
        res.status(400).json({message: 'Could not save MP3 to db', error: err.errors});
    }
});
//FUNKAR I POSTMAN

app.post('/playlists', async(req,res) => {
    try {
        const newPlaylist = new Playlist({
            name: req.body.name,
            mp3s: [],
        });

        await newPlaylist.save();
        const getPlaylists = await Playlist.find(req.query);
        res.status(200).json(getPlaylists);
    } catch(err) {
        res.status(400).json({message: 'Could not save playlist to db', error: err.errors});
    }
});
//FUNKAR I POSTMAN

//PUT

app.put('/mp3s/:id', async (req, res) => {
    try {
        await Mp3.updateOne(
            {_id: req.params.id},
            {
                favorite: req.body.favorite,
            },
            )
            const getMp3s = await Mp3.find(req.query);
            res.status(200).json(getMp3s);
            res.status(200).json({success: true});

    } catch(err) {
        res.status(400).json({success: false, err});
        console.log(err);
    }
});
//FUNKAR I POSTMAN

app.put('/playlists/:id', async (req, res) => {
    try {
        await Playlist.updateOne(
            {_id: req.params.id},
            {$push: {
                mp3s: req.body.id
            }});
            const getPlaylists = await Playlist.find(req.query);
            res.status(200).json(getPlaylists);
            res.status(200).json({success: true});
    } catch(err) {
        res.status(400).json({success: false, err});
        console.log(err);
    }
});
//UPPDATERAR MEN BLIR NULL I ARRAYEN I POSTMAN

//DELETE
app.delete('/mp3s/:id', async(req,res) => {
    try {
        await Mp3.deleteOne({_id: req.params.id});
        const getMp3s = await Mp3.find(req.query);
        res.status(200).json(getMp3s);
        res.status(200).json({success: true});
    } catch(err) {
        res.status(400).json({success: false});
        console.log(err);
    }
});
//FUNKAR I POSTMAN

app.delete('/playlists/:id', async (req, res) => {
    try {
        await Playlist.deleteOne({_id: req.params.id});
        const getPlaylists = await Playlist.find(req.query);
        res.status(200).json(getPlaylists);
        res.status(200).json({success: true});
    } catch(err) {
        res.status(400).json({success: false});
        console.log(err);
    }
});
//FUNKAR I POSTMAN


