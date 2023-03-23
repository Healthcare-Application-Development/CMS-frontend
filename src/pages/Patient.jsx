import React, { useEffect } from 'react'
import { AccordionItem, Header, SidebarPatient } from "../components";

import { useState } from "react";
import { Accordion } from 'react-bootstrap';

function Patient(props) {
  const [dataFromChild, setDataFromChild] = useState(null);
  
  const [consentRequests, setConsentRequests] = useState([]);
  const getConsentRequests = () => {
    fetch("http://localhost:9100/patient/getAllConsents?id=1", {
      headers: {
        "Content-Type" : "application/json"
      }
    }).then((data) => data.json())
    .then((response) => {
      if (response !== null)
        setConsentRequests(response);
      else 
        setConsentRequests([]);
    }).catch((err) => {
      setConsentRequests([]);
    }) 
  }
  useEffect(() => {
    getConsentRequests();
  },[])
  function PendingConsentRequest(props) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleCollapsible() {
      setIsOpen(!isOpen);
    }

    var consentRequestsItems = consentRequests && consentRequests.length > 0 && consentRequests.map((element, index) => {
      return <AccordionItem consentHeading={element.consentMessage} consentID={element.id} patientID={element.patientID} eventKey={index} consentAcknowledged={element.consentAcknowledged} setConsentRequests={setConsentRequests} doctorID={element.doctorID} hospitalID={element.hospitalId} fromDate={element.fromDate} toDate={element.toDate}/>
    })
    
    return (
    
      <div>
          <div className='cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg' onClick={() => getConsentRequests()}>Refresh</div>
          <div class="flex w-630 h-54">
              <p class="font-poppins font-normal font-regular text-3xl leading-26 tracking-tighter text-black">Pending Consent Request</p>
          </div>
        <div>
        <Accordion>
          {
            consentRequestsItems
          }
        </Accordion>
        </div>
      </div>
    );
  
    }




    function OngoingConsentRequest(props) {

      return (
        <div>
          
          Ongoing Consent Request

        </div>
      );
      }

      function PastConsentRequest(props) {

        return (
          <div>
 Past Consent Request
          </div>
        );
      
        }

        function GetMyRecord(props) {
 
          return (
<div class="flex absolute w-630 h-54 left-303 top-13">
  <p class="font-poppins font-normal font-regular text-3xl leading-26 tracking-tighter text-black">Lorem ipsum dolor sit amet</p>
</div>
          );
          }

    function handleClick(e) {
      // e.preventDefault();
      console.log(e);
      console.log("Back from parent",dataFromChild)
    
    }

    

    const handleDataFromChild = (data) => {
      setDataFromChild(data);
      console.log("Back from parent",dataFromChild)
    }
  
      const project = () => {
        switch(dataFromChild) {
  
          case "div1":   return <PendingConsentRequest/>;
          break;
          case "div2":   return <OngoingConsentRequest />;
          break;
          case "div3": return <PastConsentRequest />;
          break;
          case "div4":  return <GetMyRecord />;
          break;
  
          default:      return <h1>No project match</h1>
        }
      }
    

  return (
    <>
      <Header />
      <div className="flex justify-start ">
        <SidebarPatient onData={handleDataFromChild}/>
        {/* {dataFromChild== "div1" && <endingConsentRequest/>}
        {dataFromChild=="div2" && <ongoingConsentRequest/>}      
        {dataFromChild=="div3" && <pastConsentRequest/>}
        {dataFromChild=="div4" && <getMyRecord/>} */}
        <div className='ml-[45%] mt-[10%]'>{ project() }</div>
      </div>
    </>
    

  );
}


export default  Patient ;