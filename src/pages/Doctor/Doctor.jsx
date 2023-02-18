import React from "react";
import { Sidebar } from "../../components";
import { ReqestConsent } from "..";
function Doctor() {
  return (
    <div className="flex items-center justify-start">
      <Sidebar />
      <div className="w-[85%] h-[100vh] overflow-hidden">
        <ReqestConsent/>
      </div>
    </div>
  );
}

export default Doctor;
