import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getItem} from "../../../services/art_service";
import Loader from "../../Loader/Loader";
import {Button} from "react-bootstrap";
import {deleteItem} from "../../../services/user_service";
import {setShow} from "../../../redux/actions/globalActions";

const ArtItem = () => {
    const [art, setArt] = useState([])
    const [isInTheLib, setIsInTheLib] = useState([])
    const {itemId} = useParams();
    const user = useSelector(state => state.userReducer.user)
    const isAuth = useSelector(state => state.userReducer.isAuth)
    const navigate = useNavigate();


    useEffect(async () => {
        if (isAuth) {
            const res = await getItem(itemId)
            if (res) {
                setArt([res])
            }
            let libItem = user.lib.filter(i => i.id === parseInt(itemId))
            setIsInTheLib(libItem)
        } else {
            navigate('/login')
        }
    }, [itemId])

    const generateButton = () => {
        if (isInTheLib.length) {
            return <div>
                <Button variant='danger'
                        onClick={() => deleteItem(user.id, art[0].id, setIsInTheLib, user.lib, art[0])}
                        className='mt-2 w-100'>Удалить из библиотеки</Button>
            </div>
        }
        return <Button variant='primary' onClick={() => setShow({item: art[0], userId: user.id, show: true})}
                       className='mt-2 w-100'>Добавить в библиотеку</Button>
    }

    const layout = art.map((i, index) => {
        const genres = i.genres.join(', ')
        console.log(genres)
        return (
            <div className='row' key={index}>
                <div className="col-3">
                    <div className="w-100 d-flex flex-column align-items-center">
                        <img src={require(`../../../assets/img/cards/${i.path}`)} className='img-fluid' alt='avatar'/>
                        {generateButton()}
                    </div>
                </div>
                <div className="col-9">
                    <div><strong>Название</strong>: {i.name}</div>
                    <div><strong>Описание</strong>: {i.description}</div>
                    <div><strong>Жанр</strong>: {genres}</div>
                    <div><strong>Рейтинг</strong>: {i.rating ? i.rating : '-'} / 10</div>
                    <div><strong>Популярность</strong>: {i.popularity}</div>
                </div>
            </div>
        )
    })

    if (!art.length) {
        return <Loader/>
    }

    return (
        <div className='w-100 mt-5'>
            <div className="container">
                {layout}
            </div>
        </div>
    );
};

export default ArtItem;