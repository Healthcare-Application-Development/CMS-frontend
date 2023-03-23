import React from 'react'
import {SidebarItem} from '../index';
import { constants } from '../../constants';
// import { useState } from "react";
import { Patient } from '../../pages';
import {useState} from "react";

function SidebarPatient(props) {

  const [selectedDivision, setSelectedDivision] = useState(null);


const handleClick = (e) => {
  props.onData(e);
  console.log(e);
};

  // function setState(e) {
  //   // e.preventDefault();
  //   setSelectedDivision(e);
  //   console.log(selectedDivision);
  
  
  // }
    return (
        <div className='sidebar bg-black text-white max-w-full h-[100vh] max-h-full fixed top-[70px]'>
          <button onClick={() => handleClick("div1")} >
          {/* <button onClick={() => setSelectedDivision("div1")} > */}
            <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_LENS_IMG} alt={constants.REACT_APP_SIDEBAR_LENS_IMG} sidebarText={constants.REACT_APP_SIDEBAR_PENDING_CONSENT_REQUEST}  />
          </button>

          <div className='sidebar-divider' />

          <button onClick={() => handleClick("div2")} >
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SEND_IMG} alt={constants.REACT_APP_SIDEBAR_SEND_IMG} sidebarText={constants.REACT_APP_SIDEBAR_PATIENT_ONGOING_CONSENT} />
          </button>


          <div className='sidebar-divider' />
          
          <button onClick={() => handleClick("div3")} >
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_HISTORY_IMG} alt={constants.REACT_APP_SIDEBAR_HISTORY_IMG} sidebarText={constants.REACT_APP_SIDEBAR_PAST_CONSENT_REQUEST} />
          </button>


          <div className='sidebar-divider' />


          <button onClick={() => handleClick("div4")} >
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} alt={constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} sidebarText={constants.REACT_APP_SIDEBAR_GET_MY_RECORDS} />
    
          </button>
          
          <div className='sidebar-divider' />
        </div> 
    )
}

export default SidebarPatient;