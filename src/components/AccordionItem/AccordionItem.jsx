import React from "react";
import { Accordion } from "react-bootstrap";

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
  ongoing
}) {
  const updateStatusOfConsent = (requestBody) => {
    for (var i = 0; i < items.length; i++) {
      fetch("http://localhost:9100/patient/updateConsentItemStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization' : 'Basic ' + localStorage.getItem("token")
        },
        body: JSON.stringify({
          itemId: items[i].id,
          consentAcknowledged: true,
          approved: items[i].approved,
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
        'Authorization' : 'Basic ' + localStorage.getItem("token")
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
  return (
    <div>
      <div>
        <h2>Artifact ID: {artifactId}</h2>
        <p>Doctor ID: {doctorID}</p>
        <p>Time of request: {new Date(timestamp).toDateString()}</p>
        <p>Emergency: {emergency ? "Yes" : "No"}</p>
        <h3>Consent Items:</h3>
        <ul>
          {consentItems.map((consent) => (
            <li key={consent.id}>
              <input type="checkbox" value={consent.id} onClick={(e) => updateItems(e, consent.id)} disabled={consent.consentAcknowledged} checked={!consent.consentAcknowledged ? null : consent.approved}/>
              <p>Message: {consent.consentMessage}</p>
              {/* <p>
                    Acknowledged: {consent.consentAcknowledged ? "Yes" : "No"}
                  </p>
                  <p>Approved: {consent.approved ? "Yes" : "No"}</p> */}
              <p>
                {new Date(consent.fromDate).toDateString()} -{" "}
                {new Date(consent.toDate).toDateString()}
              </p>

            </li>
          ))}
        </ul>
        {!consentAcknowledged && (
                <div>
                  <div className="flex flex-row justify-between">
                    <button
                      className="bg-[green] text-white p-[2%] text-center"
                      onClick={() => {
                        const obj = {
                          itemId: artifactId,
                          consentAcknowledged: true,
                          approved: true,
                          ongoing: true
                        };
                        return updateStatusOfConsent(obj);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="bg-[red] text-white p-[3%] text-center"
                      onClick={() => {
                        const obj = {
                          itemId: artifactId,
                          consentAcknowledged: true,
                          approved: false,
                          ongoing: false
                        };
                        return updateStatusOfConsent(obj)}}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
              {consentAcknowledged &&
               approved && 
               <p className="font-bold">Consent Approved</p>}
              {consentAcknowledged &&
               !approved && 
               <p className="font-bold">Consent Rejected</p>}
      </div>
    </div>
  );
}

export default AccordionItem;
