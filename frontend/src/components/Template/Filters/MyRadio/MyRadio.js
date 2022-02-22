import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormControlLabel , Radio} from "@mui/material";

const MyRadio = (props) => {
    const dispatch = useDispatch();
    const target = useSelector(state => state.artsReducer.target)
    const arts = useSelector(state => state.artsReducer[target]);

    const sort = (sortBy) => {
        dispatch({type: 'CHANGE_RADIO_SORT', payload: sortBy})
        dispatch({type: 'SORT_BY_RADIO', payload: {arts: arts, sortBy: sortBy} })
    }

    return (
        <FormControlLabel value={props.sortBy} control={<Radio onClick={() => sort(props.sortBy)} />} label={props.title} />
    );
};

export default MyRadio;