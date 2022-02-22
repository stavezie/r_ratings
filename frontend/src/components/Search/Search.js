import React, {useState} from 'react';
import cl from "./Search.module.css";
import {useSelector} from "react-redux";
import {Form} from 'react-bootstrap'

const Search = ({target, setter, title}) => {
    let searchItems = useSelector(state => state.artsReducer[target])
    const [searchVal, setSearchVal] = useState('')
    const [isActiveSearchBar, setActiveSearchBar] = useState(false)

    const searchArts = (val) => {
        return searchItems
            .filter(i => i.name.toLowerCase().includes(val.toLowerCase()))
            .map((i, index) => {
                if (i.name !== 'Не учитывать') {
                    return (
                        <div onClick={() => {
                            setter(i.id)
                            setSearchVal(i.name)
                        }} style={{cursor: 'pointer'}}
                             key={index}>{i.name}</div>
                    )
                }
            })
    }

    return (
        <div className='position-relative mb-3'>
            <div>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>{title}</Form.Label>
                    <Form.Control value={searchVal}
                                  onBlur={() => setTimeout(() => {
                                      setActiveSearchBar(false)
                                  }, 100)}
                                  onClick={() => setActiveSearchBar(true)}
                                  onInput={(e) => setSearchVal(e.target.value)}
                                  type="text" placeholder={title}/>
                </Form.Group>
            </div>
            <div className={isActiveSearchBar ? cl.searchDiv : cl.searchDivFalse}>
                {searchArts(searchVal).length ? searchArts(searchVal) : 'Ничего не найдено'}
            </div>
        </div>
    );
};

export default Search;