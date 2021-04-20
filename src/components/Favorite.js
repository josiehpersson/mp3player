import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { IconButton, Tooltip } from '@material-ui/core';

const Favorite = (props) => {
return(
    <Tooltip title={props.favorite ? "Unmark as favorite" : "Mark as favorite"}>
    <IconButton onClick={props.onLike}>
        {props.favorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderOutlinedIcon color="primary" />}
    </IconButton>
    </Tooltip>
)
}

export default Favorite;