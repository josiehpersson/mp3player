import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogTitle, IconButton, makeStyles} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
form: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 300,
},
dialogHeader : {
    width: 'inherit',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px auto 10px auto'
}
}));

const Mp3Form = (props) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [path, setPath] = useState('');


    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const handleArtistChange = (e) => {
        const value = e.target.value;
        setArtist(value);
    }
    
    const handlePathChange = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            const rawData = e.target.result;
            const encoded = btoa(rawData);
            setPath(encoded);
        }
        reader.readAsBinaryString(file);
      }
      
    const handleSave = () => {
        const mp3 = {
            title: title,
            artist: artist,
            path: path,
            favorite: false,
        }
        props.onSave(mp3);
        setTitle('');
        setArtist('');
        setPath('');
    };

    const handleClose = () => {
        props.onClose();
    }
    

    return(
        <Dialog onClose={handleClose} open={props.open}>
            <div className={classes.dialogHeader}>
                <DialogTitle>Save new file</DialogTitle>
                <IconButton color="secondary" onClick={handleClose}><CloseIcon /></IconButton>

            </div>
        <form noValidate autoComplete="off" className={classes.form}>
            <TextField 
            variant="outlined"
            type="text"
            label="Title"
            value={title}
            required={true}
            error={!title}
           onChange={handleTitleChange}
            />
            <TextField 
            variant="outlined"
            type="text"
            label="Artist"
            value={artist}
            required={true}
            error={!artist}
            onChange={handleArtistChange}
            />
            <TextField 
            variant="outlined"
            type="file"
            name="file"
            accept=".mp3"
            onChange={handlePathChange}
            />
            <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!title || !artist || !path}
            >
                SAVE
            </Button>
        </form>
        </Dialog>
    )
}

Mp3Form.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default Mp3Form;