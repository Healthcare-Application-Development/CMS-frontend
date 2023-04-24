import React, { useEffect,useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Sidebar } from "../../components";
import { useNavigate } from "react-router-dom";
import { Form } from "rsuite";
import AESUtils from "../../encryption/AESUtils";

function getAllConsent() {
  const navigate = useNavigate();
  const [doctorConsentList, setDoctorConsentList] = useState([]);
  const [show, setShow] = useState(false)
  var UPRNID = "";
  const user = localStorage.getItem("user");
  const [patientID, setPatientID] = useState("");
  const [recordType, setRecordType] = useState("");
  const [consentItemID, setConsentItemID] = useState("");
  if (user) {
    UPRNID = JSON.parse(user).id
  }
  const getAllConsents = () => {
    fetch("http://localhost:9100/doctor/getAllConsents?id=" + encodeURIComponent(AESUtils.encrypt(UPRNID)), {
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [docIDError, setDocIdError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [doctorID, setDoctorID] = useState("");
  const delegateRequest = () => {
    var start = new Date(startDate);
    var end = new Date(endDate);
    if (doctorID.length === 0) {
      setDocIdError(true);
      return;
    } else {
      setDocIdError(false);
    }
    if (startDate.length === 0) {
      setStartDateError(true);
      return;
    } else {
      setStartDateError(false);
    }
    if (endDate.length === 0) {
      setEndDateError(true);
      return;
    } else {
      setEndDateError(false);
    }
    if (start > end) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
    }
    
    fetch("http://localhost:9100/doctor/delegate-consent", {
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      },
      method: 'POST',
      body: JSON.stringify({
        fromDocID: AESUtils.encrypt(UPRNID),
        toDocID: AESUtils.encrypt(doctorID),
        fromDate: startDate,
        toDate: endDate,
        recordType: recordType,
        patientID: patientID,
        consentItemID: {
          id: consentItemID,
        },
          isDelegated: true
      })
    }).then((response) => response.json())
    .then((data) => {
      if (data.status == 200) {
        setShow(false);
      }
    });
        fetch("http://localhost:9100/doctor/updateConsentStatus", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Bearer ' + localStorage.getItem("token")
          },
          body: JSON.stringify({
            itemId: parseInt(consentItemID),
            isDelegated: false,
            doctorId: AESUtils.encrypt(UPRNID)
          }),
        })
          .then((data) => data.json())
          .then((response) => {
            setDoctorConsentList(response.object);
          });
  }
  const [artifactId, setArtifactID] = useState("");
  const openModal = (consentMessage, abhaID, consentItemID, artID) => {
    setShow(true);
    setRecordType(consentMessage);
    setPatientID(abhaID);
    setConsentItemID(consentItemID);
    setArtifactID(artID);
  }
  return (
  <div className="flex items-center justify-start">
    <Sidebar />
    <div className="w-[70%] h-[100%] ml-[20%] mt-[7%]">
    <p className="text-[28px] mb-[2%] text-black font-semibold text-center">History</p>
      <div className="flex justify-center">
        <div className="card shadow-md pt-[5%] pb-[5%] text-center mt-[1%] mb-[2%] w-[15%] mr-[2.5%] ml-[2%] font-semibold">
          <p className="text-[18px] text-black">Requests Made:</p>
          <p className="text-[16px] text-black">{doctorConsentList && doctorConsentList.length}</p>
        </div>
        <div className="card pt-[5%] pb-[5%] text-center shadow-md mt-[1%] mb-[2%] w-[15%] ml-[2.5%] mr-[2.5%] font-semibold">
          <p className="text-[18px] text-[green]">Approved Requests:</p>
          <p className="text-[16px] text-[green]">{doctorConsentList && doctorConsentList.filter((e) => e.consentAcknowledged && e.approved).length}</p>
        </div>
        <div className="card pt-[5%] pb-[5%] text-center shadow-md mt-[1%] mb-[2%] w-[15%] ml-[2.5%] mr-[2.5%] font-semibold">
          <p className="text-[18px] text-[red]">Rejected Requests:</p>
          <p className="text-[16px] text-[red]">{doctorConsentList && doctorConsentList.filter((e) => e.consentAcknowledged && !e.approved).length}</p>
        </div>
        <div className="card pt-[5%] pb-[5%] text-center shadow-md mt-[1%] mb-[2%] w-[15%] ml-[2.5%] mr-[2.5%] font-semibold">
          <p className="text-[18px] text-black">Pending Requests:</p>
          <p className="text-[16px] text-black">{doctorConsentList && doctorConsentList.filter((e) => !e.consentAcknowledged).length}</p>
        </div>
      </div>
      <div className="mt-[2%]">
        <div className="rounded-sm ">
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Report Requested</th>
                <th>Consent Acknowledged</th>
                <th>Consent Approved</th>
                <th>Consent From</th>
                <th>Consent To</th>
                <th>Emergency</th>
                <th>Delegate Consent</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {doctorConsentList &&
                doctorConsentList.length > 0 &&
                doctorConsentList.map((element) => {
                  return (
                    <tr>
                      <td>{AESUtils.decrypt(element.patientID)}</td>
                      <td>{AESUtils.decrypt(element.consentMessage)}</td>
                      <td>{element.consentAcknowledged ? "Yes" : "No"}</td>
                      <td>{element.approved ? "Yes" : "No"}</td>
                      <td>{new Date(element.fromDate).toDateString()}</td>
                      <td>{new Date(element.toDate).toDateString()}</td>
                      <td>{element.emergency ? "Yes" : "No"}</td>
                      <td>
                        <Button disabled={!(element.consentAcknowledged && element.approved && element.ongoing && element.isDelegated && !element.revoked)} variant="link" onClick={() => openModal(element.consentMessage, element.patientID, element.id, element.artifactID)}>Delegate</Button>
                      </td>
                      <td>
                        <Button disabled={!(element.consentAcknowledged && element.approved && element.ongoing && !element.revoked)} variant="link" onClick={() => navigate("/doctor/getRecords", {
                          state: {
                            patientID: element.patientID,
                            consentMessage: element.consentMessage,
                            artifactId: element.artifactID,
                            doctorId: UPRNID,
                            consentID: element.id
                          }
                        })}>Get Record</Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={() => setShow(false)}>
            <span className="text-[18px] text-black">Delegate Consent</span>
        </Modal.Header>
        <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.ControlLabel className="text-black">Doctor ID</Form.ControlLabel>
                    <Form.Control type="text" onChange={(e) => setDoctorID(e)}/>
                    <Form.HelpText>Enter Doctor ID to delegate to.</Form.HelpText>
                    {docIDError && <p className="text-[red] text-[12px]">Doctor ID should not be empty</p>}

                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel className="text-black">Start Date</Form.ControlLabel>
                    <Form.Control type="date" onChange={(e) => setStartDate(e)}/>
                    <Form.HelpText>Enter the start date</Form.HelpText>
                    {startDateError && <p className="text-[red] text-[12px]">Start Date should not be empty</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel className="text-black">End Date</Form.ControlLabel>
                    <Form.Control type="date" onChange={(e) => setEndDate(e)}/>
                    <Form.HelpText>Enter the end date</Form.HelpText>
                    {endDateError && <p className="text-[red] text-[12px]">End Date should not be empty</p>}
                    {dateError && <p className="text-[red] text-[12px]">Start Date should be less than End Date</p>}
                  </Form.Group>
                </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="success" onClick={() => delegateRequest()}>Delegate</Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
  );
}

export default getAllConsent;
