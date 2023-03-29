import React from "react";
import { Accordion } from "react-bootstrap";
import { AccordionItem, SidebarPatient } from "../../components";
import { useState, useEffect } from "react";

function PendingConsentRequest() {

  const [consentRequests, setConsentRequests] = useState([
    { consentHeading: "MRI" },
  ]);

  const getConsentRequests = () => {
    fetch("http://localhost:9100/patient/getAllConsents?id=1", {
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
    getConsentRequests();
  }, [])
  return (
    <>
      <div className="flex justify-start ">
        <SidebarPatient />
      </div>
      <div
        className="cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg ml-[38%] mt-[6%] mr-[38%]"
        onClick={() => getConsentRequests()}
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
          {consentRequests.map((element, index) => {
            return <AccordionItem
              key={index}
              consentHeading={element.consentMessage}
              consentID={element.id}
              patientID={element.patientID}
              eventKey={index}
              consentAcknowledged={element.consentAcknowledged}
              setConsentRequests={setConsentRequests}
              doctorID={element.doctorID}
              hospitalID={element.hospitalId}
              fromDate={new Date(element.fromDate).toDateString()}
              toDate={new Date(element.toDate).toDateString()}
            />;
          })}
        </Accordion>
      </div>
    </>
  );
}

export default PendingConsentRequest;
