import React, { useState } from "react";
import { Dropdown, SearchBar, Button, Header, Textbox } from "../../components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { constants } from "../../constants";

function RequestConsent() {
  const [consentRequest, setConsentRequest] = useState({
    doctorID: 1,
    patientID: 2,
    timestamp: new Date(Date.now()).toISOString(),
    emergency: false,
    consentItems: [],
  });

  const [ABHA, setABHA] = useState("1");
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
      doctorID: 1,
      patientID: 2,
      consentMessage: constants.recordTypes[selectedRecordType],
      consentAcknowledged: false,
      approved: false,
      fromDate:
        fromDate.getFullYear() +
        "-" +
        ((fromDate.getMonth() + 1) <= 10 ? "0" + (fromDate.getMonth() + 1) : (fromDate.getMonth() + 1)) +
        "-" +
        (fromDate.getDate() <= 10 ? "0" + fromDate.getDate() : fromDate.getDate()),
      toDate:
        toDate.getFullYear() +
        "-" +
        ((toDate.getMonth() + 1) <= 10 ? "0" + (toDate.getMonth() + 1) : (toDate.getMonth() + 1))+
        "-" +
        (toDate.getDate() < 10 ? "0" + toDate.getDate() : toDate.getDate()),
      consentArtifcat: null,
      hospitalId: 1,
    };
  };

  const addConsentItemToConsentArtifact = () => {
    const consentItem = createConsentItem();
    if (consentItem) {
      setConsentRequest((prevState) => ({
        ...prevState,
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
    fetch("http://localhost:9100/doctor/store-consent-request", {
      body: JSON.stringify(consentRequest),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (response !== null) {
          setConsentResponse(JSON.stringify(response));
          setConsentRequest([]);
        } else setConsentResponse(null);
      });
  };

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
              <Textbox
                label="Patient ABHA ID"
                onChange={(e) => setABHA((text) => text + e.target.value)}
              />
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

          {consentRequest.length > 0 ? (
            <div>{JSON.stringify(consentRequest)}</div>
          ) : null}

          {consentResponse === null ? null : (
            <div>{JSON.stringify(consentResponse)}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default RequestConsent;
