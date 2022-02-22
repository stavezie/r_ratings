import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import SearchForm from "./SearchForm/SearchForm";
import {Link} from "react-router-dom";
import Menu from "./Menu/Menu";
import {useSelector} from "react-redux";
import Auth from "./Auth/Auth";
import './Header.css'

const Header = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth)

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div className='w-100 d-flex justify-content-center'>
                    <Link className='nav-link' to='/'>DEVEZIER</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="w-100 navbar-nav me-auto mb-2 mb-lg-0">
                            <SearchForm />
                            {isAuth ? <Menu /> : <Auth />}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    );
};



export default Header;