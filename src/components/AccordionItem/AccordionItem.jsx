import React from "react";
import { Accordion } from "react-bootstrap";

function AccordionItem({
  artifactId,
  consentItems,
  doctorID,
  timestamp,
  emergency,
  setConsentArtifacts
}) {
  const updateStatusOfConsent = (requestBody) => {
    fetch("http://localhost:9100/patient/updateConsentStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((data) => data.json())
      .then((response) => {
        setConsentArtifacts(response);
      });
  };

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
              <p>Message: {consent.consentMessage}</p>
              {/* <p>
                    Acknowledged: {consent.consentAcknowledged ? "Yes" : "No"}
                  </p>
                  <p>Approved: {consent.approved ? "Yes" : "No"}</p> */}
              <p>
                {new Date(consent.fromDate).toDateString()} -{" "}
                {new Date(consent.toDate).toDateString()}
              </p>
              <p>Hospital ID: {consent.hospitalId}</p>
              {!consent.consentAcknowledged && (
                <div>
                  <div className="flex flex-row justify-between">
                    <button
                      className="bg-[green] text-white p-[2%] text-center"
                      onClick={() => {
                        const obj = {
                          itemId: consent.id,
                          consentAcknowledged: true,
                          approved: true,
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
                          itemId: consent.id,
                          consentAcknowledged: true,
                          approved: false,
                        };
                        return updateStatusOfConsent(obj)}}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
              {consent.consentAcknowledged && (
                <p>Consent already acknowledged</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AccordionItem;
