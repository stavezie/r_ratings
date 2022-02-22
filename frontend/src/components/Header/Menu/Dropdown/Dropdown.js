import React from 'react';
import './Dropdown.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Dropdown = ({avatar, name, options, title, adminOptions}) => {
    const {roles} = useSelector(state => state.userReducer.user)
    const links = options.map((item, index) => {
        return <Link key={index} className="dropdown-item"
                     to={item.link}>{item.title}</Link>
    })


    return (
        <div className="dropdown d-flex justify-content-center align-items-center">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                {!title ? <img style={{maxWidth: `30px`}} className='me-1'
                               src={require(`../../../../assets/img/avatars/${avatar}`)}/> : title}
                {name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {links}
            </ul>
        </div>
    );
};

export default Dropdown;