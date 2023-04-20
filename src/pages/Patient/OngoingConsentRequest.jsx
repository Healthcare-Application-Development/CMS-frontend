import React, { useEffect, useState } from "react";
import { AccordionItem, SidebarPatient } from "../../components";
import { Accordion } from "react-bootstrap";
import AESUtils from "../../encryption/AESUtils";

function OngoingConsentRequest() {
  var ABHAID = ""
  const user = localStorage.getItem("user");
  if (user) {
    ABHAID = JSON.parse(user).id
  }
  const [consentArtifacts, setConsentArtifacts] = useState([
    { consentHeading: "No requests" },
  ]);

  const getConsentArtifacts = () => {
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
          Ongoing Consent Requests
        </p>
      </div>
      <div>
      <div className="mx-[32%]  mt-[1%]">
        <Accordion>
          {(consentArtifacts["object"]===undefined)?null:consentArtifacts["object"].filter((element) => element.ongoing && element.consentAcknowledged && !element.revoked).map((element, index) => {
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
              ongoing={true}
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

export default OngoingConsentRequest;
