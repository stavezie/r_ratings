import React from 'react';
import {Container, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {setShow} from "../../../redux/actions/globalActions";

const LibraryCategory = ({title, lib}) => {

    const types = {
        'anime': 'Аниме',
        'series': 'Сериал',
    }
    const user = useSelector(state => state.userReducer.user)

    return (
        <Container className='mt-4'>
            <div className="w-100">
                <h4 className="catTitle">
                    {title}
                </h4>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Оценка</th>
                        <th>Эпизоды</th>
                        <th>Тип</th>
                    </tr>
                    </thead>
                    <tbody style={{cursor: 'pointer'}}>
                    {lib.length ? lib.map((i, index) => {
                        return (
                            <tr onClick={() => {
                                setShow({item: i, userId: user.id, show: true})
                            }} key={index}>
                                <td>{index + 1}</td>
                                <td>{i.name}</td>
                                <td>{i.user_rating.rating}</td>
                                <td>{i.user_rating.episodes_watched} / {i.episodes}</td>
                                <td>{types[i.type]}</td>
                            </tr>
                        )
                    }) : <tr>
                        <th>Здесь пока ничего нет</th>
                    </tr>}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default LibraryCategory;