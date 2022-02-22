import React, {useState} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {addArtToServer} from "../../../services/admin_service";
import {useSelector} from "react-redux";

const AddArtForm = () => {
    const types = useSelector(state => state.artsReducer.types)
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [date, setDate] = useState('')
    const [path, setPath] = useState('')
    const [type, setType] = useState('anime')
    const [description, setDescription] = useState('')
    const [episodes, setEpisodes] = useState('')
    const [validate, setValidate] = useState(false)

    const addArt = async () => {
        let data = {name, type, description, path, genre, date, episodes}
        await addArtToServer(data)
    }

    const validateFields = async () => {
        if (name && genre && date && path && type && description && episodes) {
            setValidate(true)
            await addArt()
                .then(() => {
                    setGenre('')
                    setDate('')
                    setPath('')
                    setType('')
                    setDescription('')
                    setEpisodes('')
                })
        } else {
            setValidate(false)
        }
    }


    return (
        <div>
            <Form validated={validate}>
                <Form.Group className="mb-3">
                    <Form.Label>Название</Form.Label>
                    <Form.Control required={true} value={name} onChange={(e) => setName(e.target.value)}
                                  type="text"
                                  placeholder='Название'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Жанр</Form.Label>
                    <Form.Control required={true} value={genre} onChange={(e) => setGenre(e.target.value)} type="text"
                                  placeholder="Жанр"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Дата</Form.Label>
                    <Form.Control required={true} value={date} onInput={(e) => setDate(e.target.value)} type="text"
                                  placeholder="Дата"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Кол-во эпизодов</Form.Label>
                    <Form.Control required={true} value={episodes} onChange={(e) => setEpisodes(e.target.value)}
                                  type="text"
                                  placeholder="Кол-во эпизодов"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Тип</Form.Label>
                    <Form.Select required={true} onChange={(e) => setType(e.target.value)}
                                 aria-label="Default select example">
                        {types.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 mt-2" controlId="formBasicPassword">
                    <Form.Label>Описание</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2" label="Описание">
                        <Form.Control
                            required={true}
                            as="textarea"
                            value={description}
                            onInput={(e) => setDescription(e.target.value)}
                            placeholder="Leave a comment here"
                            style={{height: '100px'}}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="position-relative mb-3">
                    <Form.Label>Файл</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="file"
                        onChange={(e) => setPath(e.target.files[0].name)}
                    />
                </Form.Group>

                <Button onClick={async () => await validateFields()} variant="primary">
                    Добавить
                </Button>
            </Form>
        </div>
    );
};

export default AddArtForm;