import React, {useEffect, useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {setShow} from "../../../redux/actions/globalActions";
import {addItemToLib, changeItemInLib, deleteItem} from "../../../services/user_service";

const AddToUserLibModal = ({show, item, userId}) => {
    const user = useSelector(state => state.userReducer.user)
    const [isInTheLib, setIsInTheLib] = useState(false)
    const modal = useSelector(state => state.global.modal)
    const [status, setStatus] = useState('planed');
    const [episodes, setEpisodes] = useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (item.user_rating) {
            setRating(item.user_rating.rating)
            setEpisodes(item.user_rating.episodes_watched)
            setStatus(item.user_rating.status)
        } else {
            setRating(0)
            setEpisodes(0)
            setStatus('planed')
        }
    }, [modal])


    const addItem = async () => {
        const data = {userId, artId: item.id, settings: {rating, episodes_watched: episodes, status}}
        await addItemToLib(data, item, user)
    }

    const changeItem = async () => {
        const data = {userId, artId: item.id, settings: {rating, episodes_watched: episodes, status}}
        await changeItemInLib(data, item, user)
    }

    const validator = (target, setTarget, val, min, max) => {
        let newVal = val.split('').filter(i => i !== '.').join('');
        if (newVal == 0) {
            newVal = newVal.split('').length = 1
        }
        if (typeof (+newVal) === 'number') {
            if (newVal >= min && newVal <= max && newVal !== '') {
                setTarget(newVal)
            } else {
                setTarget(newVal.split('')[1])
            }
        }
    }

    const buttons = () => {
        if (item.user_rating) {
            return (
                <div>
                    <Button onClick={() => changeItem()} className='me-2' variant="primary">Изменить</Button>
                    <Button onClick={() => deleteItem(user.id, item.id, setIsInTheLib, user.lib, item)}
                            variant="danger">Удалить</Button>
                </div>
            )
        }
        return <Button onClick={() => addItem()} variant="primary">Добавить</Button>
    }

    return (
        <Modal show={show} className='w-100'>
            <Modal.Dialog className='w-100 my-0'>
                <Modal.Body>
                    <div>Название: {item.name}</div>
                    <div className='mt-2'>
                        <div><b>Статус</b></div>
                        <Form.Select onChange={(e) => setStatus(e.target.value)} aria-label="Default select example"
                                     value={status}>
                            <option value="planed">Планирую</option>
                            <option value="watched">Просмотрено</option>
                            <option value="droped">Брошено</option>
                        </Form.Select>
                    </div>
                    <div className='mt-2'>
                        <div><b>Оценка (0-10)</b></div>
                        <FormControl
                            onInput={(e) => validator(rating, setRating, e.target.value, 0, 10)}
                            value={rating}
                            placeholder="Оценка"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type='number'
                            max={10}
                            min={0}
                        />
                    </div>
                    <div className='mt-2'>
                        <div><b>Кол-во эпизодов / {item.episodes}</b></div>
                        <FormControl
                            onInput={(e) => validator(episodes, setEpisodes, e.target.value, 0, item.episodes)}
                            min={0}
                            max={item.episodes}
                            value={episodes}
                            placeholder={`Кол-во эпизодов`}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type='number'
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    {buttons()}
                    <Button onClick={() => setShow({item: {}, userId: null, show: false})}
                            variant="secondary">Отмена</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
};

export default AddToUserLibModal;