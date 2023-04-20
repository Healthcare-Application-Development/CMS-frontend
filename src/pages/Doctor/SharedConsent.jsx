import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AESUtils from '../../encryption/AESUtils';


function SharedConsent() {
    const [consentsSharedToDoc, setConsentsSharedToDoc] = useState([]);
    const [consentsSharedByDoc, setConsentsSharedByDoc] = useState([]);
    const [show, setShow] = useState(false);
    const user = localStorage.getItem("user");
    const navigate = useNavigate();
    var UPRNID = "";
    if (user) 
        UPRNID = JSON.parse(user).id;
    const fetchConsentsSharedByDoc = () => {
        fetch("http://localhost:9100/doctor/get-delegate-consent-from?id=" + encodeURIComponent(AESUtils.encrypt(UPRNID)), {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => response.json())
        .then((data) => {
            setConsentsSharedByDoc(data.object)    
        })
    }
    const fetchConsentsSharedToDoc = () => {
        fetch("http://localhost:9100/doctor/get-delegate-consent-to?id=" + encodeURIComponent(AESUtils.encrypt(UPRNID)), {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => response.json())
        .then((data) => {
            setConsentsSharedToDoc(data.object)    
        })
    }
    useEffect(() => {
        fetchConsentsSharedByDoc();
        fetchConsentsSharedToDoc();
    }, []);
    const viewPatientHealthRecord = (consentMessage, patientID, artifactID, delegationID) => {
        navigate("/doctor/getRecords", {
            state: {
                patientID: patientID,
                consentMessage: consentMessage,
                artifactId: artifactID,
                doctorId: UPRNID,
                delegationID: delegationID
            }
        })
    }
    const [consentId, setConsentId] = useState("");
    const openModal = (id) => {
        setShow(true)
        setConsentId(id);
    }
    const revokeConsent = () => {
        fetch("http://localhost:9100/doctor/update-delegation-status?id=" + consentId, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            },
            method:'PUT',
            body: JSON.stringify({
                fromDocID : AESUtils.encrypt(UPRNID),
                isDelegated: false
            })
        }).then((response) => response.json())
        .then((data) => {
            setShow(false);
            setConsentsSharedByDoc(data.object)
        })
    }
    return (
        <div>
            <Sidebar />
            <div className="w-[70%] h-[100%] ml-[20%] mt-[7%]">
                <p className="text-[28px] mb-[2%] text-black font-semibold text-center">Shared Consents</p>
                <div className='text-black text-[18px] ml-[16%] font-semibold'> 
                    Consents shared by you
                </div>
                {
                    consentsSharedByDoc && consentsSharedByDoc.length > 0 && consentsSharedByDoc.map((element) => {
                        return (
                            <div className='card w-[70%] p-3 mt-[2%] ml-[16%]'>
                                <p className='text-black text-[18px]'>Shared Consent</p>
                                <div className='mt-[1%]'>
                                    <p>Patient ID: {AESUtils.decrypt(element.patientID)}</p>
                                    <p>Record Type: {AESUtils.decrypt(element.recordType)}</p>
                                    <p>Consent Duration: {new Date(element.fromDate).toDateString()} {"-"} {new Date(element.toDate).toDateString()}</p>
                                </div>
                                <Button disabled={!element.isDelegated} variant='danger' className='w-[20%] mt-[1%]' onClick={() => openModal(element.id)}>Revoke</Button>
                                {!element.isDelegated && <p className='mt-[2%] text-black'>
                                    <img src="/rotate.png" width="16px" className='inline mr-[1%] text-[red]'></img>
                                    Consent Revoked
                                </p>}
                            </div>
                        )
                    })
                    
                } 
                <div className='text-black text-[18px] ml-[16%] font-semibold mt-[2%]'> 
                    Consents shared to you
                </div>
                {
                    consentsSharedToDoc && consentsSharedToDoc.length > 0 && consentsSharedToDoc.map((element) => {
                        return (
                            <div className='card w-[70%] p-3 mt-[2%] ml-[16%]'>
                                <p className='text-black text-[18px]'>Shared Consent</p>
                                <div className='mt-[1%]'>
                                    <p>Patient ID: {AESUtils.decrypt(element.patientID)}</p>
                                    <p>Record Type: {AESUtils.decrypt(element.recordType)}</p>
                                    <p>Consent Duration: {new Date(element.fromDate).toDateString()} {"-"} {new Date(element.toDate).toDateString()}</p>
                                </div>
                                <Button disabled={!element.isDelegated} variant='success' className='w-[20%] mt-[1%]' onClick={() => viewPatientHealthRecord(element.recordType, element.patientID, element.consentItemID.artifactID, element.id)}>View Health Record</Button>
                                {!element.isDelegated && <p className='mt-[2%] text-black'>
                                    <img src="/rotate.png" width="16px" className='inline mr-[1%] text-[red]'></img>
                                    Consent Revoked
                                </p>}
                            </div>
                        );
                    })
                    
                }
                <Modal show={show}>
                    <Modal.Header closeButton onClick={() => setShow(false)} className='text-[16px] text-black'>Revoke Consent</Modal.Header>
                    <Modal.Body className='text-black'>
                        Are you sure you want to revoke this consent?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={() => setShow(false)}>No</Button>
                        <Button variant='success' onClick={() => revokeConsent()}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default SharedConsent;