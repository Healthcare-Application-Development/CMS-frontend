import React, {useEffect, useState} from "react";
import { Dropdown, SearchBar, Button } from "../../components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Table } from "react-bootstrap";

function RequestConsent() {
  const [selectedRecord, setSelectedRecord] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");

  const [doctorConsentList, setDoctorConsentList] = useState([]);

  const hospitalList = {
    1: "vivek",
    2: "Vitals",
    3: "Health",
    4: "Medicine",
    5: "Pharmacy",
  };

  const recordTypes = {
    1: "Blood Report",
    2: "X-ray",
    3: "MRI Scanning",
    4: "General Observations",
    5: "Medicines",
  };
  const [dateSelection, setDateSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const getAllConsents = () => {
    fetch("http://localhost:9100/doctor/getAllConsents?id=1")
    .then(data => data.json())
    .then((response) => {
        setDoctorConsentList(response);
    })
  }
  const sendRequest = () => {
      const consentMessage = recordTypes[selectedRecord]
      const consentRequest = {
        requestBody : consentMessage,
        doctorId: 1,
        patientId: 1,
        hospitalId: parseInt(selectedHospital)
      }

      fetch("http://localhost:9100/doctor/doctor-request", {
        body: JSON.stringify(consentRequest),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
      .then((response) => {
        setDoctorConsentList(response);
      })
  }
  useEffect(() => {
      getAllConsents();
  }, [])
  return (
    <div className="w-[85%] h-[95%] flex flex-col">
      <SearchBar />
      <div className="w-full h-[85%] shadow-lg mx-5 p-6">
        <div className="flex justify-between">
          <h3>Choose Request Type</h3>
          <h3 className="text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg">
            clear all
          </h3>
        </div>
        <div className="flex bg-slate-300 h-[512px] justify-around p-11 rounded-sm border-x-slate-900">
          <div className="flex flex-col">
            <Dropdown Label="Choose Hospital" options={hospitalList} onClick={(opt) => setSelectedHospital(opt)}/>
            <Dropdown Label="Health Record Category" options={recordTypes} onClick={(opt) => setSelectedRecord(opt)}/>
          </div>
          <div>
            <h3>Date Range</h3>
            <DateRangePicker
              editableDateInputs={true}
              onChange={item => {
                console.log(item);
                return setDateSelection([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateSelection}
            />
            ;
          </div>
        </div>
        <div className="flex gap-4 w-full items-center justify-center m-11">
          <Button txt="Add Request" color="green" />
          <Button txt="Send Request" color="green"  onClick={() => sendRequest()}/>
          <Button txt="Send OTP" color="green" />
        </div>
        <div className="bg-slate-200 rounded-sm ">
        <div className='cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg' onClick={() => getAllConsents()}>Refresh</div>
          <p>currentRequest</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Consent ID</th>
                <th>Patient ID</th>
                <th>Consent Message</th>
                <th>Consent Acknowledged</th>
                <th>Consent Approved</th>
              </tr>
            </thead>
            <tbody>
            { doctorConsentList.map((element) => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.patientID}</td>
                    <td>{element.consentMessage}</td>
                    <td>{element.consentAcknowledged ? 'Yes' : 'No'}</td>
                    <td>{element.approved ? 'Yes': 'No'}</td>
                  </tr>
                )
            })}
             
            </tbody>
          </Table>
        </div>

      </div>
    </div>
  );
}

export default RequestConsent;
