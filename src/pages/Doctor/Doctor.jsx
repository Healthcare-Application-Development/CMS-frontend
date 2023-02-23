import React from "react";
import { Sidebar } from "../../components";
import { ReqestConsent } from "..";
function Doctor() {
  return (
    <div className="flex items-center justify-start overflow-scroll">
      <Sidebar />
      <div className="w-[85%] h-[100vh] ">
        <ReqestConsent/>
      </div>
    </div>
  );
}

export default Doctor;
