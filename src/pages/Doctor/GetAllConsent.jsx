import React, { useEffect,useState } from "react";
import { Table } from "react-bootstrap";
import { Sidebar } from "../../components";

function getAllConsent() {
    
  const [doctorConsentList, setDoctorConsentList] = useState([]);
  const UPRNID = "1";

  const getAllConsents = () => {
    fetch("http://localhost:9100/doctor/getAllConsents?id=" + UPRNID)
      .then((data) => data.json())
      .then((response) => {
        setDoctorConsentList(response);
      });
  };
  useEffect(() => {
    getAllConsents();
  }, []);
  return (

    <div className="flex items-center justify-start">
    <Sidebar />
    <div className="w-[85%] h-[100%] ">
    <div>
      <div className="bg-slate-200 rounded-sm ">
        <div
          className="cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg"
          onClick={() => getAllConsents()}
        >
          Refresh
        </div>
        <p>currentRequest</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Consent ID</th>
              <th>Patient ID</th>
              <th>Consent Message</th>
              <th>Consent Acknowledged</th>
              <th>Consent Approved</th>
              <th>Consent From</th>
              <th>Consent To</th>
            </tr>
          </thead>
          <tbody>
            {doctorConsentList &&
              doctorConsentList.length > 0 &&
              doctorConsentList.map((element) => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.patientID}</td>
                    <td>{element.consentMessage}</td>
                    <td>{element.consentAcknowledged ? "Yes" : "No"}</td>
                    <td>{element.approved ? "Yes" : "No"}</td>
                    <td>{new Date(element.fromDate).toDateString()}</td>
                    <td>{new Date(element.toDate).toDateString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
    </div>
  </div>
  );
}

export default getAllConsent;
