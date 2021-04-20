import React, {useEffect, useState} from 'react';
import {Fab, makeStyles, Tooltip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import axios from 'axios';
import {MP3_BASEURL, PLAYLIST_BASEURL} from '../assets/constants';
import Mp3List from './Mp3List';
import Mp3Form from './Mp3Form';
import PlaylistForm from './PlaylistForm';
import AudioPlayer from './AudioPlayer';
import PlaylistDropdown from './PlaylistDropdown';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    header : {
        padding: theme.spacing(4),
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: '96%'
    },
    actionBtn: {
        marginRight: theme.spacing(2)
    }
}));

const Mp3Container = () => {
    const classes = useStyles();
    const [mp3s, setMp3s] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [mp3FormOpen, setMp3FormOpen] = useState(false);
    const [playlistFormOpen, setPlaylistFormOpen] = useState(false);

    useEffect(() => {
        getMp3s();
        getPlaylists();
    }, []);


    //API
    const getMp3s = () => {
        axios.get(MP3_BASEURL)
        .then(res => {
            setMp3s(res.data);
            setIsFetching(false);
        })
        .catch(error => console.error(error));
    }

    const getPlaylists = () => {
        axios.get(PLAYLIST_BASEURL)
        .then(res => {
            setPlaylists(res.data);
        })
        .catch(error => console.error(error));
    }

    const createMp3 = (mp3) => {
        axios.post(MP3_BASEURL, {
            title: mp3.title,
            artist: mp3.artist,
            path: mp3.path
        })
        .then(res => {
            setMp3s(res.data);
        })
        .catch(error => console.error(error));
    }

    const createPlaylist = (playlist) => {
        axios.post(PLAYLIST_BASEURL, {
            name: playlist.name
        })
        .then(res => {
            setPlaylists(res.data);
            console.log(res.data);
        })
        .catch(error => console.error(error));
    }
    const updateMp3 = (mp3, favorite) => {
        axios.put(`${MP3_BASEURL}/${mp3}`, {
          favorite: favorite
        })
        .then(res => {
          setMp3s(res.data);
        })
        .catch(error => console.error(error))
    }

    const updatePlaylist = (playlist) => {
        axios.put(`${PLAYLIST_BASEURL}/${playlist._id}`, {
            _id: playlist._id,
            name: playlist.title,
        })
        .then(res => {
            setPlaylists(res.data);
        })
        .catch(error => console.error(error));
    }

    const deleteMp3 = (id) => {
        axios.delete(`${MP3_BASEURL}/${id}`)
        .then(res => {
            setMp3s(res.data);
        })
        .catch(error => console.error(error));
    }

    const deletePlaylist = (playlist) => {
        axios.delete(`${PLAYLIST_BASEURL}/${playlist._id}`)
        .then(res => {
            setPlaylists(res.data);
        })
        .catch(error => console.error(error));
    }

    //FUNCTIONS
    const handleMp3Save = (newMp3) => {
        setMp3s([...mp3s, newMp3]);
        createMp3(newMp3);
    }

    const handlePlaylistSave = (newPlaylist) => {
        createPlaylist(newPlaylist);
    }

    const handleLike = (id, favorite) => {
            updateMp3(id, !favorite);
    }

    return(
        <div className={classes.container}>
        <div className={classes.header}>
            <div>
            <Tooltip title="Add song">
        <Fab onClick={() => setMp3FormOpen(true)} color="primary" className={classes.actionBtn}><AddIcon /></Fab>
            </Tooltip>
            <Tooltip title="Add Playlist">
        <Fab onClick={()=> setPlaylistFormOpen(true)}color="secondary" className={classes.actionBtn}><QueueMusicIcon/></Fab>
            </Tooltip>
            </div>
        <PlaylistDropdown playlists={playlists} variant="outlined" helperText="Choose playlist" />
        </div>
        <Mp3List mp3s={mp3s} playlists={playlists} onDelete={(id) => deleteMp3(id)} onLike={handleLike} />
        <Mp3Form onSave={handleMp3Save} open={mp3FormOpen} onClose={() => setMp3FormOpen(false)}/>
        <PlaylistForm onSave={handlePlaylistSave} open={playlistFormOpen} onClose={() => setPlaylistFormOpen(false)} />
        {!isFetching && <AudioPlayer mp3s={mp3s} />}
    </div>
    )
}
export default Mp3Container;
