import React, { useEffect,useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Sidebar } from "../../components";

function getAllConsent() {
    
  const [doctorConsentList, setDoctorConsentList] = useState([]);
  var UPRNID = "1";
  const user = localStorage.getItem("user");
  if (user) {
    UPRNID = JSON.parse(user).id
  }
  const getAllConsents = () => {
    fetch("http://localhost:9100/doctor/getAllConsents?id=" + UPRNID, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then((data) => data.json())
      .then((response) => {
        setDoctorConsentList(response.object);
      });
  };
  useEffect(() => {
    getAllConsents();
  }, []);
  return (
  <div className="flex items-center justify-start">
    <Sidebar />
    <div className="w-[70%] h-[100%] ml-[20%] mt-[7%]">
    <p className="text-[28px] mb-[2%] text-black font-semibold text-center">History</p>
      <div className="flex justify-center">
        <div className="card shadow-md pt-[5%] pb-[5%] text-center mt-[1%] mb-[2%] w-[15%] mr-[2.5%] ml-[2%] font-semibold">
          <p className="text-[18px] text-black">Requests Made:</p>
          <p className="text-[16px] text-black">{doctorConsentList.length}</p>
        </div>
        <div className="card pt-[5%] pb-[5%] text-center shadow-md mt-[1%] mb-[2%] w-[15%] ml-[2.5%] mr-[2.5%] font-semibold">
          <p className="text-[18px] text-[green]">Approved Requests:</p>
          <p className="text-[16px] text-[green]">{doctorConsentList.filter((e) => e.consentAcknowledged && e.approved).length}</p>
        </div>
        <div className="card pt-[5%] pb-[5%] text-center shadow-md mt-[1%] mb-[2%] w-[15%] ml-[2.5%] mr-[2.5%] font-semibold">
          <p className="text-[18px] text-[red]">Rejected Requests:</p>
          <p className="text-[16px] text-[red]">{doctorConsentList.filter((e) => e.consentAcknowledged && !e.approved).length}</p>
        </div>
        <div className="card pt-[5%] pb-[5%] text-center shadow-md mt-[1%] mb-[2%] w-[15%] ml-[2.5%] mr-[2.5%] font-semibold">
          <p className="text-[18px] text-black">Pending Requests:</p>
          <p className="text-[16px] text-black">{doctorConsentList.filter((e) => !e.consentAcknowledged).length}</p>
        </div>
      </div>
      <div className="mt-[2%]">
        <div className="rounded-sm ">
          <Table bordered striped hover>
            <thead>
              <tr>
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
