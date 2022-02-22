import React, {useEffect, useState} from 'react';
import {registration} from "../../../../../services/auth_service";
import {useNavigate} from 'react-router'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../../Loader/Loader";
import {DangerAlert} from "../../../../Alerts/Alerts";


const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const isLoading = useSelector(state => state.global.isLoading)
    const dispatch = useDispatch()
    const isAuthError = useSelector(state => state.global.isAuthError)
    const isAuth = useSelector(state => state.userReducer.isAuth)

    const register = async (name, email, password) => {
        const statusCode = await registration(name, email, password)
        if (statusCode === 200) {
            console.log('1')
            setEmail('')
            setName('')
            setPassword('')
            navigate('/')
        }
        dispatch({type: 'TURN_AUTH_ERROR', payload: !isAuthError})
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [])

    if (isAuthError) {
        return <DangerAlert/>
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control"
                           id="name" aria-describedby="name"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
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
                <button onClick={() => register(name, email, password)} className="btn btn-primary">Submit</button>
            </div>
        </div>
    );
};

export default Registration;