import React, { useState } from 'react'
import {Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Header, Textbox } from '../../components';

function Home() {
  const [selectedOption, setSelectedOption] = useState("")
  const navigate = useNavigate();
  const onLogin = () => {
    if (selectedOption === 'doctor') {
      navigate('/doctor')
    } else {
      navigate('/patient')
    }
  }
  return (
    <div>
      <Header />
      <div className='mt-[8%] ml-[35%] mr-[35%]'>
            <Form>
                <Form.Group className='ml-[42%]'>
                  <p className='text-[20px]'>Login as:</p>
                  <Form.Check type='radio' label="Doctor" name='login' onClick={() => setSelectedOption('doctor') }/>
                  <Form.Check type='radio' label="Patient" name='login' onClick={() => setSelectedOption('patient')}/>
                </Form.Group>
                <Form.Group className="mb-2 form-group-style" >
                    <Textbox label = "Email" type="email"/>
                </Form.Group>
                <Form.Group className="mb-2 form-group-style" >
                    <Textbox label = "Password" type="password"/>
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