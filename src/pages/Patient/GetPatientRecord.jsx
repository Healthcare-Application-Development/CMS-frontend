import React, { useEffect, useState } from 'react'
import { SidebarPatient } from "../../components";
import { Card } from 'react-bootstrap';
import AESUtils from '../../encryption/AESUtils';

function GetPatientRecord() {
  var ABHAID = ""
  const user = localStorage.getItem("user");
  if (user) {
    ABHAID = JSON.parse(user).id
  }
  const [healthRecords, setHealthRecords] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9100/patient/getHealthRecords", {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("token")
      },
      method : 'POST',
      body : JSON.stringify({
        abhaID: AESUtils.encrypt(ABHAID)
      })
    }).then((response) => response.json())
    .then((data) => {
      setHealthRecords(data.object);
    })
  }, [])
  return (
    <div>
      <div className="flex justify-start ">
        <SidebarPatient />
      </div>

      <div className='ml-[33%] mt-[7%]'>
          <p className="font-poppins font-semibold font-regular text-2xl leading-26 tracking-tighter text-black">
            My Records
          </p>
          { healthRecords && healthRecords.length > 0 && healthRecords.map((element) => {
              return (
                  <div className='card w-[70%] p-3 mt-[2%]'>
                      <p className='text-[18px] text-black'>Patient ID: {AESUtils.decrypt(element.abhaId)}</p>
                      <p className='text-[14px] text-black font-semibold'>Record: {AESUtils.decrypt(element.recordType)}</p>
                      <p className='text-[14px] text-black font-semibold'>Description: {AESUtils.decrypt(element.description)}</p>
                      <p className='text-[14px] text-black'>Time of Visit: {new Date(element.timestamp).toDateString()}</p>
                      <p className='text-[14px] text-black'>Hospital Name: {AESUtils.decrypt(element.hospitalName)}</p>
                  </div>
              )
          })   
          }
      </div>
    </div>
  )
}

export default GetPatientRecord