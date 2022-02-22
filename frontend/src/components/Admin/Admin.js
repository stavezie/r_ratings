import React, {useEffect} from 'react';
import {Accordion, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import AdminItem from "./AdminItem/AdminItem";
import AddArtForm from "./Forms/AddArtForm";
import AddGenreToArt from "./Forms/AddGenreToArt";

const Admin = () => {
    let {roles} = useSelector(state => state.userReducer.user)
    const navigate = useNavigate()

    useEffect(() => {
        roles = roles.split(',').map(role => role.trim())
        if (!roles.includes('admin')) {
            navigate('/')
        }
    }, [])

    return (
        <Container>
            <div className="w-100 mx-2 mt-5">
                <Accordion defaultActiveKey="0">
                    <AdminItem title="Добавить арт" k={0} form={<AddArtForm/>}/>
                    <AdminItem title="Добавить жанр к арту" k={1} form={<AddGenreToArt/>}/>
                </Accordion>
            </div>
        </Container>
    );
};

export default Admin;