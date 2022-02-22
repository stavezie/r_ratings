import React, {useState} from 'react';
import cl from "./SearchForm.module.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const SearchForm = () => {
    const arts = useSelector(state => state.artsReducer.arts)
    const navigate = useNavigate()
    const [searchVal, setSearchVal] = useState('')
    const [isActiveSearchBar, setIsActiveSearchBar] = useState(false)

    const searchArts = (val) => {
        return arts
            .filter(i => i.name.toLowerCase().includes(val))
            .map((i, index) => <div style={{cursor: 'pointer'}} onClick={() => navigate(`/${i.type}/${i.id}`)}
                                    key={index}>{i.name}</div>)
    }
    
    return (
        <div className='w-100'>
            <form className={[cl.searchForm, "d-flex position-relative"].join(' ')}>
                <input defaultValue={searchVal} onInput={(e) => setSearchVal(e.target.value)}
                       onFocus={() => setIsActiveSearchBar(true)}
                       onBlur={() => {
                           setTimeout(() => {
                               setIsActiveSearchBar(false)
                           }, 100)
                       }}
                       className="form-control me-2" type="search" placeholder="Search"
                       aria-label="Search"/>
            </form>
            <div className={isActiveSearchBar ? cl.searchDiv : cl.searchDivFalse}>
                {searchArts(searchVal).length ? searchArts(searchVal) : 'Ничего не найдено'}
            </div>
        </div>
    );
};

export default SearchForm;