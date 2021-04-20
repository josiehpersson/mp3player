import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Delete = (props) => {
    return(
        <Tooltip title="Delete">
        <IconButton onClick={props.onDelete}>
        <DeleteIcon color="error" />
            </IconButton>
        </Tooltip>
    )
}

export default Delete;