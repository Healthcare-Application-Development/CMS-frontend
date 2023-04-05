import React, { useState } from "react";
import { Dropdown, SearchBar, Button, Header, Textbox, Sidebar } from "../../components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { constants } from "../../constants";
import { Form, Table } from "react-bootstrap";

function RequestConsent() {
  const [ABHA, setABHA] = useState("1");
  var UPRNID = "";
  const user = localStorage.getItem("user");

  if (user) {
    UPRNID = JSON.parse(user).id
  }
  const [consentRequest, setConsentRequest] = useState({
    doctorID: UPRNID,
    timestamp: new Date(Date.now()).toISOString(),
    emergency: false,
    ongoing: true,
    consentItems: []
  });

  const [consentResponse, setConsentResponse] = useState(null);

  const [selectedRecordType, setSelectedRecordType] = useState("");
  const [recordSelectedError, setRecordSelectedError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const [dateSelection, setDateSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const createConsentItem = () => {
    const fromDate = new Date(dateSelection[0].startDate);
    const toDate = new Date(dateSelection[0].endDate);

    if (selectedRecordType == 0) {
      setRecordSelectedError(true);
      return;
    } else {
      setRecordSelectedError(false);
    }
    if (dateSelection[0].startDate == null) {
      setStartDateError(true);
      return;
    } else {
      setStartDateError(false);
    }
    if (dateSelection[0].endDate == null) {
      setEndDateError(true);
      return;
    } else {
      setEndDateError(false);
    }

    return {
      doctorID: UPRNID,
      patientID: ABHA,
      consentMessage: constants.recordTypes[selectedRecordType],
      consentAcknowledged: false,
      approved: false,
      fromDate:
        fromDate.getFullYear() +
        "-" +
        ((fromDate.getMonth() + 1) <= 10 ? "0" + (fromDate.getMonth() + 1) : (fromDate.getMonth() + 1)) +
        "-" +
        (fromDate.getDate() < 10 ? "0" + fromDate.getDate() : fromDate.getDate()),
      toDate:
        toDate.getFullYear() +
        "-" +
        ((toDate.getMonth() + 1) <= 10 ? "0" + (toDate.getMonth() + 1) : (toDate.getMonth() + 1))+
        "-" +
        (toDate.getDate() < 10 ? "0" + toDate.getDate() : toDate.getDate()),
      consentArtifcat: null
    };
  };

  const addConsentItemToConsentArtifact = () => {
    const consentItem = createConsentItem();
    if (consentItem) {
      setConsentRequest((prevState) => ({
        ...prevState,
        patientID: ABHA,
        consentItems: [...prevState.consentItems, consentItem],
      }));
      console.log(
        "added consent item ",
        consentItem,
        "to consentArtifact ",
        consentRequest
      );
    }
  };

  const sendRequest = () => {
    console.log(ABHA)
    setConsentRequest((prevState) => ({
      ...prevState,
      patientID: ABHA
    }));
    fetch("http://localhost:9100/doctor/store-consent-request", {
      body: JSON.stringify(consentRequest),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : 'Basic ' + localStorage.getItem("token")
      },
    })
        .then((data) => data.text())
      .then((response) => {
        if (response !== null) {
          setConsentResponse(response);
          // consentRequest = {};
        } else setConsentResponse(null);
      });
      setConsentRequest({
          doctorID: UPRNID,
          timestamp: new Date(Date.now()).toISOString(),
          emergency: false,
          ongoing: true,
          consentItems: []
        });
  };

  return (
    <>
      <Header />
      <div className="w-[75%] h-[95%] flex flex-col">
        <SearchBar />
        <Sidebar />
        <div className="w-full shadow-md p-6 ml-[30%] mt-[3%]">
          <div className="flex justify-between">
            <h3>Choose Request Type</h3>
            <h3 className="text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg text-[20px]">
              Clear All
            </h3>
          </div>
          <div className="flex bg-slate-300 h-[90%] justify-around p-11 rounded-sm border-x-slate-900">
            <div className="flex flex-col">
              {/* <Textbox
                label="Patient ABHA ID"
                onChange={(e) => setABHA((text) => text + e.target.value)}
              /> */}
              <div  className="w-[85%] ml-[7%]">
                  <Form.Label>Patient ABHA ID</Form.Label>
                  <Form.Control onChange={(e) => setABHA(e.target.value)}/>
              </div>
              <Dropdown
                Label="Health Record Category"
                options={constants.recordTypes}
                onClick={(opt) => setSelectedRecordType(opt)}
              />
              {recordSelectedError && <p>Record Not Selected</p>}
            </div>
            <div>
              <h3>Date Range</h3>
              <DateRangePicker
                editableDateInputs={true}
                onChange={(item) => {
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
            <Button
              txt="Add Request"
              color="green"
              onClick={() => addConsentItemToConsentArtifact()}
            />
            <Button
              txt="Send Request"
              color="green"
              onClick={() => sendRequest()}
            />
            <Button txt="Send OTP" color="green" />
          </div>
          {consentResponse !== null ? 
          <div className="font-bold text-center mt-[1%] text-[20px]">{consentResponse}</div> : null}
          {consentRequest.consentItems.length > 0 && 
          <>
          <p className="text-[20px]">Added Requests</p>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Record Type</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {
                consentRequest.consentItems.map((element) => {
                  return (
                        <tr>
                          <td>{element.patientID}</td>
                          <td>{element.consentMessage}</td>
                          <td>{new Date(element.fromDate).toDateString()}</td>
                          <td>{new Date(element.toDate).toDateString()}</td>
                        </tr>
                  )
                })
              }
            </tbody>
        </Table>
          </>
        }
        </div>
      </div>
    </>
  );
}

export default RequestConsent;
