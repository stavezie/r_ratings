import React from 'react';
import Dropdown from "./Dropdown/Dropdown";
import {useSelector} from "react-redux";

const Menu = () => {
    const user = useSelector(state => state.userReducer.user)
    let menuDropdown = [{title: 'Аниме', link: '/anime'}, {title: 'Сериалы', link: '/series'}]
    let accountDropdown = [{title: 'Библиотека', link: '/lib'}, {
        title: 'Настройки',
        link: '/setts'
    }, {title: 'Выйти', link: '/logout'}]

    const avatar = user.avatar ? user.avatar : 'default.jpg'

    return (
        <>
            <Dropdown
                type='site-menu'
                title='Меню'
                options={menuDropdown}/>
            <Dropdown
                title={null}
                type='user-menu'
                name={user.name}
                avatar={avatar}
                options={accountDropdown}
            />
        </>
    );
};

export default Menu;