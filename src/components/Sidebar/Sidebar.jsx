import React from 'react'
import {SidebarItem} from '../index';
import { constants } from '../../constants';

function Sidebar() {
    return (
        <div className='sidebar bg-black text-white max-w-full h-[100vh] max-h-full'>
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_LENS_IMG} alt={constants.REACT_APP_SIDEBAR_LENS_IMG} sidebarText={constants.REACT_APP_SIDEBAR_SEARCH_PATIENT_DATA} />
          <div className='sidebar-divider' />

          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SEND_IMG} alt={constants.REACT_APP_SIDEBAR_SEND_IMG} sidebarText={constants.REACT_APP_SIDEBAR_REQUEST_CONSENT} />
          <div className='sidebar-divider' />
          
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_HISTORY_IMG} alt={constants.REACT_APP_SIDEBAR_HISTORY_IMG} sidebarText={constants.REACT_APP_SIDEBAR_HISTORY} />
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} alt={constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG} sidebarText={constants.REACT_APP_SIDEBAR_VIEW_DATA} />
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_SHARED_CONSENT_IMG} alt={constants.REACT_APP_SIDEBAR_SHARED_CONSENT_IMG} sidebarText={constants.REACT_APP_SIDEBAR_SHARED_CONSENTS} />
          <div className='sidebar-divider' />
          
          <SidebarItem imgName = {constants.REACT_APP_SIDEBAR_RECENT_CONSENTS_IMG} alt={constants.REACT_APP_SIDEBAR_RECENT_CONSENTS_IMG} sidebarText={constants.REACT_APP_SIDEBAR_RECENT_CONSENTS} />
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

export default Sidebar;