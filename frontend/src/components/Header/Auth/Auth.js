import React from 'react';
import cl from './Auth.module.css'
import {Link, useLocation} from "react-router-dom";

const Auth = () => {
    return (
        <>
            <Link to="/registration" className='btn btn-primary'>
                Зарегистрироваться
            </Link>
            <Link to="/login" className='btn btn-success ms-3'>
                Авторизироваться
            </Link>
        </>
    );
};

export default Auth;