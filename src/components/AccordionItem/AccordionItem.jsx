import React from 'react';
import { Accordion } from 'react-bootstrap';

function AccordionItem({consentHeading, eventKey, consentID, patientID, setConsentRequests, consentAcknowledged, hospitalID, doctorID, fromDate, toDate}) {
    fromDate = new Date(fromDate).toDateString();
    toDate = new Date(toDate).toDateString();
    const updateStatusOfConsent = (approved) => {
        const requestBody = {
            "consentAcknowledged" : true,
            "approved": approved,
            "patientId": patientID
        }
        fetch("http://localhost:9100/patient/updateConsentStatus/" + consentID, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(data => data.json())
        .then((response) => {
            setConsentRequests(response);
        })
    }
    return (
        <div>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>{consentHeading}</Accordion.Header>
                <Accordion.Body>
                    <p>Hospital ID : {hospitalID}</p>
                    <p>Doctor ID : {doctorID}</p>
                    <p>From Date : {fromDate}</p>
                    <p>To Date : {toDate}</p>
                {
                    !consentAcknowledged && <div>
                        <div className='flex flex-row justify-between'>
                            <button className='bg-[green] text-white p-[2%] text-center' onClick={() => updateStatusOfConsent(true)}>
                                Approve
                            </button>
                            <button type="button" className='bg-[red] text-white p-[3%] text-center' onClick={() => updateStatusOfConsent(false)}>
                                Reject
                            </button>
                        </div>
                    </div>
                }
                {consentAcknowledged && 
                <p>Consent already acknowledged</p>}
                    
                </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default AccordionItem;