import React from 'react'
import {SidebarItem} from '../index';
import { constants } from '../../constants';

function SidebarPatient(props) {
    return (
        <div className='sidebar bg-black text-white max-w-full h-[100vh] max-h-full' onClick={props.onClickFunction}>
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_LENS_IMG} alt={constants.REACT_APP_SIDEBAR_LENS_IMG} sidebarText={constants.REACT_APP_SIDEBAR_PENDING_CONSENT_REQUEST} />
          <div className='sidebar-divider' />

          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SEND_IMG} alt={constants.REACT_APP_SIDEBAR_SEND_IMG} sidebarText={constants.REACT_APP_SIDEBAR_PATIENT_ONGOING_CONSENT} />
          <div className='sidebar-divider' />
          
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_HISTORY_IMG} alt={constants.REACT_APP_SIDEBAR_HISTORY_IMG} sidebarText={constants.REACT_APP_SIDEBAR_PAST_CONSENT_REQUEST} />
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} alt={constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} sidebarText={constants.REACT_APP_SIDEBAR_GET_MY_RECORDS} />
          {/* <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SHARED_CONSENT_IMG} alt={constants.REACT_APP_SIDEBAR_SHARED_CONSENT_IMG} sidebarText={constants.REACT_APP_SIDEBAR_SHARED_CONSENTS} /> */}
          <div className='sidebar-divider' />
          
          {/* <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_RECENT_CONSENTS_IMG} alt={constants.REACT_APP_SIDEBAR_RECENT_CONSENTS_IMG} sidebarText={constants.REACT_APP_SIDEBAR_RECENT_CONSENTS} /> */}
          <div className='sidebar-divider' />

          <div className='sidebar-emergency-style'>
            <button className='sidebar-emergency-button'>
                <img src={`/${constants.REACT_APP_SIDEBAR_WARNING_IMG}.png`} className='sidebar-emergency-image' alt={constants.REACT_APP_SIDEBAR_WARNING_IMG} />
                <span className='sidebar-emergency-text'>{constants.REACT_APP_SIDEBAR_EMERGENCY_BUTTON_TEXT}</span>
            </button>
          </div>
        </div> 
    )
}

export default SidebarPatient;