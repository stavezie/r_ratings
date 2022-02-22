import React from 'react';
import {useSelector} from "react-redux";

const Option = (props) => {
    return (
        <option value={props.vl}>{props.vl}</option>
    );
};

export default Option;