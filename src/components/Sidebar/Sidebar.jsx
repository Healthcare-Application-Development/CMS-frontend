import React from 'react'
import {SidebarItem} from '../index';
import { constants } from '../../constants';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className='sidebar bg-black text-white max-w-full h-[100%] max-h-full fixed w-[14%] top-[70px]'>
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_LENS_IMG} alt={constants.REACT_APP_SIDEBAR_LENS_IMG} sidebarText={constants.REACT_APP_SIDEBAR_SEARCH_PATIENT_DATA} />
          <div className='sidebar-divider' />

          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SEND_IMG} alt={constants.REACT_APP_SIDEBAR_SEND_IMG} sidebarText={constants.REACT_APP_SIDEBAR_REQUEST_CONSENT} onClick={() => navigate("/doctor/requestConsent")}/>
          <div className='sidebar-divider' />
          
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_HISTORY_IMG} alt={constants.REACT_APP_SIDEBAR_HISTORY_IMG} sidebarText={constants.REACT_APP_SIDEBAR_HISTORY} onClick={() => navigate("/doctor/getAllConsents")}/>
          {/* <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} alt={constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} sidebarText={constants.REACT_APP_SIDEBAR_VIEW_DATA} onClick={() => navigate("/doctor/getRecords")}/> */}
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SHARED_CONSENT_IMG} alt={constants.REACT_APP_SIDEBAR_SHARED_CONSENT_IMG} sidebarText={constants.REACT_APP_SIDEBAR_SHARED_CONSENTS} onClick={() => navigate("/doctor/sharedConsents")}/>
          <div className='sidebar-divider' />
          
          {/* <div className='sidebar-emergency-style'>
            <button className='sidebar-emergency-button bg-red-800 flex p-4 m-2 gap-3 items-center justify-center'>
                <img src={`/${constants.REACT_APP_SIDEBAR_WARNING_IMG}.png`} className='sidebar-emergency-image' alt={constants.REACT_APP_SIDEBAR_WARNING_IMG} />
                <span className='sidebar-emergency-text'>{constants.REACT_APP_SIDEBAR_EMERGENCY_BUTTON_TEXT}</span>
            </button>
          </div> */}
        </div>
    )
}

export default Sidebar;