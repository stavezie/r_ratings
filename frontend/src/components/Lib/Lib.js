import React, {useEffect} from 'react';
import LibraryCategory from "./LibraryCategory/LibraryCategory";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const Lib = () => {
    const {lib} = useSelector(state => state.userReducer.user)
    const isAuth = useSelector(state => state.userReducer.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <LibraryCategory title='Запланировано' lib={lib.filter(i => i.user_rating.status === "planed")}/>
            <LibraryCategory title='Просмотрено' lib={lib.filter(i => i.user_rating.status === 'watched')}/>
            <LibraryCategory title='Брошено' lib={lib.filter(i => i.user_rating.status === 'droped')}/>
        </div>
    );
};

export default Lib;