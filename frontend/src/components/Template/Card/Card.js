import React from 'react';
import cl from './Card.module.css'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const Card = ({item}) => {
    const navigate = useNavigate()
    const target = useSelector(state => state.artsReducer.target);
    const def = '9koMHghQ0yk.jpg'
    const genre = item.genres.length ? item.genres[0] : null
    return (
        <div className={cl.card} style={{cursor: 'pointer'}} onClick={() => navigate(`/${target}/${item.id}`)}>
            <img
                src={require(`../../../assets/img/cards/${item.path}`) || require(`../../../assets/img/${def}`)}
                alt=""
                className={[cl.poster, 'img-fluid'].join(' ')}
            />
            <p className={cl.title}>
                {item.name}
            </p>

            <div className="row">
                <div className="col-6">
                    <p className={cl.subtext}>
                        {genre}
                    </p>
                </div>
                <div className="col-6 text-end">
                    <p className={cl.subtext}>
                        {item.date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;