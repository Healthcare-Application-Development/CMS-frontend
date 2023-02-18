import React from 'react'
import { SidebarPatient } from "../components";

import { useState } from "react";
import { Accordion } from 'react-bootstrap';

function Patient(props) {

  // const [selectedDivision, setSelectedDivision] = useState(null);
  const [dataFromChild, setDataFromChild] = useState(null);

  function PendingConsentRequest(props) {
    const [isOpen, setIsOpen] = useState(false);
    function toggleCollapsible() {
      setIsOpen(!isOpen);
    }
    return (
    
      <div>
        <div>
        <div class="flex absolute w-630 h-54 left-303 top-15">
  <p class="font-poppins font-normal font-regular text-3xl leading-26 tracking-tighter text-black">Pending Consent Request</p>
</div>
        
</div>
 <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Consent request #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Consent request #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      
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
    <div className="flex items-center justify-start">
      <SidebarPatient onData={handleDataFromChild} />
      {/* {dataFromChild== "div1" && <endingConsentRequest/>}
      {dataFromChild=="div2" && <ongoingConsentRequest/>}      
      {dataFromChild=="div3" && <pastConsentRequest/>}
      {dataFromChild=="div4" && <getMyRecord/>} */}
      <div>{ project() }</div>
    </div>
    

  );
}


export default  Patient ;