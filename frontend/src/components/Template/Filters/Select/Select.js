import React, {useRef} from 'react';
import Option from "./Option";
import {dispatchSortOptions} from '../../../../redux/reducers/artsReducer'
import {useDispatch, useSelector} from "react-redux";

const SelectItem = ({title, vls, opt}) => {
    const selectRef = useRef();
    const dispatch = useDispatch();
    const target = useSelector(state => state.artsReducer.target)
    const arts = useSelector(state => state.artsReducer[target])
    const sortOptions = useSelector(state => state.artsReducer.sortOptions)

    const getSortOption = () => {
        let option = sortOptions.filter(option => option[opt])
        if (option.length) {
            let key = Object.keys(option[0])[0]
            return option[0][key]
        }
        return null
    }

    const changeSortOption = () => {
        const key = opt;
        const value = selectRef.current.value;
        dispatch({type: 'CHANGE_SORT_OPTIONS', payload: dispatchSortOptions(sortOptions, key, value)})
        dispatch({type: 'SORT_BY_SELECTS', payload: arts})
    }

    return (
        <div className='mt-4'>
            <h6 style={{fontWeight: 'bold'}}>{title}</h6>
            <select defaultValue={getSortOption()} ref={selectRef} onChange={() => changeSortOption()} className="form-select" aria-label="Default select example">
                {vls.map((item, index) => <Option opt={opt} key={index} vl={item} />)}
            </select>
        </div>
    );
};

export default SelectItem;