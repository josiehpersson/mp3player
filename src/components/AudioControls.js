import React from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const useStyles = makeStyles((theme) =>({
    container: {
        height: 100,
        width: 500,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));
const AudioControls = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.container}>
    <Fab onClick={props.onPlayPrev} color="secondary" size="medium" aria-label="Previous">
        <SkipPreviousIcon />
    </Fab>
    {props.isPlaying ? (
    <Fab onClick={() => props.setIsPlaying(false)} color="primary" size="large" aria-label="Pause">
    <PauseIcon />
    </Fab>
    ) :
    (
    <Fab onClick={() => props.setIsPlaying(true)} color="primary" size="large" aria-label="Play">
    <PlayArrowIcon />
    </Fab> 
    )}
    <Fab onClick={props.onPlayNext} color="secondary" size="medium" aria-label="Next">
        <SkipNextIcon />
    </Fab>
        <Fab onClick={props.onShuffle} color={props.shuffle ? 'primary' : 'default'} size="small" aria-label="Shuffle">
            <ShuffleIcon />
            </Fab>
</div>
    )
}
export default AudioControls;