import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../../../services/auth_service";
import {DangerAlert} from "../../../../Alerts/Alerts";
import Loader from "../../../../Loader/Loader";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.global.isLoading)
    const isAuthError = useSelector(state => state.global.isAuthError)
    const isAuth = useSelector(state => state.userReducer.isAuth)

    const log = async (email, password) => {
        const statusCode = await login(email, password)
        if (statusCode === 200) {
            setEmail('')
            setPassword('')
            navigate('/')
        } else {
            dispatch({type: 'TURN_AUTH_ERROR', payload: !isAuthError})
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [])

    if (isAuthError) {
        return <DangerAlert text='Ошибка при регистрации/авторизации. Некорректно заполнены поля с данными'/>
    }

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <div className='container mt-5'>
            <div style={{width: 100 + '%', maxWidth: 500 + 'px'}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                           className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                           className="form-control" id="exampleInputPassword1"/>
                </div>
                <button onClick={() => log(email, password)} className="btn btn-primary">Submit</button>
            </div>
        </div>
    );
};

export default Login;