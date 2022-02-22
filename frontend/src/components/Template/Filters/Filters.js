import React from 'react';
import './Filters.module.css'
import MyRadio from "./MyRadio/MyRadio";
import {FormControl, FormLabel, RadioGroup} from "@mui/material";
import {useSelector} from "react-redux";
import SelectItem from "./Select/Select";

const Filters = () => {
    let ratingOptions = useSelector(state => state.artsReducer.ratingOptions)
    let genres = useSelector(state => state.artsReducer.genres)
    let genresArray = [];
    genres.forEach(i => genresArray.push(i.name))
    let years = useSelector(state => state.artsReducer.years)
    const radioSort = useSelector(state => state.artsReducer.radioSort)

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend"
                           style={{fontSize: 24 + 'px', fontWeight: 'regular', color: 'black'}}>Сортировка</FormLabel>
                <RadioGroup
                    aria-label="sort"
                    value={radioSort}
                    name="radio-buttons-group"
                >
                    <MyRadio title='По рейтингу' id='rating' sortBy='rating'/>
                    <MyRadio title='По популярности' id='popularity' sortBy='popularity'/>
                    <MyRadio title='По алфавиту' id='name' sortBy='name'/>
                </RadioGroup>
            </FormControl>
            <SelectItem title='Оценка' opt='rating' vls={ratingOptions}/>
            <SelectItem title='Жанр' opt='genres' vls={genresArray}/>
            <SelectItem title='Год' opt='date' vls={years}/>
        </div>
    );
};

export default Filters;