import React from 'react';
import {Form} from "react-bootstrap";

const MyInput = ({name, val, setVal}) => {
    console.log(val)
    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{name}</Form.Label>
                <Form.Control onInput={(e) => setVal(e.target.value)} type="text" value={val} placeholder={name}/>
            </Form.Group>
        </div>
    );
};

export default MyInput;