import React, { useState, useEffect, useRef } from 'react';
import {Typography, makeStyles, Slider } from '@material-ui/core';
import AudioControls from './AudioControls';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 500
    },
    trackInfo: {
        height: 100,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: theme.spacing(2)
    },
    tracker : {
        height: 5,
        WebkitAppearance: 'none',
        width: '100%',
        borderRadius: 10,
        transition: 'background 0.2s ease',
        cursor: 'pointer',
        color: theme.palette.primary
    }
}));
const AudioPlayer = (props) => {
    const classes = useStyles();
//The index of the track that's being played.
const [trackIndex, setTrackIndex] = useState(0);
//The current progress of the track.
const [trackProgress, setTrackProgress] = useState(0);
//Whether or not the track is being played.
const [isPlaying, setIsPlaying] = useState(false);
//Whether or not shuffle is actiive
const [shuffle, setShuffle] = useState(false);

const [tracks, setTracks] = useState([...props.mp3s]);

const {title, artist, path} = tracks[trackIndex];

const audioRef = useRef(new Audio(`data:audio/mp3;base64,${path}`)); 
const intervalRef = useRef();
const isReady = useRef(false);
const {duration} = audioRef.current;

useEffect(() => {
    if(isPlaying) {
        audioRef.current.play();
        startTimer();
    } else {
        audioRef.current.pause();
    }
}, [isPlaying]);

useEffect(() => {
    return() => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
    }
}, []);

useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(`data:audio/mp3;base64,${path}`);
    setTrackProgress(audioRef.current.currentTime);
    if(isReady.current) {
        setIsPlaying(true);
        startTimer();
    } else {
        isReady.current = true;
    }
}, [trackIndex]);

const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
        if(audioRef.current.ended) {
            handlePlayNext();
        } else {
            setTrackProgress(audioRef.current.currentTime);
        }
    }, [1000]);
}

const handleShuffle = () => {

    setShuffle(!shuffle);
    if(!shuffle) {
        let tmpArr = [...tracks];
        console.log('tmpArr', tmpArr)
        let secTmpArr = [];
        let pos;
        while (tmpArr.length > 0){
            pos = (Math.floor(Math.random() * tmpArr.length));
            let track = tmpArr.splice(pos, 1);
            secTmpArr.push(...track);
        }
        setTracks(secTmpArr);
    } else {
        setTracks(props.mp3s);
    }
}

const handlePlayPrev = () => {
    if(trackIndex -1 < 0) {
        setTrackIndex(tracks.length -1);
    } else {
        setTrackIndex(trackIndex + 1);
    }
}

const handlePlayNext = () => {
    if(trackIndex < tracks.length -1) {
        setTrackIndex(trackIndex +1);
    } else {
        setTrackIndex(0);
    }
}

const handleScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
}

const handleScrubEnd = () => {
    if(!isPlaying) {
        setIsPlaying(true);
    }
    startTimer();
}

    return(
<div className={classes.container}>
<div className={classes.trackInfo}>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="subtitle1">{artist}</Typography>
</div>
<AudioControls 
onPlayPrev={handlePlayPrev} 
onPlayNext={handlePlayNext} 
isPlaying={isPlaying} 
setIsPlaying={setIsPlaying} 
onShuffle={handleShuffle}
shuffle={shuffle}
/>

<Slider 
value={trackProgress}
step={1}
min={0}
max={duration}
className={classes.tracker}
valueLabelDisplay="auto"
onChange={(e) => handleScrub(e.target.value)}
onMouseUp={handleScrubEnd}
onKeyUp={handleScrubEnd}
/>
</div>
    )
}
export default AudioPlayer;