import React, {useEffect, useState} from "react";
import { Dropdown, SearchBar, Button, Header } from "../../components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Table } from "react-bootstrap";

function RequestConsent() {
  const [selectedRecord, setSelectedRecord] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");

  const [doctorConsentList, setDoctorConsentList] = useState([]);
  const [hospitalSelectedError, setHospitalSelectedError] = useState(false);
  const [recordSelectedError, setRecordSelectedError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const hospitalList = {
    0: "Select Hospital",
    1: "vivek",
    2: "Vitals",
    3: "Health",
    4: "Medicine",
    5: "Pharmacy",
  };

  const recordTypes = {
    0: "Select Record Type",
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
      if (selectedHospital == 0) {
        setHospitalSelectedError(true);
        return;
      } else {
        setHospitalSelectedError(false)
      }
      if (selectedRecord == 0) {
        setRecordSelectedError(true);
        return;
      } else {
        setRecordSelectedError(false);
      }
      if (dateSelection[0].startDate == null) {
        setStartDateError(true)
        return;
      } else {
        setStartDateError(false)
      }
      if (dateSelection[0].endDate == null) {
        setEndDateError(true)
        return;
      } else {
        setEndDateError(false)
      }
      const consentMessage = recordTypes[selectedRecord]
      const fromDate = new Date(dateSelection[0].startDate);
      const toDate = new Date(dateSelection[0].endDate);
      const consentRequest = {
        requestBody : consentMessage,
        doctorId: 1,
        patientId: 1,
        hospitalId: parseInt(selectedHospital),
        fromDate: fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate(),
        toDate: toDate.getFullYear() + '-' + (toDate.getMonth() + 1)+ '-' + toDate.getDate(),
      }
      fetch("http://localhost:9100/doctor/doctor-request", {
        body: JSON.stringify(consentRequest),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
      .then((response) => {
        if (response !== null)
          setDoctorConsentList(response);
        else 
          setDoctorConsentList([]);
      }).catch((e) => {
        setDoctorConsentList([]);
      })
  }
  useEffect(() => {
      getAllConsents();
  }, [])
  return (
    <>
    <Header />
    <div className="w-[85%] h-[95%] flex flex-col">
      <SearchBar />
      <div className="w-full shadow-lg p-6 ml-[30%] mt-[5%]">
        <div className="flex justify-between">
          <h3>Choose Request Type</h3>
          <h3 className="text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg">
            clear all
          </h3>
        </div>
        <div className="flex bg-slate-300 h-[512px] justify-around p-11 rounded-sm border-x-slate-900">
          <div className="flex flex-col">
            <Dropdown Label="Choose Hospital" options={hospitalList} onClick={(opt) => setSelectedHospital(opt)}/>
            {hospitalSelectedError && <p>Hospital Not Selected</p>}
            <Dropdown Label="Health Record Category" options={recordTypes} onClick={(opt) => setSelectedRecord(opt)}/>
            {recordSelectedError && <p>Record Not Selected</p>}
          </div>
          <div>
            <h3>Date Range</h3>
            <DateRangePicker
              editableDateInputs={true}
              onChange={item => {
                setDateSelection([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateSelection}
            />
            {startDateError && <p>Start Date not selected</p>}
            {endDateError && <p>End Date not selected</p>}
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
                <th>Consent From</th>
                <th>Consent To</th>
              </tr>
            </thead>
            <tbody>
            { doctorConsentList && doctorConsentList.length > 0 && doctorConsentList.map((element) => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.patientID}</td>
                    <td>{element.consentMessage}</td>
                    <td>{element.consentAcknowledged ? 'Yes' : 'No'}</td>
                    <td>{element.approved ? 'Yes': 'No'}</td>
                    <td>{new Date(element.fromDate).toDateString()}</td>
                    <td>{new Date(element.toDate).toDateString()}</td>
                  </tr>
                )
            })}
             
            </tbody>
          </Table>
        </div>

      </div>
    </div>
    </>
  );
}

export default RequestConsent;
