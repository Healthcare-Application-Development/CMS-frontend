import React from 'react';
import { Form } from 'react-bootstrap';
import { Button, Textbox } from '../../components';
import { constants } from '../../constants';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const onLogin = () => {
        navigate('/receptionist')
    }
    return (
        <div className='mt-5'>
            <Form>
                <p style={{textAlign:'center',fontSize: '25px',fontWeight: '300'}}>{constants.REACT_APP_LOGIN_LABEL}</p>
                <Form.Group className="mb-2 form-group-style" >
                    <Textbox label = {constants.REACT_APP_EMAIL_LABEL} type="email"/>
                </Form.Group>
                <Form.Group className="mb-2 form-group-style" >
                    <Textbox label = {constants.REACT_APP_PASSWORD_LABEL} type="password"/>
                </Form.Group>
                <div className='login-button'>
                    <Button label = {constants.REACT_APP_LOGIN_LABEL} onClick={() => onLogin()}/>
                </div>
            </Form>
        </div>
    )
}

export default Login;