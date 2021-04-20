import React, {useEffect, useState} from 'react';
import {InputLabel, MenuItem, FormHelperText, FormControl, Select, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 150
    }
}));
const PlaylistDropdown = (props) => {
    const classes = useStyles();
const [playlist, setPlaylist] = useState('');


const handleChange = (e) => {
    setPlaylist(e.target.value);

    //props.onDropdownChange(playlist);
}

const menuItems = props.playlists.map(playlist => {
    return(
    <MenuItem key={playlist._id}
    value={playlist.name}
    >
        {playlist.name}
    </MenuItem>
    )
})
return(
<FormControl variant={props.variant} className={classes.root}>
    <InputLabel id="playlist-dropdown">Playlists</InputLabel>
    <Select
    value={playlist}
    onChange={handleChange}
    displayEmpty
    labelId="playlist-dropdown"
    >
    <MenuItem value="all">None</MenuItem>
    {menuItems}
    </Select>
    <FormHelperText>{props.helperText}</FormHelperText>
</FormControl>


)
}

export default PlaylistDropdown;
