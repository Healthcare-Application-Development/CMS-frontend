import { Header, Sidebar } from "./components";
import { Home, Doctor, Patient, CreateHospital,GetAllConsent, ReqestConsent, GetRecords, SharedConsent } from "./pages";
import { GetPatientRecord, PatientOngoingCR, PatientPastCR, PatientPendingCR, SuperAdmin} from "./pages";
import { constants } from "./constants";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./utils/ ProtectedRoute";


function App() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<Patient />} />
        {/* <Route path="/super_admin" element={<CreateHospital />} /> */}

        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor/requestConsent" element={<ProtectedRoute><ReqestConsent /></ProtectedRoute>} />
        <Route path="/doctor/getAllConsents" element={<GetAllConsent />} />
        <Route path="/doctor/getRecords" element={<GetRecords />} />
        <Route path="/doctor/sharedConsents" element={<SharedConsent />} />

        <Route path="/patient/getMyRecord" element={<GetPatientRecord/>} />
        <Route path="/patient/PatientOngoingCR" element={<PatientOngoingCR/>} />
        <Route path="/patient/PatientPastCR" element={<PatientPastCR/>} />
        <Route path="/patient/PatientPendingCR" element={<PatientPendingCR/>} />

        <Route path="/superadmin" element={<SuperAdmin />} />
        
      </Routes>
    </div>
  );
}

export default App;
