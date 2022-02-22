import React from 'react';
import {Accordion} from "react-bootstrap";

const AdminItem = ({title, k, form}) => {
    return (
        <div>
            <Accordion.Item eventKey={k}>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    {form}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
};

export default AdminItem;