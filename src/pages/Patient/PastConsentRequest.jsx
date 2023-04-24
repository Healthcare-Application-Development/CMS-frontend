import React, { useEffect, useState } from "react";
import { AccordionItem, SidebarPatient } from "../../components";
import { Accordion } from "react-bootstrap";
import AESUtils from "../../encryption/AESUtils";

function PastConsentRequest() {
  var ABHAID = ""
  var guard_id=""
  const user = localStorage.getItem("user");
  if (user) {
    ABHAID = JSON.parse(user).id
    guard_id = JSON.parse(user).guardianID;
  }
  const [consentArtifacts, setConsentArtifacts] = useState([
    { consentHeading: "No requests" },
  ]);

  const getConsentArtifacts = () => {
    if(guard_id !== null){
      ABHAID = guard_id;
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
          Past Consent Requests
        </p>
      </div>
      <div>
      <div className="mx-[32%]  mt-[1%]">
        <Accordion>
          {(consentArtifacts["object"]===undefined)?null:consentArtifacts["object"].filter((element) => !element.ongoing || element.revoked).map((element, index) => {
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
              ongoing={false}
              isDelegated={element.isDelegated}
              revoked={element.revoked}
            />;
          })}
        </Accordion>
      </div>
      </div>
    </div>
  );
}

export default PastConsentRequest;
