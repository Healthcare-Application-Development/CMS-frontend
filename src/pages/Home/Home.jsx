import React, { useState } from 'react'
import {Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Header, Textbox } from '../../components';

function Home() {
  const [selectedOption, setSelectedOption] = useState("")
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const onLogin = () => {
    const obj = {
      id: username,
      password,
      role: selectedOption
    }
    fetch("http://localhost:9100/authenticate", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(obj)
    }).then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        setFailedLogin(false);
        localStorage.setItem("token", data.object.accessToken);
        localStorage.setItem("user", JSON.stringify(data.object))
        if (selectedOption === 'doctor') {
          navigate('/doctor/requestConsent')
        } else {
          navigate('/patient/PatientPendingCR')
        } 
      } else {
        setFailedLogin(true)
      }
    }).catch(e => setFailedLogin(true))
    
  }
  return (
    <div>
      <Header />
      <div className='mt-[8%] ml-[35%] mr-[35%]'>
            <Form>
                {failedLogin && <Alert variant='danger'>Wrong Credentials</Alert>}
                <Form.Group className='ml-[42%]'>
                  <p className='text-[20px]'>Login as:</p>
                  <Form.Check type='radio' label="Doctor" name='login' onClick={() => setSelectedOption('doctor') }/>
                  <Form.Check type='radio' label="Patient" name='login' onClick={() => setSelectedOption('patient')}/>
                </Form.Group>
                <Form.Group className="mb-2 form-group-style" >
                    <Textbox label = "Username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-2 form-group-style" >
                    <Textbox label = "Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <div className='flex justify-content-center mt-[2%]'>
                    <Button className='btn btn-success p-[2%]' onClick={() => onLogin()}><span className='m-3'>Login</span></Button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Home;