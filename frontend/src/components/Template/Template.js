import React, {useEffect} from 'react';
import Card from "./Card/Card";
import Filters from "./Filters/Filters";
import {useDispatch, useSelector} from "react-redux";
import './Template.css'
import Loader from "../Loader/Loader";
import {selectSortedArts} from "../../services/art_service";
import {useNavigate} from "react-router";

const _ = require('lodash');

const Template = ({target, sortBy}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.global.isLoading)
    const arts = useSelector(state => selectSortedArts(state, {target, sortBy}))
    const isAuth = useSelector(state => state.userReducer.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        dispatch({type: 'CHANGE_TARGET', payload: target})
    }, [target])

    let renderArts = arts.map((item, index) => {
        return (
            <div className="col-2" key={index}>
                <Card item={item}/>
            </div>
        )
    })

    return (
        <div className="container mt-3">
            {
                !isLoading ?
                    <div className="w-100">
                        <div className='row'>
                            <div className="col-10">
                                <div className="row">
                                    {renderArts.length ? renderArts : 'Ничего не найдено'}
                                </div>
                            </div>
                            <div className="col-2">
                                <Filters/>
                            </div>
                        </div>
                    </div>
                    : <Loader/>
            }
        </div>
    );
};

export default Template;