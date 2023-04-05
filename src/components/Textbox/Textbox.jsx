import React from 'react';
import { Form } from 'react-bootstrap';

import './Textbox.css';

function Textbox(props) {
    return (
        <div className='px-5'>
            <Form.Label className='form-label-style'>{props.label}</Form.Label>
            <Form.Control type={props.type} onChange={props.onChange}/>
        </div>
    )
}

export default Textbox;