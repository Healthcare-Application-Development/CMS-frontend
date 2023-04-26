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
        <Route path="/patient" element={<ProtectedRoute><Patient /></ProtectedRoute>} />
        {/* <Route path="/super_admin" element={<CreateHospital />} /> */}

        <Route path="/doctor" element={<ProtectedRoute><Doctor /></ProtectedRoute>} />
        <Route path="/doctor/requestConsent" element={<ProtectedRoute><ReqestConsent /></ProtectedRoute>} />
        <Route path="/doctor/getAllConsents" element={<ProtectedRoute><GetAllConsent /></ProtectedRoute>} />
        <Route path="/doctor/getRecords" element={<ProtectedRoute><GetRecords /></ProtectedRoute>} />
        <Route path="/doctor/sharedConsents" element={<ProtectedRoute><SharedConsent /></ProtectedRoute>} />

        <Route path="/patient/getMyRecord" element={<ProtectedRoute><GetPatientRecord/></ProtectedRoute>} />
        <Route path="/patient/PatientOngoingCR" element={<ProtectedRoute><PatientOngoingCR/></ProtectedRoute>} />
        <Route path="/patient/PatientPastCR" element={<ProtectedRoute><PatientPastCR/></ProtectedRoute>} />
        <Route path="/patient/PatientPendingCR" element={<ProtectedRoute><PatientPendingCR/></ProtectedRoute>} />

        <Route path="/superadmin" element={<ProtectedRoute><SuperAdmin /></ProtectedRoute>} />
        
      </Routes>
    </div>
  );
}

export default App;
