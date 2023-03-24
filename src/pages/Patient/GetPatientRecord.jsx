import React from 'react'
import { SidebarPatient } from "../../components";

function GetPatientRecord() {
  return (
    <div>
      <div className="flex justify-start ">
        <SidebarPatient />
      </div>
      <div>GetPatientRecord</div>
    </div>
  )
}

export default GetPatientRecord