import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogTitle, IconButton, makeStyles} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
   header: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2)
   },
    body: {
        padding: theme.spacing(5),
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
    },
    btn : {
        marginLeft: theme.spacing(5)
    }

}))
const PlaylistForm = (props) => {
const [name, setName] = useState('');
const classes = useStyles();

const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
}
const handleSave = () => {
    const playlist = {
        name: name,
        mp3s: []
    }
    props.onSave(playlist);
    setName('');
}
const handleClose = () => {
    props.onClose();
}
return(
    <Dialog onClose={handleClose} open={props.open}>
        <div className={classes.header}>
            <DialogTitle>Create new playlist</DialogTitle>
            <IconButton color="secondary" onClick={handleClose}><CloseIcon/></IconButton>
        </div>
        <form noValidate autoComplete="off" className={classes.body}>
            <TextField 
            variant="outlined"
            type="text"
            label="Name"
            value={name}
            required={true}
            error={!name}
            onChange={handleNameChange}
            />

        <Button
        className={classes.btn}
        type="button"
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={!name}
        >
            SAVE
        </Button>
        </form>
    </Dialog>
)
}

export default PlaylistForm;