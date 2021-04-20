import React from 'react';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import Mp3File from './Mp3File';

const Mp3List = (props) => {

const showFiles = props.mp3s.map(mp3 => {
            return(
                <Mp3File 
                key={mp3._id}
                mp3={mp3} 
                onDelete={(id) => props.onDelete(id)} 
                onLike={(id, fav) => props.onLike(id, fav)}
                playlists={props.playlists}
                />
            )
        });

return(
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Artist</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {showFiles}
            </TableBody>
        </Table>
    </TableContainer>
)
}

/* Mp3List.propTypes = {
    mp3s: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            artist: PropTypes.string,
            path: PropTypes.string,
            favorite: PropTypes.bool,
        })
    ).isRequired,
    onFavClick: PropTypes.func.isRequired,
    onPlayClick: PropTypes.func.isRequired,
}; */

export default Mp3List;