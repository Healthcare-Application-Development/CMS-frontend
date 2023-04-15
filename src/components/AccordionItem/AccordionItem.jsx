import React, { useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";

function AccordionItem({
  artifactId,
  consentItems,
  doctorID,
  timestamp,
  emergency,
  setConsentArtifacts,
  approved,
  consentAcknowledged,
  items,
  ongoing,
  patientId
}) {
  const updateStatusOfConsent = (requestBody) => {
    for (var i = 0; i < items.length; i++) {
      fetch("http://localhost:9100/patient/updateConsentItemStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization' : 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({
          itemId: items[i].id,
          consentAcknowledged: true,
          approved: items[i].approved,
          patientId: patientId
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          setConsentArtifacts(response);
        });
    }

    fetch("http://localhost:9100/patient/updateConsentStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify(requestBody),
    })
      .then((data) => data.json())
      .then((response) => {
        setConsentArtifacts(response);
      });
  };
  const updateItems = (e, id) => {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        items[i].approved = e.target.checked;
      }
    }
  }
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="mt-[2%] card p-4 border-none shadow-md mb-[3%]">
        <div className="text-[20px] font-black mb-[2%] text-black">Artifact ID: {artifactId}</div>
        <div className="font-semibold">
          <p>Doctor ID : {doctorID}</p>
          <p>Date of Request : {new Date(timestamp).toDateString()}</p>
          <p className="mb-[2%]">Emergency : {emergency ? "Yes" : "No"}</p>
        </div>
        {/* <ul style={}> */}
          {consentItems && consentItems.length > 0 && consentItems.map((consent) => (
              <div key={consent.id} className="bg-[#444444] p-3 rounded-[20px] text-white opacity-70 mt-1 mb-1 font-bold">
                <input type="checkbox" className="inline" value={consent.id} onClick={(e) => updateItems(e, consent.id)} disabled={consent.consentAcknowledged} checked={!consent.consentAcknowledged ? null : consent.approved}/>
                <span className="ml-[1.5%]">{consent.consentMessage}</span>
                {/* <p>
                      Acknowledged: {consent.consentAcknowledged ? "Yes" : "No"}
                    </p>
                    <p>Approved: {consent.approved ? "Yes" : "No"}</p> */}
                <p>
                  {new Date(consent.fromDate).toDateString()} -{" "}
                  {new Date(consent.toDate).toDateString()}
                </p>
              </div>
          ))}
        {/* </ul> */}
        {!consentAcknowledged && (
                <div className="mt-[3%]">
                  <div className="flex flex-row justify-between">
                    <Button
                      variant="success"
                      className="bg-[green] text-white p-[2%] text-center"
                      onClick={() => {
                        const obj = {
                          itemId: artifactId,
                          consentAcknowledged: true,
                          approved: true,
                          ongoing: true,
                          patientId: patientId
                        };
                        return updateStatusOfConsent(obj);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      // type="button"
                      variant="danger"
                      className="bg-[red] text-white p-[3%] text-center"
                      onClick={() => {
                        const obj = {
                          itemId: artifactId,
                          consentAcknowledged: true,
                          approved: false,
                          ongoing: false,
                          patientId: patientId
                        };
                        return updateStatusOfConsent(obj)}}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              )}
              {consentAcknowledged &&
               approved && 
               <p className="font-bold mt-[2%]">
                <img src="/tick.png" width="16px" className="inline"></img>
                <span className="ml-[2%] text-[green]">Consent Approved</span>
               </p>}
              {consentAcknowledged &&
               !approved && 
               <p className="font-bold mt-[2%]">
                <img src="/cross.png" width="16px" className="inline"></img>
                <span className="ml-[2%] text-[red]">Consent Rejected</span>
                </p>}
              {consentAcknowledged &&
               approved && ongoing &&
               <div className="text-center">
                 <Button variant="danger" className="w-[25%] mt-[3%] text-center" onClick={() => setShow(true)}>Revoke</Button>
                </div>}
              <Modal show={show}>
                  <Modal.Header closeButton onClick={() => setShow(false)} className="text-[20px] text-black">Confirmation</Modal.Header>
                  <Modal.Body className="text-[16px] text-black">
                      Are you sure you want to revoke this consent?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>No</Button>
                    <Button variant="success" onClick={() => console.log(artifactId)}>Yes</Button>
                  </Modal.Footer>
              </Modal>
      </div>
    </div>
  );
}

export default AccordionItem;
