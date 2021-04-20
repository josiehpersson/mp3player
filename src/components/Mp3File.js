import React from 'react';
import {TableRow, TableCell} from '@material-ui/core';
import PropTypes from 'prop-types';
import Favorite from './Favorite';
import Delete from './Delete';
import PlaylistDropdown from './PlaylistDropdown';

const Mp3File = (props) => {
    const mp3 = props.mp3;
    return(
<TableRow id={mp3._id} data-path={mp3.path}>
    <TableCell>
        <Favorite favorite={mp3.favorite} onLike={() => props.onLike(mp3._id, mp3.favorite)} />
            </TableCell>
    <TableCell>{mp3.title}</TableCell>
    <TableCell>{mp3.artist}</TableCell>
    <TableCell>
        {/* <PlaylistDropdown playlists={props.playlists} helperText="Add to Playlist" /> */}
        </TableCell>
        <TableCell>
        <Delete onDelete={() => props.onDelete(mp3._id)} />
        </TableCell>
</TableRow>
    );
}

Mp3File.propTypes = {
    mp3: PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        favorite: PropTypes.bool.isRequired,
    })
};

export default Mp3File;
