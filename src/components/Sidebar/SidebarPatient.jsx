import React from "react";
import { SidebarItem } from "../index";
import { constants } from "../../constants";
import { useNavigate } from "react-router-dom";

function SidebarPatient() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e);
  };

  return (
    <div className="sidebar bg-black text-white max-w-full h-[100vh] max-h-full fixed top-[70px]">
      <button onClick={() => handleClick("/patient/PatientPendingCR")}>
        <SidebarItem
          imgName={constants.REACT_APP_SIDEBAR_LENS_IMG}
          alt={constants.REACT_APP_SIDEBAR_LENS_IMG}
          sidebarText={constants.REACT_APP_SIDEBAR_PENDING_CONSENT_REQUEST}
        />
      </button>

      <div className="sidebar-divider" />

      <button onClick={() => handleClick("/patient/PatientOngoingCR")}>
        <SidebarItem
          imgName={constants.REACT_APP_SIDEBAR_SEND_IMG}
          alt={constants.REACT_APP_SIDEBAR_SEND_IMG}
          sidebarText={constants.REACT_APP_SIDEBAR_PATIENT_ONGOING_CONSENT}
        />
      </button>

      <div className="sidebar-divider" />

      <button onClick={() => handleClick("/patient/PatientPastCR")}>
        <SidebarItem
          imgName={constants.REACT_APP_SIDEBAR_HISTORY_IMG}
          alt={constants.REACT_APP_SIDEBAR_HISTORY_IMG}
          sidebarText={constants.REACT_APP_SIDEBAR_PAST_CONSENT_REQUEST}
        />
      </button>

      <div className="sidebar-divider" />

      <button onClick={() => handleClick("/patient/getMyRecord")}>
        <SidebarItem
          imgName={constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG}
          alt={constants.REACT_APP_SIDEBAR_VIEW_DATA_IMG}
          sidebarText={constants.REACT_APP_SIDEBAR_GET_MY_RECORDS}
        />
      </button>

    </div>
  );
}

export default SidebarPatient;
