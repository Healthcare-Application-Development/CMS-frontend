import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components';
import { useLocation } from 'react-router-dom';
import AESUtils from '../../encryption/AESUtils';

function GetRecords() {
    const location = useLocation();
    const [healthRecords, setHealthRecords] = useState([])
    useEffect(() => {
        fetch("http://localhost:9100/mediatorServiceRequestController/call-mediator-service", {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token") 
            }, 
            method: 'POST',
            body: JSON.stringify({
                artifactId: location.state.artifactId,
                emergency : false,
                doctorID: AESUtils.encrypt(location.state.doctorId),
                delegationID: location.state.delegationID,
                consentID: location.state.consentID
            })
        }).then((response) => response.json())
        .then((data) => {
            // if (data.length > 0) {

            // }
            setHealthRecords(data);
        })
    }, [])
    return (
        <div className='flex items-center justify-start'>
            <Sidebar />
            <div className="w-[70%] h-[100%] ml-[20%] mt-[7%]">
                <p className="text-[28px] mb-[2%] text-black font-semibold text-center">View Records</p>
                { healthRecords && healthRecords.length > 0 && Array.isArray(healthRecords) && healthRecords.map((element) => {
                    return (
                        <div className='card w-[70%] p-3 mt-[2%] ml-[16%]'>
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

export default GetRecords;