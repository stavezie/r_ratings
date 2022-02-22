import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Container, Form} from "react-bootstrap";
import cl from './Settings.module.css'
import {changeUserSettings} from "../../services/user_service";

const Settings = () => {
    const user = useSelector(state => state.userReducer.user)
    const [validate, setValidate] = useState(false)
    const [userName, setUserName] = useState(user.name)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    return (
        <Container className='mt-3'>
            <div className='w-100'>
                <Form validated={validate}>
                    <div>
                        <p className='my-0'>Имя пользователя:
                        </p>
                        <Form.Control onInput={(e) => setUserName(e.target.value)}

                                      value={userName} className={[cl.input, 'w-100'].join(' ')} required={true}
                                      type="text" placeholder="Имя пользователя"/>
                    </div>
                    <div>
                        <p className='my-0'>Пароль:
                        </p>
                        <div>
                            <Form.Control onInput={(e) => setOldPassword(e.target.value)}

                                          value={oldPassword} className={[cl.input, 'w-100'].join(' ')} required={true}
                                          type="password" placeholder="Старый пароль"/>
                        </div>
                        <div className='mt-2'>
                            <Form.Control
                                onInput={(e) => setNewPassword(e.target.value)}

                                value={newPassword} className={[cl.input, 'w-100'].join(' ')} required={false}
                                type="password" placeholder="Новый пароль"/>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Button onClick={async () => {
                            setValidate(true)
                            if (oldPassword !== '') {
                                await changeUserSettings({
                                    id: user.id,
                                    name: userName,
                                    newPassword: newPassword,
                                    oldPassword: oldPassword
                                })
                            }
                        }}
                                variant='success'>Сохранить</Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Settings;