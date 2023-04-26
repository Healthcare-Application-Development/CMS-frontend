import React from "react";
import { Accordion } from "react-bootstrap";
import { AccordionItem, SidebarPatient } from "../../components";
import { useState, useEffect } from "react";
import AESUtils from "../../encryption/AESUtils";



function PendingConsentRequest() {
  var ABHAID = ""
  var guard_id=""
  const user = localStorage.getItem("user");
  if (user) {
    ABHAID = JSON.parse(user).id;
    guard_id = JSON.parse(user).guardianID;
  }
  const [consentArtifacts, setConsentArtifacts] = useState([
    { consentHeading: "No requests" },
  ]);

  const getConsentArtifacts = () => {
    if(guard_id !== null){
      ABHAID = guard_id;
      localStorage.setItem("ABHAID", ABHAID);
    }
    fetch("http://localhost:9100/patient/getAllConsents?id=" + encodeURIComponent(AESUtils.encrypt(ABHAID)), {
      headers: {
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      },
    })
      .then((data) => data.json())
      .then((response) => {
        setConsentArtifacts(response);
      });
  };
  useEffect(() => {
    getConsentArtifacts();
  }, [])
  return (
    <div>
      <div className="flex justify-start ">
        <SidebarPatient />
      </div>
      <div
        className="cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg ml-[32%] mt-[6%] mr-[38%] inline-block"
        onClick={() => getConsentArtifacts()}
      >
        Refresh
      </div>
      <div className="flex w-630 h-54 ml-[32%]">
        <p className="font-poppins font-semibold font-regular text-2xl leading-26 tracking-tighter text-black">
          Pending Consent Requests
        </p>
      </div>
      <div className="mx-[32%] mt-[1%]">
        <Accordion>
          {(consentArtifacts["object"]===undefined)?null: Array.isArray(consentArtifacts["object"]) && consentArtifacts["object"].filter((element) => !element.consentAcknowledged).map((element, index) => {
            return <AccordionItem
              key={index}
              artifactId={element.artifactId}
              consentItems={element.consentItems}
              setConsentArtifacts={setConsentArtifacts}
              doctorID={element.doctorID}
              emergency={element.emergency}
              timestamp={element.timestamp} 
              items={element.consentItems}
              approved={element.approved} 
              consentAcknowledged={element.consentAcknowledged}
              patientId={localStorage.getItem("ABHAID") === null ? ABHAID : localStorage.getItem("ABHAID")}
              isDelegated={element.isDelegated}
              revoked={element.revoked}
            />;
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default PendingConsentRequest;

