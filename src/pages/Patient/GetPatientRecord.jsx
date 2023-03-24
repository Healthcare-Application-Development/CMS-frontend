import React from "react";
import { SidebarPatient } from "../../components";

function GetPatientRecord() {
  return (
    <div className="flex w-full">
      <SidebarPatient />
      <div className="w-[78%]">GetPatientRecord</div>
    </div>
  );
}

export default GetPatientRecord;
