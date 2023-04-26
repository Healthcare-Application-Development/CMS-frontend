import React, { useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import AESUtils from "../../encryption/AESUtils";
import { Notification, useToaster } from "rsuite";

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
  patientId,
  revoked
}) {
  const toaster = useToaster();
  const revokeItemMessage = (
    <Notification type="error" header="Revoked" closable>
      <div className='w-[320px] font-semibold' style={{width: '320px'}}>
        Item Revoked
      </div>
    </Notification>
  );
  const revokeConsentMessage = (
    <Notification type="error" header="Revoked" closable>
      <div className='w-[320px] font-semibold' style={{width: '320px'}}>
        Consent Revoked
      </div>
    </Notification>
  );
  const consentApprovedMessage = (
    <Notification type="success" header="success" closable>
      <div className='w-[320px] font-semibold' style={{width: '320px'}}>
        Consent Approved
      </div>
    </Notification>
  );
  const consentRejectedMessage = (
    <Notification type="error" header="Rejected" closable>
      <div className='w-[320px] font-semibold' style={{width: '320px'}}>
        Consent Rejected
      </div>
    </Notification>
  );
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
          patientId: AESUtils.encrypt(patientId),
          ongoing: items[i].ongoing,
          isDelegated: items[i].isDelegated
        }),
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
        if (requestBody.approved) {
          toaster.push(consentApprovedMessage, { placement: 'topEnd' });
        }
        else {
          toaster.push(consentRejectedMessage, { placement: 'topEnd' });
        }
      });
  };
  const updateItems = (e, id) => {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        items[i].approved = e.target.checked;
        items[i].ongoing = e.target.checked;
        items[i].isDelegated = e.target.checked && items[i].delegationRequired;
      }
    }
  }
  const revokeItem = (id) => {
    fetch("http://localhost:9100/patient/consent-item/revoke", {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: id
      }),
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      setConsentArtifacts(data);
      setItemShow(false)
      toaster.push(revokeItemMessage, { placement: 'topEnd' })
    })
  }
  const revokeConsent = (artifactId) => {
    fetch("http://localhost:9100/patient/consent-artifacts/revoke", {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: artifactId
      }),
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      setConsentArtifacts(data);
      setShow(false)
      toaster.push(revokeConsentMessage, { placement: 'topEnd' })
    })
  }
  const [show, setShow] = useState(false);
  const [itemShow, setItemShow] = useState(false);
  const [consentID, setConsentID] = useState("");
  const openRevokeItemModal = (cID) => {
    setItemShow(true);
    setConsentID(cID);
  }
  return (
    <div>
      <div className="mt-[2%] card p-4 border-none shadow-md mb-[3%]">
        <div className="text-[20px] font-black mb-[2%] text-black">Artifact ID: {artifactId}</div>
        <div className="font-semibold">
          <p>Doctor ID : {AESUtils.decrypt(doctorID)}</p>
          <p>Date of Request : {new Date(timestamp).toDateString()}</p>
          <p className="mb-[1%]">Emergency : {emergency ? "Yes" : "No"}</p>
        </div>
        {/* <ul style={}> */}
          {consentItems && consentItems.length > 0 && Array.isArray(consentItems) && consentItems.map((consent) => (
            <div key={consent.id} className="bg-[#444444] p-3 rounded-[20px] text-white opacity-70 mt-1 mb-1 font-bold">
                <input type="checkbox" className="inline" value={consent.id} onClick={(e) => updateItems(e, consent.id)} disabled={consent.consentAcknowledged} checked={!consent.consentAcknowledged ? null : consent.approved}/>
                <span className="ml-[1.5%]">{AESUtils.decrypt(consent.consentMessage)}</span>
                {/* <p>
                      Acknowledged: {consent.consentAcknowledged ? "Yes" : "No"}
                      </p>
                    <p>Approved: {consent.approved ? "Yes" : "No"}</p> */}
                <p>
                  {new Date(consent.fromDate).toDateString()} -{" "}
                  {new Date(consent.toDate).toDateString()}
                </p>
                <p className="mb-[1%] mt-[1%] font-semibold">Does doctor want to delegate the request to other doctors? {consent.delegationRequired ? "Yes" : "No"}</p>
                {consent.consentAcknowledged && consent.ongoing && consent.approved && <Button variant="light" disabled={consent.revoked} className="py-1 px-2" onClick={() => openRevokeItemModal(consent.id)}>
                  <span className="text-[13px] font-semibold">Revoke</span>
                </Button>}   
                {consent.revoked && 
                <div className="mt-[1.5%]">
                    <img src="/rotate_white.png" width="16px" className="inline mr-[1%]"/>
                    <span className="text-[13px] pt-[1%]">This item is revoked</span>
                </div>}
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
                          patientId: AESUtils.encrypt(patientId)
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
                          patientId: AESUtils.encrypt(patientId)
                        };
                        return updateStatusOfConsent(obj)}}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              )}
              {consentAcknowledged &&
               approved && !revoked &&
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
                {
                  revoked &&  <p className="font-bold mt-[2%]">
                  <img src="/rotate.png" width="16px" className="inline"></img>
                  <span className="ml-[2%]">Consent Revoked</span>
                 </p>
                }
              <Modal show={show}>
                  <Modal.Header closeButton onClick={() => setShow(false)} className="text-[20px] text-black">Confirmation</Modal.Header>
                  <Modal.Body className="text-[16px] text-black">
                      Are you sure you want to revoke this consent?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>No</Button>
                    <Button variant="success" onClick={() => revokeConsent(artifactId)}>Yes</Button>
                  </Modal.Footer>
              </Modal>
              <Modal show={itemShow}>
                  <Modal.Header closeButton onClick={() => setItemShow(false)} className="text-[20px] text-black">Confirmation</Modal.Header>
                  <Modal.Body className="text-[16px] text-black">
                      Are you sure you want to revoke this item?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={() => setItemShow(false)}>No</Button>
                    <Button variant="success" onClick={() => revokeItem(consentID)}>Yes</Button>
                  </Modal.Footer>
              </Modal>
      </div>
    </div>
  );
}

export default AccordionItem;
