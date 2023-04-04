import React from "react";
import { Accordion } from "react-bootstrap";
import { AccordionItem, SidebarPatient } from "../../components";
import { useState, useEffect } from "react";

function PendingConsentRequest() {

  const [consentArtifacts, setConsentArtifacts] = useState([
    { consentHeading: "No requests" },
  ]);

  const getConsentArtifacts = () => {
    fetch("http://localhost:9100/patient/getAllConsents/2", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        setConsentRequests(response.object);
      });
  };
  useEffect(() => {
    getConsentArtifacts();
  }, [])
  return (
    <>
      <div className="flex justify-start ">
        <SidebarPatient />
      </div>
      <div
        className="cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg ml-[38%] mt-[6%] mr-[38%]"
        onClick={() => getConsentArtifacts()}
      >
        Refresh
      </div>
      <div className="flex w-630 h-54 ml-[38%]">
        <p className="font-poppins font-normal font-regular text-3xl leading-26 tracking-tighter text-black">
          Pending Consent Request
        </p>
      </div>
      <div className="mx-[38%]">
        <Accordion>
          {(consentArtifacts["object"]===undefined)?null:consentArtifacts["object"].map((element, index) => {
            return <AccordionItem
              key={index}
              artifactId={element.artifactId}
              consentItems={element.consentItems}
              setConsentArtifacts={setConsentArtifacts}
              doctorID={element.doctorID}
              emergency={element.emergency}
              timestamp={element.timestamp} 
            />;
          })}
        </Accordion>
      </div>
    </>
  );
}

export default PendingConsentRequest;

