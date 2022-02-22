import React, {useEffect} from 'react';
import {logout} from "../../../../../services/auth_service";
import {useNavigate} from "react-router";
import Loader from "../../../../Loader/Loader";
import {useSelector} from "react-redux";

const Logout = () => {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.userReducer.isAuth)

    useEffect(async () => {
        if (isAuth) {
            await logout()
                .then(() => navigate('/'))
        } else {
            navigate('/')
        }
    }, [])

    return <Loader/>
};

export default Logout;