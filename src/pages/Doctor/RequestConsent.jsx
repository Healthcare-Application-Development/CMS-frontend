import React, { useEffect, useState } from "react";
import { SearchBar, Header, Textbox, Sidebar } from "../../components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Checkbox, DateRangePicker, Dropdown, Form } from 'rsuite';
import { constants } from "../../constants";
import { Button, Table } from "react-bootstrap";
import isAfter from 'date-fns/isAfter';
import AESUtils from "../../encryption/AESUtils";

function RequestConsent() {
  const [ABHA, setABHA] = useState("");
  var UPRNID = "";
  const user = localStorage.getItem("user");

  if (user) {
    UPRNID = JSON.parse(user).id
  }
  const [consentRequest, setConsentRequest] = useState({
    doctorID: AESUtils.encrypt(UPRNID),
    timestamp: new Date(Date.now()).toISOString(),
    emergency: false,
    ongoing: true,
    consentItems: [],
    delegationRequired: false
  });

  const [consentResponse, setConsentResponse] = useState(null);
  const [isDelegated, setIsDelegated] = useState(false);
  const [selectedRecordType, setSelectedRecordType] = useState("");
  const [recordSelectedError, setRecordSelectedError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [abhaError, setAbhaError] = useState(false);

  const [dateSelection, setDateSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const createConsentItem = () => {
    const fromDate = new Date(dateSelection[0]);
    const toDate = new Date(dateSelection[1]);
    // console.log(selectedRecordType)
    if (ABHA.length == 0) {
        setAbhaError(true);
        return;
    } else {
        setAbhaError(false);
    }
    if (selectedRecordType.length == 0) {
      setRecordSelectedError(true);
      return;
    } else {
      setRecordSelectedError(false);
    }
    if (dateSelection[0] == null) {
      setStartDateError(true);
      return;
    } else {
      setStartDateError(false);
    }
    if (dateSelection[1] == null) {
      setEndDateError(true);
      return;
    } else {
      setEndDateError(false);
    }
    return {
      doctorID: AESUtils.encrypt(UPRNID),
      patientID: AESUtils.encrypt(ABHA),
      consentMessage: AESUtils.encrypt(selectedRecordType),
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
      consentArtifcat: null,
      ongoing: false,
      delegationRequired: isDelegated
    };
  };

  const addConsentItemToConsentArtifact = () => {
    const consentItem = createConsentItem();
    if (consentItem) {
      setConsentRequest((prevState) => ({
        ...prevState,
        patientID: AESUtils.encrypt(ABHA),
        consentItems: [...prevState.consentItems, consentItem],
        delegationRequired: isDelegated
      }));
      // console.log(
      //   "added consent item ",
      //   consentItem,
      //   "to consentArtifact ",
      //   consentRequest
      // );
    }
  };

  const sendRequest = () => {
    if (consentRequest.consentItems.length == 0) {
      return;
    }
    setConsentRequest((prevState) => ({
      ...prevState,
      patientID: AESUtils.encrypt(ABHA),
      delegationRequired: isDelegated
    }));
    fetch("http://localhost:9100/doctor/store-consent-request", {
      body: JSON.stringify(consentRequest),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
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
          doctorID: AESUtils.encrypt(UPRNID),
          timestamp: new Date(Date.now()).toISOString(),
          emergency: false,
          ongoing: true,
          consentItems: []
        });

  };
  const emergencyConsent = () => {
    if (consentRequest.consentItems.length == 0) {
      return;
    }
    var consentItems = consentRequest.consentItems;
    for (var i = 0; i < consentItems.length; i++) {
      consentItems[i].consentAcknowledged = true;
      consentItems[i].approved = true;
      consentItems[i].ongoing = true;
      consentItems[i].isDelegated = isDelegated;
    }
    const req = {
      ...consentRequest,
      consentItems: consentItems,
      patientID: AESUtils.encrypt(ABHA),
      emergency: true,
      doctorID: AESUtils.encrypt(UPRNID),
      consentAcknowledged: true,
      approved: true,
      ongoing: true
    };
      fetch("http://localhost:9100/mediatorServiceRequestController/call-mediator-service", {
        body: JSON.stringify(req),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization' : 'Bearer ' + localStorage.getItem("token")
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
          doctorID: AESUtils.encrypt(UPRNID),
          timestamp: new Date(Date.now()).toISOString(),
          emergency: false,
          ongoing: true,
          consentItems: []
        });

  }
  return (
    <div className="flex flex-col">
        
      <div className="w-[75%] h-[95%] flex flex-col h-[100vh]">
        {/* <SearchBar /> */}
        <Sidebar />
        {/* <div className="w-full p-6 ml-[30%] mt-[3%]">
          <div className="flex justify-between">
            <h3>Choose Request Type</h3>
            <h3 className="text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg text-[20px]">
              Clear All
            </h3>
          </div>
          <div className="flex h-[90%] justify-around p-11 rounded-sm border-x-slate-900">
            <div className="flex flex-col">
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
        </div> */}
        <div className="ml-[45%] mt-[5%] p-[5%] w-[50%]">
          <p className="text-[24px] mb-[5%] text-black text-center font-bold">Request Consent</p>
          <Form fluid>
            <Form.Group >
              <Form.ControlLabel className="font-semibold text-black">Patient ABHAID *</Form.ControlLabel>
              <Form.Control type="text" onChange={(e) => setABHA(e)} errorMessage={abhaError ? "ABHA ID not available" : null} />
              <Form.HelpText>Patient ABHAID needed</Form.HelpText>
            </Form.Group>
            <Form.Group className="mt-[4%]">
              <Form.ControlLabel className="font-semibold text-black">Select Record Category *</Form.ControlLabel>
              {/* <Dropdown
                Label="Health Record Category"
                options={constants.recordTypes}
                onClick={(opt) => setSelectedRecordType(opt)}
              /> */}
              <div>
                <Dropdown title={selectedRecordType.length > 0 ? selectedRecordType : "Select Record Category"} size="lg">
                    {Object.keys(constants.recordTypes).map((e) => {
                        return <Dropdown.Item key={e} onClick={(e) => setSelectedRecordType(e.target.textContent)}>{constants.recordTypes[e]}</Dropdown.Item>
                    })}
                </Dropdown>
                <Form.ErrorMessage show={recordSelectedError}>Record not selected</Form.ErrorMessage>
              </div>
              <Form.HelpText>Record Type needed</Form.HelpText>
            </Form.Group>
            <Form.Group className="mt-[4%]">
              <Form.ControlLabel className="font-semibold text-black">Delegation of Request *</Form.ControlLabel>
              <Checkbox className="inline text-black" onChange={(val, checked) => setIsDelegated(checked)}>Do you want to allow delegation of request to one doctor?</Checkbox>
              <Form.ErrorMessage show={startDateError || endDateError}>Date Range has to be selected</Form.ErrorMessage>
              <Form.HelpText>Date Range has to be chosen</Form.HelpText>
            </Form.Group>
            <Form.Group className="mt-[4%]">
              <Form.ControlLabel className="font-semibold text-black">Select Range of Dates *</Form.ControlLabel>
              <div>
                <DateRangePicker className="w-[600px]" shouldDisableDate={date => isAfter(date, new Date())} size="lg" onOk={(e) => setDateSelection(e)}/>
              </div>
              <Form.ErrorMessage show={startDateError || endDateError}>Date Range has to be selected</Form.ErrorMessage>
              <Form.HelpText>Date Range has to be chosen</Form.HelpText>
            </Form.Group>
            <Form.Group className="mt-[5%] flex justify-between">
              <Button variant="primary" onClick={() => addConsentItemToConsentArtifact()}>Add Request</Button>
              <Button variant="success" onClick={() => sendRequest()}>Send Request</Button>
              <Button variant="dark">Send OTP</Button>
            </Form.Group>
            <Form.Group>
            {/* <button className='sidebar-emergency-button bg-red-800 flex p-4 m-2 gap-3 items-center justify-center text-white'>
                <img src={`/${constants.REACT_APP_SIDEBAR_WARNING_IMG}.png`} className='sidebar-emergency-image' alt={constants.REACT_APP_SIDEBAR_WARNING_IMG} />
                <span className='sidebar-emergency-text'>{constants.REACT_APP_SIDEBAR_EMERGENCY_BUTTON_TEXT}</span>
            </button> */}
            <Button variant="danger" className="w-[100%] flex flex-col items-center p-3" onClick={() => emergencyConsent()}>
              {/* <img src={`/${constants.REACT_APP_SIDEBAR_WARNING_IMG}.png`} width="15px" className='sidebar-emergency-image text-center' alt={constants.REACT_APP_SIDEBAR_WARNING_IMG} /> */}
              <span>Emergency</span>
            </Button>
            </Form.Group>
          </Form>
        </div>
        {consentRequest.consentItems.length > 0 && 
          <>
          <p className="ml-[40%] text-center mb-[1%] text-[20px] text-black font-semibold">Added Requests</p>
          <Table striped bordered hover className="ml-[33%]" size="sm" style={{width:'80%'}}>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Record Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Allow Delegation</th>
              </tr>
            </thead>
            <tbody>
              {
                consentRequest.consentItems.map((element) => {
                  return (
                        <tr>
                          <td>{AESUtils.decrypt(element.patientID)}</td>
                          <td>{AESUtils.decrypt(element.consentMessage)}</td>
                          <td>{new Date(element.fromDate).toDateString()}</td>
                          <td>{new Date(element.toDate).toDateString()}</td>
                          <td>{element.delegationRequired ? "Yes" : "No"}</td>
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
  );
}

export default RequestConsent;
